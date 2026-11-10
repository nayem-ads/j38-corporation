import type { Metadata } from 'next';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://j38-corporation-production-fa08.up.railway.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "J38 Corporation — Built for What's Next",
    template: "%s | J38 Corporation",
  },
  description:
    'We combine strategy, creativity, technology and intelligent systems to build businesses designed for growth. Digital Marketing • AI • Automation • Branding • Web Solutions.',
  keywords: [
    'Digital Marketing',
    'AI Solutions',
    'Automation',
    'Branding',
    'Web Solutions',
    'J38 Corporation',
    'Growth Agency',
    'Free Growth Audit',
  ],
  authors: [{ name: 'J38 Corporation' }],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "J38 Corporation — Built for What's Next",
    description:
      'We combine strategy, creativity, technology and intelligent systems to build businesses designed for growth.',
    url: siteUrl,
    siteName: 'J38 Corporation',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "J38 Corporation — Built for What's Next",
    description:
      'We combine strategy, creativity, technology and intelligent systems to build businesses designed for growth.',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/logo-black.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-[#F5F5F2] text-[#0A0A0A] font-sans selection:bg-[#06D6A0] selection:text-[#0A0A0A]">
        {children}
      </body>
    </html>
  );
}
