import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import ScrollVideoPlayer from '@/components/ScrollVideoPlayer';
import FloatingQuickActions from '@/components/sections/FloatingQuickActions';
import PageLoader from '@/components/ui/PageLoader';
import CookieConsent from '@/components/ui/CookieConsent';

// Page components
import Home from '@/pages/Home';
import AboutPage from '@/pages/AboutPage';
import ServicesPage from '@/pages/ServicesPage';
import ServiceDetailPage from '@/pages/ServiceDetailPage';
import ProjectsPage from '@/pages/ProjectsPage';
import ContactPage from '@/pages/ContactPage';
import ThankYouPage from '@/pages/ThankYouPage';
import BlogPage, { DEFAULT_SEED_BLOG } from '@/pages/BlogPage';
import DynamicSeoPage from '@/pages/DynamicSeoPage';
import AdminPortalPage from '@/pages/AdminPortalPage';
import TermsPage from '@/pages/TermsPage';
import PrivacyPage from '@/pages/PrivacyPage';
import NotFound from '@/pages/NotFound';

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
  const [blogs, setBlogs] = useState([]);
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
        setBlogs(data);
      } catch (err) {
        console.warn('[API CONNECTION] Blogs offline.');
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
          setSettings(prev => ({ ...prev, ...data }));
        }
      } catch (err) {
        console.warn('[API CONNECTION] Site settings offline.');
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
    let title = 'Custom Software Development Company | Kvantum Tech Solutions';
    let description = 'Kvantum Tech Solutions is a custom software development company building scalable business software, CRM, HRMS, ERP, web and mobile apps, and automation solutions.';
    let keywords = 'custom software development company, software development company, custom software development services, business software development company';
    
    const path = location.pathname;
    const siteUrl = 'https://kvantumtechsolutions.com';
    let canonicalUrl = `${siteUrl}${path === '/' ? '/' : path}`;

    if (path === '/') {
      const homeSeo = Array.isArray(seoSettings) ? seoSettings.find(s => s.key === 'home') : null;
      if (homeSeo) {
        title = homeSeo.title || title;
        description = homeSeo.description || description;
        keywords = homeSeo.keywords || keywords;
      }
    } else if (path === '/services') {
      const servicesSeo = Array.isArray(seoSettings) ? seoSettings.find(s => s.key === 'services') : null;
      title = servicesSeo?.title || 'IT Services | Web Development, SEO & AI Solutions | Kvantum Tech Solutions';
      description = servicesSeo?.description || 'Explore Kvantum Tech Solutions\' expert IT services, including web development, SEO, digital marketing, AI chatbots, app development, UI/UX design, and scalable business solutions.';
      keywords = servicesSeo?.keywords || 'software development, mobile app development, web design services, seo agency';
    } else if (path.startsWith('/services/')) {
      const slug = path.replace('/services/', '').trim();
      const activeService = services.find(s => s.id === slug || s.slug === slug);
      if (activeService) {
        title = activeService.metaTitle || `${activeService.title} | Kvantum Tech Solutions`;
        description = activeService.metaDesc || activeService.shortDesc;
      } else {
        const formattedSlug = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        title = `${formattedSlug} Services | Kvantum Tech Solutions`;
        description = `Enterprise ${formattedSlug} services engineered by Kvantum Tech Solutions in Delhi NCR.`;
      }
    } else if (path === '/about') {
      const aboutSeo = Array.isArray(seoSettings) ? seoSettings.find(s => s.key === 'about') : null;
      title = aboutSeo?.title || 'About Kvantum Tech Solutions | IT & AI Innovation Experts';
      description = aboutSeo?.description || 'Learn about Kvantum Tech Solutions, a trusted IT company delivering AI-powered solutions, web development, digital marketing, and enterprise technology services.';
      keywords = aboutSeo?.keywords || 'about kvantum tech solutions, software development company, developer team';
    } else if (path === '/projects' || path === '/portfolio') {
      const projectsSeo = Array.isArray(seoSettings) ? seoSettings.find(s => s.key === 'projects') : null;
      title = projectsSeo?.title || 'Featured Software & Engineering Projects | Kvantum Tech Solutions';
      description = projectsSeo?.description || 'Explore web products, apps, and custom platforms built for our clients.';
      keywords = projectsSeo?.keywords || 'web products, apps, and custom platforms';
    } else if (path === '/blog') {
      const blogSeo = Array.isArray(seoSettings) ? seoSettings.find(s => s.key === 'blog') : null;
      title = blogSeo?.title || 'Tech Blog | AI, SEO, Web Development & Digital Marketing | Kvantum Tech Solutions';
      description = blogSeo?.description || 'Explore the Kvantum Tech Solutions blog for expert insights on AI, SEO, web development, digital marketing, software solutions, and the latest technology trends to grow your business.';
      keywords = blogSeo?.keywords || 'tech blog, web development articles, software engineering insights';
    } else if (path.startsWith('/blog/')) {
      const slug = path.replace('/blog/', '').trim();
      const activePost = blogs.find(b => b.slug === slug || b.id === slug || b._id === slug);
      if (activePost) {
        title = activePost.metaTitle || activePost.title || title;
        description = activePost.metaDesc || activePost.summary || description;
      } else {
        const formattedSlug = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        title = `${formattedSlug} | Kvantum Tech Blog`;
      }
    } else if (path === '/contact') {
      const contactSeo = Array.isArray(seoSettings) ? seoSettings.find(s => s.key === 'contact') : null;
      title = contactSeo?.title || 'Contact Kvantum Tech Solutions | Let\'s Build Your Digital Future';
      description = contactSeo?.description || 'Get in touch with Kvantum Tech Solutions for web development, AI solutions, SEO, digital marketing, mobile apps, and enterprise IT services. Contact our experts today.';
      keywords = contactSeo?.keywords || 'contact kvantum tech solutions, hire developers, start custom software project';
    } else if (path === '/privacy') {
      title = 'Privacy Policy | Kvantum Tech Solutions';
      description = 'Privacy Policy for Kvantum Tech Solutions. Read how we protect and handle your information.';
    } else if (path === '/terms') {
      title = 'Terms & Conditions | Kvantum Tech Solutions';
      description = 'Terms and Conditions for Kvantum Tech Solutions software development and digital engineering services.';
    } else if (path === '/thank-you') {
      title = 'Thank You | Kvantum Tech Solutions';
      description = 'Thank you for contacting Kvantum Tech Solutions. Our technical team will reach out to you shortly.';
    } else if (path === '/admin') {
      title = 'Admin Portal | Kvantum Tech Solutions';
      description = 'Kvantum Tech Solutions Admin Portal to manage content, service items, blogs, and SEO details.';
    } else if (path.startsWith('/keyword/')) {
      const slug = path.replace('/keyword/', '').trim();
      const activePage = seoPages.find(p => p.slug === slug || p.id === slug);
      if (activePage) {
        title = activePage.metaTitle || activePage.title;
        description = activePage.metaDesc || activePage.content.substring(0, 160);
        keywords = activePage.metaKeywords || '';
      } else {
        const formattedSlug = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        title = `${formattedSlug} | Kvantum Tech Solutions`;
        description = `Top-rated ${formattedSlug}. Custom software engineering, CRM, ERP, and business automation services in Delhi NCR.`;
      }
    }

    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[name="keywords"]')?.setAttribute('content', keywords);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonicalUrl);
    document.querySelector('meta[property="og:site_name"]')?.setAttribute('content', 'Kvantum Tech Solutions');
    document.querySelector('meta[property="og:type"]')?.setAttribute('content', 'website');
    
    // Ensure base canonical tag exists and set to exact active page canonical URL
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', canonicalUrl);

    // Clean old injected other SEO tags
    const oldOtherTags = document.querySelectorAll('.kts-injected-other-seo');
    oldOtherTags.forEach(el => el.remove());

    // Inject active page's other tags
    let activeSeoObj = null;
    if (path === '/') {
      activeSeoObj = Array.isArray(seoSettings) ? seoSettings.find(s => s.key === 'home') : null;
    } else if (path === '/services') {
      activeSeoObj = Array.isArray(seoSettings) ? seoSettings.find(s => s.key === 'services') : null;
    } else if (path === '/about') {
      activeSeoObj = Array.isArray(seoSettings) ? seoSettings.find(s => s.key === 'about') : null;
    } else if (path === '/blog') {
      activeSeoObj = Array.isArray(seoSettings) ? seoSettings.find(s => s.key === 'blog') : null;
    } else if (path === '/contact') {
      activeSeoObj = Array.isArray(seoSettings) ? seoSettings.find(s => s.key === 'contact') : null;
    } else if (path === '/projects') {
      activeSeoObj = Array.isArray(seoSettings) ? seoSettings.find(s => s.key === 'projects') : null;
    }

    if (activeSeoObj && activeSeoObj.other) {
      try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(`<div>${activeSeoObj.other}</div>`, 'text/html');
        const elements = doc.body.firstChild.childNodes;
        elements.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const relAttr = node.getAttribute('rel');
            if (relAttr === 'canonical') {
              // Extract the custom canonical URL instead of appending a new element
              const hrefVal = node.getAttribute('href');
              if (hrefVal) {
                canonicalUrl = hrefVal;
              }
              return; // Skip appending this node to avoid duplicate canonical tags
            }

            const clone = document.createElement(node.tagName);
            for (let i = 0; i < node.attributes.length; i++) {
              clone.setAttribute(node.attributes[i].name, node.attributes[i].value);
            }
            if (node.tagName === 'SCRIPT') {
              clone.text = node.textContent;
            } else {
              clone.innerHTML = node.innerHTML;
            }
            clone.classList.add('kts-injected-other-seo');
            
            const nameAttr = node.getAttribute('name');
            const propAttr = node.getAttribute('property');
            if (nameAttr === 'description') {
              document.querySelector('meta[name="description"]')?.remove();
            } else if (nameAttr === 'keywords') {
              document.querySelector('meta[name="keywords"]')?.remove();
            } else if (propAttr === 'og:title') {
              document.querySelector('meta[property="og:title"]')?.remove();
            } else if (propAttr === 'og:description') {
              document.querySelector('meta[property="og:description"]')?.remove();
            } else if (propAttr === 'og:url') {
              document.querySelector('meta[property="og:url"]')?.remove();
            } else if (propAttr === 'og:site_name') {
              document.querySelector('meta[property="og:site_name"]')?.remove();
            } else if (propAttr === 'og:type') {
              document.querySelector('meta[property="og:type"]')?.remove();
            }
            
            document.head.appendChild(clone);
          }
        });
      } catch (err) {
        console.warn('[SEO INJECTION] Error parsing/injecting header tags:', err.message);
      }
    }

    // Apply the resolved canonical URL to the link element
    canonicalEl.setAttribute('href', canonicalUrl);

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
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {!isAdminPath && <Footer seoPages={seoPages} theme={theme} settings={settings} services={services} blogs={blogs} />}
      
      {/* Floating Action Buttons */}
      {!isAdminPath && <FloatingQuickActions settings={settings} />}

      {/* Cookie & Terms Consent Modal */}
      {!isAdminPath && <CookieConsent />}
    </div>
  );
}
