/**
 * Universal Technical SEO & HTTP Prerender Status Controller
 * Enforces 200, 301, 404, 410, 500 status signals across all dynamic & static routes
 */
export function setPageSeoStatus({ status = 200, title, description, robots = 'index, follow' }) {
  if (typeof document === 'undefined') return;

  if (title) {
    document.title = title;
  }

  // 1. Meta Description
  if (description) {
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);
  }

  // 2. Meta Robots Directive (index, follow for 200 OK | noindex, follow for 404/410/500)
  let metaRobots = document.querySelector('meta[name="robots"]');
  if (!metaRobots) {
    metaRobots = document.createElement('meta');
    metaRobots.setAttribute('name', 'robots');
    document.head.appendChild(metaRobots);
  }
  metaRobots.setAttribute('content', status === 200 ? robots : 'noindex, follow');

  // 3. Prerender & Search Crawler HTTP Status Code Directive
  let metaPrerender = document.querySelector('meta[name="prerender-status-code"]');
  if (!metaPrerender) {
    metaPrerender = document.createElement('meta');
    metaPrerender.setAttribute('name', 'prerender-status-code');
    document.head.appendChild(metaPrerender);
  }
  metaPrerender.setAttribute('content', String(status));
}
