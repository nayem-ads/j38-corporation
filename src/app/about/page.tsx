import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GrowthAuditForm from '@/components/GrowthAuditForm';

export const metadata: Metadata = {
  title: 'About J38 Corporation | Digital Marketing Agency Since 2020',
  description:
    'Founded in 2020, J38 Corporation is a performance marketing, AI and web agency. $60M+ ad spend managed for 1,500+ companies in the US, Europe and beyond.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    mainEntity: {
      '@type': 'Organization',
      name: 'J38 Corporation',
      url: 'https://j38.co',
      foundingDate: '2020',
      numberOfEmployees: '27+',
      description:
        'Performance digital marketing agency for US, European, and Australian businesses. $60M+ ad spend managed since 2020.',
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
              Founded 2020 · Agency Overview
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] mb-6">
              About J38 Corporation
            </h1>
            <p className="text-lg sm:text-xl text-[#3A3A3A] leading-relaxed mb-8 max-w-3xl">
              J38 Corporation was founded in 2020 on one belief: marketing, technology, design and automation work best as one system, not four vendors. Since then we&apos;ve managed $60M+ in ad spend and worked with 1,500+ companies across the US, Europe and Australia.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#audit"
                className="inline-flex items-center justify-center min-h-[50px] bg-[#0A0A0A] hover:bg-[#0C4137] text-[#F5F5F2] px-7 py-3 rounded-xl text-xs font-bold tracking-[0.1em] uppercase transition-colors"
              >
                Work With J38: Free Audit ↗
              </a>
              <Link
                href="/#results"
                className="inline-flex items-center justify-center min-h-[50px] border border-black/20 hover:border-black text-[#0A0A0A] px-6 py-3 rounded-xl text-xs font-bold tracking-[0.1em] uppercase transition-colors"
              >
                See Client Results →
              </Link>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 sm:py-24 px-4 sm:px-10 lg:px-14">
          <div className="max-w-3xl mx-auto">
            <div className="text-xs font-bold tracking-[0.2em] uppercase text-[#0C4137] mb-3">
              Background
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-6">Our Story</h2>
            <div className="flex flex-col gap-6 text-base sm:text-lg text-[#2A2A2A] leading-relaxed">
              <p>
                In 2020, we noticed a critical flaw in modern marketing: media buyers pointed fingers at landing pages, web developers blamed ad creative, and sales teams complained that nobody followed up on leads fast enough. Clients were paying four disconnected agencies to pass the blame.
              </p>
              <p>
                We built J38 Corporation to unite the entire chain under one roof. By integrating high-intent Google and Meta ads with custom landing pages, server-side data tracking, and automated CRM routing, we turned marketing from an uncertain expense into a predictable revenue system.
              </p>
              <p>
                Over the past 6 years, that philosophy has scaled into managing over $60M in profitable ad spend for more than 1,500 brands across the United States, United Kingdom, Europe, and Australia.
              </p>
            </div>
          </div>
        </section>

        {/* Numbers */}
        <section className="py-16 sm:py-24 px-4 sm:px-10 lg:px-14 border-t border-black/10 bg-[#FAFAF8]">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black mb-12 text-center">J38 by the Numbers</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-xs">
                <div className="text-3xl sm:text-5xl font-black text-[#0C4137] mb-2">2020</div>
                <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#777777]">Founded</div>
              </div>
              <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-xs">
                <div className="text-3xl sm:text-5xl font-black text-[#0C4137] mb-2">$60M+</div>
                <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#777777]">Ad Spend Managed</div>
              </div>
              <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-xs">
                <div className="text-3xl sm:text-5xl font-black text-[#0C4137] mb-2">1,500+</div>
                <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#777777]">Companies Served</div>
              </div>
              <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-xs">
                <div className="text-3xl sm:text-5xl font-black text-[#0C4137] mb-2">27+</div>
                <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#777777]">Growth Specialists</div>
              </div>
            </div>
          </div>
        </section>

        {/* How We Work */}
        <section className="py-16 sm:py-24 px-4 sm:px-10 lg:px-14 border-t border-black/10">
          <div className="max-w-4xl mx-auto">
            <div className="text-xs font-bold tracking-[0.2em] uppercase text-[#0C4137] mb-3 text-center">
              Principles
            </div>
            <h2 className="text-3xl sm:text-4xl font-black mb-10 text-center">How We Work</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-xs">
                <h3 className="text-lg font-bold mb-2">Revenue Over Vanity Metrics</h3>
                <p className="text-sm text-[#3A3A3A] leading-relaxed">
                  We report cost per lead, cost per sale and ROAS, not impressions or clicks that don&apos;t move your balance sheet.
                </p>
              </div>

              <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-xs">
                <h3 className="text-lg font-bold mb-2">Senior-Led Accounts</h3>
                <p className="text-sm text-[#3A3A3A] leading-relaxed">
                  The strategists with 9+ years of experience who plan your strategy are the same specialists who run and optimize your campaigns.
                </p>
              </div>

              <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-xs">
                <h3 className="text-lg font-bold mb-2">Transparent Access</h3>
                <p className="text-sm text-[#3A3A3A] leading-relaxed">
                  You retain 100% ownership of your ad accounts, pixel data, creative assets, and code. No hostaging, ever.
                </p>
              </div>

              <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-xs">
                <h3 className="text-lg font-bold mb-2">Built for the Next Channel</h3>
                <p className="text-sm text-[#3A3A3A] leading-relaxed">
                  AI agents, CRM automation, and emerging ad platforms are foundational parts of our system, never an afterthought.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Where We Work */}
        <section className="py-16 sm:py-24 px-4 sm:px-10 lg:px-14 border-t border-black/10 bg-[#FAFAF8]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-black mb-4">Where We Work</h2>
            <p className="text-base sm:text-lg text-[#3A3A3A] leading-relaxed mb-8">
              We serve clients across the United States, Europe, and Australia, with dedicated strategist hours structured to overlap US and European business time zones.
            </p>
            <div className="inline-flex items-center gap-3 bg-white border border-black/10 px-6 py-3 rounded-2xl shadow-xs text-xs font-bold tracking-widest uppercase text-[#0C4137]">
              <span>🇺🇸 United States</span>
              <span>•</span>
              <span>🇬🇧 United Kingdom</span>
              <span>•</span>
              <span>🇪🇺 Europe</span>
              <span>•</span>
              <span>🇦🇺 Australia</span>
            </div>
          </div>
        </section>

        {/* Audit Form */}
        <section id="audit" className="py-16 sm:py-24 px-4 sm:px-10 lg:px-14 border-t border-black/10 flex flex-col items-center">
          <div className="max-w-2xl text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-black mb-3">Work With J38 Corporation</h2>
            <p className="text-base text-[#55575A]">Get your free growth audit and speak with a senior performance strategist.</p>
          </div>
          <GrowthAuditForm />
        </section>
      </main>

      <Footer />
    </div>
  );
}
