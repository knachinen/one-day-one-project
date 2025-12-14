"use client";

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react'; // Import useEffect
import gsap from 'gsap'; // Import gsap
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Import ScrollTrigger
import { useUIStore } from '@/store/uiStore'; // Import useUIStore
import { sectionThemes } from '@/constants/themeConfig'; // Import sectionThemes

const PageTransitionProvider = ({ children }: { children: React.ReactNode }) => {

  const pathname = usePathname();
  const { isModalOpen, modalContent, closeModal, setActiveSection } = useUIStore(); // Get isModalOpen, modalContent, closeModal, and setActiveSection from store

  // Register GSAP plugins
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initial theme set to the first section's theme
    if (sectionThemes.length > 0) {
      gsap.to(':root', {
        '--background': sectionThemes[0].colors.background,
        '--foreground': sectionThemes[0].colors.foreground,
        // Add other CSS variables if needed
        duration: 0.5,
      });
    }

    sectionThemes.forEach((themeConfig) => {
      ScrollTrigger.create({
        trigger: `#${themeConfig.id}`,
        start: 'top center', // When the top of the section hits the center of the viewport
        end: 'bottom center', // When the bottom of the section leaves the center of the viewport
        onEnter: () => {
          gsap.to(':root', {
            '--background': themeConfig.colors.background,
            '--foreground': themeConfig.colors.foreground,
            // Add other CSS variables if needed
            duration: 0.8,
            ease: 'power1.inOut',
          });
          setActiveSection(themeConfig.id); // Set active section in store
        },
        onLeaveBack: () => {
          // Animate back to the previous section's theme, or a default
          const prevTheme = sectionThemes[sectionThemes.indexOf(themeConfig) - 1];
          if (prevTheme) {
            gsap.to(':root', {
              '--background': prevTheme.colors.background,
              '--foreground': prevTheme.colors.foreground,
              duration: 0.8,
              ease: 'power1.inOut',
            });
          }
          setActiveSection(prevTheme ? prevTheme.id : sectionThemes[0].id); // Set active section in store
        },
        // Optional: onEnterBack, onLeave to fine-tune transitions
        // markers: true, // For debugging scroll triggers
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill()); // Clean up ScrollTriggers
    };
  }, []); // Empty dependency array means this runs once on mount


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
