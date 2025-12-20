import { Metadata } from 'next';
import { Button } from '@/components/ui/Button';
import { supabaseServer } from '@/lib/supabaseServerClient';
import { ProgramsList } from './ProgramsList';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'ניהול מסלולים - מנהל',
  description: 'ניהול מסלולים ושירותים',
};

async function getPrograms() {
  try {
    const { data, error } = await supabaseServer
      .from('programs')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching programs:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching programs:', error);
    return [];
  }
}

export default async function ProgramsPage() {
  const programs = await getPrograms();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-heading font-bold text-text-dark">
          ניהול מסלולים
        </h1>
        <Button variant="primary" size="md" asChild>
          <Link href="/admin/programs/new">מסלול חדש</Link>
        </Button>
      </div>

      <ProgramsList initialPrograms={programs} />
    </div>
  );
}

