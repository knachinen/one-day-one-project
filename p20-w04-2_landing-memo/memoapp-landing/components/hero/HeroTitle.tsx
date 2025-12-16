// components/hero/HeroTitle.tsx
import HeroMotionWrapper from './motion/HeroMotionWrapper';

export default function HeroTitle() {
  return (
    <HeroMotionWrapper delay={0.0}>
      <h1 className="text-[36px] font-bold leading-[1.2] tracking-[-0.01em] md:text-[56px]">
        생각이 떠오르는 순간,
        <br />
        <span className="text-primary">바로 메모</span>
      </h1>
    </HeroMotionWrapper>
  );
}
