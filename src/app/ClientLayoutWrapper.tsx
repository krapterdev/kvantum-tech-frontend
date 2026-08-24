'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import NavbarNext from '@/components/layout/NavbarNext';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import ScrollVideoPlayer from '@/components/ScrollVideoPlayer';
import FloatingQuickActions from '@/components/sections/FloatingQuickActions';
import CookieConsent from '@/components/ui/CookieConsent';
import ChatWidget from '@/components/chatbot/ChatWidget';
import { fallbackSettings } from '@/data/settings';
import * as settingService from '@/services/settingService';

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');
  const [theme, setTheme] = useState('light');
  const [settings, setSettings] = useState<any>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('kts_saved_contact_settings');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          return { ...fallbackSettings, contact: parsed };
        } catch (e) {}
      }
    }
    return fallbackSettings;
  });

  useEffect(() => {
    // 1. Fetch live settings from backend API / database
    settingService.getSettings().then((data) => {
      if (data && data.contact) {
        setSettings((prev: any) => ({ ...prev, contact: data.contact }));
      }
    }).catch((e) => {
      console.warn('[API SETTINGS LOAD WARN]', e);
    });

    // 2. Load saved theme
    const savedTheme = localStorage.getItem('kts_theme_mode');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setTheme(savedTheme);
    }

    // 3. Listen for live settings updates
    const handleSettingsUpdate = () => {
      const saved = localStorage.getItem('kts_saved_contact_settings');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setSettings((prev: any) => ({ ...prev, contact: parsed }));
        } catch (e) {}
      }
    };

    window.addEventListener('kts_settings_updated', handleSettingsUpdate);
    return () => window.removeEventListener('kts_settings_updated', handleSettingsUpdate);
  }, []);

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
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // If visiting /admin or any /admin/* sub-route, render ONLY the standalone Admin Portal UI
  if (isAdmin) {
    return <div className="min-h-screen bg-slate-950 text-white">{children}</div>;
  }

  return (
    <>
      {/* Interactive Background Canvas Scroller Video Player */}
      <ScrollVideoPlayer />

      {/* Auto Scroll to top on navigation */}
      <ScrollToTop />

      {/* Header Navbar */}
      <NavbarNext theme={theme} toggleTheme={toggleTheme} settings={settings} />

      {/* Main Content Area */}
      <main className="flex-grow pt-24 relative z-10">
        {children}
      </main>

      {/* Floating Quick Action Buttons */}
      <FloatingQuickActions settings={settings} />

      {/* AI-Free Website Intelligence Chatbot */}
      <ChatWidget />

      {/* Cookie Consent Banner */}
      <CookieConsent />

      {/* Footer */}
      <Footer theme={theme} settings={settings} />
    </>
  );
}
