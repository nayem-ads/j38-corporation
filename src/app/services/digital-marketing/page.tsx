import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GrowthAuditForm from '@/components/GrowthAuditForm';

export const metadata: Metadata = {
  title: 'Google Ads & Meta Ads Agency | PPC Management | J38',
  description:
    'Google Ads and Meta Ads management built for leads and ROAS. $60M+ ad spend managed for US and European brands. Get a free ad account audit today.',
  alternates: {
    canonical: '/services/digital-marketing',
  },
};

export default function DigitalMarketingPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'PPC management',
    provider: {
      '@type': 'Organization',
      name: 'J38 Corporation',
      url: 'https://j38.co',
    },
    areaServed: ['US', 'GB', 'EU', 'AU'],
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
              Google Ads &amp; Meta Ads Agency
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] mb-6">
              Google Ads &amp; Meta Ads Agency Focused on Profitable Growth
            </h1>
            <p className="text-lg sm:text-xl text-[#3A3A3A] leading-relaxed mb-8 max-w-3xl">
              Your ad budget should buy customers, not clicks. J38 manages Google Ads, Meta Ads and paid social for businesses in the US and Europe. We optimize every campaign against cost per lead, cost per acquisition and ROAS. Since 2020 we&apos;ve managed $60M+ in ad spend across 1,500+ companies.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#audit"
                className="inline-flex items-center justify-center min-h-[50px] bg-[#0A0A0A] hover:bg-[#0C4137] text-[#F5F5F2] px-7 py-3 rounded-xl text-xs font-bold tracking-[0.1em] uppercase transition-colors"
              >
                Get a Free Ad Account Audit ↗
              </a>
              <Link
                href="/services/marketing-automation"
                className="inline-flex items-center justify-center min-h-[50px] border border-black/20 hover:border-black text-[#0A0A0A] px-6 py-3 rounded-xl text-xs font-bold tracking-[0.1em] uppercase transition-colors"
              >
                See Marketing Automation →
              </Link>
            </div>
          </div>
        </section>

        {/* Paid Media Services */}
        <section className="py-16 sm:py-24 px-4 sm:px-10 lg:px-14">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-bold tracking-[0.2em] uppercase text-[#0C4137] mb-3">
              Services
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Paid Media Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7 shadow-xs">
              <h3 className="text-xl font-bold mb-3">Google Ads Management</h3>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">
                Search, Performance Max, Shopping, Display and YouTube campaigns. Includes keyword research, negative keyword control, bid strategy and conversion tracking. Built to capture buyers already searching for what you sell.
              </p>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7 shadow-xs">
              <h3 className="text-xl font-bold mb-3">Meta Ads Management</h3>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">
                Facebook &amp; Instagram prospecting, retargeting and Advantage+ campaigns with a steady pipeline of tested creative. Lead forms, Messenger/WhatsApp lead flows and catalog ads for e-commerce.
              </p>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7 shadow-xs">
              <h3 className="text-xl font-bold mb-3">Paid Social Beyond Meta</h3>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">
                TikTok, LinkedIn and Pinterest campaigns when your audience lives there. We only recommend a channel if unit economics and data prove profitability.
              </p>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7 shadow-xs">
              <h3 className="text-xl font-bold mb-3">SEO &amp; AI Search Visibility</h3>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">
                Technical SEO, content and link building, plus optimization so your brand shows up prominently in Google AI Overviews and ChatGPT answers.
              </p>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7 shadow-xs">
              <h3 className="text-xl font-bold mb-3">Creative Strategy &amp; Production</h3>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">
                Static, video and UGC-style ads built from hooks, offers and angles that are scientifically tested, not guessed.
              </p>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7 shadow-xs">
              <h3 className="text-xl font-bold mb-3">Tracking, GA4 &amp; Server-Side CAPI</h3>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">
                GA4, Google Tag Manager, Meta Conversions API and server-side tracking, ensuring your algorithms learn from real revenue. Google Consent Mode v2 setups for GDPR markets.
              </p>
            </div>
          </div>
        </section>

        {/* How We Manage Your Ads */}
        <section className="py-16 sm:py-24 px-4 sm:px-10 lg:px-14 border-t border-black/10 bg-[#FAFAF8]">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-bold tracking-[0.2em] uppercase text-[#0C4137] mb-3">
              Process
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              How We Manage Your Ads
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-white border border-black/10 rounded-2xl p-5 shadow-2xs">
              <div className="text-xs font-bold text-[#0C4137] mb-2">01</div>
              <h3 className="text-lg font-bold mb-2">Account Audit</h3>
              <p className="text-sm text-[#3A3A3A]">We find wasted spend, tracking gaps and missed conversion opportunities.</p>
            </div>
            <div className="bg-white border border-black/10 rounded-2xl p-5 shadow-2xs">
              <div className="text-xs font-bold text-[#0C4137] mb-2">02</div>
              <h3 className="text-lg font-bold mb-2">Plan</h3>
              <p className="text-sm text-[#3A3A3A]">Budget split, campaign structure, offers and KPI targets, agreed in writing.</p>
            </div>
            <div className="bg-white border border-black/10 rounded-2xl p-5 shadow-2xs">
              <div className="text-xs font-bold text-[#0C4137] mb-2">03</div>
              <h3 className="text-lg font-bold mb-2">Build</h3>
              <p className="text-sm text-[#3A3A3A]">Campaigns, audiences, creative angles and dedicated landing pages.</p>
            </div>
            <div className="bg-white border border-black/10 rounded-2xl p-5 shadow-2xs">
              <div className="text-xs font-bold text-[#0C4137] mb-2">04</div>
              <h3 className="text-lg font-bold mb-2">Optimize Weekly</h3>
              <p className="text-sm text-[#3A3A3A]">Search terms, negative lists, bid adjustments, creative fatigue and audience shifts.</p>
            </div>
            <div className="bg-white border border-black/10 rounded-2xl p-5 shadow-2xs">
              <div className="text-xs font-bold text-[#0C4137] mb-2">05</div>
              <h3 className="text-lg font-bold mb-2">Report</h3>
              <p className="text-sm text-[#3A3A3A]">Plain-English reporting on leads, sales, cost per acquisition and next steps.</p>
            </div>
          </div>
        </section>

        {/* Who This Is For */}
        <section className="py-16 sm:py-24 px-4 sm:px-10 lg:px-14 border-t border-black/10">
          <div className="max-w-4xl mx-auto bg-white border border-black/10 rounded-3xl p-8 sm:p-12 shadow-sm">
            <div className="text-xs font-bold tracking-[0.2em] uppercase text-[#0C4137] mb-3">
              Fit &amp; Requirements
            </div>
            <h2 className="text-2xl sm:text-4xl font-black mb-4">Who This Is For</h2>
            <p className="text-base sm:text-lg text-[#3A3A3A] leading-relaxed mb-6">
              Businesses spending $2,000+/month on ads, or ready to. Service businesses that need booked calls, and e-commerce brands that need profitable ROAS. Also ideal for marketing teams whose current agency reports clicks instead of revenue.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="bg-[#F5F5F2] border border-black/10 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">Home Services Contractors</span>
              <span className="bg-[#F5F5F2] border border-black/10 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">Shopify &amp; DTC Brands</span>
              <span className="bg-[#F5F5F2] border border-black/10 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">B2B &amp; Professional Services</span>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 sm:py-24 px-4 sm:px-10 lg:px-14 border-t border-black/10 bg-[#FAFAF8]">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Paid Ads FAQ</h2>
          </div>
          <div className="max-w-3xl flex flex-col gap-6">
            <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-xs">
              <h3 className="font-bold text-base mb-2">How much does Google Ads management cost?</h3>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">
                Management models typically feature a flat monthly management fee plus performance tiers for scaling ad accounts. Ad spend is always paid directly to Google or Meta through your own billing account.
              </p>
            </div>
            <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-xs">
              <h3 className="font-bold text-base mb-2">Google Ads or Meta Ads: which is better for my business?</h3>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">
                Google Ads captures people already searching, so it suits urgent or high-intent services. Meta Ads creates demand through targeting and creative, so it suits e-commerce and visual offers. Most growing businesses use both.
              </p>
            </div>
            <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-xs">
              <h3 className="font-bold text-base mb-2">Do I keep ownership of my ad accounts?</h3>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">
                Yes. Campaigns run in ad accounts you own 100%, and our strategists work through partner access. You retain all data, creative assets, and pixel learnings.
              </p>
            </div>
            <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-xs">
              <h3 className="font-bold text-base mb-2">Can you take over an existing account?</h3>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">
                Yes. We begin with a deep audit, preserve and protect historical winner campaigns, and rebuild the underperforming components.
              </p>
            </div>
          </div>
        </section>

        {/* Audit Form */}
        <section id="audit" className="py-16 sm:py-24 px-4 sm:px-10 lg:px-14 border-t border-black/10 flex flex-col items-center">
          <div className="max-w-2xl text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-black mb-3">Request Your Free Ad Account Audit</h2>
            <p className="text-base text-[#55575A]">Find out where your ad spend is leaking and what to fix first.</p>
          </div>
          <GrowthAuditForm />
        </section>
      </main>

      <Footer />
    </div>
  );
}
