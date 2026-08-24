import React from 'react';
import { Link } from 'react-router-dom';

export default function SafeLink({ to, href, children, className, onClick, ...props }) {
  const target = href || to || '/';
  // External links use <a>, internal use react-router Link
  if (target.startsWith('http') || target.startsWith('mailto') || target.startsWith('tel')) {
    return (
      <a href={target} className={className} onClick={onClick} {...props}>
        {children}
      </a>
    );
  }
  return (
    <Link to={target} className={className} onClick={onClick} {...props}>
      {children}
    </Link>
  );
}
