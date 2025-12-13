"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface PartnerLogoProps {
  partner: {
    id: number;
    name: string;
    logo: string;
    bgColor: string;
  };
}

const PartnerLogo: React.FC<PartnerLogoProps> = ({ partner }) => {
  return (
    <motion.div
      className="p-4 rounded-lg flex items-center justify-center h-24 shadow-sm"
      whileHover={{ scale: 1.05, boxShadow: '0 5px 10px rgba(0,0,0,0.1)' }}
      transition={{ duration: 0.2 }}
      style={{ backgroundColor: partner.bgColor }}
    >
      <Image src={partner.logo} alt={partner.name} width={100} height={50} className="object-contain" unoptimized />
    </motion.div>
  );
};

export default PartnerLogo;
