# 🚀 Project Setup Guide

Welcome! This guide will help you set up and run the **kMTI iCAD Hub** application on a new Windows computer. No prior coding experience required!

---

## 📋 Prerequisites

Before you start, you only need to download and install **one** tool:

### 1. Install Node.js
*Node.js is used to run the frontend (the visual part) of the application.*
1. Go to [nodejs.org](https://nodejs.org/).
2. Download the **"LTS"** (Long Term Support) version.
3. Run the installer and click **Next** for all steps.

*(Note: The setup script will handle installing Python for you if you don't have it!)*

### 2. Install Git (If you haven't already)
*Git is used to download the project code from GitHub.*
1. Go to [git-scm.com](https://git-scm.com/downloads) and download the Windows version.
2. Run the installer and click **Next** for all steps (the default settings are perfect).

---

## 🛠️ Installation Steps

Follow these simple steps to set up the project:

### Step 1: Clone the Repository
Before you can run the app, you need to download the source code to your computer.
1. Open your terminal (Command Prompt or PowerShell).
2. Navigate to the folder where you want to save the project (e.g., `cd Desktop`).
3. Run the following command to clone the project:
   ```bash
   git clone https://github.com/imrysn/kmti-icad-hub.git
   ```
4. Once it finishes downloading, move into the new folder:
   ```bash
   cd kmti-icad-hub
   ```

### Step 2: Run the One-Click Setup
We have included a script that does all the hard work for you!
1. Locate the file named **`setup_project.bat`** in the main folder.
2. **Double-click** it to run.
3. A terminal window will open and automatically:
   - Check/Install Python.
   - Create the Backend "virtual environment."
   - Initialize the Database and create Test Users.
   - Install the Frontend libraries (`npm install`).
4. Once it says "SETUP COMPLETE!", you can close the window.

---

## 🏃 How to Run the Application

To start the app, you need to run both the Backend and the Frontend. You can do this via the provided batch files or directly from your terminal:

### Option A: Using Batch Files (Easiest)
1. **Start the Backend**: Double-click **`run_backend.bat`**. Keep this window open!
2. **Start the Frontend**: Double-click **`run_frontend.bat`**.

### Option B: Using Terminal Commands (For Developers)
Open two separate terminal windows at the root of the project (`kmti-icad-hub`) and run the following:

1. **Start the Backend** (with hot-reload):
   ```bash
   .\backend\venv\Scripts\python.exe -m uvicorn backend.main:app --reload
   ```
2. **Start the Frontend**:
   ```bash
   .\run_frontend.bat
   ```

The application window should open shortly!

---

## 👤 Initial Login Accounts
You can log in with any of these test accounts:

*   **Trainee**: `trainee` (password: `1234`)
*   **Employee**: `employee` (password: `1234`)
*   **Admin**: `admin` (password: `admin123`)

---

## 🌐 Network & API Configuration (Custom Server IP)

By default, the frontend connects to the backend API locally at `http://localhost:3001` or `http://127.0.0.1:3001`.

If you are hosting the backend on a different machine in your network (for example, `192.168.200.105`), you can configure the API URL manually:

1. Open the `frontend` folder.
2. Create a new file named **`.env`** (if it doesn't already exist).
3. Add the following line to the file, replacing the IP with your server's IP:
   ```env
   VITE_API_URL=http://192.168.200.105:3001
   ```
4. Restart your frontend server or rebuild the application for the changes to take effect.

---

## 📦 Packaging & Deployment

When you are ready to compile the application into a standalone desktop executable (for production):
1. Locate and double-click **`build_and_verify.bat`**.
2. Wait for the process to finish (it will automatically install testing requirements, run tests, and package the Electron app).
3. Your finished executables will be available at:
   - **Frontend Setup**: `frontend/dist-electron/KMTI Training Hub Setup 1.0.1.exe`
   - **Backend Server**: `backend/dist/KMTI_iCAD_Server.exe`
   
> **Note on Permissions**: If the packaging step crashes with a "Cannot create symbolic link" error, run the terminal as Administrator or enable Developer Mode in your Windows settings.

---

## 🔧 Troubleshooting

- **"Node.js not found"**: Ensure you installed Node.js from [nodejs.org](https://nodejs.org/).
- **"npm is not recognized"**: Restart your computer after installing Node.js.
- **npm/PowerShell Error**: If you see "running scripts is disabled on this system", open a PowerShell window and run: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force`.
- **Backend Error**: Ensure you ran `setup_project.bat` successfully before starting.

---

*Need more help? Refer to the ARCHITECTURE.md or TERMINAL_GUIDE.md for more technical details.*
