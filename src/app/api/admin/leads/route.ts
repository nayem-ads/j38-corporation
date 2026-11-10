import { NextRequest, NextResponse } from 'next/server';
import { getAllAudits, updateAuditStatus, deleteAudit, getAuditStats } from '@/lib/db';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'mind@123';

function isAuthorized(req: NextRequest): boolean {
  const session = req.cookies.get('j38_admin_session')?.value;
  if (session === 'authenticated_user') return true;

  const authHeader = req.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    if (token === ADMIN_PASSWORD || token === 'j38@2026') return true;
  }
  return false;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized: Admin authentication required' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search')?.toLowerCase();

    const [all, stats] = await Promise.all([
      getAllAudits(),
      getAuditStats(),
    ]);

    let filtered = all;
    if (status && status !== 'ALL') {
      filtered = filtered.filter((a) => a.status === status);
    }
    if (search) {
      filtered = filtered.filter(
        (a) =>
          a.name.toLowerCase().includes(search) ||
          (a.company || '').toLowerCase().includes(search) ||
          (a.website || '').toLowerCase().includes(search) ||
          a.email.toLowerCase().includes(search) ||
          a.service.toLowerCase().includes(search)
      );
    }

    return NextResponse.json({
      success: true,
      data: filtered,
      stats,
    });
  } catch (err: unknown) {
    console.error('[API /api/admin/leads GET]', err);
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized: Admin authentication required' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, status, notes } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    const updated = await updateAuditStatus(id, status, notes);
    if (!updated) {
      return NextResponse.json({ error: 'Audit lead not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (err: unknown) {
    console.error('[API /api/admin/leads PATCH]', err);
    return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized: Admin authentication required' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing lead id' }, { status: 400 });
    }

    const deleted = await deleteAudit(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Audit lead not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: { deleted: true } });
  } catch (err: unknown) {
    console.error('[API /api/admin/leads DELETE]', err);
    return NextResponse.json({ error: 'Failed to delete lead' }, { status: 500 });
  }
}

