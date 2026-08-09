import React, { useEffect } from 'react';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import GradientText from '@/components/ui/GradientText';
import { setPageSeoStatus } from '@/utils/seoUtils';

export default function NotFound() {
  useEffect(() => {
    setPageSeoStatus({
      status: 404,
      title: '404 Page Not Found | Kvantum Tech Solutions',
      description: 'The requested URL does not exist on Kvantum Tech Solutions.'
    });
  }, []);

  return (
    <div className="container mx-auto max-w-[1280px] px-6 py-32 text-center relative z-10 flex flex-col items-center gap-6 select-none">
      <Badge className="mb-2 bg-red-500/10 border-red-500/20 text-red-400">
        <ShieldAlert size={12} className="text-red-400" /> 404 Error
      </Badge>
      
      <h1 className="text-5xl sm:text-7xl font-headline font-black text-zinc-100 tracking-tight leading-none">
        Page <GradientText className="bg-gradient-to-r from-red-400 to-amber-400">Not Found</GradientText>
      </h1>

      <p className="text-zinc-400 max-w-md mx-auto text-base sm:text-lg leading-relaxed mt-2">
        The page you are looking for does not exist or has been moved. Check the URL and try again.
      </p>

      <Button
        onClick={() => { if (typeof window !== 'undefined') window.location.href = '/'; }}
        variant="primary"
        className="mt-6 gap-2"
      >
        <ArrowLeft size={16} /> Return to Home
      </Button>
    </div>
  );
}
