from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from ..database import get_db
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
async def websocket_endpoint(websocket: WebSocket, token: str = Query(...), db: Session = Depends(get_db)):
    try:
        user = get_user_from_token(token, db)
        if not user:
            await websocket.close(code=1008)
            return
            
        await notification_manager.connect(websocket, user.id)
        try:
            while True:
                data = await websocket.receive_text()
        except WebSocketDisconnect:
            notification_manager.disconnect(websocket, user.id)
    except Exception as e:
        logger.error(f"WebSocket connection error: {e}")
        try:
            await websocket.close(code=1011)
        except:
            pass
