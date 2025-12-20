'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

interface QuizResultType {
  tier: 1 | 2 | 3;
  title: string;
  summary: string;
  whatsappMessage: string;
  ctaText: {
    whatsapp: string;
    call: string;
  };
}

interface QuizResultProps {
  result: QuizResultType;
  score: number;
  onRetake?: () => void;
  onSaveLead?: (name: string, phone: string) => Promise<void>;
}

export const QuizResult: React.FC<QuizResultProps> = ({
  result,
  score,
  onRetake,
  onSaveLead,
}) => {
  const { t, isRTL } = useLanguage();
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactData, setContactData] = useState({
    name: '',
    phone: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '';
  const whatsappUrl = whatsappPhone
    ? `https://wa.me/${whatsappPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(result.whatsappMessage)}`
    : '#';

  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || '/contact';

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    if (!contactData.name.trim()) {
      newErrors.name = `${t.quiz.contactForm.nameLabel} ${t.common.required}`;
    }
    if (!contactData.phone.trim()) {
      newErrors.phone = `${t.quiz.contactForm.phoneLabel} ${t.common.required}`;
    } else if (!/^0[2-9]\d{7,8}$/.test(contactData.phone.replace(/-/g, ''))) {
      newErrors.phone = t.common.invalidPhone;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSaving(true);
    try {
      if (onSaveLead) {
        await onSaveLead(contactData.name.trim(), contactData.phone.trim());
      }
      setIsSaved(true);
      setShowContactForm(false);
    } catch (error) {
      console.error('Error saving contact:', error);
      setErrors({ submit: isRTL ? 'שגיאה בשמירת הפרטים. נסו שוב מאוחר יותר.' : 'Error saving details. Please try again later.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleWhatsAppClick = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'dental_quiz_cta_whatsapp', {
        event_category: 'engagement',
        event_label: `tier_${result.tier}`,
      });
    }
  };

  const handleCallClick = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'dental_quiz_cta_call', {
        event_category: 'engagement',
        event_label: `tier_${result.tier}`,
      });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className={`text-center border border-secondary/10 bg-white ${isRTL ? 'text-right' : 'text-left'}`}>
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">
          {result.title}
        </h1>

        <p className="text-text-medium font-body text-lg leading-relaxed mb-8">
          {result.summary}
        </p>

        <div className="bg-primary/5 rounded-lg p-4 mb-8">
          <p className="text-text-medium font-body text-sm mb-2">
            {isRTL ? `הניקוד שלכם: ` : `Your score: `}
            <span className="font-bold">{score} {isRTL ? 'נקודות' : 'points'}</span>
          </p>
          <p className="text-text-medium font-body text-sm">
            {isRTL ? `רמת מצב: ` : `Tier: `}
            <span className="font-bold">{result.tier}</span>
          </p>
        </div>

        {/* Contact Form */}
        {!isSaved && (
          <div className="mb-6">
            {!showContactForm ? (
              <div className="text-center">
                <p className="text-text-medium font-body mb-4">
                  {isRTL ? 'כדי שנוכל ליצור איתכם קשר, נשמח לקבל את הפרטים שלכם:' : 'To contact you, we would like to receive your details:'}
                </p>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => setShowContactForm(true)}
                  className="w-full sm:w-auto"
                >
                  {isRTL ? 'השאירו פרטים ליצירת קשר' : 'Leave contact details'}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4 max-w-md mx-auto">
                <Input
                  label={`${t.quiz.contactForm.nameLabel} *`}
                  type="text"
                  value={contactData.name}
                  onChange={(e) => {
                    setContactData({ ...contactData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: '' });
                  }}
                  error={errors.name}
                  required
                />
                <Input
                  label={`${t.quiz.contactForm.phoneLabel} *`}
                  type="tel"
                  value={contactData.phone}
                  onChange={(e) => {
                    setContactData({ ...contactData, phone: e.target.value });
                    if (errors.phone) setErrors({ ...errors, phone: '' });
                  }}
                  placeholder={t.contact.phonePlaceholder}
                  error={errors.phone}
                  required
                />
                {errors.submit && (
                  <p className="text-red-500 text-sm text-center">{errors.submit}</p>
                )}
                <div className={`flex gap-3 justify-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={isSaving}
                  >
                    {isSaving ? t.quiz.contactForm.saving : t.quiz.contactForm.submit}
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    size="md"
                    onClick={() => {
                      setShowContactForm(false);
                      setErrors({});
                    }}
                    disabled={isSaving}
                  >
                    {isRTL ? 'ביטול' : 'Cancel'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        )}

        {isSaved && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-center">
            <p className="text-green-700 font-body">
              ✓ {isRTL ? 'הפרטים נשמרו בהצלחה! ניצור איתך קשר בקרוב.' : 'Details saved successfully! We will contact you soon.'}
            </p>
          </div>
        )}

        <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-6 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
          <Button variant="primary" size="lg" asChild onClick={handleWhatsAppClick}>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              {result.ctaText.whatsapp}
            </a>
          </Button>
          <Button variant="secondary" size="lg" asChild onClick={handleCallClick}>
            <a href={calendlyUrl} className="w-full sm:w-auto">
              {result.ctaText.call}
            </a>
          </Button>
        </div>

        {onRetake && (
          <button
            onClick={onRetake}
            className="text-primary hover:text-primary-dark font-body text-sm underline"
          >
            {t.quiz.contactForm.retake}
          </button>
        )}
      </Card>
    </div>
  );
};
