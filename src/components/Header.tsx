import React from 'react';
import { Timer, FileCheck2, AlertTriangle, RefreshCw } from 'lucide-react';

interface HeaderProps {
  timeLeft: number; // in seconds
  answeredCount: number;
  totalQuestions: number;
  submitted: boolean;
  onConfirmSubmit: () => void;
  onReset: () => void;
}

export default function Header({
  timeLeft,
  answeredCount,
  totalQuestions,
  submitted,
  onConfirmSubmit,
  onReset,
}: HeaderProps) {
  const [showConfirmModal, setShowConfirmModal] = React.useState(false);

  // Format time (mm:ss)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isWarning = timeLeft <= 600 && timeLeft > 300; // 10 minutes
  const isDanger = timeLeft <= 300; // 5 minutes

  const handleSubClick = () => {
    if (submitted) return;
    setShowConfirmModal(true);
  };

  const handleConfirm = () => {
    setShowConfirmModal(false);
    onConfirmSubmit();
  };

  return (
    <header className="bg-white border-b border-[#0F0F0F]/10 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 flex-shrink-0 relative z-20">
      {/* Brand & Title */}
      <div className="flex items-center gap-4">
        <div className="bg-[#E2FF45] border border-[#0F0F0F] px-3 py-1.5 rounded-xl text-[#0F0F0F] font-bold text-sm tracking-widest flex items-center justify-center shrink-0">
          IELTS
        </div>
        <div className="text-left">
          <span className="block text-[10px] tracking-[0.2em] font-bold text-[#0F0F0F]/50 uppercase">
            Academic Reading Practice
          </span>
          <h1 className="text-lg sm:text-xl font-serif italic font-bold text-[#0F0F0F] leading-tight">
            The World Cup History & Modern Era
          </h1>
        </div>
      </div>

      {/* Stats, Timer, and Actions */}
      <div className="flex items-center flex-wrap gap-3 sm:gap-4">
        {/* Progress Tracker */}
        <div className="bg-[#FAF8F5] px-4 py-2 rounded-full border border-[#0F0F0F]/10 text-xs text-[#0F0F0F] flex items-center gap-2 font-semibold">
          <FileCheck2 size={15} className="text-[#0F0F0F]/60" />
          <span>
            Progress: <strong className="text-[#0F0F0F]">{answeredCount}</strong> / {totalQuestions}
          </span>
        </div>

        {/* Timer Box */}
        {!submitted ? (
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-mono font-bold transition-all duration-300 ${
              isDanger
                ? 'bg-rose-50 border-rose-500 text-rose-600 animate-pulse'
                : isWarning
                ? 'bg-[#E2FF45]/20 border-[#0F0F0F] text-[#0F0F0F]'
                : 'bg-[#FAF8F5] border-[#0F0F0F]/10 text-[#0F0F0F]'
            }`}
          >
            <Timer size={14} className={isDanger ? 'text-rose-500 animate-spin-slow' : 'text-[#0F0F0F]/60'} />
            <span>{formatTime(timeLeft)}</span>
          </div>
        ) : (
          <div className="bg-emerald-50 border border-emerald-500 text-emerald-700 px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            Test Completed
          </div>
        )}

        {/* Submit or Restart Actions */}
        {submitted ? (
          <button
            onClick={onReset}
            className="border border-[#0F0F0F] hover:bg-[#0F0F0F]/5 text-[#0F0F0F] text-[10px] font-bold uppercase tracking-widest rounded-full px-5 py-2.5 transition duration-150 flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw size={12} />
            Reset Practice
          </button>
        ) : (
          <button
            onClick={handleSubClick}
            className="bg-[#0F0F0F] hover:bg-opacity-90 text-white text-[10px] font-bold uppercase tracking-widest rounded-full px-5 py-2.5 shadow-xs transition duration-150 transform active:scale-95 cursor-pointer"
          >
            Submit Exam
          </button>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-[#0F0F0F]/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 select-none">
          <div className="bg-[#FAF8F5] border border-[#0F0F0F] rounded-[32px] p-8 max-w-md w-full shadow-2xl text-[#0F0F0F] animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 text-[#0F0F0F] mb-4">
              <div className="w-12 h-12 bg-[#E2FF45] border border-[#0F0F0F] rounded-full flex items-center justify-center">
                <AlertTriangle size={24} />
              </div>
              <h3 className="text-xl font-serif italic font-bold">Submit Reading Test?</h3>
            </div>
            
            <p className="text-sm text-[#0F0F0F]/75 leading-relaxed mb-6">
              You have answered <strong className="text-[#0F0F0F] font-bold">{answeredCount}</strong> out of{' '}
              <strong className="text-[#0F0F0F] font-bold">{totalQuestions}</strong> questions.
              {answeredCount < totalQuestions && (
                <span className="block mt-3 text-rose-600 font-semibold text-xs border border-rose-200 bg-rose-50/50 p-3 rounded-xl leading-normal">
                  ⚠️ Note: You have {totalQuestions - answeredCount} unanswered questions! Unanswered questions will be marked as incorrect.
                </span>
              )}
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="border border-[#0F0F0F]/15 hover:bg-[#0F0F0F]/5 px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#0F0F0F] transition cursor-pointer"
              >
                Cancel and Review
              </button>
              <button
                onClick={handleConfirm}
                className="bg-[#0F0F0F] hover:bg-opacity-90 text-white font-bold px-6 py-2.5 rounded-full text-[10px] uppercase tracking-wider transition shadow-md cursor-pointer"
              >
                Yes, Submit Now
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
