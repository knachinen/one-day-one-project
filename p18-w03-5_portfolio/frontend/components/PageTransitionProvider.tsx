"use client";

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import React from 'react';
import { useUIStore } from '@/store/uiStore'; // Import useUIStore

const PageTransitionProvider = ({ children }: { children: React.ReactNode }) => {

  const pathname = usePathname();
  const { isModalOpen, modalContent, closeModal } = useUIStore(); // Get isModalOpen and modalContent from store

  const variants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname} // Use pathname as the key to trigger re-animation on route change
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        className={isModalOpen ? 'blur-sm pointer-events-none' : ''} // Apply blur and disable events
      >
        {children}
      </motion.div>
      {/* Render the modal content outside the blurred area */}
      {isModalOpen && modalContent && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center">
          {modalContent}
        </div>
      )}
    </AnimatePresence>
  );
};

export default PageTransitionProvider;
