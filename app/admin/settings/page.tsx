import { Metadata } from 'next';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'הגדרות - מנהל',
  description: 'הגדרות כלליות',
};

export default function SettingsPage() {
  // TODO: Fetch settings from Supabase
  const settings = {
    phone: '',
    email: '',
    whatsapp: '',
    calendly_url: '',
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-heading font-bold text-text-dark mb-8">
        הגדרות
      </h1>

      <Card>
        <h2 className="text-2xl font-heading font-bold text-text-dark mb-6">
          פרטי יצירת קשר
        </h2>
        <form className="space-y-6">
          <Input
            label="טלפון"
            type="tel"
            defaultValue={settings.phone}
            placeholder="050-1234567"
          />

          <Input
            label="אימייל"
            type="email"
            defaultValue={settings.email}
            placeholder="example@email.com"
          />

          <Input
            label="וואטסאפ"
            type="tel"
            defaultValue={settings.whatsapp}
            placeholder="050-1234567"
          />

          <Input
            label="קישור Calendly"
            type="url"
            defaultValue={settings.calendly_url}
            placeholder="https://calendly.com/..."
          />

          <Button variant="primary" size="lg" type="submit">
            שמירה
          </Button>
        </form>
      </Card>
    </div>
  );
}

