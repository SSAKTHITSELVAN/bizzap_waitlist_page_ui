// import React, { useState, useEffect } from 'react';
// import { Send, CheckCircle, Users, Target, TrendingUp, Award, Linkedin, Instagram, Facebook, MessageCircle, ArrowRight, Phone, Twitter } from 'lucide-react';
// import PublicLeadView from './components/PublicLeadView';
// import AdminDashboard from './components/AdminDashboard';
// import LeadAdminDashboard from './components/LeadAdminDashboard';
// import PrivacyPolicy from './components/PrivacyPolicy';
// import Support from './components/Support';
// import Report from './components/Report'; // Import the new Report component

// export default function App() {
//   const [currentView, setCurrentView] = useState('home');
//   const [leadId, setLeadId] = useState(null);

//   useEffect(() => {
//     // Check URL path and query parameters
//     const path = window.location.pathname;
//     const urlParams = new URLSearchParams(window.location.search);
//     const id = urlParams.get('leadId');

//     // Route to lead admin dashboard
//     if (path === '/admin/leads') {
//       setCurrentView('leadAdmin');
//       return;
//     }

//     // Route to main admin dashboard
//     if (path === '/admin') {
//       setCurrentView('admin');
//       return;
//     }

//     // Route to Privacy Policy
//     if (path === '/privacy-policy' || path === '/polices' || path === '/privacy-policy') {
//       setCurrentView('privacy');
//       return;
//     }

//     // Route to Support Page
//     if (path === '/support' || path === '/help' || path === '/contact') {
//       setCurrentView('support');
//       return;
//     }

//     // Route to Report Page
//     if (path === '/report') {
//       setCurrentView('report');
//       return;
//     }

//     // Route to lead view if we have a leadId
//     if ((path === '/dashboard' && id) || id) {
//       setLeadId(id);
//       setCurrentView('lead');
//       return;
//     }

//     // Default to home
//     setCurrentView('home');
//   }, []);

//   // Show lead admin dashboard
//   if (currentView === 'leadAdmin') {
//     return <LeadAdminDashboard />;
//   }

//   // Show main admin dashboard
//   if (currentView === 'admin') {
//     return <AdminDashboard />;
//   }

//   // Show privacy policy
//   if (currentView === 'privacy') {
//     return <PrivacyPolicy />;
//   }

//   // Show support page
//   if (currentView === 'support') {
//     return <Support />;
//   }

//   // Show report page
//   if (currentView === 'report') {
//     return <Report />;
//   }

//   // Show lead view
//   if (currentView === 'lead' && leadId) {
//     return <PublicLeadView />;
//   }

//   // Show home/portfolio page
//   return <BizzapPortfolio />;
// }

// // --- Main Portfolio/Landing Component ---
// function BizzapPortfolio() {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [countryCode, setCountryCode] = useState('+91');
//   const [isLoading, setIsLoading] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);

//   const handleSubmit = async () => {
//     if (!phoneNumber.trim()) return;

//     setIsLoading(true);
    
//     const fullPhoneNumber = countryCode + phoneNumber;
//     const formData = new FormData();
//     formData.append('entry.1658933364', fullPhoneNumber);
    
//     try {
//       await fetch('https://docs.google.com/forms/u/0/d/e/1FAIpQLSfGsdHitQ5v18ZnCcLMZ3WvTc_GAoZKXkJCFVHbI70ph2J0kQ/formResponse', {
//         method: 'POST',
//         mode: 'no-cors',
//         body: formData
//       });
//     } catch (error) {
//       console.error('Failed to submit:', error);
//     }
    
//     setIsLoading(false);
//     setShowSuccess(true);
//     setPhoneNumber('');
//   };

//   const handleJoinWhatsApp = () => {
//     window.open('https://chat.whatsapp.com/F5j2hxwXxpDE1BeMLKG8lZ?mode=ems_wa_t', '_blank');
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && phoneNumber.trim() && !isLoading) {
//       handleSubmit();
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 text-white">
//       {/* Hero Section */}
//       <div className="relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-3xl"></div>
        
//         <div className="relative max-w-6xl mx-auto px-6 py-16 md:py-24">
//           {/* Logo & Nav */}
//           <div className="flex items-center justify-between mb-16">
//             <div className="flex items-center gap-3">
//               <img 
//                 src="https://i.ibb.co/kgQPFY8D/Bizzap-8.png" 
//                 alt="Bizzap" 
//                 className="h-12 w-auto rounded-lg shadow-lg"
//               />
//               <div>
//                 <p className="text-sm text-blue-200">Sourcing Made Social</p>
//               </div>
//             </div>
            
//             {/* Social Links */}
//             <div className="flex gap-3">
//               <a href="https://linkedin.com/company/bizzap" target="_blank" rel="noopener noreferrer" 
//                  className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition">
//                 <Linkedin className="w-5 h-5" />
//               </a>
//               <a href="https://x.com/bizzapai/" target="_blank" rel="noopener noreferrer"
//                  className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition">
//                 <Twitter className="w-5 h-5" />
//               </a>
//               <a href="https://www.instagram.com/bizzap.app" target="_blank" rel="noopener noreferrer"
//                  className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition">
//                 <Instagram className="w-5 h-5" />
//               </a>
//               <a href="https://www.facebook.com/bizzapnetwork/" target="_blank" rel="noopener noreferrer"
//                  className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition">
//                 <Facebook className="w-5 h-5" />
//               </a>
//             </div>
//           </div>

//           {/* Hero Content */}
//           <div className="text-center max-w-4xl mx-auto">
//             <div className="inline-block mb-6 px-4 py-2 bg-yellow-500/20 border border-yellow-500/30 rounded-full">
//               <span className="text-yellow-400 font-semibold">🚀 Building the Future of B2B Commerce</span>
//             </div>
            
//             <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
//               The Social Network for<br />
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
//                 B2B Businesses
//               </span>
//             </h2>
            
//             <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
//               Traditional marketplaces are outdated. Social media is too noisy. We're building the perfect space where businesses connect, share, and grow together.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* What We're Building */}
//       <div className="max-w-6xl mx-auto px-6 py-16">
//         <div className="text-center mb-12">
//           <h3 className="text-3xl md:text-4xl font-bold mb-4">What We're Building</h3>
//           <p className="text-blue-200 text-lg">A social platform designed specifically for B2B businesses</p>
//         </div>

//         <div className="grid md:grid-cols-3 gap-8 mb-16">
//           <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-blue-400/50 transition">
//             <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
//               <Users className="w-6 h-6 text-blue-400" />
//             </div>
//             <h4 className="text-xl font-bold mb-3">Build Your Brand</h4>
//             <p className="text-blue-100">Tell your story, showcase products, and build trust through verified business profiles and community engagement.</p>
//           </div>

//           <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-blue-400/50 transition">
//             <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
//               <Target className="w-6 h-6 text-purple-400" />
//             </div>
//             <h4 className="text-xl font-bold mb-3">Find Perfect Matches</h4>
//             <p className="text-blue-100">Connect with verified buyers and suppliers. Post requirements and get quality leads that match your needs.</p>
//           </div>

//           <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-blue-400/50 transition">
//             <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-4">
//               <TrendingUp className="w-6 h-6 text-yellow-400" />
//             </div>
//             <h4 className="text-xl font-bold mb-3">Grow Together</h4>
//             <p className="text-blue-100">Network dynamically, share knowledge, and stay connected with your business community always.</p>
//           </div>
//         </div>

//         {/* The Problem & Solution */}
//         <div className="grid md:grid-cols-2 gap-8 mb-16">
//           <div className="bg-red-500/10 backdrop-blur-lg rounded-2xl p-8 border border-red-500/20">
//             <h4 className="text-2xl font-bold mb-4 text-red-300">The Problem</h4>
//             <ul className="space-y-3 text-blue-100">
//               <li className="flex items-start gap-2">
//                 <span className="text-red-400 mt-1">✗</span>
//                 <span>Marketplaces are static and outdated - just product listings with no engagement</span>
//               </li>
//               <li className="flex items-start gap-2">
//                 <span className="text-red-400 mt-1">✗</span>
//                 <span>Social media is noisy and people-focused, not built for business</span>
//               </li>
//               <li className="flex items-start gap-2">
//                 <span className="text-red-400 mt-1">✗</span>
//                 <span>No trust or visibility - hard to verify who's real and who's reliable</span>
//               </li>
//             </ul>
//           </div>

//           <div className="bg-green-500/10 backdrop-blur-lg rounded-2xl p-8 border border-green-500/20">
//             <h4 className="text-2xl font-bold mb-4 text-green-300">Our Solution</h4>
//             <ul className="space-y-3 text-blue-100">
//               <li className="flex items-start gap-2">
//                 <span className="text-green-400 mt-1">✓</span>
//                 <span>Dynamic networking - stay connected and engaged with your business community</span>
//               </li>
//               <li className="flex items-start gap-2">
//                 <span className="text-green-400 mt-1">✓</span>
//                 <span>Verified business profiles - build trust through community validation</span>
//               </li>
//               <li className="flex items-start gap-2">
//                 <span className="text-green-400 mt-1">✓</span>
//                 <span>All-in-one platform - source, communicate, and transact in one place</span>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Team */}
//         <div className="mb-16">
//           <h4 className="text-3xl font-bold mb-8 text-center">Meet the Team</h4>
//           <div className="grid md:grid-cols-3 gap-6">
//             <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 text-center">
//               <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold">
//                 ME
//               </div>
//               <h5 className="font-bold text-lg mb-1">Mathan Eelam</h5>
//               <div className="text-sm text-blue-300 mb-3">Founder & CEO</div>
//               <p className="text-sm text-blue-100">Ensures the platform solves real problems, builds trust, and creates long-term value for users.</p>
//             </div>
//             <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 text-center">
//               <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold">
//                 AT
//               </div>
//               <h5 className="font-bold text-lg mb-1">Sakthi Selvan</h5>
//               <div className="text-sm text-blue-300 mb-3">Co-founder & CTO</div>
//               <p className="text-sm text-blue-100">Builds a fast, secure, and reliable platform that users can depend on every day.</p>
//             </div>
//             <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 text-center">
//               <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold">
//                 DS
//               </div>
//               <h5 className="font-bold text-lg mb-1">Kameswaran S</h5>
//               <div className="text-sm text-blue-300 mb-3">Co-founder & CPO</div>
//               <p className="text-sm text-blue-100">Creates simple, user-friendly experiences and features that continuously improve based on feedback.</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Waitlist Section */}
//       <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-xl py-16">
//         <div className="max-w-2xl mx-auto px-6">
//           <div className="text-center mb-8">
//             <Award className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
//             <h3 className="text-3xl md:text-4xl font-bold mb-4">Join the Waitlist</h3>
//             <p className="text-xl text-blue-100 mb-2">Be among the first to experience Bizzap</p>
//             <div className="inline-block bg-yellow-500/20 border border-yellow-500/30 rounded-full px-4 py-2 mt-4">
//               <span className="text-yellow-400 font-semibold">🎁 Get 3 Months Premium FREE</span>
//             </div>
//           </div>

//           {/* Premium Features */}
//           <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mb-8">
//             <h4 className="font-bold text-lg mb-4 text-center text-yellow-400">Premium Benefits Included</h4>
//             <div className="grid grid-cols-2 gap-3 text-sm">
//               <div className="flex items-center gap-2">
//                 <CheckCircle className="w-4 h-4 text-green-400" />
//                 <span>Post Requirements</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <CheckCircle className="w-4 h-4 text-green-400" />
//                 <span>Get Free Leads</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <CheckCircle className="w-4 h-4 text-green-400" />
//                 <span>Verified Badge</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <CheckCircle className="w-4 h-4 text-green-400" />
//                 <span>Product Catalogue</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <CheckCircle className="w-4 h-4 text-green-400" />
//                 <span>AI Assistant</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <CheckCircle className="w-4 h-4 text-green-400" />
//                 <span>Priority Support</span>
//               </div>
//             </div>
//           </div>

//           {/* Input Form */}
//           {!showSuccess ? (
//             <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
//               <div className="mb-6">
//                 <div className="flex items-center bg-white/10 rounded-full p-4 border border-white/20 focus-within:border-blue-400 transition">
//                   <Phone className="w-5 h-5 text-blue-300 mr-3" />
//                   <input
//                     type="text"
//                     value={countryCode}
//                     onChange={(e) => setCountryCode(e.target.value)}
//                     className="bg-transparent border-none text-white w-16 outline-none"
//                     placeholder="+91"
//                   />
//                   <span className="text-white/40 mx-2">|</span>
//                   <input
//                     type="tel"
//                     value={phoneNumber}
//                     onChange={(e) => setPhoneNumber(e.target.value)}
//                     onKeyPress={handleKeyPress}
//                     placeholder="Enter your phone number"
//                     className="bg-transparent border-none text-white flex-1 outline-none"
//                   />
//                 </div>
//               </div>

//               <button
//                 onClick={handleSubmit}
//                 disabled={isLoading || !phoneNumber.trim()}
//                 className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-900 font-bold py-4 rounded-full hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//               >
//                 {isLoading ? (
//                   <>
//                     <div className="w-5 h-5 border-2 border-blue-900 border-t-transparent rounded-full animate-spin"></div>
//                     Processing...
//                   </>
//                 ) : (
//                   <>
//                     <Send className="w-5 h-5" />
//                     Join Waitlist Now
//                   </>
//                 )}
//               </button>

//               <p className="text-center text-sm text-blue-200 mt-4">
//                 ✨ Trusted by 100+ businesses already
//               </p>
//             </div>
//           ) : (
//             <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 text-center">
//               <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
//               <h4 className="text-2xl font-bold mb-3">Welcome Aboard! 🎉</h4>
//               <p className="text-blue-100 mb-6">
//                 You're now on the waitlist. We'll notify you when Bizzap launches!
//               </p>
              
//               <button
//                 onClick={handleJoinWhatsApp}
//                 className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-4 rounded-full hover:shadow-lg transition flex items-center justify-center gap-2 mb-3"
//               >
//                 <MessageCircle className="w-5 h-5" />
//                 Join WhatsApp Community
//                 <ArrowRight className="w-5 h-5" />
//               </button>
              
//               <p className="text-sm text-yellow-400">
//                 Get instant updates on launch + exclusive features!
//               </p>
//             </div>
//           )}

//           {/* Social Media Links */}
//           <div className="mt-8 text-center">
//             <p className="text-blue-200 mb-4">Follow us for updates</p>
//             <div className="flex justify-center gap-4">
//               <a href="https://linkedin.com/company/bizzap" target="_blank" rel="noopener noreferrer" 
//                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition">
//                 <Linkedin className="w-5 h-5" />
//                 <span className="text-sm">LinkedIn</span>
//               </a>
//               <a href="https://x.com/bizzapai/" target="_blank" rel="noopener noreferrer"
//                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition">
//                 <Twitter className="w-5 h-5" />
//                 <span className="text-sm">Twitter</span>
//               </a>
//               <a href="https://www.instagram.com/bizzap.app" target="_blank" rel="noopener noreferrer"
//                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition">
//                 <Instagram className="w-5 h-5" />
//                 <span className="text-sm">Instagram</span>
//               </a>
//               <a href="https://www.facebook.com/bizzapnetwork/" target="_blank" rel="noopener noreferrer"
//                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition">
//                 <Facebook className="w-5 h-5" />
//                 <span className="text-sm">Facebook</span>
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="max-w-6xl mx-auto px-6 py-8 text-center text-blue-300 text-sm">
//         <p>© 2025 Bizzap. Redefining B2B E-commerce from Static to Social with AI-Automation.</p>
//         <p className="mt-2">Support: mathan@bizzap.app | +91 90033 88830</p>
//         <div className="mt-2 flex justify-center gap-4 opacity-60">
//           <a href="/policies" className="hover:opacity-100 transition">Privacy Policy</a>
//           <span>|</span>
//           <a href="/support" className="hover:opacity-100 transition">Help & Support</a>
//           <span>|</span>
//           <a href="/report" className="hover:opacity-100 transition">Report Issue</a>
//         </div>
//       </div>
//     </div>
//   );
// }




import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, Users, Target, TrendingUp, Award, Linkedin, Instagram, Facebook, MessageCircle, ArrowRight, Phone, Twitter } from 'lucide-react';
import PublicLeadView from './components/PublicLeadView';
import AdminDashboard from './components/AdminDashboard';
import LeadAdminDashboard from './components/LeadAdminDashboard';
import PrivacyPolicy from './components/PrivacyPolicy';
import Support from './components/Support';
import Report from './components/Report';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [leadId, setLeadId] = useState(null);

  useEffect(() => {
    // 1. Get URL details
    const path = window.location.pathname;
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('leadId');

    // ==========================================
    // 🚀 DEEP LINK REDIRECT LOGIC START
    // ==========================================
    const handleMobileRedirect = () => {
      // Check if user is on a mobile device
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      
      // Only redirect if on mobile AND visiting a specific app route (like a lead or dashboard)
      // We exclude admin/policy pages from this behavior to ensure web access remains easy
      const isAppRoute = id || path.includes('/dashboard');

      if (isMobile && isAppRoute) {
        // Your Play Store URL (based on your package name com.bizzap)
        const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.bizzap";
        
        // Construct the App Scheme URL (e.g., bizzap://dashboard?leadId=123)
        // This removes the leading slash from path to prevent double slashes if needed
        const cleanPath = path.startsWith('/') ? path.substring(1) : path;
        const appScheme = `bizzap://${cleanPath}${window.location.search}`;

        // 1. Attempt to open the App
        window.location.href = appScheme;

        // 2. Fallback to Play Store if App doesn't open within 2.5 seconds
        setTimeout(() => {
          // If the user is still here (document is visible), the app didn't open.
          if (!document.hidden) {
            window.location.href = PLAY_STORE_URL;
          }
        }, 2500);
      }
    };
    
    // Execute Redirect Logic
    handleMobileRedirect();
    // ==========================================
    // 🚀 DEEP LINK REDIRECT LOGIC END
    // ==========================================


    // --- Existing Routing Logic ---

    // Route to lead admin dashboard
    if (path === '/admin/leads') {
      setCurrentView('leadAdmin');
      return;
    }

    // Route to main admin dashboard
    if (path === '/admin') {
      setCurrentView('admin');
      return;
    }

    // Route to Privacy Policy
    if (path === '/privacy-policy' || path === '/polices' || path === '/privacy-policy') {
      setCurrentView('privacy');
      return;
    }

    // Route to Support Page
    if (path === '/support') {
      setCurrentView('support');
      return;
    }
    
    // Route to Report Page
    if (path === '/report') {
      setCurrentView('report');
      return;
    }

    // Route to Public Lead View (if ID exists)
    if (id) {
      setLeadId(id);
      setCurrentView('lead');
    }
  }, []);

  const renderContent = () => {
    switch (currentView) {
      case 'leadAdmin':
        return <LeadAdminDashboard />;
      case 'admin':
        return <AdminDashboard />;
      case 'lead':
        return <PublicLeadView leadId={leadId} />;
      case 'privacy':
        return <PrivacyPolicy />;
      case 'support':
        return <Support />;
      case 'report':
        return <Report />;
      default:
        return (
          <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
            {/* Navbar */}
            <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
              <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-500 rounded-xl flex items-center justify-center">
                    <span className="text-xl font-bold text-white">B</span>
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                    Bizzap
                  </span>
                </div>
                <div className="hidden md:flex items-center gap-8">
                  <a href="#features" className="text-sm font-medium text-gray-400 hover:text-white transition">Features</a>
                  <a href="#how-it-works" className="text-sm font-medium text-gray-400 hover:text-white transition">How it Works</a>
                  <button 
                    onClick={() => window.location.href = 'https://play.google.com/store/apps/details?id=com.bizzap'}
                    className="bg-white text-black px-6 py-2.5 rounded-full font-semibold hover:bg-gray-100 transition flex items-center gap-2"
                  >
                    Download App
                  </button>
                </div>
              </div>
            </nav>

            {/* Hero Section */}
            <div className="pt-32 pb-20 px-6 relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-600/20 rounded-full blur-3xl opacity-30 animate-pulse" />
              <div className="max-w-4xl mx-auto text-center relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 hover:bg-white/10 transition cursor-pointer">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-medium text-gray-300">Live: AI-Powered Lead Matching</span>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </div>
                <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                  Where Business <br />
                  <span className="bg-gradient-to-r from-blue-400 via-teal-400 to-green-400 bg-clip-text text-transparent">
                    Meets Opportunity
                  </span>
                </h1>
                <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                  Transform your B2B networking with AI-driven connections. Find verified leads, 
                  connect with decision-makers, and close deals faster than ever.
                </p>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                  <button 
                    onClick={() => window.location.href = 'https://play.google.com/store/apps/details?id=com.bizzap'}
                    className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-8 py-4 rounded-full font-bold text-lg transition shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2"
                  >
                    Start Growing Now
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <button className="w-full md:w-auto px-8 py-4 rounded-full font-bold text-lg border border-white/10 hover:bg-white/5 transition flex items-center justify-center gap-2">
                    <Phone className="w-5 h-5" />
                    Book Demo
                  </button>
                </div>
                
                {/* Stats */}
                <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-12">
                  {[
                    { label: 'Active Businesses', value: '10K+' },
                    { label: 'Daily Leads', value: '500+' },
                    { label: 'Cities Covered', value: '50+' },
                    { label: 'Success Rate', value: '94%' },
                  ].map((stat, i) => (
                    <div key={i}>
                      <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-sm text-gray-500">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div id="features" className="py-32 bg-white/5">
              <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-20">
                  <h2 className="text-3xl md:text-5xl font-bold mb-6">Why Choose Bizzap?</h2>
                  <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    Built for modern businesses that demand speed, accuracy, and reliability.
                  </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    {
                      icon: Target,
                      title: "AI Lead Matching",
                      desc: "Our algorithm connects you with businesses actively looking for your products."
                    },
                    {
                      icon: CheckCircle,
                      title: "Verified Profiles",
                      desc: "Every business is GST verified to ensure a safe and trustworthy marketplace."
                    },
                    {
                      icon: MessageCircle,
                      title: "Direct Chat",
                      desc: "No middlemen. Connect directly with decision-makers and close deals instantly."
                    }
                  ].map((feature, i) => (
                    <div key={i} className="group p-8 rounded-3xl bg-black border border-white/10 hover:border-blue-500/50 transition duration-500 hover:shadow-2xl hover:shadow-blue-500/10">
                      <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition duration-500">
                        <feature.icon className="w-7 h-7 text-blue-400" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Social Proof */}
            <div className="py-20 border-y border-white/10 overflow-hidden">
              <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-center gap-12 opacity-50 grayscale">
                  {/* Add partner logos here if available */}
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="py-32 px-6 relative overflow-hidden">
              <div className="max-w-5xl mx-auto bg-gradient-to-br from-blue-600 to-teal-600 rounded-[3rem] p-12 md:p-24 text-center relative z-10">
                <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to Scale Your Business?</h2>
                <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
                  Join thousands of businesses already growing with Bizzap. 
                  Download the app and get your first 5 leads for free.
                </p>
                <button 
                  onClick={() => window.location.href = 'https://play.google.com/store/apps/details?id=com.bizzap'}
                  className="bg-white text-blue-600 px-10 py-5 rounded-full font-bold text-xl hover:bg-gray-100 transition shadow-xl"
                >
                  Download Now
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div className="py-12 border-t border-white/10">
              <div className="max-w-7xl mx-auto px-6 flex justify-center gap-6">
                <a href="https://twitter.com/bizzap_app" target="_blank" rel="noopener noreferrer" 
                   className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition">
                  <Twitter className="w-5 h-5" />
                  <span className="text-sm">Twitter</span>
                </a>
                <a href="https://www.linkedin.com/company/bizzap/" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition">
                  <Linkedin className="w-5 h-5" />
                  <span className="text-sm">LinkedIn</span>
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

            {/* Footer */}
            <div className="max-w-6xl mx-auto px-6 py-8 text-center text-blue-300 text-sm">
              <p>© 2025 Bizzap. Redefining B2B E-commerce from Static to Social with AI-Automation.</p>
              <p className="mt-2">Support: mathan@bizzap.app | +91 90033 88830</p>
              <div className="mt-2 flex justify-center gap-4 opacity-60">
                <a href="/policies" className="hover:opacity-100 transition">Privacy Policy</a>
                <span>|</span>
                <a href="/terms" className="hover:opacity-100 transition">Terms of Service</a>
              </div>
            </div>
          </div>
        );
    }
  };

  return renderContent();
}