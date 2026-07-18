import React, { useRef, useEffect, useState } from 'react';

export default function ScrollVideoPlayer() {
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const totalFrames = 300;

  // Preload all 300 frames on component mount
  useEffect(() => {
    let loadedCount = 0;
    const preloadedImages = [];

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      
      const paddedIndex = String(i).padStart(3, '0');
      img.src = `https://bwdtxlosvptlqtixgcip.supabase.co/storage/v1/object/public/kvantumtechsolutions_storage/scroller-images/ezgif-frame-${paddedIndex}.jpg`;
      
      const handleLoadOrError = () => {
        loadedCount++;
        if (loadedCount === totalFrames) {
          setLoading(false);
        }
      };

      img.onload = handleLoadOrError;
      img.onerror = handleLoadOrError; // Prevent getting stuck on loading if a network call fails
      preloadedImages.push(img);
    }
    setImages(preloadedImages);
  }, []);

  // Handle canvas drawing on scroll and resize
  useEffect(() => {
    if (loading || images.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame();
    };

    const drawFrame = () => {
      // Calculate current scroll position fraction
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      let scrollFraction = 0;
      if (scrollHeight > 0) {
        scrollFraction = scrollTop / scrollHeight;
      }

      // Map scroll fraction to frame index
      const frameIndex = Math.min(totalFrames - 1, Math.max(0, Math.floor(scrollFraction * totalFrames)));
      const img = images[frameIndex];

      if (!img || !img.complete) return;

      // Clear previous frames
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Perform Aspect-Ratio fitting ("object-cover" simulation)
      const imgRatio = img.width / img.height;
      const canvasRatio = canvas.width / canvas.height;

      let drawWidth, drawHeight, drawX, drawY;

      if (canvasRatio > imgRatio) {
        drawWidth = canvas.width;
        drawHeight = canvas.width / imgRatio;
        drawX = 0;
        drawY = (canvas.height - drawHeight) / 2;
      } else {
        drawWidth = canvas.height * imgRatio;
        drawHeight = canvas.height;
        drawX = (canvas.width - drawWidth) / 2;
        drawY = 0;
      }

      ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', drawFrame);

    // Run initial compilation
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', drawFrame);
    };
  }, [loading, images]);

  return (
    <>
      {/* Scroll Video Canvas Player */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full -z-20 pointer-events-none block"
      />
      
      {/* Soft Vignette Overlay to ensure text readability */}
      <div 
        className="fixed inset-0 -z-10 pointer-events-none bg-radial-gradient"
        style={{
          background: 'radial-gradient(circle, rgba(9,9,11,0.5) 0%, rgba(9,9,11,0.9) 100%)',
        }}
      />
    </>
  );
}
