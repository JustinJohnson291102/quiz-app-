import React from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarDaysIcon,
  ClockIcon,
  AcademicCapIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  PlayIcon,
} from '@heroicons/react/24/outline';
import { Exam } from '../../types';

interface ExamCardProps {
  exam: Exam;
}

const ExamCard: React.FC<ExamCardProps> = ({ exam }) => {
  const getExamStatus = (exam: Exam) => {
    const now = new Date();
    const startDate = new Date(exam.startDate);
    const endDate = new Date(exam.endDate);

    if (now < startDate) return 'upcoming';
    if (now >= startDate && now <= endDate) return 'active';
    return 'completed';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'completed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <CalendarDaysIcon className="w-4 h-4" />;
      case 'active':
        return <PlayIcon className="w-4 h-4" />;
      case 'completed':
        return <CheckCircleIcon className="w-4 h-4" />;
      default:
        return <CalendarDaysIcon className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const status = getExamStatus(exam);
  const questionCount = exam.questions.length || 25;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 hover-card">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">
                {exam.title}
              </h3>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                {getStatusIcon(status)}
                <span className="ml-1 capitalize">{status}</span>
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
              {exam.description}
            </p>
            <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <AcademicCapIcon className="w-4 h-4 mr-1" />
                {exam.subject}
              </div>
              <div className="flex items-center">
                <ClockIcon className="w-4 h-4 mr-1" />
                {exam.duration} minutes
              </div>
              <div className="flex items-center">
                <span className="mr-1">📊</span>
                {exam.totalMarks} marks
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Schedule</h4>
            <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <div>Start: {formatDate(exam.startDate)}</div>
              <div>End: {formatDate(exam.endDate)}</div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Requirements</h4>
            <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <div>Passing: {exam.passingMarks}/{exam.totalMarks} marks</div>
              <div>Questions: {questionCount} total</div>
            </div>
          </div>
        </div>

        {exam.settings.preventTabSwitch && (
          <div className="flex items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg mb-4">
            <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-2 flex-shrink-0" />
            <span className="text-sm text-yellow-800 dark:text-yellow-300">
              This exam monitors tab switching. Do not leave this page during the exam.
            </span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Created by {exam.createdBy} • {formatDate(exam.createdAt)}
          </div>
          <div className="flex space-x-3">
            <Link
              to={`/exam/${exam.id}/details`}
              className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 transition-colors"
            >
              View Details
            </Link>
            {status === 'active' ? (
              <Link
                to={`/exam/${exam.id}/take`}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-gray-800 transition-colors btn-scale"
              >
                <PlayIcon className="w-4 h-4 mr-1" />
                Start Exam
              </Link>
            ) : status === 'upcoming' ? (
              <button
                disabled
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-400 bg-gray-200 dark:bg-gray-600 cursor-not-allowed"
              >
                Not Started
              </button>
            ) : (
              <Link
                to={`/exam/${exam.id}/results`}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 transition-colors"
              >
                View Results
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamCard;