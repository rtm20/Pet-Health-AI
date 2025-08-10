import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePets } from '../../context/PetContext';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { PhotoIcon, CalendarIcon, HeartIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const AddPetPage = () => {
  const navigate = useNavigate();
  const { addPet } = usePets();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
    ageUnit: 'years',
    gender: '',
    weight: '',
    weightUnit: 'kg',
    microchipId: '',
    color: '',
    markings: '',
    medicalHistory: '',
    allergies: '',
    medications: '',
    vetInfo: {
      clinicName: '',
      vetName: '',
      phone: '',
      email: '',
      address: ''
    },
    emergencyContact: {
      name: '',
      phone: '',
      relationship: ''
    },
    vaccinations: [
      { name: 'Rabies', date: '', nextDue: '', status: 'pending' },
      { name: 'DHPP', date: '', nextDue: '', status: 'pending' },
      { name: 'Bordetella', date: '', nextDue: '', status: 'pending' }
    ]
  });

  // Pet breeds by species
  const breedOptions = {
    dog: [
      'Labrador Retriever', 'Golden Retriever', 'German Shepherd', 'Bulldog',
      'Poodle', 'Beagle', 'Rottweiler', 'Yorkshire Terrier', 'Dachshund',
      'Siberian Husky', 'Boxer', 'Border Collie', 'Chihuahua', 'Shih Tzu',
      'Boston Terrier', 'Pomeranian', 'Australian Shepherd', 'Cocker Spaniel',
      'Mixed Breed', 'Other'
    ],
    cat: [
      'Domestic Shorthair', 'Domestic Longhair', 'Persian', 'Maine Coon',
      'Siamese', 'Ragdoll', 'British Shorthair', 'Abyssinian', 'Russian Blue',
      'Scottish Fold', 'Sphynx', 'Bengal', 'Birman', 'Norwegian Forest Cat',
      'Oriental Shorthair', 'Mixed Breed', 'Other'
    ],
    bird: [
      'Cockatiel', 'Budgerigar', 'Canary', 'Lovebird', 'Cockatoo', 'Macaw',
      'African Grey', 'Conure', 'Finch', 'Parakeet', 'Other'
    ],
    rabbit: [
      'Holland Lop', 'Netherland Dwarf', 'Lionhead', 'Mini Rex', 'Flemish Giant',
      'English Angora', 'Dutch', 'Rex', 'Mixed Breed', 'Other'
    ],
    other: ['Mixed', 'Unknown', 'Other']
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleVaccinationChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      vaccinations: prev.vaccinations.map((vac, i) => 
        i === index ? { ...vac, [field]: value } : vac
      )
    }));
  };

  // Photo upload handlers
  const handlePhotoUpload = (files) => {
    const newPhotos = Array.from(files).filter(file => {
      if (file.type.startsWith('image/')) {
        return file.size <= 5 * 1024 * 1024; // 5MB limit
      }
      return false;
    });

    newPhotos.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedPhotos(prev => [...prev, {
          file,
          preview: e.target.result,
          id: Date.now() + Math.random()
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const files = e.dataTransfer.files;
    handlePhotoUpload(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const removePhoto = (photoId) => {
    setSelectedPhotos(prev => prev.filter(photo => photo.id !== photoId));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Pet name is required';
    if (!formData.species) newErrors.species = 'Species is required';
    if (!formData.breed) newErrors.breed = 'Breed is required';
    if (!formData.age) newErrors.age = 'Age is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.weight) newErrors.weight = 'Weight is required';

    if (formData.age && (isNaN(formData.age) || formData.age <= 0)) {
      newErrors.age = 'Please enter a valid age';
    }

    if (formData.weight && (isNaN(formData.weight) || formData.weight <= 0)) {
      newErrors.weight = 'Please enter a valid weight';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const petData = {
        ...formData,
        photos: selectedPhotos.map(photo => photo.preview), // In real app, upload to server
        ownerId: user.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await addPet(petData);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error adding pet:', error);
      setErrors({ submit: 'Failed to add pet. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <HeartIcon className="w-7 h-7 text-blue-600 mr-3" />
            Add New Pet
          </h1>
          <p className="text-gray-600 mt-1">
            Let's get your furry friend set up with comprehensive health monitoring
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Error Message */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
              <ExclamationTriangleIcon className="w-5 h-5 text-red-600 mr-2" />
              <span className="text-red-700">{errors.submit}</span>
            </div>
          )}

          {/* Photo Upload Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <PhotoIcon className="w-5 h-5 mr-2" />
              Pet Photos
            </h3>
            
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive 
                  ? 'border-blue-400 bg-blue-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <PhotoIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">
                Drag and drop photos here, or{' '}
                <label className="text-blue-600 hover:text-blue-700 cursor-pointer underline">
                  browse to upload
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handlePhotoUpload(e.target.files)}
                  />
                </label>
              </p>
              <p className="text-sm text-gray-500">
                Support: JPG, PNG, GIF up to 5MB each
              </p>
            </div>

            {/* Photo Preview Grid */}
            {selectedPhotos.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {selectedPhotos.map((photo) => (
                  <div key={photo.id} className="relative">
                    <img
                      src={photo.preview}
                      alt="Pet preview"
                      className="w-full h-24 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(photo.id)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Basic Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pet Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your pet's name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Species *
                </label>
                <select
                  name="species"
                  value={formData.species}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.species ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select species</option>
                  <option value="dog">Dog</option>
                  <option value="cat">Cat</option>
                  <option value="bird">Bird</option>
                  <option value="rabbit">Rabbit</option>
                  <option value="other">Other</option>
                </select>
                {errors.species && <p className="text-red-500 text-sm mt-1">{errors.species}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Breed *
                </label>
                <select
                  name="breed"
                  value={formData.breed}
                  onChange={handleInputChange}
                  disabled={!formData.species}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.breed ? 'border-red-500' : 'border-gray-300'
                  } ${!formData.species ? 'bg-gray-100' : ''}`}
                >
                  <option value="">Select breed</option>
                  {formData.species && breedOptions[formData.species]?.map(breed => (
                    <option key={breed} value={breed}>{breed}</option>
                  ))}
                </select>
                {errors.breed && <p className="text-red-500 text-sm mt-1">{errors.breed}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender *
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.gender ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="male-neutered">Male (Neutered)</option>
                  <option value="female-spayed">Female (Spayed)</option>
                </select>
                {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age *
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    min="0"
                    step="0.1"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.age ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="0"
                  />
                  {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Unit
                  </label>
                  <select
                    name="ageUnit"
                    value={formData.ageUnit}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="months">Months</option>
                    <option value="years">Years</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Weight *
                  </label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    min="0"
                    step="0.1"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.weight ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="0.0"
                  />
                  {errors.weight && <p className="text-red-500 text-sm mt-1">{errors.weight}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Unit
                  </label>
                  <select
                    name="weightUnit"
                    value={formData.weightUnit}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="kg">Kilograms</option>
                    <option value="lbs">Pounds</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Continue with form sections... */}
          
          {/* Physical Characteristics */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Physical Characteristics</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Color
                </label>
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Brown, Black, White"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Microchip ID
                </label>
                <input
                  type="text"
                  name="microchipId"
                  value={formData.microchipId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="15-digit microchip number"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Distinctive Markings
                </label>
                <textarea
                  name="markings"
                  value={formData.markings}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe any scars, spots, or unique features that help identify your pet"
                />
              </div>
            </div>
          </div>

          {/* Medical Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Medical Information</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Medical History
                </label>
                <textarea
                  name="medicalHistory"
                  value={formData.medicalHistory}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Previous surgeries, injuries, chronic conditions, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Known Allergies
                </label>
                <textarea
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Food allergies, environmental allergies, medication allergies"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Medications
                </label>
                <textarea
                  name="medications"
                  value={formData.medications}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="List current medications, dosages, and frequency"
                />
              </div>
            </div>
          </div>

          {/* Vaccination Records */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <CalendarIcon className="w-5 h-5 mr-2" />
              Vaccination Records
            </h3>
            
            <div className="space-y-4">
              {formData.vaccinations.map((vaccination, index) => (
                <div key={vaccination.name} className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Vaccine
                      </label>
                      <input
                        type="text"
                        value={vaccination.name}
                        readOnly
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-600"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Given
                      </label>
                      <input
                        type="date"
                        value={vaccination.date}
                        onChange={(e) => handleVaccinationChange(index, 'date', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Next Due
                      </label>
                      <input
                        type="date"
                        value={vaccination.nextDue}
                        onChange={(e) => handleVaccinationChange(index, 'nextDue', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <select
                        value={vaccination.status}
                        onChange={(e) => handleVaccinationChange(index, 'status', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="pending">Pending</option>
                        <option value="current">Current</option>
                        <option value="overdue">Overdue</option>
                        <option value="not-applicable">Not Applicable</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Veterinary Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Veterinary Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Clinic Name
                </label>
                <input
                  type="text"
                  name="vetInfo.clinicName"
                  value={formData.vetInfo.clinicName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your vet clinic name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Veterinarian Name
                </label>
                <input
                  type="text"
                  name="vetInfo.vetName"
                  value={formData.vetInfo.vetName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Dr. Smith"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="vetInfo.phone"
                  value={formData.vetInfo.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="vetInfo.email"
                  value={formData.vetInfo.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="clinic@example.com"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Clinic Address
                </label>
                <textarea
                  name="vetInfo.address"
                  value={formData.vetInfo.address}
                  onChange={handleInputChange}
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="123 Main St, City, State, ZIP"
                />
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Emergency Contact</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Name
                </label>
                <input
                  type="text"
                  name="emergencyContact.name"
                  value={formData.emergencyContact.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Emergency contact name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="emergencyContact.phone"
                  value={formData.emergencyContact.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="(555) 987-6543"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Relationship
                </label>
                <select
                  name="emergencyContact.relationship"
                  value={formData.emergencyContact.relationship}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select relationship</option>
                  <option value="family">Family Member</option>
                  <option value="friend">Friend</option>
                  <option value="neighbor">Neighbor</option>
                  <option value="petsitter">Pet Sitter</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="flex-1 sm:flex-none px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 sm:flex-none px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              {loading ? (
                <>
                  <LoadingSpinner />
                  <span className="ml-2">Adding Pet...</span>
                </>
              ) : (
                'Add Pet'
              )}
            </button>
          </div>
          {/* This is getting long, should I continue with the rest of the form sections? */}
        </form>
      </div>
    </div>
  );
};

export default AddPetPage;
