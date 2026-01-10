# מחשבון מימון רכב

אתר מחשבון מימון רכב עם כללי עסקים דינמיים.

## שלב 1: פריסה לטסט (ללא Supabase)

הפרויקט מוכן לפריסה ב-Vercel ללא תלות ב-Supabase. הכללים מוגדרים כ-mock data בקוד.

### התקנה מקומית

```bash
# התקן dependencies
npm install

# הרץ את השרת המקומי
npm run dev

# פתח בדפדפן
# http://localhost:3000
```

### פריסה ל-Vercel

ראה `README-DEPLOYMENT.md` לפרטים מלאים.

**בקצרה:**
1. העלה את הקוד ל-GitHub
2. חבר את הפרויקט ל-Vercel
3. Deploy - אין צורך ב-environment variables בשלב זה

### מבנה הפרויקט

```
app/
  page.tsx              # דף הבית עם המחשבון
  api/
    finance/
      rules/            # API routes לכללים (מחזיר mock data)
      calculate/        # API route לחישוב (ללא שמירה למסד נתונים)
components/
  finance/
    FinanceCalculator.tsx  # קומפוננטת המחשבון
lib/
  mockFinanceRules.ts      # כללי המימון (mock data)
  financeCalculations.ts   # לוגיקת החישובים
types/
  finance.ts               # TypeScript types
```

### כללי המימון

כללי המימון מוגדרים ב-`lib/mockFinanceRules.ts`:

- **Eligibility Rules** - זכאות לבלון לפי גיל רכב
- **Balloon Terms Rules** - תנאי בלון לפי גיל ותקופת הלוואה
- **Installments Policy Rules** - כללי פריסה לפי גיל ושנתון

### התאמת כללים

לשנות כללים, ערוך את `lib/mockFinanceRules.ts` וה-deploy מחדש.

---

## שלב 2: הוספת Supabase (לאחר הטסט)

לאחר שצוות הטסט אישר שהכל עובד, אפשר להוסיף את Supabase לאיסוף נתונים.

### הפעלת Supabase

1. יצירת פרויקט Supabase ב-[supabase.com](https://supabase.com)
2. הגדרת Environment Variables ב-Vercel:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```
3. הרצת migrations:
   ```bash
   supabase db push
   ```
4. ייבוא כללי המימון:
   ```bash
   npm run import-rules
   ```

### עדכון הקוד

1. הסר את השימוש ב-`mockFinanceRules` ב-`components/finance/FinanceCalculator.tsx`
2. בטל הערות ב-`app/api/finance/rules/route.ts` ו-`app/api/finance/calculate/route.ts`
3. הוסף את הקוד לשמירת חישובים למסד הנתונים

ראה `README-DEPLOYMENT.md` לפרטים מלאים.

---

## פיתוח

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint
npm run lint
```

---

## טכנולוגיות

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Supabase** (שלב 2) - Database & Backend

---

## רישיון

פרטי

