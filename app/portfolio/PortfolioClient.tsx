'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface PortfolioItem {
  id: string;
  title_he: string;
  category_id: string;
  category_name: string;
  niche: string;
  challenge_he: string;
  solution_he: string;
  outcome_he: string;
  before_text_he?: string;
  after_text_he?: string;
  is_anonymous: boolean;
  is_published: boolean;
}

interface PortfolioClientProps {
  initialItems: PortfolioItem[];
}

const categories = [
  { id: 'all', name: 'הכל' },
  { id: 'landing-pages', name: 'דפי נחיתה' },
  { id: 'website-content', name: 'תוכן לאתרים' },
  { id: 'ads', name: 'מודעות' },
  { id: 'editing', name: 'עריכת לשון' },
];

export function PortfolioClient({ initialItems }: PortfolioClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredItems =
    selectedCategory === 'all'
      ? initialItems
      : initialItems.filter((item) => item.category_id === selectedCategory);

  return (
    <>
      {/* Filters */}
      <div className="flex flex-wrap gap-4 justify-center mb-12">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? 'primary' : 'secondary'}
            size="sm"
            className="min-w-[120px] hover-lift transition-all"
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>

      {/* Portfolio Grid */}
      {filteredItems.length === 0 ? (
        <Card className="p-12 text-center animate-fade-in">
          <p className="text-lg text-text-medium font-body">
            אין פרויקטים בקטגוריה הזו.
          </p>
          <p className="text-base text-text-medium font-body mt-4">
            רוצה תוצאה דומה? דברו איתי בוואטסאפ
          </p>
          <Button variant="primary" size="lg" className="mt-6 hover-lift" asChild>
            <a href="https://wa.me/972501234567" target="_blank" rel="noopener noreferrer">
              דברו איתי בוואטסאפ
            </a>
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <Card key={item.id} className="p-6 hover-lift bg-gradient-to-br from-white to-accent-sky/5 animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="mb-3">
                <span className="text-xs px-2 py-1 bg-accent-sky/20 text-accent-sky rounded font-medium">
                  {item.category_name}
                </span>
                {item.niche && (
                  <span className="text-xs px-2 py-1 bg-gray-100 text-text-medium rounded mr-2">
                    {item.niche}
                  </span>
                )}
              </div>
              <h3 className="text-xl font-heading font-bold text-primary mb-3">
                {item.title_he}
              </h3>
              <div className="space-y-3 mb-4">
                <div>
                  <p className="text-sm font-medium text-text-dark mb-1">האתגר:</p>
                  <p className="text-sm text-text-medium font-body">{item.challenge_he}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-text-dark mb-1">מה עשינו:</p>
                  <p className="text-sm text-text-medium font-body">{item.solution_he}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-text-dark mb-1">התוצאה:</p>
                  <p className="text-sm text-text-medium font-body">{item.outcome_he}</p>
                </div>
              </div>
              {(item.before_text_he || item.after_text_he) && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-3">
                    {item.before_text_he && (
                      <div className="p-2 bg-red-50 rounded text-xs">
                        <p className="font-medium text-red-700 mb-1">לפני:</p>
                        <p className="text-red-600 italic">{item.before_text_he}</p>
                      </div>
                    )}
                    {item.after_text_he && (
                      <div className="p-2 bg-green-50 rounded text-xs">
                        <p className="font-medium text-green-700 mb-1">אחרי:</p>
                        <p className="text-green-600 font-medium">{item.after_text_he}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </>
  );
}

