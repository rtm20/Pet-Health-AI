import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-9xl mb-4">🐕</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          Looks like this page got lost! Let's get you back to safety.
        </p>
        <a
          href="/dashboard"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          🏠 Back to Dashboard
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;
