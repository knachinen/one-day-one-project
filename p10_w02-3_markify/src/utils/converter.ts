import axios from 'axios';
import * as htmlparser2 from 'htmlparser2-without-node-native';
import { DomHandler, Element, Text, Node, Comment, ProcessingInstruction } from 'domhandler';

// Removed TurndownService import and initialization

// Recursive function to convert DOM nodes to Markdown
const nodeToMarkdown = (node: Node, parentType: string = ''): string => {
    let markdown = '';

    if (node.type === 'text') {
        markdown += (node as Text).data;
    } else if (node.type === 'comment') {
        // Ignore comments
        return '';
    } else if (node.type === 'directive') {
        // Ignore directives (e.g., <!DOCTYPE html>)
        return '';
    } else if (node.type === 'cdata') {
        // Handle CDATA if necessary, treating as text for now
        markdown += (node as Text).data;
    } else if (node.type === 'tag') {
        const element = node as Element;
        const childrenMarkdown = element.children.map(child => nodeToMarkdown(child, element.tagName)).join('');

        switch (element.tagName) {
            case 'h1':
                markdown += `# ${childrenMarkdown}\n\n`;
                break;
            case 'h2':
                markdown += `## ${childrenMarkdown}\n\n`;
                break;
            case 'h3':
                markdown += `### ${childrenMarkdown}\n\n`;
                break;
            case 'h4':
                markdown += `#### ${childrenMarkdown}\n\n`;
                break;
            case 'h5':
                markdown += `##### ${childrenMarkdown}\n\n`;
                break;
            case 'h6':
                markdown += `###### ${childrenMarkdown}\n\n`;
                break;
            case 'p':
                markdown += `${childrenMarkdown}\n\n`;
                break;
            case 'br':
                markdown += `  \n`; // Two spaces for a soft line break in Markdown
                break;
            case 'strong':
            case 'b':
                markdown += `**${childrenMarkdown}**`;
                break;
            case 'em':
            case 'i':
                markdown += `*${childrenMarkdown}*`;
                break;
            case 'a':
                const href = element.attribs.href || '';
                markdown += `[${childrenMarkdown}](${href})`;
                break;
            case 'img':
                const src = element.attribs.src || '';
                const alt = element.attribs.alt || '';
                markdown += `![${alt}](${src})`;
                break;
            case 'ul':
                markdown += `${childrenMarkdown}\n\n`;
                break;
            case 'ol':
                markdown += `${childrenMarkdown}\n\n`;
                break;
            case 'li':
                const prefix = parentType === 'ol' ? '1. ' : '- ';
                markdown += `${prefix}${childrenMarkdown}\n`;
                break;
            case 'code':
                // Inline code
                markdown += `\`${childrenMarkdown}\``;
                break;
            case 'pre':
                // Block code
                markdown += `\n\`\`\`\n${childrenMarkdown}\n\`\`\`\n\n`;
                break;
            case 'blockquote':
                markdown += `> ${childrenMarkdown.split('\n').join('\n> ')}\n\n`;
                break;
            // Add more tags as needed
            default:
                // For unknown tags, just process their children
                markdown += childrenMarkdown;
                break;
        }
    }
    return markdown;
};

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
        let cleanedHtml = html;
        const unwantedTags = ['script', 'style', 'noscript', 'iframe', 'svg'];
        unwantedTags.forEach(tag => {
            const regex = new RegExp(`<${tag}[^>]*>.*?</${tag}>`, 'gis');
            cleanedHtml = cleanedHtml.replace(regex, '');
        });

        const handler = new DomHandler();
        const parser = new htmlparser2.Parser(handler);
        parser.write(cleanedHtml);
        parser.end();

        const dom = handler.dom; // Get the parsed DOM tree (array of root nodes)

        let markdownOutput = '';
        dom.forEach(node => {
            markdownOutput += nodeToMarkdown(node);
        });

        return markdownOutput.trim(); // Trim any leading/trailing whitespace
    } catch (error) {
        console.error('Error converting to Markdown:', error);
        throw new Error('Failed to convert HTML to Markdown.');
    }
};

export const processUrl = async (url: string): Promise<{ title: string; content: string }> => {
    const html = await fetchHtml(url);

    const titleMatch = html.match(/<title>(.*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1] : 'Untitled Note';

    const markdown = convertToMarkdown(html);
    return { title, content: markdown };
};
