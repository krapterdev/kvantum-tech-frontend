import { useNavigate } from 'react-router-dom';

export function useSafeNavigate() {
  const navigate = useNavigate();

  return (path, options = {}) => {
    if (typeof window === 'undefined') return;

    if (options && options.replace) {
      navigate(path, { replace: true });
      return;
    }

    navigate(path);
  };
}
