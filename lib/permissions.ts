import { supabaseServer } from './supabaseServerClient';

export interface Permission {
  resource: string;
  action: string;
}

export async function getUserRoles(userId: string): Promise<string[]> {
  try {
    const { data, error } = await supabaseServer
      .from('user_roles')
      .select('roles(name)')
      .eq('user_id', userId);

    if (error || !data) {
      return [];
    }

    return data.map((ur: any) => ur.roles?.name).filter(Boolean);
  } catch (error) {
    console.error('Error fetching user roles:', error);
    return [];
  }
}

export async function hasPermission(userId: string, resource: string, action: string): Promise<boolean> {
  try {
    const roles = await getUserRoles(userId);

    // Owner/Admin has all permissions
    if (roles.includes('owner')) {
      return true;
    }

    // Check role-specific permissions
    const { data: roleData } = await supabaseServer
      .from('roles')
      .select('permissions')
      .in('name', roles);

    if (!roleData) {
      return false;
    }

    // Check if any role has the required permission
    for (const role of roleData) {
      const permissions = role.permissions as any;
      if (permissions?.all === true) {
        return true;
      }
      if (permissions?.[resource]?.[action] === true) {
        return true;
      }
    }

    return false;
  } catch (error) {
    console.error('Error checking permission:', error);
    return false;
  }
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

