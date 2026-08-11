import { chatbotQuery } from '../database/db';
import { parseHTML } from './Parser';
import { chunkPage } from './Chunker';
import * as crypto from 'crypto';

const BASE_URL = 'https://kvantumtechsolutions.com';

// Pages to crawl
const CRAWL_URLS = [
  '/',
  '/about',
  '/services',
  '/services/custom-software-development',
  '/services/crm-software-development',
  '/services/business-automation',
  '/services/hrms-software',
  '/services/whatsapp-automation',
  '/services/web-mobile-app-development',
  '/blog',
  '/contact',
  '/projects',
  '/privacy',
  '/terms',
];

export interface CrawlResult {
  url: string;
  success: boolean;
  chunksIndexed: number;
  error?: string;
}

export class Indexer {
  /**
   * Index static data directly from local data (no network required)
   */
  async seedFromStaticData(services: any[], blogs: any[], faqs: any[]): Promise<number> {
    let indexed = 0;

    // Index services
    for (const svc of services) {
      const content = [
        svc.name || svc.title || '',
        svc.description || svc.desc || svc.shortDesc || '',
        svc.longDesc || '',
        Array.isArray(svc.features) ? svc.features.join('. ') : '',
        svc.price ? `Starting from ₹${svc.price}` : '',
      ].filter(Boolean).join(' ').slice(0, 1000);

      if (!content.trim()) continue;

      await this.upsertChunk({
        source_type: 'service',
        source_id: svc.slug || svc.id || svc._id || svc.name,
        title: svc.name || svc.title || 'Service',
        content,
        keywords: [
          svc.slug, svc.name, svc.category,
          ...(Array.isArray(svc.tags) ? svc.tags : []),
        ].filter(Boolean) as string[],
        priority: 9,
      });
      indexed++;
    }

    // Index blogs
    for (const blog of blogs) {
      const content = [
        blog.title || '',
        blog.summary || blog.excerpt || '',
        typeof blog.content === 'string' ? blog.content.replace(/<[^>]+>/g, '').slice(0, 500) : '',
      ].filter(Boolean).join(' ');

      if (!content.trim()) continue;

      await this.upsertChunk({
        source_type: 'blog',
        source_id: blog.slug || blog.id || blog._id,
        title: blog.title || 'Blog',
        content,
        keywords: [
          blog.category, blog.slug,
          ...(Array.isArray(blog.tags) ? blog.tags : []),
        ].filter(Boolean) as string[],
        priority: 6,
      });
      indexed++;
    }

    // Index FAQs
    for (const faq of faqs) {
      if (!faq.question || !faq.answer) continue;

      await chatbotQuery(
        `INSERT INTO chat_faqs (question, answer, keywords, category, priority)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT DO NOTHING`,
        [
          faq.question,
          faq.answer,
          faq.keywords ?? [],
          faq.category ?? 'general',
          faq.priority ?? 7,
        ]
      ).catch(() => null);
      indexed++;
    }

    return indexed;
  }

  /**
   * Crawl live website and index pages
   */
  async crawlWebsite(): Promise<CrawlResult[]> {
    const results: CrawlResult[] = [];

    for (const path of CRAWL_URLS) {
      const url = BASE_URL + path;
      try {
        const res = await fetch(url, {
          headers: { 'User-Agent': 'KvantumBot/1.0 (internal indexer)' },
          signal: AbortSignal.timeout(10000),
        });

        if (!res.ok) {
          results.push({ url, success: false, chunksIndexed: 0, error: `HTTP ${res.status}` });
          continue;
        }

        const html = await res.text();
        const contentHash = crypto.createHash('md5').update(html).digest('hex');

        // Check if content changed
        const existing = await chatbotQuery<any>(
          `SELECT content_hash FROM website_pages WHERE url = $1`,
          [url]
        );

        if (existing[0]?.content_hash === contentHash) {
          results.push({ url, success: true, chunksIndexed: 0 }); // Unchanged
          continue;
        }

        const parsed = parseHTML(html, url);
        const chunks = chunkPage(parsed.title, parsed.headings, parsed.paragraphs, parsed.lists);

        // Save page record
        await chatbotQuery(
          `INSERT INTO website_pages (url, title, content, content_hash)
           VALUES ($1, $2, $3, $4)
           ON CONFLICT (url) DO UPDATE SET
             title = EXCLUDED.title,
             content = EXCLUDED.content,
             content_hash = EXCLUDED.content_hash,
             last_indexed = NOW()`,
          [url, parsed.title, parsed.text.slice(0, 5000), contentHash]
        ).catch(() => null);

        // Delete old chunks for this URL
        await chatbotQuery(
          `DELETE FROM knowledge_chunks WHERE source_type = 'website' AND source_id = $1`,
          [url]
        ).catch(() => null);

        // Insert new chunks
        let chunksIndexed = 0;
        for (const chunk of chunks) {
          if (!chunk.content.trim()) continue;
          await this.upsertChunk({
            source_type: 'website',
            source_id: url,
            title: chunk.title,
            content: chunk.content,
            keywords: chunk.keywords,
            priority: 5,
          });
          chunksIndexed++;
        }

        results.push({ url, success: true, chunksIndexed });
      } catch (err: any) {
        results.push({ url, success: false, chunksIndexed: 0, error: err.message });
      }
    }

    return results;
  }

  private async upsertChunk(data: {
    source_type: string;
    source_id: string;
    title: string;
    content: string;
    keywords: string[];
    priority: number;
  }): Promise<void> {
    await chatbotQuery(
      `INSERT INTO knowledge_chunks (source_type, source_id, title, content, keywords, priority)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT DO NOTHING`,
      [data.source_type, data.source_id, data.title, data.content, data.keywords, data.priority]
    ).catch(e => console.warn('[INDEXER] Upsert chunk failed:', e.message));
  }
}
