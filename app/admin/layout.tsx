import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'ממשק מנהל - מעבדת שיניים',
  description: 'ממשק ניהול לאתר',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background-cream">
      {/* Admin Navigation */}
      <nav className="bg-white border-b border-accent-sky/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/admin/dashboard" className="text-xl font-heading font-bold text-text-dark">
              לוח בקרה
            </Link>
            <div className="flex gap-4 flex-wrap">
              <Link
                href="/admin/content/pages"
                className="text-text-dark/70 hover:text-text-dark font-body text-sm"
              >
                עמודים
              </Link>
              <Link
                href="/admin/leads"
                className="text-text-dark/70 hover:text-text-dark font-body text-sm"
              >
                לידים
              </Link>
              <Link
                href="/admin/portfolio"
                className="text-text-dark/70 hover:text-text-dark font-body text-sm"
              >
                תיק עבודות
              </Link>
              <Link
                href="/admin/media"
                className="text-text-dark/70 hover:text-text-dark font-body text-sm"
              >
                מדיה
              </Link>
              <Link
                href="/admin/analytics"
                className="text-text-dark/70 hover:text-text-dark font-body text-sm"
              >
                Analytics
              </Link>
              <Link
                href="/admin/users"
                className="text-text-dark/70 hover:text-text-dark font-body text-sm"
              >
                משתמשים
              </Link>
              <Link
                href="/admin/settings"
                className="text-text-dark/70 hover:text-text-dark font-body text-sm"
              >
                הגדרות
              </Link>
              <Link
                href="/"
                className="text-text-dark/70 hover:text-text-dark font-body text-sm"
              >
                חזרה לאתר
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main>{children}</main>
    </div>
  );
}

