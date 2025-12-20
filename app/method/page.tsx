import { Metadata } from 'next';
import { MethodContent } from '@/components/method/MethodContent';

export const metadata: Metadata = {
  title: 'תהליך העבודה - טכנאי שיניים מקצועי',
  description: 'תהליך מקצועי ומסודר ליצירת תותבות, כתרים, גשרים ושיקום שיניים איכותי',
};

export default function MethodPage() {
  return <MethodContent />;
}


