'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';

interface LeadsKanbanProps {
  initialLeads: any[];
}

const statuses = [
  { id: 'new', name: 'חדש', color: 'bg-blue-100 text-blue-700' },
  { id: 'in_progress', name: 'בטיפול', color: 'bg-yellow-100 text-yellow-700' },
  { id: 'waiting_for_client', name: 'מחכה ללקוח', color: 'bg-orange-100 text-orange-700' },
  { id: 'closed', name: 'נסגר', color: 'bg-green-100 text-green-700' },
  { id: 'not_relevant', name: 'לא רלוונטי', color: 'bg-gray-100 text-gray-700' },
];

export function LeadsKanban({ initialLeads }: LeadsKanbanProps) {
  const [leads] = useState(initialLeads);

  const leadsByStatus = statuses.map((status) => ({
    ...status,
    leads: leads.filter((lead) => lead.status === status.id),
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto">
      {leadsByStatus.map((column) => (
        <div key={column.id} className="min-w-[250px]">
          <div className={`${column.color} p-3 rounded-t-lg font-heading font-bold text-center mb-2`}>
            {column.name} ({column.leads.length})
          </div>
          <div className="space-y-3">
            {column.leads.map((lead) => (
              <Card key={lead.id} className="p-4 hover:shadow-lg transition-shadow">
                <Link href={`/admin/leads/${lead.id}`}>
                  <div>
                    <h3 className="font-heading font-bold text-primary mb-2">
                      {lead.name}
                    </h3>
                    <p className="text-sm text-text-medium font-body mb-2">
                      {lead.phone}
                    </p>
                    {lead.service_requested && (
                      <Badge variant="default" className="mb-2">
                        {lead.service_requested}
                      </Badge>
                    )}
                    <p className="text-xs text-text-medium font-body">
                      {new Date(lead.created_at).toLocaleDateString('he-IL')}
                    </p>
                  </div>
                </Link>
              </Card>
            ))}
            {column.leads.length === 0 && (
              <Card className="p-8 text-center">
                <p className="text-sm text-text-medium font-body">
                  אין לידים
                </p>
              </Card>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

