import { HomeContent } from '@/components/home/HomeContent';

export default async function Home() {
  // כל התכנים סטטיים - ללא Supabase
  const programs: any[] = [];
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com';
  
  const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'מעבדת שיניים מקצועית בישראל',
    description: 'מעבדת שיניים מובילה בישראל - ייצור תותבות, כתרים, גשרים ושיקום שיניים. טכנולוגיות CAD/CAM, חומרים איכותיים ושירות מקצועי',
    url: baseUrl,
    serviceType: [
      'תותבות שיניים',
      'כתרי זירקוניה',
      'כתרי E-max',
      'גשרים דנטליים',
      'שיקום שיניים',
      'CAD/CAM',
      'מדפסות תלת-ממד',
    ],
    areaServed: {
      '@type': 'Country',
      name: 'ישראל',
      '@id': 'https://www.wikidata.org/wiki/Q801',
    },
    inLanguage: 'he-IL',
    availableLanguage: ['he-IL'],
    keywords: 'טכנאי שיניים, מעבדת שיניים, תותבות, כתרים, גשרים, שיקום שיניים, CAD/CAM, זירקוניה, E-max',
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
