import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServerClient';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { note_he } = body;

    if (!note_he || !note_he.trim()) {
      return NextResponse.json(
        { error: 'הערה היא שדה חובה' },
        { status: 400 }
      );
    }

    // Create note
    const { data, error } = await supabaseServer
      .from('lead_notes')
      .insert({
        lead_id: params.id,
        note_he,
        is_internal: true,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating note:', error);
      return NextResponse.json(
        { error: 'שגיאה ביצירת ההערה' },
        { status: 500 }
      );
    }

    // Create event
    await supabaseServer
      .from('lead_events')
      .insert({
        lead_id: params.id,
        event_type: 'note_added',
        description_he: 'הערה נוספה',
      });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'שגיאה כללית' },
      { status: 500 }
    );
  }
}

