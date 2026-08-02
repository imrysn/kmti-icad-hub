# Goal Description
Resolve the issue where only 3 default accounts are accessible during Local Mode by implementing a "Sync-Down" mechanism that caches cloud users to the local SQLite database.

## Problem Context
Currently, the application only pushes data from SQLite to MySQL (`backend/sync_worker.py`). There is no mechanism to pull data down. If the network drops and the app falls back to SQLite, the local database remains empty except for the 3 default test users seeded by `server.py` (`admin`, `employee`, `trainee`). Real user accounts exist only in MySQL, making them inaccessible during an outage.

## Proposed Changes

### `backend/sync_worker.py`
We will add a "Sync-Down" phase to the background worker. While the application is online and `DB_MODE == "mysql"`, the sync worker will periodically clone critical tables from MySQL to the local SQLite database.

- **Tables to Sync Down**: 
  - `users` (Ensures all users can log in offline)
  - `trainer_trainee_mappings` (Ensures mentors can see their assigned trainees offline)
  - `trainee_set_mappings`
  - `system_settings`
- **Sync Logic**: 
  - Query MySQL for records.
  - Insert missing records into SQLite.
  - Update existing records in SQLite if the MySQL timestamp is newer.

## Verification Plan
1. Start the application while connected to MySQL.
2. Create a new test user in MySQL.
3. Wait for the sync worker to cycle.
4. Simulate a network outage by turning off MySQL or forcing `DB_MODE="sqlite"`.
5. Verify that the newly created user can successfully log in using Local Mode.
