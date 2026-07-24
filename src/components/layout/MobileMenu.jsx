import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Link2 } from 'lucide-react';
import Button from '../ui/Button';
import { getAllServices } from '@/services/serviceService';

export default function MobileMenu({ isOpen, onClose, theme }) {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [services, setServices] = useState([]);

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
        Portfolio
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

      <NavLink
        to="/contact"
        onClick={onClose}
        className="w-full mt-2"
      >
        <button className="w-full py-3 rounded-xl text-sm font-bold bg-pinkCustom text-white hover:bg-pink-600 transition-colors shadow-[0_0_15px_rgba(236,72,153,0.3)] cursor-pointer">
          Let's Talk
        </button>
      </NavLink>
    </div>
  );
}
