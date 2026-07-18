import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Sun, Moon, Link2 } from 'lucide-react';
import MobileMenu from './MobileMenu';
import Button from '../ui/Button';

export default function Navbar({ theme, toggleTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const logoMark = theme === 'dark' 
    ? 'https://bwdtxlosvptlqtixgcip.supabase.co/storage/v1/object/public/kvantumtechsolutions_storage/logo-2-FINAL-LM.jpg' 
    : 'https://bwdtxlosvptlqtixgcip.supabase.co/storage/v1/object/public/kvantumtechsolutions_storage/logo-2-FINAL-DM.jpg';

  return (
    <>
      <nav className="fixed top-5 left-1/2 -translate-x-1/2 w-[calc(100%-40px)] max-w-[1280px] z-[100] rounded-[20px] px-7 py-3.5 flex items-center justify-between glass-panel select-none">
        
        {/* Brand Logo Section */}
        <div 
          onClick={() => {
            setMobileMenuOpen(false);
            navigate('/');
          }} 
          className="flex items-center cursor-pointer"
        >
          <img 
            src={logoMark} 
            alt="Kvantum Logo" 
            className="h-[38px] w-[38px] object-contain rounded-lg border border-white/8 hover:rotate-12 hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex gap-8 items-center">
          <NavLink 
            to="/"
            className={({ isActive }) => 
              `text-[15px] font-semibold transition-colors duration-200 ${isActive ? 'text-cyanCustom font-bold' : 'text-zinc-400 hover:text-cyanCustom'}`
            }
          >
            Home
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
            to="/about"
            className={({ isActive }) => 
              `text-[15px] font-semibold transition-colors duration-200 ${isActive ? 'text-cyanCustom font-bold' : 'text-zinc-400 hover:text-cyanCustom'}`
            }
          >
            About Us
          </NavLink>
          <NavLink 
            to="/blog"
            className={({ isActive }) => 
              `text-[15px] font-semibold transition-colors duration-200 ${isActive ? 'text-cyanCustom font-bold' : 'text-zinc-400 hover:text-cyanCustom'}`
            }
          >
            Developer Blog
          </NavLink>
        </div>

        {/* Controls */}
        <div className="hidden md:flex items-center gap-5">
          {/* Custom Theme Switch Toggle */}
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

          <Button 
            onClick={() => navigate('/contact')} 
            variant="primary"
            className="px-5 py-2.5 rounded-lg text-[13px]"
          >
            Handshake <Link2 size={14} />
          </Button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-4">
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
            className="bg-none border-none text-zinc-100 cursor-pointer"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay Drawer */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
