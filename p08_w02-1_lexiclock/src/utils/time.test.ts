import { getHourChar, getBase26, formatTime } from './time';

describe('Time Conversion', () => {
    test('getHourChar converts 0-23 to A-X', () => {
        expect(getHourChar(0)).toBe('A');
        expect(getHourChar(1)).toBe('B');
        expect(getHourChar(23)).toBe('X');
        expect(getHourChar(24)).toBe('?');
    });

    test('getBase26 converts 0-59 to base-26', () => {
        expect(getBase26(0)).toBe('aa');
        expect(getBase26(1)).toBe('ab');
        expect(getBase26(25)).toBe('az');
        expect(getBase26(26)).toBe('ba');
        expect(getBase26(51)).toBe('bz');
        expect(getBase26(59)).toBe('ch');
    });

    test('formatTime returns correct object', () => {
        const date = new Date('2023-01-01T18:30:07');
        // 18 -> S (A+18)
        // 30 -> be (1, 4)
        // 07 -> ah (0, 7)
        const result = formatTime(date, true);
        expect(result).toEqual({ h: 'S', m: 'be', s: 'ah', ampm: undefined });
    });
});
