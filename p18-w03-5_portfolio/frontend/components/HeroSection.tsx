"use client"

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Import ScrollTrigger
import { Button } from '@/components/ui/button'; // Import shadcn/ui Button

const MotionButton = motion.create(Button); // Declare MotionButton here

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const backgroundRef = useRef(null);
  const rocketRef = useRef(null);
  const laptopRef = useRef(null);
  const checkRef = useRef(null);
  const videoRef = useRef(null);


  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger); // Register ScrollTrigger

    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      // Parallax for background
      gsap.to(backgroundRef.current, {
        x: (clientX - centerX) * 0.01,
        y: (clientY - centerY) * 0.01,
        duration: 0.8,
        ease: 'power2.out',
      });

      // Parallax for other elements with different intensities
      gsap.to(rocketRef.current, {
        x: (clientX - centerX) * 0.03,
        y: (clientY - centerY) * 0.03,
        duration: 0.8,
        ease: 'power2.out',
      });
      gsap.to(laptopRef.current, {
        x: (clientX - centerX) * 0.02,
        y: (clientY - centerY) * 0.02,
        duration: 0.8,
        ease: 'power2.out',
      });
      gsap.to(checkRef.current, {
        x: (clientX - centerX) * 0.015,
        y: (clientY - centerY) * 0.015,
        duration: 0.8,
        ease: 'power2.out',
      });
      gsap.to(videoRef.current, {
        x: (clientX - centerX) * 0.005,
        y: (clientY - centerY) * 0.005,
        duration: 0.8,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Scroll-based parallax
    const elementsToParallax = [
      { ref: backgroundRef, speed: -0.1 },
      { ref: rocketRef, speed: -0.3 },
      { ref: laptopRef, speed: -0.2 },
      { ref: checkRef, speed: -0.15 },
      { ref: videoRef, speed: -0.05 },
    ];

    const scrollTriggers: ScrollTrigger[] = [];

    elementsToParallax.forEach(({ ref, speed }) => {
      if (ref.current) {
        const trigger = ScrollTrigger.create({
          trigger: 'body', // Trigger on body scroll
          start: 'top top',
          end: 'bottom top',
          scrub: true, // Link animation to scroll position
          onUpdate: (self) => {
            gsap.to(ref.current, {
              y: self.progress * window.innerHeight * speed, // Adjust y based on scroll progress and speed
              ease: 'none',
              duration: 0.1, // Small duration for smooth updates
            });
          },
        });
        scrollTriggers.push(trigger);
      }
    });


    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      scrollTriggers.forEach(trigger => trigger.kill()); // Clean up ScrollTriggers
    };
  }, []);



  return (
    <section id="hero" className="relative h-screen flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Dynamic Background Element */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 bg-gradient-to-br from-[var(--background-gradient-start)] to-[var(--background-gradient-end)]"
      ></div>

      {/* Small Banner */}
      <motion.div
        className="absolute top-20 bg-secondary text-sm font-bold px-4 py-2 rounded-full shadow-lg z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        ✨ 지금 재미있는 프로젝트를 찾고 있어요!
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 p-4 max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Heading */}
        <motion.h1
          className="text-4xl md:text-7xl font-extrabold leading-tight text-foreground mb-4"
        >
                      <motion.span variants={containerVariants} initial="hidden" animate="visible">
                      {"안녕하세요, 저는 ".split(" ").map((word, i) => (
                        <motion.span
                          key={i}
                          variants={itemVariants}
                          className="inline-block" // Ensure words don't collapse whitespace
                        >
                          {word}&nbsp;
                        </motion.span>
                      ))}
                      <motion.span className="text-primary inline-block">
                        {"행복을 코딩하는 알렉스".split(" ").map((word, i) => (
                          <motion.span
                            key={i}
                            variants={itemVariants}
                            className="inline-block"
                          >
                            {word}&nbsp;
                          </motion.span>
                        ))}
                      </motion.span>
                      {"입니다.".split(" ").map((word, i) => (
                        <motion.span
                          key={i}
                          variants={itemVariants}
                          className="inline-block"
                        >
                          {word}&nbsp;
                        </motion.span>
                      ))}
                    </motion.span>        </motion.h1>

        {/* Subtext */}
        <motion.p
          className="text-lg md:text-xl text-muted-foreground mb-8"
          variants={itemVariants}
        >
          따뜻한 감성과 기술을 더해 당신만의 이야기를 웹사이트에 담아드립니다. 사용자에게 친근하게 다가가는 인터랙티브 경험을 만들어보세요.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-center"
          variants={itemVariants}
        >
          <MotionButton
            variant="primaryCta"
            size="lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            프로젝트 구경하기 👆
          </MotionButton>
          <MotionButton
            variant="secondaryCta"
            size="lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            미팅 요청하기 📝
          </MotionButton>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 z-20"
        animate={{ y: ["-10%", "10%", "-10%"] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg className="w-8 h-8 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </motion.div>

      {/* Visual Elements with Parallax */}
      <motion.div ref={rocketRef} className="absolute bottom-20 left-20 z-20 text-4xl">🚀</motion.div> {/* Rocket Icon */}
      <motion.div ref={laptopRef} className="absolute top-40 right-40 z-20 text-4xl">💻</motion.div> {/* Laptop Icon */}
      <motion.div ref={checkRef} className="absolute top-10 right-10 text-primary text-2xl z-20">✔️</motion.div> {/* Check Mark */}

      {/* Video Area Placeholder - Centered at bottom with rounded corners */}
      <motion.div ref={videoRef} className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-48 bg-gray-300 rounded-xl z-20"></motion.div>

    </section>
  );
};

export default HeroSection;
