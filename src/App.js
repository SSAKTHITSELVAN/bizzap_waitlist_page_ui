import React, { useState, useRef } from 'react';
import { Phone, Send, CheckCircle } from 'lucide-react';

function App() {
  const [step, setStep] = useState('phone'); // 'phone' or 'success'
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const countryCodeInputRef = useRef(null);
  const phoneNumberInputRef = useRef(null);

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Only digits
    setPhoneNumber(value);
    setError('');
  };

  const handleCountryCodeChange = (e) => {
    const value = e.target.value;
    if (value === '' || value.match(/^\+?\d*$/)) {
      setCountryCode(value.startsWith('+') ? value : '+' + value);
      setError('');
    }
  };

  const isValidPhone = phoneNumber.length >= 10;

  const handleSendOtp = () => {
    if (!isValidPhone) {
      setError('Please enter a valid phone number');
      return;
    }

    if (!agreedToTerms) {
      setError('Please agree to the Terms and Conditions');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate OTP sending
    setTimeout(() => {
      setIsLoading(false);
      setStep('success');
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && isValidPhone && !isLoading && agreedToTerms) {
      handleSendOtp();
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>


        {step === 'phone' ? (
          <>
            {/* Header */}
            <div style={styles.header}>
              <h1 style={styles.title}>Welcome to Bizzap</h1>
              <p style={styles.subtitle}>Enter your phone number to continue</p>
            </div>

            {/* Error Message */}
            {error && (
              <div style={styles.errorBox}>
                <p style={styles.errorText}>{error}</p>
              </div>
            )}

            {/* Input Section */}
            <div style={styles.formContainer}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Phone Number</label>
                <div style={styles.phoneInputWrapper}>
                  <input
                    ref={countryCodeInputRef}
                    type="text"
                    value={countryCode}
                    onChange={handleCountryCodeChange}
                    onKeyPress={handleKeyPress}
                    style={styles.countryCodeInput}
                    placeholder="+91"
                  />
                  <div style={styles.separator}>|</div>
                  <input
                    ref={phoneNumberInputRef}
                    type="tel"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter phone number"
                    style={styles.phoneInput}
                    autoFocus
                  />
                </div>
                <p style={styles.hint}>Include country code (e.g., +91 for India)</p>
              </div>

              {/* Terms and Conditions Checkbox */}
              <div style={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => {
                    setAgreedToTerms(e.target.checked);
                    setError('');
                  }}
                  style={styles.checkbox}
                />
                <label htmlFor="terms" style={styles.checkboxLabel}>
                  I agree to the{' '}
                  <a 
                    href="#terms" 
                    style={styles.link}
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Terms and Conditions will be displayed here');
                    }}
                  >
                    Terms and Conditions
                  </a>
                  {' '}
                  <a 
                    href="#terms" 
                    style={styles.readMoreLink}
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Terms and Conditions will be displayed here');
                    }}
                  >
                    Read more
                  </a>
                </label>
              </div>

              <button 
                onClick={handleSendOtp}
                disabled={!isValidPhone || isLoading || !agreedToTerms}
                style={{
                  ...styles.button,
                  ...((!isValidPhone || isLoading || !agreedToTerms) && styles.buttonDisabled)
                }}
              >
                {isLoading ? (
                  <span style={styles.buttonContent}>
                    <span style={styles.spinner}></span>
                    Sending...
                  </span>
                ) : (
                  <span style={styles.buttonContent}>
                    <Send size={18} />
                    Send OTP
                  </span>
                )}
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Success State */}
            <div style={styles.successContainer}>
              <div style={styles.successIcon}>
                <CheckCircle size={64} color="#000" />
              </div>
              <h2 style={styles.successTitle}>OTP Sent Successfully!</h2>
              <p style={styles.successMessage}>
                We've sent a verification code to<br />
                <strong>{countryCode} {phoneNumber}</strong>
              </p>
            </div>
          </>
        )}

        {/* Footer */}
        <div style={styles.footer}>
          <p style={styles.copyright}>
            <strong>© 2025 Bizzap. All rights reserved.</strong>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        @media (max-width: 640px) {
          .responsive-card {
            margin: 10px;
            padding: 24px 20px;
          }
        }
        
        input::placeholder {
          color: #999999;
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  card: {
    width: '100%',
    maxWidth: '440px',
    backgroundColor: '#ffffff',
    border: '2px solid #000000',
    borderRadius: '12px',
    padding: '40px 32px',
    boxShadow: '8px 8px 0px #000000',
  },
  logoContainer: {
    textAlign: 'center',
    marginBottom: '8px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: '8px',
    margin: 0,
  },
  subtitle: {
    fontSize: '15px',
    color: '#666666',
    margin: 0,
    marginTop: '8px',
  },
  errorBox: {
    backgroundColor: '#ffebee',
    border: '1px solid #000000',
    borderRadius: '6px',
    padding: '12px',
    marginBottom: '20px',
  },
  errorText: {
    color: '#000000',
    fontSize: '14px',
    margin: 0,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: '24px',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    color: '#000000',
    marginBottom: '8px',
  },
  phoneInputWrapper: {
    display: 'flex',
    alignItems: 'center',
    border: '2px solid #000000',
    borderRadius: '8px',
    padding: '4px 4px 4px 12px',
    backgroundColor: '#ffffff',
  },
  countryCodeInput: {
    width: '60px',
    border: 'none',
    outline: 'none',
    fontSize: '16px',
    padding: '10px 4px',
    color: '#000000',
    fontWeight: '500',
  },
  separator: {
    color: '#cccccc',
    margin: '0 8px',
    fontSize: '20px',
  },
  phoneInput: {
    flex: 1,
    border: 'none',
    outline: 'none',
    fontSize: '16px',
    padding: '10px 4px',
    color: '#000000',
  },
  hint: {
    fontSize: '12px',
    color: '#666666',
    marginTop: '6px',
    margin: 0,
    marginTop: '6px',
  },
  checkboxContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    marginBottom: '20px',
  },
  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
    marginTop: '2px',
    accentColor: '#000000',
  },
  checkboxLabel: {
    fontSize: '13px',
    color: '#333333',
    lineHeight: '1.5',
    cursor: 'pointer',
  },
  link: {
    color: '#000000',
    textDecoration: 'underline',
    fontWeight: '600',
    cursor: 'pointer',
  },
  readMoreLink: {
    color: '#666666',
    textDecoration: 'underline',
    fontSize: '12px',
    cursor: 'pointer',
    marginLeft: '4px',
  },
  button: {
    width: '100%',
    backgroundColor: '#000000',
    color: '#ffffff',
    border: '2px solid #000000',
    borderRadius: '8px',
    padding: '14px 24px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    marginTop: '8px',
  },
  buttonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  buttonContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  spinner: {
    width: '16px',
    height: '16px',
    border: '2px solid #ffffff',
    borderTopColor: 'transparent',
    borderRadius: '50%',
    display: 'inline-block',
    animation: 'spin 0.6s linear infinite',
  },
  successContainer: {
    textAlign: 'center',
    padding: '20px 0',
  },
  successIcon: {
    marginBottom: '24px',
    display: 'flex',
    justifyContent: 'center',
  },
  successTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: '12px',
    margin: 0,
    marginBottom: '12px',
  },
  successMessage: {
    fontSize: '15px',
    color: '#666666',
    lineHeight: '1.6',
    margin: 0,
  },
  footer: {
    marginTop: '40px',
    paddingTop: '20px',
    borderTop: '1px solid #e0e0e0',
    textAlign: 'center',
  },
  copyright: {
    fontSize: '12px',
    color: '#999999',
    margin: 0,
  },
};

export default App;