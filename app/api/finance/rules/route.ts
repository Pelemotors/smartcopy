import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { FinanceRule } from '@/types/finance';

export const dynamic = 'force-dynamic';

/**
 * Convert JSON data to FinanceRule format
 */
function convertJSONToRules(jsonData: any): FinanceRule[] {
  const rules: FinanceRule[] = [];

  // Convert balloon rules
  if (jsonData.balloon_rules) {
    for (const rule of jsonData.balloon_rules) {
      rules.push({
        rule_id: rule.id,
        rule_type: rule.type as any,
        priority: rule.priority,
        conditions: rule.conditions,
        result: rule.result,
        is_active: true,
      });
    }
  }

  // Convert installments rules
  if (jsonData.installments_rules) {
    for (const rule of jsonData.installments_rules) {
      rules.push({
        rule_id: rule.id,
        rule_type: rule.type as any,
        priority: rule.priority,
        conditions: rule.conditions,
        result: rule.result,
        is_active: true,
      });
    }
  }

  // Add default interest rate rules from ruleset
  if (jsonData.ruleset?.default_interest_rates) {
    const rates = jsonData.ruleset.default_interest_rates;

    if (rates.new_car_from_importer !== undefined) {
      rules.push({
        rule_id: 'INTEREST_NEW_CAR_FROM_IMPORTER',
        rule_type: 'insurance_rate',
        priority: 60,
        conditions: { car_type: 'new', is_from_importer: true },
        result: { interest_rate: rates.new_car_from_importer },
        is_active: true,
        description_he: 'רכב חדש מיבואן',
      });
    }

    if (rates.new_car_0_km !== undefined) {
      rules.push({
        rule_id: 'INTEREST_NEW_CAR_0_KM',
        rule_type: 'insurance_rate',
        priority: 59,
        conditions: { car_type: 'new', car_age_years_max: 0, is_0_km: true },
        result: { interest_rate: rates.new_car_0_km },
        is_active: true,
        description_he: 'רכב 0 קמ',
      });
    }

    if (rates.used_car_up_to_5_years !== undefined) {
      rules.push({
        rule_id: 'INTEREST_USED_CAR_UP_TO_5Y',
        rule_type: 'insurance_rate',
        priority: 58,
        conditions: { car_type: 'used', car_age_years_min: 0, car_age_years_max: 5 },
        result: { interest_rate: rates.used_car_up_to_5_years },
        is_active: true,
        description_he: 'רכב משומש עד 5 שנים',
      });
    }

    if (rates.no_insurance_up_to_70k !== undefined) {
      rules.push({
        rule_id: 'INTEREST_NO_INSURANCE_UP_TO_70K',
        rule_type: 'insurance_rate',
        priority: 50,
        conditions: { insurance_required: false, max_price: 70000 },
        result: { interest_rate: rates.no_insurance_up_to_70k },
        is_active: true,
        description_he: 'ללא ביטוח עד 70,000 ₪',
      });
    }

    if (rates.no_insurance_70k_to_100k !== undefined) {
      rules.push({
        rule_id: 'INTEREST_NO_INSURANCE_70K_TO_100K',
        rule_type: 'insurance_rate',
        priority: 49,
        conditions: { insurance_required: false, min_price: 70001, max_price: 100000 },
        result: { interest_rate: rates.no_insurance_70k_to_100k },
        is_active: true,
        description_he: 'ללא ביטוח 70,001-100,000 ₪',
      });
    }
  }

  return rules.sort((a, b) => b.priority - a.priority);
}

/**
 * GET /api/finance/rules
 * Fetch all active finance rules from finance-rules.json file
 * Rules are stored in the project itself, not in Supabase
 * Supabase is used only for tracking usage and users
 */
export async function GET() {
  try {
    // Read finance-rules.json from project root
    const jsonPath = path.join(process.cwd(), 'finance-rules.json');
    
    if (!fs.existsSync(jsonPath)) {
      console.error('finance-rules.json not found at:', jsonPath);
      return NextResponse.json(
        { 
          rules: [],
          source: 'file',
          error: 'קובץ כללי המימון לא נמצא'
        },
        { status: 404 }
      );
    }

    const jsonContent = fs.readFileSync(jsonPath, 'utf-8');
    const jsonData = JSON.parse(jsonContent);
    
    const rules = convertJSONToRules(jsonData);

    return NextResponse.json({ 
      rules,
      source: 'file',
      metadata: jsonData.ruleset
    });
  } catch (error: any) {
    console.error('API error (finance rules GET):', error);
    return NextResponse.json(
      { 
        rules: [],
        source: 'file',
        error: `שגיאה בטעינת כללי המימון: ${error.message}`
      },
      { status: 500 }
    );
  }
}

