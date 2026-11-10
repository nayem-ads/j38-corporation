import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — J38 Corporation',
  description: 'Terms of Service and conditions for J38 Corporation.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F2] text-[#0A0A0A] font-sans">
      <header className="sticky top-0 z-40 bg-[#F5F5F2]/90 backdrop-blur-md border-b border-black/10">
        <div className="flex items-center justify-between py-4 px-4 sm:px-10 lg:px-14">
          <Link href="/" aria-label="J38 Corporation home">
            <Image
              src="/logo-black.png"
              alt="J38 Corporation"
              width={1541}
              height={178}
              priority
              className="h-5 sm:h-6 w-auto block object-contain"
            />
          </Link>
          <Link
            href="/#j38-audit"
            className="inline-flex items-center justify-center min-h-[42px] bg-[#0A0A0A] hover:bg-[#0C4137] text-[#F5F5F2] px-4 py-2 rounded-xl text-xs font-bold tracking-[0.1em] uppercase transition-colors"
          >
            Get Free Audit ↗
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto py-12 sm:py-20 px-4 sm:px-6">
        <div className="text-xs font-bold tracking-[0.2em] text-[#0C4137] uppercase mb-3">
          Legal
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-4">
          Terms of Service
        </h1>
        <p className="text-sm text-[#777777] mb-10">Last updated: November 2026</p>

        <div className="prose prose-neutral max-w-none flex flex-col gap-8 text-base text-[#2A2A2A] leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-[#0A0A0A] mb-3">1. Agreement to Terms</h2>
            <p>
              By accessing our website and requesting services, audits, or consulting from J38 Corporation (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;), you agree to abide by these Terms of Service. If you do not agree with any part of these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0A0A0A] mb-3">2. Growth Audits &amp; Advisory Services</h2>
            <p>
              Free growth audits provided through our platform are provided for informational and preliminary diagnostic purposes. While our strategies and diagnostics draw upon verified industry best practices, performance metrics and projections are estimates based on supplied data and market conditions, and do not constitute a guarantee of future revenue or conversion rates.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0A0A0A] mb-3">3. Intellectual Property</h2>
            <p>
              All branding, logos, trademarks, website design, 3D graphics, code, and content displayed on this website are the intellectual property of J38 Corporation or their respective owners and are protected by applicable copyright and trademark laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0A0A0A] mb-3">4. Limitation of Liability</h2>
            <p>
              In no event shall J38 Corporation, its officers, or contractors be liable for any indirect, incidental, or consequential damages arising out of the use or inability to use the recommendations provided in an audit or consultation, except where strictly prohibited by law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0A0A0A] mb-3">5. Inquiries &amp; Contact</h2>
            <p>
              For legal inquiries, partnership proposals, or questions regarding these terms, please reach out directly:
            </p>
            <p className="mt-2 font-medium">
              Email:{' '}
              <a href="mailto:raselrehman222@gmail.com" className="text-[#0C4137] underline">
                raselrehman222@gmail.com
              </a>
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-black/10 py-8 px-4 sm:px-10 text-center text-sm text-[#777777]">
        © J38 Corporation • Built for What&apos;s Next.
      </footer>
    </div>
  );
}
