import { Metadata } from 'next';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MediaLibrary } from './MediaLibrary';
import { supabaseServer } from '@/lib/supabaseServerClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Media Library - מנהל',
  description: 'ניהול מדיה',
};

async function getMediaAssets() {
  try {
    const { data, error } = await supabaseServer
      .from('media_assets')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching media:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching media:', error);
    return [];
  }
}

export default async function MediaPage() {
  const mediaAssets = await getMediaAssets();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-heading font-bold text-text-dark">
          Media Library
        </h1>
        <Button variant="primary">
          העלה קובץ
        </Button>
      </div>

      <MediaLibrary initialAssets={mediaAssets} />
    </div>
  );
}

