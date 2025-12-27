"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Play, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { fadeIn, staggerContainer } from "@/constants/animations";

const partners = [
  { name: "Acella", logo: "A" },
  { name: "Vertex", logo: "V" },
  { name: "Infinite", logo: "I" },
  { name: "BoltShift", logo: "B" },
];

export function Hero() {
  const [showDemo, setShowDemo] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="container-custom relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8">
            <motion.div variants={fadeIn}>
              <Badge variant="primary" className="bg-[#E7F1FF] text-brand-blue py-1.5 px-4 text-sm font-medium border-0">
                <span className="mr-2">●</span> 새로운 v2.0 업데이트 출시
              </Badge>
            </motion.div>

            <motion.h1 
              variants={fadeIn}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1]"
            >
              데이터 관리의 <br className="hidden md:block" />
              <span className="text-brand-blue">가장 쉬운 방법</span>
            </motion.h1>

            <motion.p 
              variants={fadeIn}
              className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              복잡한 데이터 분석과 보고서 작성을 단 몇 분 만에 끝내세요. 
              DataFlow와 함께라면 비즈니스의 모든 지표를 한눈에 파악할 수 있습니다.
            </motion.p>

            <motion.div 
              variants={fadeIn}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link href="#contact" className="w-full sm:w-auto">
                <Button size="lg" className="w-full group shadow-[0_4px_14px_rgba(0,123,255,0.39)]">
                  지금 무료로 시작하기
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="bg-white" onClick={() => setShowDemo(true)}>
                <Play className="mr-2 w-4 h-4 fill-current" />
                데모 영상 보기
              </Button>
            </motion.div>

            {/* Partner Logos */}
            <motion.div variants={fadeIn} className="pt-8 space-y-4">
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                전 세계 5,000+ 기업이 신뢰하는 솔루션
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-8 opacity-50 grayscale">
                {partners.map((partner) => (
                  <div key={partner.name} className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gray-400 rounded-sm" />
                    <span className="font-bold text-xl tracking-tighter">{partner.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Visual (Mockup with Tilt) */}
          <motion.div 
            variants={fadeIn}
            className="relative perspective-1000"
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              className="relative z-10 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 overflow-hidden"
            >
              <div className="bg-gray-50 rounded-t-xl border-b border-gray-100 p-3 flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
              <div className="aspect-[4/3] bg-white p-6 space-y-6">
                <div className="flex justify-between items-center">
                  <div className="h-6 w-32 bg-gray-100 rounded" />
                  <div className="h-6 w-20 bg-blue-50 rounded" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-24 bg-gray-50 rounded-lg p-3 space-y-2">
                      <div className="h-2 w-1/2 bg-gray-200 rounded" />
                      <div className="h-4 w-3/4 bg-gray-300 rounded" />
                    </div>
                  ))}
                </div>
                <div className="h-40 bg-blue-50/50 rounded-lg border-2 border-dashed border-blue-100 flex items-center justify-center">
                  <div className="text-blue-200 font-bold text-2xl">Main Dashboard Chart</div>
                </div>
              </div>
            </motion.div>

            {/* Floating Elements with Parallax effect (simulated) */}
            <motion.div
              style={{
                translateX: useTransform(mouseXSpring, [-0.5, 0.5], [-20, 20]),
                translateY: useTransform(mouseYSpring, [-0.5, 0.5], [-20, 20]),
              }}
              animate={{ y: [0, -10, 0] }}
              transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
              className="absolute -bottom-6 -left-6 z-20 bg-white p-4 rounded-xl shadow-xl border border-gray-50 flex items-center gap-4"
            >
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">
                +15%
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">주간 수익률</p>
                <p className="text-sm font-bold text-gray-900">최대 실적 달성</p>
              </div>
            </motion.div>

            <motion.div
              style={{
                translateX: useTransform(mouseXSpring, [-0.5, 0.5], [20, -20]),
                translateY: useTransform(mouseYSpring, [-0.5, 0.5], [20, -20]),
              }}
              animate={{ y: [0, 10, 0] }}
              transition={{ y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 } }}
              className="absolute -top-6 -right-6 z-20 bg-white p-4 rounded-xl shadow-xl border border-gray-50 flex items-center gap-4"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                New
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">알림</p>
                <p className="text-sm font-bold text-gray-900">새로운 가입자 12명</p>
              </div>
            </motion.div>

            {/* Background Blur Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-100/30 blur-3xl rounded-full -z-10" />
          </motion.div>
        </motion.div>
      </div>

      {/* Demo Video Modal */}
      <AnimatePresence>
        {showDemo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-2xl"
            >
              <button 
                onClick={() => setShowDemo(false)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/80 transition-colors"
              >
                <X size={24} />
              </button>
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center space-y-4">
                   <div className="w-20 h-20 bg-brand-blue rounded-full flex items-center justify-center mx-auto animate-pulse">
                      <Play className="text-white fill-current ml-1" size={32} />
                   </div>
                   <p className="text-white font-bold text-xl">DataFlow 데모 영상 재생 중...</p>
                   <p className="text-gray-400">실제 제품의 작동 방식을 확인해보세요.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}