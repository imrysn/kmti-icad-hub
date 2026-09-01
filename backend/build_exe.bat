@echo off
pushd %~dp0
echo ===================================================
echo   KMTI iCAD Hub - EXE Builder
echo ===================================================

:: Check for virtual environment in the current folder (backend/venv)
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

echo Installing dependencies...
venv\Scripts\python.exe -m pip install -r requirements.txt
venv\Scripts\python.exe -m pip install pyinstaller

echo Cleaning old builds...
if exist "dist" rd /s /q "dist"
if exist "build" rd /s /q "build"

if exist "KMTI_iCAD_Server.spec" del /q "KMTI_iCAD_Server.spec"
venv\Scripts\python.exe -m PyInstaller --onefile --console ^
    --name KMTI_iCAD_Server ^
    --icon=kmti_logo.ico ^
    --add-data="kmti_logo.ico;." ^
    --distpath=dist ^
    --workpath=build ^
    --hidden-import=uvicorn.logging ^
    --hidden-import=uvicorn.loops ^
    --hidden-import=uvicorn.loops.auto ^
    --hidden-import=uvicorn.protocols ^
    --hidden-import=uvicorn.protocols.http ^
    --hidden-import=uvicorn.protocols.http.auto ^
    --hidden-import=uvicorn.protocols.websockets ^
    --hidden-import=uvicorn.protocols.websockets.auto ^
    --hidden-import=uvicorn.lifespan ^
    --hidden-import=uvicorn.lifespan.on ^
    --hidden-import=pymysql ^
    --collect-all chromadb ^
    --collect-all language_tags ^
    --collect-all segments ^
    --collect-all csvw ^
    --collect-all espeakng_loader ^
    --collect-all scipy ^
    --collect-all librosa ^
    server.py

if errorlevel 1 (
    echo ERROR: Backend executable build failed.
    popd
    exit /b 1
)

if exist ".env" (
    copy /y ".env" "dist\.env" >nul
    if errorlevel 1 (
        echo ERROR: Failed to copy the protected runtime configuration to backend\dist.
        popd
        exit /b 1
    )
    echo Runtime configuration copied to backend\dist\.env
) else (
    echo WARNING: backend\.env was not found. The server requires a protected .env beside the executable.
)

echo ===================================================
echo   Build Complete!
echo   Output: backend/dist/KMTI_iCAD_Server.exe
echo ===================================================
popd
