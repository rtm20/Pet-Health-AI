import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { usePets } from '../../context/PetContext';

const Sidebar = () => {
  const location = useLocation();
  const { pets, selectedPet, setSelectedPet } = usePets();

  const isActiveRoute = (path) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: '🏠',
      description: 'Overview & Quick Stats'
    },
    {
      name: 'Health Analysis',
      href: '/health/analysis',
      icon: '📸',
      description: 'AI Photo Analysis'
    },
    {
      name: 'Vet Records',
      href: '/health/vet-records',
      icon: '🏥',
      description: 'Medical History'
    },
    {
      name: 'Add New Pet',
      href: '/pets/add',
      icon: '➕',
      description: 'Register New Pet'
    }
  ];

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-6">
        {/* Navigation Menu */}
        <nav className="space-y-2">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Navigation
          </h3>
          
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActiveRoute(item.href)
                  ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-600'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <span className="text-lg mr-3">{item.icon}</span>
              <div>
                <div>{item.name}</div>
                <div className="text-xs text-gray-500">{item.description}</div>
              </div>
            </Link>
          ))}
        </nav>

        {/* Pet Selector */}
        {pets.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">
              Your Pets ({pets.length})
            </h3>
            
            <div className="space-y-2">
              {pets.map((pet) => (
                <button
                  key={pet.id}
                  onClick={() => setSelectedPet(pet)}
                  className={`w-full text-left group flex items-center px-3 py-3 text-sm rounded-lg transition-colors ${
                    selectedPet?.id === pet.id
                      ? 'bg-green-100 text-green-700 border-l-4 border-green-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden bg-gray-200 mr-3">
                    {pet.photo ? (
                      <img 
                        src={pet.photo} 
                        alt={pet.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        🐕
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{pet.name}</div>
                    <div className="text-xs text-gray-500">
                      {pet.breed} • {pet.age.years} year{pet.age.years !== 1 ? 's' : ''} {pet.age.months > 0 ? `${pet.age.months} month${pet.age.months !== 1 ? 's' : ''}` : ''}
                    </div>
                    {selectedPet?.id === pet.id && (
                      <div className="text-xs text-green-600 font-medium mt-1">
                        Currently Selected
                      </div>
                    )}
                  </div>

                  {/* Health Status Indicator */}
                  <div className="flex-shrink-0">
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                </button>
              ))}
            </div>

            {/* Quick Pet Actions */}
            {selectedPet && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  Quick Actions for {selectedPet.name}
                </h4>
                <div className="space-y-2">
                  <Link
                    to={`/pets/${selectedPet.id}`}
                    className="block w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded"
                  >
                    📋 View Profile
                  </Link>
                  <Link
                    to="/health/analysis"
                    className="block w-full text-left px-3 py-2 text-sm text-green-600 hover:bg-green-50 rounded"
                  >
                    📸 Analyze Photo
                  </Link>
                  <Link
                    to="/health/vet-records"
                    className="block w-full text-left px-3 py-2 text-sm text-purple-600 hover:bg-purple-50 rounded"
                  >
                    🏥 Add Vet Record
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Empty State for No Pets */}
        {pets.length === 0 && (
          <div className="mt-8 p-6 bg-blue-50 rounded-lg text-center">
            <div className="text-4xl mb-2">🐕</div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">
              No pets yet
            </h3>
            <p className="text-xs text-gray-600 mb-4">
              Add your first pet to start monitoring their health
            </p>
            <Link
              to="/pets/add"
              className="inline-flex items-center px-3 py-2 text-xs font-medium text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors"
            >
              ➕ Add Your First Pet
            </Link>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Need Help?
          </h4>
          <div className="space-y-2 text-xs">
            <a href="/docs" className="block text-blue-600 hover:text-blue-800">
              📖 User Guide
            </a>
            <a href="/support" className="block text-blue-600 hover:text-blue-800">
              💬 Contact Support
            </a>
            <a href="/emergency" className="block text-red-600 hover:text-red-800">
              🚨 Emergency Help
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
