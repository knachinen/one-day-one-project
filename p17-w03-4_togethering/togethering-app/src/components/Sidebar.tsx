import Link from 'next/link';

export default function Sidebar() {
  const navItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Groups', href: '/groups' },
    { name: 'Projects', href: '/projects' },
    { name: 'Calendar', href: '/calendar' },
  ];

  return (
    <aside className="w-64 bg-gray-100 dark:bg-gray-900 p-4 hidden md:block border-r border-gray-200 dark:border-gray-700">
      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className="mb-2">
              <Link href={item.href} className="block p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
