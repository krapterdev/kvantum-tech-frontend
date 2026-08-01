import React from 'react';

export default function KvantumLogo({ className = "h-10 sm:h-12", theme = "dark" }) {
  const logoSrc = theme === 'light' ? '/logo-light.jpg' : '/logo-dark.jpg';

  return (
    <div className="flex items-center gap-3 select-none">
      <img
        src={logoSrc}
        alt="Kvantum Tech Solutions Logo"
        className={`object-contain rounded-xl max-w-full h-auto border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)] transition-all duration-300 ${className}`}
      />
    </div>
  );
}
