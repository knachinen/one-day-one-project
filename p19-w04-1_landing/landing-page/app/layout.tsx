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
  title: "VibeCoding Landing Page",
  description: "Interactive landing page for VibeCoding Workshop",
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
