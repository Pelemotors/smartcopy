'use client';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export function TestimonialsContent() {
  const { t } = useLanguage();

  // TODO: Fetch from Supabase when database is ready
  const testimonials = [
    {
      name: 'דוד',
      serviceType: 'תותבות',
      text: 'עבודה מקצועית ומדויקת. התותבות שהכינו לי מושלמות ונוחות מאוד. ממליץ בחום!',
      rating: 5,
    },
    {
      name: 'רחל',
      serviceType: 'כתרים',
      text: 'שירות מעולה, עבודה מדויקת ותוצאה מושלמת. המעבדה מקצועית מאוד ואני מאוד מרוצה.',
      rating: 5,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary mb-4 tracking-tight">
          {t.testimonials.title}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="border border-secondary/10 bg-white">
            <div className="mb-4">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <span key={i} className="text-yellow-400 text-xl">★</span>
              ))}
            </div>
            <p className="text-text-medium font-body text-lg leading-relaxed mb-4">
              &quot;{testimonial.text}&quot;
            </p>
            <div className="text-primary font-heading font-semibold">
              {testimonial.name} - {testimonial.serviceType}
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12 md:mt-16">
        <p className="text-text-medium font-body text-lg md:text-xl mb-6">
          {t.testimonials.wantToBeNext}
        </p>
        <Button variant="primary" size="lg" asChild>
          <Link href="/contact">{t.common.contactUs}</Link>
        </Button>
      </div>
    </div>
  );
}

