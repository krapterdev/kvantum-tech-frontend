/**
 * Parser — extract clean text from HTML pages
 */

export interface ParsedPage {
  title: string;
  headings: string[];
  paragraphs: string[];
  lists: string[];
  text: string;
}

export function parseHTML(html: string, url: string): ParsedPage {
  // Remove script, style, head, nav, footer
  let cleaned = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '')
    .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '')
    .replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '');

  // Extract title
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? stripTags(titleMatch[1]).trim() : url;

  // Extract headings h1-h4
  const headings: string[] = [];
  const headingMatches = cleaned.matchAll(/<h[1-4][^>]*>([\s\S]*?)<\/h[1-4]>/gi);
  for (const m of headingMatches) {
    const h = stripTags(m[1]).trim();
    if (h) headings.push(h);
  }

  // Extract paragraphs
  const paragraphs: string[] = [];
  const paraMatches = cleaned.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi);
  for (const m of paraMatches) {
    const p = stripTags(m[1]).trim();
    if (p && p.length > 20) paragraphs.push(p);
  }

  // Extract list items
  const lists: string[] = [];
  const liMatches = cleaned.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi);
  for (const m of liMatches) {
    const li = stripTags(m[1]).trim();
    if (li && li.length > 5) lists.push(li);
  }

  const text = [title, ...headings, ...paragraphs, ...lists].join('\n').trim();

  return { title, headings, paragraphs, lists, text };
}

function stripTags(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#\d+;/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}
