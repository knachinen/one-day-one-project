"use client";

import React from "react";
import Link from "next/link";
import { Instagram, Youtube, MessageCircle, Headset } from "lucide-react";

const footerLinks = {
  support: [
    { name: "공지사항", href: "#" },
    { name: "자주 묻는 질문", href: "#faq" },
    { name: "1:1 문의", href: "#" },
  ],
  legal: [
    { name: "개인정보처리방침", href: "#", bold: true },
    { name: "서비스 이용약관", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#333333] text-[#AAAAAA] pt-20 pb-10">
      <div className="container-custom space-y-16">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between gap-12">
          {/* Brand Info */}
          <div className="max-w-md space-y-6 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm rotate-45" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                DataFlow
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              우리는 더 나은 디지털 경험을 제공하기 위해 끊임없이 노력합니다. 
              고객의 성공이 우리의 성공입니다. 비즈니스의 미래를 함께 설계하세요.
            </p>
            <div className="flex justify-center lg:justify-start gap-4">
              {[Instagram, MessageCircle, Youtube].map((Icon, i) => (
                <Link 
                  key={i} 
                  href="#" 
                  className="w-10 h-10 bg-[#444444] rounded-lg flex items-center justify-center hover:bg-[#555555] hover:text-white transition-colors"
                >
                  <Icon size={20} />
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-12 text-center lg:text-left">
            <div className="space-y-6">
              <h4 className="font-bold text-white text-base">고객지원</h4>
              <ul className="space-y-4">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="hover:text-white hover:underline underline-offset-4 transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="font-bold text-white text-base">정책 및 약관</h4>
              <ul className="space-y-4">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className={`hover:text-white hover:underline underline-offset-4 transition-colors ${link.bold ? "font-bold text-white" : ""}`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Middle Section: Contact */}
        <div className="pt-12 border-t border-[#444444] flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="flex items-center gap-4 text-center md:text-left">
              <div className="p-3 bg-[#444444] rounded-full text-white">
                <Headset size={24} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider font-bold">고객센터</p>
                <p className="text-xl font-bold text-white">1588-0000</p>
                <p className="text-xs">평일 09:00 - 18:00 (점심시간 12:00 - 13:00)</p>
              </div>
           </div>
           <div className="text-sm text-center md:text-right space-y-1">
              <p>상호명: (주)데이터플로우 | 대표자: 홍길동</p>
              <p>사업자등록번호: 123-45-67890 | 주소: 서울특별시 강남구 테헤란로 123</p>
           </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="pt-8 border-t border-[#444444] flex flex-col items-center justify-center gap-4">
           <p className="text-xs text-center">
              Copyright © 2024 DataFlow. All rights reserved. 
              본 사이트의 모든 콘텐츠는 저작권법의 보호를 받습니다.
           </p>
        </div>
      </div>
    </footer>
  );
}
