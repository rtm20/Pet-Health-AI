import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12L8 10l2-2 2 2-2 2zm0-7C5.03 5 1 9.03 1 14s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9z" />
                </svg>
              </div>
              <span className="text-xl font-bold">PetHealth AI Monitor</span>
            </div>
            
            <div className="space-x-4">
              <Link
                to="/login"
                className="text-white hover:text-blue-100 transition-colors px-4 py-2"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              AI-Powered Pet Health Monitoring
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Monitor your pet's health with advanced AI photo analysis, track medical records, 
              and get instant insights about potential health conditions.
            </p>
            
            <div className="space-x-4">
              <Link
                to="/register"
                className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors"
              >
                📸 Start Free Analysis
              </Link>
              <Link
                to="/demo"
                className="inline-flex items-center bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-400 transition-colors"
              >
                🎮 View Demo
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Pet Health
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools to keep your furry friends healthy and happy
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors">
              <div className="text-6xl mb-4">📸</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">AI Photo Analysis</h3>
              <p className="text-gray-600">
                Upload photos of your pet and get instant AI-powered health insights 
                and potential condition identification.
              </p>
            </div>

            <div className="text-center p-8 rounded-xl bg-green-50 hover:bg-green-100 transition-colors">
              <div className="text-6xl mb-4">🏥</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Medical Records</h3>
              <p className="text-gray-600">
                Keep all veterinary records, vaccinations, and health history 
                organized in one secure place.
              </p>
            </div>

            <div className="text-center p-8 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Health Insights</h3>
              <p className="text-gray-600">
                Track trends, get personalized recommendations, and receive 
                alerts for preventive care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How PetHealth AI Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple steps to start monitoring your pet's health
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold mb-2">Create Account</h3>
              <p className="text-gray-600">Sign up and add your pet's basic information</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold mb-2">Upload Photos</h3>
              <p className="text-gray-600">Take pictures of any concerning symptoms or areas</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold mb-2">Get AI Analysis</h3>
              <p className="text-gray-600">Receive instant analysis and health insights</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="text-lg font-semibold mb-2">Track & Monitor</h3>
              <p className="text-gray-600">Keep records and monitor health trends over time</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Monitoring Your Pet's Health?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of pet owners who trust PetHealth AI for their furry friends' wellbeing.
          </p>
          
          <div className="space-x-4">
            <Link
              to="/register"
              className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors"
            >
              🚀 Get Started Free
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-400 transition-colors border-2 border-blue-400"
            >
              💬 Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12L8 10l2-2 2 2-2 2zm0-7C5.03 5 1 9.03 1 14s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9z" />
                  </svg>
                </div>
                <span className="text-xl font-bold">PetHealth AI</span>
              </div>
              <p className="text-gray-400">
                AI-powered pet health monitoring for the modern pet parent.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <div className="space-y-2 text-gray-400">
                <a href="/features" className="block hover:text-white">Features</a>
                <a href="/pricing" className="block hover:text-white">Pricing</a>
                <a href="/demo" className="block hover:text-white">Demo</a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <div className="space-y-2 text-gray-400">
                <a href="/help" className="block hover:text-white">Help Center</a>
                <a href="/contact" className="block hover:text-white">Contact Us</a>
                <a href="/emergency" className="block hover:text-white">Emergency Guide</a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <div className="space-y-2 text-gray-400">
                <a href="/about" className="block hover:text-white">About Us</a>
                <a href="/privacy" className="block hover:text-white">Privacy</a>
                <a href="/terms" className="block hover:text-white">Terms</a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} PetHealth AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
