# KMTI iCAD Hub - Server PC Deployment Guide

This guide explains how to deploy the standalone `KMTI_iCAD_Server.exe` on your Server PC and configure it to work with your NAS network.

## Prerequisites
- Windows Server or Windows 10/11 PC.
- Access to the NAS (for MySQL database and shared data).
- The `KMTI_iCAD_Server.exe` (generated via `build_exe.bat`).

## 1. Prepare Deployment Folder
On your Server PC, create a folder (e.g., `C:\KMTI_Server`) and place the following files inside:
- `KMTI_iCAD_Server.exe`
- `.env` (Create this from the template below)
- `kmti_icad.db` (The SQLite fallback database)

## 2. Configure the `.env` File
Create a `.env` file in the same folder as the `.exe`. Use the following configuration:

```env
# Database Configuration
USE_MYSQL=true
DB_HOST=192.168.200.105 # Your NAS IP
DB_PORT=3306
DB_NAME=kmtihub
DB_USER=kmtifms_user
DB_PASSWORD=Ph15IcadRs

# Server Configuration
SERVER_PORT=8000
CORS_ORIGINS=http://localhost:5173,app://.

# Paths
# Path to media assets (if not using default frontend/src)
STATIC_ASSETS_PATH=\\KMTI-NAS\Shared\data\assets
# Path to vector database
VECTOR_DB_PATH=.\vector_db
```

## 3. Running the Server
Simply double-click `KMTI_iCAD_Server.exe`. A command prompt will open with the KMTI banner and status report.

### Database Modes
- **Network Mode (MySQL):** The server successfully connected to the NAS.
- **Local Fallback Mode (SQLite):** The server could not reach the NAS and is using the local `kmti_icad.db` file. Progress will be synced once the connection is restored.

## 4. Frontend Configuration
When building the frontend for production, ensure you use the `.env.production` settings:
1. Run `npm run build` in the `frontend` directory.
2. The built Electron app will automatically target `http://192.168.200.105:8000`.

## 5. Maintenance
- **Logs:** The server console displays real-time logs.
- **Backups:** Ensure you back up the `kmti_icad.db` and the MySQL database on the NAS regularly.
- **Sync:** The server automatically syncs data from SQLite to MySQL when it detects the connection is back (if implemented in future updates).
