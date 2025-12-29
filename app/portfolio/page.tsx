import { Metadata } from 'next';
import { mockPortfolioItems } from '@/lib/mockData';
import { PortfolioClient } from './PortfolioClient';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  title: 'תיק עבודות - Sarit Hadar',
  description: 'דוגמאות לפרויקטים של כתיבת תוכן ועריכת לשון. תיק עבודות עם פרויקטים מובילים',
  openGraph: {
    title: 'תיק עבודות - Sarit Hadar',
    description: 'דוגמאות לפרויקטים של כתיבת תוכן ועריכת לשון',
    url: `${baseUrl}/portfolio`,
    siteName: 'Sarit Hadar',
    locale: 'he_IL',
    type: 'website',
  },
};

export default function PortfolioPage() {
  // Use mock data when Supabase is not connected
  const portfolioItems = mockPortfolioItems.filter((item) => item.is_published);

  const categories = [
    { id: 'all', name: 'הכל' },
    { id: 'landing-pages', name: 'דפי נחיתה' },
    { id: 'website-content', name: 'תוכן לאתרים' },
    { id: 'ads', name: 'מודעות' },
    { id: 'editing', name: 'עריכת לשון' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary mb-4">
            תיק עבודות
          </h1>
          <p className="text-lg md:text-xl text-text-medium font-body max-w-3xl mx-auto">
            דוגמאות לעבודות (חלק מהפרויקטים מוצגים אנונימית לפי בקשת הלקוחות).
            <br />
            כל פרויקט כאן מדגים תהליך: בעיה → מה שינינו → מה זה יצר.
          </p>
        </div>

        <PortfolioClient initialItems={portfolioItems} />
      </div>
    </div>
  );
}

