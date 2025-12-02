export type AnnotationType = 'highlight' | 'text' | 'draw';

export interface Annotation {
    id: number;
    docId: string;
    page: number;
    type: AnnotationType;
    data: string; // JSON string
    timestamp: number;
}

export interface HighlightData {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    opacity: number;
}

export interface TextData {
    x: number;
    y: number;
    content: string;
}

export interface DrawData {
    path: string; // SVG path string
    color: string;
    strokeWidth: number;
}
