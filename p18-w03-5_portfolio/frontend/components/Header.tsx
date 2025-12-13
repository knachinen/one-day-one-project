import React from 'react';
import Link from 'next/link'; // Import Link
import { Button } from '@/components/ui/button'; // Import Button

const Header = () => {
  // Define active section state or context here if needed for active link styling
  const currentPath = typeof window !== 'undefined' ? window.location.hash : '';

  const navLinks = [
    { name: '홈', href: '#hero' },
    { name: '작업물', href: '#portfolio' },
    { name: '소개', href: '#about' },
    { name: '문의', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-sm shadow-sm transition-all duration-300">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground">
          <Link href="#hero" className="hover:text-primary transition-colors duration-300">My Portfolio</Link>
        </h1>
        <nav className="hidden md:block"> {/* Hide on mobile for now, will implement mobile menu later */}
          <ul className="flex space-x-6 items-center">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`text-lg font-medium hover:text-primary transition-colors duration-300 ${
                    currentPath === link.href ? 'text-primary' : 'text-foreground'
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li>
              <Button variant="primaryCta" size="sm" asChild>
                <Link href="#contact">
                  ❤️ 함께하기
                </Link>
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
