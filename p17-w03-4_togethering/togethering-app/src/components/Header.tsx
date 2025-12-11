import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <Link href="/">
        <h1 className="text-xl font-bold cursor-pointer">Togethering</h1>
      </Link>
      {/* Group Switcher and User Menu will go here later */}
      <div>
        {/* Placeholder for Group Switcher */}
        <span className="mr-4">Current Group: My Awesome Group</span>
        {/* Placeholder for User Menu */}
        <span>User Name</span>
      </div>
    </header>
  );
}
