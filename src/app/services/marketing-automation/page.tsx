import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GrowthAuditForm from '@/components/GrowthAuditForm';

export const metadata: Metadata = {
  title: 'Marketing Automation Agency | CRM & Sales Automation | J38',
  description:
    'Marketing and CRM automation that routes, nurtures and follows up every lead. HubSpot, GoHighLevel and more. Stop losing enquiries. Book a free audit.',
  alternates: {
    canonical: '/services/marketing-automation',
  },
};

export default function MarketingAutomationPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Marketing automation',
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
              CRM &amp; Sales Automation
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] mb-6">
              Marketing Automation Agency: Follow Up With Every Lead, Automatically
            </h1>
            <p className="text-lg sm:text-xl text-[#3A3A3A] leading-relaxed mb-8 max-w-3xl">
              Most lost revenue isn&apos;t lost at the ad. It&apos;s lost after the enquiry: slow replies, no follow-up, leads sitting in an inbox. J38 builds the CRM and automation systems that respond, nurture and route every lead until it buys or opts out.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#audit"
                className="inline-flex items-center justify-center min-h-[50px] bg-[#0A0A0A] hover:bg-[#0C4137] text-[#F5F5F2] px-7 py-3 rounded-xl text-xs font-bold tracking-[0.1em] uppercase transition-colors"
              >
                Get a Free Automation Audit ↗
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

        {/* Automation Services */}
        <section className="py-16 sm:py-24 px-4 sm:px-10 lg:px-14">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-bold tracking-[0.2em] uppercase text-[#0C4137] mb-3">
              Services
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Automation Services</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7 shadow-xs">
              <h3 className="text-xl font-bold mb-3">CRM Setup &amp; Workflows</h3>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">
                Pipelines, deal stages, task rules and real-time dashboards in HubSpot, GoHighLevel, Salesforce, Odoo or your current CRM platform.
              </p>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7 shadow-xs">
              <h3 className="text-xl font-bold mb-3">Lead Management &amp; Routing</h3>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">
                Every lead from ads, landing pages, forms, phone calls and chat is instantly captured, tagged by campaign source, and routed to the right sales rep in seconds.
              </p>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7 shadow-xs">
              <h3 className="text-xl font-bold mb-3">Email &amp; SMS Nurture Sequences</h3>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">
                Multi-step personalized follow-up sequences that convert cold enquiries into booked appointments and past buyers into repeat clients.
              </p>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7 shadow-xs">
              <h3 className="text-xl font-bold mb-3">Sales Automation</h3>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">
                Automated appointment scheduling, calendar reminders, proposal follow-up sequences, and no-show recovery flows that keep your pipeline packed.
              </p>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7 shadow-xs">
              <h3 className="text-xl font-bold mb-3">Reporting Systems</h3>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">
                Executive dashboards that connect ad spend directly to pipeline stages, booked sales calls, and closed revenue, showing your true cost per acquired customer.
              </p>
            </div>
          </div>
        </section>

        {/* What Changes After Automation */}
        <section className="py-16 sm:py-24 px-4 sm:px-10 lg:px-14 border-t border-black/10 bg-[#FAFAF8]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black mb-8 text-center">What Changes After Automation</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white border border-black/10 rounded-2xl p-6 flex items-start gap-4">
                <span className="text-[#06D6A0] text-2xl font-black">✓</span>
                <div>
                  <h4 className="font-bold text-base mb-1">Sub-5-Minute Lead Response</h4>
                  <p className="text-sm text-[#3A3A3A]">Leads get an automated personalized reply in under 5 minutes, 24/7/365.</p>
                </div>
              </div>
              <div className="bg-white border border-black/10 rounded-2xl p-6 flex items-start gap-4">
                <span className="text-[#06D6A0] text-2xl font-black">✓</span>
                <div>
                  <h4 className="font-bold text-base mb-1">Clear Ownership &amp; Next Steps</h4>
                  <p className="text-sm text-[#3A3A3A]">Every single enquiry has a designated owner, automated reminder, and defined next action.</p>
                </div>
              </div>
              <div className="bg-white border border-black/10 rounded-2xl p-6 flex items-start gap-4">
                <span className="text-[#06D6A0] text-2xl font-black">✓</span>
                <div>
                  <h4 className="font-bold text-base mb-1">Offline Conversion Feedback</h4>
                  <p className="text-sm text-[#3A3A3A]">Ad platforms receive offline conversion data via CAPI, training AI toward qualified buyers.</p>
                </div>
              </div>
              <div className="bg-white border border-black/10 rounded-2xl p-6 flex items-start gap-4">
                <span className="text-[#06D6A0] text-2xl font-black">✓</span>
                <div>
                  <h4 className="font-bold text-base mb-1">Cost Per Sale Visibility</h4>
                  <p className="text-sm text-[#3A3A3A]">You monitor real cost per closed deal and customer profit margin, not just cost per lead.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 sm:py-24 px-4 sm:px-10 lg:px-14 border-t border-black/10">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Automation FAQ</h2>
          </div>
          <div className="max-w-3xl flex flex-col gap-6">
            <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-xs">
              <h3 className="font-bold text-base mb-2">What is marketing automation?</h3>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">
                Marketing automation uses software to run repetitive marketing tasks automatically, such as follow-up emails, lead scoring and routing.
              </p>
            </div>
            <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-xs">
              <h3 className="font-bold text-base mb-2">Which CRM should I use?</h3>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">
                It depends on team size, sales process and budget. We recommend one after the audit and work with the CRM you already have where it fits.
              </p>
            </div>
            <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-xs">
              <h3 className="font-bold text-base mb-2">Can automation connect to my Google and Meta ads?</h3>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">
                Yes. We sync CRM outcomes back to Google Ads and Meta through offline conversions and the Conversions API.
              </p>
            </div>
          </div>
        </section>

        {/* Audit Form */}
        <section id="audit" className="py-16 sm:py-24 px-4 sm:px-10 lg:px-14 border-t border-black/10 flex flex-col items-center">
          <div className="max-w-2xl text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-black mb-3">Request a Free Automation Audit</h2>
            <p className="text-base text-[#55575A]">Inspect where leads drop out of your pipeline and how to automate recovery.</p>
          </div>
          <GrowthAuditForm />
        </section>
      </main>

      <Footer />
    </div>
  );
}
