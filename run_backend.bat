@echo off
cd /d "%~dp0"
set "ENV_FILE_PATH=%~dp0backend\.env.lms-development"
echo Starting isolated LMS Backend Server on port 3002...
.\backend\venv\Scripts\python.exe -m uvicorn backend.main:app --host 127.0.0.1 --port 3002 --reload
pause
