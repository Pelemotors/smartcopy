/**
 * Mock finance rules - static data for testing without Supabase
 * This will be replaced with Supabase integration later
 */

import { FinanceRule } from '@/types/finance';

export const mockFinanceRules: FinanceRule[] = [
  // Eligibility rules
  {
    rule_id: 'BALLOON_ELIGIBILITY_USED_UP_TO_6Y',
    rule_type: 'eligibility',
    priority: 100,
    conditions: {
      car_type: 'used',
      car_age_years_max: 6,
    },
    result: {
      balloon_allowed: true,
    },
    is_active: true,
  },
  {
    rule_id: 'BALLOON_ELIGIBILITY_USED_OVER_6Y',
    rule_type: 'eligibility',
    priority: 99,
    conditions: {
      car_type: 'used',
      car_age_years_min: 7,
    },
    result: {
      balloon_allowed: false,
      reason: 'רכב משומש מעל 6 שנים לא זכאי למסלול בלון',
    },
    is_active: true,
  },
  {
    rule_id: 'BALLOON_ELIGIBILITY_NEW',
    rule_type: 'eligibility',
    priority: 100,
    conditions: {
      car_type: 'new',
      car_age_years_max: 1,
    },
    result: {
      balloon_allowed: true,
    },
    is_active: true,
  },

  // Balloon terms rules - New cars
  {
    rule_id: 'BALLOON_NEW_CAR_PERCENT_60M',
    rule_type: 'balloon_terms',
    priority: 90,
    conditions: {
      car_type: 'new',
      loan_term_months: 60,
    },
    result: {
      balloon_max_percent_of_price_list: 45,
      balloon_interest_addon_percent: 0.0,
      notes: 'אין תוספת ריבית על בלונים לרכב חדש',
    },
    is_active: true,
  },

  // Balloon terms rules - Used 0-3 years
  {
    rule_id: 'BALLOON_USED_0_3Y_36M',
    rule_type: 'balloon_terms',
    priority: 80,
    conditions: {
      car_type: 'used',
      car_age_years_min: 0,
      car_age_years_max: 3,
      loan_term_months: 36,
    },
    result: {
      balloon_max_percent_of_price_list: 50,
    },
    is_active: true,
  },
  {
    rule_id: 'BALLOON_USED_0_3Y_48M',
    rule_type: 'balloon_terms',
    priority: 80,
    conditions: {
      car_type: 'used',
      car_age_years_min: 0,
      car_age_years_max: 3,
      loan_term_months: 48,
    },
    result: {
      balloon_max_percent_of_price_list: 35,
    },
    is_active: true,
  },
  {
    rule_id: 'BALLOON_USED_0_3Y_60M',
    rule_type: 'balloon_terms',
    priority: 80,
    conditions: {
      car_type: 'used',
      car_age_years_min: 0,
      car_age_years_max: 3,
      loan_term_months: 60,
    },
    result: {
      balloon_max_percent_of_price_list: 30,
    },
    is_active: true,
  },

  // Balloon terms rules - Used 4-6 years
  {
    rule_id: 'BALLOON_USED_4_6Y_36M',
    rule_type: 'balloon_terms',
    priority: 80,
    conditions: {
      car_type: 'used',
      car_age_years_min: 4,
      car_age_years_max: 6,
      loan_term_months: 36,
    },
    result: {
      balloon_max_percent_of_price_list: 40,
    },
    is_active: true,
  },
  {
    rule_id: 'BALLOON_USED_4_6Y_48M',
    rule_type: 'balloon_terms',
    priority: 80,
    conditions: {
      car_type: 'used',
      car_age_years_min: 4,
      car_age_years_max: 6,
      loan_term_months: 48,
    },
    result: {
      balloon_max_percent_of_price_list: 30,
    },
    is_active: true,
  },
  {
    rule_id: 'BALLOON_USED_4_6Y_60M',
    rule_type: 'balloon_terms',
    priority: 80,
    conditions: {
      car_type: 'used',
      car_age_years_min: 4,
      car_age_years_max: 6,
      loan_term_months: 60,
    },
    result: {
      balloon_max_percent_of_price_list: 25,
    },
    is_active: true,
  },

  // Installments policy rules
  {
    rule_id: 'TERM_10_21Y_2005_2016',
    rule_type: 'installments_policy',
    priority: 70,
    conditions: {
      car_age_years_min: 10,
      car_age_years_max: 21,
      model_year_min: 2005,
      model_year_max: 2016,
    },
    result: {
      base_installments: 36,
      max_installments_with_deviation: null,
      deviation_interest_addon_percent: null,
    },
    is_active: true,
  },
  {
    rule_id: 'TERM_8_9Y_2017_2018',
    rule_type: 'installments_policy',
    priority: 70,
    conditions: {
      car_age_years_min: 8,
      car_age_years_max: 9,
      model_year_min: 2017,
      model_year_max: 2018,
    },
    result: {
      base_installments: 48,
      max_installments_with_deviation: 60,
      deviation_interest_addon_percent: 0.6,
    },
    is_active: true,
  },
  {
    rule_id: 'TERM_6_7Y_2019_2020',
    rule_type: 'installments_policy',
    priority: 70,
    conditions: {
      car_age_years_min: 6,
      car_age_years_max: 7,
      model_year_min: 2019,
      model_year_max: 2020,
    },
    result: {
      base_installments: 60,
      max_installments_with_deviation: 72,
      deviation_interest_addon_percent: 0.6,
    },
    is_active: true,
  },
  {
    rule_id: 'TERM_4_5Y_2021_2022',
    rule_type: 'installments_policy',
    priority: 70,
    conditions: {
      car_age_years_min: 4,
      car_age_years_max: 5,
      model_year_min: 2021,
      model_year_max: 2022,
    },
    result: {
      base_installments: 72,
      max_installments_with_deviation: 84,
      deviation_interest_addon_percent: 0.6,
    },
    is_active: true,
  },
  {
    rule_id: 'TERM_2_3Y_2023_2024',
    rule_type: 'installments_policy',
    priority: 70,
    conditions: {
      car_age_years_min: 2,
      car_age_years_max: 3,
      model_year_min: 2023,
      model_year_max: 2024,
    },
    result: {
      base_installments: 84,
      max_installments_with_deviation: 96,
      deviation_interest_addon_percent: 0.6,
    },
    is_active: true,
  },
  {
    rule_id: 'TERM_0_1Y_2025_2026',
    rule_type: 'installments_policy',
    priority: 70,
    conditions: {
      car_age_years_min: 0,
      car_age_years_max: 1,
      model_year_min: 2025,
      model_year_max: 2026,
    },
    result: {
      base_installments: 84,
      max_installments_with_deviation: 100,
      deviation_interest_addon_percent: null,
    },
    is_active: true,
  },

  // Default interest rate (fallback)
  {
    rule_id: 'DEFAULT_INTEREST_RATE',
    rule_type: 'insurance_rate',
    priority: 0,
    conditions: {},
    result: {
      interest_rate: 10.4,
    },
    is_active: true,
    description_he: 'ריבית ברירת מחדל',
  },
];

