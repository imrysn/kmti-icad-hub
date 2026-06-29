@echo off
echo ============================================================
echo      KMTI iCAD Hub - Build and Verification Script
echo ============================================================
echo.

:: Step 1: Install backend testing dependencies
echo [1/4] Installing backend testing dependencies (requirements, pytest, pytest-cov, httpx)...
cd /d "%~dp0backend"
call venv\Scripts\activate.bat
pip install -r requirements.txt pytest pytest-cov httpx
if %ERRORLEVEL% neq 0 (
    echo.
    echo ERROR: Failed to install testing dependencies.
    pause
    exit /b 1
)

:: Step 2: Run backend test suite
echo.
echo [2/4] Running Backend Tests...
cd /d "%~dp0"
pytest
if %ERRORLEVEL% neq 0 (
    echo.
    echo ERROR: Backend tests failed.
    pause
    exit /b 1
)
echo.
echo Backend tests passed successfully!

:: Step 3: Run frontend test suite
echo.
echo [3/4] Running Frontend Tests...
cd /d "%~dp0frontend"
call npm run test:run
if %ERRORLEVEL% neq 0 (
    echo.
    echo ERROR: Frontend tests failed.
    pause
    exit /b 1
)
echo.
echo Frontend tests passed successfully!

:: Step 4: Run full orchestration build script
echo.
echo [4/4] Starting Full Build and Packaging...
node build-all.js
if %ERRORLEVEL% neq 0 (
    echo.
    echo ERROR: Build orchestration failed.
    
    pause
    exit /b 1
)

echo.
echo ============================================================
echo SUCCESS: All tests passed and builds completed!
echo ============================================================
echo.
pause
