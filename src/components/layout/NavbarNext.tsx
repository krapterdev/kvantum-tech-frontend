'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sun, Moon, ArrowRight } from 'lucide-react';
import MobileMenu from './MobileMenu';
import { 
  InstagramIcon, LinkedinIcon, FacebookIcon, TwitterIcon, 
  WhatsappIcon, YoutubeIcon, GithubIcon, PinterestIcon, TelegramIcon 
} from '../ui/SocialIcons';
import KvantumLogo from '../ui/KvantumLogo';

export default function NavbarNext({ theme, toggleTheme, settings }: any) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const contact = settings?.contact || {};

  const socialConfig = [
    { id: 'instagram', label: 'Instagram', urlKey: 'instagram', activeKey: 'instagramActive', defaultUrl: 'https://www.instagram.com/kvantumtechsolutions/', defaultActive: true, Icon: InstagramIcon, hoverColor: 'text-slate-500 hover:text-pink-500' },
    { id: 'linkedin', label: 'LinkedIn', urlKey: 'linkedin', activeKey: 'linkedinActive', defaultUrl: '', defaultActive: false, Icon: LinkedinIcon, hoverColor: 'text-slate-500 hover:text-cyan-500' },
    { id: 'facebook', label: 'Facebook', urlKey: 'facebook', activeKey: 'facebookActive', defaultUrl: '', defaultActive: false, Icon: FacebookIcon, hoverColor: 'text-slate-500 hover:text-blue-500' },
    { id: 'twitter', label: 'Twitter / X', urlKey: 'twitter', activeKey: 'twitterActive', defaultUrl: '', defaultActive: false, Icon: TwitterIcon, hoverColor: 'text-slate-500 hover:text-sky-400' },
    { id: 'whatsapp', label: 'WhatsApp', urlKey: 'whatsapp', activeKey: 'whatsappActive', defaultUrl: '', defaultActive: false, Icon: WhatsappIcon, hoverColor: 'text-slate-500 hover:text-emerald-500' },
    { id: 'youtube', label: 'YouTube', urlKey: 'youtube', activeKey: 'youtubeActive', defaultUrl: '', defaultActive: false, Icon: YoutubeIcon, hoverColor: 'text-slate-500 hover:text-red-500' },
    { id: 'github', label: 'GitHub', urlKey: 'github', activeKey: 'githubActive', defaultUrl: 'https://github.com/krapterdev', defaultActive: true, Icon: GithubIcon, hoverColor: 'text-slate-500 hover:text-purple-400' },
    { id: 'pinterest', label: 'Pinterest', urlKey: 'pinterest', activeKey: 'pinterestActive', defaultUrl: '', defaultActive: false, Icon: PinterestIcon, hoverColor: 'text-slate-500 hover:text-red-400' },
    { id: 'telegram', label: 'Telegram', urlKey: 'telegram', activeKey: 'telegramActive', defaultUrl: '', defaultActive: false, Icon: TelegramIcon, hoverColor: 'text-slate-500 hover:text-sky-500' },
  ];

  const navbarSocials = socialConfig
    .map(soc => {
      const urlVal = contact[soc.urlKey] !== undefined ? String(contact[soc.urlKey]).trim() : soc.defaultUrl;
      const isChecked = contact[soc.activeKey] !== undefined ? Boolean(contact[soc.activeKey]) : soc.defaultActive;
      return { ...soc, url: urlVal, isChecked };
    })
    .filter(soc => soc.isChecked && soc.url !== '');

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
            {navbarSocials.length > 0 && (
              <div className="hidden md:flex items-center gap-3 border-r border-slate-200 dark:border-white/10 pr-4">
                {navbarSocials.map(({ id, label, url, Icon, hoverColor }) => (
                  <a
                    key={id}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${hoverColor} dark:text-slate-400 transition-colors p-1`}
                    title={label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            )}

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
      <MobileMenu 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
        theme={theme}
        settings={settings}
      />
    </>
  );
}
