import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getAllServices } from '@/services/serviceService';
import { InstagramIcon, LinkedinIcon, FacebookIcon, TwitterIcon } from '../ui/SocialIcons';

export default function MobileMenu({ isOpen, onClose, theme, settings }) {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [services, setServices] = useState([]);

  const contact = settings?.contact || {};

  useEffect(() => {
    if (isOpen) {
      getAllServices()
        .then(data => setServices(data))
        .catch(err => console.warn('[MOBILE MENU] Failed to fetch services list:', err.message));
    }
  }, [isOpen]);

  return (
    <div 
      className="fixed left-5 right-5 rounded-[20px] p-6 flex flex-col gap-4 z-[99] max-h-[calc(100vh-120px)] overflow-y-auto lg:hidden text-left shadow-[0_20px_50px_rgba(0,0,0,0.35)] transition-all duration-300 ease-out"
      style={{
        backgroundColor: 'var(--mobile-menu-bg)',
        border: '1px solid var(--mobile-menu-border)',
        color: 'var(--mobile-menu-text)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        top: isOpen ? '90px' : '70px',
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? 'scale(1)' : 'scale(0.95)',
        pointerEvents: isOpen ? 'auto' : 'none',
      }}
    >
      <NavLink
        to="/"
        onClick={onClose}
        className="text-base font-semibold transition-colors flex items-center"
        style={({ isActive }) => ({
          color: isActive ? 'var(--accent-cyan)' : 'var(--mobile-menu-text)'
        })}
      >
        Home
      </NavLink>
      <NavLink
        to="/about"
        onClick={onClose}
        className="text-base font-semibold transition-colors flex items-center"
        style={({ isActive }) => ({
          color: isActive ? 'var(--accent-cyan)' : 'var(--mobile-menu-text)'
        })}
      >
        About
      </NavLink>
      
      {/* Services Drawer for Mobile */}
      <div className="flex flex-col gap-2">
        <button 
          onClick={() => setServicesOpen(!servicesOpen)}
          className="text-base font-semibold flex items-center justify-between w-full bg-transparent border-none text-left cursor-pointer transition-colors"
          style={{ color: 'var(--mobile-menu-text)' }}
        >
          Services <span>{servicesOpen ? '−' : '+'}</span>
        </button>
        {servicesOpen && (
          <div 
            className="flex flex-col gap-2 pl-4 border-l mt-1"
            style={{ borderColor: 'var(--mobile-menu-border)' }}
          >
            {services.map(ser => (
              <NavLink 
                key={ser.id} 
                to={`/services/${ser.id}`} 
                onClick={onClose} 
                className="text-sm py-1 transition-colors flex items-center"
                style={({ isActive }) => ({
                  color: isActive ? 'var(--accent-cyan)' : 'var(--mobile-menu-subtext)'
                })}
              >
                {ser.title}
              </NavLink>
            ))}
          </div>
        )}
      </div>

      <NavLink
        to="/projects"
        onClick={onClose}
        className="text-base font-semibold transition-colors flex items-center"
        style={({ isActive }) => ({
          color: isActive ? 'var(--accent-cyan)' : 'var(--mobile-menu-text)'
        })}
      >
        Projects
      </NavLink>
      <NavLink
        to="/blog"
        onClick={onClose}
        className="text-base font-semibold transition-colors flex items-center"
        style={({ isActive }) => ({
          color: isActive ? 'var(--accent-cyan)' : 'var(--mobile-menu-text)'
        })}
      >
        Blog
      </NavLink>
      <NavLink
        to="/contact"
        onClick={onClose}
        className="text-base font-semibold transition-colors flex items-center"
        style={({ isActive }) => ({
          color: isActive ? 'var(--accent-cyan)' : 'var(--mobile-menu-text)'
        })}
      >
        Contact
      </NavLink>

      {/* Social Links Row in Mobile Drawer */}
      <div className="flex items-center gap-3 py-2 border-t border-white/10 mt-1">
        {contact.instagramActive !== false && (
          <a href={contact.instagram || 'https://www.instagram.com/kvantumtechsolutions/'} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 text-pinkCustom">
            <InstagramIcon size={18} />
          </a>
        )}
        {contact.linkedinActive !== false && (
          <a href={contact.linkedin || 'https://www.linkedin.com/in/kvantum-tech-solutions-75916a41b'} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 text-cyanCustom">
            <LinkedinIcon size={18} />
          </a>
        )}
        {contact.facebookActive !== false && (
          <a href={contact.facebook || 'https://facebook.com/kvantumtechsolutions'} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 text-blue-400">
            <FacebookIcon size={18} />
          </a>
        )}
        {contact.twitterActive !== false && contact.twitter && (
          <a href={contact.twitter} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 text-sky-400">
            <TwitterIcon size={18} />
          </a>
        )}
      </div>

      <NavLink
        to="/contact"
        onClick={onClose}
        className="w-full"
      >
        <button className="w-full py-3 rounded-xl text-sm font-bold bg-pinkCustom text-white hover:bg-pink-600 transition-colors shadow-[0_0_15px_rgba(236,72,153,0.3)] cursor-pointer">
          Let's Talk
        </button>
      </NavLink>
    </div>
  );
}
