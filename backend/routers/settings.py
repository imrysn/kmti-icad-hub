from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas
from ..database import get_db

router = APIRouter(
    prefix="/settings",
    tags=["settings"]
)

@router.get("/", response_model=List[schemas.SystemSettingResponse])
def get_all_settings(db: Session = Depends(get_db)):
    settings = db.query(models.SystemSettings).all()
    # Default fallback for chatbot_enabled if it doesn't exist
    has_chatbot = any(s.key == "chatbot_enabled" for s in settings)
    if not has_chatbot:
        # Create it dynamically if missing
        chatbot_setting = models.SystemSettings(
            key="chatbot_enabled", 
            value="false", # disabled by default per user request
            description="Enable or disable the Intelligence Chatbot globally"
        )
        db.add(chatbot_setting)
        db.commit()
        db.refresh(chatbot_setting)
        settings.append(chatbot_setting)
    return settings

@router.get("/{key}", response_model=schemas.SystemSettingResponse)
def get_setting(key: str, db: Session = Depends(get_db)):
    setting = db.query(models.SystemSettings).filter(models.SystemSettings.key == key).first()
    if not setting:
        if key == "chatbot_enabled":
             return {"key": "chatbot_enabled", "value": "false", "description": "Enable or disable the Intelligence Chatbot globally"}
        raise HTTPException(status_code=404, detail="Setting not found")
    return setting

@router.put("/{key}", response_model=schemas.SystemSettingResponse)
def update_setting(key: str, setting_update: schemas.SystemSettingUpdate, db: Session = Depends(get_db)):
    setting = db.query(models.SystemSettings).filter(models.SystemSettings.key == key).first()
    if not setting:
        # Allow creating new setting if missing
        setting = models.SystemSettings(key=key, value=setting_update.value)
        db.add(setting)
    else:
        setting.value = setting_update.value
        
    db.commit()
    db.refresh(setting)
    return setting
