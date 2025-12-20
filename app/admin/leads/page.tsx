import { Metadata } from 'next';
import { Card } from '@/components/ui/Card';
import { supabaseServer } from '@/lib/supabaseServerClient';
import { LeadsTable } from './LeadsTable';

export const metadata: Metadata = {
  title: 'ניהול לידים - מנהל',
  description: 'ניהול לידים',
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

export default async function LeadsPage() {
  const leads = await getLeads();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-heading font-bold text-text-dark">
          ניהול לידים
        </h1>
        <button className="bg-accent-sky hover:bg-accent-lavender text-text-dark px-6 py-3 rounded-lg font-heading font-medium transition-all">
          ייצוא ל-CSV
        </button>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="flex flex-wrap gap-4">
          <select className="px-4 py-2 rounded-lg border-2 border-accent-sky bg-white">
            <option value="">כל הסטטוסים</option>
            <option value="new">חדש</option>
            <option value="contacted">נוצר קשר</option>
            <option value="converted">הומר</option>
            <option value="archived">בארכיון</option>
          </select>
          <input
            type="text"
            placeholder="חיפוש לפי שם או טלפון..."
            className="px-4 py-2 rounded-lg border-2 border-accent-sky bg-white flex-grow"
          />
        </div>
      </Card>

      {/* Leads Table */}
      <LeadsTable initialLeads={leads} />
    </div>
  );
}

