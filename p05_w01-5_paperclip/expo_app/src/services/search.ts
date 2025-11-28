import { Memo } from '../types';

export const SearchService = {
    /**
     * Filter memos by query string and selected tags
     * @param memos List of memos to filter
     * @param query Search query string
     * @param selectedTags Array of selected tags to filter by (optional)
     * @returns Filtered list of memos
     */
    search(memos: Memo[], query: string, selectedTags: string[] = []): Memo[] {
        const lowerQuery = query.toLowerCase().trim();
        const hasQuery = lowerQuery.length > 0;
        const hasTags = selectedTags.length > 0;

        if (!hasQuery && !hasTags) {
            return memos;
        }

        return memos.filter(memo => {
            // 1. Filter by text content
            let matchesText = true;
            if (hasQuery) {
                matchesText = memo.content.toLowerCase().includes(lowerQuery);
                // Also check if any tag matches the query
                if (!matchesText) {
                    matchesText = memo.tags.some(tag => tag.toLowerCase().includes(lowerQuery));
                }
            }

            // 2. Filter by selected tags (AND logic - memo must have ALL selected tags)
            // Alternatively, could be OR logic depending on requirement. 
            // PRD says "Filter by specific tag", implying usually one, but "tags" suggests multiple.
            // Let's implement OR logic for tags for now (if memo has ANY of the selected tags), 
            // or AND logic. Usually tag filtering is AND (refinement) or OR (expansion).
            // Let's stick to AND for refinement if multiple are selected, or simple inclusion.
            // For MVP, let's assume if multiple tags are selected, we show memos that have AT LEAST ONE of them (OR logic) 
            // or ALL of them (AND logic). 
            // Let's go with: Memo must contain ALL selected tags (AND).

            let matchesTags = true;
            if (hasTags) {
                matchesTags = selectedTags.every(tag => memo.tags.includes(tag));
            }

            return matchesText && matchesTags;
        });
    }
};
