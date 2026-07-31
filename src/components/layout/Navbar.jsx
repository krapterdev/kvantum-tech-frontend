import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Sun, Moon, ChevronDown } from 'lucide-react';
import MobileMenu from './MobileMenu';
import { InstagramIcon, LinkedinIcon, FacebookIcon } from '../ui/SocialIcons';
import KvantumLogo from '../ui/KvantumLogo';

export default function Navbar({ theme, toggleTheme, settings }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const contact = settings?.contact || {};
  const instagramUrl = contact.instagram || 'https://www.instagram.com/kvantumtechsolutions/';
  const linkedinUrl = contact.linkedin || 'https://www.linkedin.com/in/kvantum-tech-solutions-75916a41b';
  const facebookUrl = contact.facebook || 'https://facebook.com/kvantumtechsolutions';

  return (
    <>
      <nav className="fixed top-5 left-1/2 -translate-x-1/2 w-[calc(100%-40px)] max-w-[1280px] z-[100] rounded-[20px] px-6 sm:px-8 py-3.5 flex items-center justify-between glass-panel select-none">
        
        {/* Official Brand Logo Section (Image 2) */}
        <div 
          onClick={() => {
            setMobileMenuOpen(false);
            navigate('/');
          }} 
          className="flex items-center cursor-pointer py-1"
        >
          <KvantumLogo className="h-7 sm:h-9" variant="full" />
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex gap-6 items-center">
          <NavLink 
            to="/"
            className={({ isActive }) => 
              `text-[15px] font-semibold transition-colors duration-200 ${isActive ? 'text-cyanCustom font-bold' : 'text-zinc-400 hover:text-cyanCustom'}`
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/about"
            className={({ isActive }) => 
              `text-[15px] font-semibold transition-colors duration-200 ${isActive ? 'text-cyanCustom font-bold' : 'text-zinc-400 hover:text-cyanCustom'}`
            }
          >
            About
          </NavLink>
          
          <NavLink 
            to="/services"
            className={({ isActive }) => 
              `text-[15px] font-semibold transition-colors duration-200 ${isActive ? 'text-cyanCustom font-bold' : 'text-zinc-400 hover:text-cyanCustom'}`
            }
          >
            Services
          </NavLink>

          <NavLink 
            to="/projects"
            className={({ isActive }) => 
              `text-[15px] font-semibold transition-colors duration-200 ${isActive ? 'text-cyanCustom font-bold' : 'text-zinc-400 hover:text-cyanCustom'}`
            }
          >
            Portfolio
          </NavLink>

          <NavLink 
            to="/blog"
            className={({ isActive }) => 
              `text-[15px] font-semibold transition-colors duration-200 ${isActive ? 'text-cyanCustom font-bold' : 'text-zinc-400 hover:text-cyanCustom'}`
            }
          >
            Blog
          </NavLink>

          <NavLink 
            to="/contact"
            className={({ isActive }) => 
              `text-[15px] font-semibold transition-colors duration-200 ${isActive ? 'text-cyanCustom font-bold' : 'text-zinc-400 hover:text-cyanCustom'}`
            }
          >
            Contact
          </NavLink>
        </div>

        {/* Controls & Social Links */}
        <div className="hidden lg:flex items-center gap-4">
          
          {/* Social Links Icons */}
          <div className="flex items-center gap-2 border-r border-white/10 pr-4">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-zinc-400 hover:text-pinkCustom hover:bg-white/5 transition-colors"
              title="Instagram"
            >
              <InstagramIcon size={17} />
            </a>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-zinc-400 hover:text-cyanCustom hover:bg-white/5 transition-colors"
              title="LinkedIn"
            >
              <LinkedinIcon size={17} />
            </a>
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-zinc-400 hover:text-blue-400 hover:bg-white/5 transition-colors"
              title="Facebook"
            >
              <FacebookIcon size={17} />
            </a>
          </div>

          {/* Theme Switcher Toggle */}
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={theme === 'light'} 
              onChange={toggleTheme} 
            />
            <span className="slider">
              <Sun size={12} color="#ffffff" style={{ marginLeft: '4px', opacity: theme === 'light' ? 0 : 0.6 }} />
              <Moon size={12} color="#ffffff" style={{ marginRight: '4px', opacity: theme === 'light' ? 0.6 : 0 }} />
            </span>
          </label>

          <button 
            onClick={() => navigate('/contact')} 
            className="px-5 py-2.5 rounded-lg text-[13px] font-bold bg-pinkCustom text-white hover:bg-pink-600 transition-colors shadow-[0_0_15px_rgba(236,72,153,0.3)] cursor-pointer"
          >
            Let's Talk
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden items-center gap-4">
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={theme === 'light'} 
              onChange={toggleTheme} 
            />
            <span className="slider"></span>
          </label>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="bg-none border-none cursor-pointer transition-colors flex items-center justify-center text-zinc-200"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay Drawer */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} theme={theme} settings={settings} />
    </>
  );
}
