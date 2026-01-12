import React, { useState } from 'react';
import { Send, CheckCircle, Users, Target, TrendingUp, Award, Linkedin, Instagram, Facebook, MessageCircle, ArrowRight, Phone, Twitter } from 'lucide-react';
import PublicLeadView from './components/PublicLeadView';

export default function App() {
  // Check if URL has leadId parameter
  const urlParams = new URLSearchParams(window.location.search);
  const leadId = urlParams.get('leadId');

  // If leadId exists, show PublicLeadView component
  if (leadId) {
    return <PublicLeadView />;
  }

  // Otherwise, show the portfolio/landing page
  return <BizzapPortfolio />;
}

function BizzapPortfolio() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!phoneNumber.trim()) return;

    setIsLoading(true);
    
    const fullPhoneNumber = countryCode + phoneNumber;
    const formData = new FormData();
    formData.append('entry.1658933364', fullPhoneNumber);
    
    try {
      await fetch('https://docs.google.com/forms/u/0/d/e/1FAIpQLSfGsdHitQ5v18ZnCcLMZ3WvTc_GAoZKXkJCFVHbI70ph2J0kQ/formResponse', {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      });
    } catch (error) {
      console.error('Failed to submit:', error);
    }
    
    setIsLoading(false);
    setShowSuccess(true);
    setPhoneNumber('');
  };

  const handleJoinWhatsApp = () => {
    window.open('https://chat.whatsapp.com/F5j2hxwXxpDE1BeMLKG8lZ?mode=ems_wa_t', '_blank');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && phoneNumber.trim() && !isLoading) {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-3xl"></div>
        
        <div className="relative max-w-6xl mx-auto px-6 py-16 md:py-24">
          {/* Logo & Nav */}
          <div className="flex items-center justify-between mb-16">
            <div className="flex items-center gap-3">
              <img 
                src="https://i.ibb.co/kgQPFY8D/Bizzap-8.png" 
                alt="Bizzap" 
                className="h-12 w-auto rounded-lg shadow-lg"
              />
              <div>
                <p className="text-sm text-blue-200">Sourcing Made Social</p>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex gap-3">
              <a href="https://linkedin.com/company/bizzap" target="_blank" rel="noopener noreferrer" 
                 className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://x.com/bizzapai/" target="_blank" rel="noopener noreferrer"
                 className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/bizzap.app" target="_blank" rel="noopener noreferrer"
                 className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.facebook.com/bizzapnetwork/" target="_blank" rel="noopener noreferrer"
                 className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Hero Content */}
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block mb-6 px-4 py-2 bg-yellow-500/20 border border-yellow-500/30 rounded-full">
              <span className="text-yellow-400 font-semibold">🚀 Building the Future of B2B Commerce</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              The Social Network for<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                B2B Businesses
              </span>
            </h2>
            
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Traditional marketplaces are outdated. Social media is too noisy. We're building the perfect space where businesses connect, share, and grow together.
            </p>
          </div>
        </div>
      </div>

      {/* What We're Building */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">What We're Building</h3>
          <p className="text-blue-200 text-lg">A social platform designed specifically for B2B businesses</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-blue-400/50 transition">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
            <h4 className="text-xl font-bold mb-3">Build Your Brand</h4>
            <p className="text-blue-100">Tell your story, showcase products, and build trust through verified business profiles and community engagement.</p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-blue-400/50 transition">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-purple-400" />
            </div>
            <h4 className="text-xl font-bold mb-3">Find Perfect Matches</h4>
            <p className="text-blue-100">Connect with verified buyers and suppliers. Post requirements and get quality leads that match your needs.</p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-blue-400/50 transition">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-yellow-400" />
            </div>
            <h4 className="text-xl font-bold mb-3">Grow Together</h4>
            <p className="text-blue-100">Network dynamically, share knowledge, and stay connected with your business community always.</p>
          </div>
        </div>

        {/* The Problem & Solution */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-red-500/10 backdrop-blur-lg rounded-2xl p-8 border border-red-500/20">
            <h4 className="text-2xl font-bold mb-4 text-red-300">The Problem</h4>
            <ul className="space-y-3 text-blue-100">
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">✗</span>
                <span>Marketplaces are static and outdated - just product listings with no engagement</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">✗</span>
                <span>Social media is noisy and people-focused, not built for business</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">✗</span>
                <span>No trust or visibility - hard to verify who's real and who's reliable</span>
              </li>
            </ul>
          </div>

          <div className="bg-green-500/10 backdrop-blur-lg rounded-2xl p-8 border border-green-500/20">
            <h4 className="text-2xl font-bold mb-4 text-green-300">Our Solution</h4>
            <ul className="space-y-3 text-blue-100">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span>Dynamic networking - stay connected and engaged with your business community</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span>Verified business profiles - build trust through community validation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span>All-in-one platform - source, communicate, and transact in one place</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h4 className="text-3xl font-bold mb-8 text-center">Meet the Team</h4>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold">
                ME
              </div>
              <h5 className="font-bold text-lg mb-1">Mathan Eelam</h5>
              <div className="text-sm text-blue-300 mb-3">Founder & CEO</div>
              <p className="text-sm text-blue-100">Ensures the platform solves real problems, builds trust, and creates long-term value for users.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold">
                AT
              </div>
              <h5 className="font-bold text-lg mb-1">Sakthi Selvan</h5>
              <div className="text-sm text-blue-300 mb-3">Co-founder & CTO</div>
              <p className="text-sm text-blue-100">Builds a fast, secure, and reliable platform that users can depend on every day.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold">
                DS
              </div>
              <h5 className="font-bold text-lg mb-1">Kameswaran S</h5>
              <div className="text-sm text-blue-300 mb-3">Co-founder & CPO</div>
              <p className="text-sm text-blue-100">Creates simple, user-friendly experiences and features that continuously improve based on feedback.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Waitlist Section */}
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-xl py-16">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-8">
            <Award className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Join the Waitlist</h3>
            <p className="text-xl text-blue-100 mb-2">Be among the first to experience Bizzap</p>
            <div className="inline-block bg-yellow-500/20 border border-yellow-500/30 rounded-full px-4 py-2 mt-4">
              <span className="text-yellow-400 font-semibold">🎁 Get 3 Months Premium FREE</span>
            </div>
          </div>

          {/* Premium Features */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mb-8">
            <h4 className="font-bold text-lg mb-4 text-center text-yellow-400">Premium Benefits Included</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Post Requirements</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Get Free Leads</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Verified Badge</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Product Catalogue</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>AI Assistant</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Priority Support</span>
              </div>
            </div>
          </div>

          {/* Input Form */}
          {!showSuccess ? (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <div className="mb-6">
                <div className="flex items-center bg-white/10 rounded-full p-4 border border-white/20 focus-within:border-blue-400 transition">
                  <Phone className="w-5 h-5 text-blue-300 mr-3" />
                  <input
                    type="text"
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="bg-transparent border-none text-white w-16 outline-none"
                    placeholder="+91"
                  />
                  <span className="text-white/40 mx-2">|</span>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter your phone number"
                    className="bg-transparent border-none text-white flex-1 outline-none"
                  />
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isLoading || !phoneNumber.trim()}
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-900 font-bold py-4 rounded-full hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-blue-900 border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Join Waitlist Now
                  </>
                )}
              </button>

              <p className="text-center text-sm text-blue-200 mt-4">
                ✨ Trusted by 100+ businesses already
              </p>
            </div>
          ) : (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 text-center">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h4 className="text-2xl font-bold mb-3">Welcome Aboard! 🎉</h4>
              <p className="text-blue-100 mb-6">
                You're now on the waitlist. We'll notify you when Bizzap launches!
              </p>
              
              <button
                onClick={handleJoinWhatsApp}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-4 rounded-full hover:shadow-lg transition flex items-center justify-center gap-2 mb-3"
              >
                <MessageCircle className="w-5 h-5" />
                Join WhatsApp Community
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <p className="text-sm text-yellow-400">
                Get instant updates on launch + exclusive features!
              </p>
            </div>
          )}

          {/* Social Media Links */}
          <div className="mt-8 text-center">
            <p className="text-blue-200 mb-4">Follow us for updates</p>
            <div className="flex justify-center gap-4">
              <a href="https://linkedin.com/company/bizzap" target="_blank" rel="noopener noreferrer" 
                 className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition">
                <Linkedin className="w-5 h-5" />
                <span className="text-sm">LinkedIn</span>
              </a>
              <a href="https://x.com/bizzapai/" target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition">
                <Twitter className="w-5 h-5" />
                <span className="text-sm">Twitter</span>
              </a>
              <a href="https://www.instagram.com/bizzap.app" target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition">
                <Instagram className="w-5 h-5" />
                <span className="text-sm">Instagram</span>
              </a>
              <a href="https://www.facebook.com/bizzapnetwork/" target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition">
                <Facebook className="w-5 h-5" />
                <span className="text-sm">Facebook</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-6xl mx-auto px-6 py-8 text-center text-blue-300 text-sm">
        <p>© 2025 Bizzap. Redefining B2B E-commerce from Static to Social with AI-Automation.</p>
        <p className="mt-2">Support: mathan@bizzap.app | +91 90033 88830</p>
      </div>
    </div>
  );
}