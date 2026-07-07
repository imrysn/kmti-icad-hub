/**
 * mentorConstants.types.ts
 *
 * Shared TypeScript types for lesson and quiz data structures.
 * Imported by both mentorConstants.en.ts and mentorConstants.ja.ts.
 */

export type QuizQuestion = {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

export type Quiz = {
  title: string;
  description: string;
  questions: QuizQuestion[];
};

export type Lesson = {
  id: string;
  title: string;
  isCompleted?: boolean;
  children?: Lesson[];
  quiz?: Quiz;
  content?: string[];
};
