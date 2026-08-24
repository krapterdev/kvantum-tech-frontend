import React, { memo, Suspense, lazy } from 'react';

// Only the 6 service icons that appear on the homepage eagerly
import { Settings, Users, Cpu, Layers, MessageSquare, Smartphone } from 'lucide-react';

const EAGER_ICONS = { Settings, Users, Cpu, Layers, MessageSquare, Smartphone };

// All other icons loaded lazily on demand (only when actually rendered)
const getLazyIcon = (() => {
  const cache = {};
  return (name) => {
    if (!cache[name]) {
      cache[name] = lazy(() =>
        import('lucide-react').then((m) => ({ default: m[name] || m.Layers }))
      );
    }
    return cache[name];
  };
})();

const LucideIcon = memo(function LucideIcon({ name, size = 20, className, ...props }) {
  // Use eager icon if available, otherwise lazy-load
  const EagerIcon = EAGER_ICONS[name];
  if (EagerIcon) {
    return <EagerIcon size={size} className={className} {...props} />;
  }
  const LazyIcon = getLazyIcon(name);
  return (
    <Suspense fallback={<span style={{ display: 'inline-block', width: size, height: size }} />}>
      <LazyIcon size={size} className={className} {...props} />
    </Suspense>
  );
});

export default LucideIcon;
