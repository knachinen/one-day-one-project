import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Providers } from '@/components/Providers';

const notoSansKr = Noto_Sans_KR({
  weight: ['400', '500', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans-kr',
});

export const metadata: Metadata = {
  title: 'My Portfolio',
  description: 'Interactive portfolio for a solo entrepreneur',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${notoSansKr.variable} antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "알렉스 (Alex)",
              "url": "https://yourportfolio.com", // Replace with actual portfolio URL
              "sameAs": [
                "https://github.com/yourusername", // Replace with actual GitHub profile
                "https://linkedin.com/in/yourprofile", // Replace with actual LinkedIn profile
                "https://yourblog.com" // Replace with actual blog/other social
              ],
              "jobTitle": "Creative Developer & Designer",
              "worksFor": {
                "@type": "Organization",
                "name": "Freelance"
              }
            })
          }}
        />
      </head>
      <body>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
