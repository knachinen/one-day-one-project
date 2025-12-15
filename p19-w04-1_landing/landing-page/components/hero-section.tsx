"use client";

import { Play } from "lucide-react";
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

  const h2Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.5 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.2 } },
  };

  const parallaxX = useTransform(scrollYProgress, [0, 1], [-100, 100]); // Example parallax

  return (
    <section id="hero" ref={ref} className="py-[100px] lg:py-[120px] bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-10 gap-8 items-center">
        {/* Text Content (4/10 width on desktop, full width on mobile) */}
        <motion.div
          className="md:col-span-6 text-center md:text-left"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={textVariants}
        >
          <div className="inline-flex items-center px-3 py-1 mb-4 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            5,000 이상의 수강생이 앱을 런칭했습니다
          </div>
          <h1 className="text-[32px] md:text-[48px] font-bold leading-[1.2] text-[#2D3748]">
            코딩 몰라도 괜찮아요, 3시간이면 당신의 아이디어가 앱이 됩니다
          </h1>
          <motion.h2
            className="mt-4 text-[16px] md:text-[20px] text-[#4A5568]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={h2Variants}
          >
            복잡한 코드 없이 클릭 몇 번으로 현실이 되는 상상. 바이브코딩으로 오늘 당장 MVP 만들기를 시작하세요.
          </motion.h2>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            <Button className="bg-vibe-blue hover:bg-vibe-blue/90 text-white font-bold h-[56px] px-8 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto">
              무료 커뮤니티 가입하기
            </Button>
            <Button variant="outline" className="h-[56px] px-6 text-lg group relative overflow-hidden w-full sm:w-auto">
              <span className="relative z-10 flex items-center">
                <Play className="mr-2 h-5 w-5 transition-all duration-300 group-hover:text-vibe-blue group-hover:scale-110 group-hover:animate-pulse" />
                워크숍 둘러보기
              </span>
              <span className="absolute inset-0 bg-vibe-blue transition-all duration-300 transform -translate-x-full group-hover:translate-x-0 opacity-10"></span>
            </Button>
          </div>
          <div className="mt-6 flex items-center justify-center md:justify-start">
            <div className="flex -space-x-2 overflow-hidden">
              <img
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="User avatar"
              />
              <img
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="User avatar"
              />
              <img
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="User avatar"
              />
            </div>
            <p className="ml-3 text-sm font-medium text-gray-700">
              이미 <span className="font-bold text-vibe-blue">5,234명</span>이 참여 중입니다
            </p>
          </div>
        </motion.div>

        {/* Visual Mockup (4/10 width on desktop, full width on mobile) */}
        <motion.div
          className="md:col-span-4 h-[300px] md:h-[450px] relative flex items-center justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={imageVariants}
        >
          {/* Laptop Mockup */}
          <div className="relative w-full max-w-md h-full bg-gray-800 rounded-xl shadow-2xl flex items-center justify-center p-4">
            {/* Screen */}
            <div className="relative w-full h-full bg-gray-900 rounded-lg overflow-hidden flex flex-col justify-between p-3">
              {/* Code Block Hint */}
              <div className="h-1/2 bg-gray-700 rounded-md p-2 text-gray-400 text-xs font-mono">
                <p>&gt; Deploying MVP...</p>
                <p>&gt; Compiling components...</p>
                <p>&gt; Build successful: 75%</p>
              </div>
              {/* App UI Hint */}
              <div className="h-1/3 bg-blue-600 rounded-md flex items-center justify-center text-white text-sm font-bold">
                My Awesome App
              </div>
            </div>
            {/* Keyboard/Base */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-3 bg-gray-700 rounded-b-xl"></div>
          </div>

          {/* Parallax Gradient Effect (Placeholder) */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 -z-10"
            style={{ x: parallaxX }} // Apply parallax based on scroll
          />
        </motion.div>
      </div>
    </section>
  );
}
