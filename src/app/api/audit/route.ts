import { NextRequest, NextResponse } from 'next/server';
import { createAudit } from '@/lib/db';
import { sendAuditNotification, sendProspectConfirmation } from '@/lib/notifications';

// In-memory rate limiting map: ip -> array of timestamps
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  
  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    rateLimitMap.set(ip, validTimestamps);
    return true;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || req.headers.get('x-real-ip') || 'unknown';

    if (ip !== 'unknown' && isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many audit requests submitted from this network. Please wait a few minutes and try again.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const {
      name,
      company = '',
      email,
      website = '',
      phone = '',
      service,
      budget = '',
      timeline,
      market,
      goal = '',
    } = body;

    // Strict validation matching form requirements
    if (!name || typeof name !== 'string' || name.trim().length < 1) {
      return NextResponse.json(
        { error: 'Please enter your name.' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      return NextResponse.json(
        { error: 'Enter a valid email address (e.g. you@company.com).' },
        { status: 400 }
      );
    }

    const cleanSite = (website || '').trim().replace(/^https?:\/\//i, '');
    if (!cleanSite || !/^[^\s.]+\.[^\s.]{2,}/.test(cleanSite)) {
      return NextResponse.json(
        { error: 'Enter the website we should review (e.g. yourcompany.com).' },
        { status: 400 }
      );
    }

    if (!service) {
      return NextResponse.json(
        { error: 'Please pick the service you need.' },
        { status: 400 }
      );
    }

    if (!timeline) {
      return NextResponse.json(
        { error: 'Please select when you want to start.' },
        { status: 400 }
      );
    }

    if (!market) {
      return NextResponse.json(
        { error: 'Please pick the market you sell in.' },
        { status: 400 }
      );
    }

    const userAgent = req.headers.get('user-agent') || 'unknown';

    // Persist in database
    const newAudit = await createAudit({
      name: name.trim(),
      company: company ? company.trim() : cleanSite,
      email: email.trim().toLowerCase(),
      website: website ? website.trim() : cleanSite,
      phone: phone.trim(),
      service: service.trim(),
      budget: budget ? budget.trim() : undefined,
      timeline: timeline.trim(),
      market: market.trim(),
      goal: goal.trim(),
      ip,
      userAgent,
    });

    // Fire email notification to admin & prospect confirmation in background
    Promise.allSettled([
      sendAuditNotification(newAudit),
      sendProspectConfirmation(newAudit),
    ]).catch((err) => {
      console.error('[API /api/audit] Notification dispatch warning:', err);
    });

    return NextResponse.json(
      {
        success: true,
        id: newAudit.id,
        message: 'Your growth audit request has been successfully submitted.',
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error('[API /api/audit] Error processing audit request:', error);
    return NextResponse.json(
      { error: "That didn't go through. Please check your connection and try again." },
      { status: 500 }
    );
  }
}

