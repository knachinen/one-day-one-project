// components/navigation/NavLogo.tsx
import Link from 'next/link';

export default function NavLogo() {
  return (
    <Link href="/" className="font-bold text-lg">
      MemoApp
    </Link>
  );
}