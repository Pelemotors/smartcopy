'use client';

import { Card } from '@/components/ui/Card';

interface AnalyticsDashboardProps {
  initialData: {
    sessions: number;
    pageviews: number;
    whatsappClicks: number;
    formSubmits: number;
    topPages: any[];
    sources: any[];
  };
}

export function AnalyticsDashboard({ initialData }: AnalyticsDashboardProps) {
  return (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-heading font-semibold text-text-dark mb-2">
            Sessions
          </h3>
          <p className="text-3xl font-heading font-bold text-accent-sky">
            {initialData.sessions}
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-heading font-semibold text-text-dark mb-2">
            Pageviews
          </h3>
          <p className="text-3xl font-heading font-bold text-accent-lavender">
            {initialData.pageviews}
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-heading font-semibold text-text-dark mb-2">
            WhatsApp Clicks
          </h3>
          <p className="text-3xl font-heading font-bold text-accent-pink">
            {initialData.whatsappClicks}
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-heading font-semibold text-text-dark mb-2">
            Form Submits
          </h3>
          <p className="text-3xl font-heading font-bold text-text-dark">
            {initialData.formSubmits}
          </p>
        </Card>
      </div>

      {/* Top Pages */}
      <Card className="p-6">
        <h2 className="text-2xl font-heading font-bold text-primary mb-4">
          Top Pages
        </h2>
        <div className="space-y-2">
          {initialData.topPages.length === 0 ? (
            <p className="text-text-medium font-body">אין נתונים</p>
          ) : (
            initialData.topPages.map((page, index) => (
              <div key={index} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                <span className="font-body text-text-dark">{page.page_path || '/'}</span>
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Traffic Sources */}
      <Card className="p-6">
        <h2 className="text-2xl font-heading font-bold text-primary mb-4">
          Traffic Sources
        </h2>
        <div className="space-y-2">
          {initialData.sources.length === 0 ? (
            <p className="text-text-medium font-body">אין נתונים</p>
          ) : (
            initialData.sources.map((source, index) => (
              <div key={index} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                <span className="font-body text-text-dark">
                  {source.utm_source} / {source.utm_medium}
                </span>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}

