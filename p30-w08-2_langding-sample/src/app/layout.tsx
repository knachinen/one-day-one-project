import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-noto-sans-kr",
});

export const metadata: Metadata = {
  title: "Personal Portfolio",
  description: "Minimalist & Simple Personal Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={notoSansKr.variable}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}