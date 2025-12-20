import { Metadata } from 'next';
import { AccessibilityContent } from '@/components/legal/AccessibilityContent';

export const metadata: Metadata = {
  title: 'הצהרת נגישות',
  description: 'הצהרת נגישות אתר מעבדת שיניים',
};

export default function AccessibilityPage() {
  return <AccessibilityContent />;
}
