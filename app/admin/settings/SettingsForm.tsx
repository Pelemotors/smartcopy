'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

interface SettingsFormProps {
  initialSettings: Record<string, any>;
}

export function SettingsForm({ initialSettings }: SettingsFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [settings, setSettings] = useState({
    business_name: initialSettings.business_name || 'Sarit Hadar',
    business_phone: initialSettings.business_phone || '',
    business_email: initialSettings.business_email || '',
    whatsapp_number: initialSettings.whatsapp_number || '',
    whatsapp_message: initialSettings.whatsapp_message || '',
    seo_default_title: initialSettings.seo_default_title || '',
    seo_default_description: initialSettings.seo_default_description || '',
    n8n_webhook_url: initialSettings.n8n_webhook_url || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        alert('הגדרות נשמרו בהצלחה');
      } else {
        alert('שגיאה בשמירת ההגדרות');
      }
    } catch (error) {
      alert('שגיאה בשמירת ההגדרות');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* פרטי עסק */}
      <Card className="p-6">
        <h2 className="text-2xl font-heading font-bold text-primary mb-6">
          פרטי עסק
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="שם העסק"
            type="text"
            value={settings.business_name}
            onChange={(e) => setSettings({ ...settings, business_name: e.target.value })}
          />

          <Input
            label="טלפון"
            type="tel"
            value={settings.business_phone}
            onChange={(e) => setSettings({ ...settings, business_phone: e.target.value })}
            placeholder="050-1234567"
          />

          <Input
            label="אימייל"
            type="email"
            value={settings.business_email}
            onChange={(e) => setSettings({ ...settings, business_email: e.target.value })}
            placeholder="contact@example.com"
          />
        </form>
      </Card>

      {/* WhatsApp */}
      <Card className="p-6">
        <h2 className="text-2xl font-heading font-bold text-primary mb-6">
          WhatsApp
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="מספר WhatsApp"
            type="tel"
            value={settings.whatsapp_number}
            onChange={(e) => setSettings({ ...settings, whatsapp_number: e.target.value })}
            placeholder="972501234567"
          />

          <Textarea
            label="הודעת פתיחה"
            value={settings.whatsapp_message}
            onChange={(e) => setSettings({ ...settings, whatsapp_message: e.target.value })}
            placeholder="שלום, אני מעוניין במידע..."
            rows={3}
          />
        </form>
      </Card>

      {/* SEO */}
      <Card className="p-6">
        <h2 className="text-2xl font-heading font-bold text-primary mb-6">
          SEO - ברירת מחדל
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="כותרת SEO ברירת מחדל"
            type="text"
            value={settings.seo_default_title}
            onChange={(e) => setSettings({ ...settings, seo_default_title: e.target.value })}
          />

          <Textarea
            label="תיאור SEO ברירת מחדל"
            value={settings.seo_default_description}
            onChange={(e) => setSettings({ ...settings, seo_default_description: e.target.value })}
            rows={3}
          />
        </form>
      </Card>

      {/* Integrations */}
      <Card className="p-6">
        <h2 className="text-2xl font-heading font-bold text-primary mb-6">
          Integrations
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="n8n Webhook URL"
            type="url"
            value={settings.n8n_webhook_url}
            onChange={(e) => setSettings({ ...settings, n8n_webhook_url: e.target.value })}
            placeholder="https://..."
          />
        </form>
      </Card>

      <div className="flex justify-end">
        <Button
          variant="primary"
          size="lg"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <LoadingSpinner className="mr-2" />
              שומר...
            </>
          ) : (
            'שמור הגדרות'
          )}
        </Button>
      </div>
    </div>
  );
}

