-- ============================================
-- הפעלת Realtime על כל הטבלאות במכה אחת
-- ============================================
-- שאילתה זו מוסיפה את כל הטבלאות ל-publication של Supabase Realtime
-- כך שכל שינוי בטבלאות יופיע בזמן אמת

-- הפעלת Realtime על כל הטבלאות
ALTER PUBLICATION supabase_realtime ADD TABLE public.leads;
ALTER PUBLICATION supabase_realtime ADD TABLE public.quiz_responses;
ALTER PUBLICATION supabase_realtime ADD TABLE public.blog_categories;
ALTER PUBLICATION supabase_realtime ADD TABLE public.blog_tags;
ALTER PUBLICATION supabase_realtime ADD TABLE public.blog_posts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.blog_post_tags;
ALTER PUBLICATION supabase_realtime ADD TABLE public.programs;
ALTER PUBLICATION supabase_realtime ADD TABLE public.admin_users;
ALTER PUBLICATION supabase_realtime ADD TABLE public.lead_notes;
ALTER PUBLICATION supabase_realtime ADD TABLE public.testimonials;

-- בדיקה: הצגת כל הטבלאות ב-Realtime
SELECT 
  schemaname,
  tablename
FROM pg_publication_tables
WHERE pubname = 'supabase_realtime'
ORDER BY tablename;

