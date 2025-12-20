'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '../ui/Button';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, language, setLanguage, isRTL } = useLanguage();

  const navItems = [
    { href: '/', label: t.nav.home },
    { href: '/about', label: t.nav.about },
    { href: '/method', label: t.nav.method },
    { href: '/programs', label: t.nav.services },
    { href: '/testimonials', label: t.nav.testimonials },
    { href: '/blog', label: t.nav.blog },
    { href: '/contact', label: t.nav.contact },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'he' ? 'ru' : 'he');
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm sticky top-0 z-50 border-b border-secondary/10 shadow-sm">
      <div className="container mx-auto px-4">
        <div className={`flex items-center ${isRTL ? 'justify-between' : 'justify-between'} h-16 md:h-20`}>
          {/* Logo - מינימליסטי */}
          <Link href="/" className={`flex flex-col ${isRTL ? 'items-start' : 'items-end'} hover:opacity-70 transition-opacity`}>
            <span className="text-xl md:text-2xl font-heading font-bold text-primary">
              {language === 'he' ? 'מעבדת שיניים' : 'Зуботехническая лаборатория'}
            </span>
            <span className={`text-xs text-text-medium font-body hidden sm:block ${isRTL ? 'text-right' : 'text-left'}`}>
              {language === 'he' 
                ? 'טכנאי שיניים מוסמך'
                : 'Сертифицированный зубной техник'}
            </span>
          </Link>

          {/* Desktop Navigation - נקי ומינימליסטי */}
          <nav className={`hidden md:flex items-center gap-8 ${isRTL ? 'flex-row' : 'flex-row-reverse'}`}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-text-dark hover:text-primary font-medium transition-colors font-body text-sm relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-200"></span>
              </Link>
            ))}
            <Button variant="primary" size="sm" asChild>
              <Link href="/contact">{t.common.bookCall}</Link>
            </Button>
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 rounded border border-secondary/20 hover:border-primary transition-colors font-medium text-sm text-text-dark"
              aria-label={language === 'he' ? 'Switch to Russian' : 'Переключить на иврит'}
            >
              {language === 'he' ? 'RU' : 'עב'}
            </button>
          </nav>

          {/* Mobile Menu Button & Language Switcher */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 rounded border border-secondary/20 hover:border-primary transition-colors font-medium text-sm text-text-dark"
              aria-label={language === 'he' ? 'Switch to Russian' : 'Переключить на иврит'}
            >
              {language === 'he' ? 'RU' : 'עב'}
            </button>
            <button
              className="p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={language === 'he' ? 'תפריט' : 'Меню'}
            >
            <svg
              className="w-6 h-6 text-text-dark"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-secondary/10">
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-text-dark hover:text-primary transition-colors font-body py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Button variant="primary" size="sm" asChild className="w-full mt-2">
                <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                  {t.common.bookCall}
                </Link>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

