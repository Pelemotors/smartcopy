# Supabase Database Setup

## הוראות התקנה

### 1. התחברות ל-Supabase

1. היכנסי ל-[Supabase Dashboard](https://app.supabase.com)
2. בחרי את הפרויקט שלך
3. לכי ל-SQL Editor

### 2. הרצת Schema

1. פתחי את הקובץ `schema.sql`
2. העתיקי את כל התוכן
3. הדביקי ב-SQL Editor ב-Supabase
4. לחצי על "Run" או "Execute"

### 3. בדיקת הטבלאות

לאחר ההרצה, בדקי שהטבלאות נוצרו:
- `leads`
- `quiz_responses`
- `blog_categories`
- `blog_tags`
- `blog_posts`
- `blog_post_tags`
- `programs`
- `admin_users`
- `lead_notes`
- `testimonials`

### 4. יצירת משתמש מנהל

לאחר יצירת הטבלאות, צרי משתמש מנהל דרך:
- Authentication → Users → Add User
- או דרך Supabase Auth API

### 5. הוספת Service Role Key

הוסף את ה-Service Role Key ל-`.env`:
```
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
```

**חשוב:** Service Role Key לעולם לא ייחשף ב-client!

### 6. בדיקת RLS Policies

ודאי שה-RLS Policies מוגדרים נכון:
- `leads` - רק authenticated users יכולים לקרוא
- `blog_posts` - כל אחד יכול לקרוא רק מה שפורסם
- `testimonials` - כל אחד יכול לקרוא רק מה שפורסם
- `programs` - כל אחד יכול לקרוא רק מה שפעיל

## הערות

- כל הכתיבות ל-DB מתבצעות דרך API routes בלבד (שימוש ב-service role)
- הקריאות הציבוריות (blog, testimonials, programs) מתבצעות דרך anon key
- הקריאות ב-admin panel מתבצעות דרך authenticated users

