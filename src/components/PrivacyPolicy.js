import React from 'react';
import { Shield, Lock, FileText } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Header */}
      <div className="bg-black text-white py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <div className="flex flex-wrap gap-6 text-sm opacity-90">
            <span className="flex items-center gap-2">
              <FileText size={16} /> Effective Date: 21-01-2026
            </span>
            <span className="flex items-center gap-2">
              <Shield size={16} /> Developer: Bizzap
            </span>
            <span className="flex items-center gap-2">
              <Lock size={16} /> Contact: admin@bizzap.app
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white shadow-lg rounded-2xl p-8 md:p-12 space-y-8">
          
          <section>
            <p className="text-lg leading-relaxed text-gray-700">
              Bizzap is a business networking platform that helps companies connect, share updates, and discover opportunities. This Privacy Policy explains how we collect, use, and protect your information when you use the Bizzap mobile application.
            </p>
            <p className="mt-4 font-medium text-gray-900">
              By installing or using the app, you agree to the terms described below.
            </p>
          </section>

          <div className="h-px bg-gray-200" />

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">1.1 Information You Provide</h3>
              <p className="text-gray-700 mb-3">We collect the information you enter while creating or updating your profile:</p>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 mb-4">
                <li>Full name</li>
                <li>Phone number</li>
                <li>Email address</li>
                <li>Profile photo</li>
                <li>Designation</li>
              </ul>
              <p className="text-gray-700 mb-3">We also collect company information such as:</p>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Company name</li>
                <li>Company address</li>
                <li>GST number or business verification documents</li>
                <li>Company logo</li>
                <li>Factory or infrastructure images</li>
                <li>Certifications or sustainability documents (optional)</li>
              </ul>
              <p className="text-gray-700 mt-3">
                You also provide information when you post updates, add products, create leads, or message other users.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">1.2 Automatically Collected Information</h3>
              <p className="text-gray-700 mb-3">When you use Bizzap, we automatically collect:</p>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Device type and operating system</li>
                <li>IP address</li>
                <li>App version</li>
                <li>Usage activity such as screens viewed, interactions, searches</li>
                <li>Log data and crash reports</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">1.3 Permissions Used</h3>
              <p className="text-gray-700 mb-3">Bizzap may request access to:</p>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Camera (upload photos)</li>
                <li>Photos and media (select images for profile, posts, company details)</li>
                <li>Location ( for leads and requirements)</li>
                <li>Notifications (lead alerts, post, news, messages)</li>
                <li>Phone number (for verification)</li>
              </ul>
              <p className="text-sm text-gray-500 mt-2">You can manage these permissions from your device settings.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-700 mb-3">We use your information to:</p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Create and manage your account</li>
              <li>Verify your business identity</li>
              <li>Help you connect with other businesses</li>
              <li>Show personalized feeds, leads, and recommendations</li>
              <li>Improve app features, stability, and user experience</li>
              <li>Provide customer support</li>
              <li>Detect fraud, spam, and security issues</li>
            </ul>
            <p className="mt-4 font-semibold text-gray-900">We do not sell your personal data.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Share Information</h2>
            <p className="text-gray-700 mb-4">We may share your information only in the following cases:</p>
            
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">3.1 Public or Shared Content</h3>
              <p className="text-gray-700">Your business profile, posts, comments, product listings, and leads may be visible to other users inside Bizzap.</p>
            </div>
            
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">3.2 Service Providers</h3>
              <p className="text-gray-700 mb-2">We may share limited information with trusted partners that help with:</p>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Cloud hosting</li>
                <li>Analytics</li>
                <li>Authentication</li>
                <li>Data storage</li>
                <li>Verification</li>
              </ul>
              <p className="text-sm text-gray-500 mt-2">These providers follow strict confidentiality and security requirements.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">3.3 Legal Requirements</h3>
              <p className="text-gray-700">We may share information if required by law, court order, or government authority.</p>
              <p className="text-gray-700 mt-2">We never share your data for external advertising.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Storage and Security</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Your data is stored on secure servers with encryption and access control</li>
              <li>Only authorized personnel can access sensitive data</li>
              <li>We monitor systems to prevent fraud or abuse</li>
            </ul>
            <p className="text-sm text-gray-500 mt-2">Although we try to protect your data, no system is completely secure.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Your Rights</h2>
            <p className="text-gray-700 mb-3">You may request at any time to:</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Access your personal information</li>
              <li>Update or correct details</li>
              <li>Delete your account</li>
              <li>Withdraw optional permissions</li>
              <li>Ask for clarification on how your data is used</li>
            </ul>
            <p className="text-gray-700 mt-4">Contact us at <a href="mailto:admin@bizzap.app" className="text-blue-600 hover:underline">admin@bizzap.app</a> to make a request.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Retention</h2>
            <p className="text-gray-700">We keep your data as long as your account is active.</p>
            <p className="text-gray-700 mt-2">When you delete your account, your information is removed within a reasonable time except where legally required.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Children’s Privacy</h2>
            <p className="text-gray-700">Bizzap is built for business users only.</p>
            <p className="text-gray-700 mt-2">We do not allow individuals under 18 years to create an account.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Links to Other Sites</h2>
            <p className="text-gray-700">Bizzap may contain links to external websites.</p>
            <p className="text-gray-700 mt-2">We are not responsible for their content or privacy practices.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to This Policy</h2>
            <p className="text-gray-700">We may update this Privacy Policy from time to time.</p>
            <p className="text-gray-700 mt-2">We will upload the latest version inside the app and on our website.</p>
          </section>

          <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Us</h2>
            <p className="text-gray-700 mb-2">For any questions or concerns:</p>
            <div className="space-y-1">
              <p className="text-gray-800"><strong>Email:</strong> admin@bizzap.app</p>
              <p className="text-gray-800"><strong>Company:</strong> Bizzap</p>
              <p className="text-gray-800"><strong>Location:</strong> Tiruppur, India</p>
            </div>
          </div>

        </div>
        
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>© 2026 Bizzap. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;