Project Architecture & Contribution Guidelines
Core Philosophy
This project adopts a Strict Separation of Concerns and adheres to the Single Responsibility Principle (SRP). All contributors, especially AI agents, must act as Senior Software Engineers, ensuring code is modular, testable, and maintainable.

Architectural Standards
1. Frontend (React + Electron)
View Layer (Components): strictly for UI rendering. No business logic or direct API calls.
Logic Layer (Hooks): Custom hooks (useSearch, useCourses) handle state and side effects.
Data Layer (Services): api.ts or specific service modules handle all HTTP communication.
Structure:
text
src/
├── components/   # Pure UI components (dumb components)
├── hooks/        # State logic & effects (smart logic)
├── services/     # API calls & data transformation
├── types/        # TypeScript interfaces
└── views/        # Page-level composition
2. Backend (FastAPI)
Routers (
main.py
 / routers/): Handle HTTP request/response parsing only. Delegate logic to Services.
Service Layer (services/): Contains the actual business logic (e.g., SearchService, CourseService).
Data Layer (repositories/ or direct ORM): Database interactions.
Models: Pydantic models (DTOs) separate from SQLAlchemy models (DB Entities).
AI Agent Guidelines
When modifying this codebase, you MUST:

Stop and Think: deeply about where code belongs. Do not dump logic into 
App.tsx
 or 
main.py
.
Refactor First: If you see a violation of SRP, fix it before adding new features.
Explain Why: Provide architectural reasoning for your changes.
Create Placeholders: If a layer is needed but empty, create the file/class to set the pattern.
"If you found the code better than you left it, you have done your job."