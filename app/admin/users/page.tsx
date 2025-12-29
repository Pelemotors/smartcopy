import { Metadata } from 'next';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ADMIN_CONFIG } from '@/lib/adminConfig';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'ניהול משתמשים - מנהל',
  description: 'ניהול משתמשים והרשאות',
};

function getUsers() {
  // Return hardcoded admin user
  return [
    {
      id: ADMIN_CONFIG.id,
      username: ADMIN_CONFIG.username,
      name: ADMIN_CONFIG.name,
      roles: ['owner'],
    },
  ];
}

function getRoles() {
  // Return basic roles
  return [
    { id: 'owner', name: 'owner', display_name_he: 'מנהל ראשי' },
  ];
}

export default async function UsersPage() {
  const users = getUsers();
  const roles = getRoles();

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
                    {user.name || user.username}
                  </h3>
                  <p className="text-sm text-text-medium font-body mb-1">
                    שם משתמש: {user.username}
                  </p>
                  <p className="text-sm text-text-medium font-body">
                    תפקידים: {user.roles?.map((role: string) => {
                      const roleData = roles.find((r: any) => r.name === role);
                      return roleData?.display_name_he || role;
                    }).join(', ') || 'ללא תפקיד'}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" disabled>
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

