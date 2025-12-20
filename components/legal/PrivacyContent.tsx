'use client';

import { Card } from '@/components/ui/Card';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export function PrivacyContent() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary mb-4 tracking-tight">
            {t.legal.privacy.title}
          </h1>
        </div>

        <Card className="border border-secondary/10 bg-white">
          <div className={`prose prose-lg max-w-none font-body text-text-medium ${t.legal.privacy.dir === 'rtl' ? 'text-right' : 'text-left'}`}>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-4">
              {t.legal.privacy.section1.title}
            </h2>
            <p className="mb-6 leading-relaxed">
              {t.legal.privacy.section1.content}
            </p>

            <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-4 mt-8">
              {t.legal.privacy.section2.title}
            </h2>
            <p className="mb-6 leading-relaxed">
              {t.legal.privacy.section2.content}
            </p>

            <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-4 mt-8">
              {t.legal.privacy.section3.title}
            </h2>
            <p className="mb-6 leading-relaxed">
              {t.legal.privacy.section3.content}
            </p>

            <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-4 mt-8">
              {t.legal.privacy.section4.title}
            </h2>
            <p className="mb-6 leading-relaxed">
              {t.legal.privacy.section4.content}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

