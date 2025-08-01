import React, { useState } from 'react';
import {
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';
import { Quiz } from '../../types';
import QuizCard from './QuizCard';
import LoadingSpinner from '../common/LoadingSpinner';

const QuizList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data
  const quizzes: Quiz[] = [
    {
      id: '1',
      title: 'JavaScript Fundamentals',
      description: 'Test your knowledge of JavaScript basics including variables, functions, and control structures.',
      category: 'Programming',
      questions: [],
      timeLimit: 15,
      retryAllowed: true,
      showAnswers: true,
      difficulty: 'easy',
      tags: ['javascript', 'basics', 'frontend'],
      isPublic: true,
      createdBy: 'admin',
      createdAt: '2024-01-10',
    },
    {
      id: '2',
      title: 'React Hooks Deep Dive',
      description: 'Advanced concepts in React Hooks including useEffect, useContext, and custom hooks.',
      category: 'Programming',
      questions: [],
      timeLimit: 25,
      retryAllowed: true,
      showAnswers: true,
      difficulty: 'hard',
      tags: ['react', 'hooks', 'advanced'],
      isPublic: true,
      createdBy: 'admin',
      createdAt: '2024-01-12',
    },
    {
      id: '3',
      title: 'World Geography',
      description: 'Test your knowledge of world capitals, countries, and geographical features.',
      category: 'General Knowledge',
      questions: [],
      timeLimit: 20,
      retryAllowed: true,
      showAnswers: true,
      difficulty: 'medium',
      tags: ['geography', 'world', 'knowledge'],
      isPublic: true,
      createdBy: 'admin',
      createdAt: '2024-01-08',
    },
    {
      id: '4',
      title: 'Mathematics - Algebra',
      description: 'Linear equations, quadratic functions, and algebraic expressions.',
      category: 'Mathematics',
      questions: [],
      timeLimit: 30,
      retryAllowed: false,
      showAnswers: false,
      difficulty: 'medium',
      tags: ['math', 'algebra', 'equations'],
      isPublic: true,
      createdBy: 'admin',
      createdAt: '2024-01-05',
    },
  ];

  const categories = ['all', 'Programming', 'General Knowledge', 'Mathematics', 'Science', 'History'];
  const difficulties = ['all', 'easy', 'medium', 'hard'];

  const filteredQuizzes = quizzes.filter((quiz) => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quiz.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quiz.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || quiz.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || quiz.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const handleSearch = (value: string) => {
    setIsLoading(true);
    setSearchTerm(value);
    // Simulate API delay
    setTimeout(() => setIsLoading(false), 300);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Quizzes</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Practice with interactive quizzes and improve your skills
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            to="/quizzes/create"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900"
          >
            Create Quiz
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search quizzes..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              {difficulties.map((difficulty) => (
                <option key={difficulty} value={difficulty}>
                  {difficulty === 'all' ? 'All Difficulties' : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Quiz Grid */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      )}

      {filteredQuizzes.length === 0 && (
        <div className="text-center py-12">
          <QuestionMarkCircleIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No quizzes found</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default QuizList;