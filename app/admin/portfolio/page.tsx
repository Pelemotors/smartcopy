import { Metadata } from 'next';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { supabaseServer } from '@/lib/supabaseServerClient';
import { requireAdminSession } from '@/lib/adminSession';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'ניהול תיק עבודות - מנהל',
  description: 'ניהול פרויקטים ותיק עבודות',
};

async function getPortfolioItems() {
  try {
    const { data, error } = await supabaseServer
      .from('portfolio_items')
      .select('*, portfolio_categories(*)')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching portfolio:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    return [];
  }
}

export default async function PortfolioPage() {
  // בדיקת session - אם אין session, redirect ל-/admin/login
  await requireAdminSession();
  
  const items = await getPortfolioItems();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-heading font-bold text-text-dark">
          ניהול תיק עבודות
        </h1>
        <Button variant="primary" asChild>
          <Link href="/admin/portfolio/new">פרויקט חדש</Link>
        </Button>
      </div>

      {items.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-lg text-text-medium font-body mb-6">
            עדיין לא נוצרו פרויקטים.
          </p>
          <Button variant="primary" asChild>
            <Link href="/admin/portfolio/new">צור פרויקט ראשון</Link>
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item: any) => (
            <Card key={item.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-heading font-bold text-primary">
                  {item.title_he}
                </h3>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  item.is_published 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {item.is_published ? 'פורסם' : 'טיוטה'}
                </span>
              </div>
              <p className="text-sm text-text-medium font-body mb-2">
                {item.portfolio_categories?.name_he}
              </p>
              <p className="text-sm text-text-medium font-body mb-4">
                {item.niche}
              </p>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" asChild>
                  <Link href={`/admin/portfolio/${item.id}/edit`}>עריכה</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

