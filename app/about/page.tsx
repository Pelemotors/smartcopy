import { Metadata } from 'next';
import { AboutContent } from '@/components/about/AboutContent';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com';

export const metadata: Metadata = {
  title: 'אודות - Sarit Hadar',
  description: 'נעים להכיר, שרית הדר. כתיבת תוכן שיווקי ועריכת לשון לעסקים - נקי, מדויק ואנושי',
  openGraph: {
    title: 'אודות - Sarit Hadar',
    description: 'נעים להכיר, שרית הדר. כתיבת תוכן שיווקי ועריכת לשון לעסקים',
    url: `${baseUrl}/about`,
    siteName: 'Sarit Hadar',
    locale: 'he_IL',
    type: 'website',
  },
};

export default function AboutPage() {
  return <AboutContent />;
}

