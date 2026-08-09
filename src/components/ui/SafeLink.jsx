import React from 'react';
import Link from 'next/link';

export default function SafeLink({ to, href, children, className, onClick, ...props }) {
  const target = href || to || '#';
  return (
    <Link href={target} className={className} onClick={onClick} {...props}>
      {children}
    </Link>
  );
}
