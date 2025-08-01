export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user' | 'examiner';
  avatar?: string;
  createdAt: string;
  preferences: {
    theme: 'light' | 'dark' | 'system';
    language: string;
    notifications: boolean;
  };
}

export interface Question {
  id: string;
  type: 'mcq' | 'true-false' | 'fill-blank';
  category: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
  points: number;
  tags: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  version: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  questions: Question[];
  timeLimit?: number;
  retryAllowed: boolean;
  showAnswers: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  isPublic: boolean;
  createdBy: string;
  createdAt: string;
}

export interface Exam {
  id: string;
  title: string;
  subject: string;
  description: string;
  questions: Question[];
  duration: number; // in minutes
  totalMarks: number;
  passingMarks: number;
  startDate: string;
  endDate: string;
  instructions: string[];
  settings: {
    shuffleQuestions: boolean;
    preventTabSwitch: boolean;
    autoSubmit: boolean;
    showResultsImmediately: boolean;
    allowReview: boolean;
  };
  createdBy: string;
  createdAt: string;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  userId: string;
  answers: Record<string, string>;
  score: number;
  totalQuestions: number;
  timeSpent: number;
  completedAt: string;
  isCompleted: boolean;
}

export interface ExamAttempt {
  id: string;
  examId: string;
  userId: string;
  answers: Record<string, string>;
  score: number;
  totalMarks: number;
  timeSpent: number;
  startedAt: string;
  submittedAt?: string;
  isSubmitted: boolean;
  tabSwitchCount: number;
  flaggedQuestions: string[];
}

export interface LeaderboardEntry {
  userId: string;
  userName: string;
  avatar?: string;
  score: number;
  timeSpent: number;
  rank: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: string;
  earnedAt?: string;
}

export interface UserProgress {
  userId: string;
  level: number;
  xp: number;
  badges: Badge[];
  streakDays: number;
  totalQuizzes: number;
  totalExams: number;
  averageScore: number;
}