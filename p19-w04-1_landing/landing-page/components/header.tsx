"use client"; // Mark as client component for motion

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm h-[60px] md:h-[80px] flex items-center">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo Placeholder */}
        <div className="text-xl font-bold text-vibe-blue">VibeCoding</div>

        {/* CTA Button */}
        <motion.div
          whileHover={{ y: -3 }} // Subtle elevation
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Button className="bg-vibe-blue hover:bg-vibe-blue/90 text-white font-bold py-2 px-4 rounded-full group">
            무료 커뮤니티 가입하기
            <motion.span
              className="ml-2 inline-block"
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              whileHover={{ x: 5 }} // Bouncing arrow
            >
              →
            </motion.span>
          </Button>
        </motion.div>
      </div>
    </header>
  );
}
