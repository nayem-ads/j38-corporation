import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GrowthAuditForm from '@/components/GrowthAuditForm';

export const metadata: Metadata = {
  title: 'Free Growth Audit | Google Ads & Meta Ads Analysis | J38',
  description:
    'Get a comprehensive growth audit of your Google Ads, Meta Ads, tracking and landing pages. Uncover wasted ad spend within 1 business day.',
  alternates: {
    canonical: '/free-growth-audit',
  },
};

export default function FreeGrowthAuditPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F2] text-[#0A0A0A] font-sans">
      <Header />

      <main className="py-14 sm:py-20 px-4 sm:px-10 lg:px-14 flex flex-col items-center">
        <div className="max-w-3xl text-center mb-10">
          <div className="text-xs font-bold tracking-[0.2em] uppercase text-[#0C4137] mb-3">
            Free Google &amp; Meta Ads Audit
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-4">
            Find Out Exactly Where Your Ad Budget Is Leaking
          </h1>
          <p className="text-base sm:text-lg text-[#3A3A3A] leading-relaxed max-w-2xl mx-auto">
            Our senior performance strategists analyze your ad accounts, pixel tracking, competitor benchmarks, and conversion funnels. Receive an actionable written breakdown within 1 business day.
          </p>
        </div>

        {/* Benefits bar */}
        <div className="max-w-4xl w-full grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <div className="bg-white border border-black/10 rounded-2xl p-4 text-center shadow-2xs">
            <div className="font-bold text-sm text-[#0A0A0A] mb-1">100% Free &amp; Confidential</div>
            <div className="text-xs text-[#777777]">No credit card or sales pressure required.</div>
          </div>
          <div className="bg-white border border-black/10 rounded-2xl p-4 text-center shadow-2xs">
            <div className="font-bold text-sm text-[#0A0A0A] mb-1">1 Business Day Turnaround</div>
            <div className="text-xs text-[#777777]">Direct review by senior strategists.</div>
          </div>
          <div className="bg-white border border-black/10 rounded-2xl p-4 text-center shadow-2xs">
            <div className="font-bold text-sm text-[#0A0A0A] mb-1">Actionable Recommendations</div>
            <div className="text-xs text-[#777777]">A prioritized list of what to fix first.</div>
          </div>
        </div>

        <GrowthAuditForm />
      </main>

      <Footer />
    </div>
  );
}
