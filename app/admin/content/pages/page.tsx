import { Metadata } from 'next';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { supabaseServer } from '@/lib/supabaseServerClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'ניהול עמודים - מנהל',
  description: 'ניהול עמודים ותוכן',
};

async function getPages() {
  try {
    const { data, error } = await supabaseServer
      .from('pages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching pages:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching pages:', error);
    return [];
  }
}

export default async function PagesPage() {
  const pages = await getPages();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-heading font-bold text-text-dark">
          ניהול עמודים
        </h1>
        <Button variant="primary" asChild>
          <Link href="/admin/content/pages/new">עמוד חדש</Link>
        </Button>
      </div>

      {pages.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-lg text-text-medium font-body mb-6">
            עדיין לא נוצרו עמודים.
          </p>
          <Button variant="primary" asChild>
            <Link href="/admin/content/pages/new">צור עמוד ראשון</Link>
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pages.map((page: any) => (
            <Card key={page.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-heading font-bold text-primary">
                  {page.title_he}
                </h3>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  page.status === 'published' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {page.status === 'published' ? 'פורסם' : 'טיוטה'}
                </span>
              </div>
              <p className="text-sm text-text-medium font-body mb-4">
                /{page.slug}
              </p>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" asChild>
                  <Link href={`/admin/content/pages/${page.id}`}>עריכה</Link>
                </Button>
                <Button variant="secondary" size="sm" asChild>
                  <Link href={`/${page.slug}`} target="_blank">צפייה</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

