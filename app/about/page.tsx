import { Metadata } from 'next';
import { AboutContent } from '@/components/about/AboutContent';

export const metadata: Metadata = {
  title: 'אודות המעבדה - טכנאי שיניים מקצועי',
  description: 'מעבדת שיניים מקצועית עם ניסיון רב שנים ביצירת תותבות, כתרים, גשרים ושיקום שיניים',
};

export default function AboutPage() {
  return <AboutContent />;
}

