import axios from 'axios';

export interface SearchResult {
    place_id: string;
    display_name: string;
    lat: string;
    lon: string;
    type: string;
}

export const searchLocation = async (query: string): Promise<SearchResult[]> => {
    try {
        const response = await axios.get('https://nominatim.openstreetmap.org/search', {
            params: {
                q: query,
                format: 'json',
                limit: 5,
                addressdetails: 1,
            },
            headers: {
                'User-Agent': 'WhereIWas/1.0',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Search failed:', error);
        throw error;
    }
};
