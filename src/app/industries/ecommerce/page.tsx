import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GrowthAuditForm from '@/components/GrowthAuditForm';

export const metadata: Metadata = {
  title: 'Ecommerce Marketing Agency | Shopify & Meta Ads | J38',
  description:
    'Profitable growth for Shopify and DTC brands: Meta Ads, Google Shopping, creative and CRO. Selling in the US and Europe? Get a free store and ads audit.',
  alternates: {
    canonical: '/industries/ecommerce',
  },
};

export default function EcommerceIndustryPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Ecommerce Marketing',
    audience: {
      '@type': 'Audience',
      audienceType: 'Ecommerce & DTC Brands',
    },
    provider: {
      '@type': 'Organization',
      name: 'J38 Corporation',
      url: 'https://j38.co',
    },
  };

  return (
    <div className="min-h-screen bg-[#F5F5F2] text-[#0A0A0A] font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      <main>
        {/* Hero */}
        <section className="py-16 sm:py-24 px-4 sm:px-10 lg:px-14 border-b border-black/10 bg-white/60">
          <div className="max-w-4xl">
            <div className="text-xs font-bold tracking-[0.2em] uppercase text-[#0C4137] mb-3">
              Shopify &amp; DTC Growth
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] mb-6">
              Ecommerce Marketing Agency for Shopify and DTC Brands
            </h1>
            <p className="text-lg sm:text-xl text-[#3A3A3A] leading-relaxed mb-8 max-w-3xl">
              Revenue is easy to buy. Profitable revenue isn&apos;t. J38 grows e-commerce brands with Meta Ads, Google Shopping and Performance Max, creative testing and store CRO. Every decision is measured against ROAS, contribution margin and new-customer growth.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#audit"
                className="inline-flex items-center justify-center min-h-[50px] bg-[#0A0A0A] hover:bg-[#0C4137] text-[#F5F5F2] px-7 py-3 rounded-xl text-xs font-bold tracking-[0.1em] uppercase transition-colors"
              >
                Get a Free Store &amp; Ads Audit ↗
              </a>
              <Link
                href="/services/digital-marketing"
                className="inline-flex items-center justify-center min-h-[50px] border border-black/20 hover:border-black text-[#0A0A0A] px-6 py-3 rounded-xl text-xs font-bold tracking-[0.1em] uppercase transition-colors"
              >
                See Paid Media Management →
              </Link>
            </div>
          </div>
        </section>

        {/* E-commerce Services */}
        <section className="py-16 sm:py-24 px-4 sm:px-10 lg:px-14">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-bold tracking-[0.2em] uppercase text-[#0C4137] mb-3">
              Specialized Solutions
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">E-commerce Services</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7 shadow-xs">
              <h3 className="text-xl font-bold mb-3">Meta Ads for E-Commerce</h3>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">
                Prospecting, Advantage+ Shopping campaigns and dynamic catalog retargeting, fueled by a steady pipeline of tested UGC, static, and motion creative.
              </p>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7 shadow-xs">
              <h3 className="text-xl font-bold mb-3">Google Shopping &amp; Performance Max</h3>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">
                Feed optimization, custom label product segmentation by margin, and search campaigns that capture branded and category purchase intent.
              </p>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7 shadow-xs">
              <h3 className="text-xl font-bold mb-3">Creative Production</h3>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">
                UGC-style video, creator partnerships, static image ads and product shots built around high-converting angles and direct-response hooks.
              </p>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7 shadow-xs">
              <h3 className="text-xl font-bold mb-3">Shopify CRO</h3>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">
                Product detail page (PDP), cart slide-out and checkout improvements that systematically raise conversion rate and average order value (AOV).
              </p>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7 shadow-xs">
              <h3 className="text-xl font-bold mb-3">Email &amp; SMS Retention Flows</h3>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">
                Klaviyo welcome series, browse abandonment, abandoned checkout, post-purchase and win-back flows that generate predictable repeat revenue.
              </p>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7 shadow-xs">
              <h3 className="text-xl font-bold mb-3">International Expansion</h3>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">
                Campaign structures, multi-currency pricing, and localized ad copy tailored to scale brands seamlessly across the US, UK, and European markets.
              </p>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="py-16 sm:py-24 px-4 sm:px-10 lg:px-14 border-t border-black/10 bg-[#FAFAF8]">
          <div className="max-w-4xl mx-auto bg-white border border-black/10 rounded-3xl p-8 sm:p-12 shadow-sm">
            <div className="text-xs font-bold tracking-[0.2em] uppercase text-[#0C4137] mb-2">
              DTC Growth Milestone
            </div>
            <div className="text-3xl sm:text-4xl font-black mb-3">3X Blended ROAS at Scale</div>
            <p className="text-base sm:text-lg text-[#3A3A3A] leading-relaxed">
              International customer acquisition scaled with multi-channel paid social, creative diversification, and Shopify store speed optimization, achieving stable 3X return on ad spend while expanding from the US into the UK and Europe.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 sm:py-24 px-4 sm:px-10 lg:px-14 border-t border-black/10">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">E-Commerce FAQ</h2>
          </div>
          <div className="max-w-3xl flex flex-col gap-6">
            <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-xs">
              <h3 className="font-bold text-base mb-2">What&apos;s a good ROAS for e-commerce?</h3>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">
                It depends entirely on your product margins. A brand with 70% gross margins can scale aggressively and profitably at a 2.0 ROAS, whereas a 30% margin brand requires 3.5+. We set targets based on contribution margin and break-even math, not generic averages.
              </p>
            </div>
            <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-xs">
              <h3 className="font-bold text-base mb-2">Can you help us sell into Europe or the US?</h3>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">
                Yes. We plan cross-border market entry, localize creative nuances, set up international domains/currencies, and ensure full GDPR and Consent Mode v2 compliance.
              </p>
            </div>
          </div>
        </section>

        {/* Audit Form */}
        <section id="audit" className="py-16 sm:py-24 px-4 sm:px-10 lg:px-14 border-t border-black/10 flex flex-col items-center">
          <div className="max-w-2xl text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-black mb-3">Request a Free Store &amp; Ad Audit</h2>
            <p className="text-base text-[#55575A]">We will analyze your ad accounts, product page conversion rate, and tracking accuracy.</p>
          </div>
          <GrowthAuditForm />
        </section>
      </main>

      <Footer />
    </div>
  );
}
