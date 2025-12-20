import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { getPostBySlug } from '@/lib/staticBlogPosts';
import Image from 'next/image';
import Link from 'next/link';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'מאמר לא נמצא',
    };
  }

  return {
    title: post.title_he,
    description: post.excerpt_he || '',
  };
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Back to blog */}
        <Link
          href="/blog"
          className="text-accent-sky hover:text-accent-lavender font-body mb-6 inline-block"
        >
          ← חזרה למאמרים
        </Link>

        {/* Article Header */}
        <article>
          {post.featured_image_url && (
            <div className="relative w-full h-64 md:h-96 mb-8 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={post.featured_image_url}
                alt={post.title_he}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 896px"
              />
            </div>
          )}

          <div className="mb-6">
            {post.blog_categories && (
              <span className="text-accent font-body mb-4 inline-block">
                {post.blog_categories.name_he}
              </span>
            )}
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-text-dark mb-4">
              {post.title_he}
            </h1>
            {post.excerpt_he && (
              <p className="text-xl text-text-dark/80 font-body mb-4">
                {post.excerpt_he}
              </p>
            )}
            <div className="flex items-center gap-4 text-text-dark/60 font-body text-sm">
              <span>מאת מעבדת שיניים</span>
              {post.published_at && (
                <>
                  <span>•</span>
                  <span>
                    {new Date(post.published_at).toLocaleDateString('he-IL', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Article Content */}
          <Card className="border border-secondary/10 bg-white">
            <div 
              className="text-text-dark/90 font-body leading-relaxed prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content_he.replace(/\n/g, '<br/>') }}
            />
          </Card>

          {/* Tags */}
          {post.blog_post_tags && post.blog_post_tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {post.blog_post_tags.map((pt, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-accent/10 text-accent-dark rounded-full text-sm font-body"
                >
                  {pt.blog_tags.name_he}
                </span>
              ))}
            </div>
          )}
        </article>
      </div>
    </div>
  );
}

