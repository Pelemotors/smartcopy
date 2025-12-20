import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServerClient';

export async function GET() {
  try {
    const { data, error } = await supabaseServer
      .from('programs')
      .select('*')
      .eq('active', true)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching programs:', error);
      return NextResponse.json(
        { error: 'שגיאה בטעינת המסלולים' },
        { status: 500 }
      );
    }

    return NextResponse.json({ programs: data || [] });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'שגיאה כללית' },
      { status: 500 }
    );
  }
}

