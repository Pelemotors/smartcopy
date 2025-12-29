'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Card } from '@/components/ui/Card';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

interface FormData {
  name: string;
  phone: string;
  business_field: string;
  service_needed: string;
  existing_link: string;
  goal: string;
  deadline: string;
}

export function QuickAuditForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    business_field: '',
    service_needed: '',
    existing_link: '',
    goal: '',
    deadline: '',
  });

  const totalSteps = 3;

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.name.trim()) {
        newErrors.name = 'שם הוא שדה חובה';
      }
      if (!formData.phone.trim()) {
        newErrors.phone = 'טלפון הוא שדה חובה';
      } else if (!/^0[2-9]\d{7,8}$/.test(formData.phone.replace(/-/g, ''))) {
        newErrors.phone = 'מספר טלפון לא תקין';
      }
    }

    if (step === 2) {
      if (!formData.business_field.trim()) {
        newErrors.business_field = 'תחום העסק הוא שדה חובה';
      }
      if (!formData.service_needed) {
        newErrors.service_needed = 'מה צריך הוא שדה חובה';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // Get UTM parameters from URL
      const urlParams = new URLSearchParams(window.location.search);
      const utmParams = {
        utm_source: urlParams.get('utm_source') || '',
        utm_medium: urlParams.get('utm_medium') || '',
        utm_campaign: urlParams.get('utm_campaign') || '',
        referrer: document.referrer || '',
        landing_page: window.location.pathname,
      };

      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: 'quick_audit',
          ...utmParams,
        }),
      });

      if (response.ok) {
        // Track event
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'quick_audit_submit', {
            event_category: 'form',
            event_label: 'Quick Audit Form',
          });
        }

        router.push('/thank-you?type=quick_audit');
      } else {
        const data = await response.json();
        setErrors({ submit: data.error || 'שגיאה בשליחת הטופס. נסו שוב.' });
      }
    } catch (error) {
      setErrors({ submit: 'שגיאה בשליחת הטופס. נסו שוב מאוחר יותר.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const progress = (currentStep / totalSteps) * 100;

  return (
    <Card className="max-w-2xl mx-auto p-6 md:p-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-body text-text-medium">שלב {currentStep} מתוך {totalSteps}</span>
          <span className="text-sm font-body text-text-medium">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-accent-sky h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Step 1: פרטים אישיים */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                פרטים אישיים
              </h2>
              <p className="text-base text-text-medium font-body mb-6">
                רק כדי שאדע איך לחזור אליך, ושהמענה יגיע למקום הנכון.
              </p>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-text-dark mb-2">
                שם מלא *
              </label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                className={errors.name ? 'border-red-500' : ''}
                required
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-text-dark mb-2">
                טלפון *
              </label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                placeholder="050-1234567"
                className={errors.phone ? 'border-red-500' : ''}
                required
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            <div className="flex justify-end">
              <Button type="button" onClick={handleNext} variant="primary">
                הבא
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: פרטי העסק */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                פרטי העסק
              </h2>
              <p className="text-base text-text-medium font-body mb-6">
                כדי להבין מי הקהל ומה אתם מציעים — בלי לנחש.
              </p>
            </div>

            <div>
              <label htmlFor="business_field" className="block text-sm font-medium text-text-dark mb-2">
                תחום העסק *
              </label>
              <Input
                id="business_field"
                type="text"
                value={formData.business_field}
                onChange={(e) => updateField('business_field', e.target.value)}
                placeholder="למשל: קוסמטיקה, אימון, נדל״ן"
                className={errors.business_field ? 'border-red-500' : ''}
                required
              />
              {errors.business_field && (
                <p className="text-red-500 text-sm mt-1">{errors.business_field}</p>
              )}
            </div>

            <div>
              <label htmlFor="service_needed" className="block text-sm font-medium text-text-dark mb-2">
                מה צריך? *
              </label>
              <select
                id="service_needed"
                value={formData.service_needed}
                onChange={(e) => updateField('service_needed', e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border-2 ${
                  errors.service_needed ? 'border-red-500' : 'border-accent-sky'
                } bg-white`}
                required
              >
                <option value="">בחרו אפשרות</option>
                <option value="landing_page">דף נחיתה</option>
                <option value="website_content">תוכן לאתר</option>
                <option value="ads">מודעות</option>
                <option value="editing">עריכת לשון</option>
              </select>
              {errors.service_needed && (
                <p className="text-red-500 text-sm mt-1">{errors.service_needed}</p>
              )}
            </div>

            <div>
              <label htmlFor="existing_link" className="block text-sm font-medium text-text-dark mb-2">
                קישור לעמוד קיים (אופציונלי)
              </label>
              <Input
                id="existing_link"
                type="url"
                value={formData.existing_link}
                onChange={(e) => updateField('existing_link', e.target.value)}
                placeholder="https://..."
              />
            </div>

            <div className="flex justify-between">
              <Button type="button" onClick={handleBack} variant="secondary">
                חזרה
              </Button>
              <Button type="button" onClick={handleNext} variant="primary">
                הבא
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: יעד ודדליין */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                יעד ודדליין
              </h2>
              <p className="text-base text-text-medium font-body mb-6">
                כדי לכוון את ההמלצה לפעולה שאתם רוצים: פניות, מכירה, או סדר במסר.
              </p>
            </div>

            <div>
              <label htmlFor="goal" className="block text-sm font-medium text-text-dark mb-2">
                מה היעד?
              </label>
              <select
                id="goal"
                value={formData.goal}
                onChange={(e) => updateField('goal', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border-2 border-accent-sky bg-white"
              >
                <option value="">בחרו אפשרות</option>
                <option value="leads">לידים</option>
                <option value="sales">מכירה</option>
                <option value="branding">מיתוג</option>
                <option value="clarity">בהירות</option>
              </select>
            </div>

            <div>
              <label htmlFor="deadline" className="block text-sm font-medium text-text-dark mb-2">
                דדליין (אופציונלי)
              </label>
              <Input
                id="deadline"
                type="date"
                value={formData.deadline}
                onChange={(e) => updateField('deadline', e.target.value)}
              />
            </div>

            {errors.submit && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{errors.submit}</p>
              </div>
            )}

            <div className="flex justify-between">
              <Button type="button" onClick={handleBack} variant="secondary">
                חזרה
              </Button>
              <Button type="submit" variant="primary" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <LoadingSpinner className="mr-2" />
                    שולח...
                  </>
                ) : (
                  'שלחו לבדיקה'
                )}
              </Button>
            </div>
          </div>
        )}
      </form>
    </Card>
  );
}

