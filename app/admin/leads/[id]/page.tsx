import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LeadDetail } from './LeadDetail';
import { supabaseServer } from '@/lib/supabaseServerClient';

export const metadata: Metadata = {
  title: 'פרטי ליד - מנהל',
  description: 'פרטי ליד',
};

async function getLead(id: string) {
  try {
    const { data, error } = await supabaseServer
      .from('leads')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return null;
    }

    // Get lead events
    const { data: events } = await supabaseServer
      .from('lead_events')
      .select('*')
      .eq('lead_id', id)
      .order('created_at', { ascending: false });

    // Get lead notes
    const { data: notes } = await supabaseServer
      .from('lead_notes')
      .select('*')
      .eq('lead_id', id)
      .order('created_at', { ascending: false });

    // Get lead tags
    const { data: tags } = await supabaseServer
      .from('lead_tags')
      .select('*')
      .eq('lead_id', id);

    // Get lead tasks
    const { data: tasks } = await supabaseServer
      .from('lead_tasks')
      .select('*')
      .eq('lead_id', id)
      .order('created_at', { ascending: false });

    return {
      ...data,
      events: events || [],
      notes: notes || [],
      tags: tags || [],
      tasks: tasks || [],
    };
  } catch (error) {
    console.error('Error fetching lead:', error);
    return null;
  }
}

export default async function LeadDetailPage({ params }: { params: { id: string } }) {
  const lead = await getLead(params.id);

  if (!lead) {
    notFound();
  }

  return <LeadDetail lead={lead} />;
}

