import { Metadata } from 'next';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { supabaseServer } from '@/lib/supabaseServerClient';
import { DeleteButton } from './DeleteButton';

export const metadata: Metadata = {
  title: 'ניהול מאמרים - מנהל',
  description: 'ניהול מאמרים',
};

async function getPosts() {
  try {
    const { data, error } = await supabaseServer
      .from('blog_posts')
      .select(`
        *,
        blog_categories (
          name_he,
          slug
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-heading font-bold text-text-dark">
          ניהול מאמרים
        </h1>
        <Button variant="primary" size="md" asChild>
          <Link href="/admin/blog/new">מאמר חדש</Link>
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="flex flex-wrap gap-4">
          <select className="px-4 py-2 rounded-lg border-2 border-accent-sky bg-white">
            <option value="">כל הקטגוריות</option>
            <option value="wake-ups">התעוררויות</option>
            <option value="bedtime">הרדמות</option>
            <option value="weaning">גמילה</option>
            <option value="continuous-sleep">שינה רציפה</option>
          </select>
          <select className="px-4 py-2 rounded-lg border-2 border-accent-sky bg-white">
            <option value="">כל הסטטוסים</option>
            <option value="published">פורסם</option>
            <option value="draft">טיוטה</option>
          </select>
          <input
            type="text"
            placeholder="חיפוש לפי כותרת..."
            className="px-4 py-2 rounded-lg border-2 border-accent-sky bg-white flex-grow"
          />
        </div>
      </Card>

      {/* Posts List */}
      {posts.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-text-dark/60 font-body mb-4">
            אין מאמרים עדיין
          </p>
          <Button variant="primary" size="md" asChild>
            <Link href="/admin/blog/new">צרי מאמר ראשון</Link>
          </Button>
        </Card>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-accent-sky/20">
                  <th className="text-right py-4 px-4 font-heading font-semibold text-text-dark">
                    כותרת
                  </th>
                  <th className="text-right py-4 px-4 font-heading font-semibold text-text-dark">
                    קטגוריה
                  </th>
                  <th className="text-right py-4 px-4 font-heading font-semibold text-text-dark">
                    תאריך פרסום
                  </th>
                  <th className="text-right py-4 px-4 font-heading font-semibold text-text-dark">
                    סטטוס
                  </th>
                  <th className="text-right py-4 px-4 font-heading font-semibold text-text-dark">
                    פעולות
                  </th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="border-b border-accent-sky/10 hover:bg-accent-sky/5">
                    <td className="py-4 px-4 font-body text-text-dark">{post.title_he}</td>
                    <td className="py-4 px-4 font-body text-text-dark">{post.blog_categories?.name_he || '-'}</td>
                    <td className="py-4 px-4 font-body text-text-dark">
                      {post.published_at
                        ? new Date(post.published_at).toLocaleDateString('he-IL')
                        : '-'}
                    </td>
                    <td className="py-4 px-4">
                      {post.published ? (
                        <span className="text-green-600 font-body">פורסם</span>
                      ) : (
                        <span className="text-gray-500 font-body">טיוטה</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-4">
                        <Link
                          href={`/admin/blog/${post.id}/edit`}
                          className="text-accent-sky hover:text-accent-lavender font-body"
                        >
                          עריכה
                        </Link>
                        <DeleteButton postId={post.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}

