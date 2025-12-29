'use client';

import React from 'react';
import { QuickAuditForm } from './QuickAuditForm';

export function AssessmentContent() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary mb-6 tracking-tight">
          בדיקה מהירה: מה הדבר הראשון שהייתי מתקנת בטקסט שלך
        </h1>
        <p className="text-lg md:text-xl text-text-medium font-body max-w-3xl mx-auto mb-8">
          2 דקות מילוי — ואת/ה מקבל/ת כיוון ברור להמשך.
        </p>
        <div className="max-w-3xl mx-auto text-right space-y-4 mb-8">
          <p className="text-base text-text-dark font-body">
            לפעמים לא צריך "לכתוב הכול מחדש".
            <br />
            מספיק לזהות מה <em>לא ברור</em> (או מה נשמע גנרי) ולתקן את הדבר הראשון שמפיל פניות.
          </p>
          <p className="text-base text-text-dark font-body">
            בבדיקה הזו אני בודקת:
          </p>
          <ul className="text-base text-text-dark font-body list-disc list-inside space-y-2 mr-4">
            <li>האם המסר ברור תוך כמה שניות</li>
            <li>האם הצעת הערך חד־משמעית</li>
            <li>האם הקריאה לפעולה מובילה לפנייה</li>
          </ul>
        </div>
      </div>

      <QuickAuditForm />
    </div>
  );
}

