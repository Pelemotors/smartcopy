'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { QuizQuestion } from './QuizQuestion';
import { QuizResult } from './QuizResult';
import { calculateTier } from '@/lib/quizData';

interface QuizState {
  currentQuestionIndex: number;
  answers: (number | null)[];
  isComplete: boolean;
  score: number | null;
  tier: 1 | 2 | 3 | null;
  leadSaved: boolean;
}

export const DentalAssessmentQuiz: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const [state, setState] = useState<QuizState>({
    currentQuestionIndex: 0,
    answers: new Array(7).fill(null),
    isComplete: false,
    score: null,
    tier: null,
    leadSaved: false,
  });

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('quiz_progress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setState(parsed);
      } catch (e) {
        // Ignore parse errors
      }
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    if (state.currentQuestionIndex > 0) {
      localStorage.setItem('quiz_progress', JSON.stringify(state));
    }
  }, [state]);

  const getQuestionText = (index: number): string => {
    const questions = t.quiz.questions;
    switch (index) {
      case 0: return questions.q1;
      case 1: return questions.q2;
      case 2: return questions.q3;
      case 3: return questions.q4;
      case 4: return questions.q5;
      case 5: return questions.q6;
      case 6: return questions.q7;
      default: return '';
    }
  };

  const getAnswers = (index: number): { text: string; score: number }[] => {
    const questions = t.quiz.questions;
    switch (index) {
      case 0:
        return [
          { text: questions.q1a1, score: 0 },
          { text: questions.q1a2, score: 0 },
          { text: questions.q1a3, score: 0 },
          { text: questions.q1a4, score: 0 },
          { text: questions.q1a5, score: 0 },
        ];
      case 1:
        return [
          { text: questions.q2a1, score: 0 },
          { text: questions.q2a2, score: 1 },
          { text: questions.q2a3, score: 2 },
          { text: questions.q2a4, score: 3 },
        ];
      case 2:
        return [
          { text: questions.q3a1, score: 1 },
          { text: questions.q3a2, score: 2 },
          { text: questions.q3a3, score: 2 },
          { text: questions.q3a4, score: 3 },
        ];
      case 3:
        return [
          { text: questions.q4a1, score: 0 },
          { text: questions.q4a2, score: 1 },
          { text: questions.q4a3, score: 2 },
          { text: questions.q4a4, score: 3 },
        ];
      case 4:
        return [
          { text: questions.q5a1, score: 0 },
          { text: questions.q5a2, score: 2 },
          { text: questions.q5a3, score: 1 },
          { text: questions.q5a4, score: 1 },
        ];
      case 5:
        return [
          { text: questions.q6a1, score: 0 },
          { text: questions.q6a2, score: 1 },
          { text: questions.q6a3, score: 2 },
          { text: questions.q6a4, score: 3 },
        ];
      case 6:
        return [
          { text: questions.q7a1, score: 0 },
          { text: questions.q7a2, score: 1 },
          { text: questions.q7a3, score: 2 },
          { text: questions.q7a4, score: 3 },
        ];
      default:
        return [];
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...state.answers];
    newAnswers[state.currentQuestionIndex] = answerIndex;

    // Track event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'dental_quiz_question_answered', {
        event_category: 'engagement',
        event_label: `question_${state.currentQuestionIndex + 1}`,
      });
    }

    setState({
      ...state,
      answers: newAnswers,
    });
  };

  const handleNext = () => {
    if (state.currentQuestionIndex < 6) {
      setState({
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
      });
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (state.currentQuestionIndex > 0) {
      setState({
        ...state,
        currentQuestionIndex: state.currentQuestionIndex - 1,
      });
    }
  };

  const handleComplete = () => {
    // Calculate score (only questions 2-7, skip question 1)
    let score = 0;
    for (let i = 1; i < 7; i++) {
      const answerIndex = state.answers[i];
      if (answerIndex !== null) {
        const answers = getAnswers(i);
        score += answers[answerIndex].score;
      }
    }

    const tier = calculateTier(score);

    // Track events
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'dental_quiz_completed', {
        event_category: 'engagement',
        event_label: `tier_${tier}`,
      });

      window.gtag('event', `dental_quiz_result_tier_${tier}`, {
        event_category: 'engagement',
        event_label: `score_${score}`,
      });
    }

    setState({
      ...state,
      isComplete: true,
      score,
      tier,
      leadSaved: false,
    });

    // Clear localStorage
    localStorage.removeItem('quiz_progress');
  };

  const saveLeadToDatabase = async (name: string, phone: string) => {
    if (!state.score || !state.tier) {
      throw new Error('Missing quiz score or tier');
    }

    try {
      // Prepare quiz responses
      const quizResponses = state.answers
        .map((answerIndex, questionIndex) => {
          if (answerIndex === null) return null;
          const answers = getAnswers(questionIndex);
          const answer = answers[answerIndex];
          return {
            question_index: questionIndex,
            answer_value: answer.text,
            answer_score: answer.score,
          };
        })
        .filter((r): r is { question_index: number; answer_value: string; answer_score: number } => r !== null);

      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          phone: phone,
          child_age: state.answers[0] !== null ? getAnswers(0)[state.answers[0]].text : '',
          message: '',
          source: 'dental_quiz',
          quiz_score: state.score,
          quiz_tier: state.tier,
          quiz_responses: quizResponses,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.error('Failed to save lead:', response.status, responseData);
        throw new Error(responseData.error || t.quiz.contactForm.saving);
      }

      setState({
        ...state,
        leadSaved: true,
      });
    } catch (error) {
      console.error('Failed to save quiz result:', error);
      throw error;
    }
  };

  const handleRetake = () => {
    setState({
      currentQuestionIndex: 0,
      answers: new Array(7).fill(null),
      isComplete: false,
      score: null,
      tier: null,
      leadSaved: false,
    });
    localStorage.removeItem('quiz_progress');
  };

  // Track quiz start
  useEffect(() => {
    if (state.currentQuestionIndex === 0 && !state.isComplete) {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'dental_quiz_started', {
          event_category: 'engagement',
        });
      }
    }
  }, [state.currentQuestionIndex, state.isComplete]);

  if (state.isComplete && state.tier) {
    const results = t.quiz.results;
    const result = {
      tier: state.tier,
      title: state.tier === 1 ? results.tier1Title : state.tier === 2 ? results.tier2Title : results.tier3Title,
      summary: state.tier === 1 ? results.tier1Summary : state.tier === 2 ? results.tier2Summary : results.tier3Summary,
      whatsappMessage: state.tier === 1 
        ? (isRTL ? 'שלום, עשיתי את ההערכה באתר. יש לי צורך בסיסי בשירותי שיניים. אשמח לשיחה.' : 'Здравствуйте, я прошел оценку на сайте. У меня базовая потребность в стоматологических услугах. Буду рад поговорить.')
        : state.tier === 2 
        ? (isRTL ? 'שלום, עשיתי את ההערכה באתר. יש לי צורך בשירותי שיניים. אשמח לשמוע עוד על התהליך.' : 'Здравствуйте, я прошел оценку на сайте. У меня есть потребность в стоматологических услугах. Буду рад услышать больше о процессе.')
        : (isRTL ? 'שלום, עשיתי את ההערכה באתר ונראה שיש לי צורך מורכב בשירותי שיניים. אשמח לשיחת היכרות.' : 'Здравствуйте, я прошел оценку на сайте, и похоже, что у меня сложная потребность в стоматологических услугах. Буду рад знакомству.'),
      ctaText: {
        whatsapp: state.tier === 1 ? results.tier1WhatsApp : state.tier === 2 ? results.tier2WhatsApp : results.tier3WhatsApp,
        call: state.tier === 1 ? results.tier1Call : state.tier === 2 ? results.tier2Call : results.tier3Call,
      },
    };

    return (
      <QuizResult
        result={result}
        score={state.score || 0}
        onRetake={handleRetake}
        onSaveLead={saveLeadToDatabase}
      />
    );
  }

  const currentQuestionText = getQuestionText(state.currentQuestionIndex);
  const currentAnswers = getAnswers(state.currentQuestionIndex);
  const hasSelectedAnswer = state.answers[state.currentQuestionIndex] !== null;

  const question = {
    id: state.currentQuestionIndex + 1,
    text: currentQuestionText,
    answers: currentAnswers,
    isInformational: state.currentQuestionIndex === 0,
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <QuizQuestion
        question={question}
        selectedAnswer={state.answers[state.currentQuestionIndex]}
        onAnswerSelect={handleAnswerSelect}
        questionNumber={state.currentQuestionIndex + 1}
        totalQuestions={7}
      />

      <div className={`flex justify-between items-center mt-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <button
          onClick={handlePrevious}
          disabled={state.currentQuestionIndex === 0}
          className={`px-6 py-3 rounded-lg font-heading font-medium transition-all ${
            state.currentQuestionIndex === 0
              ? 'bg-secondary/20 text-secondary/40 cursor-not-allowed'
              : 'bg-secondary text-white hover:bg-secondary-dark'
          }`}
        >
          {isRTL ? '← חזרה' : '← Back'}
        </button>

        <button
          onClick={handleNext}
          disabled={!hasSelectedAnswer}
          className={`px-6 py-3 rounded-lg font-heading font-medium transition-all ${
            !hasSelectedAnswer
              ? 'bg-secondary/20 text-secondary/40 cursor-not-allowed'
              : 'bg-primary text-white hover:bg-primary-dark'
          }`}
        >
          {state.currentQuestionIndex === 6
            ? (isRTL ? 'סיום' : 'Finish')
            : (isRTL ? 'הבא →' : 'Next →')}
        </button>
      </div>
    </div>
  );
};

