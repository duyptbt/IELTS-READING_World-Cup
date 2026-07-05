import React from 'react';
import { Award, CheckCircle2, XCircle, BarChart3, Clock, AlertCircle, ChevronDown, ChevronUp, Check, X } from 'lucide-react';
import { Question, UserAnswers } from '../types';

interface ResultsDashboardProps {
  questions: Question[];
  answers: UserAnswers;
  timeSpent: number; // in seconds
  onRestart: () => void;
}

export default function ResultsDashboard({
  questions,
  answers,
  timeSpent,
  onRestart,
}: ResultsDashboardProps) {
  // Calculations
  const totalQuestions = questions.length;
  
  // Helper to check question correctness, with order-independent grading for Questions 39 and 40
  const isAnswerCorrect = (q: Question) => {
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

  const correctAnswersCount = questions.filter(isAnswerCorrect).length;

  // Track expanded category details
  const [expandedCategory, setExpandedCategory] = React.useState<string | null>(null);

  const toggleCategory = (category: string) => {
    setExpandedCategory(prev => prev === category ? null : category);
  };

  // Pre-translate and enrich explanations with Vietnamese explanations while keeping English original quotes
  const translateExplanationToVietnamese = (explanation: string) => {
    if (!explanation) return '';
    
    let translated = explanation;
    
    // Replace standard paragraph references
    translated = translated.replace(/Paragraph\s+([A-H])\s+(describes|specifies|notes|mentions|states|explains|discusses|identifies|shows|details)/gi, (match, p1, p2) => {
      const verbMap: { [key: string]: string } = {
        describes: 'mô tả rằng',
        specifies: 'chỉ ra rõ rằng',
        notes: 'ghi chú rằng',
        mentions: 'đề cập rằng',
        states: 'khẳng định rằng',
        explains: 'giải thích rằng',
        discusses: 'thảo luận rằng',
        identifies: 'xác định rằng',
        shows: 'cho thấy rằng',
        details: 'chi tiết rằng'
      };
      const vnVerb = verbMap[p2.toLowerCase()] || 'chỉ ra rằng';
      return `Đoạn ${p1} ${vnVerb} (${match})`;
    });

    // Translate common connecting phrases while keeping English intact
    translated = translated.replace(/The correct answer is/gi, "Đáp án đúng là (The correct answer is)");
    translated = translated.replace(/This is because/gi, "Điều này là vì (This is because)");
    translated = translated.replace(/shows that/gi, "cho thấy rằng (shows that)");
    translated = translated.replace(/indicates that/gi, "chỉ ra rằng (indicates that)");
    translated = translated.replace(/confirms that/gi, "xác nhận rằng (confirms that)");
    
    return translated;
  };

  // Detailed list renderer for all questions inside a category
  const renderCategoryQuestions = (types: string[]) => {
    const catQs = questions.filter((q) => types.includes(q.type));
    
    return (
      <div className="mt-4 pt-4 border-t border-[#0F0F0F]/10 space-y-4 animate-fadeIn">
        <div className="text-[10px] font-bold text-[#0F0F0F]/50 uppercase tracking-widest mb-2">
          Chi Tiết Từng Câu Hỏi (Question-by-Question Details)
        </div>
        <div className="space-y-3">
          {catQs.map((q) => {
            const isCorrect = isAnswerCorrect(q);
            const userAns = answers[q.id] || '(Chưa trả lời / No Answer)';
            const correctAns = q.correctAnswer;
            
            return (
              <div 
                key={q.id} 
                className={`p-4 rounded-xl border transition text-left ${
                  isCorrect 
                    ? 'bg-emerald-50/20 border-emerald-500/20' 
                    : 'bg-rose-50/10 border-rose-500/20'
                }`}
              >
                {/* Header info */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs bg-[#0F0F0F]/5 px-2 py-0.5 rounded border border-[#0F0F0F]/10 text-[#0F0F0F]">
                      Q{q.id}
                    </span>
                    <span className="text-[10px] font-bold text-[#0F0F0F]/60">
                      Part {q.part} • {q.paragraphRef ? `Đoạn (Paragraph) ${q.paragraphRef}` : 'Văn bản (Passage)'}
                    </span>
                  </div>
                  <div className={`flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    isCorrect 
                      ? 'text-emerald-700 bg-emerald-100/60' 
                      : 'text-rose-700 bg-rose-100/60'
                  }`}>
                    {isCorrect ? (
                      <>
                        <Check size={10} strokeWidth={3} />
                        <span>Đúng (Correct)</span>
                      </>
                    ) : (
                      <>
                        <X size={10} strokeWidth={3} />
                        <span>Sai (Incorrect)</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Question Stem */}
                <div className="text-xs sm:text-sm font-medium text-[#0F0F0F] mb-3 leading-relaxed">
                  {q.stem}
                </div>

                {/* Options if MC */}
                {q.options && q.options.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                    {q.options.map((opt) => {
                      const optLetter = opt.trim().substring(0, 1).toUpperCase();
                      const isUserSelected = userAns.trim().toUpperCase() === optLetter;
                      const isOptCorrect = correctAns.trim().toUpperCase() === optLetter || 
                        (q.id === 39 && optLetter === 'B') || 
                        (q.id === 40 && optLetter === 'D');
                      
                      return (
                        <div 
                          key={opt}
                          className={`p-2.5 rounded-lg border text-xs leading-relaxed transition ${
                            isOptCorrect 
                              ? 'bg-emerald-100/30 border-emerald-500/40 font-semibold text-emerald-950' 
                              : isUserSelected
                                ? 'bg-rose-100/30 border-rose-500/40 text-rose-950'
                                : 'bg-white border-[#0F0F0F]/5 text-[#0F0F0F]/70'
                          }`}
                        >
                          <span className="mr-1.5 font-bold">{optLetter}.</span>
                          {opt.substring(2)}
                          {isUserSelected && <span className="ml-1 text-[10px] font-bold text-rose-600">(Lựa chọn của bạn)</span>}
                          {isOptCorrect && <span className="ml-1 text-[10px] font-bold text-emerald-600">(Đáp án đúng)</span>}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Answers Comparison */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-1 bg-white/60 rounded-lg p-2.5 border border-[#0F0F0F]/5 text-xs mb-3">
                  <div>
                    <span className="text-[#0F0F0F]/60 font-medium">Đáp án của bạn (Your Answer):</span>{' '}
                    <strong className={`font-mono font-bold ${isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                      {userAns}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[#0F0F0F]/60 font-medium">Đáp án đúng (Correct Answer):</span>{' '}
                    <strong className="font-mono font-bold text-emerald-700">
                      {correctAns}
                    </strong>
                  </div>
                </div>

                {/* Explanation */}
                <div className="bg-[#FAF8F5] border border-[#0F0F0F]/10 rounded-lg p-3 text-xs leading-relaxed text-[#0F0F0F]/80">
                  <div className="font-bold text-[#0F0F0F] mb-1">
                    Giải thích & Bằng chứng (Explanation & Evidence):
                  </div>
                  <p>{translateExplanationToVietnamese(q.explanation)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Convert raw score to estimated IELTS Band
  const getIELTSBand = (score: number) => {
    if (score >= 39) return { band: '9.0', level: 'Expert User (Thành thạo chuyên gia)' };
    if (score >= 37) return { band: '8.5', level: 'Very Good User (Rất tốt)' };
    if (score >= 35) return { band: '8.0', level: 'Very Good User (Rất tốt)' };
    if (score >= 32) return { band: '7.5', level: 'Good User (Tốt)' };
    if (score >= 30) return { band: '7.0', level: 'Good User (Tốt)' };
    if (score >= 27) return { band: '6.5', level: 'Competent User (Khá)' };
    if (score >= 23) return { band: '6.0', level: 'Competent User (Khá)' };
    if (score >= 20) return { band: '5.5', level: 'Modest User (Trung bình)' };
    if (score >= 15) return { band: '5.0', level: 'Modest User (Trung bình)' };
    if (score >= 13) return { band: '4.5', level: 'Extremely Limited User (Hạn chế nhiều)' };
    if (score >= 10) return { band: '4.0', level: 'Limited User (Hạn chế)' };
    return { band: '3.5 or below', level: 'Non User (Chưa sử dụng được)' };
  };

  const { band, level } = getIELTSBand(correctAnswersCount);

  // Time formatting
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  // Part scores
  const getPartScore = (partNum: number) => {
    const partQs = questions.filter((q) => q.part === partNum);
    const correct = partQs.filter(isAnswerCorrect).length;
    return { correct, total: partQs.length };
  };

  const part1 = getPartScore(1);
  const part2 = getPartScore(2);
  const part3 = getPartScore(3);

  // Category scores
  const getCategoryScore = (types: string[]) => {
    const catQs = questions.filter((q) => types.includes(q.type));
    const correct = catQs.filter(isAnswerCorrect).length;
    return { correct, total: catQs.length };
  };

  const tfng = getCategoryScore(['TFNG']);
  const summary = getCategoryScore(['SUMMARY']);
  const heading = getCategoryScore(['HEADING']);
  const endings = getCategoryScore(['MATCHING_ENDINGS']);
  const mc = getCategoryScore(['MC', 'COMBO_MC']);

  // Dynamic advice
  const getAdvice = (score: number) => {
    if (score >= 35) {
      return {
        title: 'Phenomenal! Exceptional Reading Command (Tuyệt vời! Khả năng Đọc hiểu Xuất sắc)',
        desc: 'Kỹ năng đọc của bạn đạt đến Expert Level (Band 8.0 - 9.0). Bạn có khả năng hiểu từ vựng hoàn hảo (perfect vocabulary comprehension), độ chính xác diễn đạt đồng nghĩa xuất sắc (impeccable paraphrasing accuracy), và có thể định hướng các văn bản học thuật phức tạp một cách nhanh chóng (navigate dense academic texts swiftly). Chúc bạn may mắn trong kỳ thi thật (Good luck on the real exam)!',
        color: 'border-emerald-500 text-emerald-800 bg-emerald-50/50',
      };
    }
    if (score >= 27) {
      return {
        title: 'Excellent Work! Highly Competent (Kết quả xuất sắc! Thành thạo cao)',
        desc: 'Bạn đang đi đúng hướng để đạt mức Good User (Band 6.5 - 7.5). Để bứt phá lên tầm điểm 8.0+, hãy tập trung rà soát kỹ các câu hỏi nâng cao như Heading Matches và lưu ý các từ đồng nghĩa bẫy (subtle distractor synonyms) trong các câu hỏi lựa chọn đáp án Multiple Choice.',
        color: 'border-amber-500 text-amber-900 bg-amber-50/40',
      };
    }
    if (score >= 15) {
      return {
        title: 'Solid Attempt! Consistent foundations (Nỗ lực rất tốt! Nền tảng vững vàng)',
        desc: 'Bạn đang ở mức độ đọc trung bình khá Modest to Competent reader (Band 5.0 - 6.0). Hãy rèn luyện thêm kỹ thuật đọc lướt và quét thông tin nhanh (skimming and scanning). Đảm bảo rằng bạn đọc kỹ câu đầu tiên của đoạn văn (paragraph first sentences) để nắm bắt ý chính, đồng thời đối chiếu từ khóa (match keywords) một cách chính xác mà không tự đưa ra giả định.',
        color: 'border-blue-500 text-blue-950 bg-blue-50/40',
      };
    }
    return {
      title: 'Keep Practicing! Build Your Speed (Hãy tiếp tục luyện tập! Tăng tốc độ đọc)',
      desc: 'Đừng nản lòng nhé! Đọc hiểu học thuật luôn đòi hỏi sự quản lý thời gian hiệu quả (time management) và tích lũy từ vựng chủ động (active vocabulary building). Hãy đọc thêm các bài luận chất lượng cao trên BBC, Economist, National Geographic và luyện tập tìm thông tin nhanh về ngày tháng, danh từ và từ đồng nghĩa (scanning for dates, nouns, and synonyms) để cải thiện band điểm của mình.',
      color: 'border-slate-500 text-slate-800 bg-slate-50',
    };
  };

  const advice = getAdvice(correctAnswersCount);

  return (
    <div className="bg-white rounded-[32px] border border-[#0F0F0F]/15 shadow-xl p-6 sm:p-8 space-y-8 max-w-5xl mx-auto my-6 animate-in fade-in slide-in-from-bottom-6 duration-300 select-text">
      
      {/* Title & Badge */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-[#0F0F0F]/10 pb-6">
        <div className="text-center md:text-left space-y-1">
          <span className="text-[10px] tracking-[0.25em] font-extrabold text-[#0F0F0F]/50 uppercase block">
            Academic Standards Performance (Báo cáo Kết quả Học thuật)
          </span>
          <h3 className="text-2xl font-serif italic font-bold text-[#0F0F0F]">
            Practice Exam Performance Report
          </h3>
          <p className="text-xs text-[#0F0F0F]/60">
            Tiêu chuẩn đánh giá thi IELTS Reading chính thức được áp dụng cho bài làm của bạn (Official IELTS Reading standards applied to your submitted answers).
          </p>
        </div>
        <button
          onClick={onRestart}
          className="bg-[#0F0F0F] hover:bg-opacity-90 text-white font-bold text-[10px] uppercase tracking-widest px-6 py-3 rounded-full transition transform active:scale-95 cursor-pointer"
        >
          Luyện Tập Lại (Restart Practice)
        </button>
      </div>

      {/* Main Score & Band Dashboard Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Band Score */}
        <div className="bg-[#0F0F0F] text-white p-6 rounded-[24px] border border-[#0F0F0F] flex flex-col justify-between shadow-md relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] uppercase font-bold text-[#E2FF45] tracking-widest">
              Điểm IELTS Dự Kiến (IELTS Band Estimate)
            </span>
            <Award size={18} className="text-[#E2FF45]" />
          </div>
          <div>
            <div className="text-5xl font-extrabold font-serif italic text-[#E2FF45] leading-none">
              {band}
            </div>
            <div className="text-xs text-white/80 font-semibold mt-2 tracking-wide uppercase">
              {level}
            </div>
          </div>
        </div>

        {/* Metric 2: Raw Score */}
        <div className="bg-[#FAF8F5] p-6 rounded-[24px] border border-[#0F0F0F]/10 flex flex-col justify-between shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] uppercase font-bold text-[#0F0F0F]/50 tracking-widest">
              Tổng Số Câu Đúng (Raw Total Score)
            </span>
            <CheckCircle2 size={18} className="text-[#0F0F0F]" />
          </div>
          <div>
            <div className="text-4xl font-extrabold text-[#0F0F0F] leading-none font-mono">
              {correctAnswersCount} <span className="text-lg text-[#0F0F0F]/45 font-medium">/ {totalQuestions}</span>
            </div>
            <div className="text-xs text-[#0F0F0F]/60 mt-2 font-medium">
              Tỷ lệ chính xác (Percentage): {Math.round((correctAnswersCount / totalQuestions) * 100)}%
            </div>
          </div>
        </div>

        {/* Metric 3: Time Spent */}
        <div className="bg-[#FAF8F5] p-6 rounded-[24px] border border-[#0F0F0F]/10 flex flex-col justify-between shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] uppercase font-bold text-[#0F0F0F]/50 tracking-widest">
              Thời Gian Làm Bài (Time Taken)
            </span>
            <Clock size={18} className="text-[#0F0F0F]" />
          </div>
          <div>
            <div className="text-4xl font-extrabold text-[#0F0F0F] leading-none font-mono">
              {formatTime(timeSpent)}
            </div>
            <div className="text-xs text-[#0F0F0F]/60 mt-2 font-medium">
              Thời gian quy định (Allocated Time): 60 minutes
            </div>
          </div>
        </div>

        {/* Metric 4: Diagnostic Progress */}
        <div className="bg-[#FAF8F5] p-6 rounded-[24px] border border-[#0F0F0F]/10 flex flex-col justify-between shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] uppercase font-bold text-[#0F0F0F]/50 tracking-widest">
              Đánh Giá Năng Lực (Diagnostic Status)
            </span>
            <BarChart3 size={18} className="text-[#0F0F0F]" />
          </div>
          <div>
            <div className="text-lg font-bold text-[#0F0F0F] uppercase tracking-wider font-sans">
              {correctAnswersCount >= 30 ? '🔥 Xuất sắc (Excellent)' : correctAnswersCount >= 18 ? '👍 Đạt (Passing)' : '💪 Cần cố gắng (Review Needed)'}
            </div>
            <div className="text-xs text-[#0F0F0F]/60 mt-2 font-medium">
              Dựa trên tiêu chuẩn học thuật (Based on Academic benchmark)
            </div>
          </div>
        </div>
      </div>

      {/* Segment Score Breakdown (Part by Part) */}
      <div className="space-y-4">
        <h4 className="text-[10px] font-extrabold text-[#0F0F0F]/50 uppercase tracking-widest flex items-center gap-2">
          <span>Đánh Giá Theo Từng Phần (Part-by-Part Mastery)</span>
          <span className="h-px bg-[#0F0F0F]/10 flex-1"></span>
        </h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Part 1 */}
          <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#0F0F0F]/10">
            <span className="text-[10px] font-bold text-[#0F0F0F]/40 uppercase tracking-wider block mb-1">
              Part 1: The Birth of a Tournament
            </span>
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-xs font-bold text-[#0F0F0F]">Q1–13 (Details / Chi tiết)</span>
              <strong className="text-[#0F0F0F] font-mono text-xs">{part1.correct} / {part1.total}</strong>
            </div>
            <div className="w-full bg-[#0F0F0F]/5 h-2 rounded-full overflow-hidden border border-[#0F0F0F]/5">
              <div
                className="bg-[#0F0F0F] h-full rounded-full transition-all duration-500"
                style={{ width: `${(part1.correct / part1.total) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Part 2 */}
          <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#0F0F0F]/10">
            <span className="text-[10px] font-bold text-[#0F0F0F]/40 uppercase tracking-wider block mb-1">
              Part 2: A New Era for the Game
            </span>
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-xs font-bold text-[#0F0F0F]">Q14–26 (Structure / Cấu trúc)</span>
              <strong className="text-[#0F0F0F] font-mono text-xs">{part2.correct} / {part2.total}</strong>
            </div>
            <div className="w-full bg-[#0F0F0F]/5 h-2 rounded-full overflow-hidden border border-[#0F0F0F]/5">
              <div
                className="bg-[#0F0F0F] h-full rounded-full transition-all duration-500"
                style={{ width: `${(part2.correct / part2.total) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Part 3 */}
          <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#0F0F0F]/10">
            <span className="text-[10px] font-bold text-[#0F0F0F]/40 uppercase tracking-wider block mb-1">
              Part 3: The Price of Hosting
            </span>
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-xs font-bold text-[#0F0F0F]">Q27–40 (Critique / Đánh giá)</span>
              <strong className="text-[#0F0F0F] font-mono text-xs">{part3.correct} / {part3.total}</strong>
            </div>
            <div className="w-full bg-[#0F0F0F]/5 h-2 rounded-full overflow-hidden border border-[#0F0F0F]/5">
              <div
                className="bg-[#0F0F0F] h-full rounded-full transition-all duration-500"
                style={{ width: `${(part3.correct / part3.total) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Skill & Question Type Analyzer */}
      <div className="space-y-4">
        <h4 className="text-[10px] font-extrabold text-[#0F0F0F]/50 uppercase tracking-widest flex items-center gap-2">
          <span>Phân Tích Chi Tiết Dạng Câu Hỏi IELTS (IELTS Question Type Diagnostics)</span>
          <span className="h-px bg-[#0F0F0F]/10 flex-1"></span>
        </h4>

        <div className="bg-[#FAF8F5] rounded-[24px] border border-[#0F0F0F]/10 p-6 divide-y divide-[#0F0F0F]/10">
          {/* TFNG */}
          <div className="py-4">
            <button 
              onClick={() => toggleCategory('tfng')}
              className="w-full text-left flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 group transition cursor-pointer"
            >
              <div>
                <span className="font-bold text-[#0F0F0F] text-xs sm:text-sm flex items-center gap-1.5 group-hover:underline">
                  True / False / Not Given (Scan for Specific Details / Tìm thông tin cụ thể)
                  {expandedCategory === 'tfng' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </span>
                <p className="text-xs text-[#0F0F0F]/60 mt-0.5">
                  Kiểm tra khả năng xác định các tuyên bố thực tế chính xác (precise factual claims) trong Paragraphs A, B, C, D.
                </p>
              </div>
              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end shrink-0">
                <span className="text-xs font-mono font-bold text-[#0F0F0F] bg-white px-3 py-1 rounded-full border border-[#0F0F0F]/10">
                  Score: {tfng.correct} / {tfng.total}
                </span>
                <span className="text-xs font-semibold text-[#0F0F0F] w-16 text-right">
                  {Math.round((tfng.correct / (tfng.total || 1)) * 100)}%
                </span>
              </div>
            </button>
            {expandedCategory === 'tfng' && renderCategoryQuestions(['TFNG'])}
          </div>

          {/* Summary Completion */}
          <div className="py-4">
            <button 
              onClick={() => toggleCategory('summary')}
              className="w-full text-left flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 group transition cursor-pointer"
            >
              <div>
                <span className="font-bold text-[#0F0F0F] text-xs sm:text-sm flex items-center gap-1.5 group-hover:underline">
                  Summary Completion (Vocabulary & Paraphrasing / Từ vựng & Biến đổi câu)
                  {expandedCategory === 'summary' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </span>
                <p className="text-xs text-[#0F0F0F]/60 mt-0.5">
                  Kiểm tra kỹ năng tìm từ đồng nghĩa (synonyms) và chọn đúng dạng từ (word forms) để hoàn thành chỗ trống trong bài tóm tắt.
                </p>
              </div>
              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end shrink-0">
                <span className="text-xs font-mono font-bold text-[#0F0F0F] bg-white px-3 py-1 rounded-full border border-[#0F0F0F]/10">
                  Score: {summary.correct} / {summary.total}
                </span>
                <span className="text-xs font-semibold text-[#0F0F0F] w-16 text-right">
                  {Math.round((summary.correct / (summary.total || 1)) * 100)}%
                </span>
              </div>
            </button>
            {expandedCategory === 'summary' && renderCategoryQuestions(['SUMMARY'])}
          </div>

          {/* Matching Headings */}
          <div className="py-4">
            <button 
              onClick={() => toggleCategory('heading')}
              className="w-full text-left flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 group transition cursor-pointer"
            >
              <div>
                <span className="font-bold text-[#0F0F0F] text-xs sm:text-sm flex items-center gap-1.5 group-hover:underline">
                  Matching Headings (Skimming & Main Idea Identification / Đọc lướt & Tìm ý chính)
                  {expandedCategory === 'heading' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </span>
                <p className="text-xs text-[#0F0F0F]/60 mt-0.5">
                  Kiểm tra kỹ năng xác định chủ đề cốt lõi của đoạn văn (paragraph core topics) và loại trừ các chi tiết gây nhiễu (distractor details).
                </p>
              </div>
              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end shrink-0">
                <span className="text-xs font-mono font-bold text-[#0F0F0F] bg-white px-3 py-1 rounded-full border border-[#0F0F0F]/10">
                  Score: {heading.correct} / {heading.total}
                </span>
                <span className="text-xs font-semibold text-[#0F0F0F] w-16 text-right">
                  {Math.round((heading.correct / (heading.total || 1)) * 100)}%
                </span>
              </div>
            </button>
            {expandedCategory === 'heading' && renderCategoryQuestions(['HEADING'])}
          </div>

          {/* Matching Sentence Endings */}
          <div className="py-4">
            <button 
              onClick={() => toggleCategory('endings')}
              className="w-full text-left flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 group transition cursor-pointer"
            >
              <div>
                <span className="font-bold text-[#0F0F0F] text-xs sm:text-sm flex items-center gap-1.5 group-hover:underline">
                  Matching Sentence Endings (Cause & Effect Relationships / Quan hệ Nhân quả)
                  {expandedCategory === 'endings' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </span>
                <p className="text-xs text-[#0F0F0F]/60 mt-0.5">
                  Kiểm tra sự hiểu biết về cấu trúc lập luận (argumentative structures) và khẳng định của tác giả (claims made by authors).
                </p>
              </div>
              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end shrink-0">
                <span className="text-xs font-mono font-bold text-[#0F0F0F] bg-white px-3 py-1 rounded-full border border-[#0F0F0F]/10">
                  Score: {endings.correct} / {endings.total}
                </span>
                <span className="text-xs font-semibold text-[#0F0F0F] w-16 text-right">
                  {Math.round((endings.correct / (endings.total || 1)) * 100)}%
                </span>
              </div>
            </button>
            {expandedCategory === 'endings' && renderCategoryQuestions(['MATCHING_ENDINGS'])}
          </div>

          {/* Multiple Choice */}
          <div className="py-4">
            <button 
              onClick={() => toggleCategory('mc')}
              className="w-full text-left flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 group transition cursor-pointer"
            >
              <div>
                <span className="font-bold text-[#0F0F0F] text-xs sm:text-sm flex items-center gap-1.5 group-hover:underline">
                  Multiple Choice (Opinion & Detailed Synthesis / Ý kiến & Tổng hợp thông tin)
                  {expandedCategory === 'mc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </span>
                <p className="text-xs text-[#0F0F0F]/60 mt-0.5">
                  Kiểm tra khả năng nhận biết quan điểm của tác giả (authorial perspectives) và tổng hợp thông tin bài đọc (synthesized reading comprehension).
                </p>
              </div>
              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end shrink-0">
                <span className="text-xs font-mono font-bold text-[#0F0F0F] bg-white px-3 py-1 rounded-full border border-[#0F0F0F]/10">
                  Score: {mc.correct} / {mc.total}
                </span>
                <span className="text-xs font-semibold text-[#0F0F0F] w-16 text-right">
                  {Math.round((mc.correct / (mc.total || 1)) * 100)}%
                </span>
              </div>
            </button>
            {expandedCategory === 'mc' && renderCategoryQuestions(['MC', 'COMBO_MC'])}
          </div>
        </div>
      </div>

      {/* Strategic IELTS Instructor Advice Panel */}
      <div className="p-6 rounded-[24px] border border-[#0F0F0F] bg-[#FAF8F5] text-[#0F0F0F] flex items-start gap-4">
        <div className="w-10 h-10 bg-[#0F0F0F] border border-[#0F0F0F] rounded-full flex items-center justify-center shrink-0">
          <AlertCircle size={20} className="text-[#E2FF45]" />
        </div>
        <div className="space-y-1">
          <h4 className="font-bold text-sm sm:text-base font-serif italic">{advice.title}</h4>
          <p className="text-xs sm:text-sm leading-relaxed text-[#0F0F0F]/75 font-sans">
            {advice.desc}
          </p>
        </div>
      </div>
    </div>
  );
}
