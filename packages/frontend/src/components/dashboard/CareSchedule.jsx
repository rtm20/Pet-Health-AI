import React from 'react';
import { 
  CalendarIcon,
  HeartIcon,
  ShieldCheckIcon,
  DocumentIcon
} from '@heroicons/react/24/outline';

const CareSchedule = ({ pet }) => {
  // Mock care schedule data - in production this would come from backend
  const upcomingCare = [
    {
      id: 1,
      type: 'vaccination',
      title: 'Annual Rabies Vaccination',
      date: '2025-08-15',
      priority: 'high',
      vet: 'Dr. Sarah Johnson',
      clinic: 'Happy Paws Veterinary',
      notes: 'Annual booster shot required by law',
      status: 'scheduled'
    },
    {
      id: 2,
      type: 'checkup',
      title: 'Routine Health Checkup',
      date: '2025-09-10',
      priority: 'medium',
      vet: 'Dr. Michael Chen',
      clinic: 'Pet Care Plus',
      notes: 'General wellness examination',
      status: 'pending'
    },
    {
      id: 3,
      type: 'dental',
      title: 'Dental Cleaning',
      date: '2025-10-05',
      priority: 'medium',
      vet: 'Dr. Emily Rodriguez',
      clinic: 'Advanced Pet Dental',
      notes: 'Professional dental cleaning and examination',
      status: 'pending'
    },
    {
      id: 4,
      type: 'grooming',
      title: 'Professional Grooming',
      date: '2025-08-20',
      priority: 'low',
      vet: 'Pet Grooming Studio',
      clinic: 'Pampered Pets',
      notes: 'Full grooming service including nail trim',
      status: 'pending'
    }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'vaccination':
        return <ShieldCheckIcon className="h-5 w-5 text-blue-500" />;
      case 'checkup':
        return <HeartIcon className="h-5 w-5 text-green-500" />;
      case 'dental':
        return <DocumentIcon className="h-5 w-5 text-purple-500" />;
      case 'grooming':
        return <CalendarIcon className="h-5 w-5 text-orange-500" />;
      default:
        return <CalendarIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'vaccination':
        return 'bg-blue-50 border-blue-200 text-blue-900';
      case 'checkup':
        return 'bg-green-50 border-green-200 text-green-900';
      case 'dental':
        return 'bg-purple-50 border-purple-200 text-purple-900';
      case 'grooming':
        return 'bg-orange-50 border-orange-200 text-orange-900';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-900';
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high':
        return <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full font-medium">High</span>;
      case 'medium':
        return <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-medium">Medium</span>;
      case 'low':
        return <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full font-medium">Low</span>;
      default:
        return null;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'scheduled':
        return <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">Scheduled</span>;
      case 'pending':
        return <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-medium">Pending</span>;
      case 'completed':
        return <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full font-medium">Completed</span>;
      default:
        return null;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDaysUntil = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Overdue';
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    return `${diffDays} days`;
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <CalendarIcon className="h-5 w-5 text-blue-500 mr-2" />
          Care Schedule
        </h3>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          Add Appointment
        </button>
      </div>

      <div className="space-y-4">
        {upcomingCare.map((item) => (
          <div key={item.id} className={`p-4 rounded-lg border ${getTypeColor(item.type)}`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center">
                {getTypeIcon(item.type)}
                <div className="ml-3">
                  <h4 className="font-medium">{item.title}</h4>
                  <div className="text-sm opacity-75 flex items-center mt-1">
                    <span>{formatDate(item.date)}</span>
                    <span className="mx-2">•</span>
                    <span className="font-medium">{getDaysUntil(item.date)}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                {getPriorityBadge(item.priority)}
                {getStatusBadge(item.status)}
              </div>
            </div>

            <div className="text-sm opacity-75 mb-3">
              <div className="flex items-center mb-1">
                <span className="font-medium">Vet:</span>
                <span className="ml-1">{item.vet}</span>
              </div>
              <div className="flex items-center mb-1">
                <span className="font-medium">Clinic:</span>
                <span className="ml-1">{item.clinic}</span>
              </div>
              {item.notes && (
                <div className="flex items-start">
                  <span className="font-medium">Notes:</span>
                  <span className="ml-1">{item.notes}</span>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              {item.status === 'pending' && (
                <button className="text-xs bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors">
                  Schedule
                </button>
              )}
              {item.status === 'scheduled' && (
                <button className="text-xs bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition-colors">
                  Confirm
                </button>
              )}
              <button className="text-xs border border-gray-300 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-50 transition-colors">
                Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-blue-600">
              {upcomingCare.filter(item => item.priority === 'high').length}
            </div>
            <div className="text-xs text-gray-600">High Priority</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-green-600">
              {upcomingCare.filter(item => item.status === 'scheduled').length}
            </div>
            <div className="text-xs text-gray-600">Scheduled</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-amber-600">
              {upcomingCare.filter(item => {
                const days = getDaysUntil(item.date);
                return days !== 'Overdue' && parseInt(days) <= 7;
              }).length}
            </div>
            <div className="text-xs text-gray-600">This Week</div>
          </div>
        </div>
      </div>

      {/* Add to Calendar */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
          📅 Sync with Calendar
        </button>
      </div>
    </div>
  );
};

export default CareSchedule;
