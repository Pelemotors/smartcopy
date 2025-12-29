import { NextRequest, NextResponse } from 'next/server';
import { verifyCredentials, createSessionToken, getAdminUser } from '@/lib/adminAuth';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'שם משתמש וסיסמה נדרשים' },
        { status: 400 }
      );
    }

    // Verify credentials
    const isValid = await verifyCredentials(username, password);

    if (!isValid) {
      return NextResponse.json(
        { error: 'שם משתמש או סיסמה שגויים' },
        { status: 401 }
      );
    }

    // Get admin user info
    const adminUser = getAdminUser();

    // Create session token
    const sessionToken = await createSessionToken(adminUser.id, adminUser.username);

    // Create response
    const response = NextResponse.json(
      { success: true, user: { id: adminUser.id, username: adminUser.username, name: adminUser.name } },
      { status: 200 }
    );

    // Set session cookie
    response.cookies.set('admin-session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'שגיאה בהתחברות', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

