'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import GrowthAuditForm from '@/components/GrowthAuditForm';

const ThreeCanvas = dynamic(() => import('@/components/ThreeCanvas'), {
  ssr: false,
  loading: () => null,
});

export default function HomePage() {
  const [loaderPercent, setLoaderPercent] = useState(0);
  const [loaderHidden, setLoaderHidden] = useState(false);
  const [navCompact, setNavCompact] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);

  // Loading screen counter
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current = Math.min(100, current + Math.floor(Math.random() * 14) + 6);
      setLoaderPercent(current);
      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => setLoaderHidden(true), 350);
      }
    }, 90);
    return () => clearInterval(interval);
  }, []);

  // Scroll listener for nav and sticky CTA
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const innerHeight = window.innerHeight;

      setNavCompact(scrollY > innerHeight * 0.5);

      const auditEl = document.getElementById('j38-audit');
      const auditRect = auditEl ? auditEl.getBoundingClientRect() : null;
      const isAuditVisible = auditRect ? auditRect.top < innerHeight * 0.85 : false;
      const pastHero = scrollY > innerHeight * 0.7;

      setStickyVisible(pastHero && !isAuditVisible);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="relative w-full bg-[#F5F5F2] text-[#0A0A0A] font-sans overflow-x-hidden selection:bg-[#06D6A0] selection:text-[#0A0A0A]">
      {/* 3D WebGL Background Layer */}
      <ThreeCanvas />

      {/* Subtle Noise Texture Overlay */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none opacity-[0.035] mix-blend-multiply"
        style={{
          backgroundImage:
            'radial-gradient(#0A0A0A 1px, transparent 1px), radial-gradient(#0A0A0A 1px, #F5F5F2 1px)',
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 20px 20px',
        }}
      />

      {/* Initial Page Loader */}
      {!loaderHidden && (
        <div
          className={`fixed inset-0 z-[99] bg-[#F5F5F2] flex flex-col items-center justify-center gap-6 transition-opacity duration-700 ease-out ${
            loaderPercent >= 100 ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <div className="text-7xl leading-none tracking-tighter select-none">∞</div>
          <div className="text-xs font-bold tracking-[0.35em] text-[#0A0A0A]">J38</div>
          <div className="w-[min(240px,50vw)] h-[1px] bg-black/15 overflow-hidden">
            <div
              className="h-full bg-[#0A0A0A] transition-all duration-150 ease-linear"
              style={{ width: `${loaderPercent}%` }}
            />
          </div>
          <div className="text-[11px] font-semibold tracking-[0.22em] text-[#55575A]">
            <span>{String(loaderPercent).padStart(3, '0')}</span> / 100
          </div>
        </div>
      )}

      {/* Main Content Container */}
      <div className="relative z-[2]">
        {/* Floating Morphing Navigation Bar */}
        <div className="fixed top-0 left-0 right-0 z-40 flex justify-center pointer-events-none px-4 sm:px-8 pt-3 sm:pt-4">
          <header
            className={`pointer-events-auto w-full transition-all duration-500 ease-out flex items-center justify-between gap-4 py-3.5 px-6 sm:px-8 border ${
              navCompact
                ? 'max-w-[1180px] bg-[#FAFAF7]/85 backdrop-blur-xl border-black/10 rounded-2xl shadow-sm'
                : 'max-w-full bg-transparent border-transparent'
            }`}
          >
            <a href="#hero" className="flex items-center gap-2.5 group">
              <span className="text-2xl font-black leading-none group-hover:text-[#06D6A0] transition-colors">
                ∞
              </span>
              <span className="text-sm font-black tracking-[0.24em] uppercase text-[#0A0A0A]">
                J38
              </span>
            </a>

            <nav className="hidden md:flex items-center gap-7 text-xs font-semibold tracking-[0.14em] uppercase text-[#3A3A3A]">
              <a href="#work" className="hover:text-[#0C4137] transition-colors">
                Work
              </a>
              <a href="#services" className="hover:text-[#0C4137] transition-colors">
                Services
              </a>
              <a href="#about" className="hover:text-[#0C4137] transition-colors">
                About
              </a>
              <a href="#insights" className="hover:text-[#0C4137] transition-colors">
                Insights
              </a>
              <a href="#j38-audit" className="hover:text-[#0C4137] transition-colors">
                Audit
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <Link
                href="/admin"
                className="hidden lg:inline-flex text-[11px] font-bold tracking-[0.12em] uppercase text-[#55575A] hover:text-[#0A0A0A] transition-colors px-2 py-1"
                title="Admin Inquiries Portal"
              >
                Inquiries
              </Link>
              <a
                href="#j38-audit"
                className="inline-flex items-center justify-center min-h-[44px] bg-[#0A0A0A] hover:bg-[#06D6A0] text-[#F5F5F2] hover:text-[#0A0A0A] px-5 py-2.5 rounded-xl text-xs font-bold tracking-[0.12em] uppercase transition-all duration-200 shadow-sm"
              >
                Start a Project ↗
              </a>
            </div>
          </header>
        </div>

        {/* Floating Bottom Sticky Bar */}
        <div
          className={`fixed left-0 right-0 bottom-0 z-45 transition-transform duration-500 ease-out bg-[#FAFAF7]/95 backdrop-blur-xl border-t border-black/10 py-3 px-5 sm:px-10 flex flex-wrap items-center justify-between gap-3 shadow-lg ${
            stickyVisible ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <div className="text-xs sm:text-sm font-medium text-[#0A0A0A]">
            Free growth audit — we review your ads and send actionable findings.
          </div>
          <a
            href="#j38-audit"
            className="inline-flex items-center justify-center min-h-[40px] bg-[#0A0A0A] hover:bg-[#06D6A0] text-[#F5F5F2] hover:text-[#0A0A0A] px-5 py-2 rounded-xl text-xs font-bold tracking-[0.12em] uppercase whitespace-nowrap transition-colors"
          >
            Get My Free Audit ↗
          </a>
        </div>

        {/* Trust Bar */}
        <div className="relative z-30 mt-20 sm:mt-24 border-b border-black/10 bg-white/80 backdrop-blur-md py-2.5 px-6 sm:px-12 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-[11px] font-bold tracking-[0.16em] uppercase text-[#3A3A3A]">
          <span className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#06D6A0] animate-pulse" />
            Google &amp; Meta Certified
          </span>
          <span>9 Years in Digital Marketing</span>
          <span>$60M+ Ad Spend Managed</span>
          <span>1,500+ Companies Served</span>
        </div>

        {/* Hero Section */}
        <section
          id="hero"
          className="relative min-h-[88vh] grid grid-rows-[1fr_auto] px-6 sm:px-12 lg:px-16 pt-8 pb-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center pt-8 sm:pt-14">
            <div className="relative flex flex-col justify-center items-start text-left gap-5 sm:gap-7 max-w-2xl">
              <div className="text-xs font-bold tracking-[0.3em] uppercase text-[#55575A]">
                J38 CORPORATION
              </div>
              <h1 className="m-0 text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.9] tracking-tighter uppercase text-balance text-[#0A0A0A]">
                Built for
                <br />
                What&apos;s Next.
              </h1>
              <p className="m-0 text-base sm:text-lg lg:text-xl leading-relaxed text-[#4A4A4A] max-w-xl">
                We combine strategy, creativity, technology and intelligent systems to build businesses
                designed for growth.
              </p>
              <div className="text-xs font-bold tracking-[0.18em] uppercase text-[#0A0A0A]">
                Digital Marketing • AI • Automation • Branding • Web Solutions
              </div>
              <div className="flex flex-wrap gap-3.5 pt-2">
                <a
                  href="#j38-audit"
                  className="bg-[#0A0A0A] hover:bg-[#06D6A0] text-[#F5F5F2] hover:text-[#0A0A0A] px-7 py-4 rounded-xl text-xs font-bold tracking-[0.14em] uppercase transition-all duration-200 shadow-md whitespace-nowrap"
                >
                  Start a Project ↗
                </a>
                <a
                  href="#work"
                  className="border border-black/30 hover:border-[#0C4137] hover:text-[#0C4137] px-7 py-4 rounded-xl text-xs font-bold tracking-[0.14em] uppercase transition-colors whitespace-nowrap"
                >
                  View Our Work ↓
                </a>
              </div>
            </div>

            {/* Reserved 3D Sculpture Slot */}
            <div id="j38-hero-slot" className="relative min-h-[360px] sm:min-h-[460px] w-full" />
          </div>

          <div className="flex justify-start pt-6">
            <span
              className="text-[10px] font-semibold tracking-[0.26em] uppercase text-[#0A0A0A]"
              style={{ animation: 'j38-hint 2.6s ease-in-out infinite' }}
            >
              Scroll to explore ↓
            </span>
          </div>
        </section>

        {/* Proof Section */}
        <section className="border-y border-black/10 bg-white/80 backdrop-blur-md py-8 sm:py-12 px-6 sm:px-12 lg:px-16 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">
          <div className="flex flex-col gap-1.5">
            <div className="text-3xl sm:text-5xl font-black tracking-tight">9 Years</div>
            <div className="text-xs font-semibold tracking-[0.18em] uppercase text-[#55575A]">
              In digital marketing
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="text-3xl sm:text-5xl font-black tracking-tight">$60M+</div>
            <div className="text-xs font-semibold tracking-[0.18em] uppercase text-[#55575A]">
              Ad spend managed
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="text-3xl sm:text-5xl font-black tracking-tight">1,500+</div>
            <div className="text-xs font-semibold tracking-[0.18em] uppercase text-[#55575A]">
              Companies worked with
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="text-3xl sm:text-5xl font-black tracking-tight">Certified</div>
            <div className="text-xs font-semibold tracking-[0.18em] uppercase text-[#55575A]">
              Google &amp; Meta
            </div>
          </div>
        </section>

        {/* Intro Chapter */}
        <section
          data-intro
          className="py-24 sm:py-36 px-6 sm:px-12 lg:px-16 flex flex-col gap-14 sm:gap-24"
        >
          <h2 className="m-0 text-4xl sm:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tighter uppercase text-[#5E6063]">
            We don&apos;t build
            <br />
            for yesterday.
          </h2>
          <h2 className="m-0 self-end text-right text-4xl sm:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tighter uppercase text-[#0A0A0A]">
            We build
            <br />
            what comes next.
          </h2>
          <p className="m-0 max-w-2xl self-center text-center text-base sm:text-xl leading-relaxed text-[#55575A]">
            J38 Corporation brings marketing, technology, design and automation together into one
            connected growth system.
          </p>
        </section>

        {/* Services / Five Growth Engines */}
        <section
          id="services"
          className="py-20 sm:py-32 px-6 sm:px-12 lg:px-16 flex flex-col gap-16 sm:gap-28"
        >
          <h2 className="m-0 text-4xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tighter uppercase">
            One company.
            <br />
            Five growth engines.
          </h2>

          {/* 01 Digital Marketing */}
          <div
            data-service="0"
            className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-6 lg:gap-16 items-start border-t border-black/10 pt-8"
          >
            <div className="flex flex-col gap-3">
              <div className="text-xs font-bold tracking-[0.2em] text-[#0C4137]">01</div>
              <h3 className="m-0 text-3xl sm:text-5xl font-black tracking-tight uppercase">
                Digital Marketing
              </h3>
              <p className="m-0 text-base sm:text-lg leading-relaxed text-[#55575A]">
                Turn attention into measurable growth.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                'Paid Social',
                'Google Ads',
                'SEO',
                'Creative Strategy',
                'Analytics',
                'Conversion Optimization',
              ].map((item) => (
                <div
                  key={item}
                  className="bg-white hover:bg-[#F0F0EA] border border-black/10 rounded-xl p-4 text-xs sm:text-sm font-semibold text-[#0A0A0A] transition-colors"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* 02 AI */}
          <div
            data-service="1"
            className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-6 lg:gap-16 items-start border-t border-black/10 pt-8"
          >
            <div className="flex flex-col gap-3">
              <div className="text-xs font-bold tracking-[0.2em] text-[#0C4137]">02</div>
              <h3 className="m-0 text-3xl sm:text-5xl font-black tracking-tight uppercase">AI</h3>
              <p className="m-0 text-base sm:text-lg leading-relaxed text-[#55575A]">
                Intelligence built into your business.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                'AI Strategy',
                'AI Agents',
                'AI Integrations',
                'AI Workflows',
                'Custom AI Solutions',
              ].map((item) => (
                <div
                  key={item}
                  className="bg-white hover:bg-[#F0F0EA] border border-black/10 rounded-xl p-4 text-xs sm:text-sm font-semibold text-[#0A0A0A] transition-colors"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* 03 Automation */}
          <div
            data-service="2"
            className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-6 lg:gap-16 items-start border-t border-black/10 pt-8"
          >
            <div className="flex flex-col gap-3">
              <div className="text-xs font-bold tracking-[0.2em] text-[#0C4137]">03</div>
              <h3 className="m-0 text-3xl sm:text-5xl font-black tracking-tight uppercase">
                Automation
              </h3>
              <p className="m-0 text-base sm:text-lg leading-relaxed text-[#55575A]">
                Build systems that keep moving.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                'Marketing Automation',
                'Sales Automation',
                'CRM Workflows',
                'Lead Management',
                'Reporting Systems',
              ].map((item) => (
                <div
                  key={item}
                  className="bg-white hover:bg-[#F0F0EA] border border-black/10 rounded-xl p-4 text-xs sm:text-sm font-semibold text-[#0A0A0A] transition-colors"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* 04 Branding */}
          <div
            data-service="3"
            className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-6 lg:gap-16 items-start border-t border-black/10 pt-8"
          >
            <div className="flex flex-col gap-3">
              <div className="text-xs font-bold tracking-[0.2em] text-[#0C4137]">04</div>
              <h3 className="m-0 text-3xl sm:text-5xl font-black tracking-tight uppercase">
                Branding
              </h3>
              <p className="m-0 text-base sm:text-lg leading-relaxed text-[#55575A]">
                Create brands people remember.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                'Brand Strategy',
                'Visual Identity',
                'Creative Direction',
                'Campaign Design',
                'Social Creative',
              ].map((item) => (
                <div
                  key={item}
                  className="bg-white hover:bg-[#F0F0EA] border border-black/10 rounded-xl p-4 text-xs sm:text-sm font-semibold text-[#0A0A0A] transition-colors"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* 05 Web Solutions */}
          <div
            data-service="4"
            className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-6 lg:gap-16 items-start border-t border-black/10 pt-8"
          >
            <div className="flex flex-col gap-3">
              <div className="text-xs font-bold tracking-[0.2em] text-[#0C4137]">05</div>
              <h3 className="m-0 text-3xl sm:text-5xl font-black tracking-tight uppercase">
                Web Solutions
              </h3>
              <p className="m-0 text-base sm:text-lg leading-relaxed text-[#55575A]">
                Digital experiences built to convert.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                'Strategy',
                'UX & UI',
                'Full-Stack Dev',
                'Landing Pages',
                'E-Commerce',
                'CRO',
              ].map((item) => (
                <div
                  key={item}
                  className="bg-white hover:bg-[#F0F0EA] border border-black/10 rounded-xl p-4 text-xs sm:text-sm font-semibold text-[#0A0A0A] transition-colors"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <a
            href="#j38-audit"
            className="self-start border border-black/30 hover:border-[#0C4137] hover:text-[#0C4137] px-7 py-4 rounded-xl text-xs font-bold tracking-[0.14em] uppercase transition-colors"
          >
            Explore Our Services ↗
          </a>
        </section>

        {/* Selected Work / Case Studies */}
        <section
          id="work"
          className="py-20 sm:py-32 px-6 sm:px-12 lg:px-16 flex flex-col gap-10 sm:gap-16"
        >
          <h2 className="m-0 text-4xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tighter uppercase">
            Work that
            <br />
            moves numbers.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {/* Case 01 */}
            <article className="bg-white hover:bg-[#F0F0EA] border border-black/10 hover:border-black/25 rounded-3xl p-7 sm:p-10 flex flex-col gap-4 transition-all duration-300 shadow-sm">
              <div className="text-xs font-bold tracking-[0.2em] text-[#55575A]">
                01 / E-COMMERCE
              </div>
              <div className="text-5xl sm:text-7xl font-black tracking-tighter bg-gradient-to-br from-[#151515] via-[#55575A] to-[#151515] bg-clip-text text-transparent leading-none">
                3X ROAS
              </div>
              <p className="m-0 text-base text-[#4A4A4A] leading-relaxed">
                Scaling international customer acquisition across multi-channel paid social.
              </p>
              <div className="flex flex-col gap-3 border-t border-black/10 pt-4 mt-auto">
                <div className="text-xs uppercase tracking-wider text-[#55575A]">
                  Paid Social • Creative Strategy • CRO
                </div>
                <a
                  href="#j38-audit"
                  className="text-xs font-bold tracking-[0.14em] uppercase hover:text-[#0C4137] transition-colors"
                >
                  Request Case Study Details ↗
                </a>
              </div>
            </article>

            {/* Case 02 */}
            <article className="bg-white hover:bg-[#F0F0EA] border border-black/10 hover:border-black/25 rounded-3xl p-7 sm:p-10 flex flex-col gap-4 transition-all duration-300 shadow-sm">
              <div className="text-xs font-bold tracking-[0.2em] text-[#55575A]">
                02 / CONSTRUCTION &amp; HOME SERVICES
              </div>
              <div className="text-5xl sm:text-7xl font-black tracking-tighter bg-gradient-to-br from-[#151515] via-[#55575A] to-[#151515] bg-clip-text text-transparent leading-none">
                -40% CPL
              </div>
              <p className="m-0 text-base text-[#4A4A4A] leading-relaxed">
                Building an efficient search capture and high-intent lead-generation engine.
              </p>
              <div className="flex flex-col gap-3 border-t border-black/10 pt-4 mt-auto">
                <div className="text-xs uppercase tracking-wider text-[#55575A]">
                  Google Ads • Landing Pages • Server-Side Tracking
                </div>
                <a
                  href="#j38-audit"
                  className="text-xs font-bold tracking-[0.14em] uppercase hover:text-[#0C4137] transition-colors"
                >
                  Request Case Study Details ↗
                </a>
              </div>
            </article>

            {/* Case 03 */}
            <article className="bg-white hover:bg-[#F0F0EA] border border-black/10 hover:border-black/25 rounded-3xl p-7 sm:p-10 flex flex-col gap-4 transition-all duration-300 shadow-sm">
              <div className="text-xs font-bold tracking-[0.2em] text-[#55575A]">
                03 / REAL ESTATE &amp; DEVELOPMENTS
              </div>
              <div className="text-5xl sm:text-7xl font-black tracking-tighter bg-gradient-to-br from-[#151515] via-[#55575A] to-[#151515] bg-clip-text text-transparent leading-none">
                2.5X LEADS
              </div>
              <p className="m-0 text-base text-[#4A4A4A] leading-relaxed">
                Turning digital demand into qualified property buyers through automated nurture.
              </p>
              <div className="flex flex-col gap-3 border-t border-black/10 pt-4 mt-auto">
                <div className="text-xs uppercase tracking-wider text-[#55575A]">
                  Paid Media • CRM Workflows • Sales Automation
                </div>
                <a
                  href="#j38-audit"
                  className="text-xs font-bold tracking-[0.14em] uppercase hover:text-[#0C4137] transition-colors"
                >
                  Request Case Study Details ↗
                </a>
              </div>
            </article>

            {/* Case 04 */}
            <article className="bg-white hover:bg-[#F0F0EA] border border-black/10 hover:border-black/25 rounded-3xl p-7 sm:p-10 flex flex-col gap-4 transition-all duration-300 shadow-sm">
              <div className="text-xs font-bold tracking-[0.2em] text-[#55575A]">
                04 / PROFESSIONAL SERVICES &amp; B2B
              </div>
              <div className="text-5xl sm:text-7xl font-black tracking-tighter bg-gradient-to-br from-[#151515] via-[#55575A] to-[#151515] bg-clip-text text-transparent leading-none">
                +120% ENQUIRIES
              </div>
              <p className="m-0 text-base text-[#4A4A4A] leading-relaxed">
                Creating an authoritative brand presence and scalable customer acquisition system.
              </p>
              <div className="flex flex-col gap-3 border-t border-black/10 pt-4 mt-auto">
                <div className="text-xs uppercase tracking-wider text-[#55575A]">
                  Strategy • Paid Media • Web Experience • Automation
                </div>
                <a
                  href="#j38-audit"
                  className="text-xs font-bold tracking-[0.14em] uppercase hover:text-[#0C4137] transition-colors"
                >
                  Request Case Study Details ↗
                </a>
              </div>
            </article>
          </div>
        </section>

        {/* Numbers That Move Businesses */}
        <section
          id="numbers"
          className="py-20 sm:py-32 px-6 sm:px-12 lg:px-16 flex flex-col gap-12 sm:gap-20"
        >
          <h2 className="m-0 text-4xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tighter uppercase">
            Numbers that
            <br />
            move businesses.
          </h2>

          <div className="flex flex-col gap-8 sm:gap-14">
            <div className="flex flex-wrap items-baseline gap-6 border-t border-black/10 pt-6">
              <div
                data-znum
                className="text-6xl sm:text-8xl lg:text-9xl font-black tracking-tighter leading-none bg-gradient-to-br from-[#151515] via-[#55575A] to-[#151515] bg-clip-text text-transparent"
              >
                3X
              </div>
              <div className="text-lg sm:text-2xl font-bold text-[#55575A]">Growth Velocity</div>
            </div>

            <div className="flex flex-wrap items-baseline justify-end gap-6 border-t border-black/10 pt-6">
              <div className="text-lg sm:text-2xl font-bold text-[#55575A]">
                Lower Acquisition Cost
              </div>
              <div
                data-znum
                className="text-6xl sm:text-8xl lg:text-9xl font-black tracking-tighter leading-none bg-gradient-to-br from-[#151515] via-[#55575A] to-[#151515] bg-clip-text text-transparent"
              >
                40%
              </div>
            </div>

            <div className="flex flex-wrap items-baseline gap-6 border-t border-black/10 pt-6">
              <div
                data-znum
                className="text-6xl sm:text-8xl lg:text-9xl font-black tracking-tighter leading-none bg-gradient-to-br from-[#151515] via-[#55575A] to-[#151515] bg-clip-text text-transparent"
              >
                2.5X
              </div>
              <div className="text-lg sm:text-2xl font-bold text-[#55575A]">
                More Qualified Opportunities
              </div>
            </div>

            <div className="flex flex-wrap items-baseline justify-end gap-6 border-t border-black/10 pt-6">
              <div className="text-lg sm:text-2xl font-bold text-[#55575A]">Conversion Growth</div>
              <div
                data-znum
                className="text-6xl sm:text-8xl lg:text-9xl font-black tracking-tighter leading-none bg-gradient-to-br from-[#151515] via-[#55575A] to-[#151515] bg-clip-text text-transparent"
              >
                120%
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 sm:gap-8 text-xl sm:text-3xl font-black tracking-tight uppercase">
            <span>Strategy.</span>
            <span className="text-[#5E6063]">Creative.</span>
            <span>Technology.</span>
            <span className="text-[#0C4137]">Performance.</span>
          </div>
        </section>

        {/* Process: From Idea to Scale */}
        <section
          id="process"
          className="py-20 sm:py-32 px-6 sm:px-12 lg:px-16 flex flex-col gap-10 sm:gap-16"
        >
          <h2 className="m-0 text-4xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tighter uppercase">
            From idea
            <br />
            to scale.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-[1px] bg-black/10 rounded-2xl overflow-hidden">
            {[
              {
                step: '01',
                title: 'Discover',
                items: ['Research', 'Audience', 'Market', 'Competition', 'Opportunity'],
              },
              {
                step: '02',
                title: 'Define',
                items: ['Positioning', 'Strategy', 'Goals', 'Growth Plan'],
              },
              {
                step: '03',
                title: 'Build',
                items: ['Creative', 'Technology', 'Campaigns', 'Systems'],
              },
              {
                step: '04',
                title: 'Launch',
                items: ['Tracking', 'Testing', 'Deployment', 'Optimization'],
              },
              {
                step: '05',
                title: 'Scale',
                items: ['Performance', 'Automation', 'Expansion', 'Iteration'],
              },
            ].map((p) => (
              <div key={p.step} className="bg-[#F5F5F2] p-7 flex flex-col gap-4">
                <div className="text-xs font-bold tracking-[0.2em] text-[#0C4137]">{p.step}</div>
                <h3 className="m-0 text-xl font-black uppercase tracking-tight">{p.title}</h3>
                <div className="flex flex-col gap-1.5 text-sm text-[#55575A]">
                  {p.items.map((it) => (
                    <span key={it}>{it}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <a
            href="#j38-audit"
            className="self-start border border-black/30 hover:border-[#0C4137] hover:text-[#0C4137] px-7 py-4 rounded-xl text-xs font-bold tracking-[0.14em] uppercase transition-colors"
          >
            See How We Work ↗
          </a>
        </section>

        {/* Infinite Industries Ticker */}
        <section className="py-16 sm:py-24 flex flex-col gap-6 overflow-hidden">
          <h2 className="m-0 px-6 sm:px-12 lg:px-16 text-3xl sm:text-5xl font-black tracking-tight uppercase">
            Different industries.
            <br />
            One obsession: growth.
          </h2>
          <div className="flex w-max gap-0 animate-[j38-ticker_42s_linear_infinite]">
            {[1, 2].map((run) => (
              <div
                key={run}
                className="flex items-center gap-8 pr-8 text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#4A4A4A] whitespace-nowrap"
              >
                <span>E-Commerce</span>
                <span className="text-[#06D6A0]">∞</span>
                <span>SaaS &amp; Technology</span>
                <span className="text-[#06D6A0]">∞</span>
                <span>Construction &amp; Home Services</span>
                <span className="text-[#06D6A0]">∞</span>
                <span>Real Estate</span>
                <span className="text-[#06D6A0]">∞</span>
                <span>Professional Services</span>
                <span className="text-[#06D6A0]">∞</span>
                <span>Hospitality</span>
                <span className="text-[#06D6A0]">∞</span>
                <span>Health &amp; Wellness</span>
                <span className="text-[#06D6A0]">∞</span>
                <span>Automotive</span>
                <span className="text-[#06D6A0]">∞</span>
                <span>Food &amp; Beverage</span>
                <span className="text-[#06D6A0]">∞</span>
              </div>
            ))}
          </div>
        </section>

        {/* Insights / Why J38 */}
        <section
          id="insights"
          className="py-20 sm:py-32 px-6 sm:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
        >
          <div className="flex flex-col gap-5">
            <h2 className="m-0 text-4xl sm:text-6xl font-black leading-none tracking-tighter uppercase">
              Marketing
              <br />
              isn&apos;t enough
              <br />
              anymore.
            </h2>
            <p className="m-0 text-base sm:text-lg text-[#55575A] leading-relaxed">
              Today&apos;s high-performing businesses need more than disconnected ads.
            </p>
            <p className="m-0 text-base sm:text-lg text-[#55575A] leading-relaxed">
              They need brand strategy, high-velocity creative, modern infrastructure, marketing
              automation, and intelligence working together as a unified system.
            </p>
            <p className="m-0 text-base sm:text-lg font-bold text-[#0A0A0A]">
              That is where J38 operates.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: 'Strategy', desc: 'Know precisely where to go and who to win.' },
              { title: 'Creative', desc: 'Give people a compelling reason to care and act.' },
              { title: 'Technology', desc: 'Build the digital infrastructure that scales.' },
              { title: 'Performance', desc: 'Measure, optimize, and compound what works.' },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-white hover:bg-[#F0F0EA] border border-black/10 rounded-2xl p-6 flex flex-col gap-2 transition-colors shadow-sm"
              >
                <div className="text-xs font-bold tracking-widest uppercase text-[#0A0A0A]">
                  {card.title}
                </div>
                <div className="text-sm text-[#55575A] leading-relaxed">{card.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="min-h-[80vh] py-20 sm:py-32 px-6 sm:px-12 lg:px-16 flex flex-col justify-center gap-8"
        >
          <h2 className="m-0 text-5xl sm:text-8xl font-black leading-[0.88] tracking-tighter uppercase">
            We build
            <br />
            forward.
          </h2>
          <p className="m-0 max-w-2xl text-lg sm:text-2xl text-[#4A4A4A] leading-relaxed font-medium">
            J38 Corporation is a multidisciplinary growth company combining marketing, technology,
            creativity and intelligent systems.
          </p>
          <div className="flex flex-col gap-4 border-t border-black/10 pt-7 max-w-2xl">
            <div className="text-xs font-bold tracking-[0.24em] uppercase text-[#0C4137]">
              Our belief
            </div>
            <p className="m-0 text-base sm:text-lg text-[#55575A] leading-relaxed">
              The next generation of industry leaders won&apos;t separate marketing, design,
              technology, and automation.
            </p>
            <p className="m-0 text-base sm:text-lg text-[#55575A] leading-relaxed">
              They will operate as one synchronized growth system.
            </p>
            <p className="m-0 text-base sm:text-lg font-bold text-[#0A0A0A]">That&apos;s what we build.</p>
          </div>
        </section>

        {/* Contact & Interactive Free Growth Audit Section */}
        <section
          id="contact"
          className="min-h-screen py-24 sm:py-36 px-6 sm:px-12 lg:px-16 flex flex-col items-center justify-center text-center gap-8 bg-gradient-to-b from-transparent via-[#EDEDE7]/50 to-[#EDEDE7]"
        >
          <div className="flex flex-col gap-2">
            <h2 className="m-0 text-4xl sm:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter uppercase">
              Your next move
              <br />
              starts here.
            </h2>
            <p className="m-0 text-base sm:text-xl text-[#55575A] font-medium tracking-wide">
              Built for What&apos;s Next.
            </p>
          </div>

          {/* Interactive Full-Stack Growth Audit App */}
          <GrowthAuditForm />
        </section>

        {/* Footer */}
        <footer className="border-t border-black/10 py-14 sm:py-20 px-6 sm:px-12 lg:px-16 flex flex-col gap-12 bg-[#EDEDE7]">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            <div className="col-span-2 sm:col-span-1 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xl font-black">∞</span>
                <span className="text-xs font-black tracking-widest uppercase">J38</span>
              </div>
              <div className="text-xs text-[#55575A] font-medium leading-relaxed">
                Built for What&apos;s Next.
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <div className="text-[11px] font-bold tracking-widest uppercase text-[#5E6063]">
                Services
              </div>
              <a href="#services" className="text-xs hover:text-[#0C4137] transition-colors">
                Digital Marketing
              </a>
              <a href="#services" className="text-xs hover:text-[#0C4137] transition-colors">
                AI Solutions
              </a>
              <a href="#services" className="text-xs hover:text-[#0C4137] transition-colors">
                Automation
              </a>
              <a href="#services" className="text-xs hover:text-[#0C4137] transition-colors">
                Branding
              </a>
              <a href="#services" className="text-xs hover:text-[#0C4137] transition-colors">
                Web Solutions
              </a>
            </div>

            <div className="flex flex-col gap-2.5">
              <div className="text-[11px] font-bold tracking-widest uppercase text-[#5E6063]">
                Company
              </div>
              <a href="#about" className="text-xs hover:text-[#0C4137] transition-colors">
                About
              </a>
              <a href="#work" className="text-xs hover:text-[#0C4137] transition-colors">
                Selected Work
              </a>
              <a href="#insights" className="text-xs hover:text-[#0C4137] transition-colors">
                Insights
              </a>
              <a href="#j38-audit" className="text-xs hover:text-[#0C4137] transition-colors">
                Free Growth Audit
              </a>
            </div>

            <div className="flex flex-col gap-2.5">
              <div className="text-[11px] font-bold tracking-widest uppercase text-[#5E6063]">
                Connect
              </div>
              <a
                href="mailto:raselrehman222@gmail.com"
                className="text-xs hover:text-[#0C4137] transition-colors"
              >
                raselrehman222@gmail.com
              </a>
              <a href="#hero" className="text-xs hover:text-[#0C4137] transition-colors">
                LinkedIn
              </a>
              <a href="#hero" className="text-xs hover:text-[#0C4137] transition-colors">
                Instagram
              </a>
            </div>

            <div className="flex flex-col gap-2.5">
              <div className="text-[11px] font-bold tracking-widest uppercase text-[#5E6063]">
                Portal
              </div>
              <Link
                href="/admin"
                className="text-xs font-semibold text-[#0C4137] hover:underline transition-all"
              >
                Inquiries Dashboard ↗
              </Link>
              <span className="text-[11px] text-[#888888]">Team Access Only</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-between items-center gap-4 border-t border-black/10 pt-6 text-[11px] tracking-wider uppercase text-[#5E6063]">
            <span>© J38 Corporation. All rights reserved.</span>
            <span>Digital Marketing • AI • Automation • Branding • Web Solutions</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
