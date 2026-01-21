import React from 'react';
import { Mail, Phone, MapPin, Clock, HelpCircle, MessageCircle, AlertCircle, FileText } from 'lucide-react';

const Support = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Header */}
      <div className="bg-blue-900 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">How can we help you?</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Our team is here to support your business growth. Reach out to us for any assistance, feedback, or inquiries.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-10 mb-16">
        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {/* Email Card */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center hover:-translate-y-1 transition duration-300">
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
              <Mail size={28} />
            </div>
            <h3 className="text-xl font-bold mb-2">Email Us</h3>
            <p className="text-gray-600 mb-6 flex-grow">
              For general inquiries, account support, and partnership opportunities.
            </p>
            <a 
              href="mailto:admin@bizzap.app" 
              className="text-blue-600 font-semibold hover:text-blue-800 transition"
            >
              admin@bizzap.app
            </a>
            <a 
              href="mailto:support@bizzap.app" 
              className="text-blue-600 font-semibold hover:text-blue-800 transition mt-1"
            >
              support@bizzap.app
            </a>
          </div>

          {/* Phone Card */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center hover:-translate-y-1 transition duration-300">
            <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
              <Phone size={28} />
            </div>
            <h3 className="text-xl font-bold mb-2">Call Us</h3>
            <p className="text-gray-600 mb-6 flex-grow">
              Speak directly with our support team during business hours (Mon-Sat).
            </p>
            <a 
              href="tel:+919003388830" 
              className="text-green-600 font-semibold hover:text-green-800 transition text-lg"
            >
              +91 90033 88830
            </a>
            <p className="text-sm text-gray-400 mt-2">10:00 AM - 6:00 PM IST</p>
          </div>

          {/* WhatsApp Card */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center hover:-translate-y-1 transition duration-300">
            <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
              <MessageCircle size={28} />
            </div>
            <h3 className="text-xl font-bold mb-2">WhatsApp Chat</h3>
            <p className="text-gray-600 mb-6 flex-grow">
              Get quick answers and updates by joining our WhatsApp community or chatting with us.
            </p>
            <button 
              onClick={() => window.open('https://chat.whatsapp.com/F5j2hxwXxpDE1BeMLKG8lZ?mode=ems_wa_t', '_blank')}
              className="bg-green-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-600 transition"
            >
              Chat on WhatsApp
            </button>
          </div>
        </div>

        {/* General Instructions & Info */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Instructions */}
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <HelpCircle className="text-blue-600" />
              General Instructions
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">1</div>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Login Issues</h4>
                  <p className="text-gray-600 mt-1">
                    Ensure you are using the correct country code (+91 for India) and that your mobile network is active to receive the OTP. If issues persist, wait 10 minutes and try again.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">2</div>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Verification Badge</h4>
                  <p className="text-gray-600 mt-1">
                    To get the "Verified Business" badge, upload your GST certificate or business registration document in the profile settings. Verification usually takes 24-48 hours.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">3</div>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Account Deletion</h4>
                  <p className="text-gray-600 mt-1">
                    You can request account deletion directly within the app under Settings &gt; Privacy. Alternatively, email us with the subject "Delete Account" from your registered email.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Office Info & Policy Links */}
          <div className="bg-gray-100 p-8 rounded-2xl">
            <h3 className="text-xl font-bold mb-6">Office Location</h3>
            <div className="flex items-start gap-4 mb-8">
              <MapPin className="text-gray-500 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900">Bizzap Headquarters</p>
                <p className="text-gray-600">Tiruppur, Tamil Nadu</p>
                <p className="text-gray-600">India</p>
              </div>
            </div>

            <div className="h-px bg-gray-300 my-6"></div>

            <h3 className="text-xl font-bold mb-4">Response Time</h3>
            <div className="flex items-center gap-3 text-gray-700 mb-2">
              <Clock size={20} className="text-blue-600" />
              <span>Standard Support: <strong>24 - 48 Hours</strong></span>
            </div>
            <div className="flex items-center gap-3 text-gray-700 mb-8">
              <AlertCircle size={20} className="text-yellow-600" />
              <span>Urgent Issues: <strong>Call Support</strong></span>
            </div>

            <div className="h-px bg-gray-300 my-6"></div>

            <div className="flex flex-col gap-3">
              <a href="/policies" className="flex items-center gap-2 text-blue-600 hover:underline font-medium">
                <FileText size={18} />
                View Privacy Policy
              </a>
              <a href="/" className="flex items-center gap-2 text-blue-600 hover:underline font-medium">
                <AlertCircle size={18} />
                Terms of Service
              </a>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-16 text-center border-t border-gray-200 pt-8">
          <p className="text-gray-500">
            For fastest resolution, please include your <strong>registered phone number</strong> in all email correspondence.
          </p>
          <p className="text-sm text-gray-400 mt-4">© 2026 Bizzap. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Support;