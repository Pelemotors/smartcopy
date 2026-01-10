import { FinanceRule, FinanceCalculationInput, FinanceCalculationResult, CalculationRules } from '@/types/finance';

/**
 * Calculate vehicle age in years
 */
export function calculateVehicleAge(vehicleYear: number): number {
  const currentYear = new Date().getFullYear();
  return currentYear - vehicleYear;
}

/**
 * Determine if vehicle is new or used based on age
 */
export function getCarType(vehicleAge: number): 'new' | 'used' {
  return vehicleAge <= 1 ? 'new' : 'used';
}

/**
 * Check if a condition matches the vehicle parameters
 */
function matchesCondition(
  conditions: any,
  vehicleAge: number,
  vehicleYear: number,
  vehiclePrice: number,
  loanTermMonths: number,
  carType: 'new' | 'used',
  isFromImporter?: boolean,
  is0Km?: boolean,
  insuranceRequired?: boolean
): boolean {
  // Check car_type
  if (conditions.car_type !== undefined && conditions.car_type !== carType) {
    return false;
  }

  // Check car_age_years
  if (conditions.car_age_years_min !== undefined && vehicleAge < conditions.car_age_years_min) {
    return false;
  }
  if (conditions.car_age_years_max !== undefined && vehicleAge > conditions.car_age_years_max) {
    return false;
  }

  // Check model_year
  if (conditions.model_year_min !== undefined && vehicleYear < conditions.model_year_min) {
    return false;
  }
  if (conditions.model_year_max !== undefined && vehicleYear > conditions.model_year_max) {
    return false;
  }

  // Check loan_term_months
  if (conditions.loan_term_months !== undefined && loanTermMonths !== conditions.loan_term_months) {
    return false;
  }

  // Check price (for insurance rules)
  if (conditions.min_price !== undefined && vehiclePrice < conditions.min_price) {
    return false;
  }
  if (conditions.max_price !== undefined && vehiclePrice > conditions.max_price) {
    return false;
  }

  // Check is_from_importer
  if (conditions.is_from_importer !== undefined && conditions.is_from_importer !== isFromImporter) {
    return false;
  }

  // Check is_0_km
  if (conditions.is_0_km !== undefined && conditions.is_0_km !== is0Km) {
    return false;
  }

  // Check insurance_required
  if (conditions.insurance_required !== undefined && conditions.insurance_required !== insuranceRequired) {
    return false;
  }

  return true;
}

/**
 * Apply finance rules to determine available options and rates
 */
export function applyFinanceRules(
  vehicleYear: number,
  vehiclePrice: number,
  loanTermMonths: number,
  rules: FinanceRule[],
  isFromImporter?: boolean,
  is0Km?: boolean,
  insuranceRequired?: boolean,
  manualInterestRate?: number
): CalculationRules {
  const vehicleAge = calculateVehicleAge(vehicleYear);
  const carType = getCarType(vehicleAge);
  const activeRules = rules.filter(rule => rule.is_active).sort((a, b) => b.priority - a.priority);
  const appliedRules: FinanceRule[] = [];
  const warnings: string[] = [];
  
  let balloon_allowed = false;
  let balloon_max_percent: number | undefined;
  let balloon_interest_addon: number | undefined;
  let max_installments: number | undefined;
  let deviation_interest_addon: number | undefined;
  let calculated_interest_rate = 9.9; // Default fallback (used car up to 5 years)
  let is_manual_override = false;

  // First, check eligibility rules for balloon
  for (const rule of activeRules) {
    if (rule.rule_type === 'eligibility') {
      if (matchesCondition(rule.conditions, vehicleAge, vehicleYear, vehiclePrice, loanTermMonths, carType, isFromImporter, is0Km, insuranceRequired)) {
        if (rule.result.balloon_allowed !== undefined) {
          balloon_allowed = rule.result.balloon_allowed;
          if (!balloon_allowed && rule.result.reason) {
            warnings.push(rule.result.reason);
          }
        }
        appliedRules.push(rule);
        break; // Take first matching eligibility rule (highest priority)
      }
    }
  }

  // Check balloon_terms rules for specific balloon conditions
  if (balloon_allowed) {
    for (const rule of activeRules) {
      if (rule.rule_type === 'balloon_terms') {
        if (matchesCondition(rule.conditions, vehicleAge, vehicleYear, vehiclePrice, loanTermMonths, carType, isFromImporter, is0Km, insuranceRequired)) {
          if (rule.result.balloon_max_percent_of_price_list !== undefined) {
            balloon_max_percent = rule.result.balloon_max_percent_of_price_list;
          }
          if (rule.result.balloon_interest_addon_percent !== undefined) {
            balloon_interest_addon = rule.result.balloon_interest_addon_percent;
          }
          appliedRules.push(rule);
          break; // Take first matching balloon_terms rule
        }
      }
    }
  }

  // Check installments_policy rules
  for (const rule of activeRules) {
    if (rule.rule_type === 'installments_policy') {
      if (matchesCondition(rule.conditions, vehicleAge, vehicleYear, vehiclePrice, loanTermMonths, carType, isFromImporter, is0Km, insuranceRequired)) {
        if (rule.result.base_installments !== undefined) {
          max_installments = rule.result.base_installments;
        }
        if (rule.result.max_installments_with_deviation !== undefined && rule.result.max_installments_with_deviation !== null) {
          max_installments = rule.result.max_installments_with_deviation;
        }
        if (rule.result.deviation_interest_addon_percent !== undefined && rule.result.deviation_interest_addon_percent !== null) {
          deviation_interest_addon = rule.result.deviation_interest_addon_percent;
        }
        appliedRules.push(rule);
        break; // Take first matching installments_policy rule
      }
    }
  }

  // Check insurance_rate rules for interest rate (only if no manual override)
  if (manualInterestRate === undefined) {
    for (const rule of activeRules) {
      if (rule.rule_type === 'insurance_rate') {
        if (matchesCondition(rule.conditions, vehicleAge, vehicleYear, vehiclePrice, loanTermMonths, carType, isFromImporter, is0Km, insuranceRequired)) {
          if (rule.result.interest_rate !== undefined) {
            calculated_interest_rate = rule.result.interest_rate;
          }
          appliedRules.push(rule);
          break; // Take first matching insurance_rate rule
        }
      }
    }
  } else {
    // Manual override - use user-provided rate
    calculated_interest_rate = manualInterestRate;
    is_manual_override = true;
    warnings.push(`ריבית ידנית: ${manualInterestRate}%`);
  }

  // Apply deviation interest addon if applicable (only if not manual override)
  if (!is_manual_override && deviation_interest_addon !== undefined && max_installments !== undefined && loanTermMonths > max_installments) {
    calculated_interest_rate += deviation_interest_addon;
  }

  // Apply balloon interest addon if applicable (only if not manual override)
  if (!is_manual_override && balloon_interest_addon !== undefined && balloon_interest_addon > 0) {
    calculated_interest_rate += balloon_interest_addon;
  }

  return {
    balloon_allowed,
    balloon_max_percent,
    balloon_interest_addon,
    max_installments,
    deviation_interest_addon,
    interest_rate: calculated_interest_rate,
    calculated_interest_rate: is_manual_override ? undefined : calculated_interest_rate,
    is_manual_override,
    applied_rules: appliedRules,
    warnings: warnings.length > 0 ? warnings : undefined
  };
}

/**
 * Calculate monthly payment using PMT formula
 * PMT = P * [r(1+r)^n] / [(1+r)^n - 1]
 * Where:
 * P = principal amount
 * r = monthly interest rate (annual rate / 12)
 * n = number of months
 */
function calculatePMT(principal: number, annualRate: number, months: number): number {
  if (months === 0 || annualRate === 0) {
    return principal / months || 0;
  }
  
  const monthlyRate = annualRate / 100 / 12;
  const denominator = Math.pow(1 + monthlyRate, months) - 1;
  
  if (denominator === 0) {
    return principal / months;
  }
  
  const pmt = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / denominator;
  return pmt;
}

/**
 * Calculate regular loan (no balloon)
 */
function calculateRegularLoan(
  financeAmount: number,
  interestRate: number,
  months: number
): { monthlyPayment: number; totalPayments: number; totalInterest: number } {
  const monthlyPayment = calculatePMT(financeAmount, interestRate, months);
  const totalPayments = monthlyPayment * months;
  const totalInterest = totalPayments - financeAmount;

  return {
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    totalPayments: Math.round(totalPayments * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100
  };
}

/**
 * Calculate balloon loan
 * The balloon amount is paid at the end, so we calculate payment on the non-balloon portion
 */
function calculateBalloonLoan(
  financeAmount: number,
  balloonAmount: number,
  interestRate: number,
  months: number
): { monthlyPayment: number; totalPayments: number; totalInterest: number } {
  const principalAmount = financeAmount - balloonAmount;
  const monthlyPayment = calculatePMT(principalAmount, interestRate, months);
  
  // Total includes monthly payments + balloon payment
  const totalMonthlyPayments = monthlyPayment * months;
  const totalPayments = totalMonthlyPayments + balloonAmount;
  const totalInterest = totalPayments - financeAmount;

  return {
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    totalPayments: Math.round(totalPayments * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100
  };
}

/**
 * Calculate Schpitzer (equal payments including principal and interest)
 * Similar to regular loan but may have different calculation method in some systems
 * For now, we'll use the same PMT formula as regular loan
 */
function calculateSchpitzerLoan(
  financeAmount: number,
  interestRate: number,
  months: number
): { monthlyPayment: number; totalPayments: number; totalInterest: number } {
  // Schpitzer is essentially the same as regular loan with PMT formula
  return calculateRegularLoan(financeAmount, interestRate, months);
}

/**
 * Main function to calculate finance
 */
export function calculateFinance(
  input: FinanceCalculationInput,
  rules: FinanceRule[]
): FinanceCalculationResult {
  // Validate input
  if (input.vehicle_year > new Date().getFullYear()) {
    throw new Error('שנת הרכב לא יכולה להיות עתידית');
  }
  
  if (input.vehicle_price <= 0 || input.finance_amount <= 0) {
    throw new Error('מחיר הרכב וסכום המימון חייבים להיות חיוביים');
  }
  
  if (input.finance_amount > input.vehicle_price) {
    throw new Error('סכום המימון לא יכול להיות גדול ממחיר הרכב');
  }
  
  // Validate loan term - 120 only for new car from importer or 0 km
  if (input.loan_term_months === 120 && !input.is_from_importer && !input.is_0_km) {
    throw new Error('120 חודשים זמין רק לרכב חדש מיבואן או רכב 0 קמ');
  }
  
  if (![12, 24, 36, 48, 60, 72, 84, 96, 100, 120].includes(input.loan_term_months)) {
    throw new Error('תקופת הלוואה לא תקינה. אפשרויות: 12, 24, 36, 48, 60, 72, 84, 96, 100, 120 חודשים (120 רק לרכב חדש מיבואן/0 קמ)');
  }

  // Apply rules
  const calculationRules = applyFinanceRules(
    input.vehicle_year,
    input.vehicle_price,
    input.loan_term_months,
    rules,
    input.is_from_importer,
    input.is_0_km,
    input.insurance_required,
    input.manual_interest_rate
  );

  // Validate finance type against rules
  if (input.finance_type === 'balloon' && !calculationRules.balloon_allowed) {
    const reason = calculationRules.warnings?.[0] || 'מסלול בלון לא זמין לרכב זה';
    throw new Error(reason);
  }

  // Validate balloon amount if balloon loan
  if (input.finance_type === 'balloon') {
    if (!input.balloon_amount || input.balloon_amount <= 0) {
      throw new Error('יש לציין סכום בלון למסלול בלון');
    }
    if (input.balloon_amount >= input.finance_amount) {
      throw new Error('סכום הבלון לא יכול להיות גדול או שווה לסכום המימון');
    }
    
    // Check max balloon percent if rule exists
    if (calculationRules.balloon_max_percent !== undefined) {
      const maxBalloonAmount = (input.vehicle_price * calculationRules.balloon_max_percent) / 100;
      if (input.balloon_amount > maxBalloonAmount) {
        throw new Error(`סכום הבלון המקסימלי המותר הוא ${maxBalloonAmount.toLocaleString('he-IL')} ₪ (${calculationRules.balloon_max_percent}% ממחיר הרכב)`);
      }
    }
  }

  // Calculate based on finance type
  let calculationResult;
  let balloonAmount = input.balloon_amount;

  switch (input.finance_type) {
    case 'balloon':
      calculationResult = calculateBalloonLoan(
        input.finance_amount,
        input.balloon_amount!,
        calculationRules.interest_rate,
        input.loan_term_months
      );
      break;
    
    case 'schpitzer':
    case 'regular':
    default:
      // Schpitzer is the same as regular loan - equal payments
      calculationResult = calculateRegularLoan(
        input.finance_amount,
        calculationRules.interest_rate,
        input.loan_term_months
      );
      balloonAmount = undefined;
      break;
  }

  return {
    dealer_id: input.dealer_id,
    vehicle_year: input.vehicle_year,
    vehicle_price: input.vehicle_price,
    finance_amount: input.finance_amount,
    loan_term_months: input.loan_term_months,
    interest_rate: calculationRules.interest_rate,
    monthly_payment: calculationResult.monthlyPayment,
    balloon_amount: balloonAmount,
    finance_type: input.finance_type,
    total_payments: calculationResult.totalPayments,
    total_interest: calculationResult.totalInterest,
    applied_rules: calculationRules.applied_rules,
    customer_name: input.customer_name,
    customer_phone: input.customer_phone
  };
}
