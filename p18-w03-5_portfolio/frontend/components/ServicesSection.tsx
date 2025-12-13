"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ServiceCard from './ServiceCard';
import ProcessStep from './ProcessStep'; // Import the ProcessStep component
import { Button } from '@/components/ui/button'; // Import shadcn/ui Button

const MotionButton = motion(Button); // Declare MotionButton here

// Dummy data for services
const services = [
  {
    id: 1,
    icon: '✨', // Placeholder icon
    title: '브랜드 아이덴티티',
    description: '기업의 핵심 가치를 담은 독창적인 브랜드 아이덴티티를 구축합니다.',
    bgColor: '#FFF0E5', // Orange pastel
  },
  {
    id: 2,
    icon: '🎨', // Placeholder icon
    title: 'UI/UX 디자인',
    description: '사용자 경험을 최적화하는 직관적이고 미려한 인터페이스를 디자인합니다.',
    bgColor: '#F7E5FF', // Purple pastel
  },
  {
    id: 3,
    icon: '🚀', // Placeholder icon
    title: '웹 개발',
    description: '최신 기술 스택을 활용하여 빠르고 안정적인 웹 서비스를 개발합니다.',
    bgColor: '#E5F5FF', // Blue pastel
  },
  {
    id: 4,
    icon: '📈', // Placeholder icon
    title: '성장 전략 컨설팅',
    description: '데이터 기반의 분석을 통해 비즈니스 성장을 위한 전략을 제시합니다.',
    bgColor: '#FFF0E5', // Orange pastel
  },
  {
    id: 5,
    icon: '💡', // Placeholder icon
    title: '콘텐츠 제작',
    description: '브랜드 스토리를 효과적으로 전달하는 매력적인 콘텐츠를 만듭니다.',
    bgColor: '#F7E5FF', // Purple pastel
  },
  {
    id: 6,
    icon: '💬', // Placeholder icon
    title: '소셜 미디어 관리',
    description: '타겟 고객과의 소통을 강화하는 소셜 미디어 운영 및 캠페인.',
    bgColor: '#E5F5FF', // Blue pastel
  },
];

// Dummy data for process steps
const processSteps = [
  {
    step: 1,
    title: '이야기 나누기',
    description: '프로젝트에 대한 깊이 있는 이해를 위해 충분한 대화를 나눕니다.',
    icon: '💬',
  },
  {
    step: 2,
    title: '밑대 잡기',
    description: '아이디어 구체화 및 전략 수립, 와이어프레임 제작으로 기획을 탄탄히 합니다.',
    icon: '📝',
  },
  {
    step: 3,
    title: '예쁘게 깎기',
    description: '시각적 디자인 및 UI/UX 설계를 통해 매력적인 결과물을 만듭니다.',
    icon: '🎨',
  },
  {
    step: 4,
    title: '생명을 불어넣기',
    description: '개발 및 구현 단계에서 완성도를 높이고 기능을 추가합니다.',
    icon: '💻',
  },
  {
    step: 5,
    title: '세상 밖으로',
    description: '최종 테스트 및 배포를 통해 프로젝트를 성공적으로 론칭합니다.',
    icon: '🚀',
  },
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






const ServicesSection = () => {
  const processStepsRef = useRef(null);
  const processStepsInView = useInView(processStepsRef, { once: true, amount: 0.3 });



  return (
    <motion.section
      className="py-16 md:py-24 bg-white text-foreground overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
            여러분은 위해 <span className="text-primary">준비했어요!</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-muted-foreground max-w-2xl mx-auto">
            전략적인 생각과 감각적인 디자인, 인터랙션을 더해 당신의 비즈니스를 특별하게 만들어 드릴게요.
          </motion.p>
        </div>

        {/* Services Grid */}
        <motion.div variants={sectionVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-16">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </motion.div>

        {/* Process Section */}
        <div className="text-center mb-12 mt-24">
          <motion.h3 variants={itemVariants} className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
            작업은 이렇게 진행돼요
          </motion.h3>
          <motion.p variants={itemVariants} className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            첫 만남부터 프로젝트 업로드까지, 투명하고 즐거운 소통으로 여러분과 합을 맞춰갈게요.
          </motion.p>
          <MotionButton
            variant="primaryCta"
            size="lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            프로젝트를 시작하기
          </MotionButton>
        </div>

        {/* Process Steps */}
        <div ref={processStepsRef} className="relative max-w-xl mx-auto">
          {processSteps.map((process, index) => (
            <motion.div key={process.step} variants={itemVariants}>
              <ProcessStep {...process} isLast={index === processSteps.length - 1} isInView={processStepsInView} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ServicesSection;
