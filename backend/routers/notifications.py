from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from ..database import SessionLocal, get_db  # Import SessionLocal, get_db
from ..models import User, UserActivity, TrainerTraineeMapping, Notification
from ..auth.security import decode_token
from jose import JWTError
from ..websocket_manager import notification_manager
from ..schemas import NotificationResponse
from .auth import get_current_user
import logging
import json
from datetime import datetime, timezone
from typing import List

router = APIRouter(prefix="/notifications", tags=["Notifications"])
logger = logging.getLogger(__name__)

def get_user_from_token(token: str, db: Session) -> User:
    try:
        payload = decode_token(token)
        username: str = payload.get("sub")
        if username is None:
            return None
        user = db.query(User).filter(User.username == username).first()
        if user and user.is_active:
            return user
    except JWTError:
        pass
    return None

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket, token: str = None):
    try:
        subprotocols = websocket.scope.get("subprotocols", [])
        used_subprotocol = None
        if subprotocols:
            token = subprotocols[0]
            used_subprotocol = subprotocols[0]
        else:
            token = websocket.query_params.get("token")

        # Use context manager to handle db session, freeing connection pool immediately
        with SessionLocal() as db:
            user = get_user_from_token(token, db)
            if not user:
                await websocket.close(code=1008)
                return
            user_id = user.id

        await notification_manager.connect(websocket, user_id, subprotocol=used_subprotocol)
        
        # Notify trainer that trainee is online
        with SessionLocal() as db:
            mapping = db.query(TrainerTraineeMapping).filter(TrainerTraineeMapping.trainee_id == user_id).first()
            if mapping:
                import asyncio
                act_record = db.query(UserActivity).filter(UserActivity.user_id == user_id).first()
                current_act = act_record.current_activity if act_record else "Online"
                online_since = notification_manager.get_online_since(user_id)
                online_since_str = online_since.isoformat() if online_since else None
                asyncio.create_task(notification_manager.send_personal_message({
                    "event": "TRAINEE_TELEMETRY",
                    "trainee_id": user_id,
                    "is_online": True,
                    "current_activity": current_act,
                    "online_since": online_since_str,
                    "last_updated": datetime.now(timezone.utc).isoformat()
                }, mapping.trainer_id))

        try:
            while True:
                data = await websocket.receive_text()
                try:
                    data_json = json.loads(data)
                    if data_json.get("event") == "HEARTBEAT":
                        activity = data_json.get("activity", "Active")
                        with SessionLocal() as db:
                            activity_record = db.query(UserActivity).filter(UserActivity.user_id == user_id).first()
                            if not activity_record:
                                activity_record = UserActivity(user_id=user_id, current_activity=activity)
                                db.add(activity_record)
                            else:
                                activity_record.current_activity = activity
                                activity_record.last_updated = datetime.now(timezone.utc)
                            db.commit()

                            # Notify trainer of active telemetry
                            mapping = db.query(TrainerTraineeMapping).filter(TrainerTraineeMapping.trainee_id == user_id).first()
                            if mapping:
                                import asyncio
                                online_since = notification_manager.get_online_since(user_id)
                                online_since_str = online_since.isoformat() if online_since else None
                                asyncio.create_task(notification_manager.send_personal_message({
                                    "event": "TRAINEE_TELEMETRY",
                                    "trainee_id": user_id,
                                    "is_online": True,
                                    "current_activity": activity,
                                    "online_since": online_since_str,
                                    "last_updated": datetime.now(timezone.utc).isoformat()
                                }, mapping.trainer_id))
                except json.JSONDecodeError:
                    pass
                except Exception as e:
                    logger.error(f"Error processing websocket message: {e}")
        except WebSocketDisconnect:
            notification_manager.disconnect(websocket, user_id)
            # Notify trainer that trainee is offline
            with SessionLocal() as db:
                mapping = db.query(TrainerTraineeMapping).filter(TrainerTraineeMapping.trainee_id == user_id).first()
                if mapping:
                    is_still_online = notification_manager.is_user_online(user_id)
                    if not is_still_online:
                        import asyncio
                        asyncio.create_task(notification_manager.send_personal_message({
                            "event": "TRAINEE_TELEMETRY",
                            "trainee_id": user_id,
                            "is_online": False,
                            "current_activity": "Offline",
                            "last_updated": datetime.now(timezone.utc).isoformat()
                        }, mapping.trainer_id))
    except Exception as e:
        logger.error(f"WebSocket connection error: {e}")
        try:
            await websocket.close(code=1011)
        except:
            pass

@router.get("", response_model=List[NotificationResponse])
def get_my_notifications(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Retrieve notifications for the current authenticated user."""
    return db.query(Notification).filter(
        Notification.recipient_id == current_user.id
    ).order_by(Notification.created_at.desc()).all()

@router.post("/{notification_id}/read")
def mark_notification_as_read(
    notification_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Mark a specific notification as read."""
    notification = db.query(Notification).filter(
        Notification.id == notification_id,
        Notification.recipient_id == current_user.id
    ).first()
    
    if not notification:
        raise HTTPException(status_code=404, detail="Notification not found")
        
    notification.is_read = True
    db.commit()
    return {"status": "success"}

@router.post("/read-all")
def mark_all_notifications_as_read(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Mark all notifications as read for the current user."""
    db.query(Notification).filter(
        Notification.recipient_id == current_user.id,
        Notification.is_read == False
    ).update({Notification.is_read: True}, synchronize_session=False)
    db.commit()
    return {"status": "success"}

@router.delete("/clear-all")
def clear_all_notifications(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete all notifications for the current user."""
    db.query(Notification).filter(
        Notification.recipient_id == current_user.id
    ).delete(synchronize_session=False)
    db.commit()
    return {"status": "success"}

@router.delete("/{notification_id}")
def delete_notification(
    notification_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete a specific notification."""
    notification = db.query(Notification).filter(
        Notification.id == notification_id,
        Notification.recipient_id == current_user.id
    ).first()
    
    if not notification:
        raise HTTPException(status_code=404, detail="Notification not found")
        
    db.delete(notification)
    db.commit()
    return {"status": "success"}

