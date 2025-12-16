// components/navigation/NavMenu.tsx
import Link from 'next/link';

export default function NavMenu() {
  const menuItems = [
    { label: '기능', href: '#features' },
    { label: '사용 사례', href: '#use-cases' },
    { label: '후기', href: '#social-proof' },
  ];

  return (
    <nav className="hidden md:block"> {/* Hidden on mobile, block on desktop */}
      <ul className="flex space-x-8">
        {menuItems.map((item) => (
          <li key={item.label}>
            <Link href={item.href} className="text-gray-600 hover:text-primary">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}