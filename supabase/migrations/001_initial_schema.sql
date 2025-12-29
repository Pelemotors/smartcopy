-- Migration: Initial Schema for Sarit Hadar Premium Site + Backoffice Level 3
-- This migration creates all required tables according to the PRD

-- ============================================
-- RBAC: Roles & Permissions
-- ============================================

-- Roles table
CREATE TABLE IF NOT EXISTS roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) NOT NULL UNIQUE,
  display_name_he VARCHAR(100) NOT NULL,
  description_he TEXT,
  permissions JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User roles junction table
CREATE TABLE IF NOT EXISTS user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, role_id)
);

-- Upgrade admin_users table to support roles
ALTER TABLE IF EXISTS admin_users 
ADD COLUMN IF NOT EXISTS role_id UUID REFERENCES roles(id);

-- ============================================
-- CMS: Pages & Blocks
-- ============================================

-- Block types
CREATE TABLE IF NOT EXISTS block_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) NOT NULL UNIQUE,
  display_name_he VARCHAR(100) NOT NULL,
  description_he TEXT,
  schema JSONB NOT NULL, -- JSON schema for block data
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Pages
CREATE TABLE IF NOT EXISTS pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) NOT NULL UNIQUE,
  title_he VARCHAR(255) NOT NULL,
  meta_title_he VARCHAR(255),
  meta_description_he TEXT,
  meta_keywords_he TEXT,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMPTZ,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Page blocks
CREATE TABLE IF NOT EXISTS page_blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  block_type_id UUID NOT NULL REFERENCES block_types(id),
  order_index INTEGER NOT NULL DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  data JSONB NOT NULL DEFAULT '{}'::jsonb, -- Block-specific data
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Block versions for versioning
CREATE TABLE IF NOT EXISTS block_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  block_id UUID NOT NULL REFERENCES page_blocks(id) ON DELETE CASCADE,
  version_number INTEGER NOT NULL,
  data JSONB NOT NULL,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(block_id, version_number)
);

-- ============================================
-- Media Library
-- ============================================

-- Media assets
CREATE TABLE IF NOT EXISTS media_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename VARCHAR(255) NOT NULL,
  original_filename VARCHAR(255) NOT NULL,
  file_path TEXT NOT NULL,
  file_size BIGINT,
  mime_type VARCHAR(100),
  alt_text_he TEXT,
  tags TEXT[],
  folder VARCHAR(255),
  category VARCHAR(100),
  width INTEGER,
  height INTEGER,
  thumbnail_path TEXT,
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Media references (to prevent deletion of assets in use)
CREATE TABLE IF NOT EXISTS media_references (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  media_id UUID NOT NULL REFERENCES media_assets(id) ON DELETE CASCADE,
  entity_type VARCHAR(50) NOT NULL, -- 'page_block', 'portfolio_item', etc.
  entity_id UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Portfolio
-- ============================================

-- Portfolio categories
CREATE TABLE IF NOT EXISTS portfolio_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_he VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description_he TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Portfolio items
CREATE TABLE IF NOT EXISTS portfolio_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_he VARCHAR(255) NOT NULL,
  category_id UUID REFERENCES portfolio_categories(id),
  niche VARCHAR(100),
  challenge_he TEXT,
  solution_he TEXT,
  outcome_he TEXT,
  before_text_he TEXT,
  after_text_he TEXT,
  before_image_id UUID REFERENCES media_assets(id),
  after_image_id UUID REFERENCES media_assets(id),
  testimonial_id UUID REFERENCES testimonials(id),
  is_anonymous BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Leads CRM (Enhanced)
-- ============================================

-- Upgrade existing leads table
ALTER TABLE IF EXISTS leads
ADD COLUMN IF NOT EXISTS email VARCHAR(255),
ADD COLUMN IF NOT EXISTS service_requested VARCHAR(100),
ADD COLUMN IF NOT EXISTS budget VARCHAR(50),
ADD COLUMN IF NOT EXISTS deadline DATE,
ADD COLUMN IF NOT EXISTS utm_source VARCHAR(255),
ADD COLUMN IF NOT EXISTS utm_medium VARCHAR(255),
ADD COLUMN IF NOT EXISTS utm_campaign VARCHAR(255),
ADD COLUMN IF NOT EXISTS referrer TEXT,
ADD COLUMN IF NOT EXISTS landing_page TEXT,
ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'waiting_for_client', 'closed', 'not_relevant'));

-- Lead events (timeline)
CREATE TABLE IF NOT EXISTS lead_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  event_type VARCHAR(50) NOT NULL, -- 'created', 'status_changed', 'note_added', 'task_added', etc.
  description_he TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Lead notes
CREATE TABLE IF NOT EXISTS lead_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  note_he TEXT NOT NULL,
  is_internal BOOLEAN DEFAULT true,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Lead tags
CREATE TABLE IF NOT EXISTS lead_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  tag VARCHAR(50) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(lead_id, tag)
);

-- Lead tasks
CREATE TABLE IF NOT EXISTS lead_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  title_he VARCHAR(255) NOT NULL,
  description_he TEXT,
  due_date TIMESTAMPTZ,
  is_completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  assigned_to UUID REFERENCES auth.users(id),
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Analytics
-- ============================================

-- Sessions
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id VARCHAR(255) NOT NULL UNIQUE,
  user_agent TEXT,
  ip_address INET,
  referrer TEXT,
  utm_source VARCHAR(255),
  utm_medium VARCHAR(255),
  utm_campaign VARCHAR(255),
  landing_page TEXT,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  last_activity_at TIMESTAMPTZ DEFAULT NOW()
);

-- Analytics events
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions(id),
  event_type VARCHAR(50) NOT NULL, -- 'page_view', 'cta_whatsapp_click', 'quick_audit_submit', 'lead_form_submit', 'contact_form_submit'
  page_path TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Content: FAQs, Services, Testimonials
-- ============================================

-- FAQs
CREATE TABLE IF NOT EXISTS faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_he TEXT NOT NULL,
  answer_he TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Services
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_he VARCHAR(255) NOT NULL,
  description_he TEXT,
  icon VARCHAR(100),
  order_index INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Testimonials (if not exists)
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_he VARCHAR(255),
  text_he TEXT NOT NULL,
  role_he VARCHAR(255),
  company_he VARCHAR(255),
  image_id UUID REFERENCES media_assets(id),
  is_featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Settings
-- ============================================

CREATE TABLE IF NOT EXISTS settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key VARCHAR(100) NOT NULL UNIQUE,
  value JSONB NOT NULL,
  description_he TEXT,
  updated_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Audit Logs
-- ============================================

CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50) NOT NULL,
  entity_id UUID,
  before_data JSONB,
  after_data JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Indexes for Performance
-- ============================================

-- Pages
CREATE INDEX IF NOT EXISTS idx_pages_slug ON pages(slug);
CREATE INDEX IF NOT EXISTS idx_pages_status ON pages(status);

-- Page blocks
CREATE INDEX IF NOT EXISTS idx_page_blocks_page_id ON page_blocks(page_id);
CREATE INDEX IF NOT EXISTS idx_page_blocks_order ON page_blocks(page_id, order_index);

-- Media
CREATE INDEX IF NOT EXISTS idx_media_assets_tags ON media_assets USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_media_references_media_id ON media_references(media_id);
CREATE INDEX IF NOT EXISTS idx_media_references_entity ON media_references(entity_type, entity_id);

-- Portfolio
CREATE INDEX IF NOT EXISTS idx_portfolio_items_category ON portfolio_items(category_id);
CREATE INDEX IF NOT EXISTS idx_portfolio_items_published ON portfolio_items(is_published);

-- Leads
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
CREATE INDEX IF NOT EXISTS idx_lead_events_lead_id ON lead_events(lead_id);
CREATE INDEX IF NOT EXISTS idx_lead_notes_lead_id ON lead_notes(lead_id);
CREATE INDEX IF NOT EXISTS idx_lead_tags_lead_id ON lead_tags(lead_id);
CREATE INDEX IF NOT EXISTS idx_lead_tasks_lead_id ON lead_tasks(lead_id);

-- Analytics
CREATE INDEX IF NOT EXISTS idx_analytics_events_session ON analytics_events(session_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created ON analytics_events(created_at);

-- Audit logs
CREATE INDEX IF NOT EXISTS idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created ON audit_logs(created_at);

-- ============================================
-- Seed Data: Roles
-- ============================================

INSERT INTO roles (name, display_name_he, description_he, permissions) VALUES
('owner', 'בעלים/מנהל', 'גישה מלאה לכל הפונקציות', '{"all": true}'::jsonb),
('editor', 'עורך', 'ניהול תכנים, מדיה ותיק עבודות', '{"content": true, "media": true, "portfolio": true}'::jsonb),
('sales', 'מכירות/לידים', 'ניהול לידים בלבד', '{"leads": true}'::jsonb),
('viewer', 'צופה', 'צפייה בלבד', '{"read": true}'::jsonb)
ON CONFLICT (name) DO NOTHING;

-- ============================================
-- Seed Data: Block Types
-- ============================================

INSERT INTO block_types (name, display_name_he, description_he, schema) VALUES
('hero', 'Hero', 'בלוק פתיחה ראשי', '{"title": "string", "subtitle": "string", "cta_primary": "string", "cta_secondary": "string", "image_id": "uuid"}'::jsonb),
('text_bullets', 'טקסט + בולטים', 'טקסט עם רשימת בולטים', '{"title": "string", "text": "string", "bullets": "array"}'::jsonb),
('cards', 'כרטיסים', 'כרטיסי שירותים/יתרונות', '{"title": "string", "subtitle": "string", "cards": "array"}'::jsonb),
('before_after', 'לפני/אחרי', 'השוואת לפני ואחרי', '{"title": "string", "before": "string", "after": "string", "image_before_id": "uuid", "image_after_id": "uuid"}'::jsonb),
('testimonials', 'המלצות', 'בלוק המלצות', '{"title": "string", "testimonial_ids": "array"}'::jsonb),
('faq', 'שאלות נפוצות', 'בלוק FAQ', '{"title": "string", "faq_ids": "array"}'::jsonb),
('cta_banner', 'CTA Banner', 'באנר קריאה לפעולה', '{"text": "string", "button_text": "string", "button_link": "string"}'::jsonb),
('portfolio_grid', 'תיק עבודות', 'גריד תיק עבודות', '{"title": "string", "category_id": "uuid", "limit": "number"}'::jsonb),
('form_embed', 'טופס', 'הטמעת טופס', '{"form_type": "string", "form_id": "uuid"}'::jsonb),
('video', 'וידאו', 'בלוק וידאו', '{"title": "string", "video_url": "string", "thumbnail_id": "uuid"}'::jsonb),
('metrics', 'מדדים', 'בלוק מדדים/מספרים', '{"title": "string", "metrics": "array"}'::jsonb)
ON CONFLICT (name) DO NOTHING;

-- ============================================
-- Seed Data: Portfolio Categories
-- ============================================

INSERT INTO portfolio_categories (name_he, slug, description_he, order_index) VALUES
('דפי נחיתה', 'landing-pages', 'דפי נחיתה מותאמים אישית', 1),
('תוכן לאתרים', 'website-content', 'תוכן מלא לאתרים', 2),
('מודעות', 'ads', 'מודעות וקמפיינים', 3),
('עריכת לשון', 'editing', 'עריכת לשון וליטוש', 4)
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- Seed Data: Settings
-- ============================================

INSERT INTO settings (key, value, description_he) VALUES
('business_name', '"Sarit Hadar"'::jsonb, 'שם העסק'),
('business_phone', '""'::jsonb, 'טלפון'),
('business_email', '""'::jsonb, 'אימייל'),
('whatsapp_number', '""'::jsonb, 'מספר WhatsApp'),
('whatsapp_message', '""'::jsonb, 'הודעת פתיחה ל-WhatsApp'),
('seo_default_title', '""'::jsonb, 'כותרת SEO ברירת מחדל'),
('seo_default_description', '""'::jsonb, 'תיאור SEO ברירת מחדל'),
('og_image_id', 'null'::jsonb, 'תמונת OG ברירת מחדל')
ON CONFLICT (key) DO NOTHING;

