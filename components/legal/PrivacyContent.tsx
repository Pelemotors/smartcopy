'use client';

import { Card } from '@/components/ui/Card';

export function PrivacyContent() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary mb-4 tracking-tight">
            מדיניות פרטיות
          </h1>
        </div>

        <Card className="border border-secondary/10 bg-white">
          <div className="prose prose-lg max-w-none font-body text-text-medium text-right p-8 md:p-12">
            <p className="mb-6 leading-relaxed">
              האתר אוסף פרטים שמוזנים בטפסים (שם, טלפון, לעיתים אימייל והודעה) לצורך יצירת קשר ומתן מענה.
            </p>
            <p className="mb-6 leading-relaxed">
              הפרטים לא יימסרו לצד שלישי, ולא ישמשו לדיוור ללא הסכמה.
            </p>
            <p className="mb-6 leading-relaxed">
              ניתן לבקש מחיקה/עדכון של מידע על ידי פנייה ל-<a href="mailto:contact@example.com" className="text-accent-sky hover:underline">contact@example.com</a>.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
