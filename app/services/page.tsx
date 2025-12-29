import { Metadata } from 'next';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com';

export const metadata: Metadata = {
  title: 'שירותים - Sarit Hadar',
  description: 'כתיבת תוכן שיווקי ועריכת לשון לעסקים: דפי נחיתה, אתרים, מודעות ומיקרו־קופי. בוחרים מסלול — ואני מסדרת לכם את המסר מקצה לקצה',
  openGraph: {
    title: 'שירותים - Sarit Hadar',
    description: 'כתיבת תוכן שיווקי ועריכת לשון לעסקים: דפי נחיתה, אתרים, מודעות ומיקרו־קופי',
    url: `${baseUrl}/services`,
    siteName: 'Sarit Hadar',
    locale: 'he_IL',
    type: 'website',
  },
};

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary mb-6">
            שירותים
          </h1>
          <p className="text-lg md:text-xl text-text-medium font-body max-w-3xl mx-auto">
            בוחרים מה צריך — ואני מנסחת את זה ברור, נקי, ומכוון לפנייה.
          </p>
        </div>

        <div className="space-y-8 mb-12">
          <Card className="p-8 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">
              דף נחיתה שמוכר
            </h2>
            <p className="text-text-dark font-body mb-3">
              <strong>מה זה:</strong> דף שמוביל אדם מהבנה → אמון → פעולה, בלי רעש.
            </p>
            <p className="text-text-dark font-body mb-3">
              <strong>מה כלול:</strong> כותרות, מבנה דף, טקסט מלא, CTA, FAQ, טופס/ווטסאפ, גרסאות קצרות.
            </p>
            <p className="text-text-dark font-body mb-3">
              <strong>למי מתאים:</strong> קמפיינים, שירות חדש, מוצר חדש, או אתר שלא מביא פניות.
            </p>
            <p className="text-text-dark font-body mb-3">
              <strong>תוצרים:</strong> טקסט מוכן להדבקה + הצעות לכותרות/כפתורים.
            </p>
            <p className="text-text-dark font-body">
              <strong>זמן:</strong> X ימי עבודה.
            </p>
          </Card>

          <Card className="p-8 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">
              תוכן לאתר (בית / אודות / שירותים)
            </h2>
            <p className="text-text-dark font-body mb-3">
              <strong>מה זה:</strong> עמודים שמסבירים מה אתם נותנים בצורה שמרגישה מקצועית ולא &quot;מוכרת בכוח&quot;.
            </p>
            <p className="text-text-dark font-body mb-3">
              <strong>מה כלול:</strong> מבנה לכל עמוד, כתיבה מלאה, התאמת טון, CTA בכל מקטע.
            </p>
            <p className="text-text-dark font-body mb-3">
              <strong>למי מתאים:</strong> עסקים שרוצים אתר מסודר שמביא פניות, לא רק &quot;כרטיס ביקור&quot;.
            </p>
            <p className="text-text-dark font-body">
              <strong>זמן:</strong> X–Y ימי עבודה.
            </p>
          </Card>

          <Card className="p-8 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">
              מודעות וקמפיינים
            </h2>
            <p className="text-text-dark font-body mb-3">
              <strong>מה זה:</strong> טקסטים קצרים שעושים סדר ומביאים קליק ופנייה, לא רק לייק.
            </p>
            <p className="text-text-dark font-body mb-3">
              <strong>מה כלול:</strong> כותרות + טקסטים + וריאציות לבדיקה + מסרים לפי קהל.
            </p>
            <p className="text-text-dark font-body mb-3">
              <strong>למי מתאים:</strong> פייסבוק/גוגל/וואטסאפ סטטוס/שילוט דיגיטלי.
            </p>
            <p className="text-text-dark font-body">
              <strong>תוצרים:</strong> סט מודעות מוכן + כיוונים להמשך.
            </p>
          </Card>

          <Card className="p-8 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">
              עריכת לשון וליטוש
            </h2>
            <p className="text-text-dark font-body mb-3">
              <strong>מה זה:</strong> לקחת טקסט קיים ולהפוך אותו לקריא, מדויק, ומכבד.
            </p>
            <p className="text-text-dark font-body mb-3">
              <strong>מה כלול:</strong> תיקון ניסוחים, קיצור רעש, שיפור מבנה, דיוק כותרות וקריאה לפעולה.
            </p>
            <p className="text-text-dark font-body">
              <strong>למי מתאים:</strong> מי שיש לו בסיס טוב אבל התוצאה &quot;לא יושבת&quot;.
            </p>
          </Card>

          <Card className="p-8 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">
              מיקרו־קופי (כפתורים / טפסים / הודעות)
            </h2>
            <p className="text-text-dark font-body mb-3">
              <strong>מה זה:</strong> מילים קטנות שעושות הבדל גדול: כפתורים, כותרות קצרות, הודעות שגיאה, טקסטים מתחת לשדות.
            </p>
            <p className="text-text-dark font-body mb-3">
              <strong>מה כלול:</strong> סט ניסוחים + וריאציות A/B, מותאם למובייל ול־RTL.
            </p>
            <p className="text-text-dark font-body">
              <strong>למי מתאים:</strong> מי שרוצה לשפר המרות בלי לשנות עיצוב.
            </p>
          </Card>
        </div>

        <div className="text-center">
          <p className="text-lg font-body text-text-medium mb-6">
            לא בטוחים מה לבחור? שלחו לי קישור או 2 משפטים על השירות — ואכוון אתכם למסלול הנכון.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" asChild>
              <a href="https://wa.me/972501234567" target="_blank" rel="noopener noreferrer">
                לשליחה בוואטסאפ
              </a>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/assessment">בדיקה מהירה (2 דקות)</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

