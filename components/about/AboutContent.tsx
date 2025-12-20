'use client';

import Image from 'next/image';
import { Card } from '@/components/ui/Card';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export function AboutContent() {
  const { t, isRTL } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary mb-6 tracking-tight`}>
            {t.about.title}
          </h1>
        </div>

        {/* Hero Image */}
        <div className="mb-12 md:mb-16">
          <div className="relative w-full h-80 md:h-[500px] rounded-2xl overflow-hidden shadow-xl border border-secondary/10">
            <Image
              src="/images/dental/dental-lab-about.jpg"
              alt={t.about.heroTitle}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 896px"
            />
          </div>
        </div>

        <Card className="mb-12 border border-secondary/10 bg-white">
          <div className={`flex flex-col ${isRTL ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-12 items-center`}>
            <div className="flex-shrink-0 w-full md:w-80">
              <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/images/dental/services/implants.jpg"
                  alt={t.about.heroTitle}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 320px"
                />
              </div>
            </div>
            <div className="flex-grow">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-5 tracking-tight">
                {t.about.leadingLab}
              </h2>
              <p className="text-lg md:text-xl text-text-dark font-body leading-relaxed mb-4 font-medium">
                {t.about.description1}
              </p>
              <p className="text-base md:text-lg text-text-medium font-body leading-relaxed mb-4">
                {t.about.description2}
              </p>
              <p className="text-base md:text-lg text-text-medium font-body leading-relaxed mb-4">
                {t.about.description3}
              </p>
              <p className="text-base md:text-lg text-text-medium font-body leading-relaxed">
                {t.about.description4}
              </p>
            </div>
          </div>
        </Card>

        <Card className="mb-12 border border-secondary/10 bg-white">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6 tracking-tight">
            {t.about.historyTitle}
          </h2>
          <p className="text-lg md:text-xl text-text-dark font-body leading-relaxed mb-4 font-medium">
            {t.about.history1}
          </p>
          <p className="text-base md:text-lg text-text-medium font-body leading-relaxed mb-4">
            {t.about.history2}
          </p>
          <p className="text-base md:text-lg text-text-medium font-body leading-relaxed mb-4">
            {t.about.history3}
          </p>
          <p className="text-base md:text-lg text-text-medium font-body leading-relaxed">
            {t.about.history4}
          </p>
        </Card>

        <Card className="border border-secondary/10 bg-white">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6 tracking-tight">
            {t.about.visionTitle}
          </h2>
          <p className="text-lg md:text-xl text-text-dark font-body leading-relaxed mb-8 font-medium">
            {t.about.vision1}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-accent/5 p-6 rounded-xl border border-accent/20 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-heading font-bold text-xl text-primary mb-3">{t.about.professionalism}</h3>
              <p className="text-text-medium font-body text-base">{t.about.professionalismDesc}</p>
            </div>
            <div className="bg-accent/5 p-6 rounded-xl border border-accent/20 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-heading font-bold text-xl text-primary mb-3">{t.about.advancedTech}</h3>
              <p className="text-text-medium font-body text-base">{t.about.advancedTechDesc}</p>
            </div>
            <div className="bg-accent/5 p-6 rounded-xl border border-accent/20 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-heading font-bold text-xl text-primary mb-3">{t.about.quality}</h3>
              <p className="text-text-medium font-body text-base">{t.about.qualityDesc}</p>
            </div>
            <div className="bg-accent/5 p-6 rounded-xl border border-accent/20 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-heading font-bold text-xl text-primary mb-3">{t.about.personalService}</h3>
              <p className="text-text-medium font-body text-base">{t.about.personalServiceDesc}</p>
            </div>
          </div>
          <p className="text-text-dark/80 font-body text-base leading-relaxed">
            {t.about.vision2}
          </p>
        </Card>
      </div>
    </div>
  );
}

