export function useSafeNavigate() {
  return (path) => {
    if (typeof window !== 'undefined') {
      window.location.href = path;
    }
  };
}
