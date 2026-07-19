import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Link2 } from 'lucide-react';
import Button from '../ui/Button';
import { getAllServices } from '@/services/serviceService';

export default function MobileMenu({ isOpen, onClose }) {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [services, setServices] = useState([]);

  useEffect(() => {
    if (isOpen) {
      getAllServices()
        .then(data => setServices(data))
        .catch(err => console.warn('[MOBILE MENU] Failed to fetch services list:', err.message));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed top-[90px] left-5 right-5 rounded-[20px] p-6 flex flex-col gap-4.5 z-[99] glass-panel max-h-[calc(100vh-120px)] overflow-y-auto animate-fade-in md:hidden text-left">
      <NavLink
        to="/"
        onClick={onClose}
        className={({ isActive }) =>
          `text-base font-semibold transition-colors ${isActive ? 'text-cyanCustom' : 'text-zinc-100 hover:text-cyanCustom'}`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/about"
        onClick={onClose}
        className={({ isActive }) =>
          `text-base font-semibold transition-colors ${isActive ? 'text-cyanCustom' : 'text-zinc-100 hover:text-cyanCustom'}`
        }
      >
        About
      </NavLink>
      
      {/* Services Drawer for Mobile */}
      <div className="flex flex-col gap-2">
        <button 
          onClick={() => setServicesOpen(!servicesOpen)}
          className="text-base font-semibold text-zinc-100 hover:text-cyanCustom flex items-center justify-between w-full bg-none border-none text-left cursor-pointer"
        >
          Services <span>{servicesOpen ? '−' : '+'}</span>
        </button>
        {servicesOpen && (
          <div className="flex flex-col gap-2 pl-4 border-l border-white/8 mt-1">
            {services.map(ser => (
              <NavLink 
                key={ser.id} 
                to={`/services/${ser.id}`} 
                onClick={onClose} 
                className="text-sm text-zinc-400 hover:text-cyanCustom py-1"
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
        className={({ isActive }) =>
          `text-base font-semibold transition-colors ${isActive ? 'text-cyanCustom' : 'text-zinc-100 hover:text-cyanCustom'}`
        }
      >
        Portfolio
      </NavLink>
      <NavLink
        to="/blog"
        onClick={onClose}
        className={({ isActive }) =>
          `text-base font-semibold transition-colors ${isActive ? 'text-cyanCustom' : 'text-zinc-100 hover:text-cyanCustom'}`
        }
      >
        Blog
      </NavLink>
      <NavLink
        to="/contact"
        onClick={onClose}
        className={({ isActive }) =>
          `text-base font-semibold transition-colors ${isActive ? 'text-cyanCustom' : 'text-zinc-100 hover:text-cyanCustom'}`
        }
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
