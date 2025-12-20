import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { supabaseServer } from '@/lib/supabaseServerClient';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'אימייל וסיסמה נדרשים' },
        { status: 400 }
      );
    }

    // Create a client with anon key for auth operations
    const supabaseAuth = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // Sign in with Supabase Auth
    const { data: authData, error: authError } = await supabaseAuth.auth.signInWithPassword({
      email,
      password,
    });

    if (authError || !authData.user) {
      console.error('Auth error:', authError);
      return NextResponse.json(
        { error: 'אימייל או סיסמה שגויים' },
        { status: 401 }
      );
    }

    // Check if user exists in admin_users table (using service role for this)
    const { data: adminUser, error: adminError } = await supabaseServer
      .from('admin_users')
      .select('*')
      .eq('id', authData.user.id)
      .eq('active', true)
      .single();

    if (adminError || !adminUser) {
      console.error('Admin check error:', adminError);
      // User is authenticated but not an admin
      await supabaseAuth.auth.signOut();
      return NextResponse.json(
        { error: 'אין לך הרשאות גישה לממשק המנהל' },
        { status: 403 }
      );
    }

    // Update last_login
    await supabaseServer
      .from('admin_users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', authData.user.id);

    // Create session token (we'll use the access token from Supabase)
    const response = NextResponse.json(
      { success: true, user: { id: authData.user.id, email: authData.user.email } },
      { status: 200 }
    );

    // Set session cookie
    if (authData.session?.access_token) {
      response.cookies.set('sb-access-token', authData.session.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      });
    }

    if (authData.session?.refresh_token) {
      response.cookies.set('sb-refresh-token', authData.session.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });
    }

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'שגיאה בהתחברות', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

