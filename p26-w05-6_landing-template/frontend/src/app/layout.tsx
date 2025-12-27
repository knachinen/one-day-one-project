import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const siteConfig = {
  title: "DataFlow - 데이터 관리의 가장 쉬운 방법",
  description: "복잡한 데이터 분석과 보고서 작성을 단 몇 분 만에. DataFlow로 비즈니스 성장을 가속화하세요.",
  url: "https://dataflow.example.com",
  ogImage: "https://dataflow.example.com/og-image.png",
  gaId: "G-XXXXXXXXXX", // Replace with actual Measurement ID
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | DataFlow`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: "DataFlow",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "DataFlow Dashboard Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased font-sans text-gray-900 bg-white">
        {children}
      </body>
      <GoogleAnalytics gaId={siteConfig.gaId} />
    </html>
  );
}
