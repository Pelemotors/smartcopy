'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';

export function AccessibilityContent() {
  const { t } = useLanguage();

  const isRTL = t.legal.accessibility.dir === 'rtl';

  return (
    <div className="container mx-auto px-4 py-8 md:py-16 max-w-4xl">
      <div className={isRTL ? 'text-right' : 'text-left'}>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary mb-8 tracking-tight">
          {t.legal.accessibility.title}
        </h1>

        <section className="space-y-4 mb-8">
          <p className="text-text-medium font-body text-lg leading-relaxed">
            {t.legal.accessibility.intro}
          </p>
        </section>

        <section className="space-y-3 mb-8">
          <h2 className="text-2xl md:text-3xl font-heading font-semibold text-primary">
            {t.legal.accessibility.section1.title}
          </h2>
          <ul className={`list-disc space-y-2 text-text-medium font-body leading-relaxed ${t.legal.accessibility.dir === 'rtl' ? 'pr-5' : 'pl-5'}`}>
            {t.legal.accessibility.section1.items.map((item: string, index: number) => (
              <li key={index}>
                <strong>{item.split(':')[0]}:</strong> {item.split(':')[1] || item}
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-3 mb-8">
          <h2 className="text-2xl md:text-3xl font-heading font-semibold text-primary">
            {t.legal.accessibility.section2.title}
          </h2>
          <ul className={`list-disc space-y-2 text-text-medium font-body leading-relaxed ${t.legal.accessibility.dir === 'rtl' ? 'pr-5' : 'pl-5'}`}>
            {t.legal.accessibility.section2.items.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="space-y-3 mb-8">
          <h2 className="text-2xl md:text-3xl font-heading font-semibold text-primary">
            {t.legal.accessibility.section3.title}
          </h2>
          <p className="text-text-medium font-body leading-relaxed">
            {t.legal.accessibility.section3.content}
          </p>
        </section>

        <section className="space-y-3 mb-8">
          <h2 className="text-2xl md:text-3xl font-heading font-semibold text-primary">
            {t.legal.accessibility.section4.title}
          </h2>
          <p className="text-text-medium font-body leading-relaxed">
            {t.legal.accessibility.section4.content}
          </p>
          <ul className={`list-disc space-y-1 text-text-medium font-body leading-relaxed ${t.legal.accessibility.dir === 'rtl' ? 'pr-5' : 'pl-5'}`}>
            {t.legal.accessibility.section4.contact.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <p className="text-text-medium font-body leading-relaxed mt-4">
            {t.legal.accessibility.section4.commitment}
          </p>
        </section>

        <p className="text-sm text-text-light font-body mt-8">
          {t.legal.accessibility.lastUpdated}: {new Date().toLocaleDateString(t.legal.accessibility.dir === 'rtl' ? 'he-IL' : 'ru-RU')}
        </p>
      </div>
    </div>
  );
}

