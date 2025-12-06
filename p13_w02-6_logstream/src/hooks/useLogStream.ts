import { useEffect } from 'react';
import { NativeEventEmitter, NativeModules } from 'react-native';
import { useLogStore } from '../store/useLogStore';
import { parseLogLine } from '../utils/logParser';

const { LogcatModule } = NativeModules;
const eventEmitter = new NativeEventEmitter(LogcatModule);

export const useLogStream = () => {
    const isCapturing = useLogStore((state) => state.isCapturing);
    const addLog = useLogStore((state) => state.addLog);

    useEffect(() => {
        if (isCapturing) {
            LogcatModule.start();
        } else {
            LogcatModule.stop();
        }

        const subscription = eventEmitter.addListener('LogcatEvent', (line: string) => {
            const parsed = parseLogLine(line);
            if (parsed) {
                addLog(parsed);
            }
        });

        return () => {
            subscription.remove();
            // Only stop if component unmounts? Or should strictly follow isCapturing?
            // If unmounting, we probably want to stop unless background is desired.
            // For now, let's stop on unmount if capturing was true to avoid leaks.
            // Actually usually better to leave it to isCapturing state, but if app closes/reloads...
            // Native module stop() handles process destruction.
        };
    }, [isCapturing, addLog]);
};
