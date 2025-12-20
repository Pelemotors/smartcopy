-- ============================================
-- הוספת עמודות חסרות לטבלת leads
-- ============================================
-- שאילתה זו מוסיפה עמודות שחסרות בטבלת leads

-- בדיקה והוספת ip_address אם חסר
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'leads' 
    AND column_name = 'ip_address'
  ) THEN
    ALTER TABLE public.leads ADD COLUMN ip_address INET;
    RAISE NOTICE 'Added ip_address column';
  END IF;
END $$;

-- בדיקה והוספת user_agent אם חסר
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'leads' 
    AND column_name = 'user_agent'
  ) THEN
    ALTER TABLE public.leads ADD COLUMN user_agent TEXT;
    RAISE NOTICE 'Added user_agent column';
  END IF;
END $$;

-- בדיקה והוספת status אם חסר
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'leads' 
    AND column_name = 'status'
  ) THEN
    ALTER TABLE public.leads ADD COLUMN status VARCHAR(50) DEFAULT 'new' 
      CHECK (status IN ('new', 'contacted', 'converted', 'archived'));
    RAISE NOTICE 'Added status column';
  END IF;
END $$;

-- בדיקה והוספת updated_at אם חסר
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'leads' 
    AND column_name = 'updated_at'
  ) THEN
    ALTER TABLE public.leads ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    RAISE NOTICE 'Added updated_at column';
  END IF;
END $$;

-- בדיקה אם יש trigger לעדכון updated_at
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM pg_trigger 
    WHERE tgname = 'update_leads_updated_at'
  ) THEN
    CREATE TRIGGER update_leads_updated_at
      BEFORE UPDATE ON public.leads
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
    RAISE NOTICE 'Added update_leads_updated_at trigger';
  END IF;
END $$;

-- הצגת כל העמודות בטבלה
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'leads'
ORDER BY ordinal_position;

