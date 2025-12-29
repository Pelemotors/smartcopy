import { Metadata } from 'next';
import { Card } from '@/components/ui/Card';
import { NewPageForm } from './NewPageForm';

export const metadata: Metadata = {
  title: 'עמוד חדש - מנהל',
  description: 'יצירת עמוד חדש',
};

export default function NewPagePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-heading font-bold text-text-dark">
          עמוד חדש
        </h1>
      </div>

      <Card className="p-6 md:p-8">
        <NewPageForm />
      </Card>
    </div>
  );
}

