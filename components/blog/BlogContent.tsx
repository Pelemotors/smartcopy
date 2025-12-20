'use client';

import { Card } from '@/components/ui/Card';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/i18n/LanguageContext';

// Helper function to get default image for posts without featured image
function getDefaultImage(index: number): string {
  const images = [
    '/images/dental/services/dentures.jpg',
    '/images/dental/services/full-restoration.jpg',
    '/images/dental/dental-smile.jpg',
    '/images/dental/dental-work.jpg',
  ];
  return images[index % images.length];
}

// Import static posts
import { getAllPosts } from '@/lib/staticBlogPosts';

export function BlogContent() {
  const { t, isRTL } = useLanguage();
  const posts = getAllPosts();
  const loading = false;

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      {/* Hero Section */}
      <div className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary mb-4 tracking-tight">
          {t.blog.title}
        </h1>
        <p className="text-lg md:text-xl text-text-medium font-body max-w-3xl mx-auto">
          {t.blog.subtitle}
        </p>
      </div>

      {loading ? (
        <Card className="text-center py-12 border border-secondary/10 bg-white">
          <p className="text-text-medium font-body text-lg">{t.blog.loading}</p>
        </Card>
      ) : posts.length === 0 ? (
        <Card className="text-center py-12 border border-secondary/10 bg-white">
          <p className="text-text-medium font-body text-lg">
            {t.blog.comingSoon}
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {posts.map((post: any, index: number) => {
            const imageUrl = post.featured_image_url || getDefaultImage(index);
            return (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <Card className="border border-secondary/10 bg-white hover:border-accent/30 transition-all cursor-pointer h-full flex flex-col overflow-hidden group">
                  {/* Image */}
                  <div className="relative w-full h-56 overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5">
                    <Image
                      src={imageUrl}
                      alt={post.title_he || post.title_ru || 'Blog post'}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      unoptimized
                    />
                    {/* Category Badge */}
                    {post.blog_categories && (
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-primary font-body text-sm font-semibold rounded-full shadow-md">
                          {isRTL ? post.blog_categories.name_he : post.blog_categories.name_ru || post.blog_categories.name_he}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 flex-grow flex flex-col">
                    <h2 className="text-xl font-heading font-bold text-primary mb-3 line-clamp-2 group-hover:text-accent transition-colors">
                      {isRTL ? post.title_he : post.title_ru || post.title_he}
                    </h2>
                    {(post.excerpt_he || post.excerpt_ru) && (
                      <p className="text-text-medium font-body mb-4 flex-grow line-clamp-3 text-sm leading-relaxed">
                        {isRTL ? post.excerpt_he : post.excerpt_ru || post.excerpt_he}
                      </p>
                    )}
                    <div className="flex items-center justify-between pt-4 border-t border-secondary/10">
                      {post.published_at && (
                        <p className="text-xs text-text-light font-body">
                          {new Date(post.published_at).toLocaleDateString(isRTL ? 'he-IL' : 'ru-RU', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      )}
                      <span className="text-accent font-body text-sm font-semibold group-hover:translate-x-[-4px] transition-transform">
                        {t.common.readMore} →
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

