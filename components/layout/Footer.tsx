'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    main: [] as { href: string; label: string }[],
    legal: [] as { href: string; label: string }[],
  };

  return (
    <footer className="bg-gradient-to-br from-primary-dark via-primary to-primary-bright text-white mt-auto">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-3xl md:text-4xl font-heading font-black mb-4 text-white">
              מחשבון מימון רכב
            </h3>
            <p className="text-white/90 text-base font-body font-medium">
              חשב את החזר המימון החודשי שלך בצורה פשוטה ומהירה
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/30 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/90 text-sm font-body font-medium">
              © {currentYear} מחשבון מימון רכב. כל הזכויות שמורות.
            </p>
            {footerLinks.legal.length > 0 && (
              <div className="flex gap-6">
                {footerLinks.legal.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-white/90 hover:text-white text-sm transition-colors font-body font-medium"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

