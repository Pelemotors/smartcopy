'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    main: [
      { href: '/', label: t.nav.home },
      { href: '/about', label: t.nav.about },
      { href: '/method', label: t.nav.method },
      { href: '/programs', label: t.nav.services },
    ],
    info: [
      { href: '/testimonials', label: t.nav.testimonials },
      { href: '/blog', label: t.nav.blog },
      { href: '/contact', label: t.nav.contact },
      { href: '/assessment', label: t.nav.assessment },
    ],
    legal: [
      { href: '/privacy', label: t.footer.privacy },
      { href: '/terms', label: t.footer.terms },
      { href: '/accessibility', label: t.footer.accessibility },
    ],
  };

  return (
    <footer className="bg-primary text-white mt-auto">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-3xl md:text-4xl font-heading font-black mb-4 text-white">
              {t.footer.brand}
            </h3>
            <p className="text-white font-body mb-4 font-bold text-lg">
              {t.footer.subtitle}
            </p>
            <p className="text-white/90 text-base font-body font-medium">
              {t.footer.description}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading font-semibold mb-4">{t.footer.navigation}</h4>
            <ul className="space-y-2">
              {footerLinks.main.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/90 hover:text-white transition-colors font-body font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4">{t.footer.information}</h4>
            <ul className="space-y-2">
              {footerLinks.info.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/90 hover:text-white transition-colors font-body font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/30 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/90 text-sm font-body font-medium">
              © {currentYear} {t.footer.copyright}
            </p>
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
          </div>
        </div>
      </div>
    </footer>
  );
};

