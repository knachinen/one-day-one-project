import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LaunchPad MVP - Share Your Ideas",
  description: "LaunchPad MVP is a platform for sharing and collaborating on new ideas. Discover, vote, comment, and contribute to innovative projects.",
  openGraph: {
    title: "LaunchPad MVP - Share Your Ideas",
    description: "LaunchPad MVP is a platform for sharing and collaborating on new ideas. Discover, vote, comment, and contribute to innovative projects.",
    url: "https://launchpad-mvp.vercel.app", // Replace with your actual deployment URL
    siteName: "LaunchPad MVP",
    images: [
      {
        url: "https://launchpad-mvp.vercel.app/og-image.jpg", // Replace with your actual Open Graph image
        width: 1200,
        height: 630,
        alt: "LaunchPad MVP",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LaunchPad MVP - Share Your Ideas",
    description: "LaunchPad MVP is a platform for sharing and collaborating on new ideas. Discover, vote, comment, and contribute to innovative projects.",
    creator: "@yourtwitterhandle", // Replace with your Twitter handle
    images: ["https://launchpad-mvp.vercel.app/og-image.jpg"], // Replace with your actual Twitter image
  },
};

async function getSession() {
  const sessionId = (await cookies()).get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) return null;
  const { user, session } = await lucia.validateSession(sessionId);
  return user;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="relative flex min-h-screen flex-col bg-background">
          <Header user={user} />
          <div className="flex-1">
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
