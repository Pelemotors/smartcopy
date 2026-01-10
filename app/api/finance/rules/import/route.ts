import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServerClient';

export const dynamic = 'force-dynamic';

/**
 * POST /api/finance/rules/import
 * Import finance rules from JSON format
 * Expects a JSON object with ruleset, balloon_rules, and installments_rules
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

    // TODO: Add authentication check for admin users

    const body = await request.json();
    
    if (!body.ruleset) {
      return NextResponse.json(
        { error: 'פורמט לא תקין. יש לספק אובייקט עם ruleset, balloon_rules, ו-installments_rules' },
        { status: 400 }
      );
    }

    const balloonRules = Array.isArray(body.balloon_rules) ? body.balloon_rules : [];
    const installmentsRules = Array.isArray(body.installments_rules) ? body.installments_rules : [];
    
    const importedRules: any[] = [];
    const errors: string[] = [];
    let successCount = 0;

    // Process balloon rules
    for (let i = 0; i < balloonRules.length; i++) {
      const rule = balloonRules[i];
      
      if (!rule.id || !rule.type || !rule.conditions || !rule.result) {
        errors.push(`כלל בלון ${i + 1}: חסרים שדות חובה (id, type, conditions, result)`);
        continue;
      }

      try {
        const { data, error: insertError } = await supabaseServer
          .from('finance_rules')
          .upsert({
            rule_id: rule.id,
            rule_type: rule.type,
            priority: rule.priority || 0,
            conditions: rule.conditions,
            result: rule.result,
            is_active: true,
            description_he: rule.result.reason || rule.result.notes || null,
            notes: rule.result.notes || null,
          }, {
            onConflict: 'rule_id',
            ignoreDuplicates: false
          })
          .select()
          .single();

        if (insertError) {
          errors.push(`כלל בלון ${i + 1} (${rule.id}): ${insertError.message}`);
        } else {
          importedRules.push(data);
          successCount++;
        }
      } catch (parseError: any) {
        errors.push(`כלל בלון ${i + 1} (${rule.id}): שגיאה בעיבוד - ${parseError.message}`);
      }
    }

    // Process installments rules
    for (let i = 0; i < installmentsRules.length; i++) {
      const rule = installmentsRules[i];
      
      if (!rule.id || !rule.type || !rule.conditions || !rule.result) {
        errors.push(`כלל פריסה ${i + 1}: חסרים שדות חובה (id, type, conditions, result)`);
        continue;
      }

      try {
        const { data, error: insertError } = await supabaseServer
          .from('finance_rules')
          .upsert({
            rule_id: rule.id,
            rule_type: rule.type,
            priority: rule.priority || 0,
            conditions: rule.conditions,
            result: rule.result,
            is_active: true,
            description_he: rule.result.notes || null,
            notes: rule.result.notes || null,
          }, {
            onConflict: 'rule_id',
            ignoreDuplicates: false
          })
          .select()
          .single();

        if (insertError) {
          errors.push(`כלל פריסה ${i + 1} (${rule.id}): ${insertError.message}`);
        } else {
          importedRules.push(data);
          successCount++;
        }
      } catch (parseError: any) {
        errors.push(`כלל פריסה ${i + 1} (${rule.id}): שגיאה בעיבוד - ${parseError.message}`);
      }
    }

    return NextResponse.json({
      success: true,
      ruleset: body.ruleset,
      imported: successCount,
      total: balloonRules.length + installmentsRules.length,
      errors: errors.length,
      errorDetails: errors.length > 0 ? errors : undefined,
      balloon_rules: importedRules.filter(r => r.rule_type === 'eligibility' || r.rule_type === 'balloon_terms'),
      installments_rules: importedRules.filter(r => r.rule_type === 'installments_policy'),
    });
  } catch (error: any) {
    console.error('API error (finance rules import POST):', error);
    return NextResponse.json(
      { error: error.message || 'שגיאה כללית' },
      { status: 500 }
    );
  }
}
