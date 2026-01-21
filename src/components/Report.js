import React from 'react';
import { AlertTriangle, Mail, Shield, CheckCircle, FileText, Camera, User } from 'lucide-react';

const Report = () => {
  const handleEmailClick = () => {
    const subject = encodeURIComponent("Report Issue: [Insert Lead/User Name]");
    const body = encodeURIComponent(
`Please provide the following details to help us investigate:

1. Issue Type: (e.g., Fraud, Harassment, Fake Lead)
2. Lead/User Name: 
3. Date of Incident: 
4. Description of Issue: 

[Please attach any screenshots or proof here]
`);
    window.location.href = `mailto:support@bizzap.app?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Header */}
      <div className="bg-red-900 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center p-3 bg-red-800 rounded-full mb-6">
            <AlertTriangle size={32} className="text-red-200" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Report an Issue</h1>
          <p className="text-xl text-red-100 max-w-2xl mx-auto">
            Help us maintain a safe community. If you encounter suspicious activity, harassment, or fake leads, please report it immediately.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-10 mb-16">
        
        {/* Main Action Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8 md:p-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Submit an Official Report</h2>
            <p className="text-gray-600 mb-8 max-w-lg mx-auto">
              All reports are sent directly to our Trust & Safety team via email. We investigate every report and take strict action against policy violations.
            </p>

            <button 
              onClick={handleEmailClick}
              className="group bg-red-600 text-white text-lg font-semibold py-4 px-8 rounded-full shadow-lg hover:bg-red-700 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 mx-auto"
            >
              <Mail className="w-6 h-6" />
              Report via Email
            </button>
            <p className="text-sm text-gray-400 mt-4">Opens your default email client</p>
          </div>

          {/* Guidelines Section */}
          <div className="bg-gray-50 p-8 md:p-12 border-t border-gray-100">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Shield className="text-red-600" size={24} />
              What to include in your report
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4 p-4 bg-white rounded-xl border border-gray-100">
                <div className="bg-red-50 p-2 rounded-lg h-fit">
                  <User className="text-red-600" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">User Details</h4>
                  <p className="text-sm text-gray-500">The name or profile link of the person/business you are reporting.</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 bg-white rounded-xl border border-gray-100">
                <div className="bg-blue-50 p-2 rounded-lg h-fit">
                  <FileText className="text-blue-600" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Description</h4>
                  <p className="text-sm text-gray-500">A clear explanation of what happened and when.</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 bg-white rounded-xl border border-gray-100">
                <div className="bg-green-50 p-2 rounded-lg h-fit">
                  <Camera className="text-green-600" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Evidence</h4>
                  <p className="text-sm text-gray-500">Screenshots of chats, leads, or payment proof if applicable.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ / Policy Reminder */}
        <div className="mt-12">
          <h3 className="text-xl font-bold mb-6 text-center">Our Commitment</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="text-gray-600" />
              </div>
              <h4 className="font-bold mb-2">Confidentiality</h4>
              <p className="text-sm text-gray-600">Your identity is kept anonymous. We never share reporter details with the accused party.</p>
            </div>
            <div className="text-center p-6">
              <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="text-gray-600" />
              </div>
              <h4 className="font-bold mb-2">Review Process</h4>
              <p className="text-sm text-gray-600">Our team reviews reports within 24 hours and takes appropriate action.</p>
            </div>
            <div className="text-center p-6">
              <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="text-gray-600" />
              </div>
              <h4 className="font-bold mb-2">Zero Tolerance</h4>
              <p className="text-sm text-gray-600">We immediately ban accounts found engaging in fraud, hate speech, or illegal activities.</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200 text-gray-500 text-sm">
          <p>For urgent legal matters, please contact <a href="mailto:admin@bizzap.app" className="text-blue-600 hover:underline">admin@bizzap.app</a> directly.</p>
          <p className="mt-4">© 2026 Bizzap. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Report;