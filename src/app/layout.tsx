import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import './workshop.css';
import { workshopConfig } from '../config/workshopConfig';

export const metadata: Metadata = {
  title: `${workshopConfig.title} | Live Workshop by Karan`,
  description: `${workshopConfig.tagline} ${workshopConfig.subheadline}`,
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: `${workshopConfig.title} | Live Workshop with Karan (@karansinghh.ai)`,
    description: `${workshopConfig.tagline} 3-hour live Google Meet session. Live code teardowns, templates, and guidebook for ₹599.`,
    url: 'https://karansinghh.ai',
    siteName: 'Fix Your AI Websites Live',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/opengraph-image-pwu6ef.png',
        width: 1200,
        height: 675,
        alt: `${workshopConfig.title} | Live Workshop with Karan`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${workshopConfig.title} | Live Workshop by Karan`,
    description: `${workshopConfig.tagline} 3-hour live Google Meet session on Saturday.`,
    images: ['/opengraph-image-pwu6ef.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(){try{var d=document.documentElement;d.classList.add('dark');d.style.colorScheme='dark';}catch(e){}}()`,
          }}
        />
      </head>
      <body className="home bg-[#0A0A0A] text-gray-100 font-sans antialiased">
        {children}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
