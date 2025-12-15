import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer"; // Import the Footer component
import { Toaster } from "@/components/ui/sonner"; // Import Toaster
import Script from "next/script"; // Import Script for GTM

// Configure Inter font
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// Define GTM_ID - REMEMBER TO REPLACE WITH YOUR ACTUAL GTM ID
const GTM_ID = "GTM-XXXXXXX"; 

// Define HOTJAR_ID - REMEMBER TO REPLACE WITH YOUR ACTUAL HOTJAR ID
const HOTJAR_ID = "XXXXXXXX"; 

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
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        `}
      </Script>
      {/* Hotjar Tracking Code (Temporarily commented out) */}
      {/* <Script id="hotjar" strategy="afterInteractive">
        {`
            (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:${HOTJAR_ID},hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        `}
      </Script> */}
      <body className={`${inter.variable} font-inter font-pretendard antialiased pt-[60px] md:pt-[80px]`}>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <Header />
        {children}
        <Footer /> {/* Render the Footer component */}
        <Toaster /> {/* Render the Toaster component */}
      </body>
    </html>
  );
}
