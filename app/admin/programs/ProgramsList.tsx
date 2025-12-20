'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

interface Program {
  id: string;
  name_he: string;
  description_he: string;
  active: boolean;
  display_order: number;
}

interface ProgramsListProps {
  initialPrograms: Program[];
}

export function ProgramsList({ initialPrograms }: ProgramsListProps) {
  const [programs, setPrograms] = useState<Program[]>(initialPrograms);

  const handleDelete = async (programId: string) => {
    if (!confirm('האם את בטוחה שברצונך למחוק את המסלול הזה?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/programs/${programId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPrograms(programs.filter(p => p.id !== programId));
      } else {
        const data = await response.json();
        alert(data.error || 'שגיאה במחיקת המסלול');
      }
    } catch (error) {
      console.error('Error deleting program:', error);
      alert('שגיאה כללית. נסי שוב מאוחר יותר.');
    }
  };

  if (programs.length === 0) {
    return (
      <Card className="text-center py-12">
        <p className="text-text-dark/60 font-body mb-4">
          אין מסלולים עדיין
        </p>
        <Button variant="primary" size="md" asChild>
          <Link href="/admin/programs/new">צרי מסלול ראשון</Link>
        </Button>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {programs.map((program) => (
        <Card key={program.id}>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-heading font-bold text-text-dark">
              {program.name_he}
            </h3>
            {program.active ? (
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-body">
                פעיל
              </span>
            ) : (
              <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-body">
                לא פעיל
              </span>
            )}
          </div>
          <p className="text-text-dark/80 font-body mb-4 line-clamp-3">
            {program.description_he}
          </p>
          <div className="flex gap-4">
            <Button variant="primary" size="sm" asChild>
              <Link href={`/admin/programs/${program.id}/edit`}>
                עריכה
              </Link>
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleDelete(program.id)}
            >
              מחיקה
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}

