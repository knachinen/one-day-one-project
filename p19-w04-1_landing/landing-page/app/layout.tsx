import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer"; // Import the Footer component
import { Toaster } from "@/components/ui/sonner"; // Import Toaster

// Configure Inter font
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// Define Metadata
export const metadata: Metadata = {
  title: "바이브코딩 워크숍 랜딩 페이지",
  description: "코딩 몰라도 3시간이면 당신의 아이디어가 앱이 됩니다. 바이브코딩과 함께 오늘 당장 MVP를 만들어보세요!",
  metadataBase: new URL('https://your-domain.com'), // Replace with actual domain
  openGraph: {
    title: "바이브코딩 워크숍 | 코딩 없이 3시간 만에 나만의 앱 만들기",
    description: "코딩 지식 없이도 아이디어를 현실로! 바이브코딩 워크숍에서 나만의 MVP 앱을 만들고 커뮤니티에 참여하세요.",
    url: "https://your-domain.com", // Replace with actual domain
    siteName: "VibeCoding Workshop",
    images: [
      {
        url: "https://your-domain.com/og-image.jpg", // Replace with actual OG image
        width: 1200,
        height: 630,
        alt: "VibeCoding Workshop Landing Page",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "바이브코딩 워크숍 | 코딩 없이 3시간 만에 나만의 앱 만들기",
    description: "코딩 지식 없이도 아이디어를 현실로! 바이브코딩 워크숍에서 나만의 MVP 앱을 만들고 커뮤니티에 참여하세요.",
    creator: "@VibeCoding", // Replace with actual Twitter handle
    images: ["https://your-domain.com/twitter-image.jpg"], // Replace with actual Twitter image
  },
};

// Define Viewport for responsiveness
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${inter.variable} font-inter font-pretendard antialiased pt-[60px] md:pt-[80px]`}>
        <Header />
        {children}
        <Footer /> {/* Render the Footer component */}
        <Toaster /> {/* Render the Toaster component */}
      </body>
    </html>
  );
}
