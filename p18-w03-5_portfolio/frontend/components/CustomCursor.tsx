"use client";

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHoveringLink, setIsHoveringLink] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };
    const speed = 0.2; // Adjust for smoother or snappier movement

    const updatePosition = () => {
      pos.x += (mouse.x - pos.x) * speed;
      pos.y += (mouse.y - pos.y) * speed;
      gsap.to(cursor, { x: pos.x, y: pos.y, duration: 0.1, ease: "none" }); // Shorter duration for smoother updates
    };

    const loop = () => {
      updatePosition();
      requestAnimationFrame(loop);
    };

    loop();

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Hover detection for interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('[data-interactive="true"]')) {
        setIsHoveringLink(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('[data-interactive="true"]')) {
        setIsHoveringLink(false);
      }
    };

    document.documentElement.addEventListener('mouseover', handleMouseOver);
    document.documentElement.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`fixed z-[9999] pointer-events-none rounded-full transition-all duration-300 ease-out
        ${isHoveringLink ? 'w-10 h-10 bg-accent-gradient opacity-70 scale-125' : 'w-4 h-4 bg-accent-gradient opacity-50'}`}
    ></div>
  );
};

export default CustomCursor;
