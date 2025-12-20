'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';

export default function NewProgramPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    name_he: '',
    name_en: '',
    slug: '',
    description_he: '',
    description_en: '',
    features_he: [] as string[],
    features_en: [] as string[],
    price: '',
    duration_days: '',
    includes_whatsapp: false,
    image_url: '',
    icon_url: '',
    display_order: '0',
    active: true,
  });

  const [newFeature, setNewFeature] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    // Validate
    if (!formData.name_he || !formData.description_he) {
      setErrors({ submit: 'שם ותיאור הם שדות חובה' });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/admin/programs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: formData.price ? parseFloat(formData.price) : null,
          duration_days: formData.duration_days ? parseInt(formData.duration_days) : null,
          display_order: parseInt(formData.display_order),
        }),
      });

      if (response.ok) {
        router.push('/admin/programs');
      } else {
        const data = await response.json();
        setErrors({ submit: data.error || 'שגיאה בשמירת המסלול' });
      }
    } catch (error) {
      setErrors({ submit: 'שגיאה כללית. נסי שוב מאוחר יותר.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const addFeature = (lang: 'he' | 'en') => {
    if (!newFeature.trim()) return;
    
    if (lang === 'he') {
      setFormData({
        ...formData,
        features_he: [...formData.features_he, newFeature.trim()],
      });
    } else {
      setFormData({
        ...formData,
        features_en: [...formData.features_en, newFeature.trim()],
      });
    }
    setNewFeature('');
  };

  const removeFeature = (index: number, lang: 'he' | 'en') => {
    if (lang === 'he') {
      setFormData({
        ...formData,
        features_he: formData.features_he.filter((_, i) => i !== index),
      });
    } else {
      setFormData({
        ...formData,
        features_en: formData.features_en.filter((_, i) => i !== index),
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-heading font-bold text-text-dark mb-8">
        מסלול חדש
      </h1>

      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <h2 className="text-2xl font-heading font-bold text-text-dark mb-6">
            פרטים בסיסיים
          </h2>
          
          <div className="space-y-4">
            <Input
              label="שם המסלול (עברית) *"
              type="text"
              value={formData.name_he}
              onChange={(e) => setFormData({ ...formData, name_he: e.target.value })}
              error={errors.name_he}
              required
            />

            <Input
              label="שם המסלול (אנגלית)"
              type="text"
              value={formData.name_en}
              onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
            />

            <Input
              label="כתובת URL (slug)"
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="ייווצר אוטומטית אם לא מולא"
            />

            <Textarea
              label="תיאור (עברית) *"
              value={formData.description_he}
              onChange={(e) => setFormData({ ...formData, description_he: e.target.value })}
              error={errors.description_he}
              required
              rows={4}
            />

            <Textarea
              label="תיאור (אנגלית)"
              value={formData.description_en}
              onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
              rows={4}
            />
          </div>
        </Card>

        <Card className="mb-6">
          <h2 className="text-2xl font-heading font-bold text-text-dark mb-6">
            תכונות (עברית)
          </h2>
          
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="הוסיפי תכונה חדשה"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addFeature('he');
                  }
                }}
              />
              <Button type="button" variant="primary" size="md" onClick={() => addFeature('he')}>
                הוסף
              </Button>
            </div>
            <div className="space-y-2">
              {formData.features_he.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 bg-accent-sky/10 p-2 rounded">
                  <span className="flex-grow font-body text-text-dark">{feature}</span>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => removeFeature(index, 'he')}
                  >
                    מחק
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="mb-6">
          <h2 className="text-2xl font-heading font-bold text-text-dark mb-6">
            פרטים נוספים
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="מחיר"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="השאר ריק אם אין מחיר"
            />

            <Input
              label="משך זמן (ימים)"
              type="number"
              value={formData.duration_days}
              onChange={(e) => setFormData({ ...formData, duration_days: e.target.value })}
            />

            <Input
              label="כתובת תמונה"
              type="url"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
            />

            <Input
              label="כתובת אייקון"
              type="url"
              value={formData.icon_url}
              onChange={(e) => setFormData({ ...formData, icon_url: e.target.value })}
            />

            <Input
              label="סדר תצוגה"
              type="number"
              value={formData.display_order}
              onChange={(e) => setFormData({ ...formData, display_order: e.target.value })}
            />
          </div>

          <div className="mt-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.includes_whatsapp}
                onChange={(e) => setFormData({ ...formData, includes_whatsapp: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="font-body text-text-dark">כולל זמינות בוואטסאפ</span>
            </label>
          </div>

          <div className="mt-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.active}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="font-body text-text-dark">מסלול פעיל</span>
            </label>
          </div>
        </Card>

        {errors.submit && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-600 font-body">{errors.submit}</p>
          </div>
        )}

        <div className="flex gap-4">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'שומר...' : 'שמור מסלול'}
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

