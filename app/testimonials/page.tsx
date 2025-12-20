import { Metadata } from 'next';
import { TestimonialsContent } from '@/components/testimonials/TestimonialsContent';

export const metadata: Metadata = {
  title: 'המלצות - מה אומרים עלינו',
  description: 'המלצות מלקוחות שעברו את התהליך עם מעבדת השיניים',
};

export default function TestimonialsPage() {
  return <TestimonialsContent />;
}

