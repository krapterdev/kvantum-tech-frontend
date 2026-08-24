import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import ScrollVideoPlayer from '@/components/ScrollVideoPlayer';
import FloatingQuickActions from '@/components/sections/FloatingQuickActions';
import PageLoader from '@/components/ui/PageLoader';
import CookieConsent from '@/components/ui/CookieConsent';

// Keep Home page component eager for instant homepage render
import Home from '@/pages/Home';
import BlogPage, { DEFAULT_SEED_BLOG, fallbackBlogs } from '@/pages/BlogPage';

// Lazy load secondary page components to optimize initial mobile PageSpeed payload
const AboutPage = React.lazy(() => import('@/pages/AboutPage'));
const ServicesPage = React.lazy(() => import('@/pages/ServicesPage'));
const ServiceDetailPage = React.lazy(() => import('@/pages/ServiceDetailPage'));
const ProjectsPage = React.lazy(() => import('@/pages/ProjectsPage'));
const ContactPage = React.lazy(() => import('@/pages/ContactPage'));
const ThankYouPage = React.lazy(() => import('@/pages/ThankYouPage'));
const DynamicSeoPage = React.lazy(() => import('@/pages/DynamicSeoPage'));
const TermsPage = React.lazy(() => import('@/pages/TermsPage'));
const PrivacyPage = React.lazy(() => import('@/pages/PrivacyPage'));
const NotFound = React.lazy(() => import('@/pages/NotFound'));
const AdminPortalPage = React.lazy(() => import('@/pages/AdminPortalPage'));

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
  const [theme, setTheme] = useState('dark');
  const [services, setServices] = useState(fallbackServices);
  const [blogs, setBlogs] = useState(fallbackBlogs);
  const [blogsLoading, setBlogsLoading] = useState(true);
  const [seoPages, setSeoPages] = useState([]);
  const [portfolios, setPortfolios] = useState([]);
  const [settings, setSettings] = useState(fallbackSettings);
  const [seoSettings, setSeoSettings] = useState(null);
  const location = useLocation();

  // Initialize theme tracking (dark theme is default corporate view)
  useEffect(() => {
    localStorage.removeItem('kts_theme_override');
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setTheme(mediaQuery.matches ? 'dark' : 'light');

    const handleSystemThemeChange = (e) => {
      setTheme(e.matches ? 'dark' : 'light');
    };
    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, []);

  // Sync theme classes directly to the root element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light-mode');
      root.classList.remove('dark');
    } else {
      root.classList.remove('light-mode');
      root.classList.add('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Sync database telemetry details on boot
  useEffect(() => {
    const fetchCollections = async () => {
      // 1. Services
      try {
        const data = await serviceService.getAllServices();
        if (data.length > 0) setServices(data);
      } catch (err) {
        console.warn('[API CONNECTION] Services offline. Loading local seed templates.');
      }

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
        console.warn('[API CONNECTION] Blogs offline.');
        let localSaved = [];
        try { localSaved = JSON.parse(localStorage.getItem('kts_saved_blogs') || '[]'); } catch(e) {}
        if (localSaved.length > 0) setBlogs(localSaved);
      } finally {
        setBlogsLoading(false);
      }

      // 3. Programmatic SEO Pages
      try {
        const data = await seoService.getAllSeoPages();
        setSeoPages(data);
      } catch (err) {
        console.warn('[API CONNECTION] SEO pages offline.');
      }

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
      } catch (err) {
        console.warn('[API CONNECTION] Site settings offline.');
      }
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
        setPortfolios(data);
      } catch (err) {
        console.warn('[API CONNECTION] Portfolios offline.');
      }

      // 6. SEO Settings (General Page SEO)
      try {
        const data = await seoService.getSeoSettings();
        setSeoSettings(data);
      } catch (err) {
        console.warn('[API CONNECTION] SEO settings list offline.');
      }
    };
    
    fetchCollections();
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

    let title = 'IT Solutions Company in Delhi NCR | Kvantum Tech Solutions';
    let description = 'Kvantum Tech Solutions offers reliable IT services, software development, cloud solutions, web development, and digital transformation services across Delhi NCR.';
    let keywords = 'IT Solutions Company in Delhi NCR, Kvantum Tech Solutions, software development, cloud solutions, web development, digital transformation';
    
    const path = location.pathname;
    const siteUrl = 'https://kvantumtechsolutions.com';
    let canonicalUrl = `${siteUrl}${path === '/' ? '/' : path}`;

    let ogTitle = '';
    let ogDesc = '';
    let ogImage = 'https://bwdtxlosvptlqtixgcip.supabase.co/storage/v1/object/public/kvantumtechsolutions_storage/logo-2-FINAL-DM.jpg';
    let ogType = 'website';
    let twitterTitle = '';
    let twitterDesc = '';
    let twitterImage = '';
    let twitterCard = 'summary_large_image';
    let schemaMarkup = '';
    let faqsList = [];
    let otherTagsContent = '';

    let activeSeoObj = null;

    if (path === '/') {
      title = 'IT Solutions Company in Delhi NCR | Kvantum Tech Solutions';
      description = 'Kvantum Tech Solutions offers reliable IT services, software development, cloud solutions, web development, and digital transformation services across Delhi NCR.';
      keywords = 'IT Solutions Company in Delhi NCR, Kvantum Tech Solutions, software development, cloud solutions, web development, digital transformation';
      canonicalUrl = 'https://kvantumtechsolutions.com/';
      ogTitle = title;
      ogDesc = description;
      activeSeoObj = Array.isArray(seoSettings) ? seoSettings.find(s => s.key === 'home') : null;
    } else if (path === '/about') {
      title = 'About Kvantum Tech Solutions | IT & AI Innovation Experts';
      description = 'Learn about Kvantum Tech Solutions, a trusted IT company delivering AI-powered solutions, web development, digital marketing, and enterprise technology services.';
      keywords = 'about kvantum tech solutions, software engineering team, custom software company';
      canonicalUrl = 'https://kvantumtechsolutions.com/about';
      ogTitle = 'About Kvantum Tech Solutions | IT & AI Innovation Experts';
      ogDesc = 'Discover Kvantum Tech Solutions, delivering innovative AI, web development, digital marketing, and enterprise IT solutions for business growth.';
      activeSeoObj = Array.isArray(seoSettings) ? seoSettings.find(s => s.key === 'about') : null;
    } else if (path === '/services') {
      title = 'IT Services | Web Development, SEO & AI Solutions | Kvantum Tech Solutions';
      description = 'Explore Kvantum Tech Solutions\' expert IT services, including web development, SEO, digital marketing, AI chatbots, app development, UI/UX design, and scalable business solutions.';
      keywords = 'IT Services, Web Development, SEO, AI Solutions, Kvantum Tech Solutions';
      canonicalUrl = 'https://kvantumtechsolutions.com/services';
      ogTitle = 'IT Services | Web Development, SEO & AI Solutions | Kvantum Tech Solutions';
      ogDesc = 'Discover enterprise-grade IT services from Kvantum Tech Solutions, including web development, SEO, AI chatbots, digital marketing, app development, and UI/UX design.';
      activeSeoObj = Array.isArray(seoSettings) ? seoSettings.find(s => s.key === 'services') : null;
    } else if (path === '/projects' || path === '/portfolio') {
      title = 'Featured Software & Engineering Projects | Kvantum Tech Solutions';
      description = 'Explore web products, apps, and custom platforms built for our clients by Kvantum Tech Solutions.';
      keywords = 'featured software projects, portfolio, enterprise software development';
      canonicalUrl = 'https://kvantumtechsolutions.com/projects';
      ogTitle = title;
      ogDesc = description;
      activeSeoObj = Array.isArray(seoSettings) ? seoSettings.find(s => s.key === 'projects') : null;
    } else if (path === '/blog') {
      title = 'Tech Blog | AI, SEO, Web Development & Digital Marketing | Kvantum Tech Solutions';
      description = 'Explore the Kvantum Tech Solutions blog for expert insights on AI, SEO, web development, digital marketing, software solutions, and the latest technology trends to grow your business.';
      keywords = 'tech blog, web development articles, software engineering insights';
      canonicalUrl = 'https://kvantumtechsolutions.com/blog';
      ogTitle = 'Tech Blog | AI, SEO, Web Development & Digital Marketing | Kvantum Tech Solutions';
      ogDesc = 'Read the latest articles from Kvantum Tech Solutions covering AI, SEO, web development, digital marketing, software innovation, and business technology .';
      activeSeoObj = Array.isArray(seoSettings) ? seoSettings.find(s => s.key === 'blog') : null;
    } else if (path === '/contact') {
      title = 'Contact Kvantum Tech Solutions | Let\'s Build Your Digital Future';
      description = 'Get in touch with Kvantum Tech Solutions for web development, AI solutions, SEO, digital marketing, mobile apps, and enterprise IT services. Contact our experts today.';
      keywords = 'contact kvantum tech solutions, hire developers, start custom software project';
      canonicalUrl = 'https://kvantumtechsolutions.com/contact';
      ogTitle = 'Contact Kvantum Tech Solutions | Let\'s Build Your Digital Future';
      ogDesc = 'Contact Kvantum Tech Solutions to discuss your next digital project. Our experts deliver innovative web, AI, SEO, app development, and digital marketing solutions.';
      activeSeoObj = Array.isArray(seoSettings) ? seoSettings.find(s => s.key === 'contact') : null;
    } else if (path.startsWith('/keyword/')) {
      const slug = path.replace('/keyword/', '').trim();
      activeSeoObj = (seoPages || []).find(p => p.slug === slug || p.id === slug);
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

    if (activeSeoObj) {
      if (activeSeoObj.title && activeSeoObj.title.trim()) title = activeSeoObj.title.trim();
      if (activeSeoObj.description && activeSeoObj.description.trim()) description = activeSeoObj.description.trim();
      if (activeSeoObj.keywords && activeSeoObj.keywords.trim()) keywords = activeSeoObj.keywords.trim();
      if (activeSeoObj.canonical && activeSeoObj.canonical.trim()) canonicalUrl = activeSeoObj.canonical.trim();
      if (activeSeoObj.ogTitle && activeSeoObj.ogTitle.trim()) ogTitle = activeSeoObj.ogTitle.trim();
      if (activeSeoObj.ogDesc && activeSeoObj.ogDesc.trim()) ogDesc = activeSeoObj.ogDesc.trim();
      if (activeSeoObj.ogImage && activeSeoObj.ogImage.trim()) ogImage = activeSeoObj.ogImage.trim();
      if (activeSeoObj.ogType && activeSeoObj.ogType.trim()) ogType = activeSeoObj.ogType.trim();
      if (activeSeoObj.twitterTitle && activeSeoObj.twitterTitle.trim()) twitterTitle = activeSeoObj.twitterTitle.trim();
      if (activeSeoObj.twitterDesc && activeSeoObj.twitterDesc.trim()) twitterDesc = activeSeoObj.twitterDesc.trim();
      if (activeSeoObj.twitterImage && activeSeoObj.twitterImage.trim()) twitterImage = activeSeoObj.twitterImage.trim();
      if (activeSeoObj.twitterCard && activeSeoObj.twitterCard.trim()) twitterCard = activeSeoObj.twitterCard.trim();
      if (activeSeoObj.schema && activeSeoObj.schema.trim()) schemaMarkup = activeSeoObj.schema.trim();
      if (activeSeoObj.other && activeSeoObj.other.trim()) otherTagsContent = activeSeoObj.other.trim();
      
      let parsedFaqs = [];
      if (Array.isArray(activeSeoObj.faqs)) parsedFaqs = activeSeoObj.faqs;
      else if (typeof activeSeoObj.faqs === 'string') {
        try { parsedFaqs = JSON.parse(activeSeoObj.faqs); } catch(e) {}
      }
      if (parsedFaqs.length > 0) faqsList = parsedFaqs;
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

      {!isAdminPath && <Footer seoPages={seoPages} theme={theme} settings={settings} services={services} blogs={blogs} />}
      
      {/* Floating Action Buttons */}
      {!isAdminPath && <FloatingQuickActions settings={settings} />}

      {/* Cookie & Terms Consent Modal */}
      {!isAdminPath && <CookieConsent />}
    </div>
  );
}
