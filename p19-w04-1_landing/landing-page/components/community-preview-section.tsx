"use client";

import { Button } from "@/components/ui/button";
import { motion, useInView, useMotionValue, useTransform } from "framer-motion"; // Import framer-motion hooks
import React, { useEffect, useRef } from "react";

// Helper component for animating numbers
const AnimatedNumber = ({ value, suffix = "", decimals = 0 }: { value: number; suffix?: string; decimals?: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const motionValue = useMotionValue(0);
  const displayValue = useTransform(motionValue, (latest) => latest.toFixed(decimals));

  useEffect(() => {
    if (inView) {
      motionValue.set(value);
    }
  }, [inView, value, motionValue]);

  // Use a normal span and read the MotionValue's current value for rendering
  return <span ref={ref}>{displayValue.get()}{suffix}</span>;
};

export default function CommunityPreviewSection() {
  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="community-preview" className="py-[100px] lg:py-[120px] bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-10 gap-8 items-center">
          {/* Left Column: Info Summary & CTA (4/10 width on desktop, full width on mobile) */}
          <div className="md:col-span-4 text-center md:text-left">
            {/* Sub-label */}
            <span className="inline-flex items-center rounded-full bg-vibe-blue/10 px-3 py-1 text-sm font-medium text-vibe-blue mb-4">
              LIVE COMMUNITY
            </span>
            {/* Headline H2 */}
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">
              이미 <AnimatedNumber value={500} suffix="명" />의 창업자들이 함께하고 있어요
            </h2>
            {/* Description */}
            <p className="mt-4 text-lg text-gray-600">
              코딩 지식이 전혀 없어도 괜찮습니다. 3시간이면 나만의 앱을 만들 수 있습니다. 실시간으로 질문하고, 서로 피드백을 주고받으며 성장하는 바이브코딩 커뮤니티에 함께하세요.
            </p>

            {/* Key Metrics Placeholder */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-vibe-blue"><AnimatedNumber value={500} suffix="+" /></p>
                <p className="text-sm text-gray-600">누적 멤버</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-vibe-blue"><AnimatedNumber value={98} suffix="%" /></p>
                <p className="text-sm text-gray-600">강의 만족도</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-vibe-blue"><AnimatedNumber value={3} suffix="hr" /></p>
                <p className="text-sm text-gray-600">평균 제작 시간</p>
              </div>
            </div>

            {/* Benefits List Placeholder */}
            <ul className="mt-8 text-left space-y-2 text-gray-700">
              <li className="flex items-center">
                <span className="mr-2 text-vibe-blue">✔</span> 실시간 Q&A 지원: 막히는 부분이 있다면 언제든 물어보세요. 멘토와 동료들이 즉시 답변해드립니다.
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-vibe-blue">✔</span> 매주 프로젝트 피드백: 완성된 프로젝트에 대해 현직 개발자의 실전 코드 리뷰와 피드백을 제공합니다.
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-vibe-blue">✔</span> 네트워킹 & 팀빌딩: 비슷한 목표를 가진 창업자들과 교류하며 아이디어를 확장하세요.
              </li>
            </ul>

            {/* Final CTA */}
            <div className="mt-8">
              <Button className="bg-gradient-to-r from-vibe-blue to-energy-orange hover:from-vibe-blue/90 hover:to-energy-orange/90 text-white font-bold py-2 px-6 rounded-full text-lg">
                지금 커뮤니티 합류하기 →
              </Button>
            </div>
          </div>

          {/* Right Column: Community Feed Preview (6/10 width on desktop, full width on mobile) */}
          <div className="md:col-span-6 bg-gray-100 rounded-lg shadow-md p-6 h-[600px] flex flex-col justify-between overflow-hidden relative">
            {/* Mockup Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <span className="font-semibold text-gray-700"># general-chat</span>
              <span className="text-gray-500 text-sm">+487</span>
            </div>

            {/* Mockup Messages */}
            <motion.div
              className="flex-grow overflow-y-auto pt-4 space-y-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {/* Message 1 */}
              <motion.div variants={messageVariants} className="flex items-start">
                <div className="h-8 w-8 rounded-full bg-blue-300 flex items-center justify-center text-white text-sm font-bold mr-3">김</div>
                <div>
                  <p className="font-semibold text-gray-800">김미영 <span className="text-gray-500 text-xs ml-1">10:30 AM</span></p>
                  <p className="text-gray-700 text-sm">혹시 데이터베이스 연결 관련해서 질문 드릴 분 계실까요? 😅</p>
                </div>
              </motion.div>
              {/* Message 2 */}
              <motion.div variants={messageVariants} className="flex items-start">
                <div className="h-8 w-8 rounded-full bg-green-300 flex items-center justify-center text-white text-sm font-bold mr-3">이</div>
                <div>
                  <p className="font-semibold text-gray-800">이선호 <span className="text-gray-500 text-xs ml-1">10:32 AM</span></p>
                  <p className="text-gray-700 text-sm">네! 어떤 부분이 어려우신가요? 화면 공유하면서 같이 봐드릴 수 있어요!</p>
                </div>
              </motion.div>
              {/* Message 3 with image */}
              <motion.div variants={messageVariants} className="flex items-start">
                <div className="h-8 w-8 rounded-full bg-purple-300 flex items-center justify-center text-white text-sm font-bold mr-3">박</div>
                <div>
                  <p className="font-semibold text-gray-800">박지훈 <span className="text-gray-500 text-xs ml-1">10:45 AM</span></p>
                  <p className="text-gray-700 text-sm">
                    드디어 첫 랜딩 페이지 완성했습니다! 노코드도 이렇게 빨리 만들 수 있다니 놀랍네요 😭
                  </p>
                  <div className="mt-2 w-48 h-32 bg-gray-300 rounded-lg flex items-center justify-center text-gray-600 text-xs">
                    [첨부 이미지: 완성된 랜딩페이지]
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Mockup Input */}
            <div className="pt-4 border-t border-gray-200">
              <input
                type="text"
                placeholder="메시지를 입력하세요..."
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-vibe-blue"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
