'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#F5F5F2]/95 backdrop-blur-md border-b border-black/10">
      <div className="flex items-center justify-between gap-4 py-3.5 px-4 sm:px-10 lg:px-14">
        {/* Brand Logo */}
        <Link href="/" aria-label="J38 Corporation home" className="flex items-center">
          <Image
            src="/logo-black.png"
            alt="J38 Corporation"
            width={1541}
            height={178}
            priority
            className="h-5 sm:h-6 w-auto block object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Main" className="hidden lg:flex items-center gap-7 text-sm font-medium">
          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              className="flex items-center gap-1.5 hover:text-[#0C4137] py-2 transition-colors cursor-pointer"
            >
              <span>Services</span>
              <svg className={`w-3.5 h-3.5 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </button>
            {servicesOpen && (
              <div className="absolute top-full left-0 w-64 bg-white border border-black/10 rounded-2xl p-2 shadow-xl flex flex-col gap-1 z-50">
                <Link
                  href="/services/digital-marketing"
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-[#0A0A0A] hover:bg-[#F5F5F2] hover:text-[#0C4137] transition-colors"
                >
                  Digital Marketing (Google &amp; Meta)
                </Link>
                <Link
                  href="/services/ai-solutions"
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-[#0A0A0A] hover:bg-[#F5F5F2] hover:text-[#0C4137] transition-colors"
                >
                  AI Solutions &amp; Agents
                </Link>
                <Link
                  href="/services/marketing-automation"
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-[#0A0A0A] hover:bg-[#F5F5F2] hover:text-[#0C4137] transition-colors"
                >
                  Marketing &amp; CRM Automation
                </Link>
                <Link
                  href="/services/branding"
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-[#0A0A0A] hover:bg-[#F5F5F2] hover:text-[#0C4137] transition-colors"
                >
                  Branding &amp; Creative
                </Link>
                <Link
                  href="/services/web-design-development"
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-[#0A0A0A] hover:bg-[#F5F5F2] hover:text-[#0C4137] transition-colors"
                >
                  Web Design &amp; Development
                </Link>
              </div>
            )}
          </div>

          {/* Industries Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIndustriesOpen(true)}
            onMouseLeave={() => setIndustriesOpen(false)}
          >
            <button
              type="button"
              className="flex items-center gap-1.5 hover:text-[#0C4137] py-2 transition-colors cursor-pointer"
            >
              <span>Industries</span>
              <svg className={`w-3.5 h-3.5 transition-transform ${industriesOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </button>
            {industriesOpen && (
              <div className="absolute top-full left-0 w-60 bg-white border border-black/10 rounded-2xl p-2 shadow-xl flex flex-col gap-1 z-50">
                <Link
                  href="/industries/home-services"
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-[#0A0A0A] hover:bg-[#F5F5F2] hover:text-[#0C4137] transition-colors"
                >
                  Home Services &amp; Contractors
                </Link>
                <Link
                  href="/industries/ecommerce"
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-[#0A0A0A] hover:bg-[#F5F5F2] hover:text-[#0C4137] transition-colors"
                >
                  E-commerce &amp; Shopify Brands
                </Link>
              </div>
            )}
          </div>

          <Link href="/about" className="hover:text-[#0C4137] py-2 transition-colors">
            About
          </Link>
          <Link href="/#results" className="hover:text-[#0C4137] py-2 transition-colors">
            Results
          </Link>
          <Link href="/#faq" className="hover:text-[#0C4137] py-2 transition-colors">
            FAQ
          </Link>
        </nav>

        {/* CTA Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/free-growth-audit"
            className="hidden sm:inline-flex items-center justify-center min-h-[44px] bg-[#0A0A0A] hover:bg-[#0C4137] text-[#F5F5F2] px-5 py-2.5 rounded-xl text-xs font-bold tracking-[0.1em] uppercase whitespace-nowrap transition-colors"
          >
            Get Free Growth Audit ↗
          </Link>

          {/* Mobile Burger Toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="lg:hidden cursor-pointer bg-transparent border border-black/20 rounded-xl min-w-[42px] min-h-[42px] flex flex-col items-center justify-center p-2"
          >
            <span className="block w-5 h-0.5 bg-[#0A0A0A]" />
            <span className="block w-5 h-0.5 bg-[#0A0A0A] mt-1.5" />
            <span className="block w-5 h-0.5 bg-[#0A0A0A] mt-1.5" />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="lg:hidden flex flex-col gap-2 py-4 px-5 border-t border-black/10 bg-[#F5F5F2] max-h-[80vh] overflow-y-auto">
          <div className="text-xs font-bold tracking-widest text-[#0C4137] uppercase pt-2">Services</div>
          <Link href="/services/digital-marketing" onClick={() => setMenuOpen(false)} className="text-sm font-semibold py-1.5 pl-2">
            Paid Ads (Google &amp; Meta)
          </Link>
          <Link href="/services/ai-solutions" onClick={() => setMenuOpen(false)} className="text-sm font-semibold py-1.5 pl-2">
            AI Solutions &amp; Agents
          </Link>
          <Link href="/services/marketing-automation" onClick={() => setMenuOpen(false)} className="text-sm font-semibold py-1.5 pl-2">
            Marketing &amp; CRM Automation
          </Link>
          <Link href="/services/branding" onClick={() => setMenuOpen(false)} className="text-sm font-semibold py-1.5 pl-2">
            Branding &amp; Creative
          </Link>
          <Link href="/services/web-design-development" onClick={() => setMenuOpen(false)} className="text-sm font-semibold py-1.5 pl-2">
            Web Design &amp; Development
          </Link>

          <div className="text-xs font-bold tracking-widest text-[#0C4137] uppercase pt-3 border-t border-black/10">Industries</div>
          <Link href="/industries/home-services" onClick={() => setMenuOpen(false)} className="text-sm font-semibold py-1.5 pl-2">
            Home Services &amp; Contractors
          </Link>
          <Link href="/industries/ecommerce" onClick={() => setMenuOpen(false)} className="text-sm font-semibold py-1.5 pl-2">
            E-commerce &amp; DTC
          </Link>

          <div className="pt-3 border-t border-black/10 flex flex-col gap-2">
            <Link href="/about" onClick={() => setMenuOpen(false)} className="text-sm font-semibold py-1.5">
              About J38 Corporation
            </Link>
            <Link
              href="/free-growth-audit"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center min-h-[48px] mt-2 bg-[#0A0A0A] text-[#F5F5F2] rounded-xl text-xs font-bold tracking-[0.1em] uppercase"
            >
              Get Free Growth Audit ↗
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
