import { Metadata } from 'next';
import { TestimonialsContent } from '@/components/testimonials/TestimonialsContent';

export const metadata: Metadata = {
  title: 'לקוחות מספרים - Sarit Hadar',
  description: 'מילים של לקוחות אחרי שהמסר התחדד והכול נהיה ברור יותר',
};

export default function TestimonialsPage() {
  return <TestimonialsContent />;
}

