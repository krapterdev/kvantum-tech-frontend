'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sun, Moon, ArrowRight } from 'lucide-react';
import MobileMenu from './MobileMenu';
import { InstagramIcon, LinkedinIcon, FacebookIcon, TwitterIcon } from '../ui/SocialIcons';
import KvantumLogo from '../ui/KvantumLogo';

export default function NavbarNext({ theme, toggleTheme, settings }: any) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const contact = settings?.contact || {};
  const showInstagram = contact.instagramActive !== false && (contact.instagram || 'https://www.instagram.com/kvantumtechsolutions/');
  const showLinkedin = contact.linkedinActive !== false && (contact.linkedin || 'https://www.linkedin.com/in/kvantum-tech-solutions-75916a41b');
  const showFacebook = contact.facebookActive !== false && (contact.facebook || 'https://facebook.com/kvantumtechsolutions');
  const showTwitter = contact.twitterActive !== false && contact.twitter;

  const isActive = (path: string) => {
    if (!pathname) return false;
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-32px)] max-w-[1280px] z-[100]">
        <nav className="w-full rounded-2xl px-6 py-3 flex items-center justify-between bg-white/90 dark:bg-zinc-950/85 border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-lg dark:shadow-2xl select-none transition-colors duration-300">
          
          {/* Logo */}
          <Link 
            href="/"
            onClick={() => setMobileMenuOpen(false)} 
            className="flex items-center cursor-pointer py-1"
          >
            <KvantumLogo className="h-10 sm:h-12" theme={theme} />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex gap-7 items-center">
            <Link 
              href="/"
              className={`text-sm font-medium transition-colors duration-200 ${isActive('/') ? 'text-cyan-600 dark:text-cyan-400 font-bold' : 'text-slate-600 dark:text-slate-300 hover:text-cyan-500'}`}
            >
              Home
            </Link>
            <Link 
              href="/about"
              className={`text-sm font-medium transition-colors duration-200 ${isActive('/about') ? 'text-cyan-600 dark:text-cyan-400 font-bold' : 'text-slate-600 dark:text-slate-300 hover:text-cyan-500'}`}
            >
              About
            </Link>
            <Link 
              href="/services"
              className={`text-sm font-medium transition-colors duration-200 ${isActive('/services') ? 'text-cyan-600 dark:text-cyan-400 font-bold' : 'text-slate-600 dark:text-slate-300 hover:text-cyan-500'}`}
            >
              Services
            </Link>
            <Link 
              href="/projects"
              className={`text-sm font-medium transition-colors duration-200 ${isActive('/projects') ? 'text-cyan-600 dark:text-cyan-400 font-bold' : 'text-slate-600 dark:text-slate-300 hover:text-cyan-500'}`}
            >
              Projects
            </Link>
            <Link 
              href="/blog"
              className={`text-sm font-medium transition-colors duration-200 ${isActive('/blog') ? 'text-cyan-600 dark:text-cyan-400 font-bold' : 'text-slate-600 dark:text-slate-300 hover:text-cyan-500'}`}
            >
              Blog
            </Link>
            <Link 
              href="/contact"
              className={`text-sm font-medium transition-colors duration-200 ${isActive('/contact') ? 'text-cyan-600 dark:text-cyan-400 font-bold' : 'text-slate-600 dark:text-slate-300 hover:text-cyan-500'}`}
            >
              Contact
            </Link>
          </div>

          {/* Action Controls & Social Icons */}
          <div className="flex items-center gap-4">

            {/* Social Icons */}
            <div className="hidden md:flex items-center gap-3 border-r border-slate-200 dark:border-white/10 pr-4">
              {showInstagram && (
                <a href={contact.instagram || 'https://www.instagram.com/kvantumtechsolutions/'} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-pink-500 dark:text-slate-400 transition-colors p-1" title="Instagram">
                  <InstagramIcon className="w-4 h-4" />
                </a>
              )}
              {showLinkedin && (
                <a href={contact.linkedin || 'https://www.linkedin.com/in/kvantum-tech-solutions-75916a41b'} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-cyan-500 dark:text-slate-400 transition-colors p-1" title="LinkedIn">
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              )}
              {showFacebook && (
                <a href={contact.facebook || 'https://facebook.com/kvantumtechsolutions'} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-500 dark:text-slate-400 transition-colors p-1" title="Facebook">
                  <FacebookIcon className="w-4 h-4" />
                </a>
              )}
              {showTwitter && (
                <a href={contact.twitter} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-sky-400 dark:text-slate-400 transition-colors p-1" title="Twitter / X">
                  <TwitterIcon className="w-4 h-4" />
                </a>
              )}
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
              title="Toggle Light/Dark Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Contact CTA */}
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-md hover:shadow-cyan-500/25 transition-all duration-300"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-zinc-900 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </nav>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <MobileMenu 
          isOpen={mobileMenuOpen} 
          onClose={() => setMobileMenuOpen(false)} 
          theme={theme}
          settings={settings}
        />
      )}
    </>
  );
}
