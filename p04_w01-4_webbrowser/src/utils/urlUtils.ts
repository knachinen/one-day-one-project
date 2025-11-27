const SEARCH_ENGINES = {
    google: 'https://www.google.com/search?q=',
    bing: 'https://www.bing.com/search?q=',
    duckduckgo: 'https://duckduckgo.com/?q=',
};

export const isValidUrl = (text: string): boolean => {
    // Check if it's a valid URL
    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return urlPattern.test(text);
};

export const formatUrl = (text: string): string => {
    const trimmed = text.trim();

    // If it's already a valid URL with protocol, return it
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
        return trimmed;
    }

    // If it looks like a URL without protocol, add https://
    if (isValidUrl(trimmed)) {
        return `https://${trimmed}`;
    }

    // Otherwise, it's a search query
    return '';
};

export const getSearchUrl = (query: string, engine: keyof typeof SEARCH_ENGINES = 'google'): string => {
    return `${SEARCH_ENGINES[engine]}${encodeURIComponent(query)}`;
};

export const processInput = (text: string, searchEngine: keyof typeof SEARCH_ENGINES = 'google'): string => {
    const url = formatUrl(text);
    if (url) {
        return url;
    }
    return getSearchUrl(text, searchEngine);
};

export const extractDomain = (url: string): string => {
    try {
        const urlObj = new URL(url);
        return urlObj.hostname;
    } catch {
        return url;
    }
};

export const isSecureUrl = (url: string): boolean => {
    return url.startsWith('https://');
};

export const getPageTitle = (url: string): string => {
    const domain = extractDomain(url);
    return domain.replace('www.', '');
};
