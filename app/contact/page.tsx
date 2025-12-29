'use client';

import React from 'react';
import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function ContactPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    serviceType: '',
    message: '',
    honeypot: '', // Anti-spam field
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = `${t.contact.nameLabel} ${t.common.required}`;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = `${t.contact.phoneLabel} ${t.common.required}`;
    } else if (!/^0[2-9]\d{7,8}$/.test(formData.phone.replace(/-/g, ''))) {
      newErrors.phone = t.common.invalidPhone;
    }

    if (!formData.serviceType.trim()) {
      newErrors.serviceType = `${t.contact.serviceTypeLabel} ${t.common.required}`;
    }

    if (!formData.message.trim()) {
      newErrors.message = `${t.contact.messageLabel} ${t.common.required}`;
    }

    // Honeypot check
    if (formData.honeypot) {
      newErrors.honeypot = 'Bot detected';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          child_age: formData.serviceType,
          message: formData.message,
          source: 'contact_form',
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        // Track event
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'contact_form_submit', {
            event_category: 'form',
            event_label: 'Contact Form',
          });
        }

        // Redirect to thank you page
        window.location.href = '/thank-you?type=contact';
      } else {
        console.error('Form submission error:', response.status, responseData);
        throw new Error(responseData.error || 'Form submission error');
      }
    } catch (error) {
      console.error('Form submission failed:', error);
      setErrors({ submit: error instanceof Error ? error.message : 'An error occurred. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-text-dark mb-4 text-center">
          דברו איתי
        </h1>
        <p className="text-lg md:text-xl text-text-medium font-body mb-4 text-center">
          שלחו כמה פרטים — ואחזור אליכם עם כיוון ברור.
        </p>
        <p className="text-base text-text-medium font-body mb-8 text-center max-w-2xl mx-auto">
          אם יש לכם קישור לעמוד/דף קיים — צרפו אותו.
          <br />
          אם אין — כתבו 2 משפטים: מה אתם מוכרים ולמי. זה מספיק כדי להתחיל.
        </p>
        <p className="text-sm text-text-light font-body mb-8 text-center">
          הפרטים נשמרים לצורך יצירת קשר בלבד.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button variant="primary" size="lg" asChild>
            <a href="https://wa.me/972501234567" target="_blank" rel="noopener noreferrer">
              לוואטסאפ עכשיו
            </a>
          </Button>
          <Button variant="secondary" size="lg" onClick={() => {
            const formElement = document.querySelector('form');
            formElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}>
            השארת פרטים
          </Button>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Honeypot field */}
            <input
              type="text"
              name="honeypot"
              value={formData.honeypot}
              onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <Input
              label={`${t.contact.nameLabel} *`}
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              error={errors.name}
              required
            />

            <Input
              label={`${t.contact.phoneLabel} *`}
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder={t.contact.phonePlaceholder}
              error={errors.phone}
              required
            />

            <Input
              label={`${t.contact.serviceTypeLabel} *`}
              type="text"
              value={formData.serviceType}
              onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
              placeholder={t.contact.serviceTypePlaceholder}
              error={errors.serviceType}
              required
            />

            <Textarea
              label={`${t.contact.messageLabel} *`}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder={t.contact.messagePlaceholder}
              error={errors.message}
              required
            />

            {errors.submit && (
              <p className="text-red-500 text-sm">{errors.submit}</p>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <LoadingSpinner size="sm" />
                  {t.common.sending}
                </span>
              ) : (
                t.common.sendMessage
              )}
            </Button>
            
            <p className="text-sm text-text-medium text-center mt-4">
              לא שולחים ספאם. הפרטים משמשים למענה בלבד.
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
}

