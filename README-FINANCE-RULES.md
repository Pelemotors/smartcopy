# הנחיות לייבוא כללי מימון

## ייבוא כללי מימון מ-JSON למסד הנתונים

המערכת תומכת בייבוא כללי מימון מקובץ JSON למסד הנתונים Supabase.

### שיטה 1: שימוש ב-API Endpoint (מומלץ)

1. התחברו לשרת Next.js (`npm run dev`)
2. השתמשו ב-API endpoint:
   ```bash
   curl -X POST http://localhost:3000/api/finance/rules/import \
     -H "Content-Type: application/json" \
     -d @finance-rules.json
   ```

או עם Postman/Insomnia:
- Method: POST
- URL: `http://localhost:3000/api/finance/rules/import`
- Headers: `Content-Type: application/json`
- Body: העתיקו את תוכן `finance-rules.json`

### שיטה 2: שימוש ב-Script (Node.js)

```bash
# Node.js 18+ (מובנה fetch)
node scripts/import-finance-rules.js

# או עם נתיב מותאם
node scripts/import-finance-rules.js path/to/your-rules.json
```

### פורמט ה-JSON

הקובץ `finance-rules.json` צריך להיות בפורמט הבא:

```json
{
  "ruleset": {
    "name": "auto-finance-rules",
    "version": "2026-01-06",
    "currency": "ILS",
    "notes": ["..."]
  },
  "balloon_rules": [
    {
      "id": "BALLOON_ELIGIBILITY_USED_UP_TO_6Y",
      "priority": 100,
      "type": "eligibility",
      "conditions": {
        "car_type": "used",
        "car_age_years_max": 6
      },
      "result": {
        "balloon_allowed": true
      }
    }
  ],
  "installments_rules": [
    {
      "id": "TERM_0_1Y_2025_2026",
      "priority": 70,
      "type": "installments_policy",
      "conditions": {
        "car_age_years_min": 0,
        "car_age_years_max": 1,
        "model_year_min": 2025,
        "model_year_max": 2026
      },
      "result": {
        "base_installments": 84,
        "max_installments_with_deviation": 100,
        "deviation_interest_addon_percent": null
      }
    }
  ]
}
```

### סוגי כללים

#### 1. Eligibility Rules (`type: "eligibility"`)
קובעים אם מסלול בלון זמין:
- `conditions`: תנאים (car_type, car_age_years_min/max)
- `result.balloon_allowed`: true/false
- `result.reason`: הודעה למשתמש אם לא זמין

#### 2. Balloon Terms Rules (`type: "balloon_terms"`)
קובעים תנאי בלון:
- `conditions`: תנאים (car_type, car_age_years_min/max, loan_term_months)
- `result.balloon_max_percent_of_price_list`: אחוז מקסימלי מהמחיר
- `result.balloon_interest_addon_percent`: תוספת ריבית על בלון

#### 3. Installments Policy Rules (`type: "installments_policy"`)
קובעים תנאי פריסה:
- `conditions`: תנאים (car_age_years_min/max, model_year_min/max)
- `result.base_installments`: תקופת פריסה בסיסית
- `result.max_installments_with_deviation`: תקופת מקסימלית עם סטייה
- `result.deviation_interest_addon_percent`: תוספת ריבית לסטייה

### עדכון כללים

לעדכון כללים קיימים, פשוט ייבאו את ה-JSON מחדש. הכללים יתעדכנו לפי ה-`id` שלהם.

### בדיקת כללים

לבדיקה שהכללים יובאו בהצלחה:
```bash
curl http://localhost:3000/api/finance/rules
```

