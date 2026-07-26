import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Sun, Moon, Link2, ChevronDown } from 'lucide-react';
import MobileMenu from './MobileMenu';
import Button from '../ui/Button';
import { getAllServices } from '@/services/serviceService';

export default function Navbar({ theme, toggleTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllServices()
      .then(data => setServices(data))
      .catch(err => console.warn('[NAVBAR] Failed to fetch services list:', err.message));
  }, []);

  const logoMark = theme === 'light' 
    ? '/logo-light.jpg' 
    : '/logo-dark.jpg';

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
          
          {/* Services Dropdown */}
          <div className="relative group">
            <NavLink 
              to="/services"
              className={({ isActive }) => 
                `text-[15px] font-semibold transition-colors duration-200 flex items-center gap-1 py-2 ${isActive ? 'text-cyanCustom font-bold' : 'text-zinc-400 hover:text-cyanCustom'}`
              }
            >
              Services <ChevronDown size={14} />
            </NavLink>
            <div className="absolute top-full left-0 mt-0 w-52 rounded-xl bg-zinc-950/95 border border-white/8 p-2 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[110]">
              {services.map(ser => (
                <NavLink 
                  key={ser.id} 
                  to={`/services/${ser.id}`} 
                  className="block px-4 py-2.5 text-xs font-semibold text-zinc-400 hover:text-cyanCustom hover:bg-white/[0.02] rounded-lg"
                >
                  {ser.title}
                </NavLink>
              ))}
            </div>
          </div>

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

        {/* Controls */}
        <div className="hidden lg:flex items-center gap-5">
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
            className="bg-none border-none cursor-pointer transition-colors flex items-center justify-center"
            style={{ color: 'var(--text-primary)' }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay Drawer */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} theme={theme} />
    </>
  );
}
