'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { mockFAQs } from '@/lib/mockData';
import { FAQItem } from './FAQItem';

interface HomeContentProps {
  programs: any[];
}

export function HomeContent({ programs }: HomeContentProps) {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      {/* Hero Section */}
      <section className="relative mb-20 md:mb-32 py-12 md:py-20 bg-gradient-to-br from-white via-background-warm to-accent-lavender/5 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-sky/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-pink/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
        
        <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
          {/* תמונת שרית - עיגול גדול */}
          <div className="flex justify-center mb-12 animate-float">
            <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-8 border-white shadow-2xl ring-4 ring-accent-lavender/20">
              <Image
                src="/images/sarit.jpg"
                alt="שרית הדר - כותבת תוכן ועורכת לשון"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 192px, (max-width: 1024px) 256px, 320px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent"></div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary mb-6 max-w-4xl mx-auto leading-tight tracking-tight animate-fade-in">
            טקסט שמסביר בדיוק מה אתם מציעים — ומוביל לפנייה
          </h1>
          <p className="text-xl md:text-2xl text-text-dark mb-6 font-body max-w-3xl mx-auto font-medium leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
            כתיבת תוכן שיווקי ועריכת לשון לעסקים: דפי נחיתה, אתרים, מודעות ומיקרו־קופי.
            <br />
            מדויק, נקי ואנושי — בלי קלישאות ובלי &quot;טקסט שמרגיש AI&quot;.
          </p>
          
          <p className="text-lg md:text-xl text-text-medium mb-6 font-body max-w-3xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.3s' }}>
            אם השירות שלכם מעולה אבל המסר לא &quot;יושב&quot; — האתר יכול להיראות מצוין ועדיין לא להביא פניות.
            <br />
            אני מסדרת את התוכן כך שהלקוח יבין מהר: מה אתם נותנים, למי זה מתאים, ומה הצעד הבא.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6 animate-scale-in" style={{ animationDelay: '0.4s' }}>
            <Button variant="primary" size="lg" asChild className="hover-lift">
              <a href="https://wa.me/972501234567" target="_blank" rel="noopener noreferrer">
                דברו איתי בוואטסאפ
              </a>
            </Button>
            <Button variant="secondary" size="lg" asChild className="hover-lift border-2 border-primary text-primary hover:bg-primary hover:text-white bg-white shadow-lg">
              <Link href="/assessment">בדיקה מהירה בחינם (2 דקות)</Link>
            </Button>
          </div>
          
          <p className="text-base md:text-lg text-text-medium font-body animate-fade-in" style={{ animationDelay: '0.6s' }}>
            מתאים במיוחד למי שהאתר &quot;נראה טוב&quot; — אבל לא מביא פניות איכותיות.
          </p>
        </div>
      </section>

      {/* בעיה → הבטחה */}
      <section className="mb-20 md:mb-32">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary mb-6">
            אם זה נשמע מוכר — את/ה לא לבד
          </h2>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6 mb-8">
            <Card className="p-6 border-l-4 border-accent-sky hover-lift animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <p className="text-lg font-body text-text-dark">
                &quot;אני מסביר/ה מלא… ועדיין לא מבינים מה אני נותן/ת.&quot;
              </p>
            </Card>
            <Card className="p-6 border-l-4 border-accent-lavender hover-lift animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <p className="text-lg font-body text-text-dark">
                &quot;אנשים נכנסים, קוראים קצת, ויוצאים בלי לפנות.&quot;
              </p>
            </Card>
            <Card className="p-6 border-l-4 border-accent-pink hover-lift animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <p className="text-lg font-body text-text-dark">
                &quot;הטקסט &apos;בסדר&apos;, אבל הוא לא נשמע כמוני ולא משדר אמינות.&quot;
              </p>
            </Card>
            <Card className="p-6 border-l-4 border-accent-warm hover-lift animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <p className="text-lg font-body text-text-dark">
                &quot;ניסיתי לבד/עם AI — וזה יצא גנרי או מבולגן.&quot;
              </p>
            </Card>
          </div>
          
          <div className="text-center">
            <p className="text-xl font-body text-text-dark mb-4 font-medium">
              המטרה שלי פשוטה: להפוך שירות מצוין למסר ברור, מסודר ומניע לפעולה.
            </p>
            <p className="text-lg font-body text-text-medium mb-6">
              כזה שמרגיש מקצועי, טבעי, ומוביל את הגולש לצעד הבא בלי לחץ.
            </p>
            <p className="text-base font-body text-text-medium mb-6">
              רוצה לדעת מה הדבר הראשון שהייתי מתקנת אצלך?
            </p>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/assessment">בדיקה מהירה</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* שירותים */}
      <section className="mb-20 md:mb-32 relative">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-sky/5 to-transparent"></div>
        
        <div className="text-center mb-12 relative z-10 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary mb-4">
            איך אני יכולה לעזור
          </h2>
          <p className="text-lg md:text-xl text-text-medium font-body max-w-3xl mx-auto">
            בוחרים מסלול — ואני מסדרת לכם את המסר מקצה לקצה.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <Card className="p-6 hover-lift bg-gradient-to-br from-white to-accent-sky/5 border-2 border-accent-sky/20 animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <h3 className="text-2xl font-heading font-bold text-primary mb-4">
              דף נחיתה שמוכר
            </h3>
            <p className="text-text-dark font-body mb-2">
              מבנה חד + כתיבה מלאה: כותרות, יתרונות, התנגדויות, FAQ, כפתורים וטופס.
            </p>
            <p className="text-text-dark font-body font-medium">
              תוצאה: דף ברור שמוביל לפנייה.
            </p>
          </Card>
          
          <Card className="p-6 hover-lift bg-gradient-to-br from-white to-accent-lavender/5 border-2 border-accent-lavender/20 animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-2xl font-heading font-bold text-primary mb-4">
              תוכן לאתר (בית / אודות / שירותים)
            </h3>
            <p className="text-text-dark font-body mb-4">
              עמודים שמייצרים אמון, מחדדים ערך, ומסבירים מה מקבלים — בלי חפירות.
            </p>
          </Card>
          
          <Card className="p-6 hover-lift bg-gradient-to-br from-white to-accent-pink/5 border-2 border-accent-pink/20 animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-2xl font-heading font-bold text-primary mb-4">
              מודעות וקמפיינים
            </h3>
            <p className="text-text-dark font-body mb-4">
              כותרות, טקסטים וגרסאות קצרות שמתאימות לפייסבוק/גוגל/וואטסאפ סטטוס.
            </p>
          </Card>
          
          <Card className="p-6 hover-lift bg-gradient-to-br from-white to-accent-warm/5 border-2 border-accent-warm/20 animate-scale-in" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-2xl font-heading font-bold text-primary mb-4">
              עריכת לשון וליטוש
            </h3>
            <p className="text-text-dark font-body mb-4">
              יש טקסט קיים? אני מחדדת אותו, מנקה רעש, מתקנת ניסוח ומדייקת טון.
            </p>
          </Card>
        </div>
        
        <div className="text-center mt-8">
          <p className="text-lg font-body text-text-medium mb-4">
            לא בטוחים מה הכי מתאים? הבדיקה המהירה תעזור לבחור מסלול נכון.
          </p>
          <Button variant="secondary" size="lg" asChild>
            <Link href="/assessment">בדיקה מהירה בחינם</Link>
          </Button>
        </div>
      </section>

      {/* לפני/אחרי */}
      <section className="mb-20 md:mb-32">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary mb-4">
            לפני / אחרי — ככה נשמע טקסט שעושה סדר
          </h2>
          <p className="text-lg md:text-xl text-text-medium font-body max-w-3xl mx-auto">
            דוגמה קצרה שממחישה איך שינוי ניסוח משנה את ההחלטה של הלקוח.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="p-6 bg-red-50/80 border-2 border-red-300 hover-lift animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <h3 className="text-xl font-heading font-bold text-red-700 mb-4">לפני</h3>
              <p className="text-text-dark font-body italic">
                &quot;אנחנו מציעים שירות מקצועי ומתקדם שמתאים לכל מי שרוצה לשפר את העסק.
                נשמח לתת לכם יחס אישי וללוות אתכם בדרך…&quot;
              </p>
            </Card>
            
            <Card className="p-6 bg-green-50/80 border-2 border-green-300 hover-lift animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-xl font-heading font-bold text-green-700 mb-4">אחרי</h3>
              <p className="text-text-dark font-body font-medium">
                &quot;רוצים יותר פניות בלי להחליף עסק?
                <br />
                אני מסדרת לכם מסר ברור שמסביר מה אתם נותנים, למי זה מתאים, ומה עושים עכשיו — ואז אנשים פשוט פונים.&quot;
              </p>
            </Card>
          </div>
          
          <div className="text-center">
            <Button variant="primary" size="lg" asChild>
              <Link href="/assessment">רוצה שאבדוק גם את הטקסט שלך?</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* תהליך עבודה */}
      <section className="mb-20 md:mb-32">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary mb-4">
            תהליך עבודה מסודר — בלי כאב ראש
          </h2>
          <p className="text-lg md:text-xl text-text-medium font-body max-w-3xl mx-auto">
            ברור מה קורה, מה צריך ממך, ומתי זה חוזר אליך.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            <Card className="p-6 hover-lift bg-gradient-to-r from-accent-sky/10 to-transparent border-l-4 border-accent-sky animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent-sky text-white flex items-center justify-center font-heading font-bold text-lg shadow-lg">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold text-primary mb-2">שיחה קצרה</h3>
                  <p className="text-text-dark font-body">10–15 דקות להבין מטרה, קהל ויעד.</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 hover-lift bg-gradient-to-r from-accent-lavender/10 to-transparent border-l-4 border-accent-lavender animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent-lavender text-white flex items-center justify-center font-heading font-bold text-lg shadow-lg">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold text-primary mb-2">שאלון ואיסוף חומרים</h3>
                  <p className="text-text-dark font-body">קישור/טקסטים קיימים/דוגמאות — כדי לדייק טון וסגנון.</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 hover-lift bg-gradient-to-r from-accent-pink/10 to-transparent border-l-4 border-accent-pink animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent-pink text-white flex items-center justify-center font-heading font-bold text-lg shadow-lg">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold text-primary mb-2">טיוטה ראשונה</h3>
                  <p className="text-text-dark font-body">תוך X ימי עבודה (בהתאם להיקף).</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 hover-lift bg-gradient-to-r from-accent-warm/10 to-transparent border-l-4 border-accent-warm animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent-warm text-white flex items-center justify-center font-heading font-bold text-lg shadow-lg">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold text-primary mb-2">תיקונים וליטוש</h3>
                  <p className="text-text-dark font-body">1–2 סבבים עד שזה &quot;יושב&quot; בצורה טבעית.</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 hover-lift bg-gradient-to-r from-accent-sky/10 to-transparent border-l-4 border-accent-sky animate-slide-up" style={{ animationDelay: '0.5s' }}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent-sky text-white flex items-center justify-center font-heading font-bold text-lg shadow-lg">
                  5
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold text-primary mb-2">מסירה מסודרת</h3>
                  <p className="text-text-dark font-body">קבצים/טקסטים מוכנים להדבקה + גרסאות לכפתורים/מודעות לפי הצורך.</p>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-lg font-body text-text-medium">
              אתם לא צריכים לדעת &quot;לנסח נכון&quot;. אתם רק צריכים לדעת מה אתם נותנים — ואני כבר אדאג שזה יהיה ברור ומוכר.
            </p>
          </div>
        </div>
      </section>

      {/* חבילות */}
      <section className="mb-20 md:mb-32">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary mb-4">
            חבילות עבודה
          </h2>
          <p className="text-lg md:text-xl text-text-medium font-body">
            שקוף, ברור, בלי הפתעות.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 hover-lift bg-gradient-to-br from-white to-accent-lavender/10 border-2 border-accent-lavender/30 animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <h3 className="text-2xl font-heading font-bold text-primary mb-4">ליטוש מהיר</h3>
            <p className="text-text-dark font-body mb-4">
              עריכת לשון + דיוק מסר + ניקוי ניסוחים גנריים.
            </p>
            <p className="text-lg font-heading font-bold text-primary mb-2">זמן: X ימים</p>
            <p className="text-text-medium font-body">מחיר: החל מ-...</p>
          </Card>
          
          <Card className="p-6 hover-lift bg-gradient-to-br from-accent-sky/10 to-white border-2 border-accent-sky shadow-lg animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <div className="absolute top-2 right-2 bg-accent-sky text-white text-xs px-2 py-1 rounded-full font-bold">
              מומלץ
            </div>
            <h3 className="text-2xl font-heading font-bold text-primary mb-4">דף נחיתה מלא</h3>
            <p className="text-text-dark font-body mb-4">
              מבנה + כתיבה מלאה + CTA + FAQ + טופס.
            </p>
            <p className="text-lg font-heading font-bold text-primary mb-2">זמן: X ימים</p>
            <p className="text-text-medium font-body">מחיר: החל מ-...</p>
          </Card>
          
          <Card className="p-6 hover-lift bg-gradient-to-br from-white to-accent-pink/10 border-2 border-accent-pink/30 animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-2xl font-heading font-bold text-primary mb-4">תוכן לאתר (3–5 עמודים)</h3>
            <p className="text-text-dark font-body mb-4">
              בית / אודות / שירותים (+ צור קשר/FAQ לפי צורך).
            </p>
            <p className="text-lg font-heading font-bold text-primary mb-2">מחיר: טווח/החל מ</p>
          </Card>
        </div>
        
        <div className="text-center mt-8">
          <p className="text-lg font-body text-text-medium mb-4">
            לקבלת הצעה מדויקת — שלחו לי קישור/2 משפטים בוואטסאפ, ואחזור עם כיוון ותמחור.
          </p>
          <Button variant="primary" size="lg" asChild>
            <a href="https://wa.me/972501234567" target="_blank" rel="noopener noreferrer">
              דברו איתי בוואטסאפ
            </a>
          </Button>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-20 md:mb-32 relative">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-lavender/5 to-transparent"></div>
        
        <div className="text-center mb-12 relative z-10 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary mb-4">
            שאלות נפוצות
          </h2>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-4 relative z-10">
          {mockFAQs.map((faq, index) => (
            <div key={faq.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <FAQItem question={faq.question_he} answer={faq.answer_he} />
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center mb-16 md:mb-24">
        <Card className="bg-gradient-to-br from-primary/10 via-accent-lavender/10 to-accent-pink/10 border-2 border-primary/20 relative overflow-hidden animate-fade-in">
          {/* Decorative gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
          <div className="relative py-12 md:py-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary mb-6 tracking-tight">
              מוכנים להפוך את המסר לברור?
            </h2>
            <p className="text-lg md:text-xl text-text-medium mb-10 font-body max-w-3xl mx-auto">
              שלחו לי קישור/כמה שורות, ואני אגיד לכם מה הדבר הראשון שהייתי מתקנת כדי להביא יותר פניות איכותיות.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg" asChild className="hover-lift">
                <a href="https://wa.me/972501234567" target="_blank" rel="noopener noreferrer">
                  דברו איתי בוואטסאפ
                </a>
              </Button>
              <Button variant="secondary" size="lg" asChild className="hover-lift border-2 border-primary text-primary hover:bg-primary hover:text-white bg-white shadow-lg">
                <Link href="/assessment">בדיקה מהירה בחינם</Link>
              </Button>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
