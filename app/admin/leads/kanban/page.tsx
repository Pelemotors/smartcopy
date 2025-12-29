import { Metadata } from 'next';
import { Card } from '@/components/ui/Card';
import { LeadsKanban } from './LeadsKanban';
import { supabaseServer } from '@/lib/supabaseServerClient';

export const metadata: Metadata = {
  title: 'לידים - Kanban - מנהל',
  description: 'ניהול לידים ב-Kanban',
};

async function getLeads() {
  try {
    const { data, error } = await supabaseServer
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching leads:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching leads:', error);
    return [];
  }
}

export default async function LeadsKanbanPage() {
  const leads = await getLeads();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-heading font-bold text-text-dark">
          ניהול לידים - Kanban
        </h1>
      </div>

      <LeadsKanban initialLeads={leads} />
    </div>
  );
}

