import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — J38 Corporation',
  description: 'Privacy Policy and data practices for J38 Corporation.',
};

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p className="text-sm text-[#777777] mb-10">Last updated: November 2026</p>

        <div className="prose prose-neutral max-w-none flex flex-col gap-8 text-base text-[#2A2A2A] leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-[#0A0A0A] mb-3">1. Information We Collect</h2>
            <p>
              When you submit a growth audit request on our website, we collect personal and business information that you voluntarily provide, including:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Full name and job role/company name</li>
              <li>Work email address and phone or WhatsApp contact details</li>
              <li>Website URL and advertising/marketing metrics</li>
              <li>Target market, growth objectives, and approximate monthly advertising budget</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0A0A0A] mb-3">2. How We Use Your Information</h2>
            <p>
              We use the collected information exclusively to:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Conduct and deliver customized growth audits, ad account analyses, and landing page reviews.</li>
              <li>Communicate directly regarding audit findings, strategic recommendations, and potential collaboration.</li>
              <li>Maintain administrative and security logging for quality assurance.</li>
            </ul>
            <p className="mt-2">
              We do not sell, rent, or trade your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0A0A0A] mb-3">3. Tracking &amp; Analytics</h2>
            <p>
              We may utilize standard web analytics (such as Google Analytics or Meta Pixel) to monitor overall website performance, aggregate traffic, and conversion funnels. These tools collect anonymized browser data, device types, and page views. You may opt out of tracking cookies via your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0A0A0A] mb-3">4. Data Security &amp; Retention</h2>
            <p>
              We take reasonable administrative and technical precautions to safeguard the personal information submitted through our site. We retain inquiry information only as long as necessary to fulfill business interactions or comply with legal requirements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0A0A0A] mb-3">5. Your Rights &amp; Contact</h2>
            <p>
              You have the right to request access, correction, or deletion of the personal data you have provided to us. If you have any questions about this Privacy Policy or wish to exercise your rights, please reach out to us:
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
