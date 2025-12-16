// components/hero/HeroSubtitle.tsx
import HeroMotionWrapper from './motion/HeroMotionWrapper';

export default function HeroSubtitle() {
  return (
    <HeroMotionWrapper delay={0.1}>
      <p className="text-lg text-gray-600 max-w-[640px] mt-6">
        생각을 놓치지 않도록, 가장 빠르고 가벼운 메모 경험
      </p>
    </HeroMotionWrapper>
  );
}
