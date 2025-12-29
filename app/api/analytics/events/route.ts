import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServerClient';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { event_type, page_path, metadata } = body;

    // Get client IP and user agent
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || '';

    // Get or create session
    const sessionId = request.cookies.get('session_id')?.value || crypto.randomUUID();
    
    // Try to find existing session
    let session = null;
    const { data: existingSession } = await supabaseServer
      .from('sessions')
      .select('id')
      .eq('session_id', sessionId)
      .single();

    if (!existingSession) {
      // Create new session
      const { data: newSession } = await supabaseServer
        .from('sessions')
        .insert({
          session_id: sessionId,
          user_agent: userAgent,
          ip_address: ip,
          landing_page: page_path,
          started_at: new Date().toISOString(),
          last_activity_at: new Date().toISOString(),
        })
        .select()
        .single();
      
      session = newSession;
    } else {
      // Update existing session
      await supabaseServer
        .from('sessions')
        .update({ last_activity_at: new Date().toISOString() })
        .eq('id', existingSession.id);
      
      session = existingSession;
    }

    // Save analytics event
    if (session) {
      await supabaseServer
        .from('analytics_events')
        .insert({
          session_id: session.id,
          event_type,
          page_path,
          metadata: metadata || {},
        });
    }

    // Set session cookie if new
    const response = NextResponse.json({ success: true });
    if (!request.cookies.get('session_id')) {
      response.cookies.set('session_id', sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });
    }

    return response;
  } catch (error) {
    console.error('Analytics event error:', error);
    // Don't fail the request if analytics fails
    return NextResponse.json({ success: false }, { status: 200 });
  }
}

