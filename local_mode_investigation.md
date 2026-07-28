# Investigation Report: Local Mode Trigger

## Overview
This report details the investigation into why the KMTI iCAD Hub application switches to **"Local Mode"** when the internet or network connection is lost. The investigation traced the behavior from the frontend UI indicators down to the backend database configuration.

## Root Cause Analysis
The application is intentionally designed with a high-availability database failover system. When network connectivity is lost, the application automatically falls back to a local database to prevent data loss and allow uninterrupted usage.

Here is the step-by-step breakdown of how this occurs:

### 1. Database Connection Failure
The application's backend is configured to use a primary MySQL database, which is typically hosted on a Network Attached Storage (NAS) device or a remote server. When the network connection drops, the backend is no longer able to reach the MySQL database.

### 2. Graceful Fallback (`backend/database.py`)
The backend uses SQLAlchemy with a `DynamicSessionmaker` and connection pooling (`pool_pre_ping=True`). When a database query is attempted or when the application starts up, it performs a lightweight check (`SELECT 1`) to verify the connection.
- If the MySQL connection times out or fails due to network loss, the application catches the exception.
- It immediately changes the internal `DB_MODE` variable from `"mysql"` to `"sqlite"`.
- It switches to using a local SQLite database file (`kmti_icad.db`) stored on the machine running the backend.

### 3. System Status Endpoint (`backend/main.py`)
The backend exposes an endpoint at `/api/v1/system/status` that reports the current health of the system.
- This endpoint checks the active `DB_MODE`.
- It evaluates the boolean `nas_reachable` by checking if the mode is still `"mysql"` (`get_db_mode() == "mysql"`).
- Since the mode fell back to `"sqlite"`, it returns `"nas_reachable": false`.

### 4. Frontend UI Update (`frontend/src/App.tsx`)
The frontend React application periodically fetches the system status using `getSystemStatus()`. 
- When it receives the response indicating that `nas_reachable` is `false`, it updates its state.
- The UI reacts to this state change by rendering the **"Local Mode"** badge with a `WifiOff` icon.
- A tooltip is provided explaining: *"NAS Connection Lost - Progress stored on Server PC"*.

## Recovery Mechanism
The application also includes an automatic recovery mechanism. The backend function `check_mysql_recovery()` runs periodically (every 10 seconds). 
Once the network/internet connection is restored:
1. The backend successfully pings the MySQL database.
2. `DB_MODE` is switched back to `"mysql"`.
3. The frontend status poll detects `nas_reachable: true`.
4. The "Local Mode" badge disappears, and the application resumes normal networked operation.

## Conclusion
The switch to "Local Mode" is not a bug, but a robust **offline-first / failover feature**. It ensures that trainees or mentors do not lose their progress when the primary NAS database becomes unreachable due to network outages.
