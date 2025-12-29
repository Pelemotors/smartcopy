'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

interface NewPortfolioFormProps {
  categories: any[];
}

export function NewPortfolioForm({ categories }: NewPortfolioFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    title_he: '',
    category_id: '',
    niche: '',
    challenge_he: '',
    solution_he: '',
    outcome_he: '',
    before_text_he: '',
    after_text_he: '',
    is_anonymous: false,
    is_published: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch('/api/admin/portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        router.push('/admin/portfolio');
      } else {
        const data = await response.json();
        setErrors({ submit: data.error || 'שגיאה ביצירת הפרויקט' });
      }
    } catch (error) {
      setErrors({ submit: 'שגיאה ביצירת הפרויקט. נסו שוב.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title_he" className="block text-sm font-medium text-text-dark mb-2">
          כותרת הפרויקט *
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
        <label htmlFor="category_id" className="block text-sm font-medium text-text-dark mb-2">
          קטגוריה *
        </label>
        <select
          id="category_id"
          value={formData.category_id}
          onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
          className="w-full px-4 py-2 rounded-lg border-2 border-accent-sky bg-white"
          required
        >
          <option value="">בחרו קטגוריה</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name_he}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="niche" className="block text-sm font-medium text-text-dark mb-2">
          נישה
        </label>
        <Input
          id="niche"
          type="text"
          value={formData.niche}
          onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
          placeholder="למשל: קוסמטיקה, אימון"
        />
      </div>

      <div>
        <label htmlFor="challenge_he" className="block text-sm font-medium text-text-dark mb-2">
          האתגר
        </label>
        <Textarea
          id="challenge_he"
          value={formData.challenge_he}
          onChange={(e) => setFormData({ ...formData, challenge_he: e.target.value })}
          rows={3}
        />
      </div>

      <div>
        <label htmlFor="solution_he" className="block text-sm font-medium text-text-dark mb-2">
          מה עשינו
        </label>
        <Textarea
          id="solution_he"
          value={formData.solution_he}
          onChange={(e) => setFormData({ ...formData, solution_he: e.target.value })}
          rows={3}
        />
      </div>

      <div>
        <label htmlFor="outcome_he" className="block text-sm font-medium text-text-dark mb-2">
          התוצאה
        </label>
        <Textarea
          id="outcome_he"
          value={formData.outcome_he}
          onChange={(e) => setFormData({ ...formData, outcome_he: e.target.value })}
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="before_text_he" className="block text-sm font-medium text-text-dark mb-2">
            לפני (טקסט)
          </label>
          <Textarea
            id="before_text_he"
            value={formData.before_text_he}
            onChange={(e) => setFormData({ ...formData, before_text_he: e.target.value })}
            rows={3}
          />
        </div>

        <div>
          <label htmlFor="after_text_he" className="block text-sm font-medium text-text-dark mb-2">
            אחרי (טקסט)
          </label>
          <Textarea
            id="after_text_he"
            value={formData.after_text_he}
            onChange={(e) => setFormData({ ...formData, after_text_he: e.target.value })}
            rows={3}
          />
        </div>
      </div>

      <div className="flex gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.is_anonymous}
            onChange={(e) => setFormData({ ...formData, is_anonymous: e.target.checked })}
            className="w-4 h-4"
          />
          <span className="text-sm font-body">אנונימי</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.is_published}
            onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
            className="w-4 h-4"
          />
          <span className="text-sm font-body">פורסם</span>
        </label>
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
            'צור פרויקט'
          )}
        </Button>
        <Button type="button" variant="secondary" onClick={() => router.back()}>
          ביטול
        </Button>
      </div>
    </form>
  );
}

