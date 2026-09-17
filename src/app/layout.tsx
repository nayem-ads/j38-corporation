import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "J38 Corporation — Built for What's Next",
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
    'Audit',
  ],
  authors: [{ name: 'J38 Corporation' }],
  openGraph: {
    title: "J38 Corporation — Built for What's Next",
    description:
      'We combine strategy, creativity, technology and intelligent systems to build businesses designed for growth.',
    type: 'website',
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
