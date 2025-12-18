// src/components/layout/Header.tsx
"use client"; // Mark as Client Component
import { useState, useEffect } from 'react'; // Import useState and useEffect
import Link from 'next/link';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) { // Scroll past 50px
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`
      fixed top-0 left-0 right-0 z-50 p-4 flex items-center justify-between transition-all duration-300 ease-in-out
      ${scrolled ? 'bg-white bg-opacity-70 backdrop-blur-md shadow-sm h-16' : 'bg-transparent h-20'} {/* Apply styles based on scrolled state */}
    `}>
      {/* Logo */}
      <div className="text-xl font-bold">
        <Link href="/">MemoApp</Link>
      </div>

      {/* Navigation */}
      <nav className="hidden md:flex space-x-6">
        <Link href="#features" className="text-gray-700 hover:text-primary" onClick={(e) => {
          e.preventDefault();
          document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' });
        }}>
          기능
        </Link>
        <Link href="#use-cases" className="text-gray-700 hover:text-primary" onClick={(e) => {
          e.preventDefault();
          document.querySelector('#use-cases')?.scrollIntoView({ behavior: 'smooth' });
        }}>
          사용 사례
        </Link>
        <Link href="#pricing" className="text-gray-700 hover:text-primary" onClick={(e) => {
          e.preventDefault();
          document.querySelector('#pricing')?.scrollIntoView({ behavior: 'smooth' });
        }}>
          가격
        </Link>
        <Link href="#testimonials" className="text-gray-700 hover:text-primary" onClick={(e) => {
          e.preventDefault();
          document.querySelector('#testimonials')?.scrollIntoView({ behavior: 'smooth' });
        }}>
          로그인
        </Link>
      </nav>

      {/* CTA Button */}
      <div>
        <button className="px-5 py-2 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors">
          무료로 시작하기
        </button>
      </div>
    </header>
  );
}
