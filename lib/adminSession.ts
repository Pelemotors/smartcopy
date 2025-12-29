import { cookies } from 'next/headers';
import { verifySessionToken } from './adminAuth';
import { redirect } from 'next/navigation';

/**
 * בדיקת session פשוטה - מחזיר true אם יש session תקין
 * אם אין session - מפנה ל-/admin/login
 */
export async function requireAdminSession() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('admin-session')?.value;

  if (!sessionToken) {
    redirect('/admin/login');
  }

  const session = await verifySessionToken(sessionToken);

  if (!session) {
    redirect('/admin/login');
  }

  return session;
}

