import { type CollectionEntry, getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
// @ts-ignore
import template from './template.svg?raw';

export const prerender = true;

// Simple helper to escape XML special characters
function escapeXml(unsafe: string) {
    return unsafe.replace(/[<>&"']/g, (c) => {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '"': return '&quot;';
            case "'": return '&apos;';
            default: return c;
        }
    });
}

/**
 * Splits a string into lines that don't exceed a certain character length
 * (approximate word wrap for SVG)
 */
function wrapTitle(title: string, maxCharsPerLine: number = 25) {
    const words = title.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    words.forEach(word => {
        if ((currentLine + word).length > maxCharsPerLine) {
            lines.push(currentLine.trim());
            currentLine = word + ' ';
        } else {
            currentLine += word + ' ';
        }
    });
    lines.push(currentLine.trim());

    return lines.filter(line => line.length > 0);
}

export async function getStaticPaths() {
	const posts = await getCollection('blog');
	return posts.map((post) => ({
		params: { slug: post.id },
		props: post,
	}));
}

export const GET: APIRoute = async ({ props }) => {
	const post = props as CollectionEntry<'blog'>;
	const { title } = post.data;

    // Wrap the title into lines
    const titleLines = wrapTitle(title);
    
    // Convert lines into SVG tspan elements with vertical offsets
    const tspanMarkup = titleLines.map((line, i) => {
        return `<tspan x="80" dy="${i === 0 ? 0 : '1.1em'}">${escapeXml(line)}</tspan>`;
    }).join('');

    // Perform the string replacement on the template
    const svg = template.replace('{{TITLE_LINES}}', tspanMarkup);

	return new Response(svg, {
		headers: {
			'Content-Type': 'image/svg+xml',
			'Cache-Control': 'public, max-age=31536000, immutable',
		},
	});
};
