@echo off
setlocal

echo ============================================================
echo      KMTI iCAD Hub - Full Project Setup
echo ============================================================
echo.

:: Step 1: Install Python (if needed)
echo [1/3] Checking Python installation...
call install_python.bat

:: Step 2: Set up Backend (venv + dependencies + database)
echo.
echo [2/3] Setting up Backend environment...
call setup_dev_env.bat

:: Step 3: Set up Frontend (npm install)
echo.
echo [3/3] Setting up Frontend environment...
cd /d "%~dp0frontend"
echo Running npm install in frontend...
call npm install
if %ERRORLEVEL% neq 0 (
    echo.
    echo ⚠️  Wait! npm install failed. 
    echo Please make sure you have Node.js installed from nodejs.org
    pause
    exit /b 1
)

echo.
echo ============================================================
echo ✅ SETUP COMPLETE!
echo ============================================================
echo.
echo You can now start the application:
echo 1. Run run_backend.bat
echo 2. Run run_frontend.bat (after backend starts)
echo.
pause
