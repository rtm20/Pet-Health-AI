import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DemoPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [analyzing, setAnalyzing] = useState(false);

  const demoSteps = [
    {
      title: "Upload Pet Photo",
      description: "Take or upload a photo of your pet",
      image: "📸",
      content: "Our AI can analyze various pet conditions from photos including skin conditions, eye problems, and general health indicators."
    },
    {
      title: "AI Analysis",
      description: "Advanced AI processes the image",
      image: "🤖",
      content: "Our machine learning model analyzes thousands of data points in seconds to identify potential health concerns."
    },
    {
      title: "Health Insights",
      description: "Get detailed health recommendations",
      image: "📊",
      content: "Receive comprehensive analysis with confidence scores, recommended actions, and when to consult a veterinarian."
    }
  ];

  const handleAnalyzeDemo = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setCurrentStep(3);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12L8 10l2-2 2 2-2 2zm0-7C5.03 5 1 9.03 1 14s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">PetHealth AI</span>
            </Link>
            
            <div className="space-x-4">
              <Link to="/login" className="text-gray-600 hover:text-gray-900 transition-colors">
                Sign In
              </Link>
              <Link to="/register" className="btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎮 Interactive Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience how our AI-powered pet health analysis works in real-time
          </p>
        </div>

        {/* Demo Steps */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {demoSteps.map((step, index) => (
            <div 
              key={index}
              className={`card text-center transition-all duration-300 ${
                currentStep === index + 1 ? 'ring-2 ring-blue-500 shadow-xl scale-105' : ''
              }`}
            >
              <div className="card-body">
                <div className="text-6xl mb-4">{step.image}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 mb-4">{step.description}</p>
                <p className="text-sm text-gray-500">{step.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Demo Area */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
            <h2 className="text-2xl font-bold mb-2">Live Demo Experience</h2>
            <p className="text-blue-100">Try our AI analysis with a sample pet photo</p>
          </div>

          <div className="p-8">
            {currentStep === 1 && (
              <div className="text-center">
                <div className="mb-8">
                  <div className="inline-block p-8 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
                    <div className="text-6xl mb-4">🐕</div>
                    <p className="text-gray-600 mb-4">Sample Golden Retriever</p>
                    <p className="text-sm text-gray-500">This is a demo photo for testing purposes</p>
                  </div>
                </div>
                <button 
                  onClick={() => setCurrentStep(2)}
                  className="btn-primary text-lg px-8 py-3"
                >
                  🔍 Analyze This Photo
                </button>
              </div>
            )}

            {currentStep === 2 && (
              <div className="text-center">
                <div className="mb-8">
                  <div className="inline-block p-8 bg-blue-50 rounded-xl">
                    {!analyzing ? (
                      <div>
                        <div className="text-6xl mb-4">🤖</div>
                        <p className="text-blue-700 font-medium mb-4">Ready to analyze</p>
                        <button 
                          onClick={handleAnalyzeDemo}
                          className="btn-primary"
                        >
                          Start AI Analysis
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div className="loading-spinner mx-auto mb-4"></div>
                        <p className="text-blue-700 font-medium">Analyzing pet health...</p>
                        <div className="mt-4 space-y-2">
                          <div className="text-sm text-gray-600">✓ Processing image quality</div>
                          <div className="text-sm text-gray-600">✓ Detecting pet features</div>
                          <div className="text-sm text-gray-600">✓ Analyzing health indicators</div>
                          <div className="text-sm text-gray-600">⏳ Generating insights...</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Analysis Results</h3>
                    <div className="space-y-4">
                      <div className="alert-success">
                        <div className="flex items-center">
                          <span className="text-green-600 mr-2">✅</span>
                          <span><strong>Overall Health:</strong> Good condition detected</span>
                        </div>
                      </div>
                      
                      <div className="alert-info">
                        <div className="flex items-center">
                          <span className="text-blue-600 mr-2">ℹ️</span>
                          <span><strong>Coat Health:</strong> Healthy, well-maintained fur</span>
                        </div>
                      </div>
                      
                      <div className="alert-warning">
                        <div className="flex items-center">
                          <span className="text-yellow-600 mr-2">⚠️</span>
                          <span><strong>Eyes:</strong> Minor discharge detected - monitor closely</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Recommendations</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-blue-900">Immediate Actions</h4>
                        <p className="text-sm text-blue-700">Clean eye area gently with damp cloth</p>
                      </div>
                      
                      <div className="p-3 bg-green-50 rounded-lg">
                        <h4 className="font-medium text-green-900">Preventive Care</h4>
                        <p className="text-sm text-green-700">Continue regular grooming routine</p>
                      </div>
                      
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <h4 className="font-medium text-purple-900">Veterinary Consultation</h4>
                        <p className="text-sm text-purple-700">Schedule check-up if discharge persists &gt; 3 days</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <button 
                    onClick={() => setCurrentStep(1)}
                    className="btn-secondary mr-4"
                  >
                    🔄 Try Again
                  </button>
                  <Link to="/register" className="btn-primary">
                    🚀 Start Using PetHealth AI
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Key Features */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast Analysis</h3>
            <p className="text-gray-600">Get results in under 30 seconds</p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">High Accuracy</h3>
            <p className="text-gray-600">95%+ accuracy rate validated by veterinarians</p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure & Private</h3>
            <p className="text-gray-600">Your pet's data is encrypted and protected</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Monitor Your Pet's Health?</h2>
          <p className="text-xl text-blue-100 mb-6">
            Join thousands of pet owners who trust PetHealth AI
          </p>
          <div className="space-x-4">
            <Link to="/register" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Get Started Free
            </Link>
            <Link to="/" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoPage;
