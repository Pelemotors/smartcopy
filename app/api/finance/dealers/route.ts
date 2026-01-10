import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServerClient';

export const dynamic = 'force-dynamic';

/**
 * GET /api/finance/dealers
 * Fetch all active dealers (for admin/authenticated users)
 */
export async function GET(request: NextRequest) {
  try {
    // Check if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json(
        { error: 'מסד הנתונים לא מוגדר' },
        { status: 500 }
      );
    }

    // TODO: Add authentication check
    // For now, allow public read of active dealers
    
    const { data, error } = await supabaseServer
      .from('dealers')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching dealers:', error);
      return NextResponse.json(
        { error: 'שגיאה בטעינת הסוחרים' },
        { status: 500 }
      );
    }

    return NextResponse.json({ dealers: data || [] });
  } catch (error) {
    console.error('API error (dealers GET):', error);
    return NextResponse.json(
      { error: 'שגיאה כללית' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/finance/dealers
 * Create a new dealer
 */
export async function POST(request: NextRequest) {
  try {
    // Check if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json(
        { error: 'מסד הנתונים לא מוגדר' },
        { status: 500 }
      );
    }

    const body = await request.json();

    // Validation
    if (!body.name || body.name.trim().length === 0) {
      return NextResponse.json(
        { error: 'שם הסוחר הוא שדה חובה' },
        { status: 400 }
      );
    }

    // Create dealer
    const { data, error } = await supabaseServer
      .from('dealers')
      .insert({
        name: body.name.trim(),
        email: body.email?.trim() || null,
        phone: body.phone?.trim() || null,
        company_name: body.company_name?.trim() || null,
        is_active: body.is_active !== undefined ? body.is_active : true,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating dealer:', error);
      return NextResponse.json(
        { error: 'שגיאה ביצירת הסוחר' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      dealer: data,
    });
  } catch (error: any) {
    console.error('API error (dealers POST):', error);
    return NextResponse.json(
      { error: error.message || 'שגיאה כללית' },
      { status: 500 }
    );
  }
}

