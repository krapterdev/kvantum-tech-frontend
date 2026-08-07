export const config = {
  matcher: ['/((?!assets|_next|favicon.ico|api|.*\\..*).*)'],
};

export default async function middleware(req) {
  const url = new URL(req.url);
  const path = url.pathname;

  // Fetch standard index.html from static origin
  const originRes = await fetch(new URL('/index.html', req.url));
  let html = await originRes.text();

  // Normalize canonical URL (https://kvantumtechsolutions.com/...)
  const canonicalUrl = `https://kvantumtechsolutions.com${path === '/' ? '/' : path}`;

  let title = "IT Solutions Company in Delhi NCR | Kvantum Tech Solutions";
  let description = "Kvantum Tech Solutions offers reliable IT services, software development, cloud solutions, web development, and digital transformation services across Delhi NCR.";
  let ogImage = "https://kvantumtechsolutions.com/assets/og-image.jpg";

  // Route-based SEO metadata matching
  if (path === '/about') {
    title = "About Kvantum Tech Solutions | IT & Digital Engineering Experts";
    description = "Learn about Kvantum Tech Solutions, a trusted digital engineering agency delivering custom software, web applications, CRM engines, and business automation.";
  } else if (path === '/services') {
    title = "Enterprise IT & Automation Services | Kvantum Tech Solutions";
    description = "Explore custom software development, CRM systems, HRMS payroll, ERP platforms, WhatsApp API automation, and scalable web apps built by Kvantum Tech Solutions.";
  } else if (path === '/projects' || path === '/portfolio') {
    title = "Featured Software & Engineering Projects | Kvantum Tech Solutions";
    description = "Explore enterprise case studies, custom CRM systems, HRMS platforms, and web applications engineered by Kvantum Tech Solutions.";
  } else if (path === '/blog') {
    title = "Tech Blog | AI, SEO, Web Development & Automation | Kvantum Tech Solutions";
    description = "Read expert articles, technical guides, system architecture blueprints, and SEO strategies published weekly by Kvantum Tech Solutions.";
  } else if (path === '/contact') {
    title = "Contact Kvantum Tech Solutions | Direct Technical Contact";
    description = "Get in touch with Kvantum Tech Solutions for custom software, CRM, HRMS, ERP, web apps, and business automation. Book a live demo or request project quotes.";
  } else if (path === '/privacy') {
    title = "Privacy Policy | Kvantum Tech Solutions";
    description = "Privacy Policy for Kvantum Tech Solutions. Read how we protect and handle your information.";
  } else if (path === '/terms') {
    title = "Terms & Conditions | Kvantum Tech Solutions";
    description = "Terms and Conditions for Kvantum Tech Solutions software development and digital engineering services.";
  } else if (path === '/thank-you') {
    title = "Thank You | Kvantum Tech Solutions";
    description = "Thank you for contacting Kvantum Tech Solutions. Our technical team will reach out to you shortly.";
  } else if (path.startsWith('/blog/')) {
    const slug = path.replace('/blog/', '').trim();
    if (slug) {
      try {
        const blogRes = await fetch(`https://api.kvantumtechsolutions.com/api/blogs/${slug}`);
        if (blogRes.ok) {
          const post = await blogRes.json();
          if (post && post.title) {
            title = `${post.seoTitle || post.title} | Kvantum Tech Blog`;
            description = post.metaDescription || post.excerpt || description;
            if (post.coverImage) ogImage = post.coverImage;
          }
        }
      } catch (err) {
        const formattedSlug = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        title = `${formattedSlug} | Kvantum Tech Blog`;
      }
    }
  } else if (path.startsWith('/services/')) {
    const slug = path.replace('/services/', '').trim();
    if (slug) {
      const formattedSlug = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      title = `${formattedSlug} Services | Kvantum Tech Solutions`;
      description = `Enterprise ${formattedSlug} services engineered by Kvantum Tech Solutions in Delhi NCR. Contact us for custom software architecture & development.`;
    }
  } else if (path.startsWith('/keyword/')) {
    const slug = path.replace('/keyword/', '').trim();
    if (slug) {
      const formattedSlug = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      title = `${formattedSlug} | Kvantum Tech Solutions`;
      description = `Top-rated ${formattedSlug}. Custom software engineering, CRM, ERP, and business automation services in Delhi NCR.`;
    }
  }

  // 1. Replace <title>
  html = html.replace(/<title>.*?<\/title>/gi, `<title>${title}</title>`);

  // 2. Replace <meta name="description">
  html = html.replace(/<meta\s+name="description"\s+content=".*?"\s*\/?>/gi, `<meta name="description" content="${description}" />`);

  // 3. Replace <link rel="canonical">
  html = html.replace(/<link\s+rel="canonical"\s+href=".*?"\s*\/?>/gi, `<link rel="canonical" href="${canonicalUrl}" />`);

  // 4. Replace OpenGraph & Twitter Meta Tags
  html = html.replace(/<meta\s+property="og:title"\s+content=".*?"\s*\/?>/gi, `<meta property="og:title" content="${title}" />`);
  html = html.replace(/<meta\s+property="og:description"\s+content=".*?"\s*\/?>/gi, `<meta property="og:description" content="${description}" />`);
  html = html.replace(/<meta\s+property="og:url"\s+content=".*?"\s*\/?>/gi, `<meta property="og:url" content="${canonicalUrl}" />`);
  html = html.replace(/<meta\s+property="og:image"\s+content=".*?"\s*\/?>/gi, `<meta property="og:image" content="${ogImage}" />`);

  html = html.replace(/<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/gi, `<meta name="twitter:title" content="${title}" />`);
  html = html.replace(/<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/gi, `<meta name="twitter:description" content="${description}" />`);

  return new Response(html, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'public, max-age=0, must-revalidate',
    },
  });
}
