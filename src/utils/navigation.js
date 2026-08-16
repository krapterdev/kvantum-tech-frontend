'use client';

import { useRouter } from 'next/navigation';

export function useSafeNavigate() {
  let router = null;
  try {
    router = useRouter();
  } catch (e) {
    // Fallback if rendered outside Next.js Router Context
  }

  return (path, options = {}) => {
    if (typeof window === 'undefined') return;

    if (options && options.replace) {
      if (router && typeof router.replace === 'function') {
        try {
          router.replace(path);
          return;
        } catch (err) {}
      }
      if (window.location.pathname !== path) {
        window.history.replaceState(null, '', path);
      }
      return;
    }

    if (router && typeof router.push === 'function') {
      router.push(path);
    } else {
      window.location.href = path;
    }
  };
}
