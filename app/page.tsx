import { Metadata } from 'next';
import { FinanceCalculator } from '@/components/finance/FinanceCalculator';

export const metadata: Metadata = {
  title: 'מחשבון מימון רכב',
  description: 'חשב את החזר המימון החודשי שלך בצורה פשוטה ומהירה. תמיכה במסלולי רגיל, בלון ושפיצר.',
};

// Static page - no need for dynamic data since we're using mock rules
export const dynamic = 'force-static';

export default function Home() {
  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <FinanceCalculator />
    </main>
  );
}
