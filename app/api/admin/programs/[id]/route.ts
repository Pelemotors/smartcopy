import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServerClient';

// GET - Fetch single program
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // TODO: Check authentication

    const { data, error } = await supabaseServer
      .from('programs')
      .select('*')
      .eq('id', params.id)
      .single();

    if (error) {
      return NextResponse.json(
        { error: 'מסלול לא נמצא' },
        { status: 404 }
      );
    }

    return NextResponse.json({ program: data });
  } catch (error) {
    return NextResponse.json(
      { error: 'שגיאה כללית' },
      { status: 500 }
    );
  }
}

// PUT - Update program
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // TODO: Check authentication

    const body = await request.json();

    const updateData: any = {};
    if (body.name_he !== undefined) updateData.name_he = body.name_he;
    if (body.name_en !== undefined) updateData.name_en = body.name_en;
    if (body.slug !== undefined) updateData.slug = body.slug;
    if (body.description_he !== undefined) updateData.description_he = body.description_he;
    if (body.description_en !== undefined) updateData.description_en = body.description_en;
    if (body.features_he !== undefined) updateData.features_he = body.features_he;
    if (body.features_en !== undefined) updateData.features_en = body.features_en;
    if (body.price !== undefined) updateData.price = body.price ? parseFloat(String(body.price)) : null;
    if (body.duration_days !== undefined) updateData.duration_days = body.duration_days ? parseInt(String(body.duration_days)) : null;
    if (body.includes_whatsapp !== undefined) updateData.includes_whatsapp = Boolean(body.includes_whatsapp);
    if (body.image_url !== undefined) updateData.image_url = body.image_url;
    if (body.icon_url !== undefined) updateData.icon_url = body.icon_url;
    if (body.display_order !== undefined) updateData.display_order = parseInt(String(body.display_order));
    if (body.active !== undefined) updateData.active = Boolean(body.active);

    const { data, error } = await supabaseServer
      .from('programs')
      .update(updateData)
      .eq('id', params.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating program:', error);
      return NextResponse.json(
        { error: 'שגיאה בעדכון המסלול' },
        { status: 500 }
      );
    }

    return NextResponse.json({ program: data });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'שגיאה כללית' },
      { status: 500 }
    );
  }
}

// DELETE - Delete program
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // TODO: Check authentication

    const { error } = await supabaseServer
      .from('programs')
      .delete()
      .eq('id', params.id);

    if (error) {
      console.error('Error deleting program:', error);
      return NextResponse.json(
        { error: 'שגיאה במחיקת המסלול' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'שגיאה כללית' },
      { status: 500 }
    );
  }
}

