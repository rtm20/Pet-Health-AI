import React from 'react';
import { 
  HeartIcon,
  ScaleIcon,
  FireIcon,
  ClockIcon,
  TrendingUpIcon,
  TrendingDownIcon
} from '@heroicons/react/24/outline';

const HealthMetrics = ({ pet }) => {
  // Mock health data - in production this would come from backend
  const healthMetrics = {
    overall: {
      score: 87,
      status: 'Good',
      trend: 'up',
      change: '+3'
    },
    weight: {
      current: pet?.weight || 25.5,
      target: 24.0,
      unit: 'kg',
      trend: 'stable',
      change: '0.0'
    },
    activity: {
      score: 8.2,
      target: 8.0,
      trend: 'up',
      change: '+0.4'
    },
    lastCheckup: {
      days: 45,
      next: 'Oct 15, 2025'
    }
  };

  const getTrendIcon = (trend) => {
    if (trend === 'up') return <TrendingUpIcon className="h-4 w-4 text-green-500" />;
    if (trend === 'down') return <TrendingDownIcon className="h-4 w-4 text-red-500" />;
    return <div className="h-4 w-4 bg-gray-400 rounded-full"></div>;
  };

  const getScoreColor = (score) => {
    if (score >= 85) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 70) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <HeartIcon className="h-5 w-5 text-red-500 mr-2" />
          Health Overview
        </h3>
        <span className="text-sm text-gray-500">Updated 2 hours ago</span>
      </div>

      {/* Overall Health Score */}
      <div className={`p-4 rounded-lg border mb-6 ${getScoreColor(healthMetrics.overall.score)}`}>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold">{healthMetrics.overall.score}/100</div>
            <div className="text-sm opacity-75">Overall Health Score</div>
          </div>
          <div className="text-right">
            <div className="flex items-center">
              {getTrendIcon(healthMetrics.overall.trend)}
              <span className="ml-1 text-sm">{healthMetrics.overall.change}</span>
            </div>
            <div className="text-sm opacity-75">{healthMetrics.overall.status}</div>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Weight */}
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center mb-2">
            <ScaleIcon className="h-5 w-5 text-blue-600 mr-2" />
            <span className="font-medium text-blue-900">Weight</span>
          </div>
          <div className="text-xl font-bold text-blue-900">
            {healthMetrics.weight.current} {healthMetrics.weight.unit}
          </div>
          <div className="text-sm text-blue-700 flex items-center mt-1">
            Target: {healthMetrics.weight.target} {healthMetrics.weight.unit}
            <div className="ml-2 flex items-center">
              {getTrendIcon(healthMetrics.weight.trend)}
              <span className="ml-1">{healthMetrics.weight.change}</span>
            </div>
          </div>
        </div>

        {/* Activity Level */}
        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
          <div className="flex items-center mb-2">
            <FireIcon className="h-5 w-5 text-purple-600 mr-2" />
            <span className="font-medium text-purple-900">Activity Level</span>
          </div>
          <div className="text-xl font-bold text-purple-900">
            {healthMetrics.activity.score}/10
          </div>
          <div className="text-sm text-purple-700 flex items-center mt-1">
            Target: {healthMetrics.activity.target}/10
            <div className="ml-2 flex items-center">
              {getTrendIcon(healthMetrics.activity.trend)}
              <span className="ml-1">{healthMetrics.activity.change}</span>
            </div>
          </div>
        </div>

        {/* Last Checkup */}
        <div className="p-4 bg-orange-50 rounded-lg border border-orange-200 md:col-span-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ClockIcon className="h-5 w-5 text-orange-600 mr-2" />
              <span className="font-medium text-orange-900">Veterinary Care</span>
            </div>
            <div className="text-right">
              <div className="text-sm text-orange-700">
                Last checkup: {healthMetrics.lastCheckup.days} days ago
              </div>
              <div className="text-sm text-orange-600 font-medium">
                Next: {healthMetrics.lastCheckup.next}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-3 mt-6">
        <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
          📸 Analyze Photo
        </button>
        <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
          📅 Schedule Checkup
        </button>
      </div>
    </div>
  );
};

export default HealthMetrics;
