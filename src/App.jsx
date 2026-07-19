import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import ScrollVideoPlayer from '@/components/ScrollVideoPlayer';

// Page components
import Home from '@/pages/Home';
import AboutPage from '@/pages/AboutPage';
import ServicesPage from '@/pages/ServicesPage';
import ServiceDetailPage from '@/pages/ServiceDetailPage';
import ProjectsPage from '@/pages/ProjectsPage';
import ContactPage from '@/pages/ContactPage';
import BlogPage from '@/pages/BlogPage';
import DynamicSeoPage from '@/pages/DynamicSeoPage';
import AdminPortalPage from '@/pages/AdminPortalPage';
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
        const data = await settingService.getSeoSettings();
        setSeoSettings(data);
      } catch (err) {
        console.warn('[API CONNECTION] SEO settings list offline.');
      }
    };
    
    fetchCollections();
  }, []);

  // Dynamic Browser SEO Metadata Injection & Custom Scripts
  useEffect(() => {
    let title = 'IT Solutions Company in Delhi NCR | Kvantum Tech Solutions';
    let description = 'Kvantum Tech Solutions offers reliable IT services, software development, cloud solutions, web development, and digital transformation services across Delhi NCR.';
    let keywords = 'it solutions, web dev, app development';
    
    const path = location.pathname;

    if (path === '/') {
      if (seoSettings?.home) {
        title = seoSettings.home.title || title;
        description = seoSettings.home.description || description;
        keywords = seoSettings.home.keywords || keywords;
      }
    } else if (path === '/services') {
      title = seoSettings?.services?.title || 'Our Capabilities & Services | Studio Kvantum';
      description = seoSettings?.services?.description || 'Explore Studio Kvantums core capabilities: SEO, custom chatbots, brand design, React web development, and mobile applications.';
      keywords = seoSettings?.services?.keywords || 'react, app development, brand design';
    } else if (path.startsWith('/services/')) {
      const slug = path.split('/')[2];
      const activeService = services.find(s => s.id === slug);
      if (activeService) {
        title = activeService.metaTitle || `${activeService.title} | Studio Kvantum`;
        description = activeService.metaDesc || activeService.shortDesc;
      }
    } else if (path === '/about') {
      title = seoSettings?.about?.title || 'About Studio Kvantum | Delhi NCR';
      description = seoSettings?.about?.description || 'Learn more about Studio Kvantum, a creative digital engineering agency based in Noida, Delhi NCR.';
      keywords = seoSettings?.about?.keywords || 'noida agency, about kvantum';
    } else if (path === '/projects') {
      title = seoSettings?.projects?.title || 'Featured Projects | Studio Kvantum';
      description = seoSettings?.projects?.description || 'Explore web products, apps, and custom platforms built for our clients.';
      keywords = seoSettings?.projects?.keywords || 'case studies, portfolio';
    } else if (path === '/blog') {
      title = 'Studio Kvantum Blog & Insights';
      description = 'Read the latest developer articles, design guides, and digital marketing insights from our team.';
    } else if (path.startsWith('/blog/')) {
      const slug = path.split('/')[2];
      const activePost = blogs.find(b => b.id === slug);
      if (activePost) {
        title = activePost.metaTitle || activePost.title;
        description = activePost.metaDesc || activePost.summary;
      }
    } else if (path === '/contact') {
      title = seoSettings?.contact?.title || 'Contact Studio Kvantum | Noida Sector 62';
      description = seoSettings?.contact?.description || 'Get in touch with the development and design team at Studio Kvantum to start your project.';
      keywords = seoSettings?.contact?.keywords || 'contact details, phone';
    } else if (path === '/admin') {
      title = 'Admin Portal | Studio Kvantum';
      description = 'Studio Kvantum Admin Portal to manage content, service items, blogs, and SEO details.';
    } else if (path.startsWith('/keyword/')) {
      const slug = path.split('/')[2];
      const activePage = seoPages.find(p => p.slug === slug);
      if (activePage) {
        title = activePage.metaTitle || activePage.title;
        description = activePage.metaDesc || activePage.content.substring(0, 160);
        keywords = activePage.metaKeywords || '';
      }
    }

    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[name="keywords"]')?.setAttribute('content', keywords);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', `https://www.kvantumtechsolutions.com${path}`);
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
    <div className={`relative min-h-screen text-zinc-100 ${isAdminPath ? 'bg-[#090D1A]' : 'overflow-hidden'}`}>
      {/* Background color layer behind the canvas */}
      {!isAdminPath && <div className="fixed inset-0 bg-background-dark -z-30 pointer-events-none" />}
      
      {/* Dynamic Scroll Video Frame Canvas Background */}
      {!isAdminPath && <ScrollVideoPlayer />}
      
      {/* Dark Overlay for Contrast & Text Readability */}
      {!isAdminPath && <div className="fixed inset-0 bg-black/80 backdrop-blur-[2px] -z-10 pointer-events-none" />}

      {/* Auto Reset Scroll position */}
      <ScrollToTop />

      {!isAdminPath && <Navbar theme={theme} toggleTheme={toggleTheme} settings={settings} />}

      <main className={`relative z-10 ${isAdminPath ? 'pt-0 min-h-screen' : 'pt-[100px] min-h-[75vh]'}`}>
        <Routes>
          <Route path="/" element={<Home services={services} blogs={blogs} settings={settings} />} />
          <Route path="/about" element={<AboutPage theme={theme} settings={settings} />} />
          <Route path="/services" element={<ServicesPage services={services} />} />
          <Route path="/services/:id" element={<ServiceDetailPage services={services} />} />
          <Route path="/projects" element={<ProjectsPage portfolios={portfolios} />} />
          <Route path="/contact" element={<ContactPage settings={settings} />} />
          
          <Route path="/blog" element={<BlogPage blogs={blogs} />} />
          <Route path="/blog/:slug" element={<BlogPage blogs={blogs} />} />
          
          <Route path="/keyword/:slug" element={<DynamicSeoPage seoPages={seoPages} />} />
          
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

      {!isAdminPath && <Footer seoPages={seoPages} theme={theme} settings={settings} services={services} />}
    </div>
  );
}
