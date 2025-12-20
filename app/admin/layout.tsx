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
            <div className="flex gap-6">
              <Link
                href="/admin/leads"
                className="text-text-dark/70 hover:text-text-dark font-body"
              >
                לידים
              </Link>
              <Link
                href="/admin/blog"
                className="text-text-dark/70 hover:text-text-dark font-body"
              >
                מאמרים
              </Link>
              <Link
                href="/admin/testimonials"
                className="text-text-dark/70 hover:text-text-dark font-body"
              >
                המלצות
              </Link>
              <Link
                href="/admin/programs"
                className="text-text-dark/70 hover:text-text-dark font-body"
              >
                מסלולים
              </Link>
              <Link
                href="/admin/settings"
                className="text-text-dark/70 hover:text-text-dark font-body"
              >
                הגדרות
              </Link>
              <Link
                href="/"
                className="text-text-dark/70 hover:text-text-dark font-body"
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

