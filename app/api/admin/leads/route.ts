import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServerClient';

export const dynamic = 'force-dynamic';

// GET - Fetch all leads (simple version, no pagination yet)
export async function GET(_request: NextRequest) {
  try {
    // TODO: Check authentication
    const { data, error } = await supabaseServer
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error (leads GET):', error);
      return NextResponse.json(
        { error: 'שגיאה בטעינת הלידים' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      leads: data || [],
      total: data?.length || 0,
    });
  } catch (error) {
    console.error('API error (leads GET):', error);
    return NextResponse.json(
      { error: 'שגיאה כללית' },
      { status: 500 }
    );
  }
}

