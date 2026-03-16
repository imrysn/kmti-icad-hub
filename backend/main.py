import os
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .database import engine, Base, get_db
from .models import User
from .services.search_service import search_service
from .services.course_service import course_service
from .schemas import SearchResponse, CourseList, CourseProgress
from .routers import auth, admin
from .auth.dependencies import get_current_user

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="KMTI iCAD Hub API")

from fastapi.staticfiles import StaticFiles

# Enable CORS for Electron app and dev servers
origins = os.getenv("CORS_ORIGINS", "").split(",")
if not origins or origins == ['']:
    # Fallback only for local dev if not specified
    origins = ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount frontend/src directory to serve RAG multimedia links and other source assets
frontend_src_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "frontend", "src")
if os.path.exists(frontend_src_path):
    app.mount("/src", StaticFiles(directory=frontend_src_path), name="src")

# Include routers
app.include_router(auth.router)
app.include_router(admin.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to KMTI iCAD Hub API"}

@app.get("/search", response_model=SearchResponse)
def search_knowledge_base(query: str, current_user: User = Depends(get_current_user)):
    """
    Search the RAG knowledge base. Requires authentication.
    """
    return search_service.search_knowledge_base(query)

@app.get("/courses", response_model=CourseList)
def get_courses(current_user: User = Depends(get_current_user)):
    """
    Get list of available courses. Requires authentication.
    """
    return course_service.get_available_courses()

@app.get("/courses/{course_id}/progress/{user_id}", response_model=CourseProgress)
def get_progress(course_id: str, user_id: str, db: Session = Depends(get_db),
                 current_user: User = Depends(get_current_user)):
    """
    Get user progress for a specific course. Requires authentication.
    """
    return course_service.get_user_progress(db, course_id, user_id)
