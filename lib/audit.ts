import { supabaseServer } from './supabaseServerClient';

export interface AuditLogData {
  user_id?: string;
  action: string;
  entity_type: string;
  entity_id?: string;
  before_data?: any;
  after_data?: any;
  ip_address?: string;
  user_agent?: string;
}

export async function createAuditLog(data: AuditLogData): Promise<void> {
  try {
    await supabaseServer
      .from('audit_logs')
      .insert({
        user_id: data.user_id || null,
        action: data.action,
        entity_type: data.entity_type,
        entity_id: data.entity_id || null,
        before_data: data.before_data || null,
        after_data: data.after_data || null,
        ip_address: data.ip_address || null,
        user_agent: data.user_agent || null,
      });
  } catch (error) {
    console.error('Error creating audit log:', error);
    // Don't throw - audit logs shouldn't break the app
  }
}

