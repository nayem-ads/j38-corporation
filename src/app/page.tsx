'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GrowthAuditForm from '@/components/GrowthAuditForm';

const ThreeCanvas = dynamic(() => import('@/components/ThreeCanvas'), {
  ssr: false,
  loading: () => null,
});

export default function HomePage() {
  const [stickyOn, setStickyOn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const form = document.querySelector('#j38-audit');
      const r = form ? form.getBoundingClientRect() : null;
      const formUp = r ? r.top < window.innerHeight && r.bottom > 0 : false;
      const next = window.scrollY > window.innerHeight * 0.5 && !formUp;
      setStickyOn(next);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://j38.co/#organization',
        name: 'J38 Corporation',
        url: 'https://j38.co',
        foundingDate: '2020',
        description: 'Performance digital marketing agency for US, European, and Australian businesses.',
      },
      {
        '@type': 'ProfessionalService',
        name: 'J38 Corporation',
        url: 'https://j38.co',
        priceRange: '$$$',
        telephone: '+1-555-J38-GROW',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'US',
        },
      },
      {
        '@type': 'WebSite',
        '@id': 'https://j38.co/#website',
        url: 'https://j38.co',
        name: 'J38 Corporation',
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What does a digital marketing agency do?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A digital marketing agency plans and runs online marketing to win customers. That covers paid ads, SEO, websites, email and automation. J38 focuses on performance work, where every activity ties back to leads or sales.',
            },
          },
          {
            '@type': 'Question',
            name: 'How much do your digital marketing services cost?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Pricing depends on scope and ad spend. Management plans typically start at $2,000/month. The free audit includes a transparent, fixed quote.',
            },
          },
          {
            '@type': 'Question',
            name: 'Do you work with businesses in the US and Europe?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. We work with clients across the United States, Europe and Australia, and we schedule regular strategy calls in your time zone.',
            },
          },
          {
            '@type': 'Question',
            name: 'How soon will I see results?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Paid ads usually show early data within 2–4 weeks. Stable cost-per-lead or ROAS targets typically take 60–90 days of testing. SEO usually takes 4–6 months.',
            },
          },
          {
            '@type': 'Question',
            name: "What's included in the free growth audit?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: "We review your ad accounts, tracking, landing pages and competitors. You get a written list of what's wasting budget and what to fix first. No charge, no obligation.",
            },
          },
          {
            '@type': 'Question',
            name: 'Do I need a minimum ad budget?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'We recommend at least $2,000/month in ad spend to generate sufficient conversion volume for machine-learning bidding algorithms to optimize effectively.',
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="relative w-full bg-[#F5F5F2] text-[#0A0A0A] font-sans overflow-x-hidden selection:bg-[#06D6A0] selection:text-[#0A0A0A]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 3D WebGL Canvas Layer */}
      <div id="j38-canvas-layer" className="hidden sm:block">
        <ThreeCanvas />
      </div>

      <div className="relative z-[2]">
        <Header />

        {/* Hero Section */}
        <section
          id="hero"
          className="py-10 sm:py-16 lg:py-20 px-4 sm:px-10 lg:px-14 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-center"
        >
          <div className="flex flex-col items-start gap-4 max-w-2xl">
            <div className="text-xs font-bold tracking-[0.22em] uppercase text-[#0C4137]">
              J38 Corporation · Founded 2020
            </div>
            <h1 className="m-0 text-3xl sm:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight text-balance text-[#0A0A0A]">
              Performance Digital Marketing Agency for Businesses Ready to Scale
            </h1>
            <p className="m-0 max-w-xl text-base sm:text-lg lg:text-xl leading-relaxed text-[#3A3A3A]">
              J38 Corporation plans, builds and runs the ads, websites and automation that turn spend into revenue. Since 2020 we&apos;ve helped businesses across the US, Europe and Australia grow on Google, Meta and search.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#j38-audit"
                className="inline-flex items-center justify-center min-h-[52px] bg-[#0A0A0A] hover:bg-[#0C4137] text-[#F5F5F2] px-7 py-3.5 rounded-2xl text-xs sm:text-sm font-bold tracking-[0.12em] uppercase whitespace-nowrap transition-colors shadow-sm"
              >
                Get My Free Growth Audit ↗
              </a>
              <a
                href="#results"
                className="inline-flex items-center justify-center min-h-[52px] border-2 border-black/20 hover:border-black text-[#0A0A0A] px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold tracking-[0.12em] uppercase whitespace-nowrap transition-colors"
              >
                See Client Results ↓
              </a>
            </div>
          </div>

          {/* Reserved 3D Sculpture Slot */}
          <div
            id="j38-hero-slot"
            aria-hidden="true"
            className="hidden sm:block relative min-h-[280px] sm:min-h-[340px] w-full"
          />
        </section>

        {/* Trust Bar */}
        <section className="border-y border-black/10 bg-white/70 backdrop-blur-xs py-5 px-4 sm:px-10 lg:px-14">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-6 text-xs sm:text-sm font-bold tracking-[0.14em] uppercase text-[#0A0A0A]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#06D6A0]" />
              <span>Founded 2020</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#06D6A0]" />
              <span>$60M+ Ad Spend Managed</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#06D6A0]" />
              <span>1,500+ Companies Served</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#06D6A0]" />
              <span>Google &amp; Meta Certified</span>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section
          id="services"
          className="py-16 sm:py-24 px-4 sm:px-10 lg:px-14 flex flex-col gap-10 sm:gap-14"
        >
          <div className="max-w-3xl">
            <div className="text-xs font-bold tracking-[0.2em] uppercase text-[#0C4137] mb-3">
              Capabilities
            </div>
            <h2 className="m-0 text-3xl sm:text-5xl font-black leading-tight tracking-tight">
              Digital Marketing Services Built Around Revenue
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#3A3A3A] leading-relaxed">
              Most agencies sell channels. We build one connected system: traffic, conversion, follow-up and reporting. Each part makes the others work harder.
            </p>
          </div>

          <div className="flex flex-col gap-8">
            {/* 01 Paid Ads Management */}
            <div
              data-service="0"
              className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-6 border-t border-black/10 pt-8"
            >
              <div className="flex flex-col gap-2">
                <div className="text-xs font-bold tracking-[0.18em] text-[#0C4137]">01</div>
                <h3 className="m-0 text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                  Paid Ads Management (Google &amp; Meta)
                </h3>
                <p className="m-0 text-base leading-relaxed text-[#3A3A3A]">
                  Google Ads, Meta Ads and paid social campaigns managed against cost per lead, ROAS and pipeline, not clicks.
                </p>
                <Link
                  href="/services/digital-marketing"
                  className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#0C4137] hover:underline"
                >
                  Explore Paid Ads Management →
                </Link>
              </div>
              <div className="flex flex-wrap gap-2.5 items-start">
                {[
                  'Google Search & PMax',
                  'Meta Prospecting & Retargeting',
                  'TikTok & LinkedIn Ads',
                  'Creative Strategy',
                  'Server-Side CAPI & GA4',
                  'Conversion Optimization',
                ].map((pill) => (
                  <span
                    key={pill}
                    className="bg-white border border-black/10 rounded-full px-4 py-2.5 text-sm sm:text-base font-medium shadow-2xs"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </div>

            {/* 02 AI Solutions & Agents */}
            <div
              data-service="1"
              className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-6 border-t border-black/10 pt-8"
            >
              <div className="flex flex-col gap-2">
                <div className="text-xs font-bold tracking-[0.18em] text-[#0C4137]">02</div>
                <h3 className="m-0 text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                  AI Solutions &amp; Agents
                </h3>
                <p className="m-0 text-base leading-relaxed text-[#3A3A3A]">
                  AI agents, integrations and workflows that answer leads, qualify enquiries and cut manual work.
                </p>
                <Link
                  href="/services/ai-solutions"
                  className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#0C4137] hover:underline"
                >
                  Explore AI Solutions →
                </Link>
              </div>
              <div className="flex flex-wrap gap-2.5 items-start">
                {[
                  'Lead Qualification Agents',
                  '24/7 AI Customer Support',
                  'CRM & API Integrations',
                  'AI Content & Ad Workflows',
                  'AI Strategy & Audits',
                  'Custom Knowledge Engines',
                ].map((pill) => (
                  <span
                    key={pill}
                    className="bg-white border border-black/10 rounded-full px-4 py-2.5 text-sm sm:text-base font-medium shadow-2xs"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </div>

            {/* 03 Marketing & CRM Automation */}
            <div
              data-service="2"
              className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-6 border-t border-black/10 pt-8"
            >
              <div className="flex flex-col gap-2">
                <div className="text-xs font-bold tracking-[0.18em] text-[#0C4137]">03</div>
                <h3 className="m-0 text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                  Marketing &amp; CRM Automation
                </h3>
                <p className="m-0 text-base leading-relaxed text-[#3A3A3A]">
                  Lead routing, nurture sequences and CRM workflows so no enquiry goes cold.
                </p>
                <Link
                  href="/services/marketing-automation"
                  className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#0C4137] hover:underline"
                >
                  Explore Automation →
                </Link>
              </div>
              <div className="flex flex-wrap gap-2.5 items-start">
                {[
                  'HubSpot & GoHighLevel Setup',
                  'Speed-to-Lead Routing',
                  'Email & SMS Nurtures',
                  'Sales Pipeline Architecture',
                  'Offline Conversion Syncing',
                  'Closed-Loop Revenue Reporting',
                ].map((pill) => (
                  <span
                    key={pill}
                    className="bg-white border border-black/10 rounded-full px-4 py-2.5 text-sm sm:text-base font-medium shadow-2xs"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </div>

            {/* 04 Branding & Creative */}
            <div
              data-service="3"
              className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-6 border-t border-black/10 pt-8"
            >
              <div className="flex flex-col gap-2">
                <div className="text-xs font-bold tracking-[0.18em] text-[#0C4137]">04</div>
                <h3 className="m-0 text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                  Branding &amp; Creative
                </h3>
                <p className="m-0 text-base leading-relaxed text-[#3A3A3A]">
                  Brand strategy, visual identity and ad creative people remember and act on.
                </p>
                <Link
                  href="/services/branding"
                  className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#0C4137] hover:underline"
                >
                  Explore Branding →
                </Link>
              </div>
              <div className="flex flex-wrap gap-2.5 items-start">
                {[
                  'Brand Strategy & Positioning',
                  'Visual Identity & Logos',
                  'Creative Direction',
                  'Paid Ad Creative Production',
                  'Campaign Systems',
                  'Brand Guidelines & Figma Kits',
                ].map((pill) => (
                  <span
                    key={pill}
                    className="bg-white border border-black/10 rounded-full px-4 py-2.5 text-sm sm:text-base font-medium shadow-2xs"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </div>

            {/* 05 Web Design & Development */}
            <div
              data-service="4"
              className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-6 border-t border-black/10 pt-8"
            >
              <div className="flex flex-col gap-2">
                <div className="text-xs font-bold tracking-[0.18em] text-[#0C4137]">05</div>
                <h3 className="m-0 text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                  Web Design &amp; Development
                </h3>
                <p className="m-0 text-base leading-relaxed text-[#3A3A3A]">
                  Fast, conversion-focused websites, landing pages and e-commerce stores.
                </p>
                <Link
                  href="/services/web-design-development"
                  className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#0C4137] hover:underline"
                >
                  Explore Web Solutions →
                </Link>
              </div>
              <div className="flex flex-wrap gap-2.5 items-start">
                {[
                  'High-Converting Landing Pages',
                  'Next.js & React Custom Builds',
                  'Shopify Store Development',
                  'Conversion Rate Optimization',
                  'Core Web Vitals Speed Tuning',
                  'Technical SEO Architecture',
                ].map((pill) => (
                  <span
                    key={pill}
                    className="bg-white border border-black/10 rounded-full px-4 py-2.5 text-sm sm:text-base font-medium shadow-2xs"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section
          id="results"
          className="py-16 sm:py-24 px-4 sm:px-10 lg:px-14 bg-white/60 border-y border-black/10"
        >
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-bold tracking-[0.2em] uppercase text-[#0C4137] mb-3">
              Proof &amp; Case Studies
            </div>
            <h2 className="m-0 text-3xl sm:text-5xl font-black leading-tight tracking-tight">
              Results From Real Client Accounts
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#3A3A3A]">
              We manage campaigns against revenue, pipeline value, and qualified leads — never vanity clicks.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xs">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#777777] mb-2">E-Commerce Brand</div>
                <div className="text-3xl sm:text-4xl font-black text-[#0A0A0A] mb-3">3X ROAS</div>
                <p className="text-sm text-[#3A3A3A] leading-relaxed">
                  Scaled international customer acquisition across US and Europe with multi-channel paid social, creative iteration and store CRO.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-black/10 text-xs font-bold text-[#0C4137]">
                Meta Ads + Shopify CRO
              </div>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xs">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#777777] mb-2">Home Services Contractor</div>
                <div className="text-3xl sm:text-4xl font-black text-[#0A0A0A] mb-3">40% Lower CPL</div>
                <p className="text-sm text-[#3A3A3A] leading-relaxed">
                  Rebuilt Google Ads search capture with dedicated landing pages, negative keyword matrices, and server-side call tracking.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-black/10 text-xs font-bold text-[#0C4137]">
                Google Ads + Landing Pages
              </div>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xs">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#777777] mb-2">Real Estate Group</div>
                <div className="text-3xl sm:text-4xl font-black text-[#0A0A0A] mb-3">2.5X Leads</div>
                <p className="text-sm text-[#3A3A3A] leading-relaxed">
                  Paid media plus automated CRM nurture workflows that qualified buyer prospects and turned enquiries into booked viewings.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-black/10 text-xs font-bold text-[#0C4137]">
                Paid Media + Automation
              </div>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xs">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#777777] mb-2">B2B Professional Services</div>
                <div className="text-3xl sm:text-4xl font-black text-[#0A0A0A] mb-3">+120% Enquiries</div>
                <p className="text-sm text-[#3A3A3A] leading-relaxed">
                  New positioning, conversion-focused website and targeted LinkedIn/Google paid media operating as one acquisition engine.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-black/10 text-xs font-bold text-[#0C4137]">
                Branding + Search + Web
              </div>
            </div>
          </div>

          <div className="mt-10">
            <a
              href="#j38-audit"
              className="inline-flex items-center justify-center min-h-[50px] bg-[#0A0A0A] hover:bg-[#0C4137] text-[#F5F5F2] px-7 py-3 rounded-xl text-xs font-bold tracking-[0.1em] uppercase transition-colors"
            >
              Get Results Like These →
            </a>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 sm:py-24 px-4 sm:px-10 lg:px-14">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-bold tracking-[0.2em] uppercase text-[#0C4137] mb-3">
              Client Feedback
            </div>
            <h2 className="m-0 text-3xl sm:text-5xl font-black leading-tight tracking-tight">
              What Clients Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xs">
              <p className="text-base text-[#1A1A1A] leading-relaxed italic mb-6">
                &ldquo;J38 completely restructured our Google Ads spend. We went from burning $18K a month with inconsistent leads to booking high-ticket contractor projects every single week at a 40% lower cost per lead.&rdquo;
              </p>
              <div>
                <div className="font-bold text-sm text-[#0A0A0A]">Marcus Vance</div>
                <div className="text-xs text-[#777777]">Founder, Apex Construction (United States)</div>
              </div>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xs">
              <p className="text-base text-[#1A1A1A] leading-relaxed italic mb-6">
                &ldquo;The AI lead response and CRM automation they built doubled our speed-to-lead. Enquiries are contacted within 30 seconds, qualified, and placed straight on our calendar.&rdquo;
              </p>
              <div>
                <div className="font-bold text-sm text-[#0A0A0A]">Elena Rostova</div>
                <div className="text-xs text-[#777777]">VP Growth, FinPulse Europe (United Kingdom)</div>
              </div>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xs">
              <p className="text-base text-[#1A1A1A] leading-relaxed italic mb-6">
                &ldquo;They don&apos;t just send ad reports with clicks and impressions. Every week we review cost per acquisition, customer margin, and real revenue. Easily the highest ROI partner we&apos;ve worked with.&rdquo;
              </p>
              <div>
                <div className="font-bold text-sm text-[#0A0A0A]">Liam Chen</div>
                <div className="text-xs text-[#777777]">Managing Director, Horizon Group (Australia)</div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section
          id="process"
          className="py-16 sm:py-24 px-4 sm:px-10 lg:px-14 border-t border-black/10 bg-[#FAFAF8]"
        >
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-bold tracking-[0.2em] uppercase text-[#0C4137] mb-3">
              Methodology
            </div>
            <h2 className="m-0 text-3xl sm:text-5xl font-black leading-tight tracking-tight">
              How We Grow Your Business in 5 Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { step: '01', title: 'Audit', desc: 'We review your ads, tracking, website and competitors, and find where budget leaks.' },
              { step: '02', title: 'Strategy', desc: 'You get a channel plan, offer positioning, budget split and KPIs agreed in writing.' },
              { step: '03', title: 'Build', desc: 'We build the campaigns, creative, landing pages, tracking and automation.' },
              { step: '04', title: 'Launch & Test', desc: 'We go live with structured tests on audiences, creative and offers.' },
              { step: '05', title: 'Scale', desc: 'We put more budget behind what wins and cut what doesn&apos;t, with weekly reporting.' },
            ].map((p) => (
              <div
                key={p.step}
                className="bg-white border border-black/10 rounded-2xl p-5 sm:p-6 flex flex-col gap-3 shadow-2xs"
              >
                <div className="text-xs font-bold tracking-[0.18em] text-[#0C4137]">{p.step}</div>
                <h3 className="m-0 text-xl font-black tracking-tight">{p.title}</h3>
                <p className="m-0 text-sm leading-relaxed text-[#3A3A3A]">{p.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <a
              href="#j38-audit"
              className="inline-flex items-center justify-center min-h-[50px] bg-[#0A0A0A] hover:bg-[#0C4137] text-[#F5F5F2] px-7 py-3 rounded-xl text-xs font-bold tracking-[0.1em] uppercase transition-colors"
            >
              Get My Free Audit ↗
            </a>
          </div>
        </section>

        {/* Industries Section */}
        <section
          id="industries"
          className="py-16 sm:py-24 px-4 sm:px-10 lg:px-14 border-t border-black/10"
        >
          <div className="max-w-3xl mb-10">
            <div className="text-xs font-bold tracking-[0.2em] uppercase text-[#0C4137] mb-3">
              Sector Expertise
            </div>
            <h2 className="m-0 text-3xl sm:text-5xl font-black leading-tight tracking-tight">
              Industries We Grow
            </h2>
            <p className="mt-3 text-base text-[#3A3A3A]">
              Tailored customer acquisition systems built around the specific unit economics of your sector.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/industries/home-services"
              className="group bg-white border border-black/10 hover:border-[#0C4137] rounded-2xl p-6 transition-all shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="text-xs font-bold text-[#0C4137] uppercase tracking-wider mb-2">Featured Sector</div>
                <h3 className="text-xl font-black group-hover:text-[#0C4137] transition-colors mb-2">
                  Home Services &amp; Contractors →
                </h3>
                <p className="text-sm text-[#55575A] leading-relaxed">
                  Remodelers, roofers, painters, HVAC and general contractors booking qualified estimate calls.
                </p>
              </div>
            </Link>

            <Link
              href="/industries/ecommerce"
              className="group bg-white border border-black/10 hover:border-[#0C4137] rounded-2xl p-6 transition-all shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="text-xs font-bold text-[#0C4137] uppercase tracking-wider mb-2">Featured Sector</div>
                <h3 className="text-xl font-black group-hover:text-[#0C4137] transition-colors mb-2">
                  E-Commerce &amp; DTC →
                </h3>
                <p className="text-sm text-[#55575A] leading-relaxed">
                  Profitable customer acquisition for Shopify stores via Meta Ads, Google Shopping and CRO.
                </p>
              </div>
            </Link>

            <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-xs">
              <h3 className="text-xl font-black mb-2">Real Estate</h3>
              <p className="text-sm text-[#55575A] leading-relaxed">
                Project launches, developments and luxury residential buyer qualification funnels.
              </p>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-xs">
              <h3 className="text-xl font-black mb-2">Professional Services &amp; B2B</h3>
              <p className="text-sm text-[#55575A] leading-relaxed">
                High-intent search, LinkedIn campaigns and automated consultation booking workflows.
              </p>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-xs">
              <h3 className="text-xl font-black mb-2">Health &amp; Wellness</h3>
              <p className="text-sm text-[#55575A] leading-relaxed">
                Compliant patient and customer acquisition with high lifetime value modeling.
              </p>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-xs">
              <h3 className="text-xl font-black mb-2">Hospitality, Food &amp; Beverage</h3>
              <p className="text-sm text-[#55575A] leading-relaxed">
                Local geo-targeting, brand awareness, reservation volume and direct bookings.
              </p>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-xs">
              <h3 className="text-xl font-black mb-2">SaaS &amp; Technology</h3>
              <p className="text-sm text-[#55575A] leading-relaxed">
                Product-led and sales-led demo bookings, trial signups and CAC payback optimization.
              </p>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-xs">
              <h3 className="text-xl font-black mb-2">Automotive</h3>
              <p className="text-sm text-[#55575A] leading-relaxed">
                Dealership lead generation, custom inventory marketing and test drive conversions.
              </p>
            </div>
          </div>
        </section>

        {/* Why J38 Section */}
        <section className="py-16 sm:py-24 px-4 sm:px-10 lg:px-14 border-t border-black/10 bg-[#FAFAF8]">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-bold tracking-[0.2em] uppercase text-[#0C4137] mb-3">
              Competitive Advantage
            </div>
            <h2 className="m-0 text-3xl sm:text-5xl font-black leading-tight tracking-tight">
              Why Businesses in the US and Europe Choose J38
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7 shadow-xs">
              <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">One Team, Every Channel</h3>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">
                Ads, web, automation and creative under one roof, so there is zero blame between separate vendors.
              </p>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7 shadow-xs">
              <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Revenue-First Reporting</h3>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">
                We report cost per lead, cost per sale and ROAS, not impressions or surface-level click stats.
              </p>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7 shadow-xs">
              <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Senior People On Your Account</h3>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">
                Strategists with 9+ years in performance marketing plan and personally run your campaigns.
              </p>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7 shadow-xs">
              <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Coverage Across Time Zones</h3>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">
                Our team overlaps US and European business hours for swift Slack replies and strategy check-ins.
              </p>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7 shadow-xs">
              <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">No Long Lock-Ins</h3>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">
                Flexible month-to-month contracts after an initial 90-day testing window. We earn your partnership every month.
              </p>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7 shadow-xs">
              <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">GDPR-Aware Tracking</h3>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">
                Google Consent Mode v2 and privacy-compliant server-side tracking setups built for European and global markets.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-16 sm:py-24 px-4 sm:px-10 lg:px-14 border-t border-black/10">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-bold tracking-[0.2em] uppercase text-[#0C4137] mb-3">
              FAQ
            </div>
            <h2 className="m-0 text-3xl sm:text-5xl font-black leading-tight tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-4xl flex flex-col gap-6">
            <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7 shadow-xs">
              <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">
                What does a digital marketing agency do?
              </h3>
              <p className="text-sm sm:text-base text-[#3A3A3A] leading-relaxed">
                A digital marketing agency plans and runs online marketing to win customers. That covers paid ads, SEO, websites, email and automation. J38 focuses on performance work, where every activity ties back to leads or sales.
              </p>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7 shadow-xs">
              <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">
                How much do your digital marketing services cost?
              </h3>
              <p className="text-sm sm:text-base text-[#3A3A3A] leading-relaxed">
                Pricing depends on scope and ad spend. Monthly management plans typically start around $2,000/month. The free growth audit includes a transparent, fixed quote tailored to your exact roadmap.
              </p>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7 shadow-xs">
              <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">
                Do you work with businesses in the US and Europe?
              </h3>
              <p className="text-sm sm:text-base text-[#3A3A3A] leading-relaxed">
                Yes. We work with clients across the United States, Europe and Australia, and we schedule regular strategy calls in your time zone with overlapping support hours.
              </p>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7 shadow-xs">
              <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">
                How soon will I see results?
              </h3>
              <p className="text-sm sm:text-base text-[#3A3A3A] leading-relaxed">
                Paid ads usually show early conversion data within 2–4 weeks. Stable cost-per-lead or ROAS targets typically take 60–90 days of structured testing. Organic SEO usually takes 4–6 months.
              </p>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7 shadow-xs">
              <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">
                What&apos;s included in the free growth audit?
              </h3>
              <p className="text-sm sm:text-base text-[#3A3A3A] leading-relaxed">
                We review your ad accounts, tracking, landing pages and competitors. You get a written list of what&apos;s wasting budget and what to fix first. No charge, no obligation.
              </p>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7 shadow-xs">
              <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">
                Do I need a minimum ad budget?
              </h3>
              <p className="text-sm sm:text-base text-[#3A3A3A] leading-relaxed">
                We recommend at least $2,000/month in ad spend to give Google and Meta algorithms enough conversion data to optimize effectively and exit the learning phase.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA & Growth Audit Section */}
        <section
          id="j38-audit"
          className="py-16 sm:py-24 px-4 sm:px-10 lg:px-14 pb-28 sm:pb-36 flex flex-col items-center border-t border-black/10 bg-[#F5F5F2]"
        >
          <div className="max-w-2xl text-center mb-10">
            <div className="text-xs font-bold tracking-[0.2em] uppercase text-[#0C4137] mb-3">
              Complimentary Analysis
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-4">
              Find Out Where Your Marketing Is Leaking Money
            </h2>
            <p className="text-base sm:text-lg text-[#3A3A3A] leading-relaxed">
              Get a free growth audit of your ads, tracking and website. We reply within 1 business day.
            </p>
          </div>

          <GrowthAuditForm />
        </section>

        {/* Mobile Sticky Bar */}
        <div
          id="j38-sticky"
          className={`md:hidden fixed left-0 right-0 bottom-0 z-45 flex items-center gap-2.5 p-3 pb-[calc(12px+env(safe-area-inset-bottom))] bg-[#F5F5F2]/95 backdrop-blur-md border-t border-black/10 transition-transform duration-350 ease-out shadow-lg ${
            stickyOn ? 'translate-y-0' : 'translate-y-[120%]'
          }`}
        >
          <a
            href="#j38-audit"
            className="flex-1 inline-flex items-center justify-center min-h-[50px] bg-[#0A0A0A] text-[#F5F5F2] rounded-xl text-xs font-bold tracking-[0.1em] uppercase"
          >
            Get Free Audit
          </a>
          <a
            href="mailto:raselrehman222@gmail.com"
            className="inline-flex items-center justify-center min-h-[50px] px-4 border border-black/25 rounded-xl text-sm font-semibold text-[#0A0A0A] whitespace-nowrap"
          >
            Book Call
          </a>
        </div>

        <Footer />
      </div>
    </div>
  );
}
