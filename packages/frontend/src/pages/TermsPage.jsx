import React from 'react';
import { Link } from 'react-router-dom';

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms and Conditions</h1>
          <p className="text-lg text-gray-600">Last updated: December 2024</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing and using Pet Health Monitor ("the Service"), you accept and agree to be bound by 
              the terms and provision of this agreement. If you do not agree to abide by the above, please 
              do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Service Description</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Pet Health Monitor is an AI-powered platform that provides:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>AI photo analysis for potential pet health condition identification</li>
              <li>Medical record storage and management</li>
              <li>Health tracking and insights</li>
              <li>Veterinary appointment scheduling</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Medical Disclaimer</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800 font-medium mb-2">⚠️ Important Medical Disclaimer</p>
              <p className="text-gray-700 leading-relaxed">
                The AI analysis and health insights provided by this service are for informational purposes only 
                and should NOT be considered as professional veterinary advice, diagnosis, or treatment. Always 
                consult with a qualified veterinarian for any health concerns about your pet.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. User Responsibilities</h2>
            <p className="text-gray-700 leading-relaxed mb-4">You agree to:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Provide accurate and complete information</li>
              <li>Keep your account credentials secure</li>
              <li>Use the service in compliance with applicable laws</li>
              <li>Not share false or misleading information</li>
              <li>Respect other users' privacy and rights</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Protection</h2>
            <p className="text-gray-700 leading-relaxed">
              We take your privacy seriously. Your pet's health data and photos are encrypted and stored securely. 
              We will never sell your personal information to third parties. For detailed information about how 
              we collect, use, and protect your data, please review our{' '}
              <Link to="/privacy" className="text-blue-600 hover:text-blue-800 underline">Privacy Policy</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. AI Technology Limitations</h2>
            <p className="text-gray-700 leading-relaxed">
              Our AI technology is continuously improving but has limitations. Results may vary and should always 
              be verified by professional veterinary examination. We do not guarantee the accuracy of AI analysis 
              and are not liable for any consequences of relying solely on our AI recommendations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Service Availability</h2>
            <p className="text-gray-700 leading-relaxed">
              We strive to maintain high service availability but cannot guarantee uninterrupted access. 
              We reserve the right to modify, suspend, or discontinue any part of the service with or without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              Pet Health Monitor shall not be liable for any indirect, incidental, special, consequential, or 
              punitive damages arising from your use of the service, including but not limited to loss of profits, 
              data, or other intangibles.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify these terms at any time. Users will be notified of significant 
              changes via email or through the service. Continued use after changes constitutes acceptance 
              of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about these Terms and Conditions, please contact us at:
            </p>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-800">
                <strong>Email:</strong> legal@pethealthmonitor.com<br />
                <strong>Address:</strong> 123 Pet Care Lane, Animal City, AC 12345<br />
                <strong>Phone:</strong> (555) 123-PETS
              </p>
            </div>
          </section>
        </div>

        {/* Footer Actions */}
        <div className="text-center mt-12 space-x-4">
          <Link 
            to="/register" 
            className="btn-primary"
          >
            Accept and Register
          </Link>
          <Link 
            to="/privacy" 
            className="btn-secondary"
          >
            View Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
