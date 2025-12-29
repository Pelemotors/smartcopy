'use client';

import Image from 'next/image';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export function AboutContent() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary mb-6 tracking-tight">
            נעים להכיר, שרית הדר
          </h1>
        </div>

        <Card className="mb-12 border border-secondary/10 bg-white p-8 md:p-12 hover-lift animate-slide-up">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* תמונת שרית */}
            <div className="flex-shrink-0 w-full md:w-80">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-xl border-4 border-accent-lavender/20 animate-float">
                <Image
                  src="/images/sarit.jpg"
                  alt="שרית הדר - כותבת תוכן ועורכת לשון"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 320px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
              </div>
            </div>

            {/* טקסט */}
            <div className="prose prose-lg max-w-none flex-1">
              <p className="text-lg md:text-xl text-text-dark font-body leading-relaxed mb-6">
                אני כותבת תוכן שיווקי ועורכת לשון לעסקים. המטרה שלי היא להפוך שירות טוב למסרים ברורים שמביאים פניות — בצורה נעימה ומסודרת.
              </p>
              <p className="text-lg md:text-xl text-text-dark font-body leading-relaxed mb-6">
                אני אוהבת כתיבה נקייה: מעט מילים, הרבה משמעות. בלי "מילים מפוצצות", בלי רעש, ובלי טקסט שמרגיש גנרי.
              </p>
              <p className="text-lg md:text-xl text-text-dark font-body leading-relaxed mb-6">
                כתיבה טובה לא אמורה להרשים — היא אמורה להסביר. כשהלקוח מבין מהר מה הוא מקבל ולמה זה מתאים לו, הרבה התנגדויות נעלמות לבד.
              </p>
              <p className="text-lg md:text-xl text-text-dark font-body leading-relaxed mb-8">
                אם האתר שלך נראה טוב אבל לא מביא פניות, אם הטקסט לא נשמע "כמוך", או אם נמאס לך להסביר שוב ושוב — זה בדיוק המקום שאני נכנסת אליו.
              </p>
              
              <div className="text-center md:text-right">
                <p className="text-lg font-body text-text-medium mb-4">
                  רוצה שאסתכל על העמוד שלך ואגיד מה הדבר הראשון שהייתי מתקנת?
                </p>
                <Button variant="primary" size="lg" asChild className="animate-scale-in">
                  <a href="https://wa.me/972501234567" target="_blank" rel="noopener noreferrer">
                    דברו איתי בוואטסאפ
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
