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
  const [menuOpen, setMenuOpen] = useState(false);
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

  return (
    <div className="relative w-full bg-[#F5F5F2] text-[#0A0A0A] font-sans overflow-x-hidden selection:bg-[#06D6A0] selection:text-[#0A0A0A]">
      {/* 3D WebGL Canvas Layer */}
      <div id="j38-canvas-layer" className="hidden sm:block">
        <ThreeCanvas />
      </div>

      <div className="relative z-[2]">
        {/* Navigation Bar */}
        <header
          id="j38-nav"
          className="sticky top-0 z-40 bg-[#F5F5F2]/90 backdrop-blur-md border-b border-black/10"
        >
          <div className="flex items-center justify-between gap-4 py-3.5 px-4 sm:px-10 lg:px-14">
            <a href="#hero" aria-label="J38 Corporation home" className="flex items-center">
              <img
                src="/logo-black.png"
                alt="J38 Corporation"
                width={1541}
                height={178}
                className="h-5 sm:h-6 w-auto block object-contain"
              />
            </a>

            <nav
              id="j38-nav-links"
              aria-label="Main"
              className="hidden md:flex items-center gap-6 lg:gap-8 text-base font-medium"
            >
              <a href="#services" className="hover:text-[#0C4137] transition-colors">
                Services
              </a>
              <a href="#process" className="hover:text-[#0C4137] transition-colors">
                Process
              </a>
              <a href="#j38-audit" className="hover:text-[#0C4137] transition-colors">
                Contact
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <a
                id="j38-nav-cta"
                href="#j38-audit"
                className="hidden md:inline-flex items-center justify-center min-h-[46px] bg-[#0A0A0A] hover:bg-[#0C4137] text-[#F5F5F2] px-5 py-3 rounded-xl text-xs font-bold tracking-[0.1em] uppercase whitespace-nowrap transition-colors"
              >
                Get My Free Audit ↗
              </a>

              {/* Mobile Burger Toggle */}
              <button
                id="j38-burger"
                type="button"
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                aria-controls="j38-mobile-menu"
                className="md:hidden cursor-pointer bg-transparent border border-black/20 rounded-xl min-w-[46px] min-h-[46px] flex flex-col items-center justify-center p-2"
              >
                <span className="block w-5 h-0.5 bg-[#0A0A0A]" />
                <span className="block w-5 h-0.5 bg-[#0A0A0A] mt-1.5" />
                <span className="block w-5 h-0.5 bg-[#0A0A0A] mt-1.5" />
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          {menuOpen && (
            <div
              id="j38-mobile-menu"
              className="md:hidden flex flex-col gap-1 py-3 px-4 border-t border-black/10 bg-[#F5F5F2]"
            >
              <a
                href="#services"
                onClick={() => setMenuOpen(false)}
                className="text-base font-semibold py-2.5 hover:text-[#0C4137]"
              >
                Services
              </a>
              <a
                href="#process"
                onClick={() => setMenuOpen(false)}
                className="text-base font-semibold py-2.5 hover:text-[#0C4137]"
              >
                Process
              </a>
              <a
                href="#j38-audit"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center min-h-[50px] mt-2 bg-[#0A0A0A] text-[#F5F5F2] rounded-xl text-xs font-bold tracking-[0.1em] uppercase"
              >
                Get My Free Audit ↗
              </a>
            </div>
          )}
        </header>

        {/* Hero Section */}
        <section
          id="hero"
          data-screen-label="Hero"
          className="py-6 sm:py-14 lg:py-16 px-4 sm:px-10 lg:px-14 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-center"
        >
          <div className="flex flex-col items-start gap-3.5 sm:gap-4 max-w-2xl">
            <div className="text-xs font-semibold tracking-[0.22em] uppercase text-[#3A3A3A]">
              J38 Corporation
            </div>
            <h1 className="m-0 text-3xl sm:text-5xl lg:text-6xl font-black leading-[1.04] tracking-tight text-balance text-[#0A0A0A]">
              We turn ad spend into qualified leads for home services and e-commerce.
            </h1>
            <p className="m-0 max-w-xl text-base sm:text-lg lg:text-xl leading-relaxed text-[#3A3A3A]">
              Get a free growth audit of your ads, tracking and landing pages. Reply within 1
              business day.
            </p>
            <a
              href="#j38-audit"
              className="inline-flex items-center justify-center min-h-[54px] bg-[#0A0A0A] hover:bg-[#0C4137] text-[#F5F5F2] px-7 py-4 rounded-2xl text-xs sm:text-sm font-bold tracking-[0.12em] uppercase whitespace-nowrap transition-colors shadow-sm"
            >
              Get My Free Audit ↗
            </a>
          </div>

          {/* Reserved 3D Sculpture Slot */}
          <div
            id="j38-hero-slot"
            aria-hidden="true"
            className="hidden sm:block relative min-h-[260px] sm:min-h-[300px] w-full"
          />
        </section>

        {/* Services Section */}
        <section
          id="services"
          data-screen-label="Services"
          className="py-14 sm:py-24 px-4 sm:px-10 lg:px-14 flex flex-col gap-8 sm:gap-14"
        >
          <h2 className="m-0 text-3xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
            One company. Five growth engines.
          </h2>

          {/* 01 Digital Marketing */}
          <div
            data-service="0"
            className="grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-6 border-t border-black/10 pt-6"
          >
            <div className="flex flex-col gap-2">
              <div className="text-xs font-bold tracking-[0.18em] text-[#0C4137]">01</div>
              <h3 className="m-0 text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                Digital Marketing
              </h3>
              <p className="m-0 text-base leading-relaxed text-[#3A3A3A]">
                Turn attention into measurable growth.
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5 items-start">
              {[
                'Paid Social',
                'Google Ads',
                'SEO',
                'Creative Strategy',
                'Analytics',
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

          {/* 02 AI */}
          <div
            data-service="1"
            className="grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-6 border-t border-black/10 pt-6"
          >
            <div className="flex flex-col gap-2">
              <div className="text-xs font-bold tracking-[0.18em] text-[#0C4137]">02</div>
              <h3 className="m-0 text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                AI
              </h3>
              <p className="m-0 text-base leading-relaxed text-[#3A3A3A]">
                Intelligence built into your business.
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5 items-start">
              {[
                'AI Strategy',
                'AI Agents',
                'AI Integrations',
                'AI Workflows',
                'Custom AI Solutions',
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

          {/* 03 Automation */}
          <div
            data-service="2"
            className="grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-6 border-t border-black/10 pt-6"
          >
            <div className="flex flex-col gap-2">
              <div className="text-xs font-bold tracking-[0.18em] text-[#0C4137]">03</div>
              <h3 className="m-0 text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                Automation
              </h3>
              <p className="m-0 text-base leading-relaxed text-[#3A3A3A]">
                Build systems that keep moving.
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5 items-start">
              {[
                'Marketing Automation',
                'Sales Automation',
                'CRM Workflows',
                'Lead Management',
                'Reporting Systems',
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

          {/* 04 Branding */}
          <div
            data-service="3"
            className="grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-6 border-t border-black/10 pt-6"
          >
            <div className="flex flex-col gap-2">
              <div className="text-xs font-bold tracking-[0.18em] text-[#0C4137]">04</div>
              <h3 className="m-0 text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                Branding
              </h3>
              <p className="m-0 text-base leading-relaxed text-[#3A3A3A]">
                Create brands people remember.
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5 items-start">
              {[
                'Brand Strategy',
                'Visual Identity',
                'Creative Direction',
                'Campaign Design',
                'Social Creative',
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

          {/* 05 Web Solutions */}
          <div
            data-service="4"
            className="grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-6 border-t border-black/10 pt-6"
          >
            <div className="flex flex-col gap-2">
              <div className="text-xs font-bold tracking-[0.18em] text-[#0C4137]">05</div>
              <h3 className="m-0 text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                Web Solutions
              </h3>
              <p className="m-0 text-base leading-relaxed text-[#3A3A3A]">
                Digital experiences built to convert.
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5 items-start">
              {[
                'Strategy',
                'UX',
                'UI',
                'Development',
                'Landing Pages',
                'E-Commerce',
                'CRO',
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

          <a
            href="#j38-audit"
            className="self-start inline-flex items-center justify-center min-h-[54px] bg-[#0A0A0A] hover:bg-[#0C4137] text-[#F5F5F2] px-7 py-4 rounded-2xl text-xs sm:text-sm font-bold tracking-[0.12em] uppercase whitespace-nowrap transition-colors"
          >
            Get My Free Audit ↗
          </a>
        </section>

        {/* Process Section */}
        <section
          id="process"
          data-screen-label="Process"
          className="py-14 sm:py-24 px-4 sm:px-10 lg:px-14 flex flex-col gap-8 sm:gap-12"
        >
          <h2 className="m-0 text-3xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
            From idea to scale.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { step: '01', title: 'Discover', desc: 'Research, audience, market, competition, opportunity.' },
              { step: '02', title: 'Define', desc: 'Positioning, strategy, goals, growth plan.' },
              { step: '03', title: 'Build', desc: 'Creative, technology, campaigns, systems.' },
              { step: '04', title: 'Launch', desc: 'Tracking, testing, deployment, optimization.' },
              { step: '05', title: 'Scale', desc: 'Performance, automation, expansion, iteration.' },
            ].map((p) => (
              <div
                key={p.step}
                className="bg-white border border-black/10 rounded-2xl p-5 sm:p-6 flex flex-col gap-3 shadow-2xs"
              >
                <div className="text-xs font-bold tracking-[0.18em] text-[#0C4137]">{p.step}</div>
                <h3 className="m-0 text-xl font-black tracking-tight">{p.title}</h3>
                <p className="m-0 text-sm sm:text-base leading-relaxed text-[#3A3A3A]">{p.desc}</p>
              </div>
            ))}
          </div>

          <a
            href="#j38-audit"
            className="self-start inline-flex items-center justify-center min-h-[54px] bg-[#0A0A0A] hover:bg-[#0C4137] text-[#F5F5F2] px-7 py-4 rounded-2xl text-xs sm:text-sm font-bold tracking-[0.12em] uppercase whitespace-nowrap transition-colors"
          >
            Get My Free Audit ↗
          </a>
        </section>

        {/* Audit Form Section */}
        <section
          data-screen-label="Audit form"
          className="py-14 sm:py-24 px-4 sm:px-10 lg:px-14 pb-28 sm:pb-36 flex justify-center"
        >
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
            className="flex-1 inline-flex items-center justify-center min-h-[52px] bg-[#0A0A0A] text-[#F5F5F2] rounded-xl text-xs font-bold tracking-[0.1em] uppercase"
          >
            Get My Free Audit
          </a>
          <a
            href="mailto:raselrehman222@gmail.com"
            className="inline-flex items-center justify-center min-h-[52px] px-4 border border-black/25 rounded-xl text-sm font-semibold text-[#0A0A0A] whitespace-nowrap"
          >
            Rather talk?
          </a>
        </div>

        {/* Footer */}
        <footer className="border-t border-black/10 py-10 sm:py-16 px-4 sm:px-10 lg:px-14 pb-28 sm:pb-32 flex flex-wrap items-end justify-between gap-6 bg-[#F5F5F2]">
          <div className="flex flex-col gap-2.5">
            <img
              src="/logo-black.png"
              alt="J38 Corporation"
              width={1541}
              height={178}
              loading="lazy"
              className="h-5 sm:h-6 w-auto block object-contain"
            />
            <div className="text-base text-[#3A3A3A]">Built for What&apos;s Next.</div>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap items-center gap-5 text-base">
            <a href="#services" className="hover:text-[#0C4137] transition-colors">
              Services
            </a>
            <a href="#process" className="hover:text-[#0C4137] transition-colors">
              Process
            </a>
            <a href="#j38-audit" className="hover:text-[#0C4137] transition-colors">
              Free audit
            </a>
            <Link href="/admin" className="text-xs uppercase tracking-wider text-[#55575A] hover:text-black">
              Admin
            </Link>
          </nav>

          <div className="text-base text-[#3A3A3A]">© J38 Corporation</div>
        </footer>
      </div>
    </div>
  );
}
