-- Migration: Finance Calculator Schema
-- This migration creates all required tables for the car finance calculator

-- ============================================
-- Finance Rules (כללי מימון)
-- ============================================

CREATE TABLE IF NOT EXISTS finance_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rule_id VARCHAR(100) NOT NULL UNIQUE, -- ID ייחודי לכלל (למשל: 'BALLOON_ELIGIBILITY_USED_UP_TO_6Y')
  rule_type VARCHAR(50) NOT NULL, -- 'eligibility', 'balloon_terms', 'installments_policy', 'insurance_rate'
  priority INTEGER NOT NULL DEFAULT 0, -- סדר עדיפות (גבוה יותר = עדיפות גבוהה יותר)
  conditions JSONB NOT NULL DEFAULT '{}'::jsonb, -- תנאים (car_type, car_age_years_min/max, loan_term_months, וכו')
  result JSONB NOT NULL DEFAULT '{}'::jsonb, -- תוצאות/ערכים (balloon_allowed, balloon_max_percent_of_price_list, base_installments, וכו')
  is_active BOOLEAN DEFAULT true,
  description_he TEXT, -- תיאור הכלל בעברית
  notes TEXT, -- הערות נוספות
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for finance_rules
CREATE INDEX IF NOT EXISTS idx_finance_rules_rule_id ON finance_rules(rule_id);
CREATE INDEX IF NOT EXISTS idx_finance_rules_type ON finance_rules(rule_type);
CREATE INDEX IF NOT EXISTS idx_finance_rules_active ON finance_rules(is_active);
CREATE INDEX IF NOT EXISTS idx_finance_rules_priority ON finance_rules(priority DESC, is_active);
CREATE INDEX IF NOT EXISTS idx_finance_rules_conditions ON finance_rules USING GIN(conditions);

-- ============================================
-- Dealers (סוחרים)
-- ============================================

CREATE TABLE IF NOT EXISTS dealers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  company_name VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for dealers
CREATE INDEX IF NOT EXISTS idx_dealers_active ON dealers(is_active);
CREATE INDEX IF NOT EXISTS idx_dealers_email ON dealers(email);

-- ============================================
-- Finance Calculations (חישובי מימון)
-- ============================================

CREATE TABLE IF NOT EXISTS finance_calculations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dealer_id UUID REFERENCES dealers(id) ON DELETE SET NULL,
  vehicle_year INTEGER NOT NULL,
  vehicle_price DECIMAL(12, 2) NOT NULL,
  finance_amount DECIMAL(12, 2) NOT NULL,
  loan_term_months INTEGER NOT NULL,
  interest_rate DECIMAL(5, 2) NOT NULL,
  monthly_payment DECIMAL(12, 2) NOT NULL,
  balloon_amount DECIMAL(12, 2), -- אם מסלול בלון
  finance_type VARCHAR(20) NOT NULL CHECK (finance_type IN ('regular', 'balloon', 'schpitzer')),
  applied_rules JSONB DEFAULT '{}'::jsonb, -- כללים שחלו על החישוב
  customer_name VARCHAR(255), -- אופציונלי
  customer_phone VARCHAR(20), -- אופציונלי
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for finance_calculations
CREATE INDEX IF NOT EXISTS idx_finance_calculations_dealer ON finance_calculations(dealer_id);
CREATE INDEX IF NOT EXISTS idx_finance_calculations_created ON finance_calculations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_finance_calculations_type ON finance_calculations(finance_type);

-- ============================================
-- Dealer Usage Stats (סטטיסטיקות שימוש סוחרים)
-- ============================================

CREATE TABLE IF NOT EXISTS dealer_usage_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dealer_id UUID NOT NULL REFERENCES dealers(id) ON DELETE CASCADE,
  calculation_count INTEGER DEFAULT 0, -- מספר חישובים
  total_finance_amount DECIMAL(15, 2) DEFAULT 0, -- סכום מימון כולל
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(dealer_id, date)
);

-- Indexes for dealer_usage_stats
CREATE INDEX IF NOT EXISTS idx_dealer_usage_stats_dealer ON dealer_usage_stats(dealer_id);
CREATE INDEX IF NOT EXISTS idx_dealer_usage_stats_date ON dealer_usage_stats(date DESC);

-- ============================================
-- Triggers for updated_at
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers
CREATE TRIGGER update_finance_rules_updated_at
  BEFORE UPDATE ON finance_rules
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_dealers_updated_at
  BEFORE UPDATE ON dealers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- RLS Policies (Row Level Security)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE finance_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE dealers ENABLE ROW LEVEL SECURITY;
ALTER TABLE finance_calculations ENABLE ROW LEVEL SECURITY;
ALTER TABLE dealer_usage_stats ENABLE ROW LEVEL SECURITY;

-- Finance Rules: Anyone can read active rules
CREATE POLICY "Anyone can read active finance rules"
  ON finance_rules
  FOR SELECT
  TO public
  USING (is_active = true);

-- Dealers: Public can read active dealers, authenticated users can manage
CREATE POLICY "Public can read active dealers"
  ON dealers
  FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage dealers"
  ON dealers
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Finance Calculations: Anyone can insert, authenticated users can read all
CREATE POLICY "Anyone can insert finance calculations"
  ON finance_calculations
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read finance calculations"
  ON finance_calculations
  FOR SELECT
  TO authenticated
  USING (true);

-- Dealer Usage Stats: Only authenticated users can read
CREATE POLICY "Authenticated users can read dealer usage stats"
  ON dealer_usage_stats
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage dealer usage stats"
  ON dealer_usage_stats
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ============================================
-- Seed Data: Finance Rules
-- הערה: כללי העסקים המלאים ייובאו דרך API /api/finance/rules/import
-- הקובץ finance-rules.json מכיל את כל הכללים בפורמט המלא
-- ============================================

