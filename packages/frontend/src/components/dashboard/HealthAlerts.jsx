import React from 'react';
import { 
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const HealthAlerts = ({ pet }) => {
  // Mock alerts data - in production this would come from backend
  const alerts = [
    {
      id: 1,
      type: 'warning',
      priority: 'high',
      title: 'Vaccination Due Soon',
      message: `${pet?.name || 'Your pet'}'s annual rabies vaccination is due in 5 days.`,
      timestamp: '2 hours ago',
      action: 'Schedule Appointment',
      actionType: 'schedule'
    },
    {
      id: 2,
      type: 'info',
      priority: 'medium',
      title: 'Weight Check Reminder',
      message: 'It\'s been 30 days since the last weight measurement.',
      timestamp: '1 day ago',
      action: 'Record Weight',
      actionType: 'record'
    },
    {
      id: 3,
      type: 'success',
      priority: 'low',
      title: 'Health Analysis Complete',
      message: 'Recent photo analysis shows normal healthy indicators.',
      timestamp: '3 days ago',
      action: 'View Results',
      actionType: 'view'
    }
  ];

  const getAlertIcon = (type) => {
    switch (type) {
      case 'warning':
        return <ExclamationTriangleIcon className="h-5 w-5 text-amber-500" />;
      case 'info':
        return <InformationCircleIcon className="h-5 w-5 text-blue-500" />;
      case 'success':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      default:
        return <InformationCircleIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getAlertStyles = (type, priority) => {
    const baseStyles = "p-4 rounded-lg border";
    
    if (type === 'warning' && priority === 'high') {
      return `${baseStyles} bg-amber-50 border-amber-200`;
    }
    if (type === 'info') {
      return `${baseStyles} bg-blue-50 border-blue-200`;
    }
    if (type === 'success') {
      return `${baseStyles} bg-green-50 border-green-200`;
    }
    return `${baseStyles} bg-gray-50 border-gray-200`;
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high':
        return <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">High</span>;
      case 'medium':
        return <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Medium</span>;
      case 'low':
        return <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">Low</span>;
      default:
        return null;
    }
  };

  const getActionButtonStyles = (actionType) => {
    switch (actionType) {
      case 'schedule':
        return 'bg-amber-600 hover:bg-amber-700 text-white';
      case 'record':
        return 'bg-blue-600 hover:bg-blue-700 text-white';
      case 'view':
        return 'bg-green-600 hover:bg-green-700 text-white';
      default:
        return 'bg-gray-600 hover:bg-gray-700 text-white';
    }
  };

  if (alerts.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
          Health Alerts
        </h3>
        <div className="text-center py-8">
          <CheckCircleIcon className="h-12 w-12 text-green-500 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">No health alerts at this time</p>
          <p className="text-gray-400 text-xs mt-1">Your pet's health monitoring is up to date</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <ExclamationTriangleIcon className="h-5 w-5 text-amber-500 mr-2" />
          Health Alerts
          {alerts.length > 0 && (
            <span className="ml-2 bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
              {alerts.length}
            </span>
          )}
        </h3>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <div key={alert.id} className={getAlertStyles(alert.type, alert.priority)}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  {getAlertIcon(alert.type)}
                  <h4 className="font-medium text-gray-900 ml-2">{alert.title}</h4>
                  <div className="ml-2">{getPriorityBadge(alert.priority)}</div>
                </div>
                <p className="text-sm text-gray-700 mb-3">{alert.message}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-gray-500">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    {alert.timestamp}
                  </div>
                  <button 
                    className={`text-xs px-3 py-1 rounded-lg font-medium transition-colors ${getActionButtonStyles(alert.actionType)}`}
                  >
                    {alert.action}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-amber-600">
              {alerts.filter(a => a.priority === 'high').length}
            </div>
            <div className="text-xs text-gray-600">High Priority</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-blue-600">
              {alerts.filter(a => a.priority === 'medium').length}
            </div>
            <div className="text-xs text-gray-600">Medium Priority</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-green-600">
              {alerts.filter(a => a.type === 'success').length}
            </div>
            <div className="text-xs text-gray-600">Good News</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthAlerts;
