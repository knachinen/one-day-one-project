"use client"; // Convert to client component

import React, { useEffect } from 'react'; // Import useEffect
import Link from 'next/link'; // Import Link
import { Button } from '@/components/ui/button'; // Import Button
import gsap from 'gsap'; // Import gsap
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Import ScrollTrigger

const Header = () => {
  // Define active section state or context here if needed for active link styling
  const currentPath = typeof window !== 'undefined' ? window.location.hash : '';

  const navLinks = [
    { name: '홈', href: '#hero' },
    { name: '작업물', href: '#portfolio' },
    { name: '소개', href: '#about' },
    { name: '문의', href: '#contact' },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to('#scroll-progress', {
      width: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill()); // Clean up ScrollTriggers
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-sm shadow-sm transition-all duration-300">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* ... header content ... */}
      </div>
      {/* Scroll Progress Bar */}
      <div className="h-1 bg-accent-gradient w-0 fixed bottom-0 left-0 z-50" id="scroll-progress"></div>
    </header>
  );
};

export default Header;
