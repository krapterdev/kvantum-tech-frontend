import React from 'react';
import * as Icons from 'lucide-react';

export default function LucideIcon({ name, size = 20, className, ...props }) {
  // Dynamically resolve icon component, fallback to Layers if matching icon does not exist
  const IconComponent = Icons[name] || Icons.Layers;
  return <IconComponent size={size} className={className} {...props} />;
}
