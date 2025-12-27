"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, CheckCircle2, AlertCircle, Clock, Database, CreditCard } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { fadeIn, staggerContainer } from "@/constants/animations";

const solutions = [
  {
    title: "시간 관리",
    icon: Clock,
    before: {
      title: "수동 작업의 늪",
      desc: "반복적인 수동 작업과 복잡한 일정 조율로 소중한 시간이 낭비됩니다.",
    },
    after: {
      title: "AI 기반 자동화",
      desc: "AI 기반 자동 배정 시스템으로 업무 시간을 50% 이상 단축하세요.",
    },
  },
  {
    title: "데이터 정확성",
    icon: Database,
    before: {
      title: "휴먼 에러의 발생",
      desc: "수기 입력으로 인해 발생하는 크고 작은 데이터 오류가 신뢰를 떨어뜨립니다.",
    },
    after: {
      title: "실시간 클라우드 동기화",
      desc: "100% 정확한 데이터 보장을 통해 비즈니스 의사결정의 신뢰도를 높입니다.",
    },
  },
  {
    title: "비용 효율",
    icon: CreditCard,
    before: {
      title: "과도한 구축 비용",
      desc: "복잡한 인프라 구축과 유지보수 비용은 스타트업에게 큰 부담이 됩니다.",
    },
    after: {
      title: "합리적인 구독 모델",
      desc: "초기 구축 비용 없이 월 구독만으로 전문적인 기능을 모두 활용하세요.",
    },
  },
];

export function ProblemSolution() {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="container-custom">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-16"
        >
          {/* Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <motion.div variants={fadeIn}>
              <Badge variant="primary" className="bg-[#E7F1FF] text-brand-blue uppercase tracking-widest px-4 py-1">
                Problem & Solution
              </Badge>
            </motion.div>
            <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              기존의 불편함을 해결하는 <br />
              <span className="text-brand-blue">확실한 해결책</span>을 경험하세요
            </motion.h2>
            <motion.p variants={fadeIn} className="text-lg text-gray-600">
              더 이상 복잡한 과정에 시간을 낭비하지 마세요. DataFlow가 비즈니스의 성장을 가로막는 문제들을 해결해 드립니다.
            </motion.p>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {solutions.map((item, index) => (
              <motion.div
                key={item.title}
                variants={fadeIn}
                custom={index}
                className="flex flex-col gap-4"
              >
                {/* Title & Icon */}
                <div className="flex items-center gap-3 mb-2 px-2">
                  <div className="p-2 bg-blue-50 rounded-lg text-brand-blue">
                    <item.icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                </div>

                {/* Before Card */}
                <div className="relative p-6 bg-[#F8F9FA] rounded-2xl border border-gray-100">
                  <Badge className="absolute top-4 right-4 bg-gray-200 text-gray-600 border-0">BEFORE</Badge>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-400">
                      <AlertCircle size={18} />
                      <h4 className="font-bold">{item.before.title}</h4>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.before.desc}</p>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center text-brand-blue">
                  <ArrowDown size={24} />
                </div>

                {/* After Card */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="relative p-6 bg-white rounded-2xl border-2 border-brand-blue shadow-[0_10px_30px_rgba(0,123,255,0.1)]"
                >
                  <Badge className="absolute top-4 right-4 bg-brand-blue text-white border-0">AFTER</Badge>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-brand-blue">
                      <CheckCircle2 size={18} />
                      <h4 className="font-bold">{item.after.title}</h4>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed font-medium">{item.after.desc}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Footer CTA */}
          <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button size="lg" className="px-10">무료로 체험하기</Button>
            <Button variant="ghost" className="text-gray-500 font-medium">서비스 문의하기 &rarr;</Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
