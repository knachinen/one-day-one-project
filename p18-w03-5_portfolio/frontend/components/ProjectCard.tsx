"use client";

import React, { useRef, useState, useEffect } from 'react'; // Add useRef, useState, useEffect
import { motion } from 'framer-motion';
import Image from 'next/image';
import gsap from 'gsap'; // Import gsap

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    description: string;
    category: string[];
    image: string;
  };
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const cardRef = useRef<HTMLDivElement>(null); // Ref for the card itself
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 }); // State for mouse position
  const [isHovered, setIsHovered] = useState(false); // State to track hover

  return (
    <motion.div
      ref={cardRef} // Attach ref to the motion.div
      className="relative bg-white rounded-lg shadow-md overflow-hidden cursor-pointer group" // Add group class
      onMouseMove={(e) => {
        const rect = cardRef.current?.getBoundingClientRect();
        if (rect) {
          setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.03, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
      transition={{ duration: 0.2 }}
    >
      <div className="w-full h-48 md:h-64 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          width={400}
          height={300}
          className="object-cover w-full h-full transition-transform duration-300 ease-out group-hover:scale-110" // Add zoom effect
          unoptimized
        />
        {/* Light source overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            backgroundPosition: isHovered
              ? `${mousePosition.x}px ${mousePosition.y}px`
              : 'center center',
          }}
          transition={{ ease: 'easeOut', duration: 0.3 }}
          style={{
            background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.2) 0%, transparent 70%)',
            opacity: isHovered ? 1 : 0, // Show on hover
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
        <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.category.map((cat, idx) => (
            <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
              {cat}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
