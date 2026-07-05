import React, { useRef, useEffect, useState } from 'react';
import { Highlighter, Eye, Type, ZoomIn, ZoomOut, AlignLeft, AlignJustify, Settings } from 'lucide-react';
import { Question, UserAnswers } from '../types';
import { HEADING_OPTIONS } from '../data';

interface Paragraph {
  id: string;
  text: string;
}

interface PassagePaneProps {
  kicker: string;
  title: string;
  paragraphs: Paragraph[];
  activePart: number;
  highlightedParagraphId: string | null;
  onClearHighlightRef: () => void;
  questions?: Question[];
  answers?: UserAnswers;
  onAnswerChange?: (questionId: number, answer: string) => void;
  submitted?: boolean;
  selectedHeadingVal?: string | null;
  setSelectedHeadingVal?: (value: string | null) => void;
}

export default function PassagePane({
  kicker,
  title,
  paragraphs,
  activePart,
  highlightedParagraphId,
  onClearHighlightRef,
  questions = [],
  answers = {},
  onAnswerChange,
  submitted = false,
  selectedHeadingVal = null,
  setSelectedHeadingVal,
}: PassagePaneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const paragraphRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Reading settings states for high legibility
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg' | 'xl'>(() => {
    return (localStorage.getItem('ielts-reading-fontSize') as any) || 'base'; // default 'base' for standard elegant reading
  });
  const [fontStyle, setFontStyle] = useState<'serif' | 'sans'>(() => {
    return (localStorage.getItem('ielts-reading-fontStyle') as any) || 'sans'; // default 'sans' for high screen contrast and legibility
  });
  const [textAlign, setTextAlign] = useState<'left' | 'justify'>(() => {
    return (localStorage.getItem('ielts-reading-textAlign') as any) || 'left'; // default 'left' (much easier to read on screen than justify)
  });

  const [isToolbarExpanded, setIsToolbarExpanded] = useState<boolean>(() => {
    return localStorage.getItem('ielts-reading-toolbar-expanded') !== 'false';
  });

  // Keep localStorage in sync
  useEffect(() => {
    localStorage.setItem('ielts-reading-fontSize', fontSize);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('ielts-reading-fontStyle', fontStyle);
  }, [fontStyle]);

  useEffect(() => {
    localStorage.setItem('ielts-reading-textAlign', textAlign);
  }, [textAlign]);

  useEffect(() => {
    localStorage.setItem('ielts-reading-toolbar-expanded', String(isToolbarExpanded));
  }, [isToolbarExpanded]);

  // Smooth scroll and pulse paragraph when highlightedParagraphId changes
  useEffect(() => {
    if (highlightedParagraphId && paragraphRefs.current[highlightedParagraphId]) {
      const targetElement = paragraphRefs.current[highlightedParagraphId];
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Add pulse animation classes
        targetElement.classList.add('ring-4', 'ring-[#0F0F0F]', 'bg-[#E2FF45]/20', 'scale-[1.01]', 'shadow-md');
        
        // Remove pulse animation classes after 2.5 seconds
        const timer = setTimeout(() => {
          targetElement.classList.remove('ring-4', 'ring-[#0F0F0F]', 'bg-[#E2FF45]/20', 'scale-[1.01]', 'shadow-md');
          onClearHighlightRef();
        }, 2500);

        return () => clearTimeout(timer);
      }
    }
  }, [highlightedParagraphId, onClearHighlightRef]);

  // Clean-up highlights when changing parts to prevent stale DOM nodes
  useEffect(() => {
    // We can normalize the text content if needed, but the simple key replacement is fine.
  }, [activePart]);

  // Handle native user selection highlighting
  const handleHighlightSelection = () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;

    try {
      const range = selection.getRangeAt(0);
      
      // Ensure selection is inside this passage container to avoid breaking header/questions
      if (containerRef.current && !containerRef.current.contains(range.commonAncestorContainer)) {
        return;
      }

      const mark = document.createElement('mark');
      mark.className = 'bg-[#E2FF45] text-[#0F0F0F] px-0.5 rounded-xs cursor-pointer transition-colors duration-200 hover:bg-[#E2FF45]/80';
      mark.title = 'Click to remove highlight';
      
      // Allow clicking the highlight to remove it
      mark.onclick = (e) => {
        e.stopPropagation();
        const parent = mark.parentNode;
        if (parent) {
          parent.replaceChild(document.createTextNode(mark.textContent || ''), mark);
          parent.normalize(); // Merges adjacent text nodes
        }
      };

      range.surroundContents(mark);
      selection.removeAllRanges();
    } catch (err) {
      // In case selection crosses complex HTML structures (like paragraph wrappers)
      console.warn("Could not highlight selection across multi-block boundaries:", err);
    }
  };

  return (
    <div className="relative h-full w-full flex flex-col min-h-0 overflow-hidden border-r border-[#0F0F0F]/10 bg-white">
      
      {/* Floating Reader Toolbar / Settings Panel */}
      <div className="absolute bottom-6 right-6 z-30 select-none max-sm:bottom-4 max-sm:right-4 max-sm:left-4 max-sm:right-auto max-sm:translate-x-0">
        {isToolbarExpanded ? (
          <div className="bg-white/95 backdrop-blur-md border border-[#0F0F0F]/15 rounded-2xl p-2.5 shadow-xl flex flex-wrap items-center gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-200">
            {/* Highlight Button */}
            <button
              onClick={handleHighlightSelection}
              className="bg-[#0F0F0F] hover:bg-opacity-90 text-white px-3.5 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-xs flex items-center gap-1.5 transition active:scale-95 cursor-pointer shrink-0"
              title="Highlight selected text (Select text with your cursor first)"
            >
              <Highlighter size={13} className="text-[#E2FF45]" />
              <span>Highlight Text</span>
            </button>

            <div className="w-px h-5 bg-[#0F0F0F]/10" />

            {/* Reading controls */}
            <div className="flex items-center gap-1 bg-[#FAF8F5] border border-[#0F0F0F]/5 rounded-xl p-1 shrink-0">
              {/* Font selection */}
              <button
                onClick={() => setFontStyle(fontStyle === 'serif' ? 'sans' : 'serif')}
                className={`p-1.5 px-2.5 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                  fontStyle === 'sans'
                    ? 'bg-white text-[#0F0F0F] shadow-2xs border border-[#0F0F0F]/5'
                    : 'text-[#0F0F0F]/60 hover:text-[#0F0F0F]'
                }`}
                title="Toggle Font (Serif / Sans-serif)"
              >
                <Type size={12} />
                <span className="text-[10px] uppercase font-mono">{fontStyle === 'serif' ? 'Serif' : 'Sans'}</span>
              </button>

              <div className="w-px h-4 bg-[#0F0F0F]/10 mx-1" />

              {/* Size Adjusters */}
              <button
                onClick={() => {
                  if (fontSize === 'base') setFontSize('sm');
                  else if (fontSize === 'lg') setFontSize('base');
                  else if (fontSize === 'xl') setFontSize('lg');
                }}
                disabled={fontSize === 'sm'}
                className="p-1 rounded-md text-[#0F0F0F]/60 hover:text-[#0F0F0F] hover:bg-white disabled:opacity-35 transition cursor-pointer"
                title="Decrease text size"
              >
                <ZoomOut size={14} />
              </button>

              <span className="text-[10px] font-mono font-bold px-1 select-none min-w-[24px] text-center text-[#0F0F0F]/70">
                {fontSize === 'sm' ? '75%' : fontSize === 'base' ? '100%' : fontSize === 'lg' ? '125%' : '150%'}
              </span>

              <button
                onClick={() => {
                  if (fontSize === 'sm') setFontSize('base');
                  else if (fontSize === 'base') setFontSize('lg');
                  else if (fontSize === 'lg') setFontSize('xl');
                }}
                disabled={fontSize === 'xl'}
                className="p-1 rounded-md text-[#0F0F0F]/60 hover:text-[#0F0F0F] hover:bg-white disabled:opacity-35 transition cursor-pointer"
                title="Increase text size"
              >
                <ZoomIn size={14} />
              </button>

              <div className="w-px h-4 bg-[#0F0F0F]/10 mx-1" />

              {/* Alignment toggle */}
              <button
                onClick={() => setTextAlign(textAlign === 'left' ? 'justify' : 'left')}
                className={`p-1 rounded-md transition cursor-pointer ${
                  textAlign === 'justify' ? 'bg-white text-[#0F0F0F] border border-[#0F0F0F]/5 shadow-2xs' : 'text-[#0F0F0F]/60 hover:text-[#0F0F0F]'
                }`}
                title={textAlign === 'left' ? "Switch to Justified alignment" : "Switch to Left alignment"}
              >
                {textAlign === 'left' ? <AlignLeft size={14} /> : <AlignJustify size={14} />}
              </button>
            </div>

            <div className="w-px h-5 bg-[#0F0F0F]/10" />

            {/* Collapse button */}
            <button
              onClick={() => setIsToolbarExpanded(false)}
              className="p-1.5 rounded-xl hover:bg-[#0F0F0F]/5 text-[#0F0F0F]/50 hover:text-[#0F0F0F] transition cursor-pointer"
              title="Collapse toolbar to give more reading space"
            >
              <Settings size={14} className="hover:rotate-45 transition-transform duration-300" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsToolbarExpanded(true)}
            className="bg-[#0F0F0F] hover:bg-opacity-90 text-white w-11 h-11 rounded-2xl flex items-center justify-center shadow-lg transition active:scale-95 cursor-pointer border border-white/10 group relative animate-in fade-in zoom-in-95 duration-200"
            title="Open reader settings & highlighting tools"
          >
            <Settings size={16} className="text-[#E2FF45] group-hover:rotate-45 transition-transform duration-300" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#E2FF45] rounded-full border border-white" />
          </button>
        )}
      </div>

      {/* Scrollable Passage Area */}
      <div 
        ref={containerRef}
        className="pane pane-passage flex-1 overflow-y-auto px-6 py-8 sm:px-10 sm:py-10 flex flex-col pb-28 select-text scroll-smooth"
      >
      {/* Passage Header */}
      <div className="border-b border-[#0F0F0F]/10 pb-4 mb-8">
        <span className="text-[10px] tracking-[0.25em] font-bold text-[#0F0F0F]/40 uppercase block mb-1 underline decoration-[#0F0F0F]/20 underline-offset-4">
          {kicker}
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif italic font-bold text-[#0F0F0F] leading-tight">
          {title}
        </h2>
      </div>

      {/* Passage Body */}
      <div className="space-y-6 select-text">
        {paragraphs.map((para) => {
          const isExample = para.id === 'A' && activePart === 2;
          const paraIdToQid: { [key: string]: number } = {
            'B': 14,
            'C': 15,
            'D': 16,
            'E': 17,
            'F': 18
          };
          const qId = paraIdToQid[para.id];
          const q = qId ? questions.find((x) => x.id === qId) : null;
          const userAnswer = q ? (answers[q.id] || '') : '';
          const isCorrect = q && userAnswer.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();

          return (
            <div
              key={para.id}
              ref={(el) => {
                paragraphRefs.current[para.id] = el;
              }}
              id={`para-${para.id}`}
              className="group flex flex-col gap-3 transition-all duration-300 rounded-2xl p-4 -m-4 border border-transparent hover:border-[#0F0F0F]/5 hover:bg-[#FAF8F5]/30 relative"
            >
              {/* Header row on top of paragraph text */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#0F0F0F]/5 pb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-[#0F0F0F] text-white font-mono font-bold text-xs shadow-sm group-hover:bg-[#E2FF45] group-hover:text-[#0F0F0F] transition-all">
                    {para.id}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0F0F0F]/60">
                    Paragraph {para.id}
                  </span>
                </div>

                {isExample && (
                  <span className="inline-flex items-center gap-1.5 bg-[#FAF8F5] border border-[#0F0F0F]/15 text-[#0F0F0F]/60 font-mono text-[10px] font-bold px-3 py-1 rounded-full shadow-xs select-none">
                    <Eye size={12} />
                    <span>Example Heading: <strong>ii</strong> (A Fundamental Departure from Historical Hosting Models)</span>
                  </span>
                )}

                {/* Drop Zone */}
                {activePart === 2 && qId && q && (
                  <div className="flex items-center gap-2 max-w-full sm:max-w-[420px] w-full sm:w-auto">
                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        if (submitted) return;
                        const value = e.dataTransfer.getData('text/plain');
                        if (value && onAnswerChange) {
                          onAnswerChange(q.id, value);
                        }
                      }}
                      onClick={() => {
                        if (submitted) return;
                        if (selectedHeadingVal && onAnswerChange) {
                          onAnswerChange(q.id, selectedHeadingVal);
                          if (setSelectedHeadingVal) {
                            setSelectedHeadingVal(null);
                          }
                        } else if (onAnswerChange) {
                          onAnswerChange(q.id, '');
                        }
                      }}
                      className={`min-h-[38px] px-3.5 py-1.5 border border-dashed rounded-xl flex items-center justify-between text-xs transition-all duration-200 cursor-pointer flex-1 select-none ${
                        submitted
                          ? isCorrect
                            ? 'bg-emerald-50/50 border-emerald-400'
                            : 'bg-rose-50/50 border-rose-400'
                          : userAnswer
                          ? 'bg-white border-[#0F0F0F] shadow-2xs'
                          : 'bg-[#FAF8F5]/40 border-[#0F0F0F]/20 hover:border-[#0F0F0F] hover:bg-white'
                      }`}
                    >
                      {userAnswer ? (
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="bg-[#0F0F0F] text-[#E2FF45] border border-[#0F0F0F] font-mono font-bold px-1.5 py-0.5 rounded text-[9px] uppercase shrink-0">
                            {userAnswer.toUpperCase()}
                          </span>
                          <span className="text-[#0F0F0F] font-semibold truncate text-[11px]">
                            {HEADING_OPTIONS.find((h) => h.value === userAnswer)?.text.split('.')[1] || ''}
                          </span>
                        </div>
                      ) : (
                        <span className="text-[#0F0F0F]/40 italic text-[11px] truncate">
                          {selectedHeadingVal
                            ? `Place Heading: ${selectedHeadingVal.toUpperCase()}`
                            : 'Drag heading or click to drop here'
                          }
                        </span>
                      )}
                      {userAnswer && !submitted && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onAnswerChange) onAnswerChange(q.id, '');
                          }}
                          className="text-[#0F0F0F]/40 hover:text-[#0F0F0F] font-bold font-mono text-sm px-1 cursor-pointer"
                        >
                          ×
                        </button>
                      )}
                    </div>
                    
                    {/* Quick Dropdown Selector fallback */}
                    {!submitted && onAnswerChange && (
                      <select
                        value={userAnswer}
                        onChange={(e) => onAnswerChange(q.id, e.target.value)}
                        className="text-[11px] bg-white border border-[#0F0F0F]/15 rounded-lg px-2 py-1.5 text-[#0F0F0F] outline-none hover:border-[#0F0F0F] shrink-0 font-sans cursor-pointer"
                        style={{ maxWidth: '120px' }}
                      >
                        <option value="">— select —</option>
                        {HEADING_OPTIONS.filter((h) => h.value !== 'ii').map((h) => (
                          <option key={h.value} value={h.value}>
                            {h.value.toUpperCase()}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                )}
              </div>

              {/* Text content */}
              <div 
                className={`flex-1 leading-relaxed text-[#0F0F0F]/90 transition-all duration-200 ${
                  fontSize === 'sm' ? 'text-sm' :
                  fontSize === 'base' ? 'text-base' :
                  fontSize === 'lg' ? 'text-lg' :
                  'text-xl'
                } ${
                  fontStyle === 'serif' 
                    ? 'font-serif !font-normal' 
                    : 'font-sans !font-normal tracking-wide'
                } ${
                  textAlign === 'justify' ? 'text-justify' : 'text-left'
                }`}
                style={fontStyle === 'serif' ? { fontFamily: 'Georgia, serif' } : {}}
              >
                <p>{para.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </div>
  );
}
