-- ============================================
-- Supabase Schema for Dental Lab Website
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 1. טבלת לידים (leads)
-- ============================================
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  service_type VARCHAR(100),
  message TEXT,
  source VARCHAR(50) DEFAULT 'contact_form' CHECK (source IN ('contact_form', 'dental_quiz')),
  quiz_score INTEGER,
  quiz_tier INTEGER CHECK (quiz_tier IN (1, 2, 3)),
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'converted', 'archived'))
);

-- Indexes for leads
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_phone ON public.leads(phone);
CREATE INDEX IF NOT EXISTS idx_leads_source ON public.leads(source);

-- Trigger for updated_at
CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RLS for leads
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Policy: Only authenticated users can read (for admin panel)
CREATE POLICY "Authenticated users can read leads"
  ON public.leads
  FOR SELECT
  TO authenticated
  USING (true);

-- ============================================
-- 2. טבלת תשובות שאלון (quiz_responses) - אופציונלי
-- ============================================
CREATE TABLE IF NOT EXISTS public.quiz_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE,
  question_index INTEGER NOT NULL,
  answer_value TEXT NOT NULL,
  answer_score INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for quiz_responses
CREATE INDEX IF NOT EXISTS idx_quiz_responses_lead_id ON public.quiz_responses(lead_id);
CREATE INDEX IF NOT EXISTS idx_quiz_responses_created_at ON public.quiz_responses(created_at DESC);

-- RLS for quiz_responses
ALTER TABLE public.quiz_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read quiz responses"
  ON public.quiz_responses
  FOR SELECT
  TO authenticated
  USING (true);

-- ============================================
-- 3. טבלת קטגוריות בלוג (blog_categories)
-- ============================================
CREATE TABLE IF NOT EXISTS public.blog_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name_he VARCHAR(255) NOT NULL UNIQUE,
  name_en VARCHAR(255),
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for blog_categories
CREATE INDEX IF NOT EXISTS idx_blog_categories_slug ON public.blog_categories(slug);

-- Insert basic categories
INSERT INTO public.blog_categories (name_he, slug, description) VALUES
  ('כתרים', 'crowns', 'מאמרים על כתרים דנטליים'),
  ('תותבות', 'dentures', 'מאמרים על תותבות שיניים'),
  ('גשרים', 'bridges', 'מאמרים על גשרים דנטליים'),
  ('שיקום שיניים', 'dental-restoration', 'מאמרים על שיקום שיניים')
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- 4. טבלת תגיות בלוג (blog_tags)
-- ============================================
CREATE TABLE IF NOT EXISTS public.blog_tags (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name_he VARCHAR(255) NOT NULL UNIQUE,
  name_en VARCHAR(255),
  slug VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for blog_tags
CREATE INDEX IF NOT EXISTS idx_blog_tags_slug ON public.blog_tags(slug);

-- ============================================
-- 5. טבלת מאמרי בלוג (blog_posts)
-- ============================================
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title_he VARCHAR(500) NOT NULL,
  title_en VARCHAR(500),
  slug VARCHAR(500) NOT NULL UNIQUE,
  excerpt_he TEXT,
  excerpt_en TEXT,
  content_he TEXT NOT NULL,
  content_en TEXT,
  featured_image_url TEXT,
  category_id UUID REFERENCES public.blog_categories(id) ON DELETE SET NULL,
  author_name VARCHAR(255) DEFAULT 'מעבדת שיניים',
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  meta_title_he VARCHAR(500),
  meta_title_en VARCHAR(500),
  meta_description_he TEXT,
  meta_description_en TEXT,
  meta_keywords_he TEXT,
  meta_keywords_en TEXT,
  view_count INTEGER DEFAULT 0
);

-- Indexes for blog_posts
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON public.blog_posts(published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON public.blog_posts(category_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON public.blog_posts(created_at DESC);

-- Trigger for updated_at
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RLS for blog_posts
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read published posts
CREATE POLICY "Anyone can read published posts"
  ON public.blog_posts
  FOR SELECT
  TO public
  USING (published = true AND published_at <= NOW());

-- Policy: Authenticated users can manage posts
CREATE POLICY "Authenticated users can manage posts"
  ON public.blog_posts
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ============================================
-- 6. טבלת קשר פוסטים-תגיות (blog_post_tags)
-- ============================================
CREATE TABLE IF NOT EXISTS public.blog_post_tags (
  post_id UUID REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES public.blog_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- Indexes for blog_post_tags
CREATE INDEX IF NOT EXISTS idx_blog_post_tags_post ON public.blog_post_tags(post_id);
CREATE INDEX IF NOT EXISTS idx_blog_post_tags_tag ON public.blog_post_tags(tag_id);

-- RLS for blog_post_tags
ALTER TABLE public.blog_post_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read post tags"
  ON public.blog_post_tags
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage post tags"
  ON public.blog_post_tags
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ============================================
-- 7. טבלת מסלולים/חבילות (programs)
-- ============================================
CREATE TABLE IF NOT EXISTS public.programs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name_he VARCHAR(255) NOT NULL,
  name_en VARCHAR(255),
  slug VARCHAR(255) NOT NULL UNIQUE,
  description_he TEXT NOT NULL,
  description_en TEXT,
  features_he TEXT[],
  features_en TEXT[],
  price DECIMAL(10, 2),
  duration_days INTEGER,
  includes_whatsapp BOOLEAN DEFAULT false,
  image_url TEXT,
  icon_url TEXT,
  display_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for programs
CREATE INDEX IF NOT EXISTS idx_programs_slug ON public.programs(slug);
CREATE INDEX IF NOT EXISTS idx_programs_active ON public.programs(active, display_order);

-- Trigger for updated_at
CREATE TRIGGER update_programs_updated_at
  BEFORE UPDATE ON public.programs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RLS for programs
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read active programs
CREATE POLICY "Anyone can read active programs"
  ON public.programs
  FOR SELECT
  TO public
  USING (active = true);

-- Policy: Authenticated users can manage programs
CREATE POLICY "Authenticated users can manage programs"
  ON public.programs
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ============================================
-- 8. טבלת מנהלים (admin_users)
-- ============================================
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  full_name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'admin' CHECK (role IN ('admin', 'editor')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE,
  active BOOLEAN DEFAULT true
);

-- Indexes for admin_users
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON public.admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_users_active ON public.admin_users(active);

-- RLS for admin_users
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own admin profile"
  ON public.admin_users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- ============================================
-- 9. טבלת הערות ללידים (lead_notes)
-- ============================================
CREATE TABLE IF NOT EXISTS public.lead_notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE,
  admin_user_id UUID REFERENCES public.admin_users(id) ON DELETE SET NULL,
  note TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for lead_notes
CREATE INDEX IF NOT EXISTS idx_lead_notes_lead_id ON public.lead_notes(lead_id);
CREATE INDEX IF NOT EXISTS idx_lead_notes_created_at ON public.lead_notes(created_at DESC);

-- RLS for lead_notes
ALTER TABLE public.lead_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can manage lead notes"
  ON public.lead_notes
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ============================================
-- 10. טבלת המלצות (testimonials)
-- ============================================
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  testimonial_text TEXT NOT NULL,
  video_url TEXT,
  video_thumbnail_url TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published BOOLEAN DEFAULT true
);

-- Indexes for testimonials
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON public.testimonials(featured, display_order);
CREATE INDEX IF NOT EXISTS idx_testimonials_published ON public.testimonials(published);
CREATE INDEX IF NOT EXISTS idx_testimonials_created_at ON public.testimonials(created_at DESC);

-- RLS for testimonials
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read published testimonials
CREATE POLICY "Anyone can read published testimonials"
  ON public.testimonials
  FOR SELECT
  TO public
  USING (published = true);

-- Policy: Authenticated users can manage testimonials
CREATE POLICY "Authenticated users can manage testimonials"
  ON public.testimonials
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ============================================
-- Functions
-- ============================================

-- Function to search blog posts
CREATE OR REPLACE FUNCTION search_blog_posts(search_query TEXT)
RETURNS TABLE (
  id UUID,
  title_he VARCHAR,
  slug VARCHAR,
  excerpt_he TEXT,
  published_at TIMESTAMP WITH TIME ZONE,
  category_name VARCHAR
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    bp.id,
    bp.title_he,
    bp.slug,
    bp.excerpt_he,
    bp.published_at,
    bc.name_he as category_name
  FROM public.blog_posts bp
  LEFT JOIN public.blog_categories bc ON bp.category_id = bc.id
  WHERE 
    bp.published = true 
    AND bp.published_at <= NOW()
    AND (
      bp.title_he ILIKE '%' || search_query || '%'
      OR bp.content_he ILIKE '%' || search_query || '%'
      OR bp.excerpt_he ILIKE '%' || search_query || '%'
    )
  ORDER BY bp.published_at DESC;
END;
$$ LANGUAGE plpgsql;

-- Function to get posts by category
CREATE OR REPLACE FUNCTION get_posts_by_category(category_slug VARCHAR)
RETURNS TABLE (
  id UUID,
  title_he VARCHAR,
  slug VARCHAR,
  excerpt_he TEXT,
  featured_image_url TEXT,
  published_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    bp.id,
    bp.title_he,
    bp.slug,
    bp.excerpt_he,
    bp.featured_image_url,
    bp.published_at
  FROM public.blog_posts bp
  JOIN public.blog_categories bc ON bp.category_id = bc.id
  WHERE 
    bc.slug = category_slug
    AND bp.published = true
    AND bp.published_at <= NOW()
  ORDER BY bp.published_at DESC;
END;
$$ LANGUAGE plpgsql;

