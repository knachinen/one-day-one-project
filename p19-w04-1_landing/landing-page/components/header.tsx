"use client"; // Mark as client component for motion

import Image from "next/image";
import { Button } from "@/components/ui/button";
import AnimatedHamburger from "@/components/ui/animated-hamburger";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

import { Menu } from "lucide-react";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Debounce function
  const debounce = (func: Function, delay: number) => {
    let timeout: NodeJS.Timeout;
    return function executedFunction(...args: any[]) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, delay);
    };
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) { // When scrolled past the initial transparent height
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    const debouncedHandleScroll = debounce(handleScroll, 100);

    window.addEventListener("scroll", debouncedHandleScroll);
    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 ${isSticky ? "bg-white shadow-sm" : "bg-transparent"} h-[60px] md:h-[80px] flex items-center transition-colors duration-200`}>
      <div className="container mx-auto flex justify-between items-center px-4">
        <motion.a
          href="/"
          className="flex items-center"
          aria-label="홈으로"
          animate={{ scale: isSticky ? 0.9 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <Image src="/VibeCoding.svg" alt="VibeCoding Logo" width={150} height={40} priority />
        </motion.a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#intro" className="text-gray-600 hover:text-vibe-blue transition-colors duration-200 text-lg font-medium">워크숍 소개</a>
          <a href="#curriculum" className="text-gray-600 hover:text-vibe-blue transition-colors duration-200 text-lg font-medium">커리큘럼</a>
          <a href="#reviews" className="text-gray-600 hover:text-vibe-blue transition-colors duration-200 text-lg font-medium">후기</a>
          <a href="#faq" className="text-gray-600 hover:text-vibe-blue transition-colors duration-200 text-lg font-medium">FAQ</a>
          <a href="#login" className="text-gray-600 hover:text-vibe-blue transition-colors duration-200 text-lg font-medium">로그인</a>
        </nav>

        {/* Hamburger Menu Icon (Mobile) and Sheet */}
        <div className="md:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <AnimatedHamburger isOpen={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)} />
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] flex flex-col">
              <SheetHeader>
                <SheetTitle>메뉴</SheetTitle>
                <SheetDescription>
                  바이브코딩의 다양한 정보를 만나보세요.
                </SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col gap-4 py-4 flex-grow">
                <a href="#intro" className="text-lg font-medium hover:text-vibe-blue" onClick={() => setIsMenuOpen(false)}>워크숍 소개</a>
                <a href="#curriculum" className="text-lg font-medium hover:text-vibe-blue" onClick={() => setIsMenuOpen(false)}>커리큘럼</a>
                <a href="#reviews" className="text-lg font-medium hover:text-vibe-blue" onClick={() => setIsMenuOpen(false)}>후기</a>
                <a href="#faq" className="text-lg font-medium hover:text-vibe-blue" onClick={() => setIsMenuOpen(false)}>FAQ</a>
                <a href="#login" className="text-lg font-medium hover:text-vibe-blue" onClick={() => setIsMenuOpen(false)}>로그인</a>
              </nav>
              <Button className="bg-vibe-blue hover:bg-vibe-blue/90 text-white font-bold py-2 px-4 rounded-full w-full animate-pulse-border" onClick={() => setIsMenuOpen(false)}>
                무료 가입하기
              </Button>
            </SheetContent>
          </Sheet>
        </div>

        {/* CTA Button (Desktop) */}
        <motion.div
          className="hidden md:block"
          whileHover={{ y: -2 }} // Subtle elevation
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Button className="bg-vibe-blue hover:bg-vibe-blue/90 text-white font-bold py-2 px-4 rounded-full group shadow-lg hover:shadow-xl animate-pulse-border">
            무료 가입하기
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
