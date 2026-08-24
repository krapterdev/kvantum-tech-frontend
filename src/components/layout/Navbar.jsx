import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSafeNavigate as useNavigate } from '@/utils/navigation';
import { Menu, X, Sun, Moon, ArrowRight } from 'lucide-react';
import MobileMenu from './MobileMenu';
import { InstagramIcon, LinkedinIcon, FacebookIcon, TwitterIcon } from '../ui/SocialIcons';
import KvantumLogo from '../ui/KvantumLogo';

export default function Navbar({ theme, toggleTheme, settings }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const contact = settings?.contact || {};
  const showInstagram = contact.instagramActive !== false && (contact.instagram || 'https://www.instagram.com/kvantumtechsolutions/');
  const showLinkedin = contact.linkedinActive !== false && (contact.linkedin || 'https://www.linkedin.com/in/kvantum-tech-solutions-75916a41b');
  const showFacebook = contact.facebookActive !== false && (contact.facebook || 'https://facebook.com/kvantumtechsolutions');
  const showTwitter = contact.twitterActive !== false && contact.twitter;

  return (
    <>
      <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-32px)] max-w-[1280px] z-[100]">
        <nav className="w-full rounded-2xl px-6 py-3 flex items-center justify-between bg-white/90 dark:bg-zinc-950/85 border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-lg dark:shadow-2xl select-none transition-colors duration-300">
          
          {/* Logo */}
          <div 
            onClick={() => {
              setMobileMenuOpen(false);
              navigate('/');
            }} 
            className="flex items-center cursor-pointer py-1"
          >
            <KvantumLogo className="h-10 sm:h-12" />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex gap-7 items-center">
            <NavLink 
              to="/"
              className={({ isActive }) => 
                `text-sm font-medium transition-colors duration-200 ${isActive ? 'text-cyan-600 dark:text-cyan-400 font-bold' : 'text-slate-800 dark:text-slate-200 hover:text-cyan-500'}`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/about"
              className={({ isActive }) => 
                `text-sm font-medium transition-colors duration-200 ${isActive ? 'text-cyan-600 dark:text-cyan-400 font-bold' : 'text-slate-800 dark:text-slate-200 hover:text-cyan-500'}`
              }
            >
              About
            </NavLink>
            <NavLink 
              to="/services"
              className={({ isActive }) => 
                `text-sm font-medium transition-colors duration-200 ${isActive ? 'text-cyan-600 dark:text-cyan-400 font-bold' : 'text-slate-800 dark:text-slate-200 hover:text-cyan-500'}`
              }
            >
              Services
            </NavLink>
            <NavLink 
              to="/projects"
              className={({ isActive }) => 
                `text-sm font-medium transition-colors duration-200 ${isActive ? 'text-cyan-600 dark:text-cyan-400 font-bold' : 'text-slate-800 dark:text-slate-200 hover:text-cyan-500'}`
              }
            >
              Projects
            </NavLink>
            <NavLink 
              to="/blog"
              className={({ isActive }) => 
                `text-sm font-medium transition-colors duration-200 ${isActive ? 'text-cyan-600 dark:text-cyan-400 font-bold' : 'text-slate-800 dark:text-slate-200 hover:text-cyan-500'}`
              }
            >
              Blog
            </NavLink>
            <NavLink 
              to="/contact"
              className={({ isActive }) => 
                `text-sm font-medium transition-colors duration-200 ${isActive ? 'text-cyan-600 dark:text-cyan-400 font-bold' : 'text-slate-800 dark:text-slate-200 hover:text-cyan-500'}`
              }
            >
              Contact
            </NavLink>
          </div>

          {/* Social Links & Controls */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-2 border-r border-slate-200 dark:border-white/10 pr-4">
              {showInstagram && (
                <a href={contact.instagram || 'https://www.instagram.com/kvantumtechsolutions/'} target="_blank" rel="noopener noreferrer" aria-label="Visit Kvantum Tech Instagram" className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-pink-500 transition-colors" title="Instagram">
                  <InstagramIcon size={16} />
                </a>
              )}
              {showLinkedin && (
                <a href={contact.linkedin || 'https://www.linkedin.com/in/kvantum-tech-solutions-75916a41b'} target="_blank" rel="noopener noreferrer" aria-label="Visit Kvantum Tech LinkedIn" className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-cyan-500 transition-colors" title="LinkedIn">
                  <LinkedinIcon size={16} />
                </a>
              )}
              {showFacebook && (
                <a href={contact.facebook || 'https://facebook.com/kvantumtechsolutions'} target="_blank" rel="noopener noreferrer" aria-label="Visit Kvantum Tech Facebook" className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-blue-500 transition-colors" title="Facebook">
                  <FacebookIcon size={16} />
                </a>
              )}
              {showTwitter && (
                <a href={contact.twitter} target="_blank" rel="noopener noreferrer" aria-label="Visit Kvantum Tech Twitter" className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-sky-400 transition-colors" title="Twitter / X">
                  <TwitterIcon size={16} />
                </a>
              )}
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-white/15 transition-colors cursor-pointer"
              title="Toggle Light / Dark Mode"
            >
              {theme === 'dark' ? <Sun size={17} className="text-amber-400" /> : <Moon size={17} className="text-slate-700" />}
            </button>

            {/* Contact CTA Button */}
            <button
              onClick={() => navigate('/contact')}
              aria-label="Contact Us"
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-pink-500 hover:bg-pink-600 text-white transition-all duration-200 shadow-md hover:shadow-pink-500/25 cursor-pointer flex items-center gap-1.5"
            >
              Let's Talk <ArrowRight size={14} />
            </button>
          </div>

          {/* Mobile Right Bar */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme Mobile"
              className="p-2 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-200"
            >
              {theme === 'dark' ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-200"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </nav>
      </header>

      {/* Mobile Drawer Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} theme={theme} settings={settings} />
    </>
  );
}
