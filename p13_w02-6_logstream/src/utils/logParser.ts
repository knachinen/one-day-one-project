export type LogLevel = 'V' | 'D' | 'I' | 'W' | 'E' | 'F';

export interface LogEntry {
    id: string; // Unique ID for key extractor
    timestamp: string;
    pid: number;
    tid: number;
    level: LogLevel;
    tag: string;
    message: string;
}

// Regex for 'logcat -v threadtime'
// Format: MM-DD HH:MM:SS.mmm PID TID Level Tag: Message
// Example: 12-06 14:30:00.123 1234 1234 D MyTag: Hello World
const LOG_REGEX = /^(\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}\.\d{3})\s+(\d+)\s+(\d+)\s+([VDIWEF])\s+(.*?):\s+(.*)$/;

export const parseLogLine = (line: string): LogEntry | null => {
    const match = line.match(LOG_REGEX);
    if (!match) {
        // Attempt to handle multiline logs or non-standard format?
        // For MVP, valid logs only. Or return a "System" log type.
        return null;
    }

    const [, timestamp, pid, tid, level, tag, message] = match;

    return {
        id: `${timestamp}-${pid}-${tid}-${Math.random().toString(36).substr(2, 9)}`,
        timestamp,
        pid: parseInt(pid, 10),
        tid: parseInt(tid, 10),
        level: level as LogLevel,
        tag: tag.trim(),
        message: message || '', // message might be empty
    };
};
