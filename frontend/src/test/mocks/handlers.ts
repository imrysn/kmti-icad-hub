/**
 * src/test/mocks/handlers.ts
 *
 * MSW (Mock Service Worker) request handlers.
 * These intercept all API calls made during tests, returning predictable
 * responses so tests never hit a real backend.
 *
 * Organised by feature area to mirror the backend router structure.
 */

import { http, HttpResponse } from 'msw';

const API_BASE = (typeof import.meta.env !== 'undefined' && import.meta.env.VITE_API_URL) || 'http://127.0.0.1:3001';
const API = `${API_BASE.replace(/\/$/, '')}/api/v1`;

// ── Shared test data ──────────────────────────────────────────────

export const TEST_USERS = {
  trainee: {
    id: 1,
    username: 'trainee_test',
    email: 'trainee@test.kmti',
    full_name: 'Trainee Tester',
    role: 'trainee',
    is_active: true,
    created_at: '2025-01-01T00:00:00Z',
    last_login: '2025-06-01T00:00:00Z',
  },
  employee: {
    id: 2,
    username: 'employee_test',
    email: 'employee@test.kmti',
    full_name: 'Employee Tester',
    role: 'employee',
    is_active: true,
    created_at: '2025-01-01T00:00:00Z',
    last_login: '2025-06-01T00:00:00Z',
  },
  admin: {
    id: 3,
    username: 'admin_test',
    email: 'admin@test.kmti',
    full_name: 'Admin Tester',
    role: 'admin',
    is_active: true,
    created_at: '2025-01-01T00:00:00Z',
    last_login: '2025-06-01T00:00:00Z',
  },
};

export const TEST_TOKEN = 'mock.jwt.token.for.testing';

// ── Auth handlers ─────────────────────────────────────────────────

export const authHandlers = [
  // POST /auth/login
  http.post(`${API}/auth/login`, async ({ request }) => {
    const body = await request.json() as { username: string; password: string; required_role?: string };

    if (body.username === 'trainee_test' && body.password === 'Trainee@12345') {
      if (body.required_role === 'admin') {
        return HttpResponse.json(
          { detail: 'This account is not authorized for Administrator access.' },
          { status: 401 }
        );
      }
      return HttpResponse.json({
        access_token: TEST_TOKEN,
        token_type: 'bearer',
        user: TEST_USERS.trainee,
      });
    }

    if (body.username === 'admin_test' && body.password === 'Admin@12345') {
      return HttpResponse.json({
        access_token: `${TEST_TOKEN}_admin`,
        token_type: 'bearer',
        user: TEST_USERS.admin,
      });
    }

    return HttpResponse.json(
      { detail: 'Incorrect password. Please try again.' },
      { status: 401 }
    );
  }),

  // GET /auth/me
  http.get(`${API}/auth/me`, ({ request }) => {
    const auth = request.headers.get('Authorization');
    if (!auth || !auth.startsWith('Bearer ')) {
      return HttpResponse.json({ detail: 'Not authenticated' }, { status: 403 });
    }
    return HttpResponse.json(TEST_USERS.trainee);
  }),

  // GET /auth/users (admin only)
  http.get(`${API}/auth/users`, ({ request }) => {
    const auth = request.headers.get('Authorization');
    if (!auth?.includes('admin')) {
      return HttpResponse.json({ detail: 'Access denied.' }, { status: 403 });
    }
    return HttpResponse.json(Object.values(TEST_USERS));
  }),

  // PATCH /auth/users/:id/status
  http.patch(`${API}/auth/users/:id/status`, ({ params }) => {
    return HttpResponse.json({
      id: Number(params.id),
      username: 'trainee_test',
      is_active: false,
    });
  }),

  // POST /auth/register
  http.post(`${API}/auth/register`, async ({ request }) => {
    const body = await request.json() as { username: string; email: string; full_name: string; role: string };
    return HttpResponse.json(
      {
        id: 99,
        username: body.username,
        email: body.email,
        full_name: body.full_name,
        role: body.role,
        is_active: true,
      },
      { status: 201 }
    );
  }),

  // POST /auth/forgot-password
  http.post(`${API}/auth/forgot-password`, () => {
    return HttpResponse.json({
      message: 'If an account exists for that username/email, a reset request has been sent to the administrator.',
    });
  }),

  // POST /auth/submit-quiz
  http.post(`${API}/auth/submit-quiz`, async ({ request }) => {
    const body = await request.json() as { score: number };
    return HttpResponse.json({
      message: 'Score submitted successfully',
      score: body.score,
      passed: body.score >= 80,
    });
  }),

  // GET /auth/progress/:courseId
  http.get(`${API}/auth/progress/:courseId`, () => {
    return HttpResponse.json([
      {
        lesson_id: 'test-keyway-lesson',
        course_id: '2D_Drawing',
        is_completed: true,
        score: 85.0,
        completed_at: '2025-06-01T00:00:00Z',
      },
    ]);
  }),
];

// ── Assessment handlers ───────────────────────────────────────────

export const assessmentHandlers = [
  // GET /assessments/tasks
  http.get(`${API}/assessments/tasks`, () => {
    return HttpResponse.json([
      {
        id: 1,
        set_number: 1,
        task_code: 'A',
        title: 'Unit 1A — Front View',
        description: 'Draw the front orthographic view.',
        master_file_path: null,
        order: 0,
        created_at: '2025-01-01T00:00:00Z',
      },
    ]);
  }),

  // GET /assessments/my-submissions
  http.get(`${API}/assessments/my-submissions`, () => {
    return HttpResponse.json([
      {
        id: 1,
        task_id: 1,
        user_id: 1,
        submission_file_path: 'uploads/submissions/1/drawing.dwg',
        status: 'pending',
        trainer_id: null,
        submitted_at: '2025-06-01T00:00:00Z',
        updated_at: '2025-06-01T00:00:00Z',
        feedback: [],
        task: {
          id: 1,
          set_number: 1,
          task_code: 'A',
          title: 'Unit 1A — Front View',
          order: 0,
          created_at: '2025-01-01T00:00:00Z',
        },
      },
    ]);
  }),
];

// ── Notifications handlers ────────────────────────────────────────

export const notificationHandlers = [
  http.get(`${API}/notifications`, () => {
    return HttpResponse.json([]);
  }),
];

// ── System status ─────────────────────────────────────────────────

export const systemHandlers = [
  http.get(`${API}/system/status`, () => {
    return HttpResponse.json({
      status: 'online',
      db_mode: 'sqlite',
      nas_reachable: false,
      version: '1.0.0',
    });
  }),
];

// ── Combine all handlers ──────────────────────────────────────────

export const handlers = [
  ...authHandlers,
  ...assessmentHandlers,
  ...notificationHandlers,
  ...systemHandlers,
];
