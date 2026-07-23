import { useCallback,useEffect,useState } from 'react';

export const useTaskTimer = (userId: number, taskId: number, initialBaseTime: number = 0) => {
    const storageKey = `task_timer_${userId}_${taskId}`;

    const [isRunning, setIsRunning] = useState(false);
    const [elapsedSeconds, setElapsedSeconds] = useState(() => {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
            const savedNum = parseInt(saved, 10);
            return savedNum > initialBaseTime ? savedNum : initialBaseTime;
        }
        return initialBaseTime;
    });

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRunning) {
            interval = setInterval(() => {
                setElapsedSeconds(prev => {
                    const next = prev + 1;
                    localStorage.setItem(storageKey, next.toString());
                    return next;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning, storageKey]);

    const startTimer = useCallback(() => setIsRunning(true), []);
    const stopTimer = useCallback(() => setIsRunning(false), []);

    const resetTimer = useCallback(() => {
        setIsRunning(false);
        setElapsedSeconds(0);
        localStorage.setItem(storageKey, '0');
    }, [storageKey]);

    const formatTime = (totalSeconds: number) => {
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return {
        elapsedSeconds,
        formattedTime: formatTime(elapsedSeconds),
        isRunning,
        startTimer,
        stopTimer,
        resetTimer,
        formatTime
    };
};
