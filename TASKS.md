# רשימת משימות - אתר יועצת שינה "ליאור"

## סטטוס כללי
- [ ] Phase 0 - תשתית והכנות
- [ ] Phase 1 - אפיון UX + היררכיית תוכן
- [ ] Phase 2 - עיצוב פרימיום
- [ ] Phase 3 - פיתוח
- [ ] Phase 4 - QA + השקה
- [ ] Phase 5 - לאחר השקה

---

## Phase 0 — תשתית והכנות (יום 0–1)

### 0.1 איסוף חומרים
- [ ] קבלת לוגו/שם מותג סופי
- [ ] איסוף תמונות מקצועיות (Headshots)
- [ ] איסוף תמונות אווירה (איורים/אייקונים)
- [ ] איסוף 15–25 המלצות כתובות
- [ ] איסוף 3 המלצות וידאו קצרות
- [ ] איסוף תעודות/הכשרות
- [ ] ניסוח סופי של "השיטה" (לילה טוב)
- [ ] איסוף פרטי יצירת קשר (טלפון, מייל, וואטסאפ)

### 0.2 החלטות מוצר
- [ ] אישור Sitemap סופי (12 דפים ציבוריים + 9 דפי admin, כולל עמוד Assessment)
- [ ] החלטה על כלי קביעת שיחה (Calendly/Google Calendar)
- [ ] הגדרת יעד CTA הראשי
- [ ] אישור פלטת צבעים
- [ ] החלטה על כלי שמירת לידים (Supabase/Google Sheet)
- [ ] החלטה על כלי שליחת מייל (Resend/SMTP)
- [ ] אישור מבנה השאלון (7 שאלות + 3 פרופילי תוצאה)

### 0.3 חיבורים והגדרות
- [ ] קבלת גישה לדומיין (DNS)
- [ ] קבלת גישה לאחסון (או החלטה על Vercel)
- [ ] יצירת GA4 property + קבלת Measurement ID
- [ ] יצירת Meta Pixel + קבלת Pixel ID
- [ ] יצירת Calendly account + קבלת URL
- [ ] יצירת Supabase project (אם נבחר)
- [ ] הגדרת משתמש מנהל ראשוני (מייל + סיסמה)

---

## Phase 1 — אפיון UX + היררכיית תוכן (יום 1–2)

### 1.1 Sitemap + מסלול משתמש
- [ ] יצירת מפת אתר סופית (12 דפים ציבוריים, כולל Assessment)
- [ ] יצירת מפת אתר לממשק מנהל (9 דפים)
- [ ] תיעוד User Flow: הורה שמחפש מידע → בלוג → טופס
- [ ] תיעוד User Flow: הורה שממהר → וואטסאפ
- [ ] תיעוד User Flow: הורה שמתלבט → קביעת שיחה
- [ ] תיעוד Admin Flow: התחברות → Dashboard → ניהול תוכן

### 1.2 Wireframe (שלד)
- [ ] Wireframe למובייל - עמוד Home
- [ ] Wireframe למובייל - עמוד About
- [ ] Wireframe למובייל - עמוד Method
- [ ] Wireframe למובייל - עמוד Programs
- [ ] Wireframe למובייל - עמוד Testimonials
- [ ] Wireframe למובייל - עמוד Blog List
- [ ] Wireframe למובייל - עמוד Blog Post
- [ ] Wireframe למובייל - עמוד Contact
- [ ] Wireframe למובייל - עמוד Assessment (שאלון)
- [ ] Wireframe למובייל - ממשק מנהל (Dashboard)
- [ ] Wireframe לטאבלט - כל העמודים
- [ ] Wireframe לדסקטופ - כל העמודים
- [ ] Focus על Hero section, CTA buttons, Navigation

### 1.3 כתיבת מיקרו־קופי
- [ ] כתיבת טקסטים לכפתורי CTA:
  - [ ] "בואי נדבר 10 דקות ונראה אם זה מתאים"
  - [ ] "קבעי שיחת אבחון חינם"
  - [ ] "בואי נדבר בוואטסאפ"
- [ ] כתיבת labels לטפסים (שם, טלפון, גיל הילד, הודעה)
- [ ] כתיבת placeholders לטפסים
- [ ] כתיבת הודעות שגיאה (ולידציה)
- [ ] כתיבת הודעות הצלחה
- [ ] כתיבת Navigation items (עברית)
- [ ] כתיבת Footer content

### 1.4 תכנון בלוג
- [ ] הגדרת קטגוריות: התעוררויות, הרדמות, גמילה, שינה רציפה
- [ ] יצירת רשימת תגיות ראשונית
- [ ] תכנון תבנית מאמר (structure):
  - [ ] כותרת
  - [ ] תקציר
  - [ ] תוכן (עם אפשרות לכותרות, רשימות, תמונות)
  - [ ] תמונה ראשית
  - [ ] SEO fields
- [ ] תכנון FAQ sections (אם רלוונטי)

---

## Phase 2 — עיצוב פרימיום (יום 2–4)

### 2.1 Design Tokens
- [ ] הגדרת פלטת צבעים:
  - [ ] תכלת רך (#A8D8EA)
  - [ ] לילך (#CDB4DB)
  - [ ] ורוד בהיר (#F7CAD0)
  - [ ] רקע שמנת (#F9F7F3)
  - [ ] טקסט אפור כהה (#4A4A4A)
- [ ] הגדרת Spacing Scale (מרווחים)
- [ ] הגדרת Border Radius Scale
- [ ] הגדרת Shadows (צללים)
- [ ] בחירת/יצירת SVG Icons Library (ירח, עננים, לבבות)
- [ ] יצירת Design System File (CSS Variables / Tailwind Config)

### 2.2 רכיבי UI
- [ ] עיצוב כפתור Primary
- [ ] עיצוב כפתור Secondary
- [ ] עיצוב כפתור WhatsApp (sticky)
- [ ] עיצוב כרטיס מסלול (Program card)
- [ ] עיצוב FAQ Accordion
- [ ] עיצוב Testimonial Card (כתוב)
- [ ] עיצוב Testimonial Card (וידאו)
- [ ] עיצוב Footer
- [ ] עיצוב Navigation (Desktop)
- [ ] עיצוב Navigation (Mobile - Hamburger menu)
- [ ] עיצוב Form Inputs
- [ ] עיצוב Form Buttons
- [ ] עיצוב Loading States
- [ ] עיצוב Error States

### 2.3 עיצוב מסכים
- [ ] עיצוב עמוד Home:
  - [ ] Hero Section
  - [ ] About Preview
  - [ ] Method Preview
  - [ ] Programs Section
  - [ ] Testimonials Section
  - [ ] CTA Section
- [ ] עיצוב עמוד About
- [ ] עיצוב עמוד Method ("לילה טוב")
- [ ] עיצוב עמוד Programs/Packages
- [ ] עיצוב עמוד Testimonials
- [ ] עיצוב עמוד Blog List
- [ ] עיצוב עמוד Blog Post
- [ ] עיצוב עמוד Contact
- [ ] עיצוב עמוד Assessment (שאלון):
  - [ ] מסך שאלות (progress bar, כפתורי תשובה)
  - [ ] מסך תוצאה (3 פרופילים שונים)
- [ ] עיצוב עמוד Privacy Policy
- [ ] עיצוב עמוד Terms
- [ ] עיצוב עמוד Accessibility Statement
- [ ] עיצוב ממשק מנהל - Login
- [ ] עיצוב ממשק מנהל - Dashboard
- [ ] עיצוב ממשק מנהל - ניהול לידים
- [ ] עיצוב ממשק מנהל - ניהול בלוג
- [ ] עיצוב ממשק מנהל - ניהול המלצות
- [ ] עיצוב ממשק מנהל - ניהול מסלולים

### 2.4 בדיקת נגישות
- [ ] בדיקת קונטרסט צבעים (WCAG AA)
- [ ] בדיקת קריאות פונטים
- [ ] עיצוב Focus States לכל האלמנטים האינטראקטיביים
- [ ] בדיקת ניווט מקלדת
- [ ] הוספת ARIA labels
- [ ] בדיקת Screen Reader (אם אפשר)
- [ ] תיקונים לפי ממצאי הנגישות

---

## Phase 3 — פיתוח (יום 4–9)

### 3.1 הקמת פרויקט
- [ ] יצירת Next.js 14+ project (App Router)
- [ ] הגדרת TypeScript
- [ ] התקנת והגדרת Tailwind CSS
- [ ] הגדרת RTL support (rtlcss / next-intl)
- [ ] התקנת ESLint + Prettier
- [ ] הגדרת Git repository
- [ ] יצירת .gitignore
- [ ] יצירת .env.example
- [ ] הגדרת package.json scripts

### 3.2 בניית קומפוננטות בסיס
- [ ] יצירת Layout Component (Header + Footer)
- [ ] יצירת Header Component:
  - [ ] Logo
  - [ ] Navigation (Desktop)
  - [ ] Navigation (Mobile - Hamburger)
  - [ ] CTA Button
- [ ] יצירת Footer Component:
  - [ ] Links
  - [ ] Contact Info
  - [ ] Social Media (אם רלוונטי)
- [ ] יצירת Sticky WhatsApp Button Component
- [ ] יצירת Sticky CTA Button Component
- [ ] יצירת Design System Components:
  - [ ] Button (Primary, Secondary)
  - [ ] Input
  - [ ] Textarea
  - [ ] Card
  - [ ] Badge
  - [ ] Loading Spinner

### 3.3 בניית עמודים ציבוריים
- [ ] עמוד Home:
  - [ ] Hero Section
  - [ ] About Preview Section
  - [ ] Method Preview Section
  - [ ] Programs Section
  - [ ] Testimonials Section
  - [ ] CTA Section
  - [ ] SEO Metadata
- [ ] עמוד About:
  - [ ] תוכן אודות ליאור
  - [ ] תמונות
  - [ ] SEO Metadata
- [ ] עמוד Method ("לילה טוב"):
  - [ ] הסבר על השיטה
  - [ ] תמונות/איורים
  - [ ] SEO Metadata
- [ ] עמוד Programs:
  - [ ] רשימת מסלולים (דינמי מ-DB)
  - [ ] כרטיסי מסלול
  - [ ] SEO Metadata
- [ ] עמוד Testimonials:
  - [ ] רשימת המלצות (דינמי מ-DB)
  - [ ] תצוגת המלצות כתובות
  - [ ] תצוגת המלצות וידאו
  - [ ] SEO Metadata
- [ ] עמוד Blog List:
  - [ ] רשימת מאמרים (דינמי מ-DB)
  - [ ] חיפוש מאמרים
  - [ ] סינון לפי קטגוריה
  - [ ] סינון לפי תגיות
  - [ ] Pagination
  - [ ] SEO Metadata
- [ ] עמוד Blog Post (Dynamic):
  - [ ] תוכן מאמר מלא
  - [ ] תמונה ראשית
  - [ ] TOC (תוכן עניינים) - אם מאמר ארוך
  - [ ] שיתוף חברתי
  - [ ] מאמרים קשורים
  - [ ] SEO Metadata (דינמי)
- [ ] עמוד Contact:
  - [ ] טופס יצירת קשר
  - [ ] ולידציה client-side
  - [ ] הודעת הצלחה
  - [ ] CTA לוואטסאפ
  - [ ] SEO Metadata
- [ ] עמוד Assessment (שאלון בדיקת מצב שינה):
  - [ ] קומפוננטת SleepAssessmentQuiz (ראשי)
  - [ ] קומפוננטת QuizQuestion (תצוגת שאלה)
  - [ ] קומפוננטת QuizResult (תצוגת תוצאה)
  - [ ] קובץ quizData.ts עם:
    - [ ] שאלה 1: גיל הילד (4 אפשרויות, ללא ניקוד)
    - [ ] שאלה 2: זמן ההירדמות (4 אפשרויות, ניקוד 0-3)
    - [ ] שאלה 3: מספר התעוררויות (4 אפשרויות, ניקוד 0-3)
    - [ ] שאלה 4: אופן החזרה לשינה (4 אפשרויות, ניקוד 0-3)
    - [ ] שאלה 5: השפעה על ההורים (4 אפשרויות, ניקוד 0-3)
    - [ ] שאלה 6: מה כבר ניסיתם (4 אפשרויות, ניקוד 1-3)
    - [ ] שאלה 7: מוכנות לשינוי (4 אפשרויות, ניקוד 0-3)
    - [ ] Scoring map: Tier 1 (0-5 נק'), Tier 2 (6-12 נק'), Tier 3 (13+ נק')
    - [ ] טקסטים לכל תוצאה (Title, Summary, CTA)
    - [ ] טקסטי WhatsApp מותאמים לפי tier
  - [ ] Progress bar: "שאלה X מתוך 7"
  - [ ] לוגיקת חישוב score (רק שאלות 2-7)
  - [ ] לוגיקת קביעת tier (1/2/3)
  - [ ] מסך תוצאה עם 3 פרופילים (Tier 1/2/3):
    - [ ] Tier 1: "המצב יחסית מאוזן, נדרשות התאמות קלות"
    - [ ] Tier 2: "יש אתגרים משמעותיים אבל ניתנים לפתרון"
    - [ ] Tier 3: "עומס גבוה מאוד – מומלץ ליווי צמוד"
  - [ ] CTA מותאם לפי tier (WhatsApp + Call/Booking)
  - [ ] שימור progress ב-localStorage (אופציונלי)
  - [ ] Analytics events integration
  - [ ] SEO Metadata
- [ ] עמוד Privacy Policy
- [ ] עמוד Terms
- [ ] עמוד Accessibility Statement

### 3.4 טופס לידים + API
- [ ] יצירת API Route: `/api/leads`
- [ ] ולידציה server-side:
  - [ ] בדיקת שדות חובה
  - [ ] בדיקת פורמט טלפון
  - [ ] Sanitization של הקלט
- [ ] תמיכה בשני מקורות:
  - [ ] `source: "contact_form"` - מטופס יצירת קשר
  - [ ] `source: "sleep_quiz"` - משאלון בדיקת שינה
  - [ ] שדות נוספים לשאלון: `quiz_score`, `quiz_tier`
- [ ] אנטי־ספאם:
  - [ ] Honeypot field
  - [ ] Rate limiting (3 בקשות לדקה)
  - [ ] אופציונלי: Cloudflare Turnstile
- [ ] שליחה למייל:
  - [ ] הגדרת Resend/SMTP
  - [ ] יצירת Email Template (HTML)
  - [ ] שליחה ל-easydevil227@gmail.com
- [ ] שמירה ב-DB:
  - [ ] שמירה ב-Supabase (טבלת leads)
  - [ ] שמירת IP address
  - [ ] שמירת User Agent
- [ ] הודעת הצלחה + CTA לוואטסאפ

### 3.4.1 API Route לתשובות שאלון (אופציונלי)
- [ ] יצירת API Route: `/api/quiz-responses`
- [ ] ולידציה של lead_id
- [ ] שמירת תשובות גולמיות ב-Supabase (טבלת quiz_responses)
- [ ] תמיכה במערך תשובות (question_index, answer_value, answer_score)

### 3.5 Calendly Integration
- [ ] יצירת עמוד ייעודי ל-Calendly
- [ ] Embed של Calendly
- [ ] הוספת CTA ברחבי האתר (קישור ל-Calendly)
- [ ] מעקב אירועים: `book_call_click` (GA4 + Meta Pixel)

### 3.6 SEO מלא
- [ ] Metadata לכל דף ציבורי:
  - [ ] Title
  - [ ] Description
  - [ ] OG Tags
  - [ ] Twitter Cards
  - [ ] Canonical URLs
- [ ] יצירת `sitemap.xml` (דינמי):
  - [ ] כל הדפים הסטטיים
  - [ ] כל המאמרים שפורסמו
- [ ] יצירת `robots.txt`
- [ ] Schema.org:
  - [ ] ProfessionalService/LocalBusiness (עמוד Home/About)
  - [ ] FAQ Schema (אזורי FAQ)
  - [ ] Article Schema (כל פוסט בבלוג)
  - [ ] Person Schema (עמוד About)

### 3.7 ביצועים
- [ ] Image Optimization:
  - [ ] שימוש ב-Next.js Image component
  - [ ] הגדרת sizes ו-quality
- [ ] Lazy Loading:
  - [ ] תמונות
  - [ ] קומפוננטות כבדות
- [ ] Code Splitting:
  - [ ] Dynamic imports
  - [ ] Lazy loading של קומפוננטות
- [ ] Lighthouse Optimization:
  - [ ] בדיקת Lighthouse
  - [ ] תיקון בעיות Performance
  - [ ] השגת 90+ במובייל

### 3.8 ממשק מנהל (Admin Panel)

#### 3.8.1 Authentication & Security
- [ ] הגדרת Supabase Auth
- [ ] יצירת Login Page (`/admin/login`)
- [ ] יצירת Logout functionality
- [ ] יצירת Middleware לבדיקת auth על `/admin/*`
- [ ] הגדרת Role-based access control (RBAC)
- [ ] CSRF protection
- [ ] Rate limiting על API routes

#### 3.8.2 Dashboard
- [ ] יצירת Dashboard Page (`/admin/dashboard`)
- [ ] סטטיסטיקות כלליות:
  - [ ] כמות לידים חדשים (היום, השבוע, החודש)
  - [ ] כמות לידים לפי סטטוס
  - [ ] גרף לידים לפי זמן (Chart.js / Recharts)
  - [ ] כמות מאמרים שפורסמו
  - [ ] כמות המלצות פעילות
- [ ] רשימת 10 הלידים האחרונים
- [ ] רשימת 5 המאמרים האחרונים

#### 3.8.3 ניהול לידים
- [ ] יצירת Leads Page (`/admin/leads`)
- [ ] רשימת לידים:
  - [ ] טבלה עם: שם, טלפון, גיל הילד, תאריך, סטטוס
  - [ ] סינון לפי סטטוס
  - [ ] חיפוש לפי שם/טלפון
  - [ ] מיון לפי תאריך
  - [ ] Pagination
- [ ] תצוגת ליד (Modal או Page):
  - [ ] כל הפרטים
  - [ ] IP address
  - [ ] תאריך יצירה
  - [ ] שינוי סטטוס (dropdown)
  - [ ] הערות פנימיות
- [ ] פעולות:
  - [ ] עדכון סטטוס (API)
  - [ ] מחיקה (soft delete)
  - [ ] ייצוא ל-CSV/Excel
  - [ ] אופציונלי: שליחת מייל ישירה

#### 3.8.4 ניהול בלוג
- [ ] יצירת Blog Management Page (`/admin/blog`)
- [ ] רשימת מאמרים:
  - [ ] טבלה עם: כותרת, קטגוריה, תאריך פרסום, סטטוס
  - [ ] סינון לפי קטגוריה/סטטוס
  - [ ] חיפוש לפי כותרת/תוכן
  - [ ] Pagination
- [ ] יצירת מאמר חדש (`/admin/blog/new`):
  - [ ] Form עם כל השדות
  - [ ] Rich Text Editor (Tiptap/React Quill)
  - [ ] בחירת קטגוריה
  - [ ] הוספת תגיות (multi-select)
  - [ ] Upload תמונה ראשית
  - [ ] SEO fields (meta title, description, keywords)
  - [ ] תאריך פרסום (scheduling)
  - [ ] סטטוס: טיוטה/פורסם
  - [ ] תצוגה מקדימה
  - [ ] שמירה (API)
- [ ] עריכת מאמר (`/admin/blog/[id]/edit`):
  - [ ] טעינת נתוני המאמר
  - [ ] Form עם כל השדות
  - [ ] עדכון (API)
  - [ ] מחיקה (API)
- [ ] ניהול קטגוריות:
  - [ ] יצירה/עריכה/מחיקה של קטגוריות
  - [ ] API routes
- [ ] ניהול תגיות:
  - [ ] יצירה/עריכה/מחיקה של תגיות
  - [ ] API routes

#### 3.8.5 ניהול המלצות
- [ ] יצירת Testimonials Page (`/admin/testimonials`)
- [ ] רשימת המלצות:
  - [ ] טבלה עם: שם, גיל הילד, דירוג, מומלץ, תאריך
  - [ ] סינון לפי מומלץ/לא מומלץ
  - [ ] Pagination
- [ ] יצירת/עריכת המלצה:
  - [ ] Form עם כל השדות
  - [ ] קישור לוידאו (YouTube/Vimeo)
  - [ ] Upload תמונת תצוגה מקדימה
  - [ ] דירוג (1-5 כוכבים)
  - [ ] סטטוס מומלץ (featured)
  - [ ] סדר תצוגה (display_order)
  - [ ] סטטוס פרסום
  - [ ] שמירה/עדכון (API)
- [ ] מחיקת המלצה (API)

#### 3.8.6 ניהול מסלולים
- [ ] יצירת Programs Page (`/admin/programs`)
- [ ] רשימת מסלולים:
  - [ ] טבלה עם: שם, תיאור קצר, מחיר, סטטוס
  - [ ] Pagination
- [ ] יצירת/עריכת מסלול:
  - [ ] Form עם כל השדות
  - [ ] שם (עברית + אנגלית)
  - [ ] תיאור מלא
  - [ ] תכונות (features list - array)
  - [ ] מחיר (אופציונלי)
  - [ ] משך (14/30 ימים)
  - [ ] כולל וואטסאפ (checkbox)
  - [ ] Upload תמונה/אייקון
  - [ ] סדר תצוגה
  - [ ] סטטוס פעיל/לא פעיל
  - [ ] שמירה/עדכון (API)
- [ ] מחיקת מסלול (API)

#### 3.8.7 הגדרות
- [ ] יצירת Settings Page (`/admin/settings`)
- [ ] הגדרות כלליות:
  - [ ] פרטי יצירת קשר (טלפון, מייל, וואטסאפ)
  - [ ] קישור Calendly
  - [ ] הגדרות SEO כלליות
  - [ ] שמירה (API)
- [ ] ניהול משתמשים (אם יש מספר מנהלים):
  - [ ] רשימת מנהלים
  - [ ] הוספת מנהל חדש
  - [ ] הסרת מנהל
  - [ ] שינוי הרשאות (role)

### 3.9 אנליטיקס
- [ ] הגדרת GA4:
  - [ ] התקנת gtag
  - [ ] Events tracking:
    - [ ] `whatsapp_click`
    - [ ] `book_call_click`
    - [ ] `form_submit_success`
    - [ ] `sleep_quiz_started`
    - [ ] `sleep_quiz_question_answered` (שולח questionIndex)
    - [ ] `sleep_quiz_completed`
    - [ ] `sleep_quiz_result_tier_1/2/3`
    - [ ] `sleep_quiz_cta_whatsapp`
    - [ ] `sleep_quiz_cta_call`
    - [ ] `lead_created`
  - [ ] רק בדפים ציבוריים (לא ב-admin)
- [ ] הגדרת Meta Pixel:
  - [ ] התקנת Pixel
  - [ ] Events tracking (אותם אירועים)
- [ ] בדיקת Events ב-GA4 ו-Meta Pixel

### 3.10 דאטא בייס (Supabase)
- [ ] הרצת SQL Scripts ליצירת כל הטבלאות:
  - [ ] leads (עם שדות: source, quiz_score, quiz_tier)
  - [ ] quiz_responses (אופציונלי - לשמירת תשובות מלאות)
  - [ ] blog_categories
  - [ ] blog_tags
  - [ ] blog_posts
  - [ ] blog_post_tags
  - [ ] programs
  - [ ] admin_users
  - [ ] lead_notes
  - [ ] testimonials
- [ ] הגדרת RLS Policies:
  - [ ] leads - רק service role יכול לכתוב, רק authenticated לקרוא
  - [ ] quiz_responses - רק service role יכול לכתוב, רק authenticated לקרוא
  - [ ] שאר הטבלאות לפי הצורך
- [ ] יצירת Indexes
- [ ] יצירת Triggers
- [ ] יצירת Functions (search_blog_posts, get_posts_by_category)
- [ ] הכנסת קטגוריות בסיסיות
- [ ] יצירת משתמש מנהל ראשוני
- [ ] הגדרת Service Role Key ב-ENV (רק בצד השרת!)
- [ ] יצירת `/lib/supabaseServerClient.ts` לשימוש ב-service role

---

## Phase 4 — QA + השקה (יום 9–10)

### 4.1 בדיקות מובייל
- [ ] בדיקה ב-iPhone (Safari):
  - [ ] כל העמודים הציבוריים
  - [ ] ממשק מנהל
  - [ ] טפסים
  - [ ] ניווט
- [ ] בדיקה ב-Android (Chrome):
  - [ ] כל העמודים הציבוריים
  - [ ] ממשק מנהל
  - [ ] טפסים
  - [ ] ניווט
- [ ] בדיקה בטאבלט:
  - [ ] כל העמודים
  - [ ] Responsive design
- [ ] בדיקה בדפדפנים:
  - [ ] Chrome
  - [ ] Firefox
  - [ ] Safari
  - [ ] Edge

### 4.2 בדיקות פונקציונליות
- [ ] בדיקת טופס יצירת קשר:
  - [ ] ולידציה client-side
  - [ ] ולידציה server-side
  - [ ] שליחה מוצלחת
  - [ ] הודעת הצלחה
  - [ ] CTA לוואטסאפ
  - [ ] שמירה ב-DB
  - [ ] שליחה למייל
  - [ ] Rate limiting
  - [ ] Honeypot
- [ ] בדיקת שאלון בדיקת שינה:
  - [ ] התחלת השאלון (progress bar "שאלה X מתוך 7")
  - [ ] מעבר בין שאלות (7 שאלות)
  - [ ] שאלה 1: גיל הילד (4 אפשרויות, ללא ניקוד)
  - [ ] שאלה 2: זמן ההירדמות (4 אפשרויות, ניקוד 0-3)
  - [ ] שאלה 3: מספר התעוררויות (4 אפשרויות, ניקוד 0-3)
  - [ ] שאלה 4: אופן החזרה לשינה (4 אפשרויות, ניקוד 0-3)
  - [ ] שאלה 5: השפעה על ההורים (4 אפשרויות, ניקוד 0-3)
  - [ ] שאלה 6: מה כבר ניסיתם (4 אפשרויות, ניקוד 1-3)
  - [ ] שאלה 7: מוכנות לשינוי (4 אפשרויות, ניקוד 0-3)
  - [ ] חישוב score נכון (רק שאלות 2-7, טווח 0-18)
  - [ ] קביעת tier נכון (Tier 1: 0-5, Tier 2: 6-12, Tier 3: 13+)
  - [ ] הצגת תוצאה לפי tier (1/2/3) עם הטקסטים המדויקים
  - [ ] CTA מותאם לפי tier (WhatsApp + Call)
  - [ ] טקסטי WhatsApp מותאמים לפי tier
  - [ ] שמירת ליד ב-DB עם source="sleep_quiz", quiz_score, quiz_tier
  - [ ] שמירת תשובות מלאות (אם נבחר) ב-quiz_responses
  - [ ] Analytics events (started, question_answered, completed, tier_1/2/3, cta_whatsapp, cta_call)
  - [ ] שימור progress ב-localStorage (אם נבחר)
- [ ] בדיקת Calendly:
  - [ ] Embed עובד
  - [ ] CTA מוביל נכון
  - [ ] Events tracking
- [ ] בדיקת פיקסלים:
  - [ ] GA4 events נשלחים
  - [ ] Meta Pixel events נשלחים
  - [ ] בדיקה ב-GA4 Dashboard
  - [ ] בדיקה ב-Meta Events Manager
- [ ] בדיקת ממשק מנהל:
  - [ ] Login/Logout
  - [ ] Route protection
  - [ ] Dashboard - סטטיסטיקות
  - [ ] ניהול לידים - CRUD
  - [ ] ניהול בלוג - CRUD
  - [ ] ניהול המלצות - CRUD
  - [ ] ניהול מסלולים - CRUD
  - [ ] הגדרות

### 4.3 חיבור דומיין
- [ ] הגדרת DNS:
  - [ ] A Record / CNAME
  - [ ] בדיקת Propagation
- [ ] הגדרת SSL Certificate (אוטומטי ב-Vercel)
- [ ] הגדרת Vercel/אחסון:
  - [ ] חיבור Repository
  - [ ] הגדרת Environment Variables
  - [ ] הגדרת Build Settings
  - [ ] בדיקת Deploy

### 4.4 העלאה לפרודקשן
- [ ] Build Check:
  - [ ] Build מצליח ללא שגיאות
  - [ ] בדיקת Warnings
- [ ] Environment Variables:
  - [ ] כל המשתנים מוגדרים
  - [ ] בדיקת ערכים
- [ ] Search Console Setup:
  - [ ] הוספת Property
  - [ ] Verification
  - [ ] שליחת Sitemap
- [ ] Final Testing:
  - [ ] כל העמודים עובדים
  - [ ] כל הפונקציות עובדות
  - [ ] אין שגיאות בקונסול
  - [ ] Lighthouse Score 90+

---

## Phase 5 — לאחר השקה (שוטף)

### 5.1 בלוג
- [ ] יצירת תבנית כתיבת מאמר
- [ ] כתיבת מאמר ראשון:
  - [ ] תוכן איכותי
  - [ ] SEO optimization
  - [ ] תמונה ראשית
  - [ ] קטגוריה ותגיות
- [ ] כתיבת מאמר שני
- [ ] כתיבת מאמר שלישי
- [ ] פרסום מאמרים

### 5.2 דוח 30 יום
- [ ] איסוף מדדים:
  - [ ] GA4 - כמות מבקרים
  - [ ] GA4 - Conversion rates
  - [ ] Meta Pixel - Events
  - [ ] כמות לידים
  - [ ] מקורות לידים
- [ ] ניתוח תוצאות:
  - [ ] מה עובד טוב
  - [ ] מה צריך שיפור
- [ ] שיפורי המרה:
  - [ ] שיפור CTA
  - [ ] שיפור טופס
  - [ ] שיפור תוכן
- [ ] A/B Testing (אם נדרש):
  - [ ] כותרת Hero
  - [ ] CTA Button
  - [ ] תוכן

---

## הערות חשובות

### עדיפויות
1. **Mobile-first** - הכל חייב לעבוד מושלם במובייל
2. **ביצועים** - אתר מהיר = יותר המרות
3. **נגישות** - לא רק חובה, גם טוב ל-SEO
4. **SEO** - בלוג + metadata = יותר טראפיק אורגני

### נקודות תשומת לב
- **לא לפרסם מחירים** (לפי בקשת הלקוחה), אבל כן להציג מסלולים ברור
- **טופס הוא משני** - CTA הראשי הוא קביעת שיחה + וואטסאפ
- **אווירה עדינה** - לא יותר מדי אלמנטים, רק מה שמוסיף
- **שפה אמפתית** - חשוב מאוד לקהל היעד

---

**תאריך יצירה:** 2024  
**גרסה:** 1.0  
**סטטוס:** מוכן לביצוע

