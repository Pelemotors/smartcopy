import { Metadata } from 'next';
import { TermsContent } from '@/components/legal/TermsContent';

export const metadata: Metadata = {
  title: 'תנאי שימוש',
  description: 'תנאי השימוש של אתר מעבדת שיניים',
};

export default function TermsPage() {
  return <TermsContent />;
}

