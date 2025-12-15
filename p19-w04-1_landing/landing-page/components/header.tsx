import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm h-[60px] md:h-[80px] flex items-center">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo Placeholder */}
        <div className="text-xl font-bold text-vibe-blue">VibeCoding</div>

        {/* CTA Button */}
        <Button className="bg-vibe-blue hover:bg-vibe-blue/90 text-white font-bold py-2 px-4 rounded-full">
          무료 커뮤니티 가입하기
        </Button>
      </div>
    </header>
  );
}
