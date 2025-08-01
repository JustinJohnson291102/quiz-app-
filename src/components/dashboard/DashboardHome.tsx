import React from 'react';
import { Link } from 'react-router-dom';
import {
  AcademicCapIcon,
  DocumentTextIcon,
  TrophyIcon,
  ChartBarIcon,
  ClockIcon,
  FireIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';
import StatsCard from './StatsCard';
import { BookOpen, FileText, Trophy, Flame } from 'lucide-react';

const DashboardHome: React.FC = () => {
  const { user } = useAuth();

  const quickStats = [
    { 
      name: 'Quizzes Completed', 
      value: '24', 
      icon: BookOpen, 
      color: 'bg-blue-500',
      trend: { value: 12, isPositive: true }
    },
    { 
      name: 'Exams Taken', 
      value: '8', 
      icon: FileText, 
      color: 'bg-green-500',
      trend: { value: 25, isPositive: true }
    },
    { 
      name: 'Average Score', 
      value: '85%', 
      icon: Trophy, 
      color: 'bg-yellow-500',
      trend: { value: 5, isPositive: true }
    },
    { 
      name: 'Study Streak', 
      value: '7 days', 
      icon: Flame, 
      color: 'bg-red-500',
      trend: { value: 2, isPositive: true }
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'quiz',
      title: 'JavaScript Fundamentals',
      score: 92,
      date: '2024-01-15',
      status: 'completed',
    },
    {
      id: 2,
      type: 'exam',
      title: 'Advanced React Patterns',
      score: 88,
      date: '2024-01-14',
      status: 'completed',
    },
    {
      id: 3,
      type: 'quiz',
      title: 'CSS Grid Layout',
      score: 95,
      date: '2024-01-13',
      status: 'completed',
    },
  ];

  const upcomingExams = [
    {
      id: 1,
      title: 'Node.js Backend Development',
      date: '2024-01-20',
      time: '10:00 AM',
      duration: 120,
      status: 'upcoming',
    },
    {
      id: 2,
      title: 'Database Design Principles',
      date: '2024-01-22',
      time: '2:00 PM',
      duration: 90,
      status: 'upcoming',
    },
  ];

  const achievements = [
    { name: 'Quick Learner', description: 'Complete 5 quizzes in a day', earned: true },
    { name: 'Perfect Score', description: 'Score 100% on any quiz', earned: true },
    { name: 'Consistency Champion', description: 'Study for 7 consecutive days', earned: true },
    { name: 'Quiz Master', description: 'Complete 50 quizzes', earned: false },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-blue-100">
          Ready to continue your learning journey? You're doing great!
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat) => (
          <StatsCard
            key={stat.name}
            name={stat.name}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
            trend={stat.trend}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
              <Link
                to="/history"
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >
                View all
              </Link>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg ${activity.type === 'quiz' ? 'bg-blue-100 dark:bg-blue-900' : 'bg-green-100 dark:bg-green-900'}`}>
                      {activity.type === 'quiz' ? (
                        <AcademicCapIcon className={`w-5 h-5 ${activity.type === 'quiz' ? 'text-blue-600 dark:text-blue-400' : 'text-green-600 dark:text-green-400'}`} />
                      ) : (
                        <DocumentTextIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">{activity.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {activity.date} • Score: {activity.score}%
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                      Completed
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Exams */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Upcoming Exams</h2>
            <div className="space-y-4">
              {upcomingExams.map((exam) => (
                <div key={exam.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">{exam.title}</h3>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
                    <div className="flex items-center">
                      <ClockIcon className="w-4 h-4 mr-1" />
                      {exam.duration} min
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {exam.date} at {exam.time}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Achievements</h2>
            <div className="space-y-3">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`p-1 rounded-full ${achievement.earned ? 'bg-yellow-100 dark:bg-yellow-900' : 'bg-gray-100 dark:bg-gray-700'}`}>
                    <StarIcon className={`w-4 h-4 ${achievement.earned ? 'text-yellow-600 dark:text-yellow-400' : 'text-gray-400'}`} />
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${achievement.earned ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                      {achievement.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/quizzes"
            className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
          >
            <AcademicCapIcon className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Browse Quizzes</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Find practice quizzes</p>
            </div>
          </Link>
          <Link
            to="/exams"
            className="flex items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
          >
            <DocumentTextIcon className="w-8 h-8 text-green-600 dark:text-green-400 mr-3" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Take Exams</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Formal assessments</p>
            </div>
          </Link>
          <Link
            to="/leaderboard"
            className="flex items-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors"
          >
            <TrophyIcon className="w-8 h-8 text-yellow-600 dark:text-yellow-400 mr-3" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Leaderboard</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">See rankings</p>
            </div>
          </Link>
          <Link
            to="/analytics"
            className="flex items-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
          >
            <ChartBarIcon className="w-8 h-8 text-purple-600 dark:text-purple-400 mr-3" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Analytics</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Track progress</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;