import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Brand and Version */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12L8 10l2-2 2 2-2 2zm0-7C5.03 5 1 9.03 1 14s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-600">
                PetHealth AI v1.0.0
              </span>
            </div>
            
            <div className="hidden md:block h-4 border-l border-gray-300"></div>
            
            <p className="text-sm text-gray-500">
              AI-powered pet health monitoring solution
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center space-x-6">
            <a 
              href="/privacy" 
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Privacy Policy
            </a>
            <a 
              href="/terms" 
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Terms of Service
            </a>
            <a 
              href="/support" 
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Support
            </a>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">Status:</span>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-green-600 font-medium">All Systems Operational</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-center text-xs text-gray-400">
            © {new Date().getFullYear()} PetHealth AI. All rights reserved. 
            Built with ❤️ for pet lovers everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
