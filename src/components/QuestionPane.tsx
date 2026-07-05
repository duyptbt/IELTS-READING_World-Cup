import React, { useState } from 'react';
import { Question, UserAnswers } from '../types';
import { HEADING_OPTIONS, SENTENCE_ENDINGS } from '../data';
import { Flag, Search, Check, X, Compass, HelpCircle } from 'lucide-react';

interface QuestionPaneProps {
  questions: Question[];
  answers: UserAnswers;
  onAnswerChange: (questionId: number, answer: string) => void;
  submitted: boolean;
  activePart: number;
  flaggedQuestions: Set<number>;
  onToggleFlag: (questionId: number) => void;
  onFindInPassage: (paragraphId: string) => void;
  selectedHeadingVal?: string | null;
  setSelectedHeadingVal?: (value: string | null) => void;
}

export default function QuestionPane({
  questions,
  answers,
  onAnswerChange,
  submitted,
  activePart,
  flaggedQuestions,
  onToggleFlag,
  onFindInPassage,
  selectedHeadingVal = null,
  setSelectedHeadingVal = () => {},
}: QuestionPaneProps) {
  // Filter questions for the active part
  const partQuestions = questions.filter((q) => q.part === activePart);

  // Group questions by their interactive section headings
  const sections = React.useMemo(() => {
    if (activePart === 1) {
      return [
        {
          id: 'tfng-1',
          title: 'Questions 1–6',
          rangeText: 'TRUE / FALSE / NOT GIVEN',
          instructions: 'Do the following statements agree with the information given in the Reading Passage? Choose TRUE, FALSE, or NOT GIVEN.',
          questions: partQuestions.filter((q) => q.id >= 1 && q.id <= 6),
        },
        {
          id: 'summary-1',
          title: 'Questions 7–10',
          rangeText: 'SUMMARY COMPLETION',
          instructions: 'Complete the summary below. Choose NO MORE THAN TWO WORDS from the passage for each answer.',
          questions: partQuestions.filter((q) => q.id >= 7 && q.id <= 10),
          isSummaryBlock: true,
        },
        {
          id: 'mc-1',
          title: 'Questions 11–13',
          rangeText: 'MULTIPLE CHOICE',
          instructions: 'Choose the correct letter, A, B, C or D.',
          questions: partQuestions.filter((q) => q.id >= 11 && q.id <= 13),
        },
      ];
    } else if (activePart === 2) {
      return [
        {
          id: 'heading-2',
          title: 'Questions 14–18',
          rangeText: 'MATCHING HEADINGS',
          instructions: 'The reading passage has six paragraphs, A–F. Match each paragraph to the correct heading from the list of headings below. Paragraph A has been done as an example. (On desktop, drag headings to paragraph boxes. On mobile or touchscreens, click a heading and then click a paragraph target)',
          questions: partQuestions.filter((q) => q.id >= 14 && q.id <= 18),
          isHeadingBlock: true,
        },
        {
          id: 'tfng-2',
          title: 'Questions 19–22',
          rangeText: 'TRUE / FALSE / NOT GIVEN',
          instructions: 'Do the following statements agree with the information given in the Reading Passage? Choose TRUE, FALSE, or NOT GIVEN.',
          questions: partQuestions.filter((q) => q.id >= 19 && q.id <= 22),
        },
        {
          id: 'summary-2',
          title: 'Questions 23–26',
          rangeText: 'SUMMARY COMPLETION',
          instructions: 'Complete the summary below. Choose NO MORE THAN TWO WORDS from the passage for each answer.',
          questions: partQuestions.filter((q) => q.id >= 23 && q.id <= 26),
          isSummaryBlock: true,
        },
      ];
    } else {
      return [
        {
          id: 'tfng-3',
          title: 'Questions 27–30',
          rangeText: 'YES / NO / NOT GIVEN',
          instructions: 'Do the following statements agree with the claims made by the writer? Choose YES, NO, or NOT GIVEN.',
          questions: partQuestions.filter((q) => q.id >= 27 && q.id <= 30),
        },
        {
          id: 'sentence-matching-3',
          title: 'Questions 31–35',
          rangeText: 'MATCHING SENTENCE ENDINGS',
          instructions: 'Complete each sentence with the correct ending, A–H, below.',
          questions: partQuestions.filter((q) => q.id >= 31 && q.id <= 35),
          isSentenceMatching: true,
        },
        {
          id: 'mc-3',
          title: 'Questions 36–38',
          rangeText: 'MULTIPLE CHOICE',
          instructions: 'Choose the correct letter, A, B, C or D.',
          questions: partQuestions.filter((q) => q.id >= 36 && q.id <= 38),
        },
        {
          id: 'combo-3',
          title: 'Questions 39–40',
          rangeText: 'MULTIPLE CHOICE — CHOOSE TWO',
          instructions: 'Which TWO of the following are identified in the passage as consequences of hosting a World Cup? Choose TWO letters, A–E.',
          questions: partQuestions.filter((q) => q.id === 39 || q.id === 40),
          isComboBlock: true,
        },
      ];
    }
  }, [activePart, partQuestions]);

  // Handle Drag & Drop events
  const handleDragStart = (e: React.DragEvent, value: string) => {
    if (submitted) return;
    e.dataTransfer.setData('text/plain', value);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, questionId: number) => {
    e.preventDefault();
    if (submitted) return;
    const value = e.dataTransfer.getData('text/plain');
    onAnswerChange(questionId, value);
  };

  // Click-to-place fallback for Headings Matching
  const handleHeadingChipClick = (value: string) => {
    if (submitted) return;
    if (selectedHeadingVal === value) {
      setSelectedHeadingVal(null); // Toggle off
    } else {
      setSelectedHeadingVal(value);
    }
  };

  const handleDropZoneClick = (questionId: number) => {
    if (submitted) return;
    if (selectedHeadingVal) {
      onAnswerChange(questionId, selectedHeadingVal);
      setSelectedHeadingVal(null); // Reset selection
    } else {
      // Clear answer on click if no chip is selected (acts as reset)
      onAnswerChange(questionId, '');
    }
  };

  // Combo Selection (Checkbox matching for 39 and 40)
  const handleComboCheckboxChange = (optionLetter: string) => {
    if (submitted) return;
    
    // Collect selected letters from both 39 and 40 state answers
    const ans39 = answers[39] || '';
    const ans40 = answers[40] || '';
    const currentSelected = [ans39, ans40].filter(Boolean);

    if (currentSelected.includes(optionLetter)) {
      // Uncheck
      const filtered = currentSelected.filter((o) => o !== optionLetter);
      onAnswerChange(39, filtered[0] || '');
      onAnswerChange(40, '');
    } else {
      // Check
      if (currentSelected.length < 2) {
        if (!ans39) {
          onAnswerChange(39, optionLetter);
        } else {
          onAnswerChange(40, optionLetter);
        }
      } else {
        // Already selected 2, replace the second one
        onAnswerChange(40, optionLetter);
      }
    }
  };

  const isComboChecked = (optionLetter: string) => {
    const ans39 = answers[39] || '';
    const ans40 = answers[40] || '';
    return ans39 === optionLetter || ans40 === optionLetter;
  };

  return (
    <div className="pane-question bg-[#F4F1EE] text-[#0F0F0F] h-full overflow-y-auto px-6 py-8 sm:px-8 sm:py-10 flex flex-col space-y-8 select-none">
      
      {/* Sections rendering */}
      {sections.map((section) => {
        return (
          <div key={section.id} className="bg-white rounded-[24px] border border-[#0F0F0F]/10 shadow-sm overflow-hidden flex flex-col shrink-0">
            {/* Section Banner Header */}
            <div className="bg-[#0F0F0F] px-6 py-4 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 shrink-0">
              <span className="text-[10px] tracking-[0.2em] font-extrabold text-[#E2FF45] uppercase">
                {section.rangeText}
              </span>
              <h3 className="text-xs font-bold uppercase tracking-[0.05em] text-white/90">
                {section.title}
              </h3>
            </div>

            {/* Section Instructions */}
            <div className="bg-[#FAF8F5] border-b border-[#0F0F0F]/10 px-6 py-3 text-xs leading-relaxed text-[#0F0F0F]/60 font-sans italic flex items-start gap-2">
              <HelpCircle size={15} className="text-[#0F0F0F]/40 mt-0.5 shrink-0" />
              <span>{section.instructions}</span>
            </div>

            {/* Interactive Components Rendering */}

            {/* Type A: HEADING MATCHING BANK (only on heading block) */}
            {section.isHeadingBlock && (
              <div className="px-6 py-4 border-b border-[#0F0F0F]/10 bg-[#FAF8F5]">
                <span className="text-[10px] font-bold text-[#0F0F0F]/50 block mb-3 uppercase tracking-widest">
                  List of Headings (Available Options)
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {HEADING_OPTIONS.map((opt) => {
                    const isExample = opt.value === 'ii';
                    const isCurrentlySelected = selectedHeadingVal === opt.value;
                    return (
                      <div
                        key={opt.value}
                        draggable={!submitted && !isExample}
                        onDragStart={(e) => handleDragStart(e, opt.value)}
                        onClick={() => !isExample && handleHeadingChipClick(opt.value)}
                        className={`p-3.5 rounded-xl text-xs font-sans transition-all duration-150 select-none ${
                          isExample
                            ? 'bg-white border border-[#0F0F0F]/5 text-[#0F0F0F]/30 cursor-not-allowed opacity-50'
                            : isCurrentlySelected
                            ? 'bg-[#E2FF45] border border-[#0F0F0F] text-[#0F0F0F] font-bold shadow-md scale-[1.01] cursor-pointer'
                            : 'bg-white border border-[#0F0F0F]/15 hover:border-[#0F0F0F] text-[#0F0F0F] shadow-2xs cursor-grab active:cursor-grabbing hover:bg-[#FAF8F5]/50'
                        }`}
                      >
                        <strong className="text-[#0F0F0F] mr-2 font-mono font-bold">
                          {opt.value.toUpperCase()}
                        </strong>
                        <span className="font-medium text-[#0F0F0F]/85">{opt.text.substring(opt.text.indexOf('.') + 1).trim()}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Type B: SENTENCE ENDINGS BANK */}
            {section.isSentenceMatching && (
              <div className="px-6 py-4 border-b border-[#0F0F0F]/10 bg-[#FAF8F5] text-xs text-[#0F0F0F]">
                <span className="font-bold uppercase text-[#0F0F0F]/50 block mb-2 tracking-widest text-[10px]">
                  List of Endings (A–H)
                </span>
                <div className="grid grid-cols-1 gap-2">
                  {SENTENCE_ENDINGS.map((ending) => (
                    <div key={ending.value} className="bg-white p-3 rounded-xl border border-[#0F0F0F]/15 flex items-start gap-2">
                      <strong className="text-[#0F0F0F] font-mono font-bold shrink-0 w-5 text-center">
                        {ending.value}
                      </strong>
                      <span className="text-[#0F0F0F]/80">{ending.text.substring(ending.text.indexOf('.') + 1).trim()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* QUESTIONS LISTING */}
            <div className="divide-y divide-[#0F0F0F]/10">
              
              {/* Type C: SUMMARY BLOCKS */}
              {section.isSummaryBlock ? (
                <div className="p-6 bg-white text-sm sm:text-base leading-loose font-serif text-[#0F0F0F]/90">
                  {section.id === 'summary-1' ? (
                    <div>
                      <h4 className="font-bold text-[#0F0F0F] text-[10px] uppercase tracking-widest mb-4 font-sans">
                        The Fate of a Trophy
                      </h4>
                      <div className="bg-[#FAF8F5] border border-[#0F0F0F]/10 p-5 rounded-2xl space-y-4">
                        <p>
                          Brazil's 1970 victory meant the team could keep the original trophy{' '}
                          <SummaryInput
                            qn={7}
                            answers={answers}
                            onAnswerChange={onAnswerChange}
                            submitted={submitted}
                            correctVal="permanently"
                          />{' '}
                          (7), since it was their third championship. However, this reward proved short-lived: in 1983 the trophy was stolen a second time and was never recovered, with investigators suspecting it had been{' '}
                          <SummaryInput
                            qn={8}
                            answers={answers}
                            onAnswerChange={onAnswerChange}
                            submitted={submitted}
                            correctVal="melted down"
                          />{' '}
                          (8) for its valuable material. A new prize, commissioned in{' '}
                          <SummaryInput
                            qn={9}
                            answers={answers}
                            onAnswerChange={onAnswerChange}
                            submitted={submitted}
                            correctVal="1974"
                          />{' '}
                          (9), replaced it, though under revised rules, winning nations now only keep a{' '}
                          <SummaryInput
                            qn={10}
                            answers={answers}
                            onAnswerChange={onAnswerChange}
                            submitted={submitted}
                            correctVal="gold-plated replica"
                          />{' '}
                          (10) to take home.
                        </p>
                      </div>

                      {submitted && (
                        <div className="mt-4 bg-[#FAF8F5] border border-[#0F0F0F]/10 rounded-xl p-5 font-sans text-xs space-y-2">
                          <span className="font-bold text-[#0F0F0F] uppercase tracking-wider text-[10px] block mb-2">Summary Explanations:</span>
                          <ul className="list-disc pl-4 text-[#0F0F0F]/75 space-y-1">
                            <li><strong>Q7:</strong> permanently — <em>"entitled the nation to retain the trophy permanently" (Paragraph D)</em></li>
                            <li><strong>Q8:</strong> melted down — <em>"investigators believe it was melted down for its precious metal content" (Paragraph D)</em></li>
                            <li><strong>Q9:</strong> 1974 — <em>"had already been commissioned in 1974" (Paragraph D)</em></li>
                            <li><strong>Q10:</strong> gold-plated replica — <em>"winning nations would receive only a gold-plated replica to keep" (Paragraph D)</em></li>
                          </ul>
                          <button
                            onClick={() => onFindInPassage('D')}
                            className="mt-3 text-[#0F0F0F] hover:bg-[#0F0F0F]/5 font-semibold flex items-center gap-1.5 cursor-pointer bg-white px-4 py-2 rounded-full border border-[#0F0F0F]/15 shadow-2xs"
                          >
                            <Compass size={13} />
                            Find All summary Clues in Paragraph D
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <h4 className="font-bold text-[#0F0F0F] text-[10px] uppercase tracking-widest mb-4 font-sans">
                        On-Field Innovations and Commercialization
                      </h4>
                      <div className="bg-[#FAF8F5] border border-[#0F0F0F]/10 p-5 rounded-2xl space-y-4">
                        <p>
                          Modern football matches are frequently disrupted by tactics involving{' '}
                          <SummaryInput
                            qn={23}
                            answers={answers}
                            onAnswerChange={onAnswerChange}
                            submitted={submitted}
                            correctVal="gamesmanship"
                          />{' '}
                          (23), where players intentionally slow down the match to safeguard their lead. In response, tournament officials have introduced fixed countdown restrictions to minimize delays during restarts. Furthermore, the technical responsibilities of the{' '}
                          <SummaryInput
                            qn={24}
                            answers={answers}
                            onAnswerChange={onAnswerChange}
                            submitted={submitted}
                            correctVal="VAR"
                          />{' '}
                          (24) have been widened to assist in resolving complicated boundary line questions and problematic yellow cards.
                        </p>
                        <p>
                          This mechanical evolution is paired with a cultural one, as host cities are incorporating comprehensive{' '}
                          <SummaryInput
                            qn={25}
                            answers={answers}
                            onAnswerChange={onAnswerChange}
                            submitted={submitted}
                            correctVal="ancillary entertainment"
                          />{' '}
                          (25) alongside the sporting fixtures. This strategy explicitly mimics successful American business templates, transforming the tournament from a pure competition into a highly coordinated{' '}
                          <SummaryInput
                            qn={26}
                            answers={answers}
                            onAnswerChange={onAnswerChange}
                            submitted={submitted}
                            correctVal="entertainment platform"
                          />{' '}
                          (26) that will likely reshape the future landscape of global sports.
                        </p>
                      </div>

                      {submitted && (
                        <div className="mt-4 bg-[#FAF8F5] border border-[#0F0F0F]/10 rounded-xl p-5 font-sans text-xs space-y-2">
                          <span className="font-bold text-[#0F0F0F] uppercase tracking-wider text-[10px] block mb-2">Summary Explanations:</span>
                          <ul className="list-disc pl-4 text-[#0F0F0F]/75 space-y-1">
                            <li><strong>Q23:</strong> gamesmanship — <em>"systematic gamesmanship, particularly the deliberate deceleration of play" (Paragraph E)</em></li>
                            <li><strong>Q24:</strong> VAR — <em>"technological oversight assigned to the Video Assistant Referee (VAR) system" (Paragraph E)</em></li>
                            <li><strong>Q25:</strong> ancillary entertainment — <em>"integration of widespread ancillary entertainment, such as synchronized multi-city concert series" (Paragraph F)</em></li>
                            <li><strong>Q26:</strong> entertainment platform — <em>"embracing a new identity as a global entertainment platform" (Paragraph F)</em></li>
                          </ul>
                          <div className="flex flex-wrap gap-2 mt-3">
                            <button
                              onClick={() => onFindInPassage('E')}
                              className="text-[#0F0F0F] hover:bg-[#0F0F0F]/5 font-semibold flex items-center gap-1.5 cursor-pointer bg-white px-4 py-2 rounded-full border border-[#0F0F0F]/15 shadow-2xs"
                            >
                              <Compass size={13} />
                              Find Q23–24 Clues in Paragraph E
                            </button>
                            <button
                              onClick={() => onFindInPassage('F')}
                              className="text-[#0F0F0F] hover:bg-[#0F0F0F]/5 font-semibold flex items-center gap-1.5 cursor-pointer bg-white px-4 py-2 rounded-full border border-[#0F0F0F]/15 shadow-2xs"
                            >
                              <Compass size={13} />
                              Find Q25–26 Clues in Paragraph F
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                /* Standard, individual sequential questions */
                section.questions.map((q) => {
                  const userAnswer = answers[q.id] || '';
                  const isFlagged = flaggedQuestions.has(q.id);
                  let isCorrect = userAnswer.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();
                  if (q.id === 39 || q.id === 40) {
                    const ans39 = (answers[39] || '').trim().toLowerCase();
                    const ans40 = (answers[40] || '').trim().toLowerCase();
                    const userAnswersSet = new Set([ans39, ans40]);
                    if (q.id === 39) {
                      isCorrect = userAnswersSet.has('b');
                    } else if (q.id === 40) {
                      isCorrect = userAnswersSet.has('d');
                    }
                  }

                  // Layout render depending on block type
                  return (
                    <div
                      key={q.id}
                      className={`p-6 transition-colors duration-150 relative ${
                        submitted
                          ? isCorrect
                            ? 'bg-emerald-50/40 hover:bg-emerald-50/60'
                            : 'bg-rose-50/40 hover:bg-rose-50/60'
                          : 'hover:bg-[#FAF8F5]/30'
                      }`}
                    >
                      {/* Flex wrapper for layout */}
                      <div className="flex items-start gap-4">
                        {/* Question Badge Index */}
                        <div className="shrink-0 flex flex-col items-center">
                          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0F0F0F] text-white font-mono font-bold text-xs shadow-xs">
                            {q.id}
                          </span>
                          {!submitted && (
                            <button
                              onClick={() => onToggleFlag(q.id)}
                              className={`mt-2 p-1 rounded-md transition-colors ${
                                isFlagged ? 'text-[#0F0F0F] hover:text-[#0F0F0F]/70' : 'text-[#0F0F0F]/20 hover:text-[#0F0F0F]/40'
                              }`}
                              title={isFlagged ? 'Remove flag' : 'Mark for review'}
                            >
                              <Flag size={14} fill={isFlagged ? 'currentColor' : 'none'} />
                            </button>
                          )}
                        </div>

                        {/* Question Stem Body */}
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-bold text-[#0F0F0F] mb-4 font-sans leading-relaxed">
                            {q.stem}
                          </div>

                          {/* Render input selector by type */}

                          {/* 1. TRUE/FALSE/NOT GIVEN / YES/NO/NOT GIVEN */}
                          {q.type === 'TFNG' && (
                            <div className="flex flex-wrap gap-2">
                              {['TRUE', 'FALSE', 'NOT GIVEN', 'YES', 'NO'].includes(q.correctAnswer) && (
                                <>
                                  {/* Generate correct standard labels */}
                                  {((q.correctAnswer === 'YES' || q.correctAnswer === 'NO' || q.part === 3) ? ['YES', 'NO', 'NOT GIVEN'] : ['TRUE', 'FALSE', 'NOT GIVEN']).map((opt) => (
                                    <label
                                      key={opt}
                                      className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold cursor-pointer transition select-none ${
                                        userAnswer === opt
                                          ? 'bg-[#0F0F0F] border-[#0F0F0F] text-white shadow-md font-bold'
                                          : 'bg-[#FAF8F5] border-[#0F0F0F]/10 text-[#0F0F0F]/70 hover:bg-white hover:border-[#0F0F0F]'
                                      }`}
                                    >
                                      <input
                                        type="radio"
                                        name={`q-${q.id}`}
                                        value={opt}
                                        disabled={submitted}
                                        checked={userAnswer === opt}
                                        onChange={() => onAnswerChange(q.id, opt)}
                                        className="sr-only"
                                      />
                                      <span>{opt}</span>
                                    </label>
                                  ))}
                                </>
                              )}
                            </div>
                          )}

                          {/* 2. MATCHING HEADINGS (Interactive selection fallback) */}
                          {q.type === 'HEADING' && (
                            <div className="space-y-2.5">
                              {/* Drag Target Area / Drop Zone */}
                              <div
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDrop(e, q.id)}
                                onClick={() => handleDropZoneClick(q.id)}
                                className={`min-h-[48px] border border-dashed rounded-xl px-4 py-3 flex items-center justify-between text-xs transition-all duration-200 cursor-pointer ${
                                  submitted
                                    ? isCorrect
                                      ? 'bg-emerald-50/50 border-emerald-400'
                                      : 'bg-rose-50/50 border-rose-400'
                                    : userAnswer
                                    ? 'bg-white border-[#0F0F0F] shadow-xs'
                                    : 'bg-[#FAF8F5] border-[#0F0F0F]/20 hover:border-[#0F0F0F]'
                                }`}
                              >
                                {userAnswer ? (
                                  <div className="flex items-center gap-2">
                                    <span className="bg-[#0F0F0F] text-[#E2FF45] border border-[#0F0F0F] font-mono font-bold px-2 py-0.5 rounded text-[10px] uppercase shrink-0">
                                      {userAnswer.toUpperCase()}
                                    </span>
                                    <span className="text-[#0F0F0F] font-semibold">
                                      {HEADING_OPTIONS.find((h) => h.value === userAnswer)?.text.split('.')[1] || ''}
                                    </span>
                                  </div>
                                ) : (
                                  <span className="text-[#0F0F0F]/40 italic">
                                    {selectedHeadingVal
                                      ? `Click here to place heading: ${selectedHeadingVal.toUpperCase()}`
                                      : 'Drag heading chip here, or choose from dropdown'
                                    }
                                  </span>
                                )}
                                {userAnswer && !submitted && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onAnswerChange(q.id, '');
                                    }}
                                    className="text-[#0F0F0F]/40 hover:text-[#0F0F0F] font-bold font-mono text-sm px-1 cursor-pointer"
                                  >
                                    ×
                                  </button>
                                )}
                              </div>

                              {/* Dropdown fallback selector for ease of use (fully synced with chip selection) */}
                              {!submitted && (
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] text-[#0F0F0F]/50 uppercase font-bold shrink-0 tracking-wider">
                                    Or Select:
                                  </span>
                                  <select
                                    value={userAnswer}
                                    onChange={(e) => onAnswerChange(q.id, e.target.value)}
                                    className="text-xs bg-white border border-[#0F0F0F]/15 rounded-lg px-3 py-2 text-[#0F0F0F] outline-none hover:border-[#0F0F0F] flex-1"
                                  >
                                    <option value="">— choose heading —</option>
                                    {HEADING_OPTIONS.filter((h) => h.value !== 'ii').map((h) => (
                                      <option key={h.value} value={h.value}>
                                        {h.text}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              )}
                            </div>
                          )}

                          {/* 3. MULTIPLE CHOICE (Pill-like cards) */}
                          {q.type === 'MC' && q.options && (
                            <div className="grid grid-cols-1 gap-2">
                              {q.options.map((opt) => {
                                const optionLetter = opt.substring(0, opt.indexOf('.')).trim();
                                return (
                                  <label
                                    key={opt}
                                    className={`p-3.5 rounded-xl border text-xs font-medium cursor-pointer transition flex items-start gap-2.5 select-none ${
                                      userAnswer === optionLetter
                                        ? 'bg-[#0F0F0F] border-[#0F0F0F] text-white shadow-md font-semibold'
                                        : 'bg-[#FAF8F5] border-[#0F0F0F]/10 text-[#0F0F0F]/85 hover:bg-white hover:border-[#0F0F0F]'
                                    }`}
                                  >
                                    <input
                                      type="radio"
                                      name={`q-${q.id}`}
                                      value={optionLetter}
                                      disabled={submitted}
                                      checked={userAnswer === optionLetter}
                                      onChange={() => onAnswerChange(q.id, optionLetter)}
                                      className="sr-only"
                                    />
                                    <strong className={`shrink-0 font-mono text-[10px] w-6 h-6 rounded-full flex items-center justify-center font-bold ${
                                      userAnswer === optionLetter ? 'bg-[#E2FF45] border border-[#0F0F0F] text-[#0F0F0F]' : 'bg-[#0F0F0F]/5 border border-[#0F0F0F]/10 text-[#0F0F0F]/70'
                                    }`}>
                                      {optionLetter}
                                    </strong>
                                    <span className="flex-1 mt-0.5">{opt.substring(opt.indexOf('.') + 1).trim()}</span>
                                  </label>
                                );
                              })}
                            </div>
                          )}

                          {/* 4. MATCHING SENTENCE ENDINGS (Dropdown selection) */}
                          {q.type === 'MATCHING_ENDINGS' && (
                            <div className="flex items-center gap-3">
                              <span className="text-xs text-[#0F0F0F]/50 uppercase font-bold shrink-0 tracking-wider">
                                Choose Ending:
                              </span>
                              <select
                                value={userAnswer}
                                disabled={submitted}
                                onChange={(e) => onAnswerChange(q.id, e.target.value)}
                                className={`text-xs rounded-lg border px-3 py-2 outline-none font-bold font-mono transition w-32 ${
                                  submitted
                                    ? isCorrect
                                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                                      : 'bg-rose-50 border-rose-300 text-rose-800'
                                    : 'bg-white border-[#0F0F0F]/15 text-[#0F0F0F] focus:border-[#0F0F0F] hover:border-[#0F0F0F]'
                                }`}
                              >
                                <option value="">— Choose —</option>
                                {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map((letter) => (
                                  <option key={letter} value={letter}>
                                    {letter}
                                  </option>
                                ))}
                              </select>
                            </div>
                          )}

                          {/* 5. CHOOSE TWO COMBO MULTIPLE CHOICE */}
                          {q.type === 'COMBO_MC' && q.options && (
                            <div className="grid grid-cols-1 gap-2">
                              {q.options.map((opt) => {
                                const optionLetter = opt.substring(0, opt.indexOf('.')).trim();
                                const isChecked = isComboChecked(optionLetter);
                                return (
                                  <label
                                    key={opt}
                                    className={`p-3.5 rounded-xl border text-xs font-medium cursor-pointer transition flex items-start gap-2.5 select-none ${
                                      isChecked
                                        ? 'bg-[#0F0F0F] border-[#0F0F0F] text-white shadow-md font-semibold'
                                        : 'bg-[#FAF8F5] border-[#0F0F0F]/10 text-[#0F0F0F]/85 hover:bg-white hover:border-[#0F0F0F]'
                                    }`}
                                  >
                                    <input
                                      type="checkbox"
                                      disabled={submitted}
                                      checked={isChecked}
                                      onChange={() => handleComboCheckboxChange(optionLetter)}
                                      className="sr-only"
                                    />
                                    <div className={`shrink-0 w-6 h-6 rounded-md flex items-center justify-center border text-[10px] font-bold font-mono ${
                                      isChecked ? 'bg-[#E2FF45] border border-[#0F0F0F] text-[#0F0F0F]' : 'bg-white border-[#0F0F0F]/20 text-[#0F0F0F]/40'
                                    }`}>
                                      {isChecked ? <Check size={12} className="stroke-[3]" /> : optionLetter}
                                    </div>
                                    <span className="flex-1 mt-0.5">{opt.substring(opt.indexOf('.') + 1).trim()}</span>
                                  </label>
                                );
                              })}
                            </div>
                          )}

                          {/* Correct Answer reveal and Explanations (ONLY when submitted) */}
                          {submitted && (
                            <div className="mt-4 animate-in fade-in duration-300">
                              <div className="flex items-center gap-2 mb-2">
                                {isCorrect ? (
                                  <span className="inline-flex items-center gap-1 bg-emerald-600 text-white text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full">
                                    <Check size={9} className="stroke-[3]" /> Correct
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 bg-rose-600 text-white text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full">
                                    <X size={9} className="stroke-[3]" /> Incorrect
                                  </span>
                                )}
                                <span className="text-xs text-[#0F0F0F]/55">
                                  Correct Answer:{' '}
                                  <strong className="text-emerald-700 font-mono">
                                    {q.correctAnswer.toUpperCase()}
                                  </strong>
                                </span>
                              </div>

                              {/* Context/Explanation box */}
                              <div className="bg-[#FAF8F5] border-l-2 border-[#0F0F0F] rounded-r-xl p-4 text-xs leading-relaxed text-[#0F0F0F]/85">
                                <span className="font-bold text-[#0F0F0F] block mb-1">Explanation:</span>
                                {q.explanation}
                              </div>

                              {/* Find in Passage Button helper */}
                              {q.paragraphRef && (
                                <button
                                  onClick={() => onFindInPassage(q.paragraphRef!)}
                                  className="mt-2.5 text-xs text-[#0F0F0F] hover:bg-[#0F0F0F]/5 font-bold inline-flex items-center gap-1 bg-white border border-[#0F0F0F]/15 px-3.5 py-2 rounded-full shadow-2xs transition active:scale-95 cursor-pointer"
                                  title={`Scroll to Paragraph ${q.paragraphRef}`}
                                >
                                  <Search size={12} />
                                  <span>Find in Passage (Paragraph {q.paragraphRef})</span>
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Sub-component for inline text gaps in summaries
interface SummaryInputProps {
  qn: number;
  answers: UserAnswers;
  onAnswerChange: (questionId: number, answer: string) => void;
  submitted: boolean;
  correctVal: string;
}

function SummaryInput({ qn, answers, onAnswerChange, submitted, correctVal }: SummaryInputProps) {
  const userVal = answers[qn] || '';
  const isCorrect = userVal.trim().toLowerCase() === correctVal.trim().toLowerCase();

  return (
    <span className="inline-flex flex-col items-center align-middle relative group mx-1">
      <input
        type="text"
        value={userVal}
        disabled={submitted}
        onChange={(e) => onAnswerChange(qn, e.target.value)}
        placeholder={`${qn}`}
        className={`w-36 h-8 text-center px-2 py-0.5 border-b-2 outline-none font-sans font-semibold text-xs transition duration-150 shrink-0 ${
          submitted
            ? isCorrect
              ? 'bg-[#E2FF45]/20 border-emerald-500 text-emerald-800 font-bold'
              : 'bg-rose-50 border-rose-500 text-rose-800 line-through'
            : 'bg-white border-[#0F0F0F]/30 focus:border-[#0F0F0F] text-[#0F0F0F] placeholder-[#0F0F0F]/30'
        }`}
      />
      {submitted && !isCorrect && (
        <span className="absolute -top-7 bg-[#0F0F0F] text-white text-[9px] font-bold px-2 py-0.5 rounded shadow-sm shrink-0 whitespace-nowrap z-10 animate-bounce">
          Key: {correctVal}
        </span>
      )}
    </span>
  );
}
