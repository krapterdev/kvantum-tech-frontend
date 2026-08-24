import React from 'react';

export default function KvantumLogo({ className = "h-12 sm:h-14", theme = "dark" }) {
  const logoSrc = theme === 'light' ? '/logo-light.jpg' : '/logo-dark.jpg';

  return (
    <div className="flex items-center select-none shrink-0">
      <img
        src={logoSrc}
        alt="Kvantum Tech Solutions Logo"
        width="48"
        height="48"
        fetchPriority="high"
        decoding="async"
        className={`object-contain rounded-xl transition-all duration-300 filter drop-shadow-[0_0_15px_rgba(236,72,153,0.25)] ${className}`}
      />
    </div>
  );
}
