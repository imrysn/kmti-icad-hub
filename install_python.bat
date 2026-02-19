@echo off
echo Check if Python is already installed...
python --version 2>NUL
if %ERRORLEVEL% EQU 0 (
    echo Python is already installed.
    python --version
) else (
    echo Python not found. Installing Python 3.11 using winget...
    winget install -e --id Python.Python.3.11
    if %ERRORLEVEL% NEQ 0 (
        echo Winget installation failed. Please install Python manually from https://www.python.org/downloads/
    ) else (
        echo Python installed successfully.
        echo You may need to restart your terminal or computer for changes to take effect.
        python --version
    )
)
pause
