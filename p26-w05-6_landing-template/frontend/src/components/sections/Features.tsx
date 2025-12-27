"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, BarChart3, Users, Zap } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { fadeIn, staggerContainer } from "@/constants/animations";
import { cn } from "@/lib/utils";

const features = [
  {
    id: "analytics",
    tag: "Analytics",
    title: "실시간 데이터 분석",
    desc: "복잡한 수치를 한눈에 파악할 수 있는 강력한 대시보드를 제공합니다.",
    color: "text-brand-blue",
    bgColor: "bg-blue-50",
    icon: BarChart3,
    checkColor: "text-blue-500",
    points: [
      "드래그 앤 드롭 대시보드 커스터마이징",
      "CSV, Excel, PDF 등 다양한 내보내기 지원",
      "실시간 데이터 자동 갱신 및 알림",
    ],
    imageSide: "right",
  },
  {
    id: "collaboration",
    tag: "Collaboration",
    title: "팀 협업 워크스페이스",
    desc: "팀원들과 실시간으로 소통하며 프로젝트의 진행 상황을 공유하세요.",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    icon: Users,
    checkColor: "text-purple-500",
    points: [
      "멘션(@) 기능을 통한 즉각적인 소통",
      "프로젝트별 칸반 보드 및 타임라인 뷰",
      "무제한 파일 공유 및 버전 관리",
    ],
    imageSide: "left",
  },
  {
    id: "automation",
    tag: "Automation",
    title: "스마트 워크플로우 자동화",
    desc: "반복적인 업무를 자동화하여 창의적인 일에 더 집중할 수 있습니다.",
    color: "text-green-600",
    bgColor: "bg-green-50",
    icon: Zap,
    checkColor: "text-green-500",
    points: [
      "코딩 없이 클릭만으로 워크플로우 생성",
      "100개 이상의 타사 앱 연동 (Slack, Gmail 등)",
      "실행 로그 및 에러 모니터링 대시보드",
    ],
    imageSide: "right",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-white overflow-hidden">
      <div className="container-custom">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-32"
        >
          {/* Header */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <motion.div variants={fadeIn}>
              <Badge variant="outline" className="border-brand-blue text-brand-blue font-bold px-4">
                FEATURES
              </Badge>
            </motion.div>
            <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold text-gray-900">
              비즈니스 성장을 위한 <br />
              <span className="text-brand-blue">강력한 핵심 기능</span>
            </motion.h2>
          </div>

          {/* Feature Blocks */}
          <div className="space-y-40">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className={cn(
                  "flex flex-col gap-12 lg:gap-24 items-center",
                  feature.imageSide === "right" ? "lg:flex-row" : "lg:flex-row-reverse"
                )}
              >
                {/* Text Content */}
                <motion.div 
                  variants={fadeIn}
                  className="flex-1 space-y-8"
                >
                  <div className="space-y-4 text-center lg:text-left">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={cn("inline-flex p-3 rounded-2xl mb-2 cursor-pointer transition-colors", feature.bgColor, feature.color)}
                    >
                      <feature.icon size={32} />
                    </motion.div>
                    <Badge variant="secondary" className="block w-fit mx-auto lg:mx-0 font-bold mb-2">
                      {feature.tag}
                    </Badge>
                    <h3 className="text-3xl font-bold text-gray-900">{feature.title}</h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>

                  <ul className="space-y-4">
                    {feature.points.map((point) => (
                      <motion.li 
                        key={point} 
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-3 text-gray-700 cursor-default"
                      >
                        <div className={cn("flex-shrink-0 p-1 rounded-full bg-white shadow-sm border border-gray-100", feature.checkColor)}>
                          <Check size={16} />
                        </div>
                        <span className="font-medium">{point}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <div className="pt-4 flex justify-center lg:justify-start">
                    <button className={cn(
                      "group flex items-center gap-2 font-bold transition-all hover:underline underline-offset-4",
                      feature.color
                    )}>
                      자세히 보기
                      <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </motion.div>

                {/* Visual Content (Mockup Placeholder with Hover) */}
                <motion.div 
                  variants={fadeIn}
                  whileHover={{ scale: 1.02 }}
                  className="flex-1 w-full group cursor-pointer"
                >
                  <div className={cn(
                    "relative aspect-video rounded-3xl shadow-2xl border border-gray-100 p-4 transition-shadow duration-500 group-hover:shadow-brand-blue/10",
                    feature.bgColor.replace("bg-", "bg-opacity-50 ")
                  )}>
                    <div className="w-full h-full bg-white rounded-2xl shadow-inner flex items-center justify-center border border-gray-50 overflow-hidden">
                      {/* Placeholder graphic based on theme */}
                      <div className={cn("w-full h-full flex flex-col p-8 gap-4 opacity-40 transition-opacity duration-500 group-hover:opacity-60", feature.color)}>
                         <div className="h-4 w-1/3 bg-current rounded-full" />
                         <div className="flex-1 w-full border-2 border-dashed border-current rounded-xl flex items-center justify-center">
                            <feature.icon size={64} className="transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3" />
                         </div>
                         <div className="grid grid-cols-2 gap-4">
                            <div className="h-10 bg-current rounded-lg" />
                            <div className="h-10 bg-current rounded-lg" />
                         </div>
                      </div>
                    </div>
                    
                    {/* Decorative element */}
                    <div className={cn(
                      "absolute -bottom-8 -right-8 w-32 h-32 rounded-full blur-3xl opacity-20 transition-all duration-700 group-hover:opacity-40 group-hover:scale-150",
                      feature.bgColor.replace("bg-", "bg-")
                    )} />
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}