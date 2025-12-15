"use client";

import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import React, { useRef, useState } from "react";

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.2 } },
  };

  const parallaxX = useTransform(scrollYProgress, [0, 1], [-100, 100]); // Example parallax

  return (
    <section id="hero" ref={ref} className="py-[100px] lg:py-[120px] bg-white overflow-hidden">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-10 gap-8 items-center">
        {/* Text Content (4/10 width on desktop, full width on mobile) */}
        <motion.div
          className="md:col-span-4 text-center md:text-left"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={textVariants}
        >
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-gray-800">
            코딩 몰라도 괜찮아요, <span className="text-vibe-blue">3시간</span>이면 당신의 아이디어가 앱이 됩니다
          </h1>
          <h2 className="mt-4 text-xl lg:text-2xl font-medium text-gray-600">
            바이브코딩으로 오늘 당장 MVP 만들기
          </h2>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            <Button className="bg-vibe-blue hover:bg-vibe-blue/90 text-white font-bold py-2 px-6 rounded-full text-lg">
              무료 커뮤니티 가입하기
            </Button>
            <a href="#" className="text-vibe-blue hover:text-vibe-blue/80 font-medium text-lg underline-offset-4 hover:underline">
              워크숍 둘러보기
            </a>
          </div>
        </motion.div>

        {/* Visual Mockup Placeholder (6/10 width on desktop, full width on mobile) */}
        <motion.div
          className="md:col-span-6 bg-gray-200 h-[300px] flex items-center justify-center rounded-lg relative overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={imageVariants}
        >
          {/* Parallax Gradient Effect (Placeholder) */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-vibe-blue/30 to-energy-orange/30"
            style={{ x: parallaxX }} // Apply parallax based on scroll
          />
          <p className="text-gray-500 text-lg relative z-10">Visual Mockup Placeholder</p>
        </motion.div>
      </div>
    </section>
  );
}
