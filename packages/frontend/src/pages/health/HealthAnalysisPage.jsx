import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePets } from '../../context/PetContext';
import { useHealth } from '../../context/HealthContext';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { 
  PhotoIcon, 
  CameraIcon, 
  ExclamationTriangleIcon,
  CheckCircleIcon,
  InformationCircleIcon,
  EyeIcon,
  HeartIcon,
  SparklesIcon,
  ClockIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

const HealthAnalysisPage = () => {
  const navigate = useNavigate();
  const { selectedPet, pets } = usePets();
  const { analyzePhoto } = useHealth();
  
  const [selectedImage, setSelectedImage] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [analysisType, setAnalysisType] = useState('general');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [analysisHistory, setAnalysisHistory] = useState([]);

  // Analysis types with specific focus areas
  const analysisTypes = {
    general: {
      name: 'General Health',
      description: 'Overall health assessment',
      icon: '🔍',
      color: 'blue'
    },
    skin: {
      name: 'Skin & Coat',
      description: 'Skin conditions, parasites, coat quality',
      icon: '🧴',
      color: 'green'
    },
    eyes: {
      name: 'Eye Health',
      description: 'Eye clarity, discharge, inflammation',
      icon: '👁️',
      color: 'purple'
    },
    ears: {
      name: 'Ear Health',
      description: 'Ear infections, wax buildup, inflammation',
      icon: '👂',
      color: 'orange'
    },
    mouth: {
      name: 'Oral Health',
      description: 'Teeth, gums, oral hygiene',
      icon: '🦷',
      color: 'red'
    }
  };

  // Handle file upload
  const handleFileUpload = (files) => {
    const file = files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      alert('Image size should be less than 10MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage({
        file,
        preview: e.target.result,
        name: file.name,
        size: file.size
      });
      setAnalysisResult(null);
    };
    reader.readAsDataURL(file);
  };

  // Drag and drop handlers
  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const files = e.dataTransfer.files;
    handleFileUpload(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  // Simulate AI analysis with realistic processing time and results
  const performAnalysis = async () => {
    if (!selectedImage || !selectedPet) return;

    setAnalyzing(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Generate realistic analysis results
      const mockResults = generateMockAnalysis(analysisType);
      
      const analysisData = {
        id: Date.now(),
        petId: selectedPet.id,
        petName: selectedPet.name,
        image: selectedImage.preview,
        analysisType,
        timestamp: new Date(),
        results: mockResults,
        confidence: mockResults.confidence,
        status: mockResults.status
      };

      setAnalysisResult(analysisData);
      setAnalysisHistory(prev => [analysisData, ...prev.slice(0, 4)]); // Keep last 5

      // In real app, save to backend
      // await analyzePhoto(selectedPet.id, selectedImage.file, analysisType);

    } catch (error) {
      console.error('Analysis failed:', error);
      alert('Analysis failed. Please try again.');
    } finally {
      setAnalyzing(false);
    }
  };

  // Generate mock analysis results based on type
  const generateMockAnalysis = (type) => {
    const conditions = {
      general: [
        { name: 'Overall Health', status: 'healthy', confidence: 0.92 },
        { name: 'Body Condition', status: 'good', confidence: 0.88 },
        { name: 'Activity Level', status: 'normal', confidence: 0.85 }
      ],
      skin: [
        { name: 'Coat Quality', status: 'healthy', confidence: 0.94 },
        { name: 'Skin Irritation', status: 'none_detected', confidence: 0.89 },
        { name: 'Parasite Signs', status: 'none_detected', confidence: 0.91 }
      ],
      eyes: [
        { name: 'Eye Clarity', status: 'clear', confidence: 0.96 },
        { name: 'Discharge', status: 'normal', confidence: 0.87 },
        { name: 'Inflammation', status: 'none_detected', confidence: 0.93 }
      ],
      ears: [
        { name: 'Ear Cleanliness', status: 'good', confidence: 0.88 },
        { name: 'Infection Signs', status: 'none_detected', confidence: 0.92 },
        { name: 'Wax Buildup', status: 'minimal', confidence: 0.85 }
      ],
      mouth: [
        { name: 'Teeth Condition', status: 'good', confidence: 0.87 },
        { name: 'Gum Health', status: 'healthy', confidence: 0.90 },
        { name: 'Tartar Buildup', status: 'mild', confidence: 0.84 }
      ]
    };

    const results = conditions[type] || conditions.general;
    const overallConfidence = results.reduce((sum, r) => sum + r.confidence, 0) / results.length;
    const hasIssues = results.some(r => ['mild', 'moderate', 'concerning'].includes(r.status));

    return {
      confidence: Math.round(overallConfidence * 100),
      status: hasIssues ? 'attention_needed' : 'healthy',
      conditions: results,
      recommendations: generateRecommendations(type, hasIssues),
      veterinarianAdvice: hasIssues ? 'Consider consulting with your veterinarian for professional evaluation.' : 'Continue regular monitoring and preventive care.',
      followUpDate: hasIssues ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) : null // 1 week if issues
    };
  };

  const generateRecommendations = (type, hasIssues) => {
    const recommendations = {
      general: [
        'Continue regular exercise and balanced diet',
        'Monitor for any behavioral changes',
        'Schedule routine vet checkup within 6 months'
      ],
      skin: [
        'Regular grooming helps maintain healthy coat',
        'Check for fleas and ticks regularly',
        'Use pet-safe shampoos only'
      ],
      eyes: [
        'Keep eye area clean and dry',
        'Watch for any discharge changes',
        'Protect from irritants and wind'
      ],
      ears: [
        'Clean ears gently with vet-approved solution',
        'Keep ears dry after baths',
        'Check for unusual odors or discharge'
      ],
      mouth: [
        'Brush teeth regularly with pet toothpaste',
        'Provide dental chews and toys',
        'Schedule professional dental cleaning'
      ]
    };

    return recommendations[type] || recommendations.general;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy':
      case 'good':
      case 'clear':
      case 'normal':
      case 'none_detected':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'mild':
      case 'minimal':
      case 'attention_needed':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'moderate':
      case 'concerning':
        return 'text-orange-700 bg-orange-50 border-orange-200';
      case 'severe':
      case 'urgent':
        return 'text-red-700 bg-red-50 border-red-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const formatStatus = (status) => {
    return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  if (!selectedPet && pets.length > 0) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center">
        <div className="text-6xl mb-6">🐕</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          No Pet Selected
        </h2>
        <p className="text-gray-600 mb-8">
          Please select a pet from the sidebar to start health analysis.
        </p>
      </div>
    );
  }

  if (pets.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center">
        <div className="text-6xl mb-6">🐾</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          No Pets Added Yet
        </h2>
        <p className="text-gray-600 mb-8">
          Add your first pet to start using AI health analysis.
        </p>
        <button
          onClick={() => navigate('/pets/add')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Your First Pet
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Analysis Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center mb-2">
              <SparklesIcon className="w-7 h-7 text-blue-600 mr-3" />
              AI Health Analysis
            </h1>
            <p className="text-gray-600">
              Upload a photo of {selectedPet.name} for AI-powered health assessment
            </p>
          </div>

          {/* Analysis Type Selection */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Select Analysis Type
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Object.entries(analysisTypes).map(([key, type]) => (
                <button
                  key={key}
                  onClick={() => setAnalysisType(key)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    analysisType === key
                      ? `border-${type.color}-500 bg-${type.color}-50`
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-2">{type.icon}</div>
                  <div className="font-semibold text-gray-900 text-sm">{type.name}</div>
                  <div className="text-xs text-gray-600">{type.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Photo Upload Area */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <PhotoIcon className="w-5 h-5 mr-2" />
              Upload Photo
            </h3>
            
            {!selectedImage ? (
              <div
                className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors cursor-pointer ${
                  dragActive 
                    ? 'border-blue-400 bg-blue-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => document.getElementById('photo-upload').click()}
              >
                <PhotoIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Drop your photo here
                </h4>
                <p className="text-gray-600 mb-4">
                  or click to browse your files
                </p>
                <p className="text-sm text-gray-500">
                  Supports: JPG, PNG, GIF up to 10MB
                </p>
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e.target.files)}
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <img
                    src={selectedImage.preview}
                    alt="Selected for analysis"
                    className="w-full max-h-96 object-contain rounded-lg border border-gray-200"
                  />
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    ×
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <p>{selectedImage.name}</p>
                    <p>{(selectedImage.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  
                  <button
                    onClick={performAnalysis}
                    disabled={analyzing}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                  >
                    {analyzing ? (
                      <>
                        <LoadingSpinner />
                        <span className="ml-2">Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <SparklesIcon className="w-5 h-5 mr-2" />
                        Start Analysis
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Analysis Results */}
          {analysisResult && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <DocumentTextIcon className="w-5 h-5 mr-2" />
                Analysis Results
              </h3>

              {/* Overall Status */}
              <div className={`p-4 rounded-lg border mb-6 ${getStatusColor(analysisResult.status)}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {analysisResult.status === 'healthy' ? (
                      <CheckCircleIcon className="w-6 h-6 mr-2" />
                    ) : (
                      <ExclamationTriangleIcon className="w-6 h-6 mr-2" />
                    )}
                    <div>
                      <div className="font-semibold">
                        {formatStatus(analysisResult.status)}
                      </div>
                      <div className="text-sm opacity-75">
                        Confidence: {analysisResult.confidence}%
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm opacity-75">Analysis Type</div>
                    <div className="font-semibold">
                      {analysisTypes[analysisResult.analysisType].name}
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Results */}
              <div className="space-y-4 mb-6">
                <h4 className="font-semibold text-gray-900">Detailed Assessment</h4>
                {analysisResult.results.conditions.map((condition, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">{condition.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(condition.status)}`}>
                        {formatStatus(condition.status)}
                      </span>
                      <span className="text-sm text-gray-600">
                        {Math.round(condition.confidence * 100)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recommendations */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Recommendations</h4>
                <ul className="space-y-2">
                  {analysisResult.results.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{rec}</span>
                    </li>
                  ))}
                </ul>

                {analysisResult.results.veterinarianAdvice && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                    <div className="flex items-start">
                      <InformationCircleIcon className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-blue-900 mb-1">
                          Veterinary Advice
                        </div>
                        <div className="text-blue-800">
                          {analysisResult.results.veterinarianAdvice}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {analysisResult.results.followUpDate && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <ClockIcon className="w-5 h-5 text-yellow-600 mr-2" />
                      <div>
                        <div className="font-semibold text-yellow-900">
                          Follow-up Recommended
                        </div>
                        <div className="text-yellow-800">
                          {analysisResult.results.followUpDate.toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Current Pet Info */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Current Pet
            </h3>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden bg-gray-200">
                {selectedPet.photo ? (
                  <img 
                    src={selectedPet.photo} 
                    alt={selectedPet.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl">
                    🐕
                  </div>
                )}
              </div>
              <div className="font-semibold text-gray-900">{selectedPet.name}</div>
              <div className="text-sm text-gray-600">
                {selectedPet.breed} • {selectedPet.age} years
              </div>
            </div>
          </div>

          {/* Analysis History */}
          {analysisHistory.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Recent Analyses
              </h3>
              <div className="space-y-3">
                {analysisHistory.map((analysis) => (
                  <div key={analysis.id} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">
                        {analysisTypes[analysis.analysisType].name}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(analysis.status)}`}>
                        {formatStatus(analysis.status)}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600">
                      {analysis.timestamp.toLocaleDateString()} • {analysis.confidence}% confidence
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tips */}
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6 border border-green-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              📸 Photo Tips
            </h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Use good lighting</li>
              <li>• Keep your pet still</li>
              <li>• Focus on the area of concern</li>
              <li>• Take multiple angles if needed</li>
              <li>• Avoid blurry images</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthAnalysisPage;
