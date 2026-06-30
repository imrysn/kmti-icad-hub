@echo off
set PATH=C:\Program Files\nodejs;%PATH%
cd /d "%~dp0frontend"
echo Starting Frontend (Electron + React)...
npm run electron:dev 
pause
