import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServerClient';

export const dynamic = 'force-dynamic';

/**
 * GET /api/finance/dealers/[id]/stats
 * Get dealer usage statistics
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json(
        { error: 'מסד הנתונים לא מוגדר' },
        { status: 500 }
      );
    }

    // TODO: Add authentication check

    const dealerId = params.id;

    // Get date range from query params (default: last 30 days)
    const searchParams = request.nextUrl.searchParams;
    const days = parseInt(searchParams.get('days') || '30');
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    const startDateStr = startDate.toISOString().split('T')[0];

    // Fetch usage stats
    const { data: stats, error: statsError } = await supabaseServer
      .from('dealer_usage_stats')
      .select('*')
      .eq('dealer_id', dealerId)
      .gte('date', startDateStr)
      .order('date', { ascending: false });

    if (statsError) {
      console.error('Error fetching dealer stats:', statsError);
      return NextResponse.json(
        { error: 'שגיאה בטעינת הסטטיסטיקות' },
        { status: 500 }
      );
    }

    // Fetch total calculations count
    const { count: totalCalculations, error: calcError } = await supabaseServer
      .from('finance_calculations')
      .select('*', { count: 'exact', head: true })
      .eq('dealer_id', dealerId);

    if (calcError) {
      console.error('Error counting calculations:', calcError);
    }

    // Calculate totals
    const totalStats = {
      total_calculations: totalCalculations || 0,
      total_finance_amount: stats?.reduce((sum, stat) => sum + parseFloat(stat.total_finance_amount || '0'), 0) || 0,
      daily_stats: stats || [],
    };

    return NextResponse.json({
      success: true,
      stats: totalStats,
    });
  } catch (error: any) {
    console.error('API error (dealer stats GET):', error);
    return NextResponse.json(
      { error: error.message || 'שגיאה כללית' },
      { status: 500 }
    );
  }
}

