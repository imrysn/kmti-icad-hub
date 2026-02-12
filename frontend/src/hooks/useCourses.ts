import { useState, useEffect } from 'react';
import { getCourses } from '../services/api';
import { Course } from '../types';

export const useCourses = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            try {
                const data = await getCourses();
                setCourses(data.courses);
            } catch (err) {
                setError('Failed to fetch courses');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    return { courses, loading, error };
};
