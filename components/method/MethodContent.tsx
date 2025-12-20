'use client';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export function MethodContent() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary mb-4 tracking-tight">
            איך בנוי התהליך?
          </h1>
        </div>

        <Card className="mb-8 md:mb-12 border border-secondary/10 bg-white">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6 tracking-tight">
            למה בעצם צריך טכנאי שיניים מקצועי?
          </h2>
          <p className="text-text-dark font-body text-lg md:text-xl leading-relaxed mb-6 font-medium">
            שיקום שיניים מקצועי מעניק לכם חיוך בריא ויפה, וכולל יתרונות רבים:
          </p>
          <ul className="space-y-3 text-text-medium font-body text-base md:text-lg">
            <li className="flex items-start gap-3">
              <span className="text-accent text-xl mt-1">✓</span>
              <span>שיקום שיניים איכותי תורם לבריאות הפה והשיניים.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent text-xl mt-1">✓</span>
              <span>תותבות וכתרים מקצועיים מעניקים נוחות וביטחון.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent text-xl mt-1">✓</span>
              <span>שיקום נכון משפר את יכולת האכילה והדיבור.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent text-xl mt-1">✓</span>
              <span>חיוך יפה משפר את הביטחון העצמי ואיכות החיים.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent text-xl mt-1">✓</span>
              <span>עבודה מקצועית מבטיחה עמידה לאורך שנים.</span>
            </li>
          </ul>
        </Card>

        <Card className="mb-8 md:mb-12 border border-secondary/10 bg-white">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6 tracking-tight">
            תהליך עבודה מקצועי ומסודר
          </h2>
          <p className="text-text-dark font-body text-lg md:text-xl leading-relaxed mb-4 font-medium">
            תהליך יצירת תותבות, כתרים או גשרים במעבדה שלנו הוא תהליך מקצועי ומסודר, המבוצע בקפידה ובשימוש בטכנולוגיות המתקדמות ביותר.
          </p>
          <p className="text-text-medium font-body text-base md:text-lg leading-relaxed mb-8">
            התהליך כולל מספר שלבים, החל מייעוץ ראשוני ועד מסירה מושלמת:
          </p>
          <div className="space-y-6">
            <div className="border-r-4 border-primary pr-6">
              <h3 className="text-xl md:text-2xl font-heading font-semibold text-primary mb-3">
                1. ייעוץ ראשוני ותכנון
              </h3>
              <p className="text-text-medium font-body text-base">
                פגישת ייעוץ עם רופא השיניים שלכם, בה נבחנים הצרכים, נבחר הפתרון המתאים ונקבעים פרטי התכנון. אנו עובדים בשיתוף פעולה הדוק עם רופא השיניים כדי להבטיח את התוצאה הטובה ביותר.
              </p>
            </div>
            <div className="border-r-4 border-accent pr-6">
              <h3 className="text-xl md:text-2xl font-heading font-semibold text-primary mb-3">
                2. סריקה דיגיטלית או לקיחת מידות
              </h3>
              <p className="text-text-medium font-body text-base">
                סריקה דיגיטלית באמצעות סורקים מתקדמים או לקיחת מידות מסורתית מדויקת. המידות מועברות למעבדה שם מוכן מודל עבודה מקצועי.
              </p>
            </div>
            <div className="border-r-4 border-primary pr-6">
              <h3 className="text-xl md:text-2xl font-heading font-semibold text-primary mb-3">
                3. תכנון דיגיטלי (CAD) וייצור (CAM)
              </h3>
              <p className="text-text-medium font-body text-base">
                תכנון ממוחשב מדויק באמצעות מערכות CAD, ולאחר מכן ייצור באמצעות מכונות CNC או מדפסות תלת-ממד. כל עבודה מתוכננת בדיוק מקסימלי תוך התחשבות באסתטיקה, פונקציונליות ונוחות.
              </p>
            </div>
            <div className="border-r-4 border-accent pr-6">
              <h3 className="text-xl md:text-2xl font-heading font-semibold text-primary mb-3">
                4. עיבוד וסיום
              </h3>
              <p className="text-text-medium font-body text-base">
                עיבוד מקצועי, צביעה (אם נדרש), ליטוש וסיום קפדני. כל עבודה נבדקת בקפידה לפני מסירה כדי להבטיח איכות מושלמת.
              </p>
            </div>
            <div className="border-r-4 border-primary pr-6">
              <h3 className="text-xl md:text-2xl font-heading font-semibold text-primary mb-3">
                5. התאמה, בדיקה ומסירה
              </h3>
              <p className="text-text-medium font-body text-base">
                התאמה במרפאת השיניים, בדיקת נוחות ודיוק, תיקונים אם נדרש, ומסירה סופית. אנו מספקים הדרכה על תחזוקה נכונה ואחריות על העבודה.
              </p>
            </div>
          </div>
        </Card>

        <Card className="mb-8 md:mb-12 border border-secondary/10 bg-white">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6 tracking-tight">
            מה עושה טכנאי שיניים מקצועי?
          </h2>
          <p className="text-text-dark font-body text-lg md:text-xl leading-relaxed mb-6 font-medium">
            טכנאי שיניים מקצועי הוא בעל מקצוע מוסמך המתמחה ביצירת פתרונות שיקום שיניים מדויקים ואיכותיים. הטכנאי עובד בשיתוף פעולה הדוק עם רופא השיניים כדי להבטיח את התוצאה הטובה ביותר.
          </p>
          <p className="text-text-medium font-body text-base md:text-lg leading-relaxed mb-6">
            התפקיד שלנו במעבדה כולל:
          </p>
          <ul className="space-y-4 text-text-medium font-body text-base md:text-lg">
            <li className="flex items-start gap-3">
              <span className="text-accent text-xl mt-1 font-bold">✓</span>
              <span><strong>ייצור תותבות, כתרים וגשרים</strong> בדיוק מקסימלי תוך שימוש בטכנולוגיות מתקדמות כמו CAD/CAM</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent text-xl mt-1 font-bold">✓</span>
              <span><strong>בניית פתרונות מותאמים אישית</strong> לכל לקוח, תוך התחשבות בצרכים, באסתטיקה ובפונקציונליות</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent text-xl mt-1 font-bold">✓</span>
              <span><strong>שימוש בחומרים איכותיים</strong> כמו זירקוניה, E-max, מתכות אצילות וחומרים נוספים מהשורה הראשונה</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent text-xl mt-1 font-bold">✓</span>
              <span><strong>תמיכה וליווי מקצועי</strong> לאורך כל התהליך, מהתכנון ועד המסירה הסופית</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent text-xl mt-1 font-bold">✓</span>
              <span><strong>השתתפות בהשתלמויות מקצועיות</strong> כדי להישאר מעודכנים בחידושים הטכנולוגיים והחומריים בתחום</span>
            </li>
          </ul>
        </Card>

        <Card className="mb-8 md:mb-12 border border-secondary/10 bg-white">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6 tracking-tight">
            מי זקוק לשירותי מעבדת שיניים מקצועית?
          </h2>
          <h3 className="text-2xl md:text-3xl font-heading font-semibold text-primary mb-4">
            שיקום שיניים מקצועי – השקעה בבריאות ובאיכות החיים
          </h3>
          <p className="text-text-dark font-body text-lg md:text-xl leading-relaxed mb-6 font-medium">
            שיקום שיניים מקצועי הוא לא רק אסתטיקה – הוא השקעה בבריאות, באיכות החיים ובביטחון העצמי. מעבדת שיניים מקצועית מסייעת לכם להשיג תוצאות מעולות ולחזור לחייך בביטחון.
          </p>
          
          <h3 className="text-2xl md:text-3xl font-heading font-semibold text-primary mb-4 mt-8">
            למה שיקום שיניים מקצועי חשוב?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
            <div className="bg-accent/5 p-5 rounded-xl border border-accent/20 shadow-sm">
              <h4 className="font-heading font-bold text-primary mb-2 text-lg">שיפור איכות החיים</h4>
              <p className="text-text-medium font-body text-sm md:text-base">יכולת אכילה טובה יותר, דיבור ברור וביטחון עצמי גבוה יותר</p>
            </div>
            <div className="bg-accent/5 p-5 rounded-xl border border-accent/20 shadow-sm">
              <h4 className="font-heading font-bold text-primary mb-2 text-lg">בריאות הפה והשיניים</h4>
              <p className="text-text-medium font-body text-sm md:text-base">שיקום נכון תורם לבריאות השיניים, החניכיים ולמניעת בעיות עתידיות</p>
            </div>
            <div className="bg-accent/5 p-5 rounded-xl border border-accent/20 shadow-sm">
              <h4 className="font-heading font-bold text-primary mb-2 text-lg">אסתטיקה ומראה</h4>
              <p className="text-text-medium font-body text-sm md:text-base">חיוך יפה ומעוצב משפר את המראה, הביטחון העצמי והתדמית המקצועית</p>
            </div>
            <div className="bg-accent/5 p-5 rounded-xl border border-accent/20 shadow-sm">
              <h4 className="font-heading font-bold text-primary mb-2 text-lg">עמידה לאורך שנים</h4>
              <p className="text-text-medium font-body text-sm md:text-base">עבודה מקצועית עם חומרים איכותיים מבטיחה עמידה לאורך שנים רבות</p>
            </div>
          </div>

          <h3 className="text-2xl md:text-3xl font-heading font-semibold text-primary mb-4 mt-8">
            למי זה מתאים?
          </h3>
          <ul className="space-y-3 text-text-medium font-body text-base md:text-lg mb-8">
            <li className="flex items-start gap-3">
              <span className="text-accent text-xl mt-1 font-bold">•</span>
              <span><strong>אנשים שצריכים תותבות שיניים</strong> – תותבות חלקיות או מלאות, תותבות על שתלים</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent text-xl mt-1 font-bold">•</span>
              <span><strong>אנשים שצריכים כתרים</strong> – כתרי זירקוניה, E-max, מתכת-קרמיקה או כתרים זמניים</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent text-xl mt-1 font-bold">•</span>
              <span><strong>אנשים שצריכים גשרים</strong> – גשרים קבועים, גשרי זירקוניה או E-max</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent text-xl mt-1 font-bold">•</span>
              <span><strong>אנשים שצריכים שיקום שיניים מלא או חלקי</strong> – פתרונות מקיפים לשיקום הפה</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent text-xl mt-1 font-bold">•</span>
              <span><strong>רופאי שיניים</strong> המחפשים מעבדה מקצועית ואמינה לשיתוף פעולה</span>
            </li>
          </ul>

          <h3 className="text-2xl md:text-3xl font-heading font-semibold text-primary mb-4 mt-8">
            מה היתרונות של מעבדה מקצועית?
          </h3>
          <p className="text-text-medium font-body text-base md:text-lg leading-relaxed mb-6">
            מעבדת שיניים מקצועית מספקת יתרונות משמעותיים:
          </p>
          <ul className="space-y-3 text-text-medium font-body text-base md:text-lg mb-6">
            <li className="flex items-start gap-3">
              <span className="text-accent text-xl mt-1 font-bold">✓</span>
              <span><strong>דיוק מקסימלי</strong> – שימוש בטכנולוגיות CAD/CAM ומדפסות תלת-ממד לדיוק מושלם</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent text-xl mt-1 font-bold">✓</span>
              <span><strong>חומרים איכותיים</strong> – שימוש בחומרים מהשורה הראשונה כמו זירקוניה, E-max ומתכות אצילות</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent text-xl mt-1 font-bold">✓</span>
              <span><strong>שירות מקצועי</strong> – ליווי מקצועי, תקשורת פתוחה והתחייבות לאיכות ולשביעות רצון</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent text-xl mt-1 font-bold">✓</span>
              <span><strong>אחריות ותמיכה</strong> – אחריות על העבודה ותמיכה מקצועית גם לאחר המסירה</span>
            </li>
          </ul>
          <div className="bg-accent/5 p-5 rounded-xl border border-accent/20">
            <p className="text-text-dark font-body text-lg md:text-xl leading-relaxed font-semibold">
              בכל מצב, אפשר להשיג תוצאות מעולות ולחזור לחייך בביטחון עם עבודה מקצועית ואיכותית של מעבדת שיניים מובילה.
            </p>
          </div>
        </Card>

        <Card className="mb-8 md:mb-12 bg-gradient-to-br from-primary/5 via-white to-accent/5 border border-primary/10">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6 tracking-tight">
            החזרים דרך ביטוחים
          </h2>
          <p className="text-text-medium font-body text-lg md:text-xl leading-relaxed mb-8">
            חשוב לדעת שבמקרים מסוימים ניתן לקבל החזר חלקי או מלא על שירותי שיקום שיניים דרך ביטוחים שונים.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl md:text-2xl font-heading font-semibold text-primary mb-3">
                דרך קופות החולים
              </h3>
              <p className="text-text-medium font-body text-base md:text-lg leading-relaxed mb-2">
                לקוחות במסלולים המורחבים של קופות החולים יכולים לעיתים לקבל החזר על שירותי שיקום שיניים, בהתאם לסוג הביטוח והשירות.
              </p>
              <p className="text-text-dark font-body text-base md:text-lg leading-relaxed font-semibold">
                מומלץ לבדוק את הזכאות מול הקופה שלכם.
              </p>
            </div>

            <div>
              <h3 className="text-xl md:text-2xl font-heading font-semibold text-primary mb-3">
                דרך ביטוחים פרטיים
              </h3>
              <p className="text-text-medium font-body text-base md:text-lg leading-relaxed">
                חלק מהביטוחים הפרטיים מאפשרים החזר חלקי או מלא על שירותי שיקום שיניים.
                בדקו מול חברת הביטוח שלכם אם השירות נכלל תחת הביטוח.
              </p>
            </div>

            <div>
              <h3 className="text-xl md:text-2xl font-heading font-semibold text-primary mb-3">
                דרך ביטוחי שיניים
              </h3>
              <p className="text-text-medium font-body text-base md:text-lg leading-relaxed">
                ביטוחי שיניים פרטיים או דרך מקום העבודה יכולים לכסות חלק ניכר מעלויות שיקום השיניים.
                מומלץ לבדוק את תנאי הביטוח שלכם.
              </p>
            </div>
          </div>
        </Card>

        <div className="text-center">
          <Button variant="primary" size="lg" asChild>
            <Link href="/contact">חיוך בריא מתחיל כאן</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

