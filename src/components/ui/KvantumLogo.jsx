import React from 'react';

export default function KvantumLogo({ className = "h-12 sm:h-14" }) {
  return (
    <div className="flex items-center select-none shrink-0">
      <img
        src="/logo-dark.jpg"
        alt="Kvantum Tech Solutions Logo"
        width="48"
        height="48"
        fetchPriority="high"
        decoding="async"
        className={`object-contain rounded-xl transition-all duration-300 filter drop-shadow-[0_0_15px_rgba(236,72,153,0.25)] hidden dark:block ${className}`}
      />
      <img
        src="/logo-light.jpg"
        alt="Kvantum Tech Solutions Logo"
        width="48"
        height="48"
        fetchPriority="high"
        decoding="async"
        className={`object-contain rounded-xl transition-all duration-300 filter drop-shadow-[0_0_15px_rgba(236,72,153,0.25)] block dark:hidden ${className}`}
      />
    </div>
  );
}
