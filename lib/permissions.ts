import { ADMIN_CONFIG } from './adminConfig';

export interface Permission {
  resource: string;
  action: string;
}

export async function getUserRoles(userId: string): Promise<string[]> {
  // For the hardcoded admin user, return owner role
  if (userId === ADMIN_CONFIG.id) {
    return ['owner'];
  }
  return [];
}

export async function hasPermission(userId: string, resource: string, action: string): Promise<boolean> {
  // For the hardcoded admin user, allow all permissions
  if (userId === ADMIN_CONFIG.id) {
    return true;
  }
  return false;
}

export async function requirePermission(
  userId: string | null,
  resource: string,
  action: string
): Promise<{ allowed: boolean; error?: string }> {
  if (!userId) {
    return { allowed: false, error: 'לא מחובר' };
  }

  const hasAccess = await hasPermission(userId, resource, action);
  if (!hasAccess) {
    return { allowed: false, error: 'אין הרשאה' };
  }

  return { allowed: true };
}

