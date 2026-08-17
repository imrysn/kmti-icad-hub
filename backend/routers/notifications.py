from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import SessionLocal, get_db  # Import SessionLocal, get_db
from ..models import User, UserActivity, TrainerTraineeMapping, Notification, Broadcast, BroadcastAcknowledgement
from ..auth.security import decode_token
from jose import JWTError
from ..websocket_manager import notification_manager
from ..schemas import NotificationResponse
from .auth import get_current_user
import logging
import json
import asyncio
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

from starlette.concurrency import run_in_threadpool

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

        def _get_user():
            with SessionLocal() as db:
                user = get_user_from_token(token, db)
                return user.id if user else None

        user_id = await run_in_threadpool(_get_user)
        if not user_id:
            await websocket.close(code=1008)
            return

        await notification_manager.connect(websocket, user_id, subprotocol=used_subprotocol)

        def _get_trainer_id():
            with SessionLocal() as db:
                mapping = db.query(TrainerTraineeMapping).filter(TrainerTraineeMapping.trainee_id == user_id).first()
                if mapping:
                    act_record = db.query(UserActivity).filter(UserActivity.user_id == user_id).first()
                    current_act = act_record.current_activity if act_record else "Online"
                    return mapping.trainer_id, current_act
            return None, None

        trainer_id, current_act = await run_in_threadpool(_get_trainer_id)
        if trainer_id:
            import asyncio
            online_since = notification_manager.get_online_since(user_id)
            online_since_str = online_since.isoformat() if online_since else None
            asyncio.create_task(notification_manager.send_personal_message({
                "event": "TRAINEE_TELEMETRY",
                "trainee_id": user_id,
                "is_online": True,
                "current_activity": current_act,
                "online_since": online_since_str,
                "last_updated": datetime.now(timezone.utc).isoformat()
            }, trainer_id))

        try:
            while True:
                data = await websocket.receive_text()
                try:
                    data_json = json.loads(data)
                    if data_json.get("event") == "HEARTBEAT":
                        activity = data_json.get("activity", "Active")

                        def _process_heartbeat():
                            with SessionLocal() as db:
                                activity_record = db.query(UserActivity).filter(UserActivity.user_id == user_id).first()
                                if not activity_record:
                                    activity_record = UserActivity(user_id=user_id, current_activity=activity)
                                    db.add(activity_record)
                                else:
                                    activity_record.current_activity = activity
                                    activity_record.last_updated = datetime.now(timezone.utc)
                                db.commit()

                                mapping = db.query(TrainerTraineeMapping).filter(TrainerTraineeMapping.trainee_id == user_id).first()
                                return mapping.trainer_id if mapping else None

                        trainer_id = await run_in_threadpool(_process_heartbeat)
                        if trainer_id:
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
                            }, trainer_id))
                except json.JSONDecodeError:
                    pass
                except Exception as e:
                    logger.error(f"Error processing websocket message: {e}")
        except WebSocketDisconnect:
            notification_manager.disconnect(websocket, user_id)

            def _get_trainer_for_offline():
                with SessionLocal() as db:
                    mapping = db.query(TrainerTraineeMapping).filter(TrainerTraineeMapping.trainee_id == user_id).first()
                    return mapping.trainer_id if mapping else None

            trainer_id = await run_in_threadpool(_get_trainer_for_offline)
            if trainer_id:
                is_still_online = notification_manager.is_user_online(user_id)
                if not is_still_online:
                    import asyncio
                    asyncio.create_task(notification_manager.send_personal_message({
                        "event": "TRAINEE_TELEMETRY",
                        "trainee_id": user_id,
                        "is_online": False,
                        "current_activity": "Offline",
                        "last_updated": datetime.now(timezone.utc).isoformat()
                    }, trainer_id))
    except Exception as e:
        logger.error(f"Unexpected websocket error: {e}")
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


@router.get("/broadcasts/active")
def get_active_broadcasts_for_user(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get active broadcasts that the current user has not acknowledged yet."""
    acknowledged_ids = db.query(BroadcastAcknowledgement.broadcast_id).filter(
        BroadcastAcknowledgement.user_id == current_user.id
    ).subquery()

    broadcasts = db.query(Broadcast, User.full_name)\
        .join(User, Broadcast.created_by == User.id)\
        .filter(Broadcast.is_active == True)\
        .filter(~Broadcast.id.in_(acknowledged_ids))\
        .order_by(Broadcast.created_at.desc()).all()

    return [
        {
            "id": b[0].id,
            "message": b[0].message,
            "level": b[0].level,
            "created_at": b[0].created_at,
            "sender_name": b[1]
        } for b in broadcasts
    ]


@router.post("/broadcasts/{broadcast_id}/acknowledge")
async def acknowledge_broadcast(
    broadcast_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Mark a broadcast as acknowledged by the current user and notify admins."""
    broadcast = db.query(Broadcast).filter(
        Broadcast.id == broadcast_id,
        Broadcast.is_active == True
    ).first()

    if not broadcast:
        raise HTTPException(status_code=404, detail="Broadcast not found")

    existing = db.query(BroadcastAcknowledgement).filter(
        BroadcastAcknowledgement.broadcast_id == broadcast_id,
        BroadcastAcknowledgement.user_id == current_user.id
    ).first()

    if not existing:
        db.add(BroadcastAcknowledgement(
            broadcast_id=broadcast_id,
            user_id=current_user.id
        ))

    user_message = f"You acknowledged this broadcast: {broadcast.message}"
    existing_user_notification = db.query(Notification).filter(
        Notification.recipient_id == current_user.id,
        Notification.type == "broadcast_acknowledged",
        Notification.message == user_message
    ).first()
    if not existing_user_notification:
        db.add(Notification(
            recipient_id=current_user.id,
            sender_id=current_user.id,
            message=user_message,
            type="broadcast_acknowledged",
            is_read=True
        ))

    admin_users = db.query(User).filter(User.role == "admin", User.is_active == True).all()
    admin_display_name = current_user.full_name or current_user.username
    admin_message = f"{admin_display_name} has acknowledged the broadcast: {broadcast.message}"

    created_admin_ids = []
    for admin_user in admin_users:
        db.add(Notification(
            recipient_id=admin_user.id,
            sender_id=current_user.id,
            message=admin_message,
            type="broadcast_acknowledged",
            is_read=False
        ))
        created_admin_ids.append(admin_user.id)

    db.commit()

    async def _notify_admins():
        payload = {
            "event": "BROADCAST_ACKNOWLEDGED",
            "broadcast_id": broadcast_id,
            "broadcast_message": broadcast.message,
            "user_id": current_user.id,
            "username": current_user.username,
            "full_name": current_user.full_name,
            "message": admin_message
        }
        for admin_id in created_admin_ids:
            await notification_manager.send_personal_message(payload, admin_id)

    asyncio.create_task(_notify_admins())

    return {
        "status": "success",
        "broadcast_id": broadcast_id,
        "acknowledged_at": datetime.now(timezone.utc).isoformat()
    }

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

@router.get("/debug/connections")
def get_debug_connections():
    conns = {}
    for uid, sockets in notification_manager.active_connections.items():
        conns[uid] = len(sockets)
    return conns

