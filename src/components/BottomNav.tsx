import React from 'react';
import { Flag, Check, X } from 'lucide-react';
import { Question, UserAnswers } from '../types';

interface BottomNavProps {
  questions: Question[];
  answers: UserAnswers;
  submitted: boolean;
  flaggedQuestions: Set<number>;
  activePart: number;
  onQuestionClick: (questionId: number) => void;
}

export default function BottomNav({
  questions,
  answers,
  submitted,
  flaggedQuestions,
  activePart,
  onQuestionClick,
}: BottomNavProps) {
  // Check if a question is answered
  const isQuestionAnswered = (q: Question) => {
    return (answers[q.id] || '').trim() !== '';
  };

  // Check if answer is correct (only for submitted state)
  const isQuestionCorrect = (q: Question) => {
    if (q.id === 39 || q.id === 40) {
      const ans39 = (answers[39] || '').trim().toLowerCase();
      const ans40 = (answers[40] || '').trim().toLowerCase();
      const userAnswersSet = new Set([ans39, ans40]);
      if (q.id === 39) {
        return userAnswersSet.has('b');
      }
      if (q.id === 40) {
        return userAnswersSet.has('d');
      }
    }
    const userVal = (answers[q.id] || '').trim().toLowerCase();
    const correctVal = q.correctAnswer.trim().toLowerCase();
    return userVal === correctVal;
  };

  const getPartForQuestion = (id: number) => {
    if (id >= 1 && id <= 13) return 1;
    if (id >= 14 && id <= 26) return 2;
    return 3;
  };

  return (
    <div className="bg-white border-t border-[#0F0F0F]/10 px-4 py-4 sm:px-6 flex items-center gap-3 shrink-0 overflow-x-auto select-none z-10 font-sans">
      <div className="text-[10px] sm:text-xs font-bold text-[#0F0F0F]/50 uppercase tracking-widest shrink-0">
        Navigation:
      </div>

      <div className="flex items-center gap-4 min-w-0">
        {/* Render grouped sections */}
        {[
          { label: 'P1', range: [1, 13], part: 1 },
          { label: 'P2', range: [14, 26], part: 2 },
          { label: 'P3', range: [27, 40], part: 3 },
        ].map((section) => (
          <div key={section.label} className="flex items-center gap-1.5">
            <span className="text-[10px] font-extrabold text-[#0F0F0F]/40 mr-1.5">
              {section.label}
            </span>
            <div className="flex items-center gap-1.5">
              {questions
                .filter((q) => q.id >= section.range[0] && q.id <= section.range[1])
                .map((q) => {
                  const isCurrentPart = activePart === section.part;
                  const answered = isQuestionAnswered(q);
                  const flagged = flaggedQuestions.has(q.id);
                  const correct = submitted && isQuestionCorrect(q);

                  let buttonClass = '';

                  if (submitted) {
                    buttonClass = correct
                      ? 'bg-emerald-600 text-white border-emerald-700 hover:bg-emerald-700 font-bold'
                      : 'bg-rose-600 text-white border-rose-700 hover:bg-rose-700 font-bold';
                  } else {
                    if (answered) {
                      buttonClass = isCurrentPart
                        ? 'bg-[#0F0F0F] border-2 border-[#E2FF45] text-white font-bold shadow-xs'
                        : 'bg-[#0F0F0F] border border-[#0F0F0F] text-white/95';
                    } else {
                      buttonClass = isCurrentPart
                        ? 'bg-[#E2FF45] border-2 border-[#0F0F0F] text-[#0F0F0F] font-extrabold shadow-sm'
                        : 'bg-[#FAF8F5] border border-[#0F0F0F]/15 text-[#0F0F0F]/50 hover:border-[#0F0F0F] hover:text-[#0F0F0F]';
                    }
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => onQuestionClick(q.id)}
                      className={`relative w-7 h-7 sm:w-8 sm:h-8 rounded-lg border text-xs font-mono flex items-center justify-center transition active:scale-95 shrink-0 cursor-pointer ${buttonClass}`}
                      title={`Question ${q.id} (Part ${section.part})`}
                    >
                      {/* Flag Badge indicator */}
                      {!submitted && flagged && (
                        <span className="absolute -top-1.5 -right-1.5 bg-[#0F0F0F] border border-white text-white p-0.5 rounded-full shadow-xs shrink-0 animate-bounce">
                          <Flag size={8} fill="currentColor" className="stroke-[3]" />
                        </span>
                      )}

                      {/* Display content or tick */}
                      {submitted ? (
                        correct ? (
                          <Check size={12} className="stroke-[3]" />
                        ) : (
                          <X size={12} className="stroke-[3]" />
                        )
                      ) : (
                        <span>{q.id}</span>
                      )}
                    </button>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
