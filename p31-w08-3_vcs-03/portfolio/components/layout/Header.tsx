import Link from "next/link";
import { Button } from "../ui/Button";

export const Header = () => {
  return (
    <header className="flex items-center justify-between h-[72px]">
      <div className="text-xl font-bold text-slate-900">
        <Link href="/">MINJUN.</Link>
      </div>
      
      <nav className="hidden md:flex gap-8 items-center">
        {["About", "Work", "Contact"].map((item) => (
          <Link
            key={item}
            href={`/${item.toLowerCase()}`}
            className="text-base font-medium text-slate-800 hover:text-blue-500 transition-colors"
          >
            {item}
          </Link>
        ))}
      </nav>

      <div className="hidden md:block">
        <Button variant="primary" className="py-2 px-6 text-sm">
          Let’s Talk
        </Button>
      </div>
    </header>
  );
};
