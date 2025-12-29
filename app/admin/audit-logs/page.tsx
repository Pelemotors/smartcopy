import { Metadata } from 'next';
import { Card } from '@/components/ui/Card';
import { supabaseServer } from '@/lib/supabaseServerClient';

export const metadata: Metadata = {
  title: 'Audit Logs - מנהל',
  description: 'לוגים של פעולות',
};

async function getAuditLogs() {
  try {
    const { data, error } = await supabaseServer
      .from('audit_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) {
      console.error('Error fetching audit logs:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    return [];
  }
}

export default async function AuditLogsPage() {
  const logs = await getAuditLogs();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-heading font-bold text-text-dark">
          Audit Logs
        </h1>
      </div>

      {logs.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-lg text-text-medium font-body">
            אין לוגים להצגה.
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {logs.map((log: any) => (
            <Card key={log.id} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-heading font-bold text-primary">
                    {log.action}
                  </p>
                  <p className="text-sm text-text-medium font-body">
                    {log.entity_type} {log.entity_id ? `#${log.entity_id}` : ''}
                  </p>
                  {log.description_he && (
                    <p className="text-text-dark font-body mt-2">
                      {log.description_he}
                    </p>
                  )}
                </div>
                <div className="text-sm text-text-medium font-body text-left">
                  {new Date(log.created_at).toLocaleString('he-IL')}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

