"use client"

import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import gsap from 'gsap'; // Import gsap
import CountUpNumber from './CountUpNumber'; // Import the new component
import SkillCube from './SkillCube'; // Import SkillCube
import RotatingShape from './RotatingShape'; // Import RotatingShape


const AboutSection = () => {
  const statsRef = useRef(null);
  const magneticTagsRef = useRef(null); // Add this ref
  const inView = useInView(statsRef, { once: true, amount: 0.5 }); // Trigger when 50% of the element is in view

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Dummy data for skill bars
  const skills = [
    { name: '디자인 & 기획', percentage: 95 },
    { name: '퍼블리싱 & 개발', percentage: 80 },
    { name: '모션 & 인터랙션', percentage: 90 },
  ];

  useEffect(() => {
    const magneticTagsContainer = magneticTagsRef.current;
    if (!magneticTagsContainer) return;

    const magneticTags = gsap.utils.toArray(magneticTagsContainer.children);

    const handleMouseMove = (e: MouseEvent) => {
      magneticTags.forEach((tag: any) => {
        const rect = tag.getBoundingClientRect();
        const tagCenterX = rect.left + rect.width / 2;
        const tagCenterY = rect.top + rect.height / 2;

        const distanceX = e.clientX - tagCenterX;
        const distanceY = e.clientY - tagCenterY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        const magnetRadius = 80; // Radius within which tags react
        const pullForce = 0.3; // How strongly tags are pulled

        if (distance < magnetRadius) {
          const angle = Math.atan2(distanceY, distanceX);
          const pullAmount = (1 - (distance / magnetRadius)) * pullForce * 20; // More force when closer

          gsap.to(tag, {
            x: Math.cos(angle) * pullAmount,
            y: Math.sin(angle) * pullAmount,
            duration: 0.3,
            ease: 'power1.out',
          });
        } else {
          gsap.to(tag, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)',
          });
        }
      });
    };

    const handleMouseLeave = () => {
      magneticTags.forEach((tag: any) => {
        gsap.to(tag, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)',
        });
      });
    };

    magneticTagsContainer.addEventListener('mousemove', handleMouseMove);
    magneticTagsContainer.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup event listeners
    return () => {
      magneticTagsContainer.removeEventListener('mousemove', handleMouseMove);
      magneticTagsContainer.removeEventListener('mouseleave', handleMouseLeave);
    };

  }, []); // Empty dependency array, runs once on mount

  return (
    <motion.section
      id="about"
      className="relative py-16 md:py-24 bg-white text-foreground overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Background Graphic Element */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-accent-gradient opacity-20 rounded-full mix-blend-multiply filter blur-2xl animate-blob"></div>

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-12 lg:items-start"> {/* Removed items-center */}
          {/* Left Column: Image and Location */}
          <div className="relative w-full lg:w-5/12 flex flex-col items-center lg:items-start min-h-[150vh]"> {/* Increased min-height for scroll */}
            <motion.div
              variants={itemVariants}
              className="relative w-full max-w-sm lg:max-w-none lg:w-full h-96 rounded-2xl overflow-hidden shadow-xl group" // Add group for hover effects
              whileHover="hover"
              initial="rest"
            >
              <Image
                src="https://placehold.co/400x500?text=Your+Photo" // Placeholder image
                alt="Profile Picture"
                fill
                className="rounded-2xl object-cover transition-all duration-300 ease-out group-hover:scale-105" // Scale image on hover
                unoptimized // Add unoptimized prop
              />
              {/* Overlay for accent color wave effect */}
              <motion.div
                className="absolute inset-0 bg-accent-gradient opacity-0"
                variants={{
                  rest: { clipPath: 'circle(0% at 50% 50%)', opacity: 0 },
                  hover: { clipPath: 'circle(75% at 50% 50%)', opacity: 0.5, transition: { duration: 0.5 } },
                }}
              ></motion.div>
            </motion.div>
            {/* Rotating 3D Shape */}
            <motion.div variants={itemVariants} className="absolute -top-10 -left-10 w-24 h-24 z-10 opacity-70">
              <RotatingShape color="#FFC759" /> {/* Use accent-start color */}
            </motion.div>
            <motion.div variants={itemVariants} className="absolute bottom-0 -right-10 w-20 h-20 z-10 opacity-70">
              <RotatingShape color="#F7941D" /> {/* Use accent-end color */}
            </motion.div>
            <motion.div variants={itemVariants} className="absolute -bottom-4 lg:-bottom-8 px-6 py-3 bg-accent-gradient text-white font-bold rounded-lg shadow-lg">
              CURRENTLY IN <span className="text-black">서울, 대한민국</span>
            </motion.div>
          </div>

          {/* Right Column: Intro, Stats, Skills */}
          <div className="w-full lg:w-7/12 mt-16 lg:mt-0 lg:sticky lg:top-0 lg:h-screen lg:py-16 overflow-y-auto"> {/* Made sticky */}
            {/* Intro/Headline */}
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
              마음을 움직이는 디지털 스토리텔링
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-muted-foreground mb-8">
              반갑습니다. 1인 창업가들의 든든한 파트너 <span className="font-extrabold text-foreground">알렉스</span>입니다.
              복잡한 문제를 귀엽고 친근한 디자인과 직관적인 스토리텔링으로 풀어냅니다. 여러분의 브랜드가 가진 고유한 매력을 발견해드릴게요.
            </motion.p>

            {/* Key Competency Icon List (Placeholder) */}
            <motion.div ref={magneticTagsRef} variants={itemVariants} className="flex flex-wrap gap-4 mb-12">
              {['전략 기획', 'UX 디자인', '웹 개발', '브랜딩'].map((competency, index) => (
                <div key={index} className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm font-medium hover:bg-accent-gradient hover:text-white transition-colors duration-300">
                  {/* Icon Placeholder */}
                  <span>💡</span>
                  <span>{competency}</span>
                </div>
              ))}
            </motion.div>

            {/* Career and Performance Indicators (Stats Section) */}
            <motion.div ref={statsRef} variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 border-t border-b border-gray-200 py-8">
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-black text-foreground mb-2">
                  <CountUpNumber value={inView ? 50 : 0} suffix="+" />
                </p>
                <p className="text-md text-muted-foreground">완료한 프로젝트</p>
              </div>
              <div className="text-center border-l border-r border-gray-200 md:border-none lg:border-l lg:border-r border-gray-200">
                <p className="text-4xl md:text-5xl font-black text-foreground mb-2">
                  <CountUpNumber value={inView ? 12 : 0} suffix="년" />
                </p>
                <p className="text-md text-muted-foreground">총 경력</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-black text-foreground mb-2">
                  <CountUpNumber value={inView ? 30 : 0} suffix="+" />
                </p>
                <p className="text-md text-muted-foreground">함께한 파트너</p>
              </div>
            </motion.div>

            {/* Skills Bar */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground mb-4">보유 기술</h3>
              {skills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg text-muted-foreground">{skill.name}</span>
                    <span className="text-lg font-bold text-foreground">{skill.percentage}%</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <SkillCube percentage={skill.percentage} colorClass="bg-accent-gradient" isInView={inView} delay={index * 0.1} />
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <motion.div
                        className="bg-accent-gradient h-3 rounded-full transform-origin-left"
                        initial={{ scaleX: 0 }}
                        animate={inView ? { scaleX: skill.percentage / 100 } : { scaleX: 0 }}
                        transition={{ duration: 1.5, ease: 'easeOut', delay: index * 0.1 + 0.5 }}
                      ></motion.div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutSection;
