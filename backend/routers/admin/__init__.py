from fastapi import APIRouter
from .users import router as users_router
from .system import router as system_router
from .kb import router as kb_router
from .assessments import router as assessments_router
from .access_plans import router as access_plans_router
from .registrations import router as registrations_router
from .invitations import router as invitations_router
from .curriculum import router as curriculum_router
from .course_delivery import router as course_delivery_router

router = APIRouter(prefix="/admin", tags=["admin"])
router.include_router(users_router)
router.include_router(system_router)
router.include_router(kb_router)
router.include_router(assessments_router)
router.include_router(access_plans_router)
router.include_router(registrations_router)
router.include_router(invitations_router)
router.include_router(curriculum_router)
router.include_router(course_delivery_router)
