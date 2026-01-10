import { NextRequest, NextResponse } from 'next/server';
import { calculateFinance } from '@/lib/financeCalculations';
import { FinanceRule, FinanceCalculationInput } from '@/types/finance';
import { mockFinanceRules } from '@/lib/mockFinanceRules';

export const dynamic = 'force-dynamic';

// Simple rate limiting (in-memory, for production use Redis)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (!limit || now > limit.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60000 }); // 1 minute window
    return true;
  }

  if (limit.count >= 60) { // 60 requests per minute
    return false;
  }

  limit.count++;
  return true;
}

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return request.headers.get('x-real-ip') || 'unknown';
}

/**
 * POST /api/finance/calculate
 * Calculate finance and save to database
 */
export async function POST(request: NextRequest) {
  try {
    const ip = getClientIP(request);

    // Rate limiting
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'יותר מדי בקשות. נסה שוב בעוד דקה.' },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Validation
    if (!body.vehicle_year || !body.vehicle_price || !body.finance_amount || !body.loan_term_months || !body.finance_type) {
      return NextResponse.json(
        { error: 'שדות חובה חסרים' },
        { status: 400 }
      );
    }

    // Phase 1: Use mock rules (no Supabase required)
    let financeRules: FinanceRule[] = mockFinanceRules;

    // Phase 2: Use Supabase when available (commented out for Phase 1)
    /*
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const { supabaseServer } = await import('@/lib/supabaseServerClient');
      const { data: rulesData, error: rulesError } = await supabaseServer
        .from('finance_rules')
        .select('*')
        .eq('is_active', true)
        .order('priority', { ascending: false });

      if (!rulesError && rulesData) {
        financeRules = rulesData.map((rule: any) => ({
          id: rule.id,
          rule_id: rule.rule_id || rule.id,
          rule_type: rule.rule_type,
          priority: rule.priority || 0,
          conditions: rule.conditions || rule.condition || {},
          result: rule.result || rule.allowed_values || {},
          is_active: rule.is_active,
          description_he: rule.description_he,
          notes: rule.notes
        }));
      }
    }
    */

    // Prepare calculation input
    const calculationInput: FinanceCalculationInput = {
      dealer_id: body.dealer_id || undefined,
      vehicle_year: parseInt(body.vehicle_year),
      vehicle_price: parseFloat(body.vehicle_price),
      finance_amount: parseFloat(body.finance_amount),
      loan_term_months: parseInt(body.loan_term_months),
      finance_type: body.finance_type,
      balloon_amount: body.balloon_amount ? parseFloat(body.balloon_amount) : undefined,
      customer_name: body.customer_name || undefined,
      customer_phone: body.customer_phone || undefined,
    };

    // Calculate finance
    let calculationResult;
    try {
      calculationResult = calculateFinance(calculationInput, financeRules);
    } catch (calcError: any) {
      return NextResponse.json(
        { error: calcError.message || 'שגיאה בחישוב המימון' },
        { status: 400 }
      );
    }

    // Phase 1: Skip saving to database (no Supabase required)
    // Phase 2: Uncomment when ready to save to Supabase
    /*
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const { supabaseServer } = await import('@/lib/supabaseServerClient');
      const userAgent = request.headers.get('user-agent') || '';

      // Save calculation to database
      const { data: savedCalculation, error: saveError } = await supabaseServer
        .from('finance_calculations')
        .insert({
          dealer_id: calculationInput.dealer_id || null,
          vehicle_year: calculationResult.vehicle_year,
          vehicle_price: calculationResult.vehicle_price,
          finance_amount: calculationResult.finance_amount,
          loan_term_months: calculationResult.loan_term_months,
          interest_rate: calculationResult.interest_rate,
          monthly_payment: calculationResult.monthly_payment,
          balloon_amount: calculationResult.balloon_amount || null,
          finance_type: calculationResult.finance_type,
          applied_rules: calculationResult.applied_rules.map((rule: any) => ({
            rule_id: rule.rule_id || rule.id,
            rule_type: rule.rule_type,
            priority: rule.priority
          })) as any,
          customer_name: calculationResult.customer_name || null,
          customer_phone: calculationResult.customer_phone || null,
          ip_address: ip,
          user_agent: userAgent,
        })
        .select()
        .single();

      if (saveError) {
        console.error('Error saving calculation:', saveError);
      }

      // Update dealer usage stats if dealer_id exists
      if (calculationInput.dealer_id && savedCalculation) {
        const today = new Date().toISOString().split('T')[0];
        
        const { data: existingStats } = await supabaseServer
          .from('dealer_usage_stats')
          .select('*')
          .eq('dealer_id', calculationInput.dealer_id)
          .eq('date', today)
          .single();

        if (existingStats) {
          await supabaseServer
            .from('dealer_usage_stats')
            .update({
              calculation_count: (existingStats.calculation_count || 0) + 1,
              total_finance_amount: (parseFloat(existingStats.total_finance_amount || '0') + calculationResult.finance_amount).toString(),
            })
            .eq('id', existingStats.id);
        } else {
          await supabaseServer
            .from('dealer_usage_stats')
            .insert({
              dealer_id: calculationInput.dealer_id,
              date: today,
              calculation_count: 1,
              total_finance_amount: calculationResult.finance_amount,
            });
        }
      }
    }
    */

    return NextResponse.json({
      success: true,
      calculation: {
        ...calculationResult,
        // Phase 1: No database, so no id/created_at
        // Phase 2: Include savedCalculation?.id and savedCalculation?.created_at when using Supabase
      },
      source: 'mock', // Indicate this is calculated without database
    });
  } catch (error: any) {
    console.error('API error (finance calculate POST):', error);
    return NextResponse.json(
      { error: error.message || 'שגיאה כללית' },
      { status: 500 }
    );
  }
}

