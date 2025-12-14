"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from './ProjectCard'; // Import the ProjectCard component
import { Button } from '@/components/ui/button'; // Import shadcn/ui Button
import { useUIStore } from '@/store/uiStore'; // Import useUIStore
import ProjectDetailModal from './ProjectDetailModal'; // Import ProjectDetailModal

const MotionButton = motion.create(Button); // Declare MotionButton here

// Dummy data for projects
const projects = [
  {
    id: 1,
    title: '금융 관리 대시보드',
    description: '사용자 친화적인 인터페이스로 복잡한 금융 데이터를 시각화합니다.',
    category: ['UX/UI 디자인', '웹 앱'],
    image: 'https://placehold.co/400x300?text=Project+1',
  },
  {
    id: 2,
    title: '동네 카페 브랜딩',
    description: '따뜻하고 친근한 카페 경험을 위한 통합 브랜딩 전략 및 디자인.',
    category: ['브랜딩', '그래픽 디자인'],
    image: 'https://placehold.co/400x300?text=Project+2',
  },
  {
    id: 3,
    title: '모바일 건강 관리 앱',
    description: '개인화된 건강 목표 설정 및 추적 기능으로 사용자 건강 증진.',
    category: ['UX/UI 디자인', '모바일 앱'],
    image: 'https://placehold.co/400x300?text=Project+3',
  },
  {
    id: 4,
    title: 'AI 기반 학습 플랫폼',
    description: '개개인에게 최적화된 학습 경로를 제공하는 지능형 교육 솔루션.',
    category: ['웹 앱', 'UX/UI 디자인'],
    image: 'https://placehold.co/400x300?text=Project+4',
  },
  {
    id: 5,
    title: '스타트업 로고 디자인',
    description: '혁신적인 스타트업의 비전을 담은 간결하고 강력한 로고 디자인.',
    category: ['브랜딩', '그래픽 디자인'],
    image: 'https://placehold.co/400x300?text=Project+5',
  },
  {
    id: 6,
    title: '이커머스 웹사이트 리뉴얼',
    description: '매출 증대와 사용자 경험 개선을 위한 반응형 이커머스 웹사이트 개편.',
    category: ['웹 디자인', '웹 앱'],
    image: 'https://placehold.co/400x300?text=Project+6',
  },
];

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


const PortfolioSection = () => {
  const [filter, setFilter] = useState('전체보기');
  const { openModal, closeModal, isModalOpen } = useUIStore(); // Use Zustand store for modal state

  const categories = ['전체보기', 'UX/UI 디자인', '웹 앱', '브랜딩', '모바일 앱', '그래픽 디자인'];

  const filteredProjects = filter === '전체보기'
    ? projects
    : projects.filter(project => project.category.includes(filter));

  const handleOpenProjectModal = (project: typeof projects[0]) => {
    openModal(
      <ProjectDetailModal
        project={project}
        isOpen={true} // Modal is open when rendered
        onClose={closeModal}
      />
    );
  };



  return (
    <motion.section
      id="portfolio"
      className="relative py-16 md:py-24 bg-white text-foreground overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.p variants={itemVariants} className="text-accent-gradient text-sm font-bold mb-2">🚩 포트폴리오</motion.p>
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
            웅킁웅킁 피어나는 <span className="text-primary">나의 작업실</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-muted-foreground max-w-2xl mx-auto">
            작지만 반짝이는 아이디어들을 차곡차곡 모아두었어요. 친근하고 따뜻한 디자이너로 사용자에게 다가갑니다.
          </motion.p>
        </div>

        {/* Filter Buttons */}
        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <Button
              key={cat}
              onClick={() => setFilter(cat)}
              variant={filter === cat ? "filterChipActive" : "filterChip"}
              size="chip"
            >
              {cat}
            </Button>
          ))}
        </motion.div>

        {/* Project Grid */}
        <div className="relative"> {/* Add relative positioning for absolute child (AnimatePresence) if needed */}
          <AnimatePresence mode="sync"> {/* Use mode="sync" for better control over exit animations */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              // Remove key={filter} from here, as AnimatePresence children need stable keys
            >
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id} // Keep project.id as the key for individual items
                  layout // Add layout prop for shared layout animation
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  onClick={() => openProjectModal(project)} // Add onClick to open modal
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom CTA Button */}
        <motion.div variants={itemVariants} className="text-center mt-16">
          <MotionButton
            variant="outlineCta"
            size="lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            더 많은 작품 보기
          </MotionButton>
        </motion.div>

        {/* Project Detail Modal (managed by useUIStore) */}

      </div>
    </motion.section>
  );
};

export default PortfolioSection;
