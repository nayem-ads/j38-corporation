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
      phone = '',
      service,
      budget,
      timeline,
      market,
      goal,
    } = body;

    // Strict validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Please provide a valid name.' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    if (!service || !budget || !timeline || !market || !goal) {
      return NextResponse.json(
        { error: 'Please complete all required fields for the growth audit.' },
        { status: 400 }
      );
    }

    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const userAgent = req.headers.get('user-agent') || 'unknown';

    // Persist into database
    const newAudit = await createAudit({
      name: name.trim(),
      company: company.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      service: service.trim(),
      budget: budget.trim(),
      timeline: timeline.trim(),
      market: market.trim(),
      goal: goal.trim(),
      ip,
      userAgent,
    });

    // Fire notifications in background (non-blocking)
    sendAuditNotification(newAudit).catch((err) => {
      console.error('[API /api/audit] Error sending notification:', err);
    });

    return NextResponse.json(
      {
        success: true,
        id: newAudit.id,
        message: 'Your free growth audit request has been successfully submitted. We will review your materials and respond within one business day.',
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('[API /api/audit] Error processing audit request:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again or reach out to us directly.' },
      { status: 500 }
    );
  }
}
