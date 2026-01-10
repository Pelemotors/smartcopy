// TypeScript types for finance calculator

export interface FinanceRule {
  id?: string;
  rule_id: string;
  rule_type: 'eligibility' | 'balloon_terms' | 'installments_policy' | 'insurance_rate';
  priority: number;
  conditions: {
    car_type?: 'new' | 'used';
    car_age_years_min?: number;
    car_age_years_max?: number;
    model_year_min?: number;
    model_year_max?: number;
    loan_term_months?: number;
    max_price?: number;
    min_price?: number;
    insurance_required?: boolean;
    [key: string]: any;
  };
  result: {
    balloon_allowed?: boolean;
    balloon_max_percent_of_price_list?: number;
    balloon_interest_addon_percent?: number;
    base_installments?: number;
    max_installments_with_deviation?: number | null;
    deviation_interest_addon_percent?: number | null;
    interest_rate?: number;
    reason?: string;
    notes?: string;
    [key: string]: any;
  };
  is_active: boolean;
  description_he?: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Dealer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  company_name?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface FinanceCalculationInput {
  dealer_id?: string;
  vehicle_year: number;
  vehicle_price: number;
  finance_amount: number;
  loan_term_months: number;
  finance_type: 'regular' | 'balloon' | 'schpitzer';
  balloon_amount?: number;
  manual_interest_rate?: number; // ריבית ידנית (override) - אופציונלי
  insurance_required?: boolean; // true = נדרש ביטוח, false = ללא ביטוח (רק עד 100K)
  customer_name?: string;
  customer_phone?: string;
}

export interface FinanceCalculationResult {
  id?: string;
  dealer_id?: string;
  vehicle_year: number;
  vehicle_price: number;
  finance_amount: number;
  loan_term_months: number;
  interest_rate: number;
  monthly_payment: number;
  balloon_amount?: number;
  finance_type: 'regular' | 'balloon' | 'schpitzer';
  total_payments: number;
  total_interest: number;
  applied_rules: FinanceRule[];
  customer_name?: string;
  customer_phone?: string;
  created_at?: string;
}

export interface CalculationRules {
  balloon_allowed: boolean;
  balloon_max_percent?: number;
  balloon_interest_addon?: number;
  max_installments?: number;
  deviation_interest_addon?: number;
  interest_rate: number;
  calculated_interest_rate?: number; // הריבית שחושבה מהכללים (לפני override)
  is_manual_override?: boolean; // האם השתמשו בריבית ידנית
  applied_rules: FinanceRule[];
  warnings?: string[];
}

