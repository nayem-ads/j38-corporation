import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GrowthAuditForm from '@/components/GrowthAuditForm';

export const metadata: Metadata = {
  title: 'AI Automation Agency | AI Agents for Business | J38',
  description:
    'AI agents, integrations and workflows that answer leads, qualify enquiries and cut manual work. Built for US and European businesses. Book a free call.',
  alternates: {
    canonical: '/services/ai-solutions',
  },
};

export default function AiSolutionsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'AI automation',
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
              AI Automation Agency
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] mb-6">
              AI Automation Agency: AI Agents and Workflows That Save Time and Win Leads
            </h1>
            <p className="text-lg sm:text-xl text-[#3A3A3A] leading-relaxed mb-8 max-w-3xl">
              AI pays off when it removes a real cost: slow lead response, repetitive admin or missed follow-ups. J38 designs, builds and maintains AI agents and integrations around your existing tools. You get working systems with measurable output, not experiments.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#audit"
                className="inline-flex items-center justify-center min-h-[50px] bg-[#0A0A0A] hover:bg-[#0C4137] text-[#F5F5F2] px-7 py-3 rounded-xl text-xs font-bold tracking-[0.1em] uppercase transition-colors"
              >
                Book a Free AI Opportunity Call ↗
              </a>
              <Link
                href="/services/marketing-automation"
                className="inline-flex items-center justify-center min-h-[50px] border border-black/20 hover:border-black text-[#0A0A0A] px-6 py-3 rounded-xl text-xs font-bold tracking-[0.1em] uppercase transition-colors"
              >
                See CRM Automation →
              </Link>
            </div>
          </div>
        </section>

        {/* AI Services */}
        <section className="py-16 sm:py-24 px-4 sm:px-10 lg:px-14">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-bold tracking-[0.2em] uppercase text-[#0C4137] mb-3">
              Capabilities
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">AI Services</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7 shadow-xs">
              <h3 className="text-xl font-bold mb-3">AI Lead Response &amp; Qualification Agents</h3>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">
                Agents that reply to website, ad and WhatsApp enquiries within seconds. They ask your qualifying questions and book qualified prospects directly into your calendar.
              </p>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7 shadow-xs">
              <h3 className="text-xl font-bold mb-3">AI Customer Support Assistants</h3>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">
                Chat assistants trained on your FAQs, policies and product data. They answer routine questions 24/7 and seamlessly hand complex cases to your team.
              </p>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7 shadow-xs">
              <h3 className="text-xl font-bold mb-3">AI Integrations</h3>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">
                Connect OpenAI, Claude and bespoke LLM models to your CRM, helpdesk, Shopify store or internal tools through APIs, Zapier, Make or n8n.
              </p>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7 shadow-xs">
              <h3 className="text-xl font-bold mb-3">AI Content &amp; Creative Workflows</h3>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">
                Systems that draft ad variations, product descriptions and weekly performance summaries in your brand voice, with rigorous human review built in.
              </p>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7 shadow-xs">
              <h3 className="text-xl font-bold mb-3">AI Strategy &amp; Audit</h3>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">
                We map your operations, rank AI use cases by time saved and direct revenue impact, and build the highest-return implementations first.
              </p>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7 shadow-xs">
              <h3 className="text-xl font-bold mb-3">Custom AI Solutions</h3>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">
                Bespoke tools for specific bottlenecks that off-the-shelf software cannot solve, from automated document parsing to proprietary internal knowledge engines.
              </p>
            </div>
          </div>
        </section>

        {/* How We Build AI Systems */}
        <section className="py-16 sm:py-24 px-4 sm:px-10 lg:px-14 border-t border-black/10 bg-[#FAFAF8]">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">How We Build AI Systems</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-white border border-black/10 rounded-2xl p-5 shadow-2xs">
              <div className="text-xs font-bold text-[#0C4137] mb-2">01</div>
              <h3 className="text-lg font-bold mb-2">Discovery</h3>
              <p className="text-sm text-[#3A3A3A]">Map the workflow, the data inputs, and the operational cost of the current manual process.</p>
            </div>
            <div className="bg-white border border-black/10 rounded-2xl p-5 shadow-2xs">
              <div className="text-xs font-bold text-[#0C4137] mb-2">02</div>
              <h3 className="text-lg font-bold mb-2">Prototype</h3>
              <p className="text-sm text-[#3A3A3A]">Deliver a working version tested on your actual business data in rapid iterations.</p>
            </div>
            <div className="bg-white border border-black/10 rounded-2xl p-5 shadow-2xs">
              <div className="text-xs font-bold text-[#0C4137] mb-2">03</div>
              <h3 className="text-lg font-bold mb-2">Test</h3>
              <p className="text-sm text-[#3A3A3A]">Measure accuracy, response latency, and human hand-off smoothness before live release.</p>
            </div>
            <div className="bg-white border border-black/10 rounded-2xl p-5 shadow-2xs">
              <div className="text-xs font-bold text-[#0C4137] mb-2">04</div>
              <h3 className="text-lg font-bold mb-2">Deploy</h3>
              <p className="text-sm text-[#3A3A3A]">Go live inside your team&apos;s daily stack with comprehensive monitoring and automated fallbacks.</p>
            </div>
            <div className="bg-white border border-black/10 rounded-2xl p-5 shadow-2xs">
              <div className="text-xs font-bold text-[#0C4137] mb-2">05</div>
              <h3 className="text-lg font-bold mb-2">Improve</h3>
              <p className="text-sm text-[#3A3A3A]">Monthly reviews and prompt tuning as your business expands and base AI models evolve.</p>
            </div>
          </div>
        </section>

        {/* Data Privacy & Compliance */}
        <section className="py-16 sm:py-24 px-4 sm:px-10 lg:px-14 border-t border-black/10">
          <div className="max-w-4xl mx-auto bg-white border border-black/10 rounded-3xl p-8 sm:p-12 shadow-sm">
            <div className="text-xs font-bold tracking-[0.2em] uppercase text-[#0C4137] mb-3">
              Security
            </div>
            <h2 className="text-2xl sm:text-4xl font-black mb-4">Data Privacy &amp; Compliance</h2>
            <p className="text-base sm:text-lg text-[#3A3A3A] leading-relaxed">
              We design AI systems with GDPR and enterprise compliance at the foundation: strict data minimization, clear retention rules, zero public model training on your customer interactions, and enterprise vendor data-processing agreements.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 sm:py-24 px-4 sm:px-10 lg:px-14 border-t border-black/10 bg-[#FAFAF8]">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">AI FAQ</h2>
          </div>
          <div className="max-w-3xl flex flex-col gap-6">
            <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-xs">
              <h3 className="font-bold text-base mb-2">What is an AI automation agency?</h3>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">
                An AI automation agency builds AI-powered systems that handle business tasks automatically. Typical tasks are answering leads, supporting customers and processing documents.
              </p>
            </div>
            <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-xs">
              <h3 className="font-bold text-base mb-2">Will AI replace my team?</h3>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">
                No. AI takes over repetitive, high-volume work so your team can focus on closing deals, customer delivery, and high-leverage strategic decisions.
              </p>
            </div>
            <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-xs">
              <h3 className="font-bold text-base mb-2">Which tools do you integrate with?</h3>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">
                Common CRMs (HubSpot, GoHighLevel, Salesforce, Odoo), Shopify, Google Workspace, Slack, WhatsApp and any platform equipped with an API or webhook interface.
              </p>
            </div>
          </div>
        </section>

        {/* Audit Form */}
        <section id="audit" className="py-16 sm:py-24 px-4 sm:px-10 lg:px-14 border-t border-black/10 flex flex-col items-center">
          <div className="max-w-2xl text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-black mb-3">Book an AI Opportunity Audit</h2>
            <p className="text-base text-[#55575A]">Map where autonomous workflows will save hours and capture lost leads.</p>
          </div>
          <GrowthAuditForm />
        </section>
      </main>

      <Footer />
    </div>
  );
}
