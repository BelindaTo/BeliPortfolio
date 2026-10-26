import React, { useEffect, useRef } from "react";

// Constellation starfield for any page (uses the .space-canvas styles in App.css).
// Same look as the landing page, minus the scroll/eclipse logic.
export default function SpaceBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    document.body.classList.add("space-page");

    let width = 0;
    let height = 0;
    let stars = [];
    let rafId;
    const LINK_DISTANCE = 150;

    function initStars() {
      const count = Math.round((width * height) / 14000);
      stars = [];
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: reduceMotion ? 0 : (Math.random() - 0.5) * 0.3,
          vy: reduceMotion ? 0 : (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 1.5 + 1.5,
          alpha: Math.random() * 0.3 + 0.6,
          twinkleSpeed: Math.random() * 1.5 + 0.5,
          twinklePhase: Math.random() * Math.PI * 2,
        });
      }
    }

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initStars();
    }

    function animate(now) {
      ctx.clearRect(0, 0, width, height);
      const t = now / 1000;

      stars.forEach((star) => {
        star.x += star.vx;
        star.y += star.vy;
        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;
      });

      ctx.lineWidth = 1.2;
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dist = Math.hypot(stars[i].x - stars[j].x, stars[i].y - stars[j].y);
          if (dist < LINK_DISTANCE) {
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.strokeStyle = `rgba(128, 132, 142, ${(1 - dist / LINK_DISTANCE) * 0.6})`;
            ctx.stroke();
          }
        }
      }

      stars.forEach((star) => {
        const twinkle = reduceMotion
          ? 1
          : 0.75 + 0.25 * Math.sin(t * star.twinkleSpeed + star.twinklePhase);
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(118, 122, 132, ${star.alpha * twinkle})`;
        ctx.fill();
      });

      rafId = requestAnimationFrame(animate);
    }

    resize();
    rafId = requestAnimationFrame(animate);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      document.body.classList.remove("space-page", "space-dark");
    };
  }, []);

  return <canvas ref={canvasRef} className="space-canvas" />;
}