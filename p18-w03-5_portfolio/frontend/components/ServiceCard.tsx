"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface ServiceCardProps {
  service: {
    id: number;
    icon: string;
    title: string;
    description: string;
    bgColor: string;
  };
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <motion.div
      className="flex flex-col items-center p-6 rounded-lg shadow-md cursor-pointer"
      whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
      transition={{ duration: 0.2 }}
      style={{ backgroundColor: service.bgColor }}
    >
      <div className="text-4xl mb-4">{service.icon}</div>
      <h3 className="text-xl font-bold text-foreground mb-2">{service.title}</h3>
      <p className="text-sm text-muted-foreground text-center">{service.description}</p>
    </motion.div>
  );
};

export default ServiceCard;
