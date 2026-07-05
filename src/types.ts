export type QuestionType = 'TFNG' | 'SUMMARY' | 'MC' | 'HEADING' | 'MATCHING_ENDINGS' | 'COMBO_MC';

export interface Question {
  id: number;
  part: number;
  type: QuestionType;
  stem: string;
  options?: string[]; // For MC and COMBO_MC
  correctAnswer: string; // "TRUE", "FALSE", "NOT GIVEN", "YES", "NO" or exact text or single/multiple letters like "B", "B,D"
  explanation: string;
  paragraphRef?: string; // e.g. "A", "B" - for "Find in Passage" scrolling
}

export interface PartData {
  number: number;
  title: string;
  passageTitle: string;
  kicker: string;
  paragraphs: {
    id: string; // "A", "B", etc.
    text: string;
  }[];
  questions: Question[];
}

export interface UserAnswers {
  [questionId: number]: string; // stores user answers
}

export interface Highlight {
  id: string;
  part: number;
  paragraphId: string;
  startOffset: number;
  endOffset: number;
  text: string;
}
