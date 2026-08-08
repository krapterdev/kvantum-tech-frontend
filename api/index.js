import fs from 'fs';
import path from 'path';
import app from './backend/app.js';

export default async function handler(req, res) {
  try {
    const reqUrl = req.url || '/';
    const parsedUrl = new URL(reqUrl, `https://kvantumtechsolutions.com`);
    const pathname = parsedUrl.pathname;

    // Delegate all /api/* routes directly to Vercel Serverless Express Engine
    if (pathname.startsWith('/api')) {
      return app(req, res);
    }

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
        const formattedSlug = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        title = `${formattedSlug} Services | Kvantum Tech Solutions`;
        description = `Enterprise ${formattedSlug} services engineered by Kvantum Tech Solutions in Delhi NCR.`;
      }
    } else if (pathname.startsWith('/blog/')) {
      const slug = pathname.replace('/blog/', '').trim();
      if (slug) {
        const formattedSlug = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        title = `${formattedSlug} | Kvantum Tech Blog`;
        description = `Read expert insights and articles on ${formattedSlug} published by Kvantum Tech Solutions.`;
      }
    } else if (pathname.startsWith('/keyword/')) {
      const slug = pathname.replace('/keyword/', '').trim();
      if (slug) {
        const formattedSlug = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        title = `${formattedSlug} | Kvantum Tech Solutions`;
        description = `Custom software engineering, IT solutions, and enterprise tech services for ${formattedSlug}.`;
      }
          title = `${formattedSlug} | Kvantum Tech Solutions`;
        }
      }
    }

    // Perform replacement on HTML head
    html = html.replace(/<title[^>]*?>[\s\S]*?<\/title>/gi, `<title>${title}</title>`);
    html = html.replace(/<meta\s+[^>]*?name=["']description["'][^>]*?\/?>/gi, `<meta name="description" content="${description}" />`);
    html = html.replace(/<meta\s+[^>]*?name=["']keywords["'][^>]*?\/?>/gi, `<meta name="keywords" content="${keywords}" />`);
    html = html.replace(/<link\s+[^>]*?rel=["']canonical["'][^>]*?\/?>/gi, `<link rel="canonical" href="${canonicalUrl}" />`);

    html = html.replace(/<meta\s+[^>]*?property=["']og:title["'][^>]*?\/?>/gi, `<meta property="og:title" content="${title}" />`);
    html = html.replace(/<meta\s+[^>]*?property=["']og:description["'][^>]*?\/?>/gi, `<meta property="og:description" content="${description}" />`);
    html = html.replace(/<meta\s+[^>]*?property=["']og:url["'][^>]*?\/?>/gi, `<meta property="og:url" content="${canonicalUrl}" />`);
    html = html.replace(/<meta\s+[^>]*?property=["']og:image["'][^>]*?\/?>/gi, `<meta property="og:image" content="${ogImage}" />`);
    html = html.replace(/<meta\s+[^>]*?property=["']og:image:secure_url["'][^>]*?\/?>/gi, `<meta property="og:image:secure_url" content="${ogImage}" />`);

    html = html.replace(/<meta\s+[^>]*?name=["']twitter:title["'][^>]*?\/?>/gi, `<meta name="twitter:title" content="${title}" />`);
    html = html.replace(/<meta\s+[^>]*?name=["']twitter:description["'][^>]*?\/?>/gi, `<meta name="twitter:description" content="${description}" />`);
    html = html.replace(/<meta\s+[^>]*?name=["']twitter:image["'][^>]*?\/?>/gi, `<meta name="twitter:image" content="${ogImage}" />`);

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
      
      html = html.replace(/<title[^>]*?>[\s\S]*?<\/title>/gi, `<title>${title}</title>`);
      html = html.replace(/<link\s+[^>]*?rel=["']canonical["'][^>]*?\/?>/gi, `<link rel="canonical" href="${canonicalUrl}" />`);
      html = html.replace(/<meta\s+[^>]*?property=["']og:url["'][^>]*?\/?>/gi, `<meta property="og:url" content="${canonicalUrl}" />`);
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(200).send(html);
    } catch (e2) {
      return res.status(500).send('Server Error');
    }
  }
}
