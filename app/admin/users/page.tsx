import { Metadata } from 'next';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { supabaseServer } from '@/lib/supabaseServerClient';

export const metadata: Metadata = {
  title: 'ניהול משתמשים - מנהל',
  description: 'ניהול משתמשים והרשאות',
};

async function getUsers() {
  try {
    // Get admin users
    const { data: adminUsers, error: adminError } = await supabaseServer
      .from('admin_users')
      .select('*, user_roles(roles(*))');

    if (adminError) {
      console.error('Error fetching users:', adminError);
      return [];
    }

    return adminUsers || [];
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}

async function getRoles() {
  try {
    const { data, error } = await supabaseServer
      .from('roles')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching roles:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching roles:', error);
    return [];
  }
}

export default async function UsersPage() {
  const users = await getUsers();
  const roles = await getRoles();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-heading font-bold text-text-dark">
          ניהול משתמשים
        </h1>
        <Button variant="primary">
          משתמש חדש
        </Button>
      </div>

      {users.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-lg text-text-medium font-body mb-6">
            עדיין לא נוצרו משתמשים.
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {users.map((user: any) => (
            <Card key={user.id} className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-heading font-bold text-primary mb-2">
                    {user.email}
                  </h3>
                  <p className="text-sm text-text-medium font-body">
                    תפקידים: {user.user_roles?.map((ur: any) => ur.roles?.display_name_he).join(', ') || 'ללא תפקיד'}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm">
                    עריכה
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

