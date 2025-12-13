"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface TestimonialCardProps {
  testimonial: {
    id: number;
    quote: string;
    author: string;
    title: string;
    avatar: string;
    bgColor: string;
  };
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <motion.div
      className="p-8 rounded-lg shadow-md cursor-pointer flex flex-col justify-between h-full"
      whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
      transition={{ duration: 0.2 }}
      style={{ backgroundColor: testimonial.bgColor }}
    >
      <div className="text-4xl text-blue-500 mb-4">“</div> {/* Placeholder for quote icon */}
      <p className="text-lg text-muted-foreground mb-6 flex-grow">{testimonial.quote}</p>
      <div className="flex items-center">
        <Image
          src={testimonial.avatar}
          alt={testimonial.author}
          width={50}
          height={50}
          className="rounded-full mr-4 object-cover"
        />
        <div>
          <h4 className="font-bold text-foreground">{testimonial.author}</h4>
          <p className="text-sm text-muted-foreground">{testimonial.title}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
