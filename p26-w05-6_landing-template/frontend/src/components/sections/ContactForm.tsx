"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { fadeIn, staggerContainer } from "@/constants/animations";

const formSchema = z.object({
  name: z.string().min(2, "이름은 2글자 이상이어야 합니다.").max(100),
  email: z.string().email("올바른 이메일 형식이 아닙니다."),
  phone: z.string().optional(),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:3001/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("상담 신청 중 오류가 발생했습니다.");
      }

      setIsSuccess(true);
      reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-gray-50 overflow-hidden">
      <div className="container-custom">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left side: Text */}
            <div className="space-y-8">
              <motion.div variants={fadeIn}>
                <Badge variant="primary" className="bg-brand-blue text-white px-4 py-1">
                  CONSULTATION
                </Badge>
              </motion.div>
              <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                비즈니스의 성장을 위한 <br />
                <span className="text-brand-blue">맞춤형 상담</span>을 신청하세요
              </motion.h2>
              <motion.p variants={fadeIn} className="text-lg text-gray-600 leading-relaxed">
                전문가와 함께 현재 비즈니스의 상태를 진단하고, 
                DataFlow를 통해 어떻게 효율을 극대화할 수 있을지 알아보세요.
              </motion.p>
              
              <motion.div variants={fadeIn} className="space-y-4 pt-4">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-brand-blue">
                       <CheckCircle2 size={20} />
                    </div>
                    <p className="font-medium text-gray-700">도입 첫 달 20% 할인 혜택</p>
                 </div>
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-brand-blue">
                       <CheckCircle2 size={20} />
                    </div>
                    <p className="font-medium text-gray-700">전문가의 비즈니스 진단 리포트 제공</p>
                 </div>
              </motion.div>
            </div>

            {/* Right side: Form */}
            <motion.div variants={fadeIn} className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100">
              {isSuccess ? (
                <div className="text-center space-y-6 py-8">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 size={40} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-gray-900">신청이 완료되었습니다!</h3>
                    <p className="text-gray-500">담당자가 확인 후 빠른 시일 내에 연락드리겠습니다.</p>
                  </div>
                  <Button variant="outline" onClick={() => setIsSuccess(false)} className="w-full">
                    추가 신청하기
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700 ml-1">성함 *</label>
                    <Input 
                      placeholder="홍길동" 
                      {...register("name")} 
                      error={errors.name?.message}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700 ml-1">이메일 *</label>
                    <Input 
                      placeholder="example@company.com" 
                      {...register("email")} 
                      error={errors.email?.message}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700 ml-1">연락처</label>
                    <Input 
                      placeholder="010-0000-0000" 
                      {...register("phone")} 
                      error={errors.phone?.message}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700 ml-1">문의 내용</label>
                    <textarea 
                      className="flex min-h-[120px] w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue transition-all placeholder:text-gray-400"
                      placeholder="궁금한 점을 자유롭게 남겨주세요."
                      {...register("message")}
                    />
                  </div>
                  
                  {error && (
                    <p className="text-sm text-brand-error font-medium text-center">{error}</p>
                  )}

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full mt-4" 
                    isLoading={isSubmitting}
                  >
                    <Send size={18} className="mr-2" />
                    상담 신청하기
                  </Button>
                  <p className="text-center text-xs text-gray-400">
                    개인정보 보호를 위해 입력하신 정보는 상담 목적으로만 사용됩니다.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
