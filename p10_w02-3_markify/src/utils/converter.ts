import axios from 'axios';
import TurndownService from 'turndown';
const domino = require('domino');

const turndownService = new TurndownService();

export const fetchHtml = async (url: string): Promise<string> => {
    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent':
                    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching HTML:', error);
        throw new Error('Failed to fetch HTML from the provided URL.');
    }
};

export const convertToMarkdown = (html: string): string => {
    try {
        const window = domino.createWindow(html);
        const document = window.document;

        // Remove unwanted tags
        const unwantedTags = ['script', 'style', 'noscript', 'iframe', 'svg'];
        unwantedTags.forEach(tag => {
            const elements = document.querySelectorAll(tag);
            Array.from(elements).forEach((el: any) => el.parentNode.removeChild(el));
        });

        return turndownService.turndown(document);
    } catch (error) {
        console.error('Error converting to Markdown:', error);
        throw new Error('Failed to convert HTML to Markdown.');
    }
};

export const processUrl = async (url: string): Promise<{ title: string; content: string }> => {
    const html = await fetchHtml(url);

    // Simple title extraction
    const titleMatch = html.match(/<title>(.*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1] : 'Untitled Note';

    const markdown = convertToMarkdown(html);
    return { title, content: markdown };
};
