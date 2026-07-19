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

// Seed fallbacks
import { fallbackServices } from '@/data/services';

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [services, setServices] = useState(fallbackServices);
  const [blogs, setBlogs] = useState([]);
  const [seoPages, setSeoPages] = useState([]);
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
    };
    
    fetchCollections();
  }, []);

  // Dynamic Browser SEO Metadata Injection
  useEffect(() => {
    let title = 'IT Solutions Company in Delhi NCR | Kvantum Tech Solutions';
    let description = 'Kvantum Tech Solutions offers reliable IT services, software development, cloud solutions, web development, and digital transformation services across Delhi NCR.';
    
    const path = location.pathname;

    if (path === '/services') {
      title = 'Our Capabilities & Services | Studio Kvantum';
      description = 'Explore Studio Kvantums core capabilities: SEO, custom chatbots, brand design, React web development, and mobile applications.';
    } else if (path === '/about') {
      title = 'About Studio Kvantum | Delhi NCR';
      description = 'Learn more about Studio Kvantum, a creative digital engineering agency based in Noida, Delhi NCR.';
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
      title = 'Contact Studio Kvantum | Noida Sector 62';
      description = 'Get in touch with the development and design team at Studio Kvantum to start your project.';
    } else if (path === '/admin') {
      title = 'Admin Portal | Studio Kvantum';
      description = 'Studio Kvantum Admin Portal to manage content, service items, blogs, and SEO details.';
    } else if (path.startsWith('/keyword/')) {
      const slug = path.split('/')[2];
      const activePage = seoPages.find(p => p.slug === slug);
      if (activePage) {
        title = activePage.metaTitle || activePage.title;
        description = activePage.metaDesc || activePage.content.substring(0, 160);
      }
    }

    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', `https://www.kvantumtech.com${path}`);
    }
  }, [location, blogs, seoPages]);

  return (
    <div className="relative min-h-screen overflow-hidden text-zinc-100">
      {/* Background color layer behind the canvas */}
      <div className="fixed inset-0 bg-background-dark -z-30 pointer-events-none" />
      
      {/* Dynamic Scroll Video Frame Canvas Background */}
      <ScrollVideoPlayer />
      
      {/* Dark Overlay for Contrast & Text Readability */}
      <div className="fixed inset-0 bg-black/65 backdrop-blur-[1px] -z-10 pointer-events-none" />

      {/* Auto Reset Scroll position */}
      <ScrollToTop />

      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main className="relative z-10 pt-[100px] min-h-[75vh]">
        <Routes>
          <Route path="/" element={<Home services={services} />} />
          <Route path="/about" element={<AboutPage theme={theme} />} />
          <Route path="/services" element={<ServicesPage services={services} />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          
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
            />
          } />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer seoPages={seoPages} theme={theme} />
    </div>
  );
}
