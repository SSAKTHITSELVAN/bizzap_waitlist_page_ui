

// // src/App.js
// import React, { useState, useRef } from 'react';
// import { Phone, Send, CheckCircle, MessageCircle, ArrowRight, X } from 'lucide-react';
// import './App.css';

// function App() {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [countryCode, setCountryCode] = useState('+91');
//   const [isLoading, setIsLoading] = useState(false);
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false);
//   const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);
//   const [countryCodeFocused, setCountryCodeFocused] = useState(false);
//   const [hasAutoNavigated, setHasAutoNavigated] = useState(false);
//   const [hasInteractedWithInputs, setHasInteractedWithInputs] = useState(false);
//   const countryCodeInputRef = useRef(null);
//   const phoneNumberInputRef = useRef(null);

//   const handlePhoneNumberChange = (e) => {
//     const value = e.target.value;
//     setPhoneNumber(value);
//     setHasInteractedWithInputs(true);
//     // Allow any number of digits (minimum 1 for validation)
//     setIsValidPhoneNumber(value.trim().length > 0);
//   };

//   const handleCountryCodeChange = (e) => {
//     const value = e.target.value;
//     setCountryCode(value);
//     setHasInteractedWithInputs(true);
    
//     // Auto-advance to phone number only once when country code looks complete
//     if (!hasAutoNavigated && value.match(/^\+\d{1,4}$/) && value.length >= 3) {
//       setHasAutoNavigated(true);
//       phoneNumberInputRef.current?.focus();
//     }
//   };

//   const handleInputWrapperClick = () => {
//     // Only auto-focus country code on first interaction
//     if (!hasInteractedWithInputs) {
//       countryCodeInputRef.current?.focus();
//     }
//     // After first interaction, let user click where they want
//   };

//   const handlePhoneNumberClick = () => {
//     setHasInteractedWithInputs(true);
//     phoneNumberInputRef.current?.focus();
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!isValidPhoneNumber) {
//       alert("Please enter your phone number.");
//       return;
//     }

//     setIsLoading(true);
    
//     // Submit to Google Forms
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
//     setShowSuccessPopup(true);
//     setPhoneNumber('');
//     setIsValidPhoneNumber(false);
//   };

//   const handleClosePopup = () => {
//     setShowSuccessPopup(false);
//   };

//   const handleJoinWhatsApp = () => {
//     window.open('https://chat.whatsapp.com/F5j2hxwXxpDE1BeMLKG8lZ?mode=ems_wa_t', '_blank');
//     setShowSuccessPopup(false);
//   };

//   return (
//     <div className="app-container">
//       {/* Floating Background Elements */}
//       <div className="floating-elements">
//         <div className="floating-circle circle-1"></div>
//         <div className="floating-circle circle-2"></div>
//         <div className="floating-circle circle-3"></div>
//       </div>

//       <div className="content-wrapper">
//         {/* Header with Logo */}
//         <header className="text-center relative z-20 mb-2">
//           <div className="flex items-center justify-center gap-4 mb-1">
//             <img 
//               src="https://i.ibb.co/kgQPFY8D/Bizzap-8.png" 
//               alt="Bizzap Logo" 
//               className="w-34 h-12 rounded-xl shadow-lg object-cover"
//             />
//           </div>
//           <p className="text-sm font-normal opacity-90 font-sans">Sourcing Made Social</p>
//         </header>

//         {/* Main Content */}
//         <main className="main-content">
//           {/* Hero Section */}
//           <div className="hero-section">
//             <div className="hero-subtitle">
//               Join the waitlist and get 3 months premium subscription for free
//             </div>
//           </div>
          
//           {/* Premium Features */}
//           <div className="premium-badge">
//             <h3 className="premium-title">Bizzap Premium Benefits</h3>
//             <ul className="premium-features">
//               <li>Post Requirements</li>
//               <li>Get Free Leads</li>
//               <li>Company Verified Badge</li>
//               <li>Product Catalogue</li>
//               <li>AI Business Assistant</li>
//             </ul>
//           </div>

//           {/* Phone Form */}
//           <div className="waitlist-form">
//             <form onSubmit={handleSubmit}>
//               <div className="form-group">
//                 <div 
//                   className={`input-wrapper ${!isValidPhoneNumber && phoneNumber.length > 0 ? 'invalid-input' : ''}`}
//                   onClick={handleInputWrapperClick}
//                 >
//                   <Phone className="input-icon" />
//                   <div className="phone-input-container">
//                     <input
//                       ref={countryCodeInputRef}
//                       type="text"
//                       value={countryCode}
//                       onChange={handleCountryCodeChange}
//                       onFocus={() => {
//                         setCountryCodeFocused(true);
//                         setHasInteractedWithInputs(true);
//                       }}
//                       onBlur={() => setCountryCodeFocused(false)}
//                       className="country-code-input"
//                       placeholder="+91"
//                     />
//                     <div className="input-separator">|</div>
//                     <input
//                       ref={phoneNumberInputRef}
//                       type="tel"
//                       value={phoneNumber}
//                       onChange={handlePhoneNumberChange}
//                       onFocus={() => setHasInteractedWithInputs(true)}
//                       onClick={handlePhoneNumberClick}
//                       placeholder="Enter your phone number"
//                       className="phone-number-input"
//                       required
//                     />
//                   </div>
//                 </div>
//                 {countryCodeFocused && (
//                   <div className="country-hint">
//                     Enter your country code (e.g., +91 for India, +1 for USA, +44 for UK)
//                   </div>
//                 )}
//               </div>
//               <button 
//                 type="submit" 
//                 className="join-button"
//                 disabled={isLoading || !isValidPhoneNumber}
//               >
//                 {isLoading ? (
//                   <div className="loading-content">
//                     <div className="spinner"></div>
//                     <span>Processing...</span>
//                   </div>
//                 ) : (
//                   <div className="button-content">
//                     <Send className="button-icon" />
//                     <span>Join Waitlist Now</span>
//                   </div>
//                 )}
//               </button>
//             </form>
//           </div>
//         </main>
        
//         {/* Footer with Copyright */}
//         <footer className="footer">
//           <p>Trusted by 100+ businesses already</p>
//         </footer>
//       </div>

//       {/* Success Popup Modal */}
//       {showSuccessPopup && (
//         <div className="popup-overlay">
//           <div className="popup-container">
//             {/* Close Button */}
//             <button onClick={handleClosePopup} className="popup-close-btn">
//               <X className="w-5 h-5" />
//             </button>

//             {/* Success Content */}
//             <div className="popup-content">
//               <CheckCircle className="popup-success-icon" />
//               <h3 className="popup-title">Welcome aboard!</h3>
//               <p className="popup-message">
//                 You're now on the waitlist. We'll notify you when Bizzap launches!
//               </p>

//               {/* Action Buttons */}
//               <div className="popup-buttons">
//                 <button 
//                   onClick={handleJoinWhatsApp}
//                   className="whatsapp-btn"
//                 >
//                   <MessageCircle className="w-4 h-4" />
//                   <span>Join WhatsApp Group</span>
//                   <ArrowRight className="w-4 h-4" />
//                 </button>
                
//                 <button 
//                   onClick={handleClosePopup}
//                   className="skip-btn"
//                 >
//                   Skip for now
//                 </button>
//               </div>

//               {/* Additional Info */}
//               <p className="popup-info">
//                 Get instant updates on launch + exclusive features!
//               </p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;


==========================
cluad deployment refer link = 'https://claude.ai/share/fa999eaf-0976-432a-ae78-fb31c8ebc75d'