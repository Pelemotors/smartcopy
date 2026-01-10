/**
 * Finance Rules Data - Loaded from JSON file
 * All rules are stored in the project itself (finance-rules.json), not in Supabase
 * Supabase is used only for tracking usage and users
 */

import { FinanceRule } from '@/types/finance';

// Import JSON file (Next.js will bundle this at build time)
import financeRulesJSON from '@/../finance-rules.json';

interface FinanceRulesJSONData {
  ruleset: {
    name: string;
    version: string;
    currency: string;
    default_interest_rates?: {
      new_car_from_importer?: number;
      new_car_0_km?: number;
      used_car_up_to_5_years?: number;
      no_insurance_up_to_70k?: number;
      no_insurance_70k_to_100k?: number;
    };
    notes?: string[];
  };
  balloon_rules: Array<{
    id: string;
    priority: number;
    type: string;
    conditions: any;
    result: any;
  }>;
  installments_rules: Array<{
    id: string;
    priority: number;
    type: string;
    conditions: any;
    result: any;
  }>;
  interest_rules?: Array<{
    id: string;
    priority: number;
    type: string;
    conditions: any;
    result: {
      interest_rate: number;
      [key: string]: any;
    };
  }>;
}

/**
 * Convert JSON rules to FinanceRule format
 * This loads rules from finance-rules.json file in the project
 */
export function loadFinanceRules(): FinanceRule[] {
  const rules: FinanceRule[] = [];
  const json = financeRulesJSON as unknown as FinanceRulesJSONData;

  // Convert balloon rules
  if (json.balloon_rules) {
    for (const rule of json.balloon_rules) {
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
  if (json.installments_rules) {
    for (const rule of json.installments_rules) {
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
  if (json.ruleset.default_interest_rates) {
    const rates = json.ruleset.default_interest_rates;

    // רכב חדש (0-1 שנים): 7.4% (מיבואן) - נגזר משנתון
    if (rates.new_car_from_importer !== undefined) {
      rules.push({
        rule_id: 'INTEREST_NEW_CAR_FROM_IMPORTER',
        rule_type: 'insurance_rate',
        priority: 60,
        conditions: {
          car_type: 'new',
          car_age_years_max: 1,
        },
        result: {
          interest_rate: rates.new_car_from_importer,
        },
        is_active: true,
        description_he: 'רכב חדש מיבואן (0-1 שנים)',
      });
    }

    // רכב 0 קמ (שנתון שווה לשנה הנוכחית): 8.4% - נגזר משנתון
    if (rates.new_car_0_km !== undefined) {
      rules.push({
        rule_id: 'INTEREST_NEW_CAR_0_KM',
        rule_type: 'insurance_rate',
        priority: 61, // Higher priority - check 0 km first
        conditions: {
          car_type: 'new',
          car_age_years_max: 0, // Exactly 0 years = current year
        },
        result: {
          interest_rate: rates.new_car_0_km,
        },
        is_active: true,
        description_he: 'רכב 0 קמ',
      });
    }

    // רכב משומש עד 5 שנים: 9.9%
    if (rates.used_car_up_to_5_years !== undefined) {
      rules.push({
        rule_id: 'INTEREST_USED_CAR_UP_TO_5Y',
        rule_type: 'insurance_rate',
        priority: 58,
        conditions: {
          car_type: 'used',
          car_age_years_min: 0,
          car_age_years_max: 5,
        },
        result: {
          interest_rate: rates.used_car_up_to_5_years,
        },
        is_active: true,
        description_he: 'רכב משומש עד 5 שנים',
      });
    }

    // ללא ביטוח עד 70K: 10.4%
    if (rates.no_insurance_up_to_70k !== undefined) {
      rules.push({
        rule_id: 'INTEREST_NO_INSURANCE_UP_TO_70K',
        rule_type: 'insurance_rate',
        priority: 50,
        conditions: {
          insurance_required: false,
          max_price: 70000,
        },
        result: {
          interest_rate: rates.no_insurance_up_to_70k,
        },
        is_active: true,
        description_he: 'ללא ביטוח עד 70,000 ₪',
      });
    }

    // מעל 70 עד 100 ללא ביטוח: 15%
    if (rates.no_insurance_70k_to_100k !== undefined) {
      rules.push({
        rule_id: 'INTEREST_NO_INSURANCE_70K_TO_100K',
        rule_type: 'insurance_rate',
        priority: 49,
        conditions: {
          insurance_required: false,
          min_price: 70001,
          max_price: 100000,
        },
        result: {
          interest_rate: rates.no_insurance_70k_to_100k,
        },
        is_active: true,
        description_he: 'ללא ביטוח 70,001-100,000 ₪',
      });
    }
  }

  // Convert explicit interest rules if they exist
  if (json.interest_rules) {
    for (const rule of json.interest_rules) {
      rules.push({
        rule_id: rule.id,
        rule_type: 'insurance_rate',
        priority: rule.priority,
        conditions: rule.conditions,
        result: rule.result,
        is_active: true,
      });
    }
  }

  // Sort by priority (highest first)
  return rules.sort((a, b) => b.priority - a.priority);
}

/**
 * Get default interest rates from ruleset
 */
export function getDefaultInterestRates() {
  const json = financeRulesJSON as unknown as FinanceRulesJSONData;
  return json.ruleset.default_interest_rates || {};
}

/**
 * Get ruleset metadata
 */
export function getRulesetMetadata() {
  const json = financeRulesJSON as unknown as FinanceRulesJSONData;
  return json.ruleset;
}

