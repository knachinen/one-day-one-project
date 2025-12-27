"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { fadeIn, staggerContainer } from "@/constants/animations";

const faqs = [
  {
    question: "서비스 이용료는 어떻게 되나요?",
    answer: "DataFlow는 비즈니스 규모에 맞는 다양한 요금제를 제공합니다. 무료 체험판으로 시작하여 필요에 따라 베이직, 프로, 엔터프라이즈 요금제로 전환하실 수 있습니다. 자세한 내용은 요금제 페이지에서 확인 가능합니다.",
  },
  {
    question: "결제 수단을 변경하고 싶어요.",
    answer: "마이페이지 > 결제 관리 메뉴에서 언제든지 신용카드 또는 계좌 이체 정보를 업데이트하실 수 있습니다. 변경된 정보는 다음 결제 주기부터 즉시 적용됩니다.",
  },
  {
    question: "회원 탈퇴는 어떻게 하나요?",
    answer: "설정 > 계정 관리 하단에서 탈퇴 신청이 가능합니다. 탈퇴 시 모든 데이터는 안전하게 삭제되며, 유료 구독 중인 경우 남은 기간에 대한 환불 정책에 따라 처리가 진행됩니다.",
  },
  {
    question: "고객 센터 운영 시간은 언제인가요?",
    answer: "평일 오전 9시부터 오후 6시까지 실시간 채팅 상담과 전화 상담을 운영하고 있습니다. 주말 및 공휴일에는 이메일 문의를 남겨주시면 영업일 기준 24시간 이내에 답변을 드립니다.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-white overflow-hidden">
      <div className="container-custom">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto space-y-16"
        >
          {/* Header */}
          <div className="text-center space-y-4">
            <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold text-gray-900">
              자주 묻는 질문
            </motion.h2>
            <motion.p variants={fadeIn} className="text-lg text-gray-600">
              DataFlow에 대해 궁금해하시는 질문들을 모았습니다.
            </motion.p>
          </div>

          {/* Accordion */}
          <motion.div variants={fadeIn} className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={cn(
                  "border rounded-2xl overflow-hidden transition-all duration-300",
                  openIndex === index 
                    ? "border-brand-blue shadow-md" 
                    : "border-gray-200 hover:border-gray-300"
                )}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <div className="flex items-center gap-4">
                    <span className={cn(
                      "font-bold text-lg",
                      openIndex === index ? "text-brand-blue" : "text-gray-400"
                    )}>
                      Q
                    </span>
                    <span className="font-bold text-gray-900 md:text-lg">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown 
                    className={cn(
                      "text-gray-400 transition-transform duration-300",
                      openIndex === index && "rotate-180 text-brand-blue"
                    )} 
                    size={24} 
                  />
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-0 ml-7 border-t border-gray-50 mt-[-1px]">
                        <p className="text-gray-600 leading-relaxed pt-4">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>

          {/* Call to Action Banner */}
          <motion.div 
            variants={fadeIn}
            className="relative bg-gray-900 rounded-3xl p-8 md:p-12 overflow-hidden"
          >
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 blur-3xl rounded-full -translate-x-1/2 translate-y-1/2" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left space-y-3">
                <h3 className="text-2xl md:text-3xl font-bold text-white">
                  아직 궁금한 점이 있으신가요?
                </h3>
                <p className="text-gray-400">
                  고객지원팀이 여러분의 성공을 위해 대기하고 있습니다.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <Button size="lg" className="shadow-lg shadow-brand-blue/20">
                  <MessageSquare size={18} className="mr-2" />
                  문의하기
                </Button>
                <Button variant="outline" size="lg" className="border-gray-700 text-white hover:bg-gray-800">
                  <Mail size={18} className="mr-2" />
                  이메일 보내기
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
