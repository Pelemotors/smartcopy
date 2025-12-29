import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServerClient';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { tag } = body;

    if (!tag || !tag.trim()) {
      return NextResponse.json(
        { error: 'תג הוא שדה חובה' },
        { status: 400 }
      );
    }

    // Create tag
    const { data, error } = await supabaseServer
      .from('lead_tags')
      .insert({
        lead_id: params.id,
        tag: tag.trim(),
      })
      .select()
      .single();

    if (error) {
      // If tag already exists, return existing
      if (error.code === '23505') {
        const { data: existing } = await supabaseServer
          .from('lead_tags')
          .select('*')
          .eq('lead_id', params.id)
          .eq('tag', tag.trim())
          .single();
        
        return NextResponse.json(existing, { status: 200 });
      }

      console.error('Error creating tag:', error);
      return NextResponse.json(
        { error: 'שגיאה ביצירת התג' },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'שגיאה כללית' },
      { status: 500 }
    );
  }
}

