// components/hero/HeroCTA.tsx
export default function HeroCTA() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 mt-8 md:flex-row md:gap-4">
      {/* Primary Button */}
      <button className="h-14 px-6 rounded-[28px] bg-primary text-white font-medium text-lg">
        무료로 시작하기
      </button>

      {/* Secondary Button */}
      <button className="h-14 px-6 rounded-[28px] border border-gray-200 bg-white text-gray-800 font-medium text-lg">
        앱 다운로드
      </button>
    </div>
  );
}
