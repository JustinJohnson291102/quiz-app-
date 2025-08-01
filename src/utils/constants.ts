export const APP_CONFIG = {
  name: 'QuizExam Platform',
  version: '1.0.0',
  description: 'Comprehensive Quiz & Exam Platform',
  author: 'QuizExam Team',
} as const;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  QUIZZES: '/quizzes',
  EXAMS: '/exams',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  ADMIN: '/admin',
} as const;

export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'theme',
  PREFERENCES: 'preferences',
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
  },
  QUIZZES: {
    LIST: '/quizzes',
    CREATE: '/quizzes',
    GET: (id: string) => `/quizzes/${id}`,
    UPDATE: (id: string) => `/quizzes/${id}`,
    DELETE: (id: string) => `/quizzes/${id}`,
  },
  EXAMS: {
    LIST: '/exams',
    CREATE: '/exams',
    GET: (id: string) => `/exams/${id}`,
    UPDATE: (id: string) => `/exams/${id}`,
    DELETE: (id: string) => `/exams/${id}`,
  },
} as const;

export const QUIZ_DIFFICULTIES = ['easy', 'medium', 'hard'] as const;
export const QUESTION_TYPES = ['mcq', 'true-false', 'fill-blank'] as const;
export const USER_ROLES = ['admin', 'examiner', 'user'] as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
} as const;

export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 6,
  USERNAME_MIN_LENGTH: 3,
  QUIZ_TITLE_MAX_LENGTH: 100,
  EXAM_TITLE_MAX_LENGTH: 100,
} as const;