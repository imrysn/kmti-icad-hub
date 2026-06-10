from fastapi import APIRouter
from .users import router as users_router
from .system import router as system_router
from .kb import router as kb_router
from .assessments import router as assessments_router

router = APIRouter(prefix="/admin", tags=["admin"])
router.include_router(users_router)
router.include_router(system_router)
router.include_router(kb_router)
router.include_router(assessments_router)
