import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPage = () => {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600">Last updated: December 2024</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              Pet Health Monitor ("we," "our," or "us") is committed to protecting your privacy and the privacy 
              of your beloved pets. This Privacy Policy explains how we collect, use, disclose, and safeguard 
              your information when you use our AI-powered pet health monitoring service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Personal Information</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Name and contact information (email, phone number)</li>
                  <li>Account credentials (username, encrypted password)</li>
                  <li>Profile information and preferences</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Pet Information</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Pet profiles (name, breed, age, medical history)</li>
                  <li>Photos and images uploaded for AI analysis</li>
                  <li>Health records and veterinary information</li>
                  <li>Vaccination records and medical appointments</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Technical Information</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Device information and IP address</li>
                  <li>Browser type and version</li>
                  <li>Usage data and analytics</li>
                  <li>Cookies and tracking technologies</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">We use the collected information to:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Provide AI-powered health analysis for your pets</li>
              <li>Store and organize medical records securely</li>
              <li>Send health insights and recommendations</li>
              <li>Improve our AI algorithms and service quality</li>
              <li>Communicate important updates and notifications</li>
              <li>Provide customer support and technical assistance</li>
              <li>Comply with legal obligations and prevent fraud</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <p className="text-green-800 font-medium mb-2">🔒 Your Data is Protected</p>
              <p className="text-gray-700">
                We implement industry-standard security measures to protect your information.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="text-blue-600 mt-1">🔐</div>
                <div>
                  <h4 className="font-medium text-gray-900">Encryption</h4>
                  <p className="text-gray-700 text-sm">All data is encrypted in transit and at rest using AES-256 encryption</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-blue-600 mt-1">🏥</div>
                <div>
                  <h4 className="font-medium text-gray-900">HIPAA Compliance</h4>
                  <p className="text-gray-700 text-sm">We follow HIPAA-level security standards for health data protection</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-blue-600 mt-1">🛡️</div>
                <div>
                  <h4 className="font-medium text-gray-900">Access Controls</h4>
                  <p className="text-gray-700 text-sm">Strict access controls and regular security audits</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Information Sharing</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We do NOT sell your personal information. We may share information only in these limited circumstances:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><strong>With your consent:</strong> When you explicitly authorize sharing</li>
              <li><strong>Service providers:</strong> Trusted third parties who help operate our service</li>
              <li><strong>Veterinarians:</strong> When you choose to share records with your vet</li>
              <li><strong>Legal requirements:</strong> When required by law or to protect safety</li>
              <li><strong>Anonymized data:</strong> Aggregated, non-identifiable data for research</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Your Rights and Choices</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Access & Control</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• View all your data</li>
                  <li>• Download your information</li>
                  <li>• Update your profile</li>
                  <li>• Delete your account</li>
                </ul>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-medium text-purple-900 mb-2">Communication</h4>
                <ul className="text-sm text-purple-800 space-y-1">
                  <li>• Opt out of marketing emails</li>
                  <li>• Control notification settings</li>
                  <li>• Choose data sharing preferences</li>
                  <li>• Request data corrections</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Cookies and Tracking</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use cookies and similar technologies to enhance your experience:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Cookie Type</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Purpose</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-2 text-sm text-gray-700">Essential</td>
                    <td className="px-4 py-2 text-sm text-gray-700">Login and security</td>
                    <td className="px-4 py-2 text-sm text-gray-700">Session</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm text-gray-700">Analytics</td>
                    <td className="px-4 py-2 text-sm text-gray-700">Improve service</td>
                    <td className="px-4 py-2 text-sm text-gray-700">2 years</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm text-gray-700">Preferences</td>
                    <td className="px-4 py-2 text-sm text-gray-700">Remember settings</td>
                    <td className="px-4 py-2 text-sm text-gray-700">1 year</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Data Retention</h2>
            <p className="text-gray-700 leading-relaxed">
              We retain your information for as long as necessary to provide our services and comply with legal 
              obligations. You can request deletion of your account and data at any time. Some information may 
              be retained in anonymized form for research and service improvement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              Our service is not intended for children under 13. We do not knowingly collect personal information 
              from children under 13. If you believe we have collected such information, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-800">
                <strong>Privacy Officer:</strong> privacy@pethealthmonitor.com<br />
                <strong>Address:</strong> 123 Pet Care Lane, Animal City, AC 12345<br />
                <strong>Phone:</strong> (555) 123-PETS<br />
                <strong>Response Time:</strong> We respond to privacy inquiries within 48 hours
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
            to="/terms" 
            className="btn-secondary"
          >
            View Terms & Conditions
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
