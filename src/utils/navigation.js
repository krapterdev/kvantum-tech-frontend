'use client';

// Hybrid navigation — safe in Next.js SSR static prerendering AND React Router (Vite)
// No top-level router imports — uses only window.location for 100% SSR safety.

export function useSafeNavigate() {
  return (path, options = {}) => {
    if (typeof window === 'undefined') return;

    if (options && options.replace) {
      if (window.location.pathname !== path) {
        window.history.replaceState(null, '', path);
      }
      return;
    }

    window.location.href = path;
  };
}
