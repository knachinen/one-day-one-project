// components/navigation/NavCTA.tsx
import Link from 'next/link';

export default function NavCTA() {
  return (
    <Link href="#cta" className="h-14 px-6 rounded-[28px] bg-primary text-white font-medium text-lg flex items-center justify-center">
      무료로 시작하기
    </Link>
  );
}