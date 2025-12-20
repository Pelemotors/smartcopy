'use client';

import React from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface QuizAnswer {
  text: string;
  score: number;
}

interface QuizQuestionType {
  id: number;
  text: string;
  answers: QuizAnswer[];
  isInformational?: boolean;
}

interface QuizQuestionProps {
  question: QuizQuestionType;
  selectedAnswer: number | null;
  onAnswerSelect: (answerIndex: number) => void;
  questionNumber: number;
  totalQuestions: number;
}

export const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  selectedAnswer,
  onAnswerSelect,
  questionNumber,
  totalQuestions,
}) => {
  const { t, isRTL } = useLanguage();

  return (
    <div className="w-full">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className={`flex justify-between items-center mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <span className="text-sm font-body text-text-medium">
            {isRTL ? `שאלה ${questionNumber} מתוך ${totalQuestions}` : `Question ${questionNumber} of ${totalQuestions}`}
          </span>
          <span className="text-sm font-body text-text-medium">
            {Math.round((questionNumber / totalQuestions) * 100)}%
          </span>
        </div>
        <div className="w-full bg-secondary/20 rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <h2 className={`text-2xl md:text-3xl font-heading font-bold text-primary mb-8 text-center ${isRTL ? 'text-right' : 'text-left'}`}>
        {question.text}
      </h2>

      {/* Answers */}
      <div className="space-y-4">
        {question.answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => onAnswerSelect(index)}
            className={`w-full p-6 rounded-lg border-2 transition-all duration-300 font-body text-lg ${
              isRTL ? 'text-right' : 'text-left'
            } ${
              selectedAnswer === index
                ? 'border-primary bg-primary/10 shadow-md'
                : 'border-secondary/30 bg-white hover:border-primary hover:bg-primary/5'
            }`}
          >
            {answer.text}
          </button>
        ))}
      </div>
    </div>
  );
};
