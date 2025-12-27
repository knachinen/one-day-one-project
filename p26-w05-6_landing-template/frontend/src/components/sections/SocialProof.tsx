"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ShieldCheck, Headphones, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import { fadeIn, staggerContainer } from "@/constants/animations";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    content: "DataFlow 도입 후 팀의 분석 속도가 3배 이상 빨라졌습니다. 특히 실시간 대시보드 기능은 의사결정에 결정적인 역할을 합니다.",
    author: "김철수",
    role: "A사 마케팅 팀장",
    rating: 5,
    highlight: "분석 속도가 3배 이상",
  },
  {
    content: "복잡한 툴들을 많이 써봤지만, DataFlow만큼 직관적인 서비스는 처음입니다. 별도의 교육 없이도 전 직원이 금방 적응했습니다.",
    author: "이영희",
    role: "B사 프로덕트 매니저",
    rating: 5,
    highlight: "별도의 교육 없이도",
  },
  {
    content: "커스터마이징이 매우 자유로워 우리 비즈니스에 딱 맞는 리포트를 만들 수 있었습니다. 고객 지원팀의 대응도 매우 빠르고 친절합니다.",
    author: "박지성",
    role: "C사 운영 총괄",
    rating: 5,
    highlight: "우리 비즈니스에 딱 맞는",
  },
  {
    content: "기존 인프라와의 연동이 매우 매끄럽습니다. 도입 첫 달 만에 운영 비용을 20% 절감하는 효과를 거두었습니다.",
    author: "최유리",
    role: "D사 CTO",
    rating: 5,
    highlight: "운영 비용을 20% 절감",
  },
];

const partners = [
  "Google", "IBM", "Microsoft", "Netflix", "Amazon", "Airbnb"
];

const trustBadges = [
  { icon: Zap, label: "99.9% 가동률" },
  { icon: ShieldCheck, label: "ISO 27001 인증" },
  { icon: Headphones, label: "24/7 고객 지원" },
];

export function SocialProof() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto slide
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <section id="testimonials" className="py-24 bg-gray-50 overflow-hidden">
      <div className="container-custom">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-20"
        >
          {/* Logo Cloud */}
          <div className="space-y-10 text-center">
            <motion.p variants={fadeIn} className="text-sm font-bold text-gray-400 uppercase tracking-widest">
              이미 4,000개 이상의 혁신적인 기업이 선택했습니다
            </motion.p>
            <motion.div 
              variants={fadeIn}
              className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8"
            >
              {partners.map((partner) => (
                <div 
                  key={partner} 
                  className="group flex items-center gap-2 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer"
                >
                  <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                    {partner[0]}
                  </div>
                  <span className="text-2xl font-black tracking-tighter text-gray-900">{partner}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Testimonials Slider */}
          <div className="space-y-12">
            <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
              사용자가 직접 증명하는 <span className="text-brand-blue">DataFlow의 가치</span>
            </motion.h2>

            {/* Carousel Container */}
            <div className="relative max-w-4xl mx-auto h-[400px] md:h-[350px]">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 flex flex-col justify-between w-full h-full">
                    <div className="space-y-6">
                      <div className="flex justify-between items-start">
                        <Quote className="text-blue-100 fill-current" size={48} />
                        <div className="flex gap-1">
                          {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                            <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed text-xl md:text-2xl italic">
                        {testimonials[currentIndex].content.split(testimonials[currentIndex].highlight).map((part, i, arr) => (
                          <React.Fragment key={i}>
                            {part}
                            {i !== arr.length - 1 && (
                              <span className="relative inline-block px-1">
                                <span className="relative z-10 font-bold text-gray-900">{testimonials[currentIndex].highlight}</span>
                                <span className="absolute bottom-1 left-0 w-full h-3 bg-blue-100 -z-0 opacity-70" />
                              </span>
                            )}
                          </React.Fragment>
                        ))}
                      </p>
                    </div>
                    <div className="mt-8 pt-8 border-t border-gray-50 flex items-center gap-4">
                      <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-brand-blue font-bold text-lg">
                        {testimonials[currentIndex].author[0]}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-lg">{testimonials[currentIndex].author}</p>
                        <p className="text-gray-500">{testimonials[currentIndex].role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="absolute -left-4 md:-left-16 top-1/2 -translate-y-1/2 z-20">
                <button 
                  onClick={prevSlide}
                  className="w-12 h-12 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-gray-400 hover:text-brand-blue hover:scale-110 transition-all"
                >
                  <ChevronLeft size={24} />
                </button>
              </div>
              <div className="absolute -right-4 md:-right-16 top-1/2 -translate-y-1/2 z-20">
                <button 
                  onClick={nextSlide}
                  className="w-12 h-12 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-gray-400 hover:text-brand-blue hover:scale-110 transition-all"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* Dots */}
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > currentIndex ? 1 : -1);
                      setCurrentIndex(i);
                    }}
                    className={cn(
                      "w-2.5 h-2.5 rounded-full transition-all",
                      i === currentIndex ? "bg-brand-blue w-8" : "bg-gray-300"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <motion.div 
            variants={fadeIn}
            className="pt-24 flex flex-wrap justify-center gap-x-16 gap-y-8 border-t border-gray-200"
          >
            {trustBadges.map((badge) => (
              <div key={badge.label} className="flex items-center gap-3 text-gray-600">
                <div className="p-2 bg-white rounded-full shadow-sm border border-gray-100 text-brand-blue">
                  <badge.icon size={20} />
                </div>
                <span className="font-bold text-sm tracking-tight">{badge.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}