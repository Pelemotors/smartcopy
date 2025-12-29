'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';

interface FAQItemProps {
  question: string;
  answer: string;
}

export function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="p-4 hover-lift bg-gradient-to-r from-white to-accent-sky/5 border-l-4 border-accent-sky/30 transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-right flex justify-between items-center gap-4 group"
      >
        <span className="text-lg font-heading font-bold text-primary flex-1 group-hover:text-accent-sky transition-colors">
          {question}
        </span>
        <span className={`text-2xl text-text-medium flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          {isOpen ? '−' : '+'}
        </span>
      </button>
      {isOpen && (
        <div className="mt-4 pt-4 border-t border-accent-sky/20 animate-fade-in">
          <p className="text-text-dark font-body leading-relaxed">{answer}</p>
        </div>
      )}
    </Card>
  );
}

