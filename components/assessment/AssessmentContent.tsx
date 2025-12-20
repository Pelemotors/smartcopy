'use client';

import React from 'react';
import { DentalAssessmentQuiz } from '@/components/quiz/DentalAssessmentQuiz';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export function AssessmentContent() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary mb-6 tracking-tight">
          {t.assessment.title}
        </h1>
        <p className="text-lg md:text-xl text-text-medium font-body max-w-3xl mx-auto">
          {t.assessment.description}
        </p>
      </div>

      <DentalAssessmentQuiz />
    </div>
  );
}

