from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from ..database import SessionLocal  # Import SessionLocal
from ..models import User
from ..auth.security import decode_token
from jose import JWTError
from ..websocket_manager import notification_manager
import logging

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
async def websocket_endpoint(websocket: WebSocket, token: str = Query(...)):
    try:
        # Use context manager to handle db session, freeing connection pool immediately
        with SessionLocal() as db:
            user = get_user_from_token(token, db)
            if not user:
                await websocket.close(code=1008)
                return
            user_id = user.id

        await notification_manager.connect(websocket, user_id)
        try:
            while True:
                data = await websocket.receive_text()
        except WebSocketDisconnect:
            notification_manager.disconnect(websocket, user_id)
    except Exception as e:
        logger.error(f"WebSocket connection error: {e}")
        try:
            await websocket.close(code=1011)
        except:
            pass

