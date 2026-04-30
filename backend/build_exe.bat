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
call venv\Scripts\activate
pip install -r requirements.txt
pip install pyinstaller

echo Cleaning old builds...
if exist "dist" rd /s /q "dist"
if exist "build" rd /s /q "build"

echo Building Standalone EXE...
:: --onefile: Create a single executable
:: --name: Name of the output file
:: --add-data: Include static files if needed (though we'll look for them externally)
:: --hidden-import: Ensure all FastAPI/Uvicorn modules are included
python -m PyInstaller --onefile ^
    --name KMTI_iCAD_Server ^
    --icon=NONE ^
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
    server.py

echo ===================================================
echo   Build Complete!
echo   Output: backend/dist/KMTI_iCAD_Server.exe
echo ===================================================
popd
pause
