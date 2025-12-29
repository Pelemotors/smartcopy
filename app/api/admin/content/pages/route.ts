import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServerClient';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, title_he, meta_title_he, meta_description_he, status } = body;

    // Validate
    if (!slug || !title_he) {
      return NextResponse.json(
        { error: 'Slug וכותרת הם שדות חובה' },
        { status: 400 }
      );
    }

    // Check if slug exists
    const { data: existing } = await supabaseServer
      .from('pages')
      .select('id')
      .eq('slug', slug)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: 'Slug זה כבר קיים' },
        { status: 400 }
      );
    }

    // Create page
    const { data, error } = await supabaseServer
      .from('pages')
      .insert({
        slug,
        title_he,
        meta_title_he: meta_title_he || title_he,
        meta_description_he,
        status: status || 'draft',
        published_at: status === 'published' ? new Date().toISOString() : null,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating page:', error);
      return NextResponse.json(
        { error: 'שגיאה ביצירת העמוד' },
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
      .from('pages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching pages:', error);
      return NextResponse.json(
        { error: 'שגיאה בטעינת העמודים' },
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

