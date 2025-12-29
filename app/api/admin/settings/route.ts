import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServerClient';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Update or insert each setting
    for (const [key, value] of Object.entries(body)) {
      const { error } = await supabaseServer
        .from('settings')
        .upsert({
          key,
          value,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'key',
        });

      if (error) {
        console.error(`Error updating setting ${key}:`, error);
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
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
      .from('settings')
      .select('*');

    if (error) {
      console.error('Error fetching settings:', error);
      return NextResponse.json(
        { error: 'שגיאה בטעינת ההגדרות' },
        { status: 500 }
      );
    }

    const settingsObj: Record<string, any> = {};
    (data || []).forEach((setting) => {
      settingsObj[setting.key] = setting.value;
    });

    return NextResponse.json(settingsObj, { status: 200 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'שגיאה כללית' },
      { status: 500 }
    );
  }
}

