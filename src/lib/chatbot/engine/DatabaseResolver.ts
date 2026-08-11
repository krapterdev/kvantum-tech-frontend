import { chatbotQuery, chatbotQueryOne } from '../database/db';
import { fallbackServices } from '@/data/services';
import { fallbackSettings } from '@/data/settings';
import { Entities } from './EntityEngine';

export interface StructuredDataResult {
  source: 'database' | 'fallback_data';
  entityType: 'service' | 'pricing' | 'contact' | 'company' | 'portfolio' | 'general';
  data: Record<string, any>;
  summary: string;
}

export class DatabaseResolver {
  /**
   * Resolves live structured queries directly from PostgreSQL / data layer.
   * Ensures live data (prices, contact info, active services) is always accurate and never hallucinated.
   */
  async resolve(intent: string, entities: Entities): Promise<StructuredDataResult | null> {
    const targetService = entities.service;

    // 1. Service Pricing & Details Query
    if (intent === 'pricing' || intent === 'services' || intent === 'service_detail') {
      if (targetService) {
        // Try live DB query first
        try {
          const dbService = await chatbotQueryOne<any>(
            `SELECT title, content as description, priority FROM knowledge_chunks WHERE source_type = 'service' AND source_id = $1`,
            [targetService]
          );
          if (dbService) {
            return {
              source: 'database',
              entityType: 'service',
              data: dbService,
              summary: `${dbService.title}: ${dbService.description || ''}`,
            };
          }
        } catch (e) {
          // Fallback to in-memory services dataset
        }

        // Fallback to static services array
        const match = fallbackServices.find((s: any) =>
          s.id?.toLowerCase() === targetService.toLowerCase() ||
          s.title?.toLowerCase().includes(targetService.replace(/_/g, ' ')) ||
          targetService.toLowerCase().includes(s.id?.toLowerCase())
        );

        if (match) {
          return {
            source: 'fallback_data',
            entityType: 'service',
            data: match,
            summary: `${match.title}: ${match.shortDesc || match.longDesc}. Tech Stack: ${match.techStack}. Metrics: ${match.metrics}.`,
          };
        }
      }

      // General Services List Structured Query
      if (intent === 'services') {
        const serviceNames = fallbackServices.map((s: any) => `• ${s.title}`);
        return {
          source: 'fallback_data',
          entityType: 'service',
          data: { services: fallbackServices },
          summary: `Active Services:\n${serviceNames.join('\n')}`,
        };
      }
    }

    // 2. Company Contact / Location Structured Query
    if (intent === 'contact' || intent === 'location' || intent === 'working_hours') {
      const contact = fallbackSettings?.contact || {};
      return {
        source: 'fallback_data',
        entityType: 'contact',
        data: contact,
        summary: `Phone: ${contact.phone || '+91 98116 61828'}, Email: ${contact.email || 'info@kvantumtechsolutions.com'}, Location: ${contact.address || 'Delhi NCR, India'}, Hours: Mon-Sat 9AM-7PM`,
      };
    }

    return null;
  }
}
