import type { Metadata } from "next";
import { Orbitron, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

// Using Inter as fallback for Pretendard
const pretendard = Inter({
  variable: "--font-pretendard",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Futurist Artist | Next Senses",
  description: "인공지능과 가상 현실의 융합을 통해 인류의 다음 감각을 설계하는 퓨처리스트 아티스트의 포트폴리오입니다.",
  openGraph: {
    title: "Futurist Artist Portfolio",
    description: "Designing the next senses for humanity.",
    images: ["/og-image.png"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${orbitron.variable} ${pretendard.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
