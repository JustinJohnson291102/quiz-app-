import React, { useState } from 'react';
import {
  MagnifyingGlassIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';
import { Exam } from '../../types';
import ExamCard from './ExamCard';
import LoadingSpinner from '../common/LoadingSpinner';

const ExamList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

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

  const filteredExams = exams.filter((exam) => {
    const matchesSearch = exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.description.toLowerCase().includes(searchTerm.toLowerCase());
    const examStatus = getExamStatus(exam);
    const matchesStatus = selectedStatus === 'all' || examStatus === selectedStatus;
    
    return matchesSearch && matchesStatus;
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Exams</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Take formal assessments and track your progress
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            to="/exams/create"
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
              onChange={(e) => handleSearch(e.target.value)}
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
      {isLoading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        <div className="space-y-4">
          {filteredExams.map((exam) => (
            <ExamCard key={exam.id} exam={exam} />
          ))}
        </div>
      )}

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