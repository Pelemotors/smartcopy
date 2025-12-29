import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServerClient';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const format = searchParams.get('format') || 'csv';

    // Get all leads
    const { data: leads, error } = await supabaseServer
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching leads:', error);
      return NextResponse.json(
        { error: 'שגיאה בטעינת הלידים' },
        { status: 500 }
      );
    }

    if (format === 'csv') {
      // Convert to CSV
      const headers = [
        'ID',
        'שם',
        'טלפון',
        'אימייל',
        'שירות מבוקש',
        'תחום',
        'הודעה',
        'מקור',
        'סטטוס',
        'UTM Source',
        'UTM Medium',
        'UTM Campaign',
        'Referrer',
        'Landing Page',
        'תאריך יצירה',
      ];

      const rows = (leads || []).map((lead) => [
        lead.id,
        lead.name || '',
        lead.phone || '',
        lead.email || '',
        lead.service_requested || lead.child_age || '',
        lead.business_field || '',
        lead.message || '',
        lead.source || '',
        lead.status || '',
        lead.utm_source || '',
        lead.utm_medium || '',
        lead.utm_campaign || '',
        lead.referrer || '',
        lead.landing_page || '',
        new Date(lead.created_at).toLocaleString('he-IL'),
      ]);

      const csvContent = [
        headers.join(','),
        ...rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')),
      ].join('\n');

      // Add BOM for Hebrew support in Excel
      const BOM = '\uFEFF';
      const csvWithBOM = BOM + csvContent;

      return new NextResponse(csvWithBOM, {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="leads-${new Date().toISOString().split('T')[0]}.csv"`,
        },
      });
    }

    return NextResponse.json(
      { error: 'פורמט לא נתמך' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json(
      { error: 'שגיאה בייצוא' },
      { status: 500 }
    );
  }
}

