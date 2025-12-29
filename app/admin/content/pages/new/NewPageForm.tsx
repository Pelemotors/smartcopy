'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export function NewPageForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    slug: '',
    title_he: '',
    meta_title_he: '',
    meta_description_he: '',
    status: 'draft',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch('/api/admin/content/pages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        router.push(`/admin/content/pages/${data.id}`);
      } else {
        const data = await response.json();
        setErrors({ submit: data.error || 'שגיאה ביצירת העמוד' });
      }
    } catch (error) {
      setErrors({ submit: 'שגיאה ביצירת העמוד. נסו שוב.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="slug" className="block text-sm font-medium text-text-dark mb-2">
          Slug (כתובת URL) *
        </label>
        <Input
          id="slug"
          type="text"
          value={formData.slug}
          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          placeholder="about"
          required
        />
        <p className="text-sm text-text-medium mt-1">רק אותיות, מספרים ומקפים</p>
      </div>

      <div>
        <label htmlFor="title_he" className="block text-sm font-medium text-text-dark mb-2">
          כותרת *
        </label>
        <Input
          id="title_he"
          type="text"
          value={formData.title_he}
          onChange={(e) => setFormData({ ...formData, title_he: e.target.value })}
          required
        />
      </div>

      <div>
        <label htmlFor="meta_title_he" className="block text-sm font-medium text-text-dark mb-2">
          כותרת SEO
        </label>
        <Input
          id="meta_title_he"
          type="text"
          value={formData.meta_title_he}
          onChange={(e) => setFormData({ ...formData, meta_title_he: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="meta_description_he" className="block text-sm font-medium text-text-dark mb-2">
          תיאור SEO
        </label>
        <Textarea
          id="meta_description_he"
          value={formData.meta_description_he}
          onChange={(e) => setFormData({ ...formData, meta_description_he: e.target.value })}
          rows={3}
        />
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-text-dark mb-2">
          סטטוס
        </label>
        <select
          id="status"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="w-full px-4 py-2 rounded-lg border-2 border-accent-sky bg-white"
        >
          <option value="draft">טיוטה</option>
          <option value="published">פורסם</option>
        </select>
      </div>

      {errors.submit && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{errors.submit}</p>
        </div>
      )}

      <div className="flex gap-4">
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <LoadingSpinner className="mr-2" />
              יוצר...
            </>
          ) : (
            'צור עמוד'
          )}
        </Button>
        <Button type="button" variant="secondary" onClick={() => router.back()}>
          ביטול
        </Button>
      </div>
    </form>
  );
}

