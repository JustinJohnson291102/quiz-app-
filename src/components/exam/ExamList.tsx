import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MagnifyingGlassIcon,
  CalendarDaysIcon,
  ClockIcon,
  AcademicCapIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  PlayIcon,
} from '@heroicons/react/24/outline';
import { Exam } from '../../types';

const ExamList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Mock data
  const exams: Exam[] = [
    {
      id: '1',
      title: 'Frontend Development Assessment',
      subject: 'Web Development',
      description: 'Comprehensive evaluation of HTML, CSS, JavaScript, and React skills.',
      questions: [],
      duration: 120,
      totalMarks: 100,
      passingMarks: 60,
      startDate: '2024-01-20T10:00:00Z',
      endDate: '2024-01-20T12:00:00Z',
      instructions: [
        'Read all questions carefully before answering',
        'Do not refresh the browser during the exam',
        'Submit your answers before the time limit',
      ],
      settings: {
        shuffleQuestions: true,
        preventTabSwitch: true,
        autoSubmit: true,
        showResultsImmediately: false,
        allowReview: true,
      },
      createdBy: 'examiner',
      createdAt: '2024-01-15',
    },
    {
      id: '2',
      title: 'Database Design Fundamentals',
      subject: 'Database Management',
      description: 'Test your knowledge of SQL, database normalization, and design principles.',
      questions: [],
      duration: 90,
      totalMarks: 80,
      passingMarks: 48,
      startDate: '2024-01-22T14:00:00Z',
      endDate: '2024-01-22T15:30:00Z',
      instructions: [
        'All questions are mandatory',
        'Use proper SQL syntax in code questions',
        'Time management is crucial',
      ],
      settings: {
        shuffleQuestions: false,
        preventTabSwitch: true,
        autoSubmit: true,
        showResultsImmediately: true,
        allowReview: false,
      },
      createdBy: 'examiner',
      createdAt: '2024-01-16',
    },
    {
      id: '3',
      title: 'Python Programming Certification',
      subject: 'Programming',
      description: 'Advanced Python concepts including OOP, data structures, and algorithms.',
      questions: [],
      duration: 150,
      totalMarks: 120,
      passingMarks: 72,
      startDate: '2024-01-18T09:00:00Z',
      endDate: '2024-01-18T11:30:00Z',
      instructions: [
        'Code must be syntactically correct',
        'Explain your algorithms clearly',
        'Optimize for both time and space complexity',
      ],
      settings: {
        shuffleQuestions: true,
        preventTabSwitch: true,
        autoSubmit: true,
        showResultsImmediately: false,
        allowReview: true,
      },
      createdBy: 'examiner',
      createdAt: '2024-01-12',
    },
  ];

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

  const filteredExams = exams.filter((exam) => {
    const matchesSearch = exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.description.toLowerCase().includes(searchTerm.toLowerCase());
    const examStatus = getExamStatus(exam);
    const matchesStatus = selectedStatus === 'all' || examStatus === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Exams</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Take formal assessments and track your progress
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            to="/exam/create"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900"
          >
            Create Exam
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search exams..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="all">All Exams</option>
              <option value="upcoming">Upcoming</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Exam List */}
      <div className="space-y-4">
        {filteredExams.map((exam) => {
          const status = getExamStatus(exam);
          return (
            <div
              key={exam.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {exam.title}
                      </h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                        {getStatusIcon(status)}
                        <span className="ml-1 capitalize">{status}</span>
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
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
                      <div>Questions: {exam.questions.length || '25'} total</div>
                    </div>
                  </div>
                </div>

                {exam.settings.preventTabSwitch && (
                  <div className="flex items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg mb-4">
                    <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-2" />
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
                      className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
                    >
                      View Details
                    </Link>
                    {status === 'active' ? (
                      <Link
                        to={`/exam/${exam.id}/take`}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-gray-800"
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
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
                      >
                        View Results
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredExams.length === 0 && (
        <div className="text-center py-12">
          <AcademicCapIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No exams found</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default ExamList;