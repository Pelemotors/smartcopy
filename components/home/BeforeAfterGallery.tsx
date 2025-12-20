'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/Card';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface BeforeAfterItem {
  id: number;
  before: string;
  after: string;
  title: string;
  description: string;
}

// תמונות לפני ואחרי - סטטיות
const beforeAfterItems: BeforeAfterItem[] = [
  {
    id: 1,
    before: '/images/dental/before-after/before-1.jpg',
    after: '/images/dental/before-after/after-1.jpg',
    title: 'שיקום כתרים מלא',
    description: 'תוצאה מושלמת עם כתרי זירקוניה',
  },
  {
    id: 2,
    before: '/images/dental/before-after/before-2.jpg',
    after: '/images/dental/before-after/after-2.jpg',
    title: 'תותבות חלקיות',
    description: 'נוחות מקסימלית ואסתטיקה מושלמת',
  },
  {
    id: 3,
    before: '/images/dental/before-after/before-3.jpg',
    after: '/images/dental/before-after/after-3.jpg',
    title: 'גשר דנטלי',
    description: 'פתרון מדויק ואיכותי',
  },
];

export function BeforeAfterGallery() {
  const { t, isRTL } = useLanguage();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showBefore, setShowBefore] = useState(true);

  const currentItem = beforeAfterItems[selectedIndex];

  return (
    <section className="mb-24 md:mb-32">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary mb-4 tracking-tight">
          תוצאות העבודה שלנו
        </h2>
        <p className="text-lg md:text-xl text-text-medium font-body max-w-3xl mx-auto">
          גלריית תמונות לפני ואחרי - עדות לאיכות ולמקצועיות שלנו
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <Card className="border border-secondary/10 bg-white p-6 md:p-8 overflow-hidden">
          {/* Main Image Display */}
          <div className="relative w-full h-64 md:h-96 lg:h-[500px] rounded-xl overflow-hidden mb-8 shadow-lg">
            <div className="relative w-full h-full">
              <Image
                src={showBefore ? currentItem.before : currentItem.after}
                alt={showBefore ? 'לפני' : 'אחרי'}
                fill
                className="object-cover transition-opacity duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                unoptimized
              />
              
              {/* Toggle Button */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
                <button
                  onClick={() => setShowBefore(!showBefore)}
                  className="px-6 py-3 bg-white rounded-lg border border-secondary/20 hover:border-primary shadow-md hover:shadow-lg transition-all font-medium text-primary flex items-center gap-3"
                >
                  <span className="text-sm md:text-base">
                    {showBefore ? 'לחץ לראות אחרי' : 'לחץ לראות לפני'}
                  </span>
                </button>
              </div>

              {/* Labels */}
              <div className="absolute top-4 left-4 px-4 py-2 bg-primary text-white rounded-lg font-medium shadow-md">
                {showBefore ? 'לפני' : 'אחרי'}
              </div>
            </div>
          </div>

          {/* Item Info */}
          <div className="text-center mb-8">
            <h3 className="text-xl md:text-2xl font-heading font-bold text-primary mb-2">
              {currentItem.title}
            </h3>
            <p className="text-base text-text-medium font-body">
              {currentItem.description}
            </p>
          </div>

          {/* Thumbnail Navigation */}
          <div className="grid grid-cols-3 gap-4">
            {beforeAfterItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedIndex(index);
                  setShowBefore(true);
                }}
                className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                  selectedIndex === index
                    ? 'border-primary ring-2 ring-primary/20 shadow-md'
                    : 'border-secondary/20 hover:border-secondary/40 shadow-sm hover:shadow-md'
                }`}
              >
                <Image
                  src={item.before}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 33vw, 200px"
                  unoptimized
                />
              </button>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}

