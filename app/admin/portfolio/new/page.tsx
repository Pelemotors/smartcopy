import { Metadata } from 'next';
import { Card } from '@/components/ui/Card';
import { NewPortfolioForm } from './NewPortfolioForm';
import { supabaseServer } from '@/lib/supabaseServerClient';

export const metadata: Metadata = {
  title: 'פרויקט חדש - מנהל',
  description: 'יצירת פרויקט חדש',
};

async function getCategories() {
  try {
    const { data } = await supabaseServer
      .from('portfolio_categories')
      .select('*')
      .order('order_index', { ascending: true });

    return data || [];
  } catch (error) {
    return [];
  }
}

export default async function NewPortfolioPage() {
  const categories = await getCategories();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-heading font-bold text-text-dark">
          פרויקט חדש
        </h1>
      </div>

      <Card className="p-6 md:p-8">
        <NewPortfolioForm categories={categories} />
      </Card>
    </div>
  );
}

