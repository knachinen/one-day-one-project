// frontend/components/MobileNav.tsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useUIStore } from '@/store/uiStore';
import Link from 'next/link';

const MobileNav = () => {
  const { activeSection } = useUIStore();

  // Map active section IDs to display names
  const sectionDisplayNames: { [key: string]: string } = {
    hero: '홈',
    about: '소개',
    portfolio: '작업물',
    services: '서비스',
    testimonials: '후기',
    contact: '문의',
  };

  const currentSectionName = sectionDisplayNames[activeSection] || '홈'; // Default to '홈'

  return (
    <motion.div
      className="fixed top-0 left-0 w-full md:hidden bg-white/80 backdrop-blur-sm shadow-sm z-40 flex items-center justify-between px-4 py-2"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <Link href="#hero" className="flex items-center gap-2">
        {/* Small Profile Image/Logo */}
        <Image
          src="https://placehold.co/30x30?text=Logo" // Placeholder for logo/profile image
          alt="Profile Logo"
          width={30}
          height={30}
          className="rounded-full"
        />
        <span className="text-lg font-bold text-foreground">My Portfolio</span>
      </Link>
      
      {/* Current Section Name */}
      <span className="text-lg font-medium text-muted-foreground">
        {currentSectionName}
      </span>
    </motion.div>
  );
};

export default MobileNav;
