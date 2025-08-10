import React, { useState } from 'react';
import { 
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline';

const HealthTrends = ({ pet }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('6months');

  // Mock trend data - in production this would come from backend
  const trendData = {
    '1month': {
      weight: { values: [24.8, 24.9, 25.0, 25.1], trend: 'up', change: '+1.2%' },
      activity: { values: [7.8, 8.0, 8.1, 8.2], trend: 'up', change: '+5.1%' },
      health: { values: [84, 85, 86, 87], trend: 'up', change: '+3.6%' }
    },
    '3months': {
      weight: { values: [24.2, 24.5, 24.8, 25.1], trend: 'up', change: '+3.7%' },
      activity: { values: [7.5, 7.8, 8.0, 8.2], trend: 'up', change: '+9.3%' },
      health: { values: [82, 84, 86, 87], trend: 'up', change: '+6.1%' }
    },
    '6months': {
      weight: { values: [23.8, 24.2, 24.5, 24.8, 25.0, 25.1], trend: 'up', change: '+5.5%' },
      activity: { values: [7.2, 7.4, 7.6, 7.8, 8.0, 8.2], trend: 'up', change: '+13.9%' },
      health: { values: [79, 81, 83, 85, 86, 87], trend: 'up', change: '+10.1%' }
    }
  };

  const currentData = trendData[selectedTimeframe];

  const getTrendIcon = (trend) => {
    return trend === 'up' ? 
      <ArrowTrendingUpIcon className="h-4 w-4 text-green-500" /> : 
      <ArrowTrendingDownIcon className="h-4 w-4 text-red-500" />;
  };

  const getChangeColor = (change) => {
    return change.startsWith('+') ? 'text-green-600' : 'text-red-600';
  };

  const generateSparkline = (values, color = 'blue') => {
    if (!values || values.length === 0) return '';
    
    const max = Math.max(...values);
    const min = Math.min(...values);
    const range = max - min || 1;
    
    const points = values.map((value, index) => {
      const x = (index / (values.length - 1)) * 100;
      const y = ((max - value) / range) * 80 + 10;
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg className="w-full h-16" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polyline
          fill="none"
          stroke={color === 'blue' ? '#3B82F6' : color === 'green' ? '#10B981' : '#F59E0B'}
          strokeWidth="2"
          points={points}
        />
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color === 'blue' ? '#3B82F6' : color === 'green' ? '#10B981' : '#F59E0B'} stopOpacity="0.3"/>
            <stop offset="100%" stopColor={color === 'blue' ? '#3B82F6' : color === 'green' ? '#10B981' : '#F59E0B'} stopOpacity="0.1"/>
          </linearGradient>
        </defs>
        <polygon
          fill={`url(#gradient-${color})`}
          points={`0,100 ${points} 100,100`}
        />
      </svg>
    );
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <ChartBarIcon className="h-5 w-5 text-blue-500 mr-2" />
          Health Trends
        </h3>
        
        {/* Timeframe Selector */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          {['1month', '3months', '6months'].map((timeframe) => (
            <button
              key={timeframe}
              onClick={() => setSelectedTimeframe(timeframe)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                selectedTimeframe === timeframe
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {timeframe === '1month' ? '1M' : timeframe === '3months' ? '3M' : '6M'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6">
        {/* Weight Trend */}
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="font-medium text-blue-900">Weight Tracking</h4>
              <div className="text-2xl font-bold text-blue-900">
                {currentData.weight.values[currentData.weight.values.length - 1]} kg
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center">
                {getTrendIcon(currentData.weight.trend)}
                <span className={`ml-1 text-sm font-medium ${getChangeColor(currentData.weight.change)}`}>
                  {currentData.weight.change}
                </span>
              </div>
              <div className="text-xs text-blue-700">vs {selectedTimeframe.replace('months', 'M').replace('month', 'M')} ago</div>
            </div>
          </div>
          <div className="h-16">
            {generateSparkline(currentData.weight.values, 'blue')}
          </div>
        </div>

        {/* Activity Trend */}
        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="font-medium text-green-900">Activity Level</h4>
              <div className="text-2xl font-bold text-green-900">
                {currentData.activity.values[currentData.activity.values.length - 1]}/10
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center">
                {getTrendIcon(currentData.activity.trend)}
                <span className={`ml-1 text-sm font-medium ${getChangeColor(currentData.activity.change)}`}>
                  {currentData.activity.change}
                </span>
              </div>
              <div className="text-xs text-green-700">vs {selectedTimeframe.replace('months', 'M').replace('month', 'M')} ago</div>
            </div>
          </div>
          <div className="h-16">
            {generateSparkline(currentData.activity.values, 'green')}
          </div>
        </div>

        {/* Overall Health Score Trend */}
        <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="font-medium text-amber-900">Health Score</h4>
              <div className="text-2xl font-bold text-amber-900">
                {currentData.health.values[currentData.health.values.length - 1]}/100
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center">
                {getTrendIcon(currentData.health.trend)}
                <span className={`ml-1 text-sm font-medium ${getChangeColor(currentData.health.change)}`}>
                  {currentData.health.change}
                </span>
              </div>
              <div className="text-xs text-amber-700">vs {selectedTimeframe.replace('months', 'M').replace('month', 'M')} ago</div>
            </div>
          </div>
          <div className="h-16">
            {generateSparkline(currentData.health.values, 'amber')}
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-2">🔍 Key Insights</h4>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• {pet?.name || 'Your pet'} shows consistent improvement in overall health</li>
          <li>• Activity levels have increased significantly over the past {selectedTimeframe.replace('months', ' months').replace('month', ' month')}</li>
          <li>• Weight management is on track with gradual healthy increase</li>
        </ul>
      </div>
    </div>
  );
};

export default HealthTrends;
