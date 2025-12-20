import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServerClient';

// GET - Fetch quiz responses for a lead
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // TODO: Check authentication

    const { data, error } = await supabaseServer
      .from('quiz_responses')
      .select('*')
      .eq('lead_id', params.id)
      .order('question_index', { ascending: true });

    if (error) {
      console.error('Error fetching quiz responses:', error);
      return NextResponse.json(
        { error: 'שגיאה בטעינת התשובות' },
        { status: 500 }
      );
    }

    return NextResponse.json({ responses: data || [] });
  } catch (error) {
    console.error('Error in GET quiz responses:', error);
    return NextResponse.json(
      { error: 'שגיאה כללית' },
      { status: 500 }
    );
  }
}

