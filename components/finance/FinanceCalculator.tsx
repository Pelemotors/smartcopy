'use client';

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { FinanceRule, FinanceCalculationResult } from '@/types/finance';
import { calculateFinance } from '@/lib/financeCalculations';
import { FinanceCalculationInput } from '@/types/finance';

interface FinanceCalculatorProps {
  dealerId?: string;
}

export const FinanceCalculator: React.FC<FinanceCalculatorProps> = ({ dealerId }) => {
  const [rules, setRules] = useState<FinanceRule[]>([]);
  const [defaultRates, setDefaultRates] = useState<{
    new_car_from_importer?: number;
    new_car_0_km?: number;
    used_car_up_to_5_years?: number;
    no_insurance_up_to_70k?: number;
    no_insurance_70k_to_100k?: number;
  }>({});
  const [loading, setLoading] = useState(true);
  const [calculating, setCalculating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<FinanceCalculationResult | null>(null);
  
  // Form fields
  const [vehicleYear, setVehicleYear] = useState<string>('');
  const [vehiclePrice, setVehiclePrice] = useState<string>('');
  const [financeAmount, setFinanceAmount] = useState<string>('');
  const [loanTermMonths, setLoanTermMonths] = useState<string>('36');
  const [financeType, setFinanceType] = useState<'regular' | 'balloon' | 'schpitzer'>('regular');
  const [balloonAmount, setBalloonAmount] = useState<string>('');
  const [manualInterestRate, setManualInterestRate] = useState<string>('');
  const [isFromImporter, setIsFromImporter] = useState<boolean>(false);
  const [is0Km, setIs0Km] = useState<boolean>(false);
  const [insuranceRequired, setInsuranceRequired] = useState<boolean>(false);
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');

  // Load rules from API on mount
  useEffect(() => {
    const fetchRules = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/finance/rules');
        const data = await response.json();
        
        if (response.ok && data.rules) {
          setRules(data.rules);
          if (data.metadata?.default_interest_rates) {
            setDefaultRates(data.metadata.default_interest_rates);
          }
        } else {
          setError('שגיאה בטעינת כללי המימון');
        }
      } catch (err) {
        console.error('Error fetching rules:', err);
        setError('שגיאה בטעינת כללי המימון');
      } finally {
        setLoading(false);
      }
    };

    fetchRules();
  }, []);

  // Calculate vehicle age and update available finance types based on rules
  useEffect(() => {
    if (vehicleYear && rules.length > 0) {
      const year = parseInt(vehicleYear);
      const currentYear = new Date().getFullYear();
      const vehicleAge = currentYear - year;
      const carType = vehicleAge <= 1 ? 'new' : 'used';

      // Check eligibility rules for balloon
      const eligibilityRules = rules.filter((r: any) => 
        r.rule_type === 'eligibility' && 
        r.is_active &&
        (r.conditions.car_type === carType || !r.conditions.car_type)
      );

      let balloonAllowed = false;
      for (const rule of eligibilityRules) {
        const maxAge = rule.conditions?.car_age_years_max;
        const minAge = rule.conditions?.car_age_years_min;
        
        if (maxAge !== undefined && vehicleAge <= maxAge && rule.result?.balloon_allowed === true) {
          balloonAllowed = true;
          break;
        }
        if (minAge !== undefined && vehicleAge >= minAge && rule.result?.balloon_allowed === false) {
          balloonAllowed = false;
          break;
        }
      }

      // If vehicle is not eligible for balloon, switch to regular
      if (!balloonAllowed && financeType === 'balloon') {
        setFinanceType('regular');
      }
    }
    
    // If 120 months selected but not eligible (not new from importer or 0 km), reset to 100
    if (loanTermMonths === '120' && !isFromImporter && !is0Km) {
      setLoanTermMonths('100');
    }
  }, [vehicleYear, rules, financeType, loanTermMonths, isFromImporter, is0Km]);

  // Calculate finance locally without API call
  const calculateFinanceLocal = (input: FinanceCalculationInput) => {
    try {
      return calculateFinance(input, rules);
    } catch (calcError: any) {
      throw new Error(calcError.message || 'שגיאה בחישוב המימון');
    }
  };

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    // Validation
    if (!vehicleYear || !vehiclePrice || !financeAmount || !loanTermMonths) {
      setError('יש למלא את כל השדות הנדרשים');
      return;
    }

    const year = parseInt(vehicleYear);
    const price = parseFloat(vehiclePrice);
    const amount = parseFloat(financeAmount);
    const term = parseInt(loanTermMonths);

    if (year > new Date().getFullYear()) {
      setError('שנת הרכב לא יכולה להיות עתידית');
      return;
    }

    if (price <= 0 || amount <= 0) {
      setError('מחיר הרכב וסכום המימון חייבים להיות חיוביים');
      return;
    }

    if (amount > price) {
      setError('סכום המימון לא יכול להיות גדול ממחיר הרכב');
      return;
    }

    // Validate loan term - 120 only for new car from importer or 0 km
    if (term === 120 && !isFromImporter && !is0Km) {
      setError('120 חודשים זמין רק לרכב חדש מיבואן או רכב 0 קמ');
      return;
    }
    
    if (![12, 24, 36, 48, 60, 72, 84, 96, 100, 120].includes(term)) {
      setError('תקופת הלוואה לא תקינה');
      return;
    }

    if (financeType === 'balloon' && (!balloonAmount || parseFloat(balloonAmount) <= 0)) {
      setError('יש לציין סכום בלון למסלול בלון');
      return;
    }

    try {
      setCalculating(true);
      setError(null);
      
      // Calculate locally without API/Supabase
      const calculationInput: FinanceCalculationInput = {
        dealer_id: dealerId || undefined,
        vehicle_year: year,
        vehicle_price: price,
        finance_amount: amount,
        loan_term_months: term,
        finance_type: financeType,
        balloon_amount: financeType === 'balloon' ? parseFloat(balloonAmount) : undefined,
        manual_interest_rate: manualInterestRate ? parseFloat(manualInterestRate) : undefined,
        is_from_importer: isFromImporter,
        is_0_km: is0Km,
        insurance_required: insuranceRequired,
        customer_name: customerName.trim() || undefined,
        customer_phone: customerPhone.trim() || undefined,
      };

      const calculationResult = calculateFinanceLocal(calculationInput);
      setResult(calculationResult);

      // Optional: Save to localStorage for debugging (can be removed)
      if (typeof window !== 'undefined') {
        const history = JSON.parse(localStorage.getItem('finance_calculations_history') || '[]');
        history.unshift({
          ...calculationResult,
          calculated_at: new Date().toISOString(),
        });
        // Keep only last 10 calculations
        localStorage.setItem('finance_calculations_history', JSON.stringify(history.slice(0, 10)));
      }
    } catch (err: any) {
      console.error('Error calculating finance:', err);
      setError(err.message || 'שגיאה בחישוב המימון');
    } finally {
      setCalculating(false);
    }
  };

  const handleReset = () => {
    setVehicleYear('');
    setVehiclePrice('');
    setFinanceAmount('');
    setLoanTermMonths('36');
    setFinanceType('regular');
    setBalloonAmount('');
    setManualInterestRate('');
    setIsFromImporter(false);
    setIs0Km(false);
    setInsuranceRequired(false);
    setCustomerName('');
    setCustomerPhone('');
    setResult(null);
    setError(null);
  };

  // Calculate vehicle age for display
  const vehicleAge = vehicleYear 
    ? new Date().getFullYear() - parseInt(vehicleYear)
    : null;

      // Check balloon eligibility from rules
      let balloonAllowed = false;
      if (vehicleAge !== null && rules.length > 0) {
        const carType = vehicleAge <= 1 ? 'new' : 'used';
        const eligibilityRules = rules.filter((r: any) => 
          r.rule_type === 'eligibility' && 
          r.is_active &&
          (r.conditions?.car_type === carType || !r.conditions?.car_type)
        );
        
        for (const rule of eligibilityRules) {
          const maxAge = rule.conditions?.car_age_years_max;
          const minAge = rule.conditions?.car_age_years_min;
          
          if (maxAge !== undefined && vehicleAge <= maxAge && rule.result?.balloon_allowed === true) {
            balloonAllowed = true;
            break;
          }
          if (minAge !== undefined && vehicleAge >= minAge && rule.result?.balloon_allowed === false) {
            balloonAllowed = false;
            break;
          }
        }
      }
      // Schpitzer is always available - it's the same as regular loan

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-text-dark mb-4 font-heading">
          מחשבון מימון רכב
        </h1>
        <p className="text-lg text-text-light">
          חשב את החזר המימון החודשי שלך בצורה פשוטה ומהירה
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <Card className="h-fit">
          <form onSubmit={handleCalculate} className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-text-dark mb-6 font-heading">
                פרטי הרכב
              </h2>
              
              <div className="space-y-4">
                <Input
                  label="שנתון הרכב"
                  type="number"
                  value={vehicleYear}
                  onChange={(e) => setVehicleYear(e.target.value)}
                  placeholder="לדוגמה: 2020"
                  min="1900"
                  max={new Date().getFullYear()}
                  required
                />

                <Input
                  label="מחיר הרכב (₪)"
                  type="number"
                  value={vehiclePrice}
                  onChange={(e) => setVehiclePrice(e.target.value)}
                  placeholder="לדוגמה: 150000"
                  min="0"
                  step="1000"
                  required
                />

                <Input
                  label="סכום מימון (₪)"
                  type="number"
                  value={financeAmount}
                  onChange={(e) => setFinanceAmount(e.target.value)}
                  placeholder="לדוגמה: 120000"
                  min="0"
                  step="1000"
                  required
                />

                {vehicleAge !== null && (
                  <div className="text-sm text-text-light">
                    גיל הרכב: {vehicleAge} שנים
                  </div>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-text-dark mb-6 font-heading">
                תנאי המימון
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-2 font-heading">
                    תקופת הלוואה (חודשים)
                  </label>
                  <select
                    value={loanTermMonths}
                    onChange={(e) => setLoanTermMonths(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-secondary/20 bg-background-white text-text-dark focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    required
                  >
                    <option value="12">12 חודשים</option>
                    <option value="24">24 חודשים</option>
                    <option value="36">36 חודשים</option>
                    <option value="48">48 חודשים</option>
                    <option value="60">60 חודשים</option>
                    <option value="72">72 חודשים</option>
                    <option value="84">84 חודשים</option>
                    <option value="96">96 חודשים</option>
                    <option value="100">100 חודשים</option>
                    {(isFromImporter || is0Km) && (
                      <option value="120">120 חודשים (רק רכב חדש מיבואן/0 קמ)</option>
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-dark mb-3 font-heading">
                    מסלול מימון
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-3 space-x-reverse cursor-pointer">
                      <input
                        type="radio"
                        name="financeType"
                        value="regular"
                        checked={financeType === 'regular'}
                        onChange={(e) => setFinanceType(e.target.value as 'regular')}
                        className="w-4 h-4 text-primary focus:ring-primary"
                      />
                      <span className="text-text-dark">רגיל</span>
                    </label>
                    
                    <label className="flex items-center space-x-3 space-x-reverse cursor-pointer">
                      <input
                        type="radio"
                        name="financeType"
                        value="schpitzer"
                        checked={financeType === 'schpitzer'}
                        onChange={(e) => setFinanceType(e.target.value as 'schpitzer')}
                        className="w-4 h-4 text-primary focus:ring-primary"
                      />
                      <span className="text-text-dark">
                        שפיצר (מסלול רגיל)
                      </span>
                    </label>
                    
                    <label className="flex items-center space-x-3 space-x-reverse cursor-pointer">
                      <input
                        type="radio"
                        name="financeType"
                        value="balloon"
                        checked={financeType === 'balloon'}
                        onChange={(e) => setFinanceType(e.target.value as 'balloon')}
                        disabled={!balloonAllowed}
                        className="w-4 h-4 text-primary focus:ring-primary disabled:opacity-50"
                      />
                      <span className={`text-text-dark ${!balloonAllowed ? 'opacity-50' : ''}`}>
                        בלון {!balloonAllowed && vehicleAge !== null && vehicleAge > 6 && '(לא זמין לרכב מעל 6 שנים)'}
                      </span>
                    </label>
                  </div>
                </div>

                {financeType === 'balloon' && (
                  <div>
                    <Input
                      label="סכום בלון (₪)"
                      type="number"
                      value={balloonAmount}
                      onChange={(e) => setBalloonAmount(e.target.value)}
                      placeholder="לדוגמה: 20000"
                      min="0"
                      step="1000"
                      required
                    />
                    {vehiclePrice && loanTermMonths && vehicleYear && rules.length > 0 && (() => {
                      const year = parseInt(vehicleYear);
                      const age = new Date().getFullYear() - year;
                      const carType = age <= 1 ? 'new' : 'used';
                      const term = parseInt(loanTermMonths);
                      
                      // Find balloon terms rule
                      const balloonRule = rules.find((r: any) => 
                        r.rule_type === 'balloon_terms' &&
                        r.is_active &&
                        (r.conditions?.car_type === carType || !r.conditions?.car_type) &&
                        (r.conditions?.loan_term_months === term || !r.conditions?.loan_term_months) &&
                        (!r.conditions?.car_age_years_min || age >= r.conditions.car_age_years_min) &&
                        (!r.conditions?.car_age_years_max || age <= r.conditions.car_age_years_max)
                      );
                      
                      if (balloonRule?.result?.balloon_max_percent_of_price_list) {
                        const maxAmount = (parseFloat(vehiclePrice) * balloonRule.result.balloon_max_percent_of_price_list) / 100;
                        return (
                          <div className="text-sm text-text-medium mt-2">
                            מקסימום: ₪{maxAmount.toLocaleString('he-IL')} ({balloonRule.result.balloon_max_percent_of_price_list}% ממחיר הרכב)
                          </div>
                        );
                      }
                      return null;
                    })()}
                  </div>
                )}

                {/* Optional fields for interest rate calculation */}
                <div className="space-y-4 pt-4 border-t border-secondary/20">
                  <div className="text-sm font-medium text-text-dark mb-2 font-heading">
                    אפשרויות נוספות (אופציונלי)
                  </div>
                  
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 space-x-reverse cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isFromImporter}
                        onChange={(e) => setIsFromImporter(e.target.checked)}
                        className="w-4 h-4 text-primary focus:ring-primary rounded"
                      />
                      <span className="text-text-dark text-sm">רכב חדש מיבואן (ריבית: {defaultRates.new_car_from_importer}%)</span>
                    </label>
                    
                    <label className="flex items-center space-x-3 space-x-reverse cursor-pointer">
                      <input
                        type="checkbox"
                        checked={is0Km}
                        onChange={(e) => setIs0Km(e.target.checked)}
                        className="w-4 h-4 text-primary focus:ring-primary rounded"
                      />
                      <span className="text-text-dark text-sm">רכב 0 קמ (ריבית: {defaultRates.new_car_0_km}%)</span>
                    </label>
                    
                    <label className="flex items-center space-x-3 space-x-reverse cursor-pointer">
                      <input
                        type="checkbox"
                        checked={insuranceRequired}
                        onChange={(e) => setInsuranceRequired(e.target.checked)}
                        className="w-4 h-4 text-primary focus:ring-primary rounded"
                      />
                      <span className="text-text-dark text-sm">נדרש ביטוח</span>
                    </label>
                  </div>

                  <div>
                    <Input
                      label="ריבית ידנית (%) - אוברול"
                      type="number"
                      value={manualInterestRate}
                      onChange={(e) => setManualInterestRate(e.target.value)}
                      placeholder="לדוגמה: 8.5 (ריק = שימוש בריבית אוטומטית)"
                      min="0"
                      max="100"
                      step="0.1"
                    />
                    <div className="text-xs text-text-light mt-1">
                      אם מוזן, יתעלם מכללי הריבית האוטומטיים
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-text-dark mb-4 font-heading">
                פרטי קשר (אופציונלי)
              </h3>
              
              <div className="space-y-4">
                <Input
                  label="שם מלא"
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="הכנס שם מלא"
                />

                <Input
                  label="טלפון"
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="לדוגמה: 050-1234567"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-error/30 text-error px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div className="flex gap-4">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="flex-1"
                disabled={calculating}
              >
                {calculating ? (
                  <>
                    <LoadingSpinner size="sm" className="ml-2" />
                    מחשב...
                  </>
                ) : (
                  'חשב מימון'
                )}
              </Button>
              
              {result && (
                <Button
                  type="button"
                  variant="secondary"
                  size="lg"
                  onClick={handleReset}
                >
                  איפוס
                </Button>
              )}
            </div>
          </form>
        </Card>

        {/* Results */}
        <Card className="h-fit">
          <h2 className="text-2xl font-bold text-text-dark mb-6 font-heading">
            תוצאות החישוב
          </h2>

          {result ? (
            <div className="space-y-6">
              <div className="bg-primary-pale rounded-lg p-6 border border-primary/20">
                <div className="text-center mb-4">
                  <div className="text-sm text-text-medium mb-1">החזר חודשי</div>
                  <div className="text-4xl font-bold text-primary-dark font-heading">
                    ₪{result.monthly_payment.toLocaleString('he-IL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-secondary/20">
                  <span className="text-text-light">ריבית שנתית</span>
                  <span className="text-text-dark font-semibold">{result.interest_rate}%</span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-secondary/20">
                  <span className="text-text-light">תקופת הלוואה</span>
                  <span className="text-text-dark font-semibold">{result.loan_term_months} חודשים</span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-secondary/20">
                  <span className="text-text-light">סכום מימון</span>
                  <span className="text-text-dark font-semibold">₪{result.finance_amount.toLocaleString('he-IL')}</span>
                </div>

                {result.balloon_amount && (
                  <div className="flex justify-between items-center py-3 border-b border-secondary/20">
                    <span className="text-text-light">סכום בלון</span>
                    <span className="text-text-dark font-semibold">₪{result.balloon_amount.toLocaleString('he-IL')}</span>
                  </div>
                )}

                <div className="flex justify-between items-center py-3 border-b border-secondary/20">
                  <span className="text-text-light">סך תשלומים</span>
                  <span className="text-text-dark font-semibold">₪{result.total_payments.toLocaleString('he-IL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-secondary/20">
                  <span className="text-text-light">סכום ריבית כולל</span>
                  <span className="text-text-dark font-semibold">₪{result.total_interest.toLocaleString('he-IL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>

                <div className="flex justify-between items-center py-3">
                  <span className="text-text-light">סוג מסלול</span>
                  <span className="text-text-dark font-semibold">
                    {result.finance_type === 'regular' ? 'רגיל' : 
                     result.finance_type === 'balloon' ? 'בלון' : 'שפיצר'}
                  </span>
                </div>
              </div>

              <div className="bg-primary-pale border border-primary/30 rounded-lg p-4 mt-6">
                <p className="text-sm text-primary-dark">
                  <strong>שימו לב:</strong> התוצאות הן הערכה בלבד. תנאי המימון הסופיים תלויים באישור בנקאי.
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-text-light">
              מלא את פרטי הרכב והמימון כדי לקבל את התוצאות
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

