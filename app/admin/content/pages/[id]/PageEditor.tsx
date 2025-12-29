'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface PageEditorProps {
  page: any;
}

export function PageEditor({ page }: PageEditorProps) {
  const [blocks, setBlocks] = useState(page.blocks || []);

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-heading font-bold text-primary">
            בלוקים
          </h2>
          <Button variant="primary">
            הוסף בלוק
          </Button>
        </div>

        {blocks.length === 0 ? (
          <p className="text-text-medium font-body text-center py-8">
            עדיין לא נוספו בלוקים. לחצו על &quot;הוסף בלוק&quot; כדי להתחיל.
          </p>
        ) : (
          <div className="space-y-4">
            {blocks.map((block: any, index: number) => (
              <Card key={block.id} className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-heading font-bold text-primary">
                      {block.block_types?.display_name_he || block.block_types?.name}
                    </h3>
                    <p className="text-sm text-text-medium">
                      סדר: {block.order_index}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm">
                      עריכה
                    </Button>
                    <Button variant="secondary" size="sm">
                      מחיקה
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Card>

      <div className="flex gap-4">
        <Button variant="primary">
          שמור שינויים
        </Button>
        <Button variant="secondary">
          תצוגה מקדימה
        </Button>
        <Button variant="secondary">
          פרסם
        </Button>
      </div>
    </div>
  );
}

