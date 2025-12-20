import { Metadata } from 'next';
import { PrivacyContent } from '@/components/legal/PrivacyContent';

export const metadata: Metadata = {
  title: 'מדיניות פרטיות',
  description: 'מדיניות הפרטיות של אתר מעבדת שיניים',
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}

