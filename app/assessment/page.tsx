import { Metadata } from 'next';
import { AssessmentContent } from '@/components/assessment/AssessmentContent';

export const metadata: Metadata = {
  title: 'הערכת צרכים לשירותי שיניים - שאלון אבחון חינם',
  description: 'ענו על 7 שאלות קצרות וקבלו הערכה מותאמת אישית על הצרכים שלכם בשירותי שיניים',
};

export default function AssessmentPage() {
  return <AssessmentContent />;
}

