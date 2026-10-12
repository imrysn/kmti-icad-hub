import { act, cleanup, renderHook, waitFor } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import { useCourses } from '../useCourses';
import { getCourses } from '../../services/api';

vi.mock('../../services/api', () => ({ getCourses: vi.fn() }));
afterEach(() => { cleanup(); vi.clearAllMocks(); });

it('excludes retired courses on initial load and global refresh', async () => {
    const courses = ['iCAD_Foundations', 'iCAD_Professional', '3D_Modeling', '2D_Drawing']
        .map((course_type, index) => ({ id: String(index), title: course_type, course_type }));
    vi.mocked(getCourses).mockResolvedValue({ courses } as Awaited<ReturnType<typeof getCourses>>);
    const { result } = renderHook(() => useCourses());
    await waitFor(() => expect(result.current.courses).toHaveLength(2));
    expect(result.current.courses.map(course => course.course_type))
        .toEqual(['iCAD_Foundations', 'iCAD_Professional']);
    act(() => { window.dispatchEvent(new Event('kmti-global-refresh')); });
    await waitFor(() => expect(getCourses).toHaveBeenCalledTimes(2));
    expect(result.current.courses.map(course => course.course_type))
        .toEqual(['iCAD_Foundations', 'iCAD_Professional']);
});
