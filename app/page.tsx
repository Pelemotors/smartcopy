import { Metadata } from 'next';
import { HomeContent } from '@/components/home/HomeContent';

export const metadata: Metadata = {
  title: 'Sarit Hadar - כתיבת תוכן ועריכת לשון',
  description: 'כתיבת תוכן שיווקי ועריכת לשון לעסקים: דפי נחיתה, אתרים, מודעות ומיקרו־קופי. מדויק, נקי, אנושי — בלי מילים מפוצצות ובלי טעויות.',
};

export default function Home() {
  // כל התכנים סטטיים - ללא Supabase
  const programs: any[] = [];
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com';
  
  const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Sarit Hadar - כתיבת תוכן ועריכת לשון',
    description: 'כתיבת תוכן שיווקי ועריכת לשון לעסקים: דפי נחיתה, אתרים, מודעות ומיקרו־קופי. מדויק, נקי, אנושי — בלי מילים מפוצצות ובלי טעויות.',
    url: baseUrl,
    serviceType: [
      'כתיבת תוכן שיווקי',
      'עריכת לשון',
      'דפי נחיתה',
      'תוכן לאתרים',
      'מודעות וקמפיינים',
      'מיקרו־קופי',
    ],
    areaServed: {
      '@type': 'Country',
      name: 'ישראל',
      '@id': 'https://www.wikidata.org/wiki/Q801',
    },
    inLanguage: 'he-IL',
    availableLanguage: ['he-IL'],
    keywords: 'כתיבת תוכן, עריכת לשון, דפי נחיתה, תוכן שיווקי, כתיבה לעסקים, עריכת טקסטים',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />
      <HomeContent programs={programs} />
    </>
  );
}
