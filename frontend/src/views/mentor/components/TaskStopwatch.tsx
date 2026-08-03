import { Clock,Pause,Play,RotateCcw } from 'lucide-react';
import { forwardRef,useImperativeHandle } from 'react';
import { useTaskTimer } from '../../../hooks/useTaskTimer';

interface TaskStopwatchProps {
    userId: number;
    taskId: number;
    initialBaseTime?: number;
}

export interface TaskStopwatchHandle {
    startTimer: () => void;
    stopTimer: () => void;
    resetTimer: () => void;
    getElapsedSeconds: () => number;
}

export const TaskStopwatch = forwardRef<TaskStopwatchHandle, TaskStopwatchProps>(({ userId, taskId, initialBaseTime = 0 }, ref) => {
    const {
        elapsedSeconds,
        formattedTime,
        isRunning,
        startTimer,
        stopTimer,
        resetTimer
    } = useTaskTimer(userId, taskId, initialBaseTime);

    useImperativeHandle(ref, () => ({
        startTimer,
        stopTimer,
        resetTimer,
        getElapsedSeconds: () => elapsedSeconds
    }));

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.25rem 0.75rem', borderRadius: '4px', marginLeft: '1rem' }}>
            <Clock size={14} className={isRunning ? 'text-blue-400' : 'text-gray-400'} />
            <span style={{ fontSize: '0.85rem', fontFamily: 'monospace', fontWeight: 'bold', color: isRunning ? 'var(--primary-color, #3b82f6)' : 'var(--text-main)' }}>
                {formattedTime}
            </span>
            <div style={{ display: 'flex', gap: '0.25rem', marginLeft: '0.5rem' }}>
                {!isRunning ? (
                    <button type="button" className="stopwatch-control-btn" onClick={startTimer} title="Start Timer" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', color: 'var(--success-color, #22c55e)' }}>
                        <Play size={14} />
                    </button>
                ) : (
                    <button type="button" className="stopwatch-control-btn" onClick={stopTimer} title="Pause Timer" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', color: 'var(--warning-color, #f59e0b)' }}>
                        <Pause size={14} />
                    </button>
                )}
                <button type="button" className="stopwatch-control-btn" onClick={resetTimer} title="Reset Timer" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', color: 'var(--text-secondary, #a0a0a0)' }}>
                    <RotateCcw size={14} />
                </button>
            </div>
            <style>{`
                .stopwatch-control-btn {
                    transition: opacity 0.2s ease, transform 0.1s ease !important;
                }
                .stopwatch-control-btn:hover {
                    background: transparent !important;
                    box-shadow: none !important;
                    transform: scale(1.1) !important;
                    border-color: transparent !important;
                    opacity: 0.6;
                }
                .stopwatch-control-btn:active {
                    transform: scale(0.95) !important;
                }
            `}</style>
        </div>
    );
});

TaskStopwatch.displayName = 'TaskStopwatch';
