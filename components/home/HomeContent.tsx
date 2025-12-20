'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { BeforeAfterGallery } from './BeforeAfterGallery';
import { ServicesCarousel } from './ServicesCarousel';

interface HomeContentProps {
  programs: any[];
}

export function HomeContent({ programs }: HomeContentProps) {
  const { t, isRTL } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      {/* Hero Section - עיצוב מודרני ונקי */}
      <section className={`relative mb-20 md:mb-32 py-12 md:py-20 bg-gradient-to-b from-white via-background-cream to-white`}>
        <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
          {/* Main Image - גדול ומרשים */}
          <div className="flex justify-center mb-10 md:mb-14">
            <div className="relative w-full max-w-5xl h-64 md:h-[450px] lg:h-[550px] rounded-2xl overflow-hidden shadow-xl border border-secondary/10">
              <Image
                src="/images/dental/dental-lab-hero.jpg"
                alt={t.home.hero.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary mb-6 max-w-4xl mx-auto leading-tight tracking-tight">
            {t.home.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-text-dark mb-6 font-body max-w-3xl mx-auto font-medium leading-relaxed">
            {t.home.hero.subtitle}
          </p>
          <p className="text-lg md:text-xl text-text-medium mb-10 font-body max-w-2xl mx-auto leading-relaxed">
            {t.home.hero.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" asChild>
              <Link href="/contact">{t.home.hero.cta1}</Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/assessment">{t.home.hero.cta2}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Preview - עיצוב נקי ומקצועי */}
      <section className="mb-20 md:mb-32">
        <Card className="border border-secondary/10 bg-white overflow-hidden">
          <div className={`flex flex-col ${isRTL ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-12 items-center`}>
            <div className="flex-shrink-0 w-full md:w-96">
              <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/images/dental/services/crowns.jpg"
                  alt={t.home.about.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 384px"
                />
              </div>
            </div>
            <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-5 tracking-tight">
                {t.home.about.title}
              </h2>
              <p className="text-lg md:text-xl text-text-dark font-body leading-relaxed mb-4 font-medium">
                {t.home.about.description1}
              </p>
              <p className="text-base md:text-lg text-text-medium font-body leading-relaxed mb-6">
                {t.home.about.description2}
              </p>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/about">{t.common.learnMore}</Link>
              </Button>
            </div>
          </div>
        </Card>
      </section>

      {/* Method Preview - עיצוב נקי ומקצועי */}
      <section className="mb-20 md:mb-32">
        <Card className="border border-secondary/10 bg-white overflow-hidden">
          <div className={`flex flex-col ${isRTL ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-12 items-center`}>
            <div className="flex-shrink-0 w-full md:w-96">
              <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/images/dental/services/bridges.jpg"
                  alt={t.home.process.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 384px"
                />
              </div>
            </div>
            <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-5 tracking-tight">
                {t.home.process.title}
              </h2>
              <p className="text-lg md:text-xl text-text-dark font-body leading-relaxed mb-4 font-medium">
                {t.home.process.description1}
              </p>
              <p className="text-base md:text-lg text-text-medium font-body leading-relaxed mb-6">
                {t.home.process.description2}
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="px-4 py-2 bg-accent/10 text-accent-dark border border-accent/20 rounded-lg text-sm font-medium">
                  {t.home.process.tags.cadcam}
                </span>
                <span className="px-4 py-2 bg-accent/10 text-accent-dark border border-accent/20 rounded-lg text-sm font-medium">
                  {t.home.process.tags.materials}
                </span>
                <span className="px-4 py-2 bg-accent/10 text-accent-dark border border-accent/20 rounded-lg text-sm font-medium">
                  {t.home.process.tags.support}
                </span>
              </div>
              <Button variant="primary" size="lg" asChild>
                <Link href="/method">{t.common.learnMore}</Link>
              </Button>
            </div>
          </div>
        </Card>
      </section>

      {/* Before/After Gallery - גלריית תוצאות */}
      <BeforeAfterGallery />

      {/* Technology Section - עיצוב מודרני */}
      <section className="mb-20 md:mb-32">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary mb-4 tracking-tight">
            טכנולוגיות מהשורה הראשונה
          </h2>
          <p className="text-lg md:text-xl text-text-medium font-body max-w-3xl mx-auto">
            המעבדה שלנו מצוידת בטכנולוגיות המתקדמות ביותר בעולם
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          <Card className="border border-secondary/10 bg-white text-center hover:border-accent/30 transition-colors">
            <div className="text-5xl mb-4">🖥️</div>
            <h3 className="text-xl md:text-2xl font-heading font-bold text-primary mb-3">CAD/CAM</h3>
            <p className="text-base text-text-medium font-body">תכנון וייצור דיגיטלי מדויק</p>
          </Card>
          <Card className="border border-secondary/10 bg-white text-center hover:border-accent/30 transition-colors">
            <div className="text-5xl mb-4">🖨️</div>
            <h3 className="text-xl md:text-2xl font-heading font-bold text-primary mb-3">הדפסת 3D</h3>
            <p className="text-base text-text-medium font-body">ייצור תלת-ממדי מתקדם</p>
          </Card>
          <Card className="border border-secondary/10 bg-white text-center hover:border-accent/30 transition-colors">
            <div className="text-5xl mb-4">🔬</div>
            <h3 className="text-xl md:text-2xl font-heading font-bold text-primary mb-3">סריקה דיגיטלית</h3>
            <p className="text-base text-text-medium font-body">דיוק מקסימלי במידות</p>
          </Card>
        </div>
      </section>

      {/* Services Section - עם קרוסלה במובייל */}
      <ServicesCarousel />

      {/* CTA Section - עיצוב מודרני */}
      <section className="text-center mb-16 md:mb-24">
        <Card className="bg-gradient-to-br from-primary/5 via-white to-accent/5 border border-primary/10">
          <div className="py-12 md:py-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary mb-6 tracking-tight">
              {t.home.cta.title}
            </h2>
            <p className="text-lg md:text-xl text-text-medium mb-10 font-body max-w-3xl mx-auto">
              {t.home.cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg" asChild>
                <Link href="/contact">{t.home.cta.button1}</Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/assessment">{t.home.cta.button2}</Link>
              </Button>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
