import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import MobileNav from '@/components/MobileNav';
import { GroupProvider } from '@/context/GroupContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Togethering",
  description: "Small group project and schedule management service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <GroupProvider>
          <Header />

          <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1 p-4 pb-16">{children}</main> {/* Added pb-16 for mobile nav */}
          </div>

          <MobileNav />
        </GroupProvider>
      </body>
    </html>
  );
}


