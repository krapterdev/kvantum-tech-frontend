import React, { useRef, useEffect } from 'react';

export default function InteractiveCanvas({ theme, isStatic = false, width = 350, height = 350, className }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let stars = [];
    let satellites = [];
    let earthRotation = 0;

    const globalHubs = [
      { name: 'Delhi', lat: 28.6, lon: 77.2 },
      { name: 'London', lat: 51.5, lon: -0.1 },
      { name: 'New York', lat: 40.7, lon: -74.0 },
      { name: 'Tokyo', lat: 35.6, lon: 139.6 },
      { name: 'Sydney', lat: -33.8, lon: 151.2 },
      { name: 'Paris', lat: 48.8, lon: 2.3 },
      { name: 'San Francisco', lat: 37.7, lon: -122.4 },
      { name: 'Singapore', lat: 1.3, lon: 103.8 },
      { name: 'Dubai', lat: 25.2, lon: 55.3 },
      { name: 'Cape Town', lat: -33.9, lon: 18.4 },
      { name: 'Rio de Janeiro', lat: -22.9, lon: -43.1 },
      { name: 'Moscow', lat: 55.7, lon: 37.6 }
    ];

    const handleResize = () => {
      if (isStatic) {
        canvas.width = width;
        canvas.height = height;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initStars();
      }
    };

    const initStars = () => {
      if (isStatic) return;
      stars = [];
      const numberOfStars = Math.floor((canvas.width * canvas.height) / 5000);
      for (let i = 0; i < numberOfStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.2,
          alpha: Math.random(),
          speed: Math.random() * 0.02 + 0.005
        });
      }
    };

    const initSatellites = () => {
      satellites = [];
      for (let i = 0; i < 60; i++) {
        satellites.push({
          lat: (Math.random() - 0.5) * 160,
          lon: Math.random() * 360,
          size: Math.random() * 1.5 + 0.5,
          pulse: Math.random() * Math.PI
        });
      }
    };

    const projectSpherical = (R, lat, lon, rotation, centerX, centerY) => {
      const rad = Math.PI / 180;
      const theta = (lon + rotation) * rad;
      const phi = lat * rad;

      const x3d = R * Math.cos(phi) * Math.sin(theta);
      const y3d = R * Math.sin(phi);
      const z3d = R * Math.cos(phi) * Math.cos(theta);

      return {
        x: centerX + x3d,
        y: centerY - y3d,
        visible: z3d > -R * 0.1
      };
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Draw Twinkling Space Stars Background (Only for full-screen mode)
      if (!isStatic) {
        stars.forEach(star => {
          star.alpha += star.speed;
          if (star.alpha > 1 || star.alpha < 0) {
            star.speed *= -1;
          }
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(star.alpha)})`;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      // 2. Setup Globe Dimensions
      const R = isStatic ? canvas.width * 0.40 : Math.min(canvas.width, canvas.height) * (canvas.width < 968 ? 0.35 : 0.30);
      const centerX = isStatic ? canvas.width / 2 : (canvas.width < 968 ? canvas.width / 2 : canvas.width * 0.70);
      const centerY = isStatic ? canvas.height / 2 : (canvas.width < 968 ? canvas.height * 0.45 : canvas.height / 2);

      earthRotation += 0.08;

      const themeColor = theme === 'light' ? '124, 92, 246' : '0, 210, 255';
      const secondaryColor = theme === 'light' ? '139, 92, 246' : '138, 43, 226';

      // 3. Atmosphere Glow
      const haloGradient = ctx.createRadialGradient(
        centerX, centerY, R * 0.85,
        centerX, centerY, R * 1.15
      );
      haloGradient.addColorStop(0, `rgba(${themeColor}, 0)`);
      haloGradient.addColorStop(0.5, `rgba(${themeColor}, 0.08)`);
      haloGradient.addColorStop(0.8, `rgba(${themeColor}, 0.03)`);
      haloGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = haloGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, R * 1.15, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = theme === 'light' ? 'rgba(255, 255, 255, 0.02)' : 'rgba(5, 11, 20, 0.6)';
      ctx.beginPath();
      ctx.arc(centerX, centerY, R, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = `rgba(${themeColor}, 0.25)`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(centerX, centerY, R, 0, Math.PI * 2);
      ctx.stroke();

      ctx.lineWidth = 0.5;
      ctx.strokeStyle = `rgba(${themeColor}, 0.06)`;
      
      const latSteps = [-60, -45, -30, -15, 0, 15, 30, 45, 60];
      latSteps.forEach(lat => {
        ctx.beginPath();
        let drawing = false;
        for (let lon = 0; lon <= 360; lon += 5) {
          const pt = projectSpherical(R, lat, lon, earthRotation, centerX, centerY);
          if (pt.visible) {
            if (!drawing) {
              ctx.moveTo(pt.x, pt.y);
              drawing = true;
            } else {
              ctx.lineTo(pt.x, pt.y);
            }
          } else {
            drawing = false;
          }
        }
        ctx.stroke();
      });

      const lonSteps = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
      lonSteps.forEach(lon => {
        ctx.beginPath();
        let drawing = false;
        for (let lat = -80; lat <= 80; lat += 5) {
          const pt = projectSpherical(R, lat, lon, earthRotation, centerX, centerY);
          if (pt.visible) {
            if (!drawing) {
              ctx.moveTo(pt.x, pt.y);
              drawing = true;
            } else {
              ctx.lineTo(pt.x, pt.y);
            }
          } else {
            drawing = false;
          }
        }
        ctx.stroke();
      });

      satellites.forEach(node => {
        node.pulse += 0.015;
        const pt = projectSpherical(R, node.lat, node.lon, earthRotation, centerX, centerY);
        if (pt.visible) {
          const scaleSize = node.size * (1 + Math.sin(node.pulse) * 0.25);
          const nodeAlpha = 0.35 + Math.sin(node.pulse) * 0.15;
          
          ctx.fillStyle = `rgba(${themeColor}, ${nodeAlpha})`;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, scaleSize, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      const projectedHubs = globalHubs.map(hub => {
        const pt = projectSpherical(R, hub.lat, hub.lon, earthRotation, centerX, centerY);
        return { ...hub, ...pt };
      });

      projectedHubs.forEach(hub => {
        if (hub.visible) {
          ctx.fillStyle = `rgba(${secondaryColor}, 0.8)`;
          ctx.beginPath();
          ctx.arc(hub.x, hub.y, 3, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = `rgba(${secondaryColor}, 0.4)`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(hub.x, hub.y, 6 + Math.sin(earthRotation * 0.1) * 2, 0, Math.PI * 2);
          ctx.stroke();

          // Hide text labels if globe is small/static to prevent overlap clutter
          if (!isStatic) {
            ctx.fillStyle = `rgba(255, 255, 255, 0.45)`;
            ctx.font = '9px monospace';
            ctx.fillText(hub.name.toUpperCase(), hub.x + 8, hub.y + 3);
          }
        }
      });

      ctx.lineWidth = 0.5;
      for (let i = 0; i < projectedHubs.length; i++) {
        for (let j = i + 1; j < projectedHubs.length; j++) {
          const h1 = projectedHubs[i];
          const h2 = projectedHubs[j];

          if (h1.visible && h2.visible) {
            const dx = h1.x - h2.x;
            const dy = h1.y - h2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < R * 1.1) {
              const alpha = (1 - dist / (R * 1.1)) * 0.18;
              ctx.strokeStyle = `rgba(${themeColor}, ${alpha})`;
              
              ctx.beginPath();
              ctx.moveTo(h1.x, h1.y);
              const cx = (h1.x + h2.x) / 2 + (h2.y - h1.y) * 0.15;
              const cy = (h1.y + h2.y) / 2 + (h1.x - h2.x) * 0.15;
              ctx.quadraticCurveTo(cx, cy, h2.x, h2.y);
              ctx.stroke();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    if (isStatic) {
      handleResize();
      initSatellites();
      animate();
    } else {
      window.addEventListener('resize', handleResize);
      handleResize();
      initSatellites();
      animate();
    }

    return () => {
      if (!isStatic) {
        window.removeEventListener('resize', handleResize);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, isStatic, width, height]);

  return (
    <canvas
      ref={canvasRef}
      className={className || "fixed inset-0 z-0 pointer-events-none block"}
    />
  );
}
