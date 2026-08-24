import React from 'react';

// Universal link component — no router imports, works in Next.js SSR AND React Router (Vite)
export default function SafeLink({ to, href, children, className, onClick, ...props }) {
  const target = href || to || '/';
  const isExternal = target.startsWith('http') || target.startsWith('mailto') || target.startsWith('tel') || target.startsWith('#');

  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (!isExternal && !e.defaultPrevented && !e.metaKey && !e.ctrlKey) {
      e.preventDefault();
      if (typeof window !== 'undefined') {
        window.history.pushState(null, '', target);
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
    }
  };

  return (
    <a
      href={target}
      className={className}
      onClick={isExternal ? onClick : handleClick}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {children}
    </a>
  );
}
