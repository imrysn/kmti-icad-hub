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

---

## 🛠️ Installation Steps

Follow these simple steps to set up the project:

### Step 1: Open the Project Folder
Open the folder where you have the project files (e.g., `kmti-icad-hub`).

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

To start the app, you need to run both the Backend and the Frontend:

1. **Start the Backend**: Double-click **`run_backend.bat`**. Keep this window open!
2. **Start the Frontend**: Double-click **`run_frontend.bat`**.

The application window should open shortly!

---

## 👤 Initial Login Accounts
You can log in with any of these test accounts:

*   **Trainee**: `trainee` (password: `trainee123`)
*   **Employee**: `employee` (password: `employee123`)
*   **Admin**: `admin` (password: `admin123`)

---

## 🔧 Troubleshooting

- **"Node.js not found"**: Ensure you installed Node.js from [nodejs.org](https://nodejs.org/).
- **"npm is not recognized"**: Restart your computer after installing Node.js.
- **Backend Error**: Ensure you ran `setup_project.bat` successfully before starting.

---

*Need more help? Refer to the ARCHITECTURE.md or TERMINAL_GUIDE.md for more technical details.*
