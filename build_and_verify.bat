@echo off
echo ============================================================
echo      KMTI iCAD Hub - Build and Verification Script
echo ============================================================
echo.

:: Step 1: Install backend testing dependencies
echo [1/5] Installing backend testing dependencies (requirements, pytest, pytest-cov, httpx)...
cd /d "%~dp0backend"
venv\Scripts\python.exe -m pip install -r requirements.txt pytest pytest-cov httpx
if %ERRORLEVEL% neq 0 (
    echo.
    echo ERROR: Failed to install testing dependencies.
    pause
    exit /b 1
)

:: Step 2: Run backend test suite
echo.
echo [2/5] Running Backend Tests...
cd /d "%~dp0"
backend\venv\Scripts\python.exe -m pytest
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
echo [3/5] Running Frontend Tests...
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

:: Step 4: Generate build metadata after all tests pass
echo.
echo [4/5] Generating Version and Build Metadata...
cd /d "%~dp0"
node scripts\generate-build-info.js
if %ERRORLEVEL% neq 0 (
    echo.
    echo ERROR: Failed to generate build metadata.
    pause
    exit /b 1
)

:: Step 5: Run full orchestration build script
echo.
echo [5/5] Starting Full Build and Packaging...
cd /d "%~dp0frontend"
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
