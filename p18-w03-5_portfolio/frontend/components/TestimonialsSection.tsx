"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Import AnimatePresence
import Image from 'next/image';
import TestimonialCard from './TestimonialCard';
import PartnerLogo from './PartnerLogo';
import { Button } from '@/components/ui/button'; // Import shadcn/ui Button

const MotionButton = motion(Button); // Declare MotionButton here

// Dummy data for testimonials
const testimonials = [
  {
    id: 1,
    quote: "프로젝트 시작부터 마무리까지, 항상 기대를 뛰어넘는 결과물을 만들어주셨어요. 진심으로 감사합니다!",
    author: "김민지",
    title: "스타트업 대표",
    avatar: "https://placehold.co/50x50?text=KMJ",
    bgColor: "#FFFCE5" // Light Yellow
  },
  {
    id: 2,
    quote: "저희의 복잡한 요구사항을 명확하게 이해하고, 사용자 중심적인 디자인으로 완벽하게 구현해주셨습니다. 최고의 파트너입니다.",
    author: "박진수",
    title: "IT 기업 팀장",
    avatar: "https://placehold.co/50x50?text=PJS",
    bgColor: "#E5F5FF" // Light Blue
  },
  {
    id: 3,
    quote: "커뮤니케이션 능력이 뛰어나고, 매번 놀라운 창의성으로 프로젝트에 활력을 불어넣어 주십니다. 다음 프로젝트도 함께하고 싶어요!",
    author: "최수연",
    title: "콘텐츠 마케터",
    avatar: "https://placehold.co/50x50?text=CSY",
    bgColor: "#FFF0E5" // Light Orange
  },
];

// Dummy data for partner logos
const partnerLogos = [
  { id: 1, name: 'Brand A', logo: 'https://placehold.co/100x50?text=BrandA', bgColor: '#FFFCE5' },
  { id: 2, name: 'Brand B', logo: 'https://placehold.co/100x50?text=BrandB', bgColor: '#E5F5FF' },
  { id: 3, name: 'Brand C', logo: 'https://placehold.co/100x50?text=BrandC', bgColor: '#FFF0E5' },
  { id: 4, name: 'Brand D', logo: 'https://placehold.co/100x50?text=BrandD', bgColor: '#F7E5FF' },
  { id: 5, name: 'Brand E', logo: 'https://placehold.co/100x50?text=BrandE', bgColor: '#FFFCE5' },
  { id: 6, name: 'Brand F', logo: 'https://placehold.co/100x50?text=BrandF', bgColor: '#E5F5FF' },
  { id: 7, name: 'Brand G', logo: 'https://placehold.co/100x50?text=BrandG', bgColor: '#FFF0E5' },
  { id: 8, name: 'Brand H', logo: 'https://placehold.co/100x50?text=BrandH', bgColor: '#F7E5FF' },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const carouselVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };



  return (
    <motion.section
      className="py-16 md:py-24 bg-white text-foreground overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Testimonials Header */}
        <div className="text-center mb-12">
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
            저와 함께 성장한 <span className="text-primary">소중한 파트너들의 이야기</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-muted-foreground max-w-2xl mx-auto">
            디지털 세상에서 브랜드가 어떻게 반짝이게 되었는지, 생생한 후기를 확인해보세요.
          </motion.p>
        </div>

        {/* Testimonial Cards Carousel */}
        <div className="relative flex items-center justify-center mb-16">
          <MotionButton
            variant="primaryCta"
            size="icon-md"
            onClick={prevTestimonial}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </MotionButton>

          <div className="relative w-full md:w-2/3 lg:w-1/2 flex justify-center h-[300px]"> {/* Adjusted width for single card display and fixed height */}
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction} // Pass current index as custom prop
                variants={carouselVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute w-full" // Ensure card takes full width and is positioned absolutely
              >
                <TestimonialCard testimonial={testimonials[currentIndex]} />
              </motion.div>
            </AnimatePresence>
          </div>

          <MotionButton
            variant="primaryCta"
            size="icon-md"
            onClick={nextTestimonial}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </MotionButton>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center my-16">
          <div className="w-16 h-1 bg-primary rounded-full"></div>
        </div>

        {/* Partner Logos Header */}
        <div className="text-center mb-12">
          <motion.p variants={itemVariants} className="text-primary text-xl font-bold mb-2">💎</motion.p>
          <motion.h3 variants={itemVariants} className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
            즐겁게 협업한 브랜드
          </motion.h3>
          <motion.p variants={itemVariants} className="text-lg text-muted-foreground max-w-2xl mx-auto">
            다양한 분야의 멋진 팀들과 함께하며 성장하였습니다.
          </motion.p>
        </div>

        {/* Partner Logos Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
          variants={sectionVariants} // Apply section variants to the grid container
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {partnerLogos.map((partner) => (
            <motion.div key={partner.id} variants={itemVariants}> {/* Apply item variants to each logo */}
              <PartnerLogo partner={partner} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default TestimonialsSection;
