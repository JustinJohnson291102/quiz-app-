import React from 'react';
import { Link } from 'react-router-dom';
import {
  ClockIcon,
  QuestionMarkCircleIcon,
  StarIcon,
  PlayIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';
import { Quiz } from '../../types';

interface QuizCardProps {
  quiz: Quiz;
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz }) => {
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

  const questionCount = quiz.questions.length || 10;
  const rating = 4.5;
  const reviewCount = 120;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 hover-card">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
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
            {questionCount} questions
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <StarIcon className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
            {rating} ({reviewCount} reviews)
          </div>
          <div className="flex space-x-2">
            <Link
              to={`/quiz/${quiz.id}/preview`}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 shadow-sm text-xs leading-4 font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 transition-colors"
            >
              <EyeIcon className="w-3 h-3 mr-1" />
              Preview
            </Link>
            <Link
              to={`/quiz/${quiz.id}/take`}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 transition-colors btn-scale"
            >
              <PlayIcon className="w-3 h-3 mr-1" />
              Start
            </Link>
          </div>
        </div>

        {quiz.tags.length > 0 && (
          <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
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
                <span className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1">
                  +{quiz.tags.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizCard;