import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-[#F5F5F2] pt-14 pb-16 px-4 sm:px-10 lg:px-14">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
        {/* Brand Col */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <Link href="/" className="inline-block">
            <Image
              src="/logo-black.png"
              alt="J38 Corporation"
              width={1541}
              height={178}
              className="h-6 w-auto block object-contain"
            />
          </Link>
          <p className="text-base text-[#3A3A3A] max-w-sm leading-relaxed">
            Performance digital marketing agency for businesses ready to scale. We plan, build, and run the ads, websites, and automation that turn spend into revenue.
          </p>
          <div className="flex flex-wrap gap-2 text-xs font-semibold text-[#0C4137] tracking-wider uppercase">
            <span>Founded 2020</span>
            <span>•</span>
            <span>$60M+ Spend Managed</span>
            <span>•</span>
            <span>Google &amp; Meta Certified</span>
          </div>
        </div>

        {/* Services Col */}
        <div className="flex flex-col gap-2.5">
          <div className="text-xs font-bold tracking-[0.14em] uppercase text-[#0C4137] mb-1">
            Services
          </div>
          <Link href="/services/digital-marketing" className="text-sm text-[#3A3A3A] hover:text-[#0C4137] transition-colors">
            Paid Ads (Google &amp; Meta)
          </Link>
          <Link href="/services/ai-solutions" className="text-sm text-[#3A3A3A] hover:text-[#0C4137] transition-colors">
            AI Solutions &amp; Agents
          </Link>
          <Link href="/services/marketing-automation" className="text-sm text-[#3A3A3A] hover:text-[#0C4137] transition-colors">
            Marketing &amp; CRM Automation
          </Link>
          <Link href="/services/branding" className="text-sm text-[#3A3A3A] hover:text-[#0C4137] transition-colors">
            Branding &amp; Creative
          </Link>
          <Link href="/services/web-design-development" className="text-sm text-[#3A3A3A] hover:text-[#0C4137] transition-colors">
            Web Design &amp; Development
          </Link>
        </div>

        {/* Industries Col */}
        <div className="flex flex-col gap-2.5">
          <div className="text-xs font-bold tracking-[0.14em] uppercase text-[#0C4137] mb-1">
            Industries
          </div>
          <Link href="/industries/home-services" className="text-sm text-[#3A3A3A] hover:text-[#0C4137] transition-colors">
            Home Services &amp; Contractors
          </Link>
          <Link href="/industries/ecommerce" className="text-sm text-[#3A3A3A] hover:text-[#0C4137] transition-colors">
            E-Commerce &amp; DTC Brands
          </Link>
          <Link href="/#industries" className="text-sm text-[#3A3A3A] hover:text-[#0C4137] transition-colors">
            Real Estate &amp; B2B
          </Link>
          <Link href="/free-growth-audit" className="text-sm text-[#3A3A3A] hover:text-[#0C4137] transition-colors">
            Free Growth Audit
          </Link>
        </div>

        {/* Company & Legal Col */}
        <div className="flex flex-col gap-2.5">
          <div className="text-xs font-bold tracking-[0.14em] uppercase text-[#0C4137] mb-1">
            Company
          </div>
          <Link href="/about" className="text-sm text-[#3A3A3A] hover:text-[#0C4137] transition-colors">
            About J38 Corporation
          </Link>
          <Link href="/#results" className="text-sm text-[#3A3A3A] hover:text-[#0C4137] transition-colors">
            Client Results
          </Link>
          <Link href="/#faq" className="text-sm text-[#3A3A3A] hover:text-[#0C4137] transition-colors">
            Frequently Asked Questions
          </Link>
          <Link href="/privacy" className="text-sm text-[#3A3A3A] hover:text-[#0C4137] transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-sm text-[#3A3A3A] hover:text-[#0C4137] transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-black/10 pt-8 flex flex-wrap items-center justify-between gap-4 text-xs text-[#777777]">
        <div>© 2020–2026 J38 Corporation. Built for What&apos;s Next. All rights reserved.</div>
        <div className="flex items-center gap-6">
          <Link href="/privacy" className="hover:text-black">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-black">Terms of Service</Link>
          <Link href="/free-growth-audit" className="font-bold text-[#0A0A0A] hover:text-[#0C4137]">Free Audit ↗</Link>
        </div>
      </div>
    </footer>
  );
}
