'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export default function NewBlogPostPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    title_he: '',
    title_en: '',
    slug: '',
    excerpt_he: '',
    excerpt_en: '',
    content_he: '',
    content_en: '',
    featured_image_url: '',
    category_id: '',
    author_name: 'מעבדת שיניים',
    published: false,
    published_at: '',
    meta_title_he: '',
    meta_title_en: '',
    meta_description_he: '',
    meta_description_en: '',
    meta_keywords_he: '',
    meta_keywords_en: '',
    tags: [] as string[],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch('/api/admin/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          published_at: formData.published && formData.published_at 
            ? new Date(formData.published_at).toISOString() 
            : null,
        }),
      });

      if (response.ok) {
        router.push('/admin/blog');
      } else {
        const data = await response.json();
        setErrors({ submit: data.error || 'שגיאה בשמירת המאמר' });
      }
    } catch (error) {
      setErrors({ submit: 'שגיאה כללית. נסי שוב מאוחר יותר.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-heading font-bold text-text-dark mb-8">
        מאמר חדש
      </h1>

      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <h2 className="text-2xl font-heading font-bold text-text-dark mb-6">
            פרטים בסיסיים
          </h2>
          
          <div className="space-y-4">
            <Input
              label="כותרת (עברית) *"
              type="text"
              value={formData.title_he}
              onChange={(e) => setFormData({ ...formData, title_he: e.target.value })}
              error={errors.title_he}
              required
            />

            <Input
              label="כותרת (אנגלית)"
              type="text"
              value={formData.title_en}
              onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
            />

            <Input
              label="כתובת URL (slug)"
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="ייווצר אוטומטית מהכותרת אם לא מולא"
            />

            <Textarea
              label="תקציר (עברית)"
              value={formData.excerpt_he}
              onChange={(e) => setFormData({ ...formData, excerpt_he: e.target.value })}
              rows={3}
            />

            <Textarea
              label="תוכן (עברית) *"
              value={formData.content_he}
              onChange={(e) => setFormData({ ...formData, content_he: e.target.value })}
              error={errors.content_he}
              rows={15}
              required
            />

            <Input
              label="כתובת תמונה ראשית"
              type="url"
              value={formData.featured_image_url}
              onChange={(e) => setFormData({ ...formData, featured_image_url: e.target.value })}
              placeholder="https://..."
            />
          </div>
        </Card>

        <Card className="mb-6">
          <h2 className="text-2xl font-heading font-bold text-text-dark mb-6">
            הגדרות פרסום
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                id="published"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="w-5 h-5"
              />
              <label htmlFor="published" className="font-body text-text-dark">
                פרסם מאמר
              </label>
            </div>

            {formData.published && (
              <Input
                label="תאריך פרסום"
                type="datetime-local"
                value={formData.published_at}
                onChange={(e) => setFormData({ ...formData, published_at: e.target.value })}
              />
            )}

            <Input
              label="שם המחבר"
              type="text"
              value={formData.author_name}
              onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
            />
          </div>
        </Card>

        <Card className="mb-6">
          <h2 className="text-2xl font-heading font-bold text-text-dark mb-6">
            SEO
          </h2>
          
          <div className="space-y-4">
            <Input
              label="Meta Title (עברית)"
              type="text"
              value={formData.meta_title_he}
              onChange={(e) => setFormData({ ...formData, meta_title_he: e.target.value })}
            />

            <Textarea
              label="Meta Description (עברית)"
              value={formData.meta_description_he}
              onChange={(e) => setFormData({ ...formData, meta_description_he: e.target.value })}
              rows={3}
            />

            <Input
              label="Meta Keywords (עברית)"
              type="text"
              value={formData.meta_keywords_he}
              onChange={(e) => setFormData({ ...formData, meta_keywords_he: e.target.value })}
              placeholder="מילות מפתח מופרדות בפסיק"
            />
          </div>
        </Card>

        {errors.submit && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {errors.submit}
          </div>
        )}

        <div className="flex gap-4">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <LoadingSpinner size="sm" />
                שומר...
              </span>
            ) : (
              'שמור מאמר'
            )}
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="lg"
            onClick={() => router.back()}
          >
            ביטול
          </Button>
        </div>
      </form>
    </div>
  );
}

