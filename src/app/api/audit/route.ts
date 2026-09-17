import { NextRequest, NextResponse } from 'next/server';
import { createAudit } from '@/lib/db';
import { sendAuditNotification } from '@/lib/notifications';

export async function POST(req: NextRequest) {
  try {
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

    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const userAgent = req.headers.get('user-agent') || 'unknown';

    // Persist in persistent database
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

    // Fire email notifications directly to raselrehman222@gmail.com
    await sendAuditNotification(newAudit).catch((err) => {
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
  } catch (error: any) {
    console.error('[API /api/audit] Error processing audit request:', error);
    return NextResponse.json(
      { error: "That didn't go through. Please check your connection and try again." },
      { status: 500 }
    );
  }
}
