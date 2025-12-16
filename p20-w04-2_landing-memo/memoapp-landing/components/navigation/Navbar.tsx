// components/navigation/Navbar.tsx
import NavLogo from './NavLogo';
import NavMenu from './NavMenu';
import NavCTA from './NavCTA';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-18 bg-transparent flex items-center justify-center">
      <div className="max-w-[1200px] w-full flex items-center justify-between px-4 md:px-5 lg:px-6">
        <NavLogo />
        <NavMenu />
        <NavCTA />
      </div>
    </nav>
  );
}