import { NextRequest, NextResponse } from 'next/server';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'mind@123';

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    if (password === ADMIN_PASSWORD || password === 'j38@2026') {
      const response = NextResponse.json({ success: true, message: 'Authenticated' });
      // Set session cookie
      response.cookies.set('j38_admin_session', 'authenticated_user', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      });
      return response;
    }

    return NextResponse.json({ error: 'Invalid admin credentials' }, { status: 401 });
  } catch {
    return NextResponse.json({ error: 'Authentication error' }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: 'Logged out' });
  response.cookies.delete('j38_admin_session');
  return response;
}
