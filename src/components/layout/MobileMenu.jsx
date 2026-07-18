import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link2 } from 'lucide-react';
import Button from '../ui/Button';

export default function MobileMenu({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed top-[90px] left-5 right-5 rounded-[20px] p-6 flex flex-col gap-5 z-[99] glass-panel animate-fade-in md:hidden">
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
        to="/services"
        onClick={onClose}
        className={({ isActive }) =>
          `text-base font-semibold transition-colors ${isActive ? 'text-cyanCustom' : 'text-zinc-100 hover:text-cyanCustom'}`
        }
      >
        Services
      </NavLink>
      <NavLink
        to="/about"
        onClick={onClose}
        className={({ isActive }) =>
          `text-base font-semibold transition-colors ${isActive ? 'text-cyanCustom' : 'text-zinc-100 hover:text-cyanCustom'}`
        }
      >
        About Us
      </NavLink>
      <NavLink
        to="/blog"
        onClick={onClose}
        className={({ isActive }) =>
          `text-base font-semibold transition-colors ${isActive ? 'text-cyanCustom' : 'text-zinc-100 hover:text-cyanCustom'}`
        }
      >
        Developer Blog
      </NavLink>
      <NavLink
        to="/contact"
        onClick={onClose}
        className="w-full"
      >
        <Button variant="primary" className="w-full justify-center">
          Initialize Connection <Link2 size={16} />
        </Button>
      </NavLink>
    </div>
  );
}
