export interface Tag {
    id: string;
    name: string;
}

export interface Memo {
    id: string;
    content: string;
    tags: string[]; // Array of tag names for simplicity in MVP
    createdAt: string; // ISO string
    updatedAt: string; // ISO string
    isArchived: boolean;
    sourceUrl?: string; // Optional source URL for captured text
}

export type CreateMemoDto = Pick<Memo, 'content' | 'tags' | 'sourceUrl'>;
export type UpdateMemoDto = Partial<Pick<Memo, 'content' | 'tags' | 'isArchived'>>;
