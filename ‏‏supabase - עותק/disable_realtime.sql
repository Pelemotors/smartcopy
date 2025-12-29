-- ============================================
-- ביטול Realtime מכל הטבלאות (אם צריך)
-- ============================================

ALTER PUBLICATION supabase_realtime DROP TABLE public.leads;
ALTER PUBLICATION supabase_realtime DROP TABLE public.quiz_responses;
ALTER PUBLICATION supabase_realtime DROP TABLE public.blog_categories;
ALTER PUBLICATION supabase_realtime DROP TABLE public.blog_tags;
ALTER PUBLICATION supabase_realtime DROP TABLE public.blog_posts;
ALTER PUBLICATION supabase_realtime DROP TABLE public.blog_post_tags;
ALTER PUBLICATION supabase_realtime DROP TABLE public.programs;
ALTER PUBLICATION supabase_realtime DROP TABLE public.admin_users;
ALTER PUBLICATION supabase_realtime DROP TABLE public.lead_notes;
ALTER PUBLICATION supabase_realtime DROP TABLE public.testimonials;

