import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServerClient';

// GET - Fetch all programs
export async function GET(request: NextRequest) {
  try {
    // TODO: Check authentication

    const { data, error } = await supabaseServer
      .from('programs')
      .select('*')
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

// POST - Create new program
export async function POST(request: NextRequest) {
  try {
    // TODO: Check authentication

    const body = await request.json();

    // Validate required fields
    if (!body.name_he || !body.description_he) {
      return NextResponse.json(
        { error: 'שם ותיאור הם שדות חובה' },
        { status: 400 }
      );
    }

    // Generate slug if not provided
    const slug = body.slug || body.name_he
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const programData = {
      name_he: body.name_he,
      name_en: body.name_en || null,
      slug: slug,
      description_he: body.description_he,
      description_en: body.description_en || null,
      features_he: body.features_he || [],
      features_en: body.features_en || [],
      price: body.price ? parseFloat(String(body.price)) : null,
      duration_days: body.duration_days ? parseInt(String(body.duration_days)) : null,
      includes_whatsapp: body.includes_whatsapp || false,
      image_url: body.image_url || null,
      icon_url: body.icon_url || null,
      display_order: body.display_order ? parseInt(String(body.display_order)) : 0,
      active: body.active !== undefined ? Boolean(body.active) : true,
    };

    const { data, error } = await supabaseServer
      .from('programs')
      .insert([programData])
      .select()
      .single();

    if (error) {
      console.error('Error creating program:', error);
      return NextResponse.json(
        { error: 'שגיאה ביצירת המסלול' },
        { status: 500 }
      );
    }

    return NextResponse.json({ program: data }, { status: 201 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'שגיאה כללית' },
      { status: 500 }
    );
  }
}

