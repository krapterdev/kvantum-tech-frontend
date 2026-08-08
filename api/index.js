import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  try {
    const reqUrl = req.url || '/';
    const parsedUrl = new URL(reqUrl, `https://kvantumtechsolutions.com`);
    const pathname = parsedUrl.pathname;

    // Read dist/index.html
    const indexPath = path.join(process.cwd(), 'dist', 'index.html');
    let html = fs.readFileSync(indexPath, 'utf8');

    // Base site URL (100% normalized without www)
    const siteUrl = 'https://kvantumtechsolutions.com';
    const canonicalUrl = `${siteUrl}${pathname === '/' ? '/' : pathname}`;

    let title = "Custom Software Development Company | Kvantum Tech Solutions";
    let description = "Kvantum Tech Solutions is a custom software development company building scalable business software, CRM, HRMS, ERP, web and mobile apps, and automation solutions.";
    let keywords = "custom software development company, software development company, custom software development services, business software development company";
    let ogImage = `${siteUrl}/assets/og-image.jpg`;

    // Dynamic API fetch helper
    if (pathname === '/about') {
      title = "About Kvantum Tech Solutions | IT & Digital Engineering Experts";
      description = "Learn about Kvantum Tech Solutions, a trusted digital engineering agency delivering custom software, web applications, CRM engines, and business automation.";
    } else if (pathname === '/services') {
      title = "Enterprise IT & Automation Services | Kvantum Tech Solutions";
      description = "Explore custom software development, CRM systems, HRMS payroll, ERP platforms, WhatsApp API automation, and scalable web apps built by Kvantum Tech Solutions.";
    } else if (pathname === '/projects' || pathname === '/portfolio') {
      title = "Featured Software & Engineering Projects | Kvantum Tech Solutions";
      description = "Explore enterprise case studies, custom CRM systems, HRMS platforms, and web applications engineered by Kvantum Tech Solutions.";
    } else if (pathname === '/blog') {
      title = "Tech Blog | AI, SEO, Web Development & Automation | Kvantum Tech Solutions";
      description = "Read expert articles, technical guides, system architecture blueprints, and SEO strategies published weekly by Kvantum Tech Solutions.";
    } else if (pathname === '/contact') {
      title = "Contact Kvantum Tech Solutions | Direct Technical Contact";
      description = "Get in touch with Kvantum Tech Solutions for custom software, CRM, HRMS, ERP, web apps, and business automation. Book a live demo or request project quotes.";
    } else if (pathname === '/privacy') {
      title = "Privacy Policy | Kvantum Tech Solutions";
      description = "Privacy Policy for Kvantum Tech Solutions. Read how we protect and handle your information.";
    } else if (pathname === '/terms') {
      title = "Terms & Conditions | Kvantum Tech Solutions";
      description = "Terms and Conditions for Kvantum Tech Solutions software development and digital engineering services.";
    } else if (pathname === '/thank-you') {
      title = "Thank You | Kvantum Tech Solutions";
      description = "Thank you for contacting Kvantum Tech Solutions. Our technical team will reach out to you shortly.";
    } else if (pathname.startsWith('/services/')) {
      const slug = pathname.replace('/services/', '').trim();
      if (slug) {
        try {
          const apiRes = await fetch(`https://api.kvantumtechsolutions.com/api/services`);
          if (apiRes.ok) {
            const services = await apiRes.json();
            const service = Array.isArray(services) ? services.find(s => s.id === slug || s._id === slug || s.slug === slug) : null;
            if (service) {
              title = service.metaTitle || `${service.title} | Kvantum Tech Solutions`;
              description = service.metaDesc || service.shortDesc || service.longDesc || description;
              if (service.keywords) keywords = service.keywords;
              if (service.coverImage || service.ogImage) ogImage = service.coverImage || service.ogImage;
            } else {
              const formattedSlug = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
              title = `${formattedSlug} Services | Kvantum Tech Solutions`;
              description = `Enterprise ${formattedSlug} services engineered by Kvantum Tech Solutions in Delhi NCR.`;
            }
          }
        } catch (e) {
          const formattedSlug = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
          title = `${formattedSlug} Services | Kvantum Tech Solutions`;
        }
      }
    } else if (pathname.startsWith('/blog/')) {
      const slug = pathname.replace('/blog/', '').trim();
      if (slug) {
        try {
          const blogRes = await fetch(`https://api.kvantumtechsolutions.com/api/blogs/${slug}`);
          if (blogRes.ok) {
            const post = await blogRes.json();
            if (post && (post.title || post.metaTitle)) {
              title = `${post.metaTitle || post.seoTitle || post.title} | Kvantum Tech Blog`;
              description = post.metaDesc || post.metaDescription || post.excerpt || description;
              if (post.coverImage || post.image || post.ogImage) ogImage = post.coverImage || post.image || post.ogImage;
            }
          }
        } catch (e) {
          const formattedSlug = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
          title = `${formattedSlug} | Kvantum Tech Blog`;
        }
      }
    } else if (pathname.startsWith('/keyword/')) {
      const slug = pathname.replace('/keyword/', '').trim();
      if (slug) {
        try {
          const seoRes = await fetch(`https://api.kvantumtechsolutions.com/api/seopages/${slug}`);
          if (seoRes.ok) {
            const page = await seoRes.json();
            if (page) {
              title = page.metaTitle || page.title || title;
              description = page.metaDesc || description;
              if (page.metaKeywords) keywords = page.metaKeywords;
            }
          }
        } catch (e) {
          const formattedSlug = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
          title = `${formattedSlug} | Kvantum Tech Solutions`;
        }
      }
    }

    // Perform replacement on HTML head
    html = html.replace(/<title>.*?<\/title>/gi, `<title>${title}</title>`);
    html = html.replace(/<meta\s+name="description"\s+content=".*?"\s*\/?>/gi, `<meta name="description" content="${description}" />`);
    html = html.replace(/<meta\s+name="keywords"\s+content=".*?"\s*\/?>/gi, `<meta name="keywords" content="${keywords}" />`);
    html = html.replace(/<link\s+rel="canonical"\s+href=".*?"\s*\/?>/gi, `<link rel="canonical" href="${canonicalUrl}" />`);

    html = html.replace(/<meta\s+property="og:title"\s+content=".*?"\s*\/?>/gi, `<meta property="og:title" content="${title}" />`);
    html = html.replace(/<meta\s+property="og:description"\s+content=".*?"\s*\/?>/gi, `<meta property="og:description" content="${description}" />`);
    html = html.replace(/<meta\s+property="og:url"\s+content=".*?"\s*\/?>/gi, `<meta property="og:url" content="${canonicalUrl}" />`);
    html = html.replace(/<meta\s+property="og:image"\s+content=".*?"\s*\/?>/gi, `<meta property="og:image" content="${ogImage}" />`);
    html = html.replace(/<meta\s+property="og:image:secure_url"\s+content=".*?"\s*\/?>/gi, `<meta property="og:image:secure_url" content="${ogImage}" />`);

    html = html.replace(/<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/gi, `<meta name="twitter:title" content="${title}" />`);
    html = html.replace(/<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/gi, `<meta name="twitter:description" content="${description}" />`);
    html = html.replace(/<meta\s+name="twitter:image"\s+content=".*?"\s*\/?>/gi, `<meta name="twitter:image" content="${ogImage}" />`);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
    return res.status(200).send(html);
  } catch (err) {
    console.error('SSR Handler Error:', err);
    try {
      const indexPath = path.join(process.cwd(), 'dist', 'index.html');
      let html = fs.readFileSync(indexPath, 'utf8');
      const siteUrl = 'https://kvantumtechsolutions.com';
      const reqUrl = req.url || '/';
      const parsedUrl = new URL(reqUrl, siteUrl);
      const pathname = parsedUrl.pathname;
      const canonicalUrl = `${siteUrl}${pathname === '/' ? '/' : pathname}`;
      
      let title = "Contact Kvantum Tech Solutions | Direct Technical Contact";
      if (pathname === '/contact') {
        title = "Contact Kvantum Tech Solutions | Direct Technical Contact";
      } else if (pathname === '/services') {
        title = "Enterprise IT & Automation Services | Kvantum Tech Solutions";
      }
      
      html = html.replace(/<title>.*?<\/title>/gi, `<title>${title}</title>`);
      html = html.replace(/<link\s+rel="canonical"\s+href=".*?"\s*\/?>/gi, `<link rel="canonical" href="${canonicalUrl}" />`);
      html = html.replace(/<meta\s+property="og:url"\s+content=".*?"\s*\/?>/gi, `<meta property="og:url" content="${canonicalUrl}" />`);
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(200).send(html);
    } catch (e2) {
      return res.status(500).send('Server Error');
    }
  }
}
