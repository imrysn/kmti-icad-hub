/**
 * src/services/__tests__/assessmentService.test.ts
 *
 * Unit tests for assessmentService.ts.
 * MSW intercepts all HTTP calls. Tests verify correct return shapes
 * and URL helper methods.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '../../test/mocks/server';
import { assessmentService } from '../assessmentService';

const API_BASE = (typeof import.meta.env !== 'undefined' && import.meta.env.VITE_API_URL) || 'http://127.0.0.1:3001';
const API = API_BASE.replace(/\/$/, '');

beforeEach(() => {
  sessionStorage.setItem('access_token', 'mock.jwt.token');
});

// ══════════════════════════════════════════════════════════════════
// getTasks()
// ══════════════════════════════════════════════════════════════════

describe('assessmentService.getTasks()', () => {
  it('returns an array of tasks', async () => {
    const tasks = await assessmentService.getTasks();
    expect(Array.isArray(tasks)).toBe(true);
    expect(tasks.length).toBeGreaterThan(0);
  });

  it('tasks have required fields', async () => {
    const tasks = await assessmentService.getTasks();
    const task = tasks[0];
    expect(task).toHaveProperty('id');
    expect(task).toHaveProperty('set_number');
    expect(task).toHaveProperty('task_code');
    expect(task).toHaveProperty('title');
  });
});

// ══════════════════════════════════════════════════════════════════
// getMySubmissions()
// ══════════════════════════════════════════════════════════════════

describe('assessmentService.getMySubmissions()', () => {
  it('returns an array of submissions', async () => {
    const subs = await assessmentService.getMySubmissions();
    expect(Array.isArray(subs)).toBe(true);
    expect(subs.length).toBeGreaterThan(0);
  });

  it('submissions have expected status values', async () => {
    const subs = await assessmentService.getMySubmissions();
    for (const sub of subs) {
      expect(['pending', 'approved', 'rejected']).toContain(sub.status);
    }
  });
});

// ══════════════════════════════════════════════════════════════════
// getDownloadUrl() — pure URL helper (no network call)
// ══════════════════════════════════════════════════════════════════

describe('assessmentService.getDownloadUrl()', () => {
  it('returns the expected URL format', () => {
    const url = assessmentService.getDownloadUrl(42);
    expect(url).toContain('/api/v1/assessments/tasks/42/download');
  });
});

describe('assessmentService.getFeedbackDownloadUrl()', () => {
  it('returns the expected URL format', () => {
    const url = assessmentService.getFeedbackDownloadUrl(7);
    expect(url).toContain('/api/v1/assessments/feedback/7/download');
  });
});

// ══════════════════════════════════════════════════════════════════
// deleteSubmission() — with inline handler override
// ══════════════════════════════════════════════════════════════════

describe('assessmentService.deleteSubmission()', () => {
  it('returns success message on delete', async () => {
    server.use(
      http.delete(`${API}/api/v1/assessments/submissions/1`, () => {
        return HttpResponse.json({ message: 'Submission deleted successfully' });
      })
    );
    const result = await assessmentService.deleteSubmission(1);
    expect(result.message).toBe('Submission deleted successfully');
  });

  it('throws on 404 not found', async () => {
    server.use(
      http.delete(`${API}/api/v1/assessments/submissions/9999`, () => {
        return HttpResponse.json({ detail: 'Submission record not found in database.' }, { status: 404 });
      })
    );
    await expect(assessmentService.deleteSubmission(9999)).rejects.toThrow();
  });
});

// ══════════════════════════════════════════════════════════════════
// assignTrainer() — with inline handler override
// ══════════════════════════════════════════════════════════════════

describe('assessmentService.assignTrainer()', () => {
  it('returns success message', async () => {
    server.use(
      http.post(`${API}/api/v1/assessments/admin/assign`, () => {
        return HttpResponse.json({ message: 'Trainer assigned successfully' });
      })
    );
    const result = await assessmentService.assignTrainer({ trainer_id: 2, trainee_id: 1 });
    expect(result.message).toContain('assigned');
  });
});

// ══════════════════════════════════════════════════════════════════
// deleteTask()
// ══════════════════════════════════════════════════════════════════

describe('assessmentService.deleteTask()', () => {
  it('calls the correct endpoint and returns success', async () => {
    server.use(
      http.delete(`${API}/api/v1/assessments/admin/tasks/5`, () => {
        return HttpResponse.json({ message: 'Task deleted successfully' });
      })
    );
    const result = await assessmentService.deleteTask(5);
    expect(result.message).toContain('deleted');
  });
});
