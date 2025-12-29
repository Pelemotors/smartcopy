'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import Image from 'next/image';

interface MediaLibraryProps {
  initialAssets: any[];
}

export function MediaLibrary({ initialAssets }: MediaLibraryProps) {
  const [assets] = useState(initialAssets);
  const [selectedAsset, setSelectedAsset] = useState<any>(null);

  if (assets.length === 0) {
    return (
      <Card className="p-12 text-center">
        <p className="text-lg text-text-medium font-body mb-6">
          עדיין לא הועלו קבצים.
        </p>
        <p className="text-base text-text-medium font-body">
          לחצו על &quot;העלה קובץ&quot; כדי להתחיל.
        </p>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {assets.map((asset) => (
        <Card
          key={asset.id}
          className="p-2 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => setSelectedAsset(asset)}
        >
          {asset.mime_type?.startsWith('image/') ? (
            <div className="relative aspect-square rounded overflow-hidden">
              <Image
                src={asset.file_path}
                alt={asset.alt_text_he || asset.filename}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
              />
            </div>
          ) : (
            <div className="aspect-square flex items-center justify-center bg-gray-100 rounded">
              <span className="text-4xl">📄</span>
            </div>
          )}
          <p className="text-xs text-text-medium font-body mt-2 truncate">
            {asset.filename}
          </p>
        </Card>
      ))}

      {selectedAsset && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setSelectedAsset(null)}>
          <Card className="max-w-2xl w-full m-4 p-6" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4">
              <h3 className="text-xl font-heading font-bold text-primary mb-2">
                {selectedAsset.filename}
              </h3>
              <p className="text-sm text-text-medium">
                {selectedAsset.mime_type} • {(selectedAsset.file_size / 1024).toFixed(2)} KB
              </p>
            </div>
            {selectedAsset.mime_type?.startsWith('image/') && (
              <div className="relative w-full h-96 rounded overflow-hidden mb-4">
                <Image
                  src={selectedAsset.file_path}
                  alt={selectedAsset.alt_text_he || selectedAsset.filename}
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200">
                מחיקה
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200" onClick={() => setSelectedAsset(null)}>
                סגירה
              </button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

