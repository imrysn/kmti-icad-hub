# KMTI iCAD Hub — Testing Guide

This directory contains the testing infrastructure and configurations for the frontend application. Tests are powered by **Vitest**, **React Testing Library (RTL)**, and **MSW (Mock Service Worker)**.

## Project Structure

- `setup.ts`: Global test setup (registers `jest-dom` matchers, initializes MSW lifecycle, and mocks the DOM environment).
- `mocks/server.ts`: Configures the MSW Node.js mock server.
- `mocks/handlers.ts`: Defines mock API endpoints matching backend route payloads (Auth, Assessments, System status, Notifications).

---

## How to Run Frontend Tests

Navigate to the `frontend/` directory first:
```bash
cd frontend
```

### 1. Run all tests
Runs the test suite once:
```bash
npm run test:run
```

### 2. Run in Watch Mode
Ideal during active development:
```bash
npm run test
```

### 3. Generate Coverage Report
Generates coverage details in the terminal and outputs HTML reports into `frontend/htmlcov/`:
```bash
npm run test:coverage
```

---

## How to Run Backend Tests (pytest)

Navigate to the project root directory:
```bash
cd ..
```

Execute the backend test suite using the virtual environment interpreter:
```bash
.\backend\venv\Scripts\pytest.exe
```

Coverage reports will be printed to the terminal and generated as HTML files under `htmlcov/`.
