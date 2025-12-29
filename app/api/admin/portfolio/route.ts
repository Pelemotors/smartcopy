import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServerClient';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { data, error } = await supabaseServer
      .from('portfolio_items')
      .insert({
        title_he: body.title_he,
        category_id: body.category_id || null,
        niche: body.niche || null,
        challenge_he: body.challenge_he || null,
        solution_he: body.solution_he || null,
        outcome_he: body.outcome_he || null,
        before_text_he: body.before_text_he || null,
        after_text_he: body.after_text_he || null,
        is_anonymous: body.is_anonymous || false,
        is_published: body.is_published || false,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating portfolio item:', error);
      return NextResponse.json(
        { error: 'שגיאה ביצירת הפרויקט' },
        { status: 500 }
      );
    }

    return NextResponse.json({ id: data.id }, { status: 200 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'שגיאה כללית' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabaseServer
      .from('portfolio_items')
      .select('*, portfolio_categories(*)')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching portfolio:', error);
      return NextResponse.json(
        { error: 'שגיאה בטעינת הפרויקטים' },
        { status: 500 }
      );
    }

    return NextResponse.json(data || [], { status: 200 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'שגיאה כללית' },
      { status: 500 }
    );
  }
}

