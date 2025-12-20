-- ============================================
-- תיקון: הוספת policy ל-INSERT ללידים
-- ============================================
-- הבעיה: טבלת leads לא מאפשרת INSERT כי אין policy
-- הפתרון: הוספת policy שמאפשר INSERT מ-anonymous users

-- Policy: Allow anyone (including anonymous) to insert leads
CREATE POLICY "Anyone can insert leads"
  ON public.leads
  FOR INSERT
  TO public
  WITH CHECK (true);

-- אם כבר קיימת policy בשם הזה, נמחק אותה קודם
DROP POLICY IF EXISTS "Anyone can insert leads" ON public.leads;

-- עכשיו ניצור אותה מחדש
CREATE POLICY "Anyone can insert leads"
  ON public.leads
  FOR INSERT
  TO public
  WITH CHECK (true);

