import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Component that scrolls the page back to top automatically when navigating to another route
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
