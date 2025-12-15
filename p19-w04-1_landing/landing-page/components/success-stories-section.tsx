"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, useInView, useMotionValue, useTransform } from "framer-motion"; // Import motion, useInView, useMotionValue, useTransform
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

  return <span ref={ref}>{displayValue.get()}{suffix}</span>;
};


export default function SuccessStoriesSection() {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="success-stories" className="py-[100px] lg:py-[120px] bg-white">
      <div className="container mx-auto px-4 text-center">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-12">
          {/* Main H2 */}
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">
            수강생들이 만든 놀라운 결과물
          </h2>
          {/* Description */}
          <p className="mt-4 text-lg text-gray-600 max-w-2xl">
            아이디어만으로 시작해 실제 성공까지 달성한 이야기를 만나보세요.
          </p>
        </div>

        {/* Success Story Cards (3-Column Grid with Carousel Nav Placeholders) */}
        <div className="relative">
          {/* Left Arrow Placeholder */}
          <Button variant="outline" size="icon" className="absolute left-0 top-1/2 -translate-y-1/2 hidden lg:flex">
            {"<"}
          </Button>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {/* Card 1 Placeholder */}
            <motion.div variants={cardVariants}>
                <Card className="flex flex-col items-center text-center">
                  <CardHeader className="p-0 pb-4">
                    {/* Project Screenshot Placeholder */}
                    <div className="bg-gray-200 h-48 w-full rounded-t-lg flex items-center justify-center relative">
                      <span className="absolute top-2 left-2 inline-flex items-center rounded-full bg-vibe-blue/10 px-2 py-0.5 text-xs font-medium text-vibe-blue">
                        3시간 완성
                      </span>
                      <p className="text-gray-500">Project Screenshot</p>
                    </div>
                    <CardTitle className="mt-4 text-xl font-semibold text-gray-800">식재료 중심</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    {/* Student Info */}
                    <div className="flex items-center justify-center mb-2">
                      <div className="h-8 w-8 rounded-full bg-purple-200 flex items-center justify-center text-sm text-purple-800 mr-2">김</div>
                      <p className="text-sm text-gray-600">김현지님</p>
                    </div>
                    {/* One-line comment */}
                    <CardDescription className="text-gray-700 text-sm italic">
                      "코딩을 전혀 모른다고 했는데, 최근 주 3시간 판매 관리 앱을 만들었고, 청약 신청까지 받았습니다."
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="mt-4">
                    {/* Achievement metrics */}
                    <p className="text-lg font-bold text-gray-800">조회 <AnimatedNumber value={100000} suffix="+천회" /></p> {/* Example: 100,000+ views */}
                  </CardFooter>
                </Card>
            </motion.div>

            {/* Card 2 Placeholder */}
            <motion.div variants={cardVariants}>
                <Card className="flex flex-col items-center text-center">
                  <CardHeader className="p-0 pb-4">
                    {/* Project Screenshot Placeholder */}
                    <div className="bg-gray-200 h-48 w-full rounded-t-lg flex items-center justify-center relative">
                      <span className="absolute top-2 left-2 inline-flex items-center rounded-full bg-energy-orange/10 px-2 py-0.5 text-xs font-medium text-energy-orange">
                        노코드 합격
                      </span>
                      <p className="text-gray-500">Project Screenshot</p>
                    </div>
                    <CardTitle className="mt-4 text-xl font-semibold text-gray-800">정기 프로젝트</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    {/* Student Info */}
                    <div className="flex items-center justify-center mb-2">
                      <div className="h-8 w-8 rounded-full bg-green-200 flex items-center justify-center text-sm text-green-800 mr-2">이</div>
                      <p className="text-sm text-gray-600">이준호님</p>
                    </div>
                    {/* One-line comment */}
                    <CardDescription className="text-gray-700 text-sm italic">
                      "아이디어가 많았는데 매번 개발의 벽에 부딪혔어요. 이제 직접 만들 수 있게 되어 정말 만족합니다."
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="mt-4">
                    {/* Achievement metrics */}
                    <p className="text-lg font-bold text-gray-800">누적 이용자 <AnimatedNumber value={5000} suffix="+" /></p> {/* Example: 5,000+ users */}
                  </CardFooter>
                </Card>
            </motion.div>

            {/* Card 3 Placeholder */}
            <motion.div variants={cardVariants}>
                <Card className="flex flex-col items-center text-center">
                  <CardHeader className="p-0 pb-4">
                    {/* Project Screenshot Placeholder */}
                    <div className="bg-gray-200 h-48 w-full rounded-t-lg flex items-center justify-center relative">
                      <span className="absolute top-2 left-2 inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">
                        MVP 런칭
                      </span>
                      <p className="text-gray-500">Project Screenshot</p>
                    </div>
                    <CardTitle className="mt-4 text-xl font-semibold text-gray-800">나만의 포트폴리오</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    {/* Student Info */}
                    <div className="flex items-center justify-center mb-2">
                      <div className="h-8 w-8 rounded-full bg-blue-200 flex items-center justify-center text-sm text-blue-800 mr-2">박</div>
                      <p className="text-sm text-gray-600">박수진님</p>
                    </div>
                    {/* One-line comment */}
                    <CardDescription className="text-gray-700 text-sm italic">
                      "직접 아이디어를 구현하는 과정이 너무 즐거웠습니다. 이제 저만의 서비스를 만들어 나갈 자신감이 생겼어요."
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="mt-4">
                    {/* Achievement metrics */}
                    <p className="text-lg font-bold text-gray-800">앱스토어 <AnimatedNumber value={4.8} decimals={1} />점</p> {/* Example: 4.8 score */}
                  </CardFooter>
                </Card>
            </motion.div>
          </motion.div>

          {/* Right Arrow Placeholder */}
          <Button variant="outline" size="icon" className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:flex">
            {">"}
          </Button>

          {/* Pagination Dots Placeholder */}
          <div className="flex justify-center mt-8 space-x-2">
            <span className="h-2 w-2 rounded-full bg-vibe-blue"></span>
            <span className="h-2 w-2 rounded-full bg-gray-300"></span>
            <span className="h-2 w-2 rounded-full bg-gray-300"></span>
          </div>
        </div>
      </div>
    </section>
  );
}