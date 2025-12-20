'use client';

import React from 'react';
import Link from 'next/link';

export const StickyCTAButton: React.FC = () => {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || '/contact';

  const handleClick = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'book_call_click', {
        event_category: 'engagement',
        event_label: 'sticky_button',
      });
    }
  };

  return (
    <Link
      href={calendlyUrl}
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 bg-primary hover:bg-primary-dark text-white rounded-lg px-6 py-4 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 font-heading font-medium"
      aria-label="קבע שיחת ייעוץ"
    >
      קבע שיחה
    </Link>
  );
};

