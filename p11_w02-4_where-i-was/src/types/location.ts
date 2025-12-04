export interface LocationRecord {
    id: string;
    name: string | null;
    lat: number;
    lon: number;
    duration: number | null; // in seconds
    startTime: number; // timestamp
    userNote: string | null;
}
