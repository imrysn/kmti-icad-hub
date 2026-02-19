@echo off
setlocal

echo Checking for Python...

:: Try 'py' launcher first (standard on Windows)
py --version >nul 2>&1
if %ERRORLEVEL% equ 0 (
    echo Found 'py' launcher.
    set PYTHON_CMD=py
    goto :found
)

:: Try 'python' comamnd
python --version >nul 2>&1
if %ERRORLEVEL% equ 0 (
    echo Found 'python' executable.
    set PYTHON_CMD=python
    goto :found
)

:: Try 'python3' command
python3 --version >nul 2>&1
if %ERRORLEVEL% equ 0 (
    echo Found 'python3' executable.
    set PYTHON_CMD=python3
    goto :found
)

echo.
echo Error: Python not found in PATH.
echo Please ensure Python is installed and added to your system PATH.
echo You can try reinstalling it and checking "Add Python to PATH" during installation.
exit /b 1

:found
echo Using: %PYTHON_CMD%
%PYTHON_CMD% --version

echo.
echo Setting up virtual environment in backend\venv...
cd backend
if exist venv (
    echo Virtual environment already exists.
) else (
    %PYTHON_CMD% -m venv venv
    if %ERRORLEVEL% neq 0 (
        echo Failed to create virtual environment.
        exit /b 1
    )
    echo Virtual environment created.
)

echo.
echo Activating virtual environment...
call venv\Scripts\activate.bat

echo.
echo Installing dependencies...
pip install -r requirements.txt
if %ERRORLEVEL% neq 0 (
    echo Failed to install dependencies.
    exit /b 1
)

echo.
echo Setup complete!
echo To start the backend, run: run_backend.bat
pause
