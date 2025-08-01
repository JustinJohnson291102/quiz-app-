import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
  StarIcon,
  PlayIcon,
} from '@heroicons/react/24/outline';
import { Quiz } from '../../types';

const QuizList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'hard':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
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
            to="/quiz/create"
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
              onChange={(e) => setSearchTerm(e.target.value)}
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQuizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {quiz.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {quiz.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                  {quiz.category}
                </span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(quiz.difficulty)}`}>
                  {quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)}
                </span>
              </div>

              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4 space-x-4">
                <div className="flex items-center">
                  <ClockIcon className="w-4 h-4 mr-1" />
                  {quiz.timeLimit ? `${quiz.timeLimit} min` : 'No limit'}
                </div>
                <div className="flex items-center">
                  <QuestionMarkCircleIcon className="w-4 h-4 mr-1" />
                  {quiz.questions.length || '10'} questions
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <StarIcon className="w-4 h-4 mr-1 text-yellow-400" />
                  4.5 (120 reviews)
                </div>
                <Link
                  to={`/quiz/${quiz.id}/take`}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 transition-colors"
                >
                  <PlayIcon className="w-4 h-4 mr-1" />
                  Start Quiz
                </Link>
              </div>

              {quiz.tags.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                  <div className="flex flex-wrap gap-1">
                    {quiz.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                      >
                        #{tag}
                      </span>
                    ))}
                    {quiz.tags.length > 3 && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        +{quiz.tags.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

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