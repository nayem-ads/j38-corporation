import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GrowthAuditForm from '@/components/GrowthAuditForm';

export const metadata: Metadata = {
  title: 'Conversion-Focused Web Design Agency | Landing Pages | J38',
  description:
    'Fast, conversion-focused websites, landing pages and e-commerce stores built to turn traffic into leads and sales. US and Europe. Get a free site audit.',
  alternates: {
    canonical: '/services/web-design-development',
  },
};

export default function WebDesignDevelopmentPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Web design',
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
              Web Design &amp; Development
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] mb-6">
              Conversion-Focused Web Design &amp; Development That Turns Visitors Into Customers
            </h1>
            <p className="text-lg sm:text-xl text-[#3A3A3A] leading-relaxed mb-8 max-w-3xl">
              A good-looking site that doesn&apos;t convert is an expensive brochure. J38 designs and builds websites, landing pages and stores around one job: turning paid and organic traffic into leads and sales. Every build ships fast, mobile-first, tracked and ready for SEO.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#audit"
                className="inline-flex items-center justify-center min-h-[50px] bg-[#0A0A0A] hover:bg-[#0C4137] text-[#F5F5F2] px-7 py-3 rounded-xl text-xs font-bold tracking-[0.1em] uppercase transition-colors"
              >
                Get a Free Website Audit ↗
              </a>
              <Link
                href="/services/digital-marketing"
                className="inline-flex items-center justify-center min-h-[50px] border border-black/20 hover:border-black text-[#0A0A0A] px-6 py-3 rounded-xl text-xs font-bold tracking-[0.1em] uppercase transition-colors"
              >
                See Paid Ads Management →
              </Link>
            </div>
          </div>
        </section>

        {/* Web Services */}
        <section className="py-16 sm:py-24 px-4 sm:px-10 lg:px-14">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-bold tracking-[0.2em] uppercase text-[#0C4137] mb-3">
              Services
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Web Services</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7 shadow-xs">
              <h3 className="text-xl font-bold mb-3">Website Strategy &amp; UX</h3>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">
                Sitemap, customer user journeys, page wireframes and conversion funnels strategically architected before visual design begins.
              </p>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7 shadow-xs">
              <h3 className="text-xl font-bold mb-3">UX &amp; UI Design</h3>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">
                Custom bespoke design in Figma, created to your exact brand standards and rigorously tested for mobile-first user experience.
              </p>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7 shadow-xs">
              <h3 className="text-xl font-bold mb-3">Landing Page Design</h3>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">
                High-converting landing pages matched to your advertising campaigns: one clear offer, one primary action, and instant page speed.
              </p>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7 shadow-xs">
              <h3 className="text-xl font-bold mb-3">Full-Stack Development</h3>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">
                Custom engineering on React, Next.js, WordPress or Webflow, with native integrations to your CRM, booking, and payment providers.
              </p>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7 shadow-xs">
              <h3 className="text-xl font-bold mb-3">E-Commerce Development</h3>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">
                Shopify store builds, theme customization, frictionless checkout optimization, and high-converting app ecosystem integrations.
              </p>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7 shadow-xs">
              <h3 className="text-xl font-bold mb-3">Conversion Rate Optimization (CRO)</h3>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">
                Heatmaps, user session recordings and data-backed A/B split tests that lift the conversion rate on the ad traffic you already pay for.
              </p>
            </div>
          </div>
        </section>

        {/* Every Site We Build Includes */}
        <section className="py-16 sm:py-24 px-4 sm:px-10 lg:px-14 border-t border-black/10 bg-[#FAFAF8]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black mb-8 text-center">Every Site We Build Includes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'Core Web Vitals Passing on Mobile', desc: 'Blazing fast load times, sub-second TTFB, and smooth layouts.' },
                { title: 'Technical SEO Foundations', desc: 'Clean semantic HTML, OpenGraph tags, sitemaps, and Schema markup.' },
                { title: 'End-to-End Analytics & Tracking', desc: 'GA4, Google Tag Manager, and server-side pixel tracking configured.' },
                { title: 'GDPR-Compliant Consent Banner', desc: 'Cookie consent and Google Consent Mode v2 for international visitors.' },
                { title: 'Editorial Training & Hand-Off', desc: 'Step-by-step guidance so your internal team can update content anytime.' },
              ].map((item) => (
                <div key={item.title} className="bg-white border border-black/10 rounded-2xl p-5 flex items-start gap-4">
                  <span className="text-[#06D6A0] text-xl font-black">✓</span>
                  <div>
                    <h4 className="font-bold text-base mb-1">{item.title}</h4>
                    <p className="text-sm text-[#3A3A3A]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 sm:py-24 px-4 sm:px-10 lg:px-14 border-t border-black/10">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Web Development FAQ</h2>
          </div>
          <div className="max-w-3xl flex flex-col gap-6">
            <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-xs">
              <h3 className="font-bold text-base mb-2">How long does a website take?</h3>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">
                Dedicated campaign landing pages typically ship in 1–2 weeks. Full custom website builds or complete e-commerce stores take 4–8 weeks.
              </p>
            </div>
            <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-xs">
              <h3 className="font-bold text-base mb-2">Will my website rank on Google?</h3>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">
                Every build ships with pristine technical SEO foundations. Rankings also depend on consistent content and domain authority, which our SEO services cover.
              </p>
            </div>
            <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-xs">
              <h3 className="font-bold text-base mb-2">Do you redesign existing websites?</h3>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">
                Yes. We audit what currently converts, preserve key organic URLs, and rebuild what isn&apos;t performing.
              </p>
            </div>
          </div>
        </section>

        {/* Audit Form */}
        <section id="audit" className="py-16 sm:py-24 px-4 sm:px-10 lg:px-14 border-t border-black/10 flex flex-col items-center">
          <div className="max-w-2xl text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-black mb-3">Request a Free Website &amp; CRO Audit</h2>
            <p className="text-base text-[#55575A]">Uncover mobile bottlenecks and landing page leaks hurting your conversions.</p>
          </div>
          <GrowthAuditForm />
        </section>
      </main>

      <Footer />
    </div>
  );
}
