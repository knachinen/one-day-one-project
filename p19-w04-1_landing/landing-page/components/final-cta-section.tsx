"use client";

import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner"; // Assuming sonner is installed for toast notifications

// Define Zod schema for form validation
const formSchema = z.object({
  email: z.string().email({
    message: "유효한 이메일 주소를 입력해주세요.",
  }).min(1, {
    message: "이메일 주소를 입력해주세요.",
  }),
});

export default function FinalCtaSection() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Simulate API call
    console.log("Form submitted:", values);
    toast("가입 신청 완료!", {
      description: "워크숍 소식을 가장 먼저 받아보세요.",
      action: {
        label: "확인",
        onClick: () => console.log("Toast confirmed"),
      },
    });

    // Here you would typically send data to your API endpoint
    // For example:
    // const response = await fetch('/api/signup', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(values),
    // });
    // const data = await response.json();
    // if (data.success) {
    //   toast("가입 신청 완료!", { ... });
    // } else {
    //   toast.error("가입 신청 실패!", { ... });
    // }

    form.reset(); // Clear the form after submission
  }

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

        {/* Form Area */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 flex flex-col sm:flex-row justify-center items-start gap-4 max-w-lg mx-auto">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-grow w-full">
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="이메일 주소를 입력하세요"
                      className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-vibe-blue"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-left" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="bg-gradient-to-r from-vibe-blue to-energy-orange hover:from-vibe-blue/90 hover:to-energy-orange/90 text-white font-bold py-3 px-8 rounded-full text-lg whitespace-nowrap"
            >
              무료로 시작하기 →
            </Button>
          </form>
        </Form>

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
