"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion"; // Import motion from framer-motion

export default function LiveDemoSection() {
  const [appTitle, setAppTitle] = useState("My First App");
  const [primaryColor, setPrimaryColor] = useState("#5B8FF9"); // Vibe Blue
  const [componentList, setComponentList] = useState<string[]>([]); // To track added components

  const colors = [
    { name: "Blue", hex: "#5B8FF9" },
    { name: "Purple", hex: "#8B5CF6" },
    { name: "Green", hex: "#10B981" },
    { name: "Orange", hex: "#FF9F40" },
    { name: "Red", hex: "#EF4444" },
    { name: "Yellow", hex: "#FACC15" },
  ];

  const leftPanelVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  const rightPanelVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section id="live-demo" className="py-[100px] lg:py-[120px] bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-12 text-center">
          {/* Sub-label */}
          <span className="inline-flex items-center rounded-full bg-vibe-blue/10 px-3 py-1 text-sm font-medium text-vibe-blue mb-4">
            LIVE SANDBOX
          </span>
          {/* Main H2 */}
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">
            이렇게 만들어집니다
          </h2>
          {/* Description */}
          <p className="mt-4 text-lg text-gray-600 max-w-2xl">
            코딩 없이 클릭만으로 앱을 완성해보세요. 드래그 앤 드롭조차 필요 없습니다. 원하는 기능을 선택하기만 하면 실시간으로 앱이 완성됩니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-10 gap-8 items-center">
          {/* Left Column: Control Panel (4/10 width on desktop, full width on mobile) */}
          <div className="md:col-span-4 bg-gray-100 rounded-lg shadow-md p-6 h-[500px] flex flex-col space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">컨트롤 패널</h3>
            {/* Title Editor */}
            <div>
              <label htmlFor="app-title" className="block text-sm font-medium text-gray-700 mb-2">제목 편집기</label>
              <Input
                id="app-title"
                placeholder="예: 나만의 할일 앱"
                value={appTitle}
                onChange={(e) => setAppTitle(e.target.value)}
                className="w-full rounded-full"
              />
            </div>

            {/* Color Theme Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">색상 테마 선택</label>
              <div className="flex gap-2 flex-wrap">
                {colors.map((color) => (
                  <button
                    key={color.hex}
                    className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center transition-all duration-200"
                    style={{ backgroundColor: color.hex, borderColor: primaryColor === color.hex ? "#5B8FF9" : "#D1D5DB" }}
                    onClick={() => setPrimaryColor(color.hex)}
                    title={color.name}
                  >
                    {primaryColor === color.hex && (
                      <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Component Controls Placeholder */}
            <div>
              <h4 className="text-md font-semibold text-gray-800 mb-2">구성 요소 추가 (Placeholder)</h4>
              <div className="grid grid-cols-2 gap-4">
                <button className="bg-white p-4 rounded-lg shadow flex flex-col items-center justify-center">
                  <span className="text-2xl mb-1">📱</span> 헤더 추가
                </button>
                <button className="bg-white p-4 rounded-lg shadow flex flex-col items-center justify-center">
                  <span className="text-2xl mb-1">🔘</span> 버튼 생성
                </button>
                <button className="bg-white p-4 rounded-lg shadow flex flex-col items-center justify-center">
                  <span className="text-2xl mb-1">📝</span> 텍스트 변경
                </button>
                <button className="bg-white p-4 rounded-lg shadow flex flex-col items-center justify-center">
                  <span className="text-2xl mb-1">🖼️</span> 이미지 삽입
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Real-time Preview (6/10 width on desktop, full width on mobile) */}
          <motion.div
            className="md:col-span-6 flex items-center justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={rightPanelVariants}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Smartphone Mockup */}
            <div
              className="relative w-full max-w-sm aspect-[9/16] rounded-3xl border-[10px] border-black shadow-xl overflow-hidden"
              style={{ backgroundColor: `hsl(var(--background))` }} // Use a neutral background or primaryColor dynamic background
            >
              {/* Top Bar */}
              <div className="absolute top-0 left-0 w-full h-10 bg-black flex items-center justify-center text-white text-sm">
                {/* Notch or Camera placeholder */}
                <div className="h-4 w-16 bg-gray-800 rounded-b-lg"></div>
              </div>

              {/* App Screen */}
              <div className="absolute top-10 left-0 right-0 bottom-0 p-4 flex flex-col items-center justify-between" style={{ backgroundColor: `hsl(var(--background))` }}>
                {/* App Title */}
                <h4 className="text-xl font-bold text-gray-800" style={{ color: primaryColor }}>
                  {appTitle || "My App"}
                </h4>

                {/* Main Content Placeholder */}
                <div className="flex-grow flex flex-col items-center justify-center text-gray-500">
                  <p>Your app content goes here.</p>
                  <button
                    className="mt-4 px-6 py-2 rounded-full text-white font-medium"
                    style={{ backgroundColor: primaryColor }}
                  >
                    Action Button
                  </button>
                </div>

                {/* Bottom Nav Bar */}
                <div className="w-full h-14 bg-gray-100 flex justify-around items-center rounded-t-lg" style={{ backgroundColor: primaryColor }}>
                  <span className="text-white text-2xl">🏠</span>
                  <span className="text-white text-2xl">📊</span>
                  <span className="text-white text-2xl">⚙️</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Final CTA below preview */}
        <div className="mt-12 text-center">
          <button className="bg-gradient-to-r from-vibe-blue to-energy-orange hover:from-vibe-blue/90 hover:to-energy-orange/90 text-white font-bold py-3 px-8 rounded-full text-lg">
            3시간 완성 워크숍 신청하기 →
          </button>
        </div>
      </div>
    </section>
  );
}
