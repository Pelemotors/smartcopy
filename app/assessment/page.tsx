import { Metadata } from 'next';
import { AssessmentContent } from '@/components/assessment/AssessmentContent';

export const metadata: Metadata = {
  title: 'בדיקה מהירה - Sarit Hadar',
  description: '2 דקות מילוי — ואת/ה מקבל/ת כיוון ברור להמשך. בדיקה מהירה של הטקסט שלך',
};

export default function AssessmentPage() {
  return <AssessmentContent />;
}

