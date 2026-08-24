'use client';

import React, { useEffect, useRef, useState } from 'react';

// True geographic landmass outlines for photorealistic 3D Earth rendering
const CONTINENT_PATHS = [
  // North America
  [[-168,65],[-160,70],[-140,70],[-125,50],[-124,38],[-117,32],[-105,20],[-97,18],[-80,8],[-77,8],[-80,25],[-81,30],[-75,35],[-70,42],[-64,45],[-60,50],[-65,60],[-85,68],[-100,70],[-130,72],[-168,65]],
  // South America
  [[-77,8],[-75,11],[-62,10],[-50,-1],[-35,-5],[-38,-13],[-43,-22],[-50,-30],[-58,-38],[-65,-55],[-74,-52],[-72,-40],[-70,-20],[-80,-4],[-77,8]],
  // Europe & Asia (Eurasia)
  [[-9,38],[-9,43],[0,45],[5,53],[5,62],[15,68],[30,70],[60,70],[100,75],[140,72],[170,65],[160,55],[140,50],[130,42],[122,30],[108,20],[100,14],[92,21],[80,13],[75,8],[72,20],[68,25],[60,25],[50,30],[40,36],[30,36],[20,40],[10,38],[-5,36],[-9,38]],
  // Indian Peninsula Highlight
  [[68,24],[72,21],[76,15],[77,8],[80,13],[85,19],[88,22],[80,28],[74,32],[68,24]],
  // Africa
  [[-17,14],[-17,21],[-5,36],[10,37],[25,32],[32,31],[34,27],[43,12],[51,11],[45,-12],[35,-25],[28,-34],[18,-34],[12,-18],[9,4],[-5,5],[-17,14]],
  // Australia
  [[114,-22],[118,-35],[135,-35],[145,-38],[150,-35],[153,-28],[148,-19],[142,-11],[130,-14],[122,-18],[114,-22]],
  // Japan
  [[130,32],[135,35],[140,40],[142,43],[138,37],[130,32]],
  // United Kingdom & Ireland
  [[-5,50],[0,52],[0,58],[-5,58],[-5,50]],
  // Scandinavia
  [[5,58],[15,58],[25,65],[20,70],[10,65],[5,58]]
];

const GLOBAL_HUBS = [
  { name: 'Delhi HQ (India)', lat: 28.6, lon: 77.2, color: '#38bdf8', isHQ: true },
  { name: 'Dubai', lat: 25.2, lon: 55.2, color: '#ec4899' },
  { name: 'London', lat: 51.5, lon: -0.1, color: '#a855f7' },
  { name: 'New York', lat: 40.7, lon: -74.0, color: '#38bdf8' },
  { name: 'Singapore', lat: 1.3, lon: 103.8, color: '#4ade80' },
  { name: 'Tokyo', lat: 35.6, lon: 139.6, color: '#fbbf24' },
  { name: 'Sydney', lat: -33.8, lon: 151.2, color: '#38bdf8' },
];

export default function EarthGlobe() {
  const canvasRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, { rootMargin: '100px' });

    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let isDragging = false;
    let previousMouseX = 0;
    let rotationY = 1.3; // Initial angle showing India / Asia
    let time = 0;

    const updateDimensions = () => {
      const containerWidth = canvas.parentElement?.clientWidth || 550;
      const displayWidth = Math.min(containerWidth, 580);
      const isSmall = window.innerWidth < 640;
      const displayHeight = isSmall ? 320 : 420;

      canvas.width = displayWidth;
      canvas.height = displayHeight;
      return { width: displayWidth, height: displayHeight };
    };

    updateDimensions();

    const onMouseDown = (e) => {
      isDragging = true;
      previousMouseX = e.clientX;
    };
    const onMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMouseX;
      rotationY += deltaX * 0.007;
      previousMouseX = e.clientX;
    };
    const onMouseUp = () => { isDragging = false; };

    const onTouchStart = (e) => {
      if (e.touches && e.touches[0]) {
        isDragging = true;
        previousMouseX = e.touches[0].clientX;
      }
    };
    const onTouchMove = (e) => {
      if (!isDragging || !e.touches || !e.touches[0]) return;
      const deltaX = e.touches[0].clientX - previousMouseX;
      rotationY += deltaX * 0.007;
      previousMouseX = e.touches[0].clientX;
    };
    const onTouchEnd = () => { isDragging = false; };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Project [lon, lat] in degrees to 3D sphere screen coordinate
    const project = (lonDeg, latDeg, rad, cX, cY, rot) => {
      const lat = (latDeg * Math.PI) / 180;
      const lon = ((lonDeg + rot * (180 / Math.PI)) * Math.PI) / 180;

      const x3d = rad * Math.cos(lat) * Math.sin(lon);
      const y3d = rad * Math.sin(lat);
      const z3d = rad * Math.cos(lat) * Math.cos(lon);

      return {
        x: cX + x3d,
        y: cY - y3d,
        z: z3d,
        visible: z3d > -rad * 0.1
      };
    };

    const render = () => {
      try {
        const radius = Math.min(canvas.width, canvas.height) * 0.38;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (!isDragging) {
          rotationY += 0.004; // Smooth continuous planetary rotation
        }
        time += 0.03;

        // 1. Atmosphere Rayleigh Scattering Outer Glow
        const atmosGlow = ctx.createRadialGradient(
          centerX, centerY, radius * 0.95,
          centerX, centerY, radius * 1.35
        );
        atmosGlow.addColorStop(0, 'rgba(56, 189, 248, 0.45)');
        atmosGlow.addColorStop(0.4, 'rgba(14, 165, 233, 0.2)');
        atmosGlow.addColorStop(0.8, 'rgba(3, 105, 161, 0.05)');
        atmosGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = atmosGlow;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius * 1.35, 0, Math.PI * 2);
        ctx.fill();

        // 2. Realistic 3D Ocean Sphere (Deep Vibrant Blue Marble)
        const oceanGrad = ctx.createRadialGradient(
          centerX - radius * 0.35, centerY - radius * 0.35, radius * 0.05,
          centerX, centerY, radius
        );
        oceanGrad.addColorStop(0, '#0284c7');   // Sunlit Ocean Turquoise
        oceanGrad.addColorStop(0.35, '#0369a1'); // Deep Sea Blue
        oceanGrad.addColorStop(0.7, '#075985');  // NASA Navy
        oceanGrad.addColorStop(0.95, '#0c4a6e'); // Horizon Rim
        oceanGrad.addColorStop(1, '#082f49');

        ctx.fillStyle = oceanGrad;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.fill();

        // Clip everything inside the Earth Sphere
        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius - 0.5, 0, Math.PI * 2);
        ctx.clip();

        // 3. Render Photorealistic Continents & Landmass Polygons
        CONTINENT_PATHS.forEach((path) => {
          ctx.beginPath();
          let started = false;

          for (let i = 0; i < path.length; i++) {
            const [lon, lat] = path[i];
            const pt = project(lon, lat, radius, centerX, centerY, rotationY);

            if (pt.z > 0) {
              if (!started) {
                ctx.moveTo(pt.x, pt.y);
                started = true;
              } else {
                ctx.lineTo(pt.x, pt.y);
              }
            }
          }

          if (started) {
            ctx.closePath();
            // Vibrant Earth Landmass Color
            ctx.fillStyle = 'rgba(34, 197, 94, 0.85)'; // Emerald / Forest Green
            ctx.fill();
            ctx.strokeStyle = 'rgba(74, 222, 128, 0.9)'; // Coastline highlight
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        });

        // 4. Subtle Dynamic Atmospheric Cloud Belts
        ctx.beginPath();
        const cloudOffset = time * 0.2;
        for (let a = 0; a < Math.PI * 2; a += 0.2) {
          const cx = centerX + (radius * 0.85) * Math.cos(a + cloudOffset);
          const cy = centerY + (radius * 0.25) * Math.sin(a * 2);
          ctx.arc(cx, cy, radius * 0.12, 0, Math.PI * 2);
        }
        ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.fill();

        // 5. Specular Sunlight Shading Reflection
        const sunHighlight = ctx.createRadialGradient(
          centerX - radius * 0.4, centerY - radius * 0.4, 0,
          centerX - radius * 0.4, centerY - radius * 0.4, radius * 0.95
        );
        sunHighlight.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
        sunHighlight.addColorStop(0.5, 'rgba(255, 255, 255, 0.1)');
        sunHighlight.addColorStop(1, 'rgba(0, 0, 0, 0.35)');
        ctx.fillStyle = sunHighlight;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore(); // Restore clip

        // 6. Global Hubs & Orbital Flight Arcs (Projected over Earth)
        const projectedHubs = [];
        GLOBAL_HUBS.forEach((hub) => {
          const pt = project(hub.lon, hub.lat, radius, centerX, centerY, rotationY);
          if (pt.z > 0) {
            projectedHubs.push({ ...hub, screenX: pt.x, screenY: pt.y, z3d: pt.z });
          }
        });

        // Glowing Arcs Between Delivery Hubs
        for (let i = 0; i < projectedHubs.length; i++) {
          for (let j = i + 1; j < projectedHubs.length; j++) {
            const h1 = projectedHubs[i];
            const h2 = projectedHubs[j];
            const dx = h1.screenX - h2.screenX;
            const dy = h1.screenY - h2.screenY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < radius * 1.4) {
              ctx.beginPath();
              ctx.moveTo(h1.screenX, h1.screenY);
              const midX = (h1.screenX + h2.screenX) / 2;
              const midY = (h1.screenY + h2.screenY) / 2 - 25;
              ctx.quadraticCurveTo(midX, midY, h2.screenX, h2.screenY);
              ctx.strokeStyle = `rgba(56, 189, 248, ${0.55 * (1 - dist / (radius * 1.4))})`;
              ctx.lineWidth = 1.5;
              ctx.stroke();
            }
          }
        }

        // Hub Markers & Pulsing Radar Rings
        projectedHubs.forEach((h) => {
          // Solid Center Node
          ctx.beginPath();
          ctx.arc(h.screenX, h.screenY, h.isHQ ? 5.5 : 4, 0, Math.PI * 2);
          ctx.fillStyle = h.color;
          ctx.fill();
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Pulsing Ring
          ctx.beginPath();
          ctx.arc(h.screenX, h.screenY, (h.isHQ ? 8 : 6) + Math.sin(time * 3.5) * 3.5, 0, Math.PI * 2);
          ctx.strokeStyle = h.color;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // HQ Label
          if (h.isHQ) {
            ctx.font = 'bold 11px system-ui, sans-serif';
            ctx.fillStyle = '#38bdf8';
            ctx.textAlign = 'center';
            ctx.fillText('📍 Delhi HQ', h.screenX, h.screenY - 12);
          }
        });

        // 7. Outer Atmospheric Rim Ring
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.7)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();

        animationFrameId = requestAnimationFrame(render);
      } catch (err) {
        console.warn('[EarthGlobe] render error:', err);
      }
    };

    render();

    const handleResize = () => {
      updateDimensions();
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', handleResize);
    };
  }, [isVisible]);

  return (
    <div className="w-full flex flex-col items-center justify-center relative py-4 select-none overflow-hidden">
      <canvas 
        ref={canvasRef} 
        className="max-w-full cursor-grab active:cursor-grabbing touch-none" 
      />
      <div className="text-[11px] font-mono tracking-[0.2em] uppercase text-sky-600 dark:text-cyan-400 font-bold mt-2 flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
        <span>3D Real Earth Planet • Global Tech Delivery (Drag to Rotate)</span>
      </div>
    </div>
  );
}


