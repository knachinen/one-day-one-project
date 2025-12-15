export default function FinalCtaSection() {
  return (
    <section id="final-cta" className="py-[100px] lg:py-[120px] bg-white">
      <div className="container mx-auto px-4 text-center">
        {/* Section Header */}
        <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-gray-800">
          당신의 아이디어를 현실로 만들 준비되셨나요?
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          지금 커뮤니티에 가입하고 첫 워크숍 소식을 가장 먼저 받아보세요. 코딩 지식이 없어도 3시간 만에 나만의 앱을 만들 수 있습니다.
        </p>

        {/* Form Area (Layout Only) */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4 max-w-lg mx-auto">
          {/* Email Input Field Placeholder */}
          <input
            type="email"
            placeholder="이메일 주소를 입력하세요"
            className="flex-grow p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-vibe-blue"
          />
          {/* CTA Button Placeholder */}
          <button className="bg-vibe-blue hover:bg-vibe-blue/90 text-white font-bold py-3 px-8 rounded-full text-lg whitespace-nowrap">
            무료로 시작하기 →
          </button>
        </div>

        {/* Trust Elements */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4 text-sm text-gray-600">
            <p className="flex items-center gap-2">⏱️ 30초 만에 가입 완료</p>
            <p className="flex items-center gap-2">✅ 평생 무료 구독</p>
            <p className="flex items-center gap-2">🛡️ 스팸 없는 청정 구역</p>
        </div>
      </div>
    </section>
  );
}
