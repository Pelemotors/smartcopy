'use client';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';

// מידע סטטי על התוכניות - ללא Supabase
const staticPrograms = [
  {
    id: 1,
    name_he: 'תוכנית שיקום בסיסית',
    description_he: 'תוכנית מקיפה לשיקום שיניים בסיסי עם כתרים ותותבות איכותיים.',
    features_he: [
      'כתרי זירקוניה',
      'תותבות חלקיות',
      'גשרים בסיסיים',
      'ליווי מקצועי',
    ],
  },
  {
    id: 2,
    name_he: 'תוכנית שיקום מתקדמת',
    description_he: 'תוכנית מקיפה לשיקום שיניים מתקדם עם טכנולוגיות מהשורה הראשונה.',
    features_he: [
      'כתרי E-max',
      'תותבות על שתלים',
      'גשרי זירקוניה',
      'שיקום מלא',
      'תמיכה 24/7',
    ],
  },
];

export function ProgramsContent() {
  const { t } = useLanguage();
  const programs = staticPrograms;

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary mb-4 tracking-tight">
          {t.programs.title}
        </h1>
      </div>

      {programs.length === 0 ? (
        <Card className="text-center py-12 border border-secondary/10 bg-white">
          <p className="text-text-medium font-body text-lg">
            {t.programs.comingSoon}
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {programs.map((program: any, index: number) => (
            <Card 
              key={program.id} 
              className={`flex flex-col border border-secondary/10 bg-white ${index === programs.length - 1 ? 'border-primary/30 ring-2 ring-primary/10' : ''}`}
            >
              {index === programs.length - 1 && (
                <div className="mb-4">
                  <span className="bg-accent text-white px-4 py-1.5 rounded-full text-sm font-heading font-semibold">
                    {t.programs.recommended}
                  </span>
                </div>
              )}
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-4 tracking-tight">
                {program.name_he}
              </h2>
              <p className="text-text-medium font-body text-base md:text-lg mb-4 flex-grow">
                {program.description_he}
              </p>
              <ul className="space-y-2 text-text-light font-body mb-6">
                {program.features_he?.map((feature: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-accent mt-1">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button variant="primary" size="lg" asChild className="mt-auto">
                <Link href="/contact">{t.common.forMoreDetails}</Link>
              </Button>
            </Card>
          ))}
        </div>
      )}

      <div className="text-center mt-12 md:mt-16">
        <p className="text-text-medium font-body text-lg md:text-xl mb-6">
          {t.programs.notSureText}
        </p>
        <Button variant="secondary" size="lg" asChild>
          <Link href="/assessment">{t.common.freeAssessment}</Link>
        </Button>
      </div>
    </div>
  );
}

