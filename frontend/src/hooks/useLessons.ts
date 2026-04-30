import { useState, useEffect, useMemo } from 'react';
import { getCourseLessons } from '../services/api';
import { Lesson } from '../views/mentor/mentorConstants';

export const useLessons = (courseId: string | number | undefined) => {
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!courseId) {
            setLessons([]);
            return;
        }

        const fetchLessons = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getCourseLessons(courseId);
                setLessons(data);
            } catch (err) {
                setError('Failed to fetch lessons');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchLessons();
    }, [courseId]);

    const allLessonIds = useMemo(() => {
        const ids: string[] = [];
        const traverse = (list: Lesson[]) => {
            list.forEach(l => {
                if (l.children && l.children.length > 0) {
                    traverse(l.children);
                } else {
                    ids.push(l.id);
                }
            });
        };
        traverse(lessons);
        return ids;
    }, [lessons]);

    const completableModuleIds = useMemo(() => {
        const ids: string[] = [];
        const traverse = (list: Lesson[]) => {
            list.forEach(l => {
                // If it has a quiz, it's a completable module
                if (l.quiz) {
                    ids.push(l.id);
                }
                if (l.children && l.children.length > 0) {
                    traverse(l.children);
                }
            });
        };
        traverse(lessons);
        return ids;
    }, [lessons]);

    return { lessons, loading, error, allLessonIds, completableModuleIds };
};
