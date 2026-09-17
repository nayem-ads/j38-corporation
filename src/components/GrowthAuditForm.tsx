'use client';

import React, { useState } from 'react';

const CHIP_ON =
  'cursor-pointer text-left min-h-[48px] px-4 py-3 rounded-xl font-bold text-sm bg-[#0A0A0A] text-[#F5F5F2] border-2 border-[#0A0A0A] shadow-sm transition-all duration-150';
const CHIP_OFF =
  'cursor-pointer text-left min-h-[48px] px-4 py-3 rounded-xl font-medium text-sm bg-white text-[#0A0A0A] border-2 border-black/20 hover:border-black/40 hover:bg-[#F9FAFB] transition-all duration-150';
const FIELD_BASE =
  'font-sans text-base min-h-[52px] text-[#0A0A0A] bg-white rounded-xl px-4 py-3.5 border transition-colors outline-none focus:ring-1 focus:ring-black ';

interface FormData {
  name: string;
  email: string;
  website: string;
  service: string;
  budget: string;
  timeline: string;
  market: string;
  goal: string;
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

const BUDGETS = ['Under $2K', '$2K–$5K', '$5K–$10K', '$10K–$25K', '$25K+'];

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
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [tried, setTried] = useState<Record<number, boolean>>({});

  const [f, setF] = useState<FormData>({
    name: '',
    email: '',
    website: '',
    service: '',
    budget: '',
    timeline: '',
    market: '',
    goal: '',
    phone: '',
  });

  const put = (k: keyof FormData, v: string) => {
    setF((prev) => ({ ...prev, [k]: v }));
    if (error) setError('');
  };

  const touch = (k: string) => {
    setTouched((prev) => ({ ...prev, [k]: true }));
  };

  const needsBudget = () => {
    return f.service === 'Digital Marketing' || f.service === 'Multiple Services';
  };

  const badName = () => !f.name.trim();
  const badEmail = () => !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim());
  const badSite = () => {
    const v = f.website.trim().replace(/^https?:\/\//i, '');
    return !/^[^\s.]+\.[^\s.]{2,}/.test(v);
  };

  const valid = (s: number): boolean => {
    if (s === 0) return !badName() && !badEmail() && !badSite();
    if (s === 1) return Boolean(f.service && f.timeline && (needsBudget() ? f.budget : true));
    return Boolean(f.market);
  };

  const next = () => {
    if (!valid(step)) {
      setTried((prev) => ({ ...prev, [step]: true }));
      setTouched({ name: true, email: true, website: true });
      return;
    }
    setStep((prev) => Math.min(2, prev + 1));
    setError('');
  };

  const back = () => {
    setStep((prev) => Math.max(0, prev - 1));
    setError('');
  };

  const track = () => {
    try {
      const win = window as any;
      if (win.fbq) win.fbq('track', 'Lead', { content_name: 'Free growth audit' });
      if (win.gtag) win.gtag('event', 'generate_lead', { event_category: 'audit' });
      if (win.dataLayer) {
        win.dataLayer.push({ event: 'audit_request', service: f.service, budget: f.budget });
      }
    } catch {
      // analytics non-blocking
    }
  };

  const send = async () => {
    if (sending) return;
    if (!valid(2)) {
      setTried((prev) => ({ ...prev, [2]: true }));
      return;
    }

    setSending(true);
    setError('');

    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...f,
          submittedAt: new Date().toISOString(),
          page: typeof window !== 'undefined' ? window.location.href : '',
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "That didn't go through. Please check your connection and try again.");
      }

      track();
      setSending(false);
      setDone(true);
    } catch (e: any) {
      setSending(false);
      setError(e.message || "That didn't go through. Please check your connection and try again.");
    }
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter' || e.shiftKey) return;
    e.preventDefault();
    if (step === 2) {
      send();
    } else {
      next();
    }
  };

  const showNameErr = (touched.name || tried[0]) && badName();
  const showEmailErr = (touched.email || tried[0]) && badEmail();
  const showSiteErr = (touched.website || tried[0]) && badSite();

  const step2Bad = Boolean(tried[1] && !valid(1));
  const step2Msg = !f.service
    ? 'Pick the service you need.'
    : needsBudget() && !f.budget
    ? 'Pick a monthly ad budget.'
    : 'Pick when you want to start.';

  const step3Bad = Boolean(tried[2] && !f.market);

  return (
    <div
      id="j38-audit"
      style={{ scrollMarginTop: '90px' }}
      className="w-full max-w-[820px] bg-white border border-black/15 rounded-[22px] shadow-[0_24px_70px_rgba(0,0,0,0.12)] p-6 sm:p-11 flex flex-col gap-6 text-left"
    >
      {!done && (
        <div className="flex flex-col gap-3.5">
          <h2 className="m-0 text-2xl sm:text-3xl lg:text-4xl font-black leading-tight tracking-tight text-[#0A0A0A]">
            Get your free growth audit
          </h2>
          <p className="m-0 text-base sm:text-lg leading-relaxed text-[#3A3A3A]">
            We review your ads, tracking and landing pages, then send you the findings — what&apos;s
            leaking budget and what to fix first. Reply within 1 business day.
          </p>

          <div className="flex flex-wrap items-baseline justify-between gap-2 pt-1">
            <span className="text-sm font-bold text-[#0C4137]">Step {step + 1} of 3</span>
            <span className="text-sm text-[#3A3A3A]">Takes under 60 seconds</span>
          </div>

          <div
            role="progressbar"
            aria-valuemin={1}
            aria-valuemax={3}
            aria-valuenow={step + 1}
            className="h-1 bg-black/10 rounded-full overflow-hidden"
          >
            <div
              className="h-full bg-[#0C4137] rounded-full transition-all duration-400 ease-out"
              style={{ width: `${((step + 1) / 3) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Step 1: Name, Email, Website */}
      {!done && step === 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-in fade-in duration-200">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="j38-name" className="text-sm sm:text-base font-semibold text-[#0A0A0A]">
              Your name
            </label>
            <input
              id="j38-name"
              type="text"
              name="name"
              autoComplete="name"
              value={f.name}
              onChange={(e) => put('name', e.target.value)}
              onBlur={() => touch('name')}
              onKeyDown={onKey}
              className={FIELD_BASE + (showNameErr ? 'border-[#B3261E] focus:border-[#B3261E]' : 'border-black/20 focus:border-black')}
            />
            {showNameErr && (
              <span className="text-xs text-[#8C1D18] font-medium">Please enter your name.</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="j38-email" className="text-sm sm:text-base font-semibold text-[#0A0A0A]">
              Work email
            </label>
            <input
              id="j38-email"
              type="email"
              name="email"
              inputMode="email"
              autoComplete="email"
              value={f.email}
              onChange={(e) => put('email', e.target.value)}
              onBlur={() => touch('email')}
              onKeyDown={onKey}
              className={FIELD_BASE + (showEmailErr ? 'border-[#B3261E] focus:border-[#B3261E]' : 'border-black/20 focus:border-black')}
            />
            {showEmailErr && (
              <span className="text-xs text-[#8C1D18] font-medium">
                Enter a valid email, e.g. you@company.com
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1.5 sm:col-span-2 lg:col-span-1">
            <label htmlFor="j38-website" className="text-sm sm:text-base font-semibold text-[#0A0A0A]">
              Website
            </label>
            <input
              id="j38-website"
              type="url"
              name="url"
              inputMode="url"
              autoComplete="url"
              placeholder="yourcompany.com"
              value={f.website}
              onChange={(e) => put('website', e.target.value)}
              onBlur={() => touch('website')}
              onKeyDown={onKey}
              className={FIELD_BASE + (showSiteErr ? 'border-[#B3261E] focus:border-[#B3261E]' : 'border-black/20 focus:border-black')}
            />
            {showSiteErr && (
              <span className="text-xs text-[#8C1D18] font-medium">
                Enter the site we should review, e.g. yourcompany.com
              </span>
            )}
          </div>
        </div>
      )}

      {/* Step 2: Services, Budget, Timeline */}
      {!done && step === 1 && (
        <div className="flex flex-col gap-5 animate-in fade-in duration-200">
          <fieldset className="border-none m-0 p-0 flex flex-col gap-2.5">
            <legend className="p-0 text-sm sm:text-base font-semibold text-[#0A0A0A]">
              What do you need?
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {SERVICES.map((srv) => (
                <button
                  key={srv}
                  type="button"
                  onClick={() => put('service', srv)}
                  className={f.service === srv ? CHIP_ON : CHIP_OFF}
                >
                  {srv}
                </button>
              ))}
            </div>
          </fieldset>

          {needsBudget() && (
            <fieldset className="border-none m-0 p-0 flex flex-col gap-2.5">
              <legend className="p-0 text-sm sm:text-base font-semibold text-[#0A0A0A]">
                Monthly ad budget
              </legend>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                {BUDGETS.map((bg) => (
                  <button
                    key={bg}
                    type="button"
                    onClick={() => put('budget', bg)}
                    className={f.budget === bg ? CHIP_ON : CHIP_OFF}
                  >
                    {bg}
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          <fieldset className="border-none m-0 p-0 flex flex-col gap-2.5">
            <legend className="p-0 text-sm sm:text-base font-semibold text-[#0A0A0A]">
              When do you want to start?
            </legend>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {TIMELINES.map((tm) => (
                <button
                  key={tm}
                  type="button"
                  onClick={() => put('timeline', tm)}
                  className={f.timeline === tm ? CHIP_ON : CHIP_OFF}
                >
                  {tm}
                </button>
              ))}
            </div>
          </fieldset>

          {step2Bad && (
            <span className="text-xs sm:text-sm text-[#8C1D18] font-semibold">{step2Msg}</span>
          )}
        </div>
      )}

      {/* Step 3: Market, Goals, Phone */}
      {!done && step === 2 && (
        <div className="flex flex-col gap-5 animate-in fade-in duration-200">
          <fieldset className="border-none m-0 p-0 flex flex-col gap-2.5">
            <legend className="p-0 text-sm sm:text-base font-semibold text-[#0A0A0A]">
              Where do you sell?
            </legend>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {MARKETS.map((mkt) => (
                <button
                  key={mkt}
                  type="button"
                  onClick={() => put('market', mkt)}
                  className={f.market === mkt ? CHIP_ON : CHIP_OFF}
                >
                  {mkt}
                </button>
              ))}
            </div>
          </fieldset>
          {step3Bad && (
            <span className="text-xs sm:text-sm text-[#8C1D18] font-semibold">
              Pick the market you sell in.
            </span>
          )}

          <div className="flex flex-col gap-1.5">
            <label htmlFor="j38-goal" className="text-sm sm:text-base font-semibold text-[#0A0A0A]">
              What are you trying to achieve? <span className="font-normal text-[#3A3A3A]">(optional)</span>
            </label>
            <textarea
              id="j38-goal"
              rows={3}
              value={f.goal}
              onChange={(e) => put('goal', e.target.value)}
              placeholder="More qualified leads, lower cost per lead, scaling a store…"
              className="font-sans text-base text-[#0A0A0A] bg-white border border-black/20 rounded-xl p-3.5 resize-y focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="j38-phone" className="text-sm sm:text-base font-semibold text-[#0A0A0A]">
              Phone / WhatsApp <span className="font-normal text-[#3A3A3A]">(optional)</span>
            </label>
            <input
              id="j38-phone"
              type="tel"
              name="tel"
              inputMode="tel"
              autoComplete="tel"
              value={f.phone}
              onChange={(e) => put('phone', e.target.value)}
              onKeyDown={onKey}
              className={FIELD_BASE + 'border-black/20 focus:border-black'}
            />
          </div>
        </div>
      )}

      {/* Done State */}
      {done && (
        <div className="flex flex-col gap-3.5 py-4 animate-in fade-in duration-300">
          <div className="text-4xl text-[#0C4137] leading-none font-bold">∞</div>
          <h2 className="m-0 text-2xl sm:text-3xl font-black tracking-tight uppercase text-[#0A0A0A]">
            Request received.
          </h2>
          <p className="m-0 text-base sm:text-lg leading-relaxed text-[#3A3A3A]">
            Here&apos;s what happens next: we review your ads, tracking and landing pages, then email
            the findings to <strong className="text-black font-bold">{f.email}</strong> within 1
            business day. If we need access to anything, we&apos;ll ask in that same email.
          </p>
          <div className="pt-4 border-t border-black/10">
            <button
              type="button"
              onClick={() => {
                setDone(false);
                setStep(0);
                setF({
                  name: '',
                  email: '',
                  website: '',
                  service: '',
                  budget: '',
                  timeline: '',
                  market: '',
                  goal: '',
                  phone: '',
                });
              }}
              className="text-xs font-bold uppercase tracking-wider text-[#55575A] hover:text-black transition-colors"
            >
              Submit another inquiry ↗
            </button>
          </div>
        </div>
      )}

      {/* Error alert */}
      {error && (
        <div
          role="alert"
          className="border border-[#B3261E] bg-[#FDEDEC] text-[#8C1D18] rounded-xl p-3.5 text-sm sm:text-base leading-relaxed"
        >
          {error}
        </div>
      )}

      {/* Action Buttons */}
      {!done && (
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {step > 0 && (
            <button
              type="button"
              onClick={back}
              className="cursor-pointer font-sans min-h-[54px] px-6 py-4 rounded-xl text-xs sm:text-sm font-bold tracking-[0.12em] uppercase bg-transparent text-[#0A0A0A] border border-black/25 hover:border-black/50 transition-colors"
            >
              ← Back
            </button>
          )}

          {step < 2 ? (
            <button
              type="button"
              onClick={next}
              className="cursor-pointer font-sans min-h-[54px] px-7 py-4 rounded-xl text-xs sm:text-sm font-bold tracking-[0.12em] uppercase bg-[#0A0A0A] hover:bg-[#0C4137] text-[#F5F5F2] transition-colors"
            >
              Continue →
            </button>
          ) : (
            <button
              type="button"
              onClick={send}
              disabled={sending}
              className="cursor-pointer font-sans min-h-[54px] px-7 py-4 rounded-xl text-xs sm:text-sm font-bold tracking-[0.12em] uppercase bg-[#0A0A0A] hover:bg-[#0C4137] text-[#F5F5F2] transition-colors flex items-center gap-2"
            >
              {sending ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending…
                </>
              ) : (
                'Send My Audit Request ↗'
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
