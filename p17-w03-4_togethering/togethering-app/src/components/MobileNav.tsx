import Link from 'next/link';

export default function MobileNav() {
  const navItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Groups', href: '/groups' },
    { name: 'Projects', href: '/projects' },
    { name: 'Calendar', href: '/calendar' },
  ];

  return (
    <nav className="md:hidden bg-blue-600 text-white fixed bottom-0 left-0 w-full flex justify-around p-3 shadow-lg z-10">
      {navItems.map((item) => (
        <Link key={item.name} href={item.href} className="flex flex-col items-center text-xs text-white dark:text-gray-100">
          {/* Icon placeholder */}
          <span className="text-xl">💡</span>
          <span>{item.name}</span>
        </Link>
      ))}
    </nav>
  );
}
