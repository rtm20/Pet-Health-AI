import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { usePets } from '../../context/PetContext';
import { useHealth } from '../../context/HealthContext';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import {
  HeartIcon,
  CameraIcon,
  CalendarIcon,
  ClockIcon,
  PencilIcon,
  TrashIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  InformationCircleIcon,
  PhoneIcon,
  MapPinIcon,
  UserIcon,
  DocumentTextIcon,
  ChartBarIcon,
  PhotoIcon
} from '@heroicons/react/24/outline';

const PetProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pets, selectedPet, selectPet, deletePet } = usePets();
  const { getHealthAnalyses, getVetRecords } = useHealth();
  
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [healthData, setHealthData] = useState({
    analyses: [],
    vetRecords: [],
    vaccinations: []
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const findPet = pets.find(p => p.id === id);
    if (findPet) {
      setPet(findPet);
      if (selectedPet?.id !== id) {
        selectPet(findPet);
      }
      loadHealthData(findPet.id);
    } else if (pets.length > 0) {
      // Pet not found, redirect to dashboard
      navigate('/dashboard');
    }
    setLoading(false);
  }, [id, pets, selectedPet, selectPet, navigate]);

  const loadHealthData = async (petId) => {
    try {
      // In a real app, these would be actual API calls
      // const analyses = await getHealthAnalyses(petId);
      // const records = await getVetRecords(petId);
      
      // For now, use mock data
      setHealthData({
        analyses: [],
        vetRecords: [],
        vaccinations: pet?.vaccinations || []
      });
    } catch (error) {
      console.error('Failed to load health data:', error);
    }
  };

  const handleDeletePet = async () => {
    try {
      await deletePet(pet.id);
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to delete pet:', error);
      alert('Failed to delete pet. Please try again.');
    }
  };

  const calculateAge = (birthDate) => {
    if (!birthDate) return 'Unknown';
    
    const now = new Date();
    const birth = new Date(birthDate);
    const years = now.getFullYear() - birth.getFullYear();
    const months = now.getMonth() - birth.getMonth();
    
    if (years === 0) {
      return `${months} months`;
    } else if (months < 0) {
      return `${years - 1} years, ${12 + months} months`;
    } else {
      return `${years} years, ${months} months`;
    }
  };

  const formatWeight = (weight, unit = 'kg') => {
    if (!weight) return 'Not specified';
    return `${weight} ${unit}`;
  };

  const getVaccinationStatus = (vaccination) => {
    if (!vaccination.nextDueDate) return 'unknown';
    
    const now = new Date();
    const dueDate = new Date(vaccination.nextDueDate);
    const daysUntilDue = Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24));
    
    if (daysUntilDue < 0) return 'overdue';
    if (daysUntilDue <= 30) return 'due_soon';
    return 'current';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'current':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'due_soon':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'overdue':
        return 'text-red-700 bg-red-50 border-red-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const formatStatus = (status) => {
    return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  if (loading) {
    return <LoadingSpinner text="Loading pet profile..." />;
  }

  if (!pet) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center">
        <div className="text-6xl mb-6">🐕</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Pet Not Found</h2>
        <p className="text-gray-600 mb-8">
          The pet you're looking for doesn't exist or has been removed.
        </p>
        <Link
          to="/dashboard"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const petNotes = pet.notes ? JSON.parse(pet.notes) : {};

  return (
    <div className="max-w-6xl mx-auto py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="flex items-center space-x-6 mb-4 md:mb-0">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-white/20 border-4 border-white/30">
              {pet.profileImageUrl ? (
                <img 
                  src={pet.profileImageUrl} 
                  alt={pet.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl">
                  🐕
                </div>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">{pet.name}</h1>
              <div className="space-y-1 text-blue-100">
                <p className="text-lg">{pet.breed} • {pet.species}</p>
                <p>{calculateAge(pet.birthDate)} • {formatWeight(pet.weight)}</p>
                <p className="capitalize">{pet.gender}</p>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <Link
              to={`/pets/${pet.id}/edit`}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
            >
              <PencilIcon className="w-4 h-4 mr-2" />
              Edit
            </Link>
            <Link
              to="/health/analysis"
              className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors flex items-center font-medium"
            >
              <CameraIcon className="w-4 h-4 mr-2" />
              Analyze Photo
            </Link>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="bg-red-500/80 hover:bg-red-500 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
            >
              <TrashIcon className="w-4 h-4 mr-2" />
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex">
            {[
              { id: 'overview', name: 'Overview', icon: InformationCircleIcon },
              { id: 'health', name: 'Health Records', icon: HeartIcon },
              { id: 'vaccinations', name: 'Vaccinations', icon: CalendarIcon },
              { id: 'documents', name: 'Documents', icon: DocumentTextIcon }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-5 h-5 mr-2" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="space-y-8">
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Basic Information */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Species</label>
                    <p className="text-gray-900 capitalize">{pet.species}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Breed</label>
                    <p className="text-gray-900">{pet.breed}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Gender</label>
                    <p className="text-gray-900 capitalize">{pet.gender?.replace('-', ' ')}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Weight</label>
                    <p className="text-gray-900">{formatWeight(pet.weight)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Color</label>
                    <p className="text-gray-900">{pet.color || 'Not specified'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Microchip ID</label>
                    <p className="text-gray-900">{pet.microchipNumber || 'Not registered'}</p>
                  </div>
                </div>
              </div>

              {/* Medical Information */}
              {(petNotes.medicalHistory || petNotes.allergies || petNotes.medications) && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Medical Information</h3>
                  <div className="space-y-4">
                    {petNotes.medicalHistory && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">Medical History</label>
                        <p className="text-gray-900 mt-1">{petNotes.medicalHistory}</p>
                      </div>
                    )}
                    {petNotes.allergies && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">Known Allergies</label>
                        <p className="text-gray-900 mt-1">{petNotes.allergies}</p>
                      </div>
                    )}
                    {petNotes.medications && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">Current Medications</label>
                        <p className="text-gray-900 mt-1">{petNotes.medications}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Distinctive Features */}
              {petNotes.markings && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Distinctive Features</h3>
                  <p className="text-gray-900">{petNotes.markings}</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Health Analyses</span>
                    <span className="font-semibold">{healthData.analyses.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Vet Records</span>
                    <span className="font-semibold">{healthData.vetRecords.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Vaccinations</span>
                    <span className="font-semibold">{healthData.vaccinations.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Member Since</span>
                    <span className="font-semibold">
                      {new Date(pet.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Veterinary Contact */}
              {petNotes.vetInfo && (petNotes.vetInfo.clinicName || petNotes.vetInfo.vetName) && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Veterinary Contact</h3>
                  <div className="space-y-3">
                    {petNotes.vetInfo.clinicName && (
                      <div className="flex items-center">
                        <MapPinIcon className="w-4 h-4 text-gray-400 mr-3" />
                        <span className="text-gray-900">{petNotes.vetInfo.clinicName}</span>
                      </div>
                    )}
                    {petNotes.vetInfo.vetName && (
                      <div className="flex items-center">
                        <UserIcon className="w-4 h-4 text-gray-400 mr-3" />
                        <span className="text-gray-900">{petNotes.vetInfo.vetName}</span>
                      </div>
                    )}
                    {petNotes.vetInfo.phone && (
                      <div className="flex items-center">
                        <PhoneIcon className="w-4 h-4 text-gray-400 mr-3" />
                        <a 
                          href={`tel:${petNotes.vetInfo.phone}`}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          {petNotes.vetInfo.phone}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Emergency Contact */}
              {petNotes.emergencyContact && petNotes.emergencyContact.name && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contact</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <UserIcon className="w-4 h-4 text-gray-400 mr-3" />
                      <span className="text-gray-900">{petNotes.emergencyContact.name}</span>
                    </div>
                    {petNotes.emergencyContact.phone && (
                      <div className="flex items-center">
                        <PhoneIcon className="w-4 h-4 text-gray-400 mr-3" />
                        <a 
                          href={`tel:${petNotes.emergencyContact.phone}`}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          {petNotes.emergencyContact.phone}
                        </a>
                      </div>
                    )}
                    {petNotes.emergencyContact.relationship && (
                      <div className="text-sm text-gray-600">
                        {petNotes.emergencyContact.relationship}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'vaccinations' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Vaccination Records</h3>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Add Vaccination
              </button>
            </div>
            
            {healthData.vaccinations.length > 0 ? (
              <div className="space-y-4">
                {healthData.vaccinations.map((vaccination, index) => {
                  const status = getVaccinationStatus(vaccination);
                  return (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">{vaccination.name}</h4>
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(status)}`}>
                              {formatStatus(status)}
                            </span>
                          </div>
                          <div className="grid md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Last Given:</span>
                              <p className="text-gray-900">
                                {vaccination.date ? new Date(vaccination.date).toLocaleDateString() : 'Not recorded'}
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-500">Next Due:</span>
                              <p className="text-gray-900">
                                {vaccination.nextDue ? new Date(vaccination.nextDue).toLocaleDateString() : 'Not scheduled'}
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-500">Status:</span>
                              <p className="text-gray-900 capitalize">{vaccination.status}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <CalendarIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2">No Vaccination Records</h4>
                <p className="text-gray-600 mb-4">Start tracking your pet's vaccination history.</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Add First Vaccination
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'health' && (
          <div className="space-y-6">
            {/* Health Analyses */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">AI Health Analyses</h3>
                <Link
                  to="/health/analysis"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                >
                  <CameraIcon className="w-4 h-4 mr-2" />
                  New Analysis
                </Link>
              </div>
              
              {healthData.analyses.length > 0 ? (
                <div className="space-y-4">
                  {healthData.analyses.map((analysis) => (
                    <div key={analysis.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">{analysis.analysisType}</h4>
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(analysis.status)}`}>
                              {formatStatus(analysis.status)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {analysis.timestamp.toLocaleDateString()} • Confidence: {analysis.confidence}%
                          </p>
                          <p className="text-gray-700">{analysis.summary}</p>
                        </div>
                        {analysis.image && (
                          <img 
                            src={analysis.image} 
                            alt="Analysis" 
                            className="w-16 h-16 object-cover rounded-lg ml-4"
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <PhotoIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">No Health Analyses</h4>
                  <p className="text-gray-600 mb-4">Start monitoring your pet's health with AI-powered photo analysis.</p>
                  <Link
                    to="/health/analysis"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
                  >
                    <CameraIcon className="w-4 h-4 mr-2" />
                    First Analysis
                  </Link>
                </div>
              )}
            </div>

            {/* Vet Records */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Veterinary Records</h3>
                <Link
                  to="/health/vet-records"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
                >
                  <DocumentTextIcon className="w-4 h-4 mr-2" />
                  Add Record
                </Link>
              </div>
              
              {healthData.vetRecords.length > 0 ? (
                <div className="space-y-4">
                  {healthData.vetRecords.map((record) => (
                    <div key={record.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-900">{record.visitType}</h4>
                        <span className="text-sm text-gray-600">
                          {new Date(record.visitDate).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {record.clinicName} • {record.veterinarianName}
                      </p>
                      <p className="text-gray-700">{record.diagnosis || record.notes}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <DocumentTextIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">No Veterinary Records</h4>
                  <p className="text-gray-600 mb-4">Keep track of vet visits, treatments, and medical history.</p>
                  <Link
                    to="/health/vet-records"
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors inline-flex items-center"
                  >
                    <DocumentTextIcon className="w-4 h-4 mr-2" />
                    Add First Record
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Documents & Photos</h3>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Upload Document
              </button>
            </div>
            
            <div className="text-center py-8">
              <DocumentTextIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">No Documents</h4>
              <p className="text-gray-600 mb-4">Upload important documents like vaccination certificates, medical reports, and photos.</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Upload First Document
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center mb-4">
              <ExclamationTriangleIcon className="w-6 h-6 text-red-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Delete Pet</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete {pet.name}? This action cannot be undone and will remove all associated health records.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeletePet}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete Pet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PetProfilePage;
