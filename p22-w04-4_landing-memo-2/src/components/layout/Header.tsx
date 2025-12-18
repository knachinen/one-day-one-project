// src/components/layout/Header.tsx
import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-4 flex items-center justify-between bg-white bg-opacity-70 backdrop-blur-md shadow-sm">
      {/* Logo */}
      <div className="text-xl font-bold">
        <Link href="/">MemoApp</Link>
      </div>

      {/* Navigation */}
      <nav className="hidden md:flex space-x-6">
        <Link href="#features" className="text-gray-700 hover:text-primary">
          기능
        </Link>
        <Link href="#use-cases" className="text-gray-700 hover:text-primary">
          사용 사례
        </Link>
        <Link href="#pricing" className="text-gray-700 hover:text-primary">
          가격
        </Link>
        <Link href="#testimonials" className="text-gray-700 hover:text-primary">
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
