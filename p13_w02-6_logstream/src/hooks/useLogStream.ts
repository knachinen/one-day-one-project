import { useEffect, useRef } from "react";
import { NativeEventEmitter, NativeModules } from "react-native";
import { useLogStore } from "../store/useLogStore";
import { parseLogLine, LogEntry } from "../utils/logParser";

const { LogcatModule } = NativeModules;
const eventEmitter = new NativeEventEmitter(LogcatModule);

// Simple throttle function
const throttle = <T extends any[]>(
  func: (...args: T) => void,
  delay: number
) => {
  let inThrottle: boolean;
  let lastFunc: NodeJS.Timeout | null;
  let lastRan: number;
  return function (this: any, ...args: T) {
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      lastRan = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFunc as NodeJS.Timeout);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= delay) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, delay - (Date.now() - lastRan));
    }
  };
};

export const useLogStream = () => {
  const isCapturing = useLogStore((state) => state.isCapturing);
  const addLog = useLogStore((state) => state.addLog);

  // Throttle addLog to prevent overwhelming UI updates
  const throttledAddLog = useRef(
    throttle((log: LogEntry) => {
      addLog(log);
    }, 200)
  ).current; // Throttle to 200ms

  useEffect(() => {
    let subscription: any;
    let startedNativeModule = false; // Flag to track if native module was started by *this* effect run

    if (isCapturing) {
      console.log("useLogStream: Calling LogcatModule.start()");
      LogcatModule.start();
      startedNativeModule = true; // Mark that this effect run started the native module
      subscription = eventEmitter.addListener("LogcatEvent", (line: string) => {
        const parsed = parseLogLine(line);
        if (parsed) {
          throttledAddLog(parsed); // Use throttled version here
        }
      });
    }

    return () => {
      // console.log('useLogStream: Cleaning up effect.');
      if (subscription) {
        // console.log('useLogStream: Removing subscription.');
        subscription.remove();
      }
      if (startedNativeModule) {
        // Only stop if *this* effect run actually started the native module
        //  console.log('useLogStream: Calling LogcatModule.stop() during cleanup (because this effect started it).');
        LogcatModule.stop();
      } else {
        //  console.log('useLogStream: Not calling LogcatModule.stop() in cleanup (this effect did not start it).');
      }
    };
  }, [isCapturing, addLog]);
};
