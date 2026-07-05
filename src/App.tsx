import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import PassagePane from './components/PassagePane';
import QuestionPane from './components/QuestionPane';
import BottomNav from './components/BottomNav';
import ResultsDashboard from './components/ResultsDashboard';
import { EXAM_DATA } from './data';
import { Question, UserAnswers } from './types';
import { BookOpen, FileCheck2, Info, Compass, Smartphone, RotateCw } from 'lucide-react';

const TIMER_START_SECONDS = 60 * 60; // 60 minutes
const LOCAL_STORAGE_KEY_PREFIX = 'ielts_wc_exam_';

export default function App() {
  // Mobile landscape checking state
  const [isLandscapeMobile, setIsLandscapeMobile] = useState<boolean>(false);
  const [dismissedLandscape, setDismissedLandscape] = useState<boolean>(false);

  useEffect(() => {
    const checkOrientation = () => {
      // Landscape is when width > height, and on mobile screens, height is usually very small (< 520px)
      const isLandscape = window.innerWidth > window.innerHeight && window.innerHeight < 520;
      setIsLandscapeMobile(isLandscape);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    return () => window.removeEventListener('resize', checkOrientation);
  }, []);

  // Load initial states from localStorage if available
  const [activePart, setActivePart] = useState<number>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}part`);
    return saved ? parseInt(saved, 10) : 1;
  });

  const [answers, setAnswers] = useState<UserAnswers>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}answers`);
    return saved ? JSON.parse(saved) : {};
  });

  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}flags`);
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const [timeLeft, setTimeLeft] = useState<number>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}time_left`);
    return saved ? parseInt(saved, 10) : TIMER_START_SECONDS;
  });

  const [submitted, setSubmitted] = useState<boolean>(() => {
    return localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}submitted`) === 'true';
  });

  const [timeSpent, setTimeSpent] = useState<number>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}time_spent`);
    return saved ? parseInt(saved, 10) : 0;
  });

  // Split-screen width control
  const [splitWidth, setSplitWidth] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Mobile layout state ('passage' | 'questions')
  const [mobileView, setMobileView] = useState<'passage' | 'questions'>('passage');

  // Selected heading state for click-to-place matching heading questions
  const [selectedHeadingVal, setSelectedHeadingVal] = useState<string | null>(null);

  // Highlights state for paragraph focus scrolling
  const [highlightedParagraphId, setHighlightedParagraphId] = useState<string | null>(null);

  // Flattened questions list for navigation and overall evaluations
  const allQuestions = React.useMemo(() => {
    return EXAM_DATA.reduce<Question[]>((acc, part) => [...acc, ...part.questions], []);
  }, []);

  const currentPartData = EXAM_DATA.find((p) => p.number === activePart)!;

  // Sync state to localStorage on modification
  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}part`, activePart.toString());
  }, [activePart]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}answers`, JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}flags`, JSON.stringify(Array.from(flaggedQuestions)));
  }, [flaggedQuestions]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}submitted`, submitted.toString());
  }, [submitted]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}time_spent`, timeSpent.toString());
  }, [timeSpent]);

  // Countdown timer clock ticking
  useEffect(() => {
    if (submitted) return;

    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}time_left`, timeLeft.toString());

    if (timeLeft <= 0) {
      // Auto-submit on expiry
      handleConfirmSubmit();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, submitted]);

  // Handle Dragging of Workspace Splitter
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      // Calculate split width as a percentage of total screen width
      const percentage = (e.clientX / window.innerWidth) * 100;
      if (percentage >= 25 && percentage <= 75) {
        setSplitWidth(percentage);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // Actions
  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleToggleFlag = (questionId: number) => {
    setFlaggedQuestions((prev) => {
      const next = new Set(prev);
      if (next.has(questionId)) {
        next.delete(questionId);
      } else {
        next.add(questionId);
      }
      return next;
    });
  };

  const handleConfirmSubmit = () => {
    setSubmitted(true);
    // Calculate total time taken
    const elapsed = TIMER_START_SECONDS - timeLeft;
    setTimeSpent(elapsed);
    // Jump to review dashboard view
    setMobileView('questions');
  };

  const handleReset = () => {
    // Clear localStorage
    localStorage.removeItem(`${LOCAL_STORAGE_KEY_PREFIX}part`);
    localStorage.removeItem(`${LOCAL_STORAGE_KEY_PREFIX}answers`);
    localStorage.removeItem(`${LOCAL_STORAGE_KEY_PREFIX}flags`);
    localStorage.removeItem(`${LOCAL_STORAGE_KEY_PREFIX}time_left`);
    localStorage.removeItem(`${LOCAL_STORAGE_KEY_PREFIX}submitted`);
    localStorage.removeItem(`${LOCAL_STORAGE_KEY_PREFIX}time_spent`);

    // Reset components state
    setActivePart(1);
    setAnswers({});
    setFlaggedQuestions(new Set());
    setTimeLeft(TIMER_START_SECONDS);
    setSubmitted(false);
    setTimeSpent(0);
    setMobileView('passage');
    setHighlightedParagraphId(null);
  };

  // Navigates directly to a question and toggles the appropriate part
  const handleNavigateToQuestion = (questionId: number) => {
    let targetPart = 1;
    if (questionId >= 14 && questionId <= 26) {
      targetPart = 2;
    } else if (questionId >= 27) {
      targetPart = 3;
    }

    setActivePart(targetPart);
    setMobileView('questions'); // Focus on questions tab in responsive mobile view
  };

  // Triggers smooth scrolling and pulses target paragraph inside PassagePane
  const handleFindInPassage = (paragraphId: string) => {
    setMobileView('passage'); // Toggle view to show passage on mobile
    setHighlightedParagraphId(paragraphId);
  };

  const answeredCount = allQuestions.filter((q) => (answers[q.id] || '').trim() !== '').length;

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#F4F1EE] text-[#0F0F0F] font-sans antialiased">
      
      {/* Top Header Controls */}
      <Header
        timeLeft={timeLeft}
        answeredCount={answeredCount}
        totalQuestions={allQuestions.length}
        submitted={submitted}
        onConfirmSubmit={handleConfirmSubmit}
        onReset={handleReset}
      />

      {/* Part Selection Navigation (Top Tabs) */}
      <div className="bg-[#FAF8F5] border-b border-[#0F0F0F]/10 px-6 py-1 flex gap-4 overflow-x-auto shrink-0 z-10 select-none">
        {EXAM_DATA.map((part) => {
          const isActive = activePart === part.number;
          return (
            <button
              key={part.number}
              onClick={() => setActivePart(part.number)}
              className={`px-4 py-3.5 text-xs uppercase tracking-widest font-semibold transition shrink-0 cursor-pointer ${
                isActive
                  ? 'text-[#0F0F0F] border-b-2 border-[#0F0F0F] font-bold'
                  : 'text-[#0F0F0F]/50 hover:text-[#0F0F0F]'
              }`}
            >
              <span>Part {part.number}</span>
              <span className="opacity-80 text-[10px] lowercase italic font-normal hidden lg:inline ml-1.5">
                ({part.number === 3 ? 'Q27–40' : part.number === 2 ? 'Q14–26' : 'Q1–13'})
              </span>
            </button>
          );
        })}
      </div>

      {/* Mobile-only toggle headers */}
      <div className="flex lg:hidden bg-white border-b border-[#0F0F0F]/10 px-4 py-2 gap-2 shrink-0 select-none z-10">
        <button
          onClick={() => setMobileView('passage')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-1.5 ${
            mobileView === 'passage'
              ? 'bg-[#0F0F0F] text-white'
              : 'border border-[#0F0F0F]/10 text-[#0F0F0F]/60'
          }`}
        >
          <BookOpen size={13} />
          <span>Passage</span>
        </button>
        <button
          onClick={() => setMobileView('questions')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-1.5 ${
            mobileView === 'questions'
              ? 'bg-[#0F0F0F] text-white'
              : 'border border-[#0F0F0F]/10 text-[#0F0F0F]/60'
          }`}
        >
          <FileCheck2 size={13} />
          <span>Questions</span>
        </button>
      </div>

      {/* Core Split-Workspace layout */}
      <main className="flex-1 flex overflow-hidden min-h-0 relative">
        
        {/* Results Overview Dashboard: Appended as an overlay sheet when submitted */}
        {submitted && mobileView === 'questions' && (
          <div className="absolute inset-0 bg-[#0F0F0F]/40 backdrop-blur-xs overflow-y-auto z-30 p-4 sm:p-6 animate-in fade-in duration-300">
            <ResultsDashboard
              questions={allQuestions}
              answers={answers}
              timeSpent={timeSpent}
              onRestart={handleReset}
            />
          </div>
        )}

        {/* Left Passage Panel */}
        <div
          style={{ width: `${splitWidth}%` }}
          className={`h-full max-lg:!w-full lg:min-w-[25%] lg:max-w-[75%] shrink-0 transition-all duration-75 ${
            mobileView === 'passage' ? 'block' : 'hidden lg:block'
          }`}
        >
          <PassagePane
            kicker={currentPartData.kicker}
            title={currentPartData.passageTitle}
            paragraphs={currentPartData.paragraphs}
            activePart={activePart}
            highlightedParagraphId={highlightedParagraphId}
            onClearHighlightRef={() => setHighlightedParagraphId(null)}
            questions={allQuestions}
            answers={answers}
            onAnswerChange={handleAnswerChange}
            submitted={submitted}
            selectedHeadingVal={selectedHeadingVal}
            setSelectedHeadingVal={setSelectedHeadingVal}
          />
        </div>

        {/* Drag Split Handle Divider */}
        <div
          onMouseDown={() => setIsDragging(true)}
          onDoubleClick={() => setSplitWidth(50)}
          className={`hidden lg:flex items-center justify-center w-2.5 bg-[#F4F1EE] border-l border-r border-[#0F0F0F]/10 hover:bg-[#0F0F0F]/5 cursor-col-resize select-none shrink-0 relative transition-colors duration-150 group z-10 ${
            isDragging ? 'bg-[#0F0F0F]/10' : ''
          }`}
          title="Drag to resize panels, double-click to center"
        >
          <div className="absolute flex flex-col gap-1 text-[#0F0F0F]/40 group-hover:text-[#0F0F0F]">
            <span className="block w-1 h-1 bg-current rounded-full"></span>
            <span className="block w-1 h-1 bg-current rounded-full"></span>
            <span className="block w-1 h-1 bg-current rounded-full"></span>
          </div>
        </div>

        {/* Right Questions Panel */}
        <div
          style={{ width: `${100 - splitWidth}%` }}
          className={`h-full max-lg:!w-full lg:min-w-[25%] lg:max-w-[75%] shrink-0 transition-all duration-75 ${
            mobileView === 'questions' ? 'block' : 'hidden lg:block'
          }`}
        >
          <QuestionPane
            questions={allQuestions}
            answers={answers}
            onAnswerChange={handleAnswerChange}
            submitted={submitted}
            activePart={activePart}
            flaggedQuestions={flaggedQuestions}
            onToggleFlag={handleToggleFlag}
            onFindInPassage={handleFindInPassage}
            selectedHeadingVal={selectedHeadingVal}
            setSelectedHeadingVal={setSelectedHeadingVal}
          />
        </div>
      </main>

      {/* Bottom Nav Strip (1–40 indicators) */}
      <BottomNav
        questions={allQuestions}
        answers={answers}
        submitted={submitted}
        flaggedQuestions={flaggedQuestions}
        activePart={activePart}
        onQuestionClick={handleNavigateToQuestion}
      />

      {/* Beautiful Landscape Orientation Warning Overlay */}
      {isLandscapeMobile && !dismissedLandscape && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#FAF8F5]/90 backdrop-blur-md p-6 select-none animate-fade-in">
          <div className="max-w-md w-full bg-white border border-[#0F0F0F]/10 rounded-2xl p-6 shadow-xl flex flex-col items-center text-center gap-4">
            <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#E2FF45] text-[#0F0F0F] border border-[#0F0F0F]/5">
              <Smartphone size={28} className="rotate-90 animate-pulse" />
              <RotateCw size={12} className="absolute top-1 right-1 text-[#0F0F0F]" />
            </div>
            
            <div className="space-y-1.5">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#0F0F0F]">
                Portrait Mode Recommended
              </h2>
              <p className="text-xs text-[#0F0F0F]/60 leading-relaxed max-w-sm">
                This IELTS exam simulation is designed for vertical mobile screens or desktop displays. Holding the phone horizontally restricts your reading view and makes question-matching difficult.
              </p>
            </div>

            <div className="flex flex-col gap-2 w-full pt-1">
              <button
                onClick={() => setDismissedLandscape(true)}
                className="w-full py-2 bg-[#0F0F0F] text-white hover:bg-opacity-90 text-[11px] font-bold uppercase tracking-wider rounded-xl transition cursor-pointer active:scale-98"
              >
                Continue anyway
              </button>
              <div className="text-[9px] text-[#0F0F0F]/45 font-mono">
                Or turn your device vertically to resume instantly
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
