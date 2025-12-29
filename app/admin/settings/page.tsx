import { Metadata } from 'next';
import { Card } from '@/components/ui/Card';
import { SettingsForm } from './SettingsForm';
import { supabaseServer } from '@/lib/supabaseServerClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'הגדרות - מנהל',
  description: 'הגדרות כלליות',
};

async function getSettings() {
  try {
    const { data, error } = await supabaseServer
      .from('settings')
      .select('*');

    if (error) {
      console.error('Error fetching settings:', error);
      return {};
    }

    const settingsObj: Record<string, any> = {};
    (data || []).forEach((setting) => {
      settingsObj[setting.key] = setting.value;
    });

    return settingsObj;
  } catch (error) {
    console.error('Error fetching settings:', error);
    return {};
  }
}

export default async function SettingsPage() {
  const settings = await getSettings();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-heading font-bold text-text-dark mb-8">
        הגדרות
      </h1>

      <SettingsForm initialSettings={settings} />
    </div>
  );
}
