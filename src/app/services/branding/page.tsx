import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GrowthAuditForm from '@/components/GrowthAuditForm';

export const metadata: Metadata = {
  title: 'Branding Agency | Brand Strategy & Identity Design | J38',
  description:
    'Brand strategy, visual identity and creative direction for businesses that want to stand out and sell more. Serving the US and Europe. Get a free consult.',
  alternates: {
    canonical: '/services/branding',
  },
};

export default function BrandingPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Branding',
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
              Brand Strategy &amp; Identity Design
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] mb-6">
              Branding Agency for Businesses That Want to Be Chosen, Not Compared
            </h1>
            <p className="text-lg sm:text-xl text-[#3A3A3A] leading-relaxed mb-8 max-w-3xl">
              When buyers can&apos;t tell you apart from competitors, they choose on price. J38 builds brands with a clear position, a consistent look and a message your market remembers. Then we carry that brand into ads, websites and social, so it works where customers actually see it.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#audit"
                className="inline-flex items-center justify-center min-h-[50px] bg-[#0A0A0A] hover:bg-[#0C4137] text-[#F5F5F2] px-7 py-3 rounded-xl text-xs font-bold tracking-[0.1em] uppercase transition-colors"
              >
                Book a Free Brand Consultation ↗
              </a>
              <Link
                href="/services/web-design-development"
                className="inline-flex items-center justify-center min-h-[50px] border border-black/20 hover:border-black text-[#0A0A0A] px-6 py-3 rounded-xl text-xs font-bold tracking-[0.1em] uppercase transition-colors"
              >
                See Web Design &amp; Dev →
              </Link>
            </div>
          </div>
        </section>

        {/* Branding Services */}
        <section className="py-16 sm:py-24 px-4 sm:px-10 lg:px-14">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-bold tracking-[0.2em] uppercase text-[#0C4137] mb-3">
              Capabilities
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Branding Services</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7 shadow-xs">
              <h3 className="text-xl font-bold mb-3">Brand Strategy &amp; Positioning</h3>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">
                Audience research, competitor mapping, value proposition articulation and messaging hierarchy that resonates in crowded spaces.
              </p>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7 shadow-xs">
              <h3 className="text-xl font-bold mb-3">Visual Identity Design</h3>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">
                Complete logo system, color palette, typography hierarchy, iconography and a brand guidelines document your team and external vendors can follow seamlessly.
              </p>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7 shadow-xs">
              <h3 className="text-xl font-bold mb-3">Creative Direction</h3>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">
                One unified creative standard across photography, video, web experiences and advertising campaigns, so every customer touchpoint looks like the same world-class company.
              </p>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7 shadow-xs">
              <h3 className="text-xl font-bold mb-3">Campaign Design</h3>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">
                Product launches and seasonal promotional campaign concepts with key visual assets adapted for digital, social, print, and display.
              </p>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7 shadow-xs">
              <h3 className="text-xl font-bold mb-3">Social Media Creative</h3>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">
                Templates and reusable modular content systems that keep your social feeds polished and on-brand without having to design from scratch each week.
              </p>
            </div>
          </div>
        </section>

        {/* Deliverables You Keep */}
        <section className="py-16 sm:py-24 px-4 sm:px-10 lg:px-14 border-t border-black/10 bg-[#FAFAF8]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black mb-8 text-center">Deliverables You Keep</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'Brand Strategy Document', desc: 'Market analysis, persona breakdowns, and key positioning statements.' },
                { title: 'Logo Files in All Formats', desc: 'Vector SVG, high-res PNG, PDF, and dark/light color variations.' },
                { title: 'Brand Guidelines (PDF + Figma)', desc: 'Clear rules for typography, spacing, palettes, and imagery rules.' },
                { title: 'Ad & Social Templates', desc: 'Plug-and-play Canva or Figma ad templates ready for your growth campaigns.' },
                { title: '100% Asset Ownership', desc: 'Full commercial rights and source vector files transferred to you upon completion.' },
              ].map((d) => (
                <div key={d.title} className="bg-white border border-black/10 rounded-2xl p-5 flex items-start gap-4">
                  <span className="text-[#06D6A0] text-xl font-black">✓</span>
                  <div>
                    <h4 className="font-bold text-base mb-1">{d.title}</h4>
                    <p className="text-sm text-[#3A3A3A]">{d.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 sm:py-24 px-4 sm:px-10 lg:px-14 border-t border-black/10">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Branding FAQ</h2>
          </div>
          <div className="max-w-3xl flex flex-col gap-6">
            <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-xs">
              <h3 className="font-bold text-base mb-2">How long does a branding project take?</h3>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">
                A typical brand strategy and visual identity project takes 3–6 weeks from kickoff to final asset delivery.
              </p>
            </div>
            <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-xs">
              <h3 className="font-bold text-base mb-2">Do you redesign existing brands?</h3>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">
                Yes. We frequently refresh established brands that have outgrown their original look, preserving the brand equity and recognition your existing customers trust.
              </p>
            </div>
          </div>
        </section>

        {/* Audit Form */}
        <section id="audit" className="py-16 sm:py-24 px-4 sm:px-10 lg:px-14 border-t border-black/10 flex flex-col items-center">
          <div className="max-w-2xl text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-black mb-3">Request a Brand &amp; Creative Audit</h2>
            <p className="text-base text-[#55575A]">Let us evaluate your market positioning and creative conversion strength.</p>
          </div>
          <GrowthAuditForm />
        </section>
      </main>

      <Footer />
    </div>
  );
}
