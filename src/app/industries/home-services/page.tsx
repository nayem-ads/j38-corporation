import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GrowthAuditForm from '@/components/GrowthAuditForm';

export const metadata: Metadata = {
  title: 'Marketing Agency for Contractors & Home Services | J38',
  description:
    'Google Ads, Meta Ads and landing pages that book jobs for remodelers, roofers, painters and home service contractors. Get a free lead-gen audit today.',
  alternates: {
    canonical: '/industries/home-services',
  },
};

export default function HomeServicesIndustryPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Contractor Marketing',
    audience: {
      '@type': 'Audience',
      audienceType: 'Home Service Contractors',
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
              Home Services &amp; Contractors
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] mb-6">
              Marketing Agency for Contractors and Home Service Businesses
            </h1>
            <p className="text-lg sm:text-xl text-[#3A3A3A] leading-relaxed mb-8 max-w-3xl">
              You don&apos;t need more clicks. You need booked estimates from homeowners who can afford the job. J38 runs Google Ads, Meta Ads and high-converting landing pages for remodelers, roofers, painters and home service contractors in the US.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#audit"
                className="inline-flex items-center justify-center min-h-[50px] bg-[#0A0A0A] hover:bg-[#0C4137] text-[#F5F5F2] px-7 py-3 rounded-xl text-xs font-bold tracking-[0.1em] uppercase transition-colors"
              >
                Get a Free Lead-Gen Audit ↗
              </a>
              <Link
                href="/services/digital-marketing"
                className="inline-flex items-center justify-center min-h-[50px] border border-black/20 hover:border-black text-[#0A0A0A] px-6 py-3 rounded-xl text-xs font-bold tracking-[0.1em] uppercase transition-colors"
              >
                Explore Paid Media →
              </Link>
            </div>
          </div>
        </section>

        {/* Who We Work With */}
        <section className="py-16 sm:py-24 px-4 sm:px-10 lg:px-14">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-bold tracking-[0.2em] uppercase text-[#0C4137] mb-3">
              Specialized Trades
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Who We Work With</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Kitchen & Bathroom Remodelers', desc: 'High-ticket interior remodels requiring qualified homeowner screening.' },
              { title: 'Roofing Contractors', desc: 'Storm damage, full roof replacements, and emergency repair capture.' },
              { title: 'Painting Companies', desc: 'Residential exterior and interior repaint packages with consistent lead flow.' },
              { title: 'General Contractors & Builders', desc: 'Custom homes, additions, and comprehensive architectural projects.' },
              { title: 'HVAC, Plumbing & Electrical', desc: 'Urgent search capture paired with seasonal maintenance agreement sales.' },
              { title: 'Landscaping & Outdoor Living', desc: 'Decks, hardscaping, pools, and premium outdoor kitchen designs.' },
            ].map((trade) => (
              <div key={trade.title} className="bg-white border border-black/10 rounded-2xl p-6 shadow-xs">
                <h3 className="text-lg font-bold mb-2">{trade.title}</h3>
                <p className="text-sm text-[#3A3A3A]">{trade.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What We Do for Contractors */}
        <section className="py-16 sm:py-24 px-4 sm:px-10 lg:px-14 border-t border-black/10 bg-[#FAFAF8]">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">What We Do for Contractors</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-xs">
              <h3 className="text-lg font-bold mb-2">Google Search Ads for High-Intent Jobs</h3>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">
                Capture homeowners searching &ldquo;kitchen remodel near me&rdquo; or &ldquo;roof replacement cost,&rdquo; with tight geo-targeting and negative keywords that block job seekers and DIY traffic.
              </p>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-xs">
              <h3 className="text-lg font-bold mb-2">Meta Ads That Generate Estimate Requests</h3>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">
                Before/after creative, walk-through project videos, and compelling offers that reach homeowners before they even start searching competitors.
              </p>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-xs">
              <h3 className="text-lg font-bold mb-2">Lead Qualification Forms</h3>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">
                Multi-step questionnaires that screen for project scope, budget, timeline, and homeownership, so your team only spends time with qualified buyers.
              </p>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-xs">
              <h3 className="text-lg font-bold mb-2">Landing Pages Built to Book</h3>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">
                Service- and city-specific pages loaded with authentic reviews, local license info, warranty badges, and prominent click-to-call buttons.
              </p>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-xs">
              <h3 className="text-lg font-bold mb-2">Speed-to-Lead Automation</h3>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">
                Instant SMS and email notifications, calendar scheduling, and automated reminders that dramatically improve estimate show-up rates.
              </p>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="py-16 sm:py-24 px-4 sm:px-10 lg:px-14 border-t border-black/10">
          <div className="max-w-4xl mx-auto bg-white border border-black/10 rounded-3xl p-8 sm:p-12 shadow-sm">
            <div className="text-xs font-bold tracking-[0.2em] uppercase text-[#0C4137] mb-2">
              Case Study Highlight
            </div>
            <div className="text-3xl sm:text-4xl font-black mb-3">40% Lower Cost Per Qualified Lead</div>
            <p className="text-base sm:text-lg text-[#3A3A3A] leading-relaxed">
              We rebuilt Google Ads search capture for a premier remodeling contractor, replacing vague generic ad copy with city-specific landing pages, call tracking, and negative keyword filtering. In 60 days, lead volume doubled while cost per estimate dropped by 40%.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 sm:py-24 px-4 sm:px-10 lg:px-14 border-t border-black/10 bg-[#FAFAF8]">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Contractor FAQ</h2>
          </div>
          <div className="max-w-3xl flex flex-col gap-6">
            <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-xs">
              <h3 className="font-bold text-base mb-2">What&apos;s a good cost per lead for contractors?</h3>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">
                It varies by trade, ticket size and market. A $60,000 remodel can justify a far higher cost per lead than a $300 repair call. We establish target CPL based directly on your average job value and sales close rate.
              </p>
            </div>
            <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-xs">
              <h3 className="font-bold text-base mb-2">Should contractors use Google Ads or Facebook Ads?</h3>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">
                Google Ads catches urgent, high-intent searches. Meta Ads builds visual demand for planned projects like remodels. Most of our high-growth contractors get the best results running both simultaneously.
              </p>
            </div>
          </div>
        </section>

        {/* Audit Form */}
        <section id="audit" className="py-16 sm:py-24 px-4 sm:px-10 lg:px-14 border-t border-black/10 flex flex-col items-center">
          <div className="max-w-2xl text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-black mb-3">Request a Contractor Lead-Gen Audit</h2>
            <p className="text-base text-[#55575A]">See why competitor contractors rank ahead of you and how to capture the best jobs in your territory.</p>
          </div>
          <GrowthAuditForm />
        </section>
      </main>

      <Footer />
    </div>
  );
}
