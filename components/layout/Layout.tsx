'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { Footer } from './Footer';
import { StickyWhatsAppButton } from './StickyWhatsAppButton';
import { StickyCTAButton } from './StickyCTAButton';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-background-cream">
        {!isAdminRoute && <Header />}
        <main className="flex-grow">{children}</main>
        {!isAdminRoute && <Footer />}
        {!isAdminRoute && (
          <>
            <StickyWhatsAppButton />
            <StickyCTAButton />
          </>
        )}
      </div>
    </LanguageProvider>
  );
};

