# הנחיות פריסה ל-Vercel

## שלב 1: פריסה לטסט (ללא Supabase)

הפרויקט מוכן לפריסה ב-Vercel ללא תלות ב-Supabase. הכללים מוגדרים כ-mock data בקוד.

### דרישות

- חשבון Vercel (חינם)
- GitHub repository (או GitLab/Bitbucket)

### שלבים לפריסה

1. **העלה את הקוד ל-GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - finance calculator"
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. **חבר את הפרויקט ל-Vercel**
   - היכנס ל-[vercel.com](https://vercel.com)
   - לחץ על "Add New Project"
   - בחר את ה-repository שלך
   - Vercel יזהה אוטומטית שזה Next.js

3. **הגדרות Build (אופציונלי)**
   - Build Command: `npm run build` (ברירת מחדל)
   - Output Directory: `.next` (ברירת מחדל)
   - Install Command: `npm install` (ברירת מחדל)

4. **Environment Variables (לא נדרש בשלב זה)**
   - אין צורך ב-environment variables כי אנחנו לא משתמשים ב-Supabase

5. **Deploy**
   - לחץ על "Deploy"
   - Vercel יבנה ויפרס את האתר אוטומטית

### בדיקה לאחר פריסה

1. פתח את ה-URL שקיבלת מ-Vercel
2. נסה להריץ חישוב במחשבון
3. ודא שהכל עובד בלי שגיאות

### שימוש בכללי המימון

כרגע הכללים מוגדרים כ-mock data ב-`lib/mockFinanceRules.ts`. כל השינויים בכללים דורשים עדכון קוד ו-redeploy.

---

## שלב 2: הוספת Supabase (לאחר הטסט)

לאחר שצוות הטסט אישר שהכל עובד, אפשר להוסיף את Supabase:

### 1. יצירת פרויקט Supabase

1. היכנס ל-[supabase.com](https://supabase.com)
2. צור פרויקט חדש
3. שמור את ה-URL ואת ה-service role key

### 2. הגדרת Environment Variables

ב-Vercel, הוסף את ה-environment variables הבאים:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 3. הרצת Migrations

```bash
# התקן את Supabase CLI
npm install -g supabase

# התחבר לפרויקט
supabase link --project-ref your-project-ref

# הרץ את ה-migrations
supabase db push
```

### 4. ייבוא כללי המימון

```bash
# דרך API (אחרי שהשרת עובד)
curl -X POST https://your-app.vercel.app/api/finance/rules/import \
  -H "Content-Type: application/json" \
  -d @finance-rules.json
```

### 5. עדכון הקוד להשתמש ב-Supabase

1. הסר את `mockFinanceRules` מ-`components/finance/FinanceCalculator.tsx`
2. החזר את הקריאה ל-API ב-`fetchRules`
3. עדכן את `handleCalculate` להשתמש ב-API במקום חישוב מקומי

---

## הגדרות מומלצות ל-Vercel

### Production

- **Framework Preset**: Next.js
- **Root Directory**: `./`
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Node Version**: 18.x או 20.x

### Environment Variables (שלב 2)

```
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_BASE_URL=https://your-app.vercel.app
```

---

## פתרון בעיות

### Build נכשל

1. בדוק את ה-logs ב-Vercel
2. ודא ש-TypeScript compiles ללא שגיאות: `npm run build`
3. בדוק שאין שגיאות syntax

### האתר לא נטען

1. בדוק שה-build הצליח
2. בדוק את ה-logs ב-Vercel
3. ודא שה-Next.js configuration תקין

### חישובים לא עובדים

1. פתח את ה-Console בדפדפן (F12)
2. בדוק אם יש שגיאות JavaScript
3. ודא שה-mock rules נטענים כראוי

---

## קישורים שימושיים

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Supabase Documentation](https://supabase.com/docs)

