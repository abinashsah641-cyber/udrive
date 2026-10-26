import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD || 'udrive2026';

    if (!password || password !== adminPassword) {
      return NextResponse.json({ success: false, error: 'Invalid administrator credentials' }, { status: 401 });
    }

    const response = NextResponse.json({ success: true, message: 'Authentication successful' });
    
    // Set secure session cookie
    response.cookies.set('udrive_admin_session', 'authenticated_admin', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
