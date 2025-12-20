'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface DeleteButtonProps {
  postId: string;
}

export function DeleteButton({ postId }: DeleteButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm('האם את בטוחה שברצונך למחוק את המאמר הזה?')) {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/admin/blog/${postId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.refresh();
      } else {
        const data = await response.json();
        alert(data.error || 'שגיאה במחיקת המאמר');
      }
    } catch (error) {
      alert('שגיאה כללית. נסי שוב מאוחר יותר.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-red-500 hover:text-red-700 font-body disabled:opacity-50"
    >
      {isDeleting ? 'מוחק...' : 'מחק'}
    </button>
  );
}

