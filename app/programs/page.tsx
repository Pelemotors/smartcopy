import { Metadata } from 'next';
import { ProgramsContent } from '@/components/programs/ProgramsContent';

export const metadata: Metadata = {
  title: 'שירותי שיקום שיניים - טכנאי שיניים מקצועי',
  description: 'תותבות, כתרים, גשרים ושיקום שיניים מקצועי - שירותים איכותיים ומותאמים אישית',
};

export default function ProgramsPage() {
  return <ProgramsContent />;
}

