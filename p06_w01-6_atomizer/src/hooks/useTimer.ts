import { useState, useEffect, useRef } from 'react';
import { TIMER_DURATION } from '../constants/colors';

export const useTimer = (duration: number = TIMER_DURATION) => {
    const [timeLeft, setTimeLeft] = useState(duration);
    const [isRunning, setIsRunning] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            intervalRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        setIsRunning(false);
                        setIsCompleted(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isRunning, timeLeft]);

    const start = () => {
        if (timeLeft > 0) {
            setIsRunning(true);
            setIsCompleted(false);
        }
    };

    const pause = () => {
        setIsRunning(false);
    };

    const reset = () => {
        setIsRunning(false);
        setTimeLeft(duration);
        setIsCompleted(false);
    };

    return {
        timeLeft,
        isRunning,
        isCompleted,
        start,
        pause,
        reset,
    };
};
