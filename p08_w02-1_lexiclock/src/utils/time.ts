export const getHourChar = (hour: number): string => {
    // 0-23 -> A-X
    if (hour < 0 || hour > 23) return '?';
    return String.fromCharCode('A'.charCodeAt(0) + hour);
};

export const getBase26 = (val: number): string => {
    // 0-59
    if (val < 0 || val > 59) return '??';
    const first = Math.floor(val / 26);
    const second = val % 26;
    const char1 = String.fromCharCode('a'.charCodeAt(0) + first);
    const char2 = String.fromCharCode('a'.charCodeAt(0) + second);
    return `${char1}${char2}`;
};

export const formatTime = (date: Date, is24Hour: boolean = true): { h: string; m: string; s: string; ampm?: string } => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    let hChar = '';
    let ampm = undefined;

    if (is24Hour) {
        hChar = getHourChar(hours);
    } else {
        // 12 hour mode
        // 1-12 -> A-L
        // 0 -> 12 (L)
        const h12 = hours % 12 || 12;
        hChar = String.fromCharCode('A'.charCodeAt(0) + h12 - 1);
        ampm = hours >= 12 ? 'PM' : 'AM';
    }

    return {
        h: hChar,
        m: getBase26(minutes),
        s: getBase26(seconds),
        ampm
    };
};
