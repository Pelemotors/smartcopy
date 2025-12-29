import { Metadata } from 'next';
import { Card } from '@/components/ui/Card';
import { AnalyticsDashboard } from './AnalyticsDashboard';
import { supabaseServer } from '@/lib/supabaseServerClient';

export const metadata: Metadata = {
  title: 'Analytics - מנהל',
  description: 'ניתוח ביצועים',
};

async function getAnalyticsData() {
  try {
    // Get sessions count
    const { count: sessionsCount } = await supabaseServer
      .from('sessions')
      .select('*', { count: 'exact', head: true });

    // Get pageviews count
    const { count: pageviewsCount } = await supabaseServer
      .from('analytics_events')
      .select('*', { count: 'exact', head: true })
      .eq('event_type', 'page_view');

    // Get conversions
    const { count: whatsappClicks } = await supabaseServer
      .from('analytics_events')
      .select('*', { count: 'exact', head: true })
      .eq('event_type', 'cta_whatsapp_click');

    const { count: formSubmits } = await supabaseServer
      .from('analytics_events')
      .select('*', { count: 'exact', head: true })
      .in('event_type', ['quick_audit_submit', 'lead_form_submit', 'contact_form_submit']);

    // Get top pages
    const { data: topPages } = await supabaseServer
      .from('analytics_events')
      .select('page_path')
      .eq('event_type', 'page_view')
      .limit(10);

    // Get traffic sources
    const { data: sources } = await supabaseServer
      .from('sessions')
      .select('utm_source, utm_medium')
      .not('utm_source', 'is', null)
      .limit(20);

    return {
      sessions: sessionsCount || 0,
      pageviews: pageviewsCount || 0,
      whatsappClicks: whatsappClicks || 0,
      formSubmits: formSubmits || 0,
      topPages: topPages || [],
      sources: sources || [],
    };
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return {
      sessions: 0,
      pageviews: 0,
      whatsappClicks: 0,
      formSubmits: 0,
      topPages: [],
      sources: [],
    };
  }
}

export default async function AnalyticsPage() {
  const data = await getAnalyticsData();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-heading font-bold text-text-dark">
          Analytics Dashboard
        </h1>
      </div>

      <AnalyticsDashboard initialData={data} />
    </div>
  );
}

