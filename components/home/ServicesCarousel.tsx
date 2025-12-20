'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/Card';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

interface Service {
  id: string;
  image: string;
  title: string;
  description: string;
  items: string[];
}

export function ServicesCarousel() {
  const { t, isRTL } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const desktopScrollRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);

  // מידע סטטי על השירותים - ללא Supabase
  const services: Service[] = [
    {
      id: 'crowns',
      image: '/images/dental/services/crowns.jpg',
      title: 'כתרים דנטליים',
      description: 'כתרי זירקוניה, E-max ומתכת-קרמיקה באיכות גבוהה. פתרונות אסתטיים ועמידים לשיקום שיניים.',
      items: [
        'כתרי זירקוניה מלאים',
        'כתרי E-max',
        'כתרי מתכת-קרמיקה',
        'כתרים זמניים',
        'שיקום אסתטי מושלם',
      ],
    },
    {
      id: 'dentures',
      image: '/images/dental/services/dentures.jpg',
      title: 'תותבות שיניים',
      description: 'תותבות חלקיות ומלאות מותאמות אישית. נוחות מקסימלית, אסתטיקה מעולה ותפקוד אופטימלי.',
      items: [
        'תותבות חלקיות',
        'תותבות מלאות',
        'תותבות על שתלים',
        'תותבות גמישות',
        'התאמה אישית מושלמת',
      ],
    },
    {
      id: 'bridges',
      image: '/images/dental/services/bridges.jpg',
      title: 'גשרים דנטליים',
      description: 'גשרים קבועים וזמניים לשיקום שיניים חסרות. פתרונות מדויקים ועמידים לאורך שנים.',
      items: [
        'גשרים קבועים',
        'גשרי זירקוניה',
        'גשרי E-max',
        'גשרים זמניים',
        'שיקום פונקציונלי ואסתטי',
      ],
    },
    {
      id: 'implants',
      image: '/images/dental/services/implants.jpg',
      title: 'שיקום על שתלים',
      description: 'שיקום שיניים מתקדם על שתלים דנטליים. פתרונות קבועים ועמידים לאורך שנים רבות.',
      items: [
        'כתרים על שתלים',
        'תותבות על שתלים',
        'גשרים על שתלים',
        'שיקום מלא',
        'פתרונות קבועים ועמידים',
      ],
    },
    {
      id: 'restorations',
      image: '/images/dental/services/full-restoration.jpg',
      title: 'שיקום מלא',
      description: 'שיקום שיניים מקיף ומקצועי. פתרונות מותאמים אישית לכל צורך ולכל מצב.',
      items: [
        'שיקום מלא של הפה',
        'תכנון מקיף',
        'פתרונות מותאמים',
        'ליווי מקצועי',
        'תוצאות מושלמות',
      ],
    },
  ];

  // עדכון currentIndex בהתאם למיקום ה-scroll (רק אם זה לא scroll מתוכנת)
  const handleScroll = useCallback((container: HTMLDivElement) => {
    if (isScrollingRef.current) return;
    
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.offsetWidth;
    const gap = 24; // 24px gap
    const cardWithGap = cardWidth + gap;
    const newIndex = Math.round(scrollLeft / cardWithGap);
    
    // עדכון רק אם האינדקס השתנה והוא תקין
    setCurrentIndex((prevIndex) => {
      if (newIndex !== prevIndex && newIndex >= 0 && newIndex < services.length) {
        return newIndex;
      }
      return prevIndex;
    });
  }, [services.length]);

  // עדכון scroll כשמשתמש לוחץ על נקודות או חצים
  useEffect(() => {
    const containers = [mobileScrollRef.current, desktopScrollRef.current].filter(Boolean) as HTMLDivElement[];
    if (containers.length === 0) return;
    
    isScrollingRef.current = true;
    
    containers.forEach((container) => {
      const cardWidth = container.offsetWidth;
      const gap = 24;
      const cardWithGap = cardWidth + gap;
      const scrollPosition = currentIndex * cardWithGap;
      
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    });

    // איפוס הדגל אחרי שהאנימציה מסתיימת
    const timeout = setTimeout(() => {
      isScrollingRef.current = false;
    }, 500);

    return () => clearTimeout(timeout);
  }, [currentIndex]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToNext = () => {
    if (currentIndex < services.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <section className="mb-20 md:mb-32">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary mb-4 tracking-tight">
          השירותים שלנו
        </h2>
        <p className={`text-lg md:text-xl text-text-medium font-body max-w-3xl mx-auto`}>
          מעבדת שיניים מקצועית המציעה פתרונות מקיפים לשיקום שיניים באיכות גבוהה
        </p>
      </div>

      {/* Mobile Carousel - רק במובייל */}
      <div className="block md:hidden">
        <div
          ref={mobileScrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-6 px-4 pb-4"
          onScroll={(e) => handleScroll(e.currentTarget)}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
            scrollBehavior: 'smooth',
          }}
        >
          {services.map((service, index) => (
            <div
              key={service.id}
              className="flex-shrink-0 w-[85vw] snap-center scroll-snap-align-center"
            >
              <Card className="border border-secondary/10 bg-white hover:border-accent/30 transition-all h-full shadow-md overflow-hidden">
                {/* תמונה */}
                <div className="relative w-full h-48 mb-4">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 85vw, 400px"
                  />
                </div>
                <div className="px-4 pb-4">
                  <h3 className="text-2xl font-heading font-bold text-primary mb-3 text-center">
                    {service.title}
                  </h3>
                  <p className="text-base text-text-medium font-body mb-4 text-center">
                    {service.description}
                  </p>
                  <ul className={`text-sm text-text-light space-y-2 mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {service.items.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-accent mt-1 flex-shrink-0">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <Button variant="secondary" size="md" className="w-full" asChild>
                      <Link href="/contact">{t.common.learnMore}</Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? 'w-8 bg-primary'
                  : 'w-2 bg-secondary/30 hover:bg-secondary/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-between items-center mt-4 px-4">
          <button
            onClick={goToPrev}
            disabled={currentIndex === 0}
            className={`p-3 rounded-full border-2 transition-all ${
              currentIndex === 0
                ? 'border-secondary/20 text-secondary/30 cursor-not-allowed'
                : 'border-primary text-primary hover:bg-primary hover:text-white'
            }`}
            aria-label="Previous service"
          >
            <svg
              className={`w-6 h-6 ${isRTL ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <span className="text-sm text-text-medium font-body">
            {currentIndex + 1} / {services.length}
          </span>

          <button
            onClick={goToNext}
            disabled={currentIndex === services.length - 1}
            className={`p-3 rounded-full border-2 transition-all ${
              currentIndex === services.length - 1
                ? 'border-secondary/20 text-secondary/30 cursor-not-allowed'
                : 'border-primary text-primary hover:bg-primary hover:text-white'
            }`}
            aria-label="Next service"
          >
            <svg
              className={`w-6 h-6 ${isRTL ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Desktop Carousel - קרוסלה גם בדסקטופ */}
      <div className="hidden md:block">
        <div
          ref={desktopScrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-6 md:gap-8 px-4 pb-4"
          onScroll={(e) => handleScroll(e.currentTarget)}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
            scrollBehavior: 'smooth',
          }}
        >
          {services.map((service, index) => (
            <div
              key={service.id}
              className="flex-shrink-0 w-[45vw] lg:w-[30vw] snap-center scroll-snap-align-center"
            >
              <Card className="border border-secondary/10 bg-white hover:border-accent/30 hover:shadow-lg transition-all duration-300 overflow-hidden h-full">
                {/* תמונה */}
                <div className="relative w-full h-56 mb-4">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 45vw, 30vw"
                  />
                </div>
                <div className="px-4 pb-4">
                  <h3 className="text-xl md:text-2xl font-heading font-bold text-primary mb-3 text-center">
                    {service.title}
                  </h3>
                  <p className="text-base text-text-medium font-body mb-4 text-center">
                    {service.description}
                  </p>
                  <ul className={`text-sm text-text-light space-y-2 mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {service.items.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-accent mt-1 flex-shrink-0">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <Button variant="secondary" size="md" className="w-full" asChild>
                      <Link href="/contact">{t.common.learnMore}</Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Navigation Dots - גם בדסקטופ */}
        <div className="flex justify-center gap-2 mt-6">
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? 'w-8 bg-primary'
                  : 'w-2 bg-secondary/30 hover:bg-secondary/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation Arrows - גם בדסקטופ */}
        <div className="flex justify-between items-center mt-4 px-4 max-w-4xl mx-auto">
          <button
            onClick={goToPrev}
            disabled={currentIndex === 0}
            className={`p-3 rounded-full border-2 transition-all ${
              currentIndex === 0
                ? 'border-secondary/20 text-secondary/30 cursor-not-allowed'
                : 'border-primary text-primary hover:bg-primary hover:text-white'
            }`}
            aria-label="Previous service"
          >
            <svg
              className={`w-6 h-6 ${isRTL ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <span className="text-sm text-text-medium font-body">
            {currentIndex + 1} / {services.length}
          </span>

          <button
            onClick={goToNext}
            disabled={currentIndex === services.length - 1}
            className={`p-3 rounded-full border-2 transition-all ${
              currentIndex === services.length - 1
                ? 'border-secondary/20 text-secondary/30 cursor-not-allowed'
                : 'border-primary text-primary hover:bg-primary hover:text-white'
            }`}
            aria-label="Next service"
          >
            <svg
              className={`w-6 h-6 ${isRTL ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center mt-12">
        <p className="text-lg text-text-medium font-body mb-6">
          {t.common.notSure}
        </p>
        <Button variant="primary" size="lg" asChild>
          <Link href="/assessment">{t.common.freeAssessment}</Link>
        </Button>
      </div>
    </section>
  );
}

