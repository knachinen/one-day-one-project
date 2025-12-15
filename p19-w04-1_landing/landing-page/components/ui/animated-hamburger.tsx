"use client";

import { motion } from "framer-motion";
import React from "react";

interface AnimatedHamburgerProps {
  isOpen: boolean;
  onClick: () => void;
}

const AnimatedHamburger: React.FC<AnimatedHamburgerProps> = ({ isOpen, onClick }) => {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  return (
    <button
      onClick={onClick}
      className="p-2 -mr-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-vibe-blue md:hidden"
      aria-label="Toggle menu"
      aria-expanded={isOpen}
    >
      <motion.svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        animate={isOpen ? "open" : "closed"}
      >
        <motion.line
          x1="3"
          y1="12"
          x2="21"
          y2="12"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.2 }}
          {...common}
        />
        <motion.line
          x1="3"
          y1="6"
          x2="21"
          y2="6"
          variants={{
            closed: { y2: 6 },
            open: { rotate: 45, y2: 12 },
          }}
          transformOrigin="center center"
          {...common}
        />
        <motion.line
          x1="3"
          y1="18"
          x2="21"
          y2="18"
          variants={{
            closed: { y2: 18 },
            open: { rotate: -45, y2: 12 },
          }}
          transformOrigin="center center"
          {...common}
        />
      </motion.svg>
    </button>
  );
};

export default AnimatedHamburger;
