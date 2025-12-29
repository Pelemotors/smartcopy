'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '../ui/Button';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, language, setLanguage, isRTL } = useLanguage();

  const navItems = [
    { href: '/', label: 'בית' },
    { href: '/services', label: 'שירותים' },
    { href: '/portfolio', label: 'תיק עבודות' },
    { href: '/about', label: 'אודות' },
    { href: '/contact', label: 'צור קשר' },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'he' ? 'ru' : 'he');
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm sticky top-0 z-50 border-b border-accent-sky/20 shadow-md">
      <div className="container mx-auto px-4">
        <div className={`flex items-center ${isRTL ? 'justify-between' : 'justify-between'} h-16 md:h-20`}>
          {/* Logo - מינימליסטי */}
          <Link href="/" className={`flex flex-col ${isRTL ? 'items-start' : 'items-end'} hover:opacity-70 transition-all duration-300 group`}>
            <span className="text-xl md:text-2xl font-heading font-bold text-primary group-hover:text-accent-sky transition-colors">
              Sarit Hadar
            </span>
            <span className={`text-xs text-text-medium font-body hidden sm:block ${isRTL ? 'text-right' : 'text-left'} group-hover:text-accent-lavender transition-colors`}>
              כתיבת תוכן ועריכת לשון
            </span>
          </Link>

          {/* Desktop Navigation - נקי ומינימליסטי */}
          <nav className={`hidden md:flex items-center gap-8 ${isRTL ? 'flex-row' : 'flex-row-reverse'}`}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-text-dark hover:text-accent-sky font-medium transition-all duration-300 font-body text-sm relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-accent-sky to-accent-lavender group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
            <Button variant="secondary" size="sm" asChild className="hover-lift border-primary text-primary hover:bg-primary hover:text-white">
              <Link href="/assessment">בדיקה מהירה בחינם</Link>
            </Button>
            <Button variant="primary" size="sm" asChild className="hover-lift bg-gradient-to-r from-primary to-accent-sky">
              <a href="https://wa.me/972501234567" target="_blank" rel="noopener noreferrer">לשיחה בוואטסאפ</a>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
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
              <Button variant="secondary" size="sm" asChild className="w-full mt-2">
                <Link href="/assessment" onClick={() => setIsMenuOpen(false)}>
                  בדיקה מהירה בחינם
                </Link>
              </Button>
              <Button variant="primary" size="sm" asChild className="w-full mt-2">
                <a href="https://wa.me/972501234567" target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)}>
                  לשיחה בוואטסאפ
                </a>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

