@echo off
cd /d "%~dp0"
echo Starting Backend Server...
.\backend\venv\Scripts\python.exe -m uvicorn backend.main:app --reload
pause
