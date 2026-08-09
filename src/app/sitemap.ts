import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://kvantumtechsolutions.com';

  const routes = [
    '',
    '/about',
    '/services',
    '/projects',
    '/blog',
    '/contact',
    '/services/web-mobile-app-development',
    '/services/custom-software-development',
    '/services/crm-software-development',
    '/services/business-automation',
    '/services/hrms-software',
    '/services/whatsapp-automation',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  return routes;
}
