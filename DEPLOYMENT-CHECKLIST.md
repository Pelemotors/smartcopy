# רשימת בדיקה לפריסה ב-Vercel

## ✅ לפני הפריסה

- [ ] Build עובר בהצלחה (`npm run build`)
- [ ] אין שגיאות TypeScript (`npm run lint`)
- [ ] האתר עובד מקומית (`npm run dev`)
- [ ] המחשבון מחשב נכון עם דוגמאות שונות
- [ ] כללי המימון פועלים כראוי

## 📦 הכנה לפריסה

### 1. העלאה ל-GitHub

```bash
# ודא שיש .gitignore
git init
git add .
git commit -m "Initial commit - finance calculator without Supabase"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 2. יצירת פרויקט ב-Vercel

1. היכנס ל-[vercel.com](https://vercel.com)
2. לחץ "Add New Project"
3. בחר את ה-repository מה-GitHub
4. Vercel יזהה אוטומטית Next.js

### 3. הגדרות Build (ברירת מחדל - אין צורך לשנות)

- Framework Preset: **Next.js**
- Root Directory: `./`
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

### 4. Environment Variables

**שלב 1 (טסט): אין צורך ב-environment variables**

**שלב 2 (עם Supabase):**
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_BASE_URL=https://your-app.vercel.app
```

### 5. Deploy

- לחץ "Deploy"
- המתן לסיום הבנייה (1-3 דקות)
- בדוק שהאתר עובד ב-URL שקיבלת

## ✅ אחרי הפריסה

- [ ] האתר נטען בלי שגיאות
- [ ] המחשבון עובד
- [ ] אפשר להזין נתונים ולחשב
- [ ] התוצאות נכונות
- [ ] אין שגיאות ב-Console (F12)

## 🐛 פתרון בעיות

### Build נכשל

1. בדוק את ה-logs ב-Vercel
2. הרץ `npm run build` מקומית לראות את השגיאות
3. ודא שאין שגיאות TypeScript או ESLint

### האתר לא נטען

1. בדוק שה-build הצליח
2. בדוק את ה-logs ב-Vercel
3. ודא שה-URL נכון

### המחשבון לא עובד

1. פתח את ה-Console בדפדפן (F12)
2. בדוק אם יש שגיאות JavaScript
3. ודא שה-mock rules נטענים (`lib/mockFinanceRules.ts`)

## 📝 הערות

- בשלב 1, אין שמירת נתונים - כל חישוב הוא חד-פעמי
- הכללים מוגדרים בקוד (`lib/mockFinanceRules.ts`)
- לשינוי כללים, עדכן את הקוד ו-deploy מחדש
- בשלב 2, אפשר להוסיף Supabase ללא שינוי בקוד הצד הלקוח

