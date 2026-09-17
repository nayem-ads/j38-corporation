'use client';

import React, { useState } from 'react';

interface FormData {
  service: string;
  budget: string;
  timeline: string;
  market: string;
  goal: string;
  name: string;
  company: string;
  email: string;
  phone: string;
}

const SERVICES = [
  'Digital Marketing',
  'AI',
  'Automation',
  'Branding',
  'Web Solutions',
  'Multiple Services',
];

const BUDGETS = ['$2K–$5K', '$5K–$10K', '$10K–$25K', '$25K+'];

const TIMELINES = [
  'Immediately',
  'Within 30 days',
  'This quarter',
  'Still planning',
];

const MARKETS = [
  'United States',
  'Australia',
  'New Zealand',
  'Europe',
  'Middle East',
  'Other',
];

export default function GrowthAuditForm() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [form, setForm] = useState<FormData>({
    service: '',
    budget: '',
    timeline: '',
    market: '',
    goal: '',
    name: '',
    company: '',
    email: '',
    phone: '',
  });

  const updateField = (key: keyof FormData, val: string) => {
    setForm((prev) => ({ ...prev, [key]: val }));
    if (errorMessage) setErrorMessage(null);
  };

  const isStepValid = (s: number): boolean => {
    if (s === 0) return Boolean(form.service && form.budget && form.timeline);
    if (s === 1) return Boolean(form.market && form.goal.trim().length >= 5);
    if (s === 2) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return Boolean(form.name.trim().length >= 2 && emailRegex.test(form.email.trim()));
    }
    return false;
  };

  const getHint = (): string => {
    if (done) return 'Audit request received';
    if (step === 0) {
      return isStepValid(0)
        ? 'Takes under 60 seconds'
        : 'Pick a service, budget and timeline to continue';
    }
    if (step === 1) {
      return isStepValid(1)
        ? 'Great! Now tell us who to send the findings to'
        : 'Add your market and target goal to continue';
    }
    return isStepValid(2)
      ? 'Ready to send'
      : 'Add your name and valid email to complete';
  };

  const handleNext = () => {
    if (isStepValid(step)) {
      setStep((prev) => Math.min(2, prev + 1));
    }
  };

  const handleBack = () => {
    setStep((prev) => Math.max(0, prev - 1));
  };

  const handleSubmit = async () => {
    if (!isStepValid(2) || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit audit request.');
      }

      setDone(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Something went wrong. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isStepValid(step)) return;
      if (step === 2) {
        handleSubmit();
      } else {
        handleNext();
      }
    }
  };

  const optBtnClass = (active: boolean) =>
    `text-left cursor-pointer min-h-[52px] px-4 py-3.5 rounded-xl font-medium text-sm transition-all duration-200 border-2 ${
      active
        ? 'bg-[#0A0A0A] text-[#F5F5F2] border-[#0A0A0A] font-bold shadow-md'
        : 'bg-white text-[#1A1A1A] border-black/10 hover:border-black/30 hover:bg-[#F9FAFB]'
    }`;

  const stepPercentage = done ? 100 : ((step + 1) / 3) * 100;

  return (
    <div
      id="j38-audit"
      className="scroll-mt-32 w-full max-w-[820px] text-left bg-white border border-black/10 rounded-[24px] shadow-[0_24px_70px_rgba(0,0,0,0.12)] p-6 sm:p-10 flex flex-col gap-6 transition-all"
    >
      {/* Header & Step progress */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[#06D6A0] text-[#0A0A0A] text-sm font-black">
              ∞
            </span>
            <span className="text-xl sm:text-2xl font-black tracking-tight text-[#0A0A0A]">
              Get your free growth audit
            </span>
          </div>
          <div className="text-xs font-semibold tracking-widest uppercase text-[#55575A]">
            {done ? 'Completed' : `Step ${step + 1} of 3`}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-black/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#06D6A0] transition-all duration-500 ease-out"
            style={{ width: `${stepPercentage}%` }}
          />
        </div>

        <p className="m-0 text-[15px] sm:text-base leading-relaxed text-[#3A3A3A]">
          We review your ads, tracking and landing pages, then send you the findings — what&apos;s
          leaking budget and what to fix first. No charge, no obligation.
        </p>

        <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-[#0C4137]">
          <span>✓ Reply within 1 business day</span>
          <span>✓ No sales pressure</span>
          <span>✓ Your details stay private</span>
        </div>
      </div>

      {/* Error Alert if any */}
      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
          {errorMessage}
        </div>
      )}

      {/* Done / Confirmation State */}
      {done ? (
        <div className="flex flex-col gap-4 py-6 animate-in fade-in zoom-in-95 duration-400">
          <div className="w-14 h-14 rounded-2xl bg-[#06D6A0]/20 text-[#0C4137] flex items-center justify-center text-3xl font-black">
            ✓
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight uppercase text-[#0A0A0A] m-0">
              Audit Request Received
            </h3>
            <p className="text-base leading-relaxed text-[#55575A] mt-2">
              Thank you, <strong className="text-black">{form.name}</strong>. Your audit request has
              been routed to our senior growth strategists. We will review your materials and reach out
              to <span className="font-semibold text-black">{form.email}</span> within one business day.
            </p>
          </div>
          <div className="pt-4 border-t border-black/10 flex gap-4">
            <button
              type="button"
              onClick={() => {
                setDone(false);
                setStep(0);
                setForm({
                  service: '',
                  budget: '',
                  timeline: '',
                  market: '',
                  goal: '',
                  name: '',
                  company: '',
                  email: '',
                  phone: '',
                });
              }}
              className="text-xs font-bold uppercase tracking-wider text-[#55575A] hover:text-black transition-colors"
            >
              Submit another inquiry ↗
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Step 1: Requirements */}
          {step === 0 && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-300">
              <div className="flex flex-col gap-2.5">
                <label className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#55575A]">
                  What do you need? <span className="text-[#06D6A0]">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {SERVICES.map((srv) => (
                    <button
                      key={srv}
                      type="button"
                      onClick={() => updateField('service', srv)}
                      className={optBtnClass(form.service === srv)}
                    >
                      {srv}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                <label className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#55575A]">
                  Monthly ad budget <span className="text-[#06D6A0]">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {BUDGETS.map((bg) => (
                    <button
                      key={bg}
                      type="button"
                      onClick={() => updateField('budget', bg)}
                      className={optBtnClass(form.budget === bg)}
                    >
                      {bg}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                <label className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#55575A]">
                  When do you want to start? <span className="text-[#06D6A0]">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {TIMELINES.map((tm) => (
                    <button
                      key={tm}
                      type="button"
                      onClick={() => updateField('timeline', tm)}
                      className={optBtnClass(form.timeline === tm)}
                    >
                      {tm}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Market & Goals */}
          {step === 1 && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-300">
              <div className="flex flex-col gap-2.5">
                <label className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#55575A]">
                  Where do you sell? <span className="text-[#06D6A0]">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {MARKETS.map((mkt) => (
                    <button
                      key={mkt}
                      type="button"
                      onClick={() => updateField('market', mkt)}
                      className={optBtnClass(form.market === mkt)}
                    >
                      {mkt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                <label
                  htmlFor="audit-goal"
                  className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#55575A]"
                >
                  What are you trying to achieve? <span className="text-[#06D6A0]">*</span>
                </label>
                <textarea
                  id="audit-goal"
                  rows={4}
                  value={form.goal}
                  onChange={(e) => updateField('goal', e.target.value)}
                  placeholder="E.g., More qualified B2B leads, lower cost per acquisition, scaling e-commerce ROAS, rebuilding website to convert better..."
                  className="font-sans text-sm text-[#0A0A0A] bg-white border border-black/15 rounded-xl p-4 resize-y focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                />
              </div>
            </div>
          )}

          {/* Step 3: Contact Details */}
          {step === 2 && (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in duration-300"
              onKeyDown={handleKeyDown}
            >
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="audit-name"
                  className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#55575A]"
                >
                  Name <span className="text-[#0C4137]">*</span>
                </label>
                <input
                  id="audit-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="Your full name"
                  className="font-sans text-sm text-[#0A0A0A] bg-white border border-black/15 rounded-xl px-4 py-3.5 min-h-[50px] focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="audit-company"
                  className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#55575A]"
                >
                  Company <span className="text-xs text-[#888888] font-normal normal-case">(optional)</span>
                </label>
                <input
                  id="audit-company"
                  type="text"
                  value={form.company}
                  onChange={(e) => updateField('company', e.target.value)}
                  placeholder="Your company name"
                  className="font-sans text-sm text-[#0A0A0A] bg-white border border-black/15 rounded-xl px-4 py-3.5 min-h-[50px] focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="audit-email"
                  className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#55575A]"
                >
                  Email <span className="text-[#0C4137]">*</span>
                </label>
                <input
                  id="audit-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="name@company.com"
                  className="font-sans text-sm text-[#0A0A0A] bg-white border border-black/15 rounded-xl px-4 py-3.5 min-h-[50px] focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="audit-phone"
                  className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#55575A]"
                >
                  Phone / WhatsApp <span className="text-xs text-[#888888] font-normal normal-case">(optional)</span>
                </label>
                <input
                  id="audit-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="font-sans text-sm text-[#0A0A0A] bg-white border border-black/15 rounded-xl px-4 py-3.5 min-h-[50px] focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                />
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {step > 0 && (
              <button
                type="button"
                onClick={handleBack}
                disabled={isSubmitting}
                className="cursor-pointer font-sans bg-transparent text-[#55575A] border border-black/20 hover:border-black/50 px-6 py-3.5 rounded-xl text-xs font-bold tracking-[0.14em] uppercase transition-colors"
              >
                Back
              </button>
            )}

            {step < 2 ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={!isStepValid(step)}
                className={`cursor-pointer font-sans px-7 py-3.5 rounded-xl text-xs font-bold tracking-[0.14em] uppercase transition-all duration-200 ${
                  isStepValid(step)
                    ? 'bg-[#0A0A0A] text-[#F5F5F2] hover:bg-[#06D6A0] hover:text-[#0A0A0A] shadow-md'
                    : 'bg-[#DEDED8] text-[#888888] cursor-not-allowed'
                }`}
              >
                Continue
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!isStepValid(2) || isSubmitting}
                className={`cursor-pointer font-sans px-7 py-3.5 rounded-xl text-xs font-bold tracking-[0.14em] uppercase transition-all duration-200 flex items-center gap-2 ${
                  isStepValid(2) && !isSubmitting
                    ? 'bg-[#0A0A0A] text-[#F5F5F2] hover:bg-[#06D6A0] hover:text-[#0A0A0A] shadow-lg'
                    : 'bg-[#DEDED8] text-[#888888] cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending Request...
                  </>
                ) : (
                  'Send My Audit Request ↗'
                )}
              </button>
            )}

            <span className="text-[11px] font-medium tracking-wider uppercase text-[#55575A] ml-auto">
              {getHint()}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
