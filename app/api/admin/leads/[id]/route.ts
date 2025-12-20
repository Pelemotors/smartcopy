import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServerClient';

// GET - Fetch single lead
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // TODO: Check authentication

    const { data, error } = await supabaseServer
      .from('leads')
      .select('*')
      .eq('id', params.id)
      .single();

    if (error) {
      return NextResponse.json(
        { error: 'ליד לא נמצא' },
        { status: 404 }
      );
    }

    return NextResponse.json({ lead: data });
  } catch (error) {
    return NextResponse.json(
      { error: 'שגיאה כללית' },
      { status: 500 }
    );
  }
}

// PATCH - Update lead status
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // TODO: Check authentication

    const body = await request.json();
    const { status, ...otherFields } = body;

    const updateData: any = {};
    if (status) {
      updateData.status = status;
    }
    if (Object.keys(otherFields).length > 0) {
      Object.assign(updateData, otherFields);
    }

    const { data, error } = await supabaseServer
      .from('leads')
      .update(updateData)
      .eq('id', params.id)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: 'שגיאה בעדכון הליד' },
        { status: 500 }
      );
    }

    return NextResponse.json({ lead: data });
  } catch (error) {
    return NextResponse.json(
      { error: 'שגיאה כללית' },
      { status: 500 }
    );
  }
}

// DELETE - Delete lead permanently
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // TODO: Check authentication

    const { error } = await supabaseServer
      .from('leads')
      .delete()
      .eq('id', params.id);

    if (error) {
      return NextResponse.json(
        { error: 'שגיאה במחיקת הליד' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'שגיאה כללית' },
      { status: 500 }
    );
  }
}

