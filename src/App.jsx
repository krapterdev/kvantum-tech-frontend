import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import PageLoader from '@/components/ui/PageLoader';

// Keep Home page eager for zero initial render delay
import Home from '@/pages/Home';
import { fallbackBlogs } from '@/data/blogs';

// Lazy-load below-fold layout components to cut initial bundle
const Footer = lazy(() => import('@/components/layout/Footer'));
const ScrollToTop = lazy(() => import('@/components/layout/ScrollToTop'));
const ScrollVideoPlayer = lazy(() => import('@/components/ScrollVideoPlayer'));
const FloatingQuickActions = lazy(() => import('@/components/sections/FloatingQuickActions'));
const CookieConsent = lazy(() => import('@/components/ui/CookieConsent'));

// Safe retry wrapper for dynamic import chunking to prevent ChunkLoadErrors
const lazyWithRetry = (componentImport) =>
  React.lazy(async () => {
    try {
      return await componentImport();
    } catch (error) {
      console.warn('Chunk load error, retrying page import:', error);
      // Fallback retry once before erroring
      return await componentImport();
    }
  });

// Code-split heavy secondary pages to keep initial JS bundle under 250KB for 90+ Mobile PageSpeed
const BlogPage = lazyWithRetry(() => import('@/pages/BlogPage'));
const AboutPage = lazyWithRetry(() => import('@/pages/AboutPage'));
const ServicesPage = lazyWithRetry(() => import('@/pages/ServicesPage'));
const ServiceDetailPage = lazyWithRetry(() => import('@/pages/ServiceDetailPage'));
const ProjectsPage = lazyWithRetry(() => import('@/pages/ProjectsPage'));
const ContactPage = lazyWithRetry(() => import('@/pages/ContactPage'));
const ThankYouPage = lazyWithRetry(() => import('@/pages/ThankYouPage'));
const DynamicSeoPage = lazyWithRetry(() => import('@/pages/DynamicSeoPage'));
const TermsPage = lazyWithRetry(() => import('@/pages/TermsPage'));
const PrivacyPage = lazyWithRetry(() => import('@/pages/PrivacyPage'));
const NotFound = lazyWithRetry(() => import('@/pages/NotFound'));
const AdminPortalPage = lazyWithRetry(() => import('@/pages/AdminPortalPage'));

// API services
import * as serviceService from '@/services/serviceService';
import * as blogService from '@/services/blogService';
import * as seoService from '@/services/seoService';
import * as settingService from '@/services/settingService';
import * as portfolioService from '@/services/portfolioService';

// Seed fallbacks
import { fallbackServices } from '@/data/services';
import { fallbackSettings } from '@/data/settings';

export default function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('kts_theme_mode');
      if (saved === 'light' || saved === 'dark') return saved;
    }
    return 'light'; // Default white theme as requested
  });
  const [services, setServices] = useState(fallbackServices);
  const [blogs, setBlogs] = useState(fallbackBlogs);
  const [blogsLoading, setBlogsLoading] = useState(true);
  const [seoPages, setSeoPages] = useState([]);
  const [portfolios, setPortfolios] = useState([]);
  const [settings, setSettings] = useState(fallbackSettings);
  const [seoSettings, setSeoSettings] = useState(null);
  const location = useLocation();

  // Sync theme classes directly to root element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
      root.classList.add('light-mode');
      root.classList.remove('dark');
    } else {
      root.classList.remove('light');
      root.classList.remove('light-mode');
      root.classList.add('dark');
    }
    localStorage.setItem('kts_theme_mode', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Sync database telemetry details after initial page render is complete
  useEffect(() => {
    const fetchCollections = async () => {
      // 1. Services
      try {
        const data = await serviceService.getAllServices();
        if (data && data.length > 0) setServices(data);
      } catch (err) {}

      // 2. Blogs
      try {
        const data = await blogService.getAllBlogs();
        let localSaved = [];
        try { localSaved = JSON.parse(localStorage.getItem('kts_saved_blogs') || '[]'); } catch(e) {}
        const map = new Map();
        (Array.isArray(data) ? data : []).forEach(b => map.set(b.id || b._id || b.slug, b));
        localSaved.forEach(b => map.set(b.id || b._id || b.slug, b));
        const merged = Array.from(map.values());
        if (merged.length > 0) setBlogs(merged);
      } catch (err) {
        let localSaved = [];
        try { localSaved = JSON.parse(localStorage.getItem('kts_saved_blogs') || '[]'); } catch(e) {}
        if (localSaved.length > 0) setBlogs(localSaved);
      } finally {
        setBlogsLoading(false);
      }

      // 3. Programmatic SEO Pages
      try {
        const data = await seoService.getAllSeoPages();
        if (data && data.length > 0) setSeoPages(data);
      } catch (err) {}

      // 4. Site Settings
      try {
        const data = await settingService.getSettings();
        if (data && Object.keys(data).length > 0) {
          let contactObj = data.contact || {};
          if (typeof contactObj === 'string') {
            try { contactObj = JSON.parse(contactObj); } catch(e) {}
          }
          setSettings(prev => ({ ...prev, ...data, contact: { ...(prev?.contact || {}), ...contactObj } }));
        }
      } catch (err) {}
      const localContact = localStorage.getItem('kts_saved_contact_settings');
      if (localContact) {
        try {
          const parsed = JSON.parse(localContact);
          setSettings(prev => ({ ...prev, contact: { ...(prev?.contact || {}), ...parsed } }));
        } catch(e) {}
      }

      // 5. Portfolios
      try {
        const data = await portfolioService.getAllPortfolios();
        if (data && data.length > 0) setPortfolios(data);
      } catch (err) {}

      // 6. SEO Settings
      try {
        const data = await seoService.getSeoSettings();
        if (data) setSeoSettings(data);
      } catch (err) {}
    };
    
    if (typeof window !== 'undefined') {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => fetchCollections());
      } else {
        setTimeout(fetchCollections, 2500);
      }
    }
  }, []);

  // Dynamic Browser SEO Metadata Injection & Custom Scripts
  useEffect(() => {
    // Trigger SPA Pageview Event for Google Analytics (gtag.js) & GTM on route changes
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      if (typeof window.gtag === 'function') {
        window.gtag('config', 'G-YME6G02ES5', {
          page_path: location.pathname + location.search,
          page_title: document.title
        });
      }
      window.dataLayer.push({
        event: 'page_view',
        page_path: location.pathname + location.search,
        page_title: document.title
      });
    }

    // ── FULLY STATIC SEO META ────────────────────────────────────────────────
    // All main pages use hardcoded values. Admin panel no longer controls these.
    // OG image is static banner for all main pages.
    const STATIC_OG_IMAGE = 'https://bwdtxlosvptlqtixgcip.supabase.co/storage/v1/object/public/kvantumtechsolutions_storage/og_img_1787116160287_og_home_page_banner.png';

    let title = 'Kvantum Tech Solutions';
    let description = 'Kvantum Tech Solutions is a custom software development company.';
    let keywords = 'custom software development company, Kvantum Tech Solutions';

    const path = location.pathname;
    let canonicalUrl = `https://kvantumtechsolutions.com${path === '/' ? '/' : path}`;

    let ogTitle = '';
    let ogDesc = '';
    let ogImage = STATIC_OG_IMAGE;
    let ogType = 'website';
    let twitterTitle = '';
    let twitterDesc = '';
    let twitterImage = STATIC_OG_IMAGE;
    let twitterCard = 'summary_large_image';
    let schemaMarkup = '';
    let faqsList = [];
    let otherTagsContent = '';

    if (path === '/') {
      title = 'Custom Software Development Company | Kvantum Tech Solutions';
      description = 'Kvantum Tech Solutions is a custom software development company building scalable business software, CRM, HRMS, ERP, web and mobile apps, and automation solutions across Delhi NCR.';
      keywords = 'custom software development company, software development company, custom software development services, business software development company';
      canonicalUrl = 'https://kvantumtechsolutions.com/';
      ogTitle = title;
      ogDesc = description;
    } else if (path === '/about') {
      title = 'About Kvantum Tech Solutions | Enterprise Software & IT Services';
      description = 'Learn about Kvantum Tech Solutions, a trusted custom software development company specializing in CRM, HRMS, web apps, and business automation in Delhi NCR.';
      keywords = 'about kvantum tech solutions, software engineering team, custom software company';
      canonicalUrl = 'https://kvantumtechsolutions.com/about';
      ogTitle = title;
      ogDesc = description;
    } else if (path === '/services') {
      title = 'Enterprise IT & Custom Software Services | Kvantum Tech Solutions';
      description = 'Explore custom software development, SaaS products, WhatsApp API integration, CRM/HRMS development, and web and mobile app development services.';
      keywords = 'custom software services, CRM software development, HRMS development, web application development';
      canonicalUrl = 'https://kvantumtechsolutions.com/services';
      ogTitle = title;
      ogDesc = description;
    } else if (path === '/projects' || path === '/portfolio') {
      title = 'Featured Projects | Studio Kvantum Tech Solutions';
      description = 'Explore web products, apps, and custom platforms built for our clients by Kvantum Tech Solutions.';
      keywords = 'featured software projects, portfolio, enterprise software development';
      canonicalUrl = 'https://kvantumtechsolutions.com/projects';
      ogTitle = title;
      ogDesc = description;
    } else if (path === '/blog') {
      title = 'Engineering & Tech Insights | Kvantum Tech Solutions Blog';
      description = 'Latest articles on custom software development, business automation, CRM tools, SaaS engineering, and enterprise digital transformation.';
      keywords = 'software engineering blog, tech insights, custom software development guides';
      canonicalUrl = 'https://kvantumtechsolutions.com/blog';
      ogTitle = title;
      ogDesc = description;
    } else if (path === '/contact') {
      title = 'Contact Kvantum Tech Solutions | Direct Technical Contact';
      description = 'Get in touch with Kvantum Tech Solutions for custom software, CRM, HRMS, ERP, web apps, and business automation. Book a live demo or request project quotes.';
      keywords = 'contact software company, request software proposal, custom software quote';
      canonicalUrl = 'https://kvantumtechsolutions.com/contact';
      ogTitle = title;
      ogDesc = description;
    } else if (path.startsWith('/keyword/')) {
      // Programmatic SEO pages still dynamic from admin
      const slug = path.replace('/keyword/', '').trim();
      const activeSeoObj = (seoPages || []).find(p => p.slug === slug || p.id === slug);
      if (activeSeoObj) {
        title = activeSeoObj.metaTitle || activeSeoObj.title || title;
        description = activeSeoObj.metaDesc || (activeSeoObj.content ? activeSeoObj.content.substring(0, 160) : description);
        keywords = activeSeoObj.metaKeywords || keywords;
        schemaMarkup = activeSeoObj.schemaMarkup || '';
        otherTagsContent = activeSeoObj.otherSeoTags || '';
      }
    } else if (path.startsWith('/services/')) {
      const slug = path.replace('/services/', '').trim();
      const activeService = services.find(s => s.id === slug || s.slug === slug);
      if (activeService) {
        title = activeService.metaTitle || `${activeService.title} | Kvantum Tech Solutions`;
        description = activeService.metaDesc || activeService.shortDesc;
        ogTitle = activeService.ogTitle || title;
        ogDesc = activeService.ogDesc || description;
        if (activeService.ogImage || activeService.coverImage) {
          ogImage = activeService.ogImage || activeService.coverImage;
        }
      }
    } else if (path.startsWith('/blog/')) {
      const slug = path.replace('/blog/', '').trim();
      const activePost = blogs.find(b => b.slug === slug || b.id === slug || b._id === slug);
      if (activePost) {
        title = activePost.metaTitle || activePost.title || title;
        description = activePost.metaDesc || activePost.summary || description;
        ogTitle = activePost.ogTitle || activePost.metaTitle || activePost.title || title;
        ogDesc = activePost.ogDesc || activePost.metaDesc || activePost.summary || description;
        if (activePost.image || activePost.ogImage) ogImage = activePost.ogImage || activePost.image;
        if (activePost.canonical) canonicalUrl = activePost.canonical;
        schemaMarkup = activePost.schemaMarkup || '';
        otherTagsContent = activePost.otherSeoTags || '';
        faqsList = Array.isArray(activePost.faqs) ? activePost.faqs : [];
      }
    }

    if (!ogTitle) ogTitle = title;
    if (!ogDesc) ogDesc = description;
    if (!twitterTitle) twitterTitle = ogTitle;
    if (!twitterDesc) twitterDesc = ogDesc;
    if (!twitterImage) twitterImage = ogImage;

    document.title = title;

    // Helper function to set or create head meta tags
    const setMetaTag = (selectorAttr, selectorValue, contentVal, attrName = 'name') => {
      let el = document.querySelector(`meta[${selectorAttr}="${selectorValue}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, selectorValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', contentVal);
    };

    setMetaTag('name', 'description', description, 'name');
    setMetaTag('name', 'keywords', keywords, 'name');
    setMetaTag('property', 'og:title', ogTitle, 'property');
    setMetaTag('property', 'og:description', ogDesc, 'property');
    setMetaTag('property', 'og:url', canonicalUrl, 'property');
    setMetaTag('property', 'og:site_name', 'Kvantum Tech Solutions', 'property');
    setMetaTag('property', 'og:type', ogType, 'property');
    setMetaTag('property', 'og:image', ogImage, 'property');
    setMetaTag('property', 'og:image:secure_url', ogImage, 'property');
    setMetaTag('name', 'twitter:title', twitterTitle, 'name');
    setMetaTag('name', 'twitter:description', twitterDesc, 'name');
    setMetaTag('name', 'twitter:image', twitterImage, 'name');
    setMetaTag('name', 'twitter:card', twitterCard, 'name');

    // Canonical Link Tag
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', canonicalUrl);

    // Clean old injected elements
    document.querySelectorAll('.kts-injected-schema, .kts-injected-faq-schema, .kts-injected-other-seo').forEach(el => el.remove());

    // Inject JSON-LD Schema
    if (schemaMarkup) {
      try {
        const schemaScript = document.createElement('script');
        schemaScript.type = 'application/ld+json';
        schemaScript.classList.add('kts-injected-schema');
        schemaScript.text = schemaMarkup;
        document.head.appendChild(schemaScript);
      } catch (e) {
        console.warn('[SCHEMA INJECTION ERROR]', e);
      }
    }

    // Auto-generate FAQPage Schema if FAQs exist
    if (faqsList && faqsList.length > 0) {
      try {
        const faqSchemaObj = {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqsList.filter(f => f && f.question && f.answer).map(f => ({
            "@type": "Question",
            "name": f.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": f.answer
            }
          }))
        };
        const faqScript = document.createElement('script');
        faqScript.type = 'application/ld+json';
        faqScript.classList.add('kts-injected-faq-schema');
        faqScript.text = JSON.stringify(faqSchemaObj);
        document.head.appendChild(faqScript);
      } catch (e) {
        console.warn('[FAQ SCHEMA INJECTION ERROR]', e);
      }
    }

    // Inject Other HTML / Custom Meta / Script Tags
    if (otherTagsContent) {
      try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(`<div>${otherTagsContent}</div>`, 'text/html');
        const elements = doc.body.firstChild.childNodes;
        elements.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const clone = document.createElement(node.tagName);
            for (let i = 0; i < node.attributes.length; i++) {
              clone.setAttribute(node.attributes[i].name, node.attributes[i].value);
            }
            if (node.tagName.toLowerCase() === 'script') {
              clone.text = node.textContent;
            } else {
              clone.innerHTML = node.innerHTML;
            }
            clone.classList.add('kts-injected-other-seo');
            document.head.appendChild(clone);
          }
        });
      } catch (e) {
        console.warn('[OTHER SEO INJECTION ERROR]', e);
      }
    }

    // Dynamic Script Tag Injection
    const oldScripts = document.querySelectorAll('.kts-injected-script');
    oldScripts.forEach(el => el.remove());

    let scriptTarget = 'global';
    if (path === '/') {
      scriptTarget = 'home';
    } else if (path.startsWith('/keyword/')) {
      scriptTarget = 'seo';
    }

    const customScripts = settings?.custom_scripts || [];
    customScripts.forEach(scriptObj => {
      if (scriptObj.target === 'global' || scriptObj.target === scriptTarget) {
        try {
          const parser = new DOMParser();
          const doc = parser.parseFromString(`<div>${scriptObj.code}</div>`, 'text/html');
          const elements = doc.body.firstChild.childNodes;
          
          elements.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const clone = document.createElement(node.tagName);
              for (let i = 0; i < node.attributes.length; i++) {
                clone.setAttribute(node.attributes[i].name, node.attributes[i].value);
              }
              if (node.tagName.toLowerCase() === 'script') {
                clone.text = node.textContent;
              } else {
                clone.innerHTML = node.innerHTML;
              }
              clone.classList.add('kts-injected-script');
              document.head.appendChild(clone);
            }
          });
        } catch (e) {
          console.warn('[SCRIPT INJECTION] Error parsing/injecting code block:', e.message);
        }
      }
    });
  }, [location, blogs, seoPages, seoSettings, settings]);

  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <div className={`relative min-h-screen transition-colors duration-300 ${
      isAdminPath 
        ? 'bg-[#050811] text-zinc-100' 
        : theme === 'light' 
          ? 'bg-[#f8fafc] text-zinc-900' 
          : 'text-zinc-100 overflow-hidden'
    }`}>
      {/* Auto Reset Scroll position */}

      {/* Background color layer behind the canvas */}
      {!isAdminPath && theme === 'dark' && <div className="fixed inset-0 bg-background-dark -z-30 pointer-events-none" />}
      
      {/* Dynamic Scroll Video Frame Canvas Background */}
      {!isAdminPath && theme === 'dark' && <ScrollVideoPlayer />}
      
      {/* Dark Overlay for Contrast & Text Readability */}
      {!isAdminPath && theme === 'dark' && <div className="fixed inset-0 bg-black/80 backdrop-blur-[2px] -z-10 pointer-events-none" />}

      {/* Auto Reset Scroll position */}
      <ScrollToTop />

      {!isAdminPath && <Navbar theme={theme} toggleTheme={toggleTheme} settings={settings} />}

      <main className={`relative z-10 ${isAdminPath ? 'pt-0 min-h-screen' : 'pt-[100px] min-h-[75vh]'}`}>
        <React.Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home services={services} blogs={blogs} blogsLoading={blogsLoading} settings={settings} />} />
            <Route path="/about" element={<AboutPage theme={theme} settings={settings} />} />
            <Route path="/services" element={<ServicesPage services={services} />} />
            {/* Legacy 301 Permanent Redirects for Google Search Central guidelines */}
            <Route path="/services/web-development" element={<Navigate to="/services/web-mobile-app-development" replace />} />
            <Route path="/services/:id" element={<ServiceDetailPage services={services} />} />
            <Route path="/projects" element={<ProjectsPage portfolios={portfolios} />} />
            <Route path="/portfolio" element={<ProjectsPage portfolios={portfolios} />} />
            <Route path="/contact" element={<ContactPage settings={settings} />} />
            <Route path="/thank-you" element={<ThankYouPage />} />
            
            <Route path="/blog" element={<BlogPage blogs={blogs} loading={blogsLoading} />} />
            <Route path="/blog/:slug" element={<BlogPage blogs={blogs} loading={blogsLoading} />} />
            
            <Route path="/keyword/:slug" element={<DynamicSeoPage seoPages={seoPages} />} />
            
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            
            <Route path="/admin" element={
              <AdminPortalPage 
                services={services} 
                setServices={setServices} 
                blogs={blogs} 
                setBlogs={setBlogs} 
                seoPages={seoPages} 
                setSeoPages={setSeoPages} 
                settings={settings}
                setSettings={setSettings}
                portfolios={portfolios}
                setPortfolios={setPortfolios}
                seoSettings={seoSettings}
                setSeoSettings={setSeoSettings}
              />
            } />
            <Route path="/admin/:tab" element={
              <AdminPortalPage 
                services={services} 
                setServices={setServices} 
                blogs={blogs} 
                setBlogs={setBlogs} 
                seoPages={seoPages} 
                setSeoPages={setSeoPages} 
                settings={settings}
                setSettings={setSettings}
                portfolios={portfolios}
                setPortfolios={setPortfolios}
                seoSettings={seoSettings}
                setSeoSettings={setSeoSettings}
              />
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </React.Suspense>
      </main>

      {!isAdminPath && (
        <Suspense fallback={null}>
          <Footer seoPages={seoPages} theme={theme} settings={settings} services={services} blogs={blogs} />
        </Suspense>
      )}

      {/* Floating Action Buttons */}
      {!isAdminPath && (
        <Suspense fallback={null}>
          <FloatingQuickActions settings={settings} />
        </Suspense>
      )}

      {/* Cookie & Terms Consent Modal */}
      {!isAdminPath && (
        <Suspense fallback={null}>
          <CookieConsent />
        </Suspense>
      )}
    </div>
  );
}
