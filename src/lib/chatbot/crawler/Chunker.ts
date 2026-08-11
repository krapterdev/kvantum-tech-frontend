/**
 * Chunker — split parsed page content into indexable chunks
 */

export interface ContentChunk {
  title: string;
  content: string;
  keywords: string[];
}

const CHUNK_SIZE = 400; // characters per chunk

export function chunkPage(
  pageTitle: string,
  headings: string[],
  paragraphs: string[],
  lists: string[]
): ContentChunk[] {
  const chunks: ContentChunk[] = [];

  // Title + headings as first chunk
  if (headings.length > 0) {
    chunks.push({
      title: pageTitle,
      content: headings.join('. '),
      keywords: extractKeywords(headings.join(' ')),
    });
  }

  // Paragraph chunks
  let buffer = '';
  let currentTitle = pageTitle;

  for (const para of paragraphs) {
    if (buffer.length + para.length > CHUNK_SIZE && buffer.length > 50) {
      chunks.push({
        title: currentTitle,
        content: buffer.trim(),
        keywords: extractKeywords(buffer),
      });
      buffer = '';
    }
    buffer += ' ' + para;

    // Check if paragraph starts with a heading-like pattern
    if (para.length < 80 && /^[A-Z]/.test(para)) {
      currentTitle = para;
    }
  }

  if (buffer.length > 50) {
    chunks.push({
      title: currentTitle,
      content: buffer.trim(),
      keywords: extractKeywords(buffer),
    });
  }

  // List items as one chunk
  if (lists.length > 0) {
    const listText = lists.join('. ');
    chunks.push({
      title: `${pageTitle} — Features & Details`,
      content: listText.slice(0, CHUNK_SIZE * 2),
      keywords: extractKeywords(listText),
    });
  }

  return chunks;
}

function extractKeywords(text: string): string[] {
  const words = text.toLowerCase()
    .split(/\s+/)
    .filter(w => w.length > 4 && !/^(this|that|with|from|have|more|about|your|their)$/.test(w));
  return [...new Set(words)].slice(0, 15);
}
