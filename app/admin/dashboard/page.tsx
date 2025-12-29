import { Metadata } from 'next';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';
import { supabaseServer } from '@/lib/supabaseServerClient';
import { requireAdminSession } from '@/lib/adminSession';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'לוח בקרה - מנהל',
  description: 'לוח בקרה לניהול האתר',
};

async function getDashboardStats() {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // תחילת השבוע (7 הימים האחרונים כולל היום)
  const startOfWeek = new Date(startOfToday);
  startOfWeek.setDate(startOfToday.getDate() - 6);

  // תחילת החודש
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  try {
    const [todayRes, weekRes, monthRes, totalRes, postsRes, testimonialsRes] =
      await Promise.all([
        supabaseServer
          .from('leads')
          .select('id', { count: 'exact', head: true })
          .gte('created_at', startOfToday.toISOString()),
        supabaseServer
          .from('leads')
          .select('id', { count: 'exact', head: true })
          .gte('created_at', startOfWeek.toISOString()),
        supabaseServer
          .from('leads')
          .select('id', { count: 'exact', head: true })
          .gte('created_at', startOfMonth.toISOString()),
        supabaseServer
          .from('leads')
          .select('id', { count: 'exact', head: true }),
        supabaseServer
          .from('blog_posts')
          .select('id', { count: 'exact', head: true })
          .eq('published', true),
        supabaseServer
          .from('testimonials')
          .select('id', { count: 'exact', head: true })
          .eq('featured', true),
      ]);

    return {
      newLeadsToday: todayRes.count || 0,
      newLeadsThisWeek: weekRes.count || 0,
      newLeadsThisMonth: monthRes.count || 0,
      totalLeads: totalRes.count || 0,
      publishedPosts: postsRes.count || 0,
      activeTestimonials: testimonialsRes.count || 0,
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return {
      newLeadsToday: 0,
      newLeadsThisWeek: 0,
      newLeadsThisMonth: 0,
      totalLeads: 0,
      publishedPosts: 0,
      activeTestimonials: 0,
    };
  }
}

export default async function DashboardPage() {
  // בדיקת session - אם אין session, redirect ל-/admin/login
  await requireAdminSession();
  
  const stats = await getDashboardStats();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-heading font-bold text-text-dark">
          לוח בקרה
        </h1>
        <form action="/api/admin/auth/logout" method="POST">
          <button
            type="submit"
            className="text-text-dark/60 hover:text-text-dark font-body"
          >
            התנתקי
          </button>
        </form>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <h3 className="text-lg font-heading font-semibold text-text-dark mb-2">
            לידים חדשים היום
          </h3>
          <p className="text-3xl font-heading font-bold text-accent-sky">
            {stats.newLeadsToday}
          </p>
        </Card>

        <Card>
          <h3 className="text-lg font-heading font-semibold text-text-dark mb-2">
            לידים חדשים השבוע
          </h3>
          <p className="text-3xl font-heading font-bold text-accent-lavender">
            {stats.newLeadsThisWeek}
          </p>
        </Card>

        <Card>
          <h3 className="text-lg font-heading font-semibold text-text-dark mb-2">
            לידים חדשים החודש
          </h3>
          <p className="text-3xl font-heading font-bold text-accent-pink">
            {stats.newLeadsThisMonth}
          </p>
        </Card>

        <Card>
          <h3 className="text-lg font-heading font-semibold text-text-dark mb-2">
            סה&quot;כ לידים
          </h3>
          <p className="text-3xl font-heading font-bold text-text-dark">
            {stats.totalLeads}
          </p>
        </Card>

        <Card>
          <h3 className="text-lg font-heading font-semibold text-text-dark mb-2">
            מאמרים שפורסמו
          </h3>
          <p className="text-3xl font-heading font-bold text-text-dark">
            {stats.publishedPosts}
          </p>
        </Card>

        <Card>
          <h3 className="text-lg font-heading font-semibold text-text-dark mb-2">
            המלצות פעילות
          </h3>
          <p className="text-3xl font-heading font-bold text-text-dark">
            {stats.activeTestimonials}
          </p>
        </Card>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/admin/content/pages">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer text-center">
            <h3 className="text-xl font-heading font-semibold text-text-dark mb-2">
              ניהול עמודים
            </h3>
            <p className="text-text-dark/60 font-body">CMS וניהול תוכן</p>
          </Card>
        </Link>

        <Link href="/admin/leads">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer text-center">
            <h3 className="text-xl font-heading font-semibold text-text-dark mb-2">
              ניהול לידים
            </h3>
            <p className="text-text-dark/60 font-body">צפייה וניהול לידים</p>
          </Card>
        </Link>

        <Link href="/admin/portfolio">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer text-center">
            <h3 className="text-xl font-heading font-semibold text-text-dark mb-2">
              תיק עבודות
            </h3>
            <p className="text-text-dark/60 font-body">ניהול פרויקטים</p>
          </Card>
        </Link>

        <Link href="/admin/media">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer text-center">
            <h3 className="text-xl font-heading font-semibold text-text-dark mb-2">
              Media Library
            </h3>
            <p className="text-text-dark/60 font-body">ניהול מדיה</p>
          </Card>
        </Link>

        <Link href="/admin/analytics">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer text-center">
            <h3 className="text-xl font-heading font-semibold text-text-dark mb-2">
              Analytics
            </h3>
            <p className="text-text-dark/60 font-body">ניתוח ביצועים</p>
          </Card>
        </Link>

        <Link href="/admin/users">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer text-center">
            <h3 className="text-xl font-heading font-semibold text-text-dark mb-2">
              משתמשים
            </h3>
            <p className="text-text-dark/60 font-body">ניהול משתמשים והרשאות</p>
          </Card>
        </Link>

        <Link href="/admin/settings">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer text-center">
            <h3 className="text-xl font-heading font-semibold text-text-dark mb-2">
              הגדרות
            </h3>
            <p className="text-text-dark/60 font-body">הגדרות כלליות</p>
          </Card>
        </Link>

        <Link href="/admin/audit-logs">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer text-center">
            <h3 className="text-xl font-heading font-semibold text-text-dark mb-2">
              Audit Logs
            </h3>
            <p className="text-text-dark/60 font-body">לוגים של פעולות</p>
          </Card>
        </Link>
      </div>
    </div>
  );
}

