import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { PageEditor } from './PageEditor';
import { supabaseServer } from '@/lib/supabaseServerClient';

export const metadata: Metadata = {
  title: 'עריכת עמוד - מנהל',
  description: 'עריכת עמוד ותוכן',
};

async function getPage(id: string) {
  try {
    const { data, error } = await supabaseServer
      .from('pages')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return null;
    }

    // Get blocks for this page
    const { data: blocks } = await supabaseServer
      .from('page_blocks')
      .select('*, block_types(*)')
      .eq('page_id', id)
      .order('order_index', { ascending: true });

    return { ...data, blocks: blocks || [] };
  } catch (error) {
    console.error('Error fetching page:', error);
    return null;
  }
}

export default async function EditPagePage({ params }: { params: { id: string } }) {
  const page = await getPage(params.id);

  if (!page) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-heading font-bold text-text-dark">
          עריכת עמוד: {page.title_he}
        </h1>
        <p className="text-text-medium font-body mt-2">
          /{page.slug}
        </p>
      </div>

      <PageEditor page={page} />
    </div>
  );
}

