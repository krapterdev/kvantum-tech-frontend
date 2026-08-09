'use client';

import React, { useState, useEffect } from 'react';
import NavbarNext from '@/components/layout/NavbarNext';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import ScrollVideoPlayer from '@/components/ScrollVideoPlayer';
import FloatingQuickActions from '@/components/sections/FloatingQuickActions';
import CookieConsent from '@/components/ui/CookieConsent';
import { fallbackSettings } from '@/data/settings';

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('kts_theme_mode');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light-mode');
      root.classList.remove('dark');
    } else {
      root.classList.remove('light-mode');
      root.classList.add('dark');
    }
    localStorage.setItem('kts_theme_mode', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <>
      {/* Interactive Background Canvas Scroller Video Player */}
      <ScrollVideoPlayer />

      {/* Auto Scroll to top on navigation */}
      <ScrollToTop />

      {/* Header Navbar */}
      <NavbarNext theme={theme} toggleTheme={toggleTheme} settings={fallbackSettings as any} />

      {/* Main Content Area */}
      <main className="flex-grow pt-24 relative z-10">
        {children}
      </main>

      {/* Floating Quick Action Buttons */}
      <FloatingQuickActions settings={fallbackSettings as any} />

      {/* Cookie Consent Banner */}
      <CookieConsent />

      {/* Footer */}
      <Footer theme={theme} settings={fallbackSettings as any} />
    </>
  );
}
