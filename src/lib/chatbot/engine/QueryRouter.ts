import { Entities } from './EntityEngine';

export type RouteDestination = 'STRUCTURED_DB' | 'HYBRID_RAG' | 'BUSINESS_RULES' | 'HYBRID';

export interface RoutePlan {
  destination: RouteDestination;
  needsDb: boolean;
  needsRag: boolean;
  needsLeadForm: boolean;
  reason: string;
}

export class QueryRouter {
  /**
   * Routes user query based on intent, entities, and message structure.
   */
  route(intent: string, entities: Entities, rawMessage: string): RoutePlan {
    const isLeadOrAction = ['booking', 'quotation', 'human_agent', 'lead'].includes(intent);
    const hasServiceEntity = Boolean(entities.service);
    const isPricingOrService = ['pricing', 'services', 'service_detail'].includes(intent);

    // Business Rules Route (Lead capture, booking, human contact)
    if (isLeadOrAction) {
      return {
        destination: 'BUSINESS_RULES',
        needsDb: true,
        needsRag: true,
        needsLeadForm: true,
        reason: 'Action-oriented query requiring business rules & lead capture',
      };
    }

    // Hybrid Route: Query asks for BOTH structured data (price/service) AND features/unstructured details
    if (isPricingOrService && (rawMessage.length > 30 || hasServiceEntity)) {
      return {
        destination: 'HYBRID',
        needsDb: true,
        needsRag: true,
        needsLeadForm: false,
        reason: 'Requires structured DB pricing/service info + RAG feature descriptions',
      };
    }

    // Pure Structured DB Route (Direct price / contact / simple list queries)
    if (['contact', 'location', 'working_hours'].includes(intent) || (intent === 'pricing' && !hasServiceEntity)) {
      return {
        destination: 'STRUCTURED_DB',
        needsDb: true,
        needsRag: false,
        needsLeadForm: false,
        reason: 'Structured query resolvable directly from DB/settings',
      };
    }

    // Default to Hybrid RAG (Unstructured knowledge search: About, Blogs, Portfolio, FAQs, general queries)
    return {
      destination: 'HYBRID_RAG',
      needsDb: false,
      needsRag: true,
      needsLeadForm: false,
      reason: 'Knowledge retrieval query using Hybrid RAG',
    };
  }
}
