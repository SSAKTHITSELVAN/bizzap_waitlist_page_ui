


import React, { useState } from 'react';
import { Phone, Lock, CheckCircle, Trash2, AlertCircle, LogIn, UserX, ArrowRight } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.logoText}>Bizzap</h1>
          <p style={styles.logoTagline}>Sourcing Made Social</p>
          <p style={styles.headerDescription}>User Guide for Login & Account Management</p>
        </div>

        {/* Tab Navigation */}
        <div style={styles.tabContainer}>
          <button
            onClick={() => setActiveTab('login')}
            style={{
              ...styles.tab,
              ...(activeTab === 'login' && styles.tabActive)
            }}
          >
            <LogIn size={18} />
            How to Login
          </button>
          <button
            onClick={() => setActiveTab('delete')}
            style={{
              ...styles.tab,
              ...(activeTab === 'delete' && styles.tabActive)
            }}
          >
            <UserX size={18} />
            How to Delete Account
          </button>
        </div>

        {/* Content */}
        <div style={styles.content}>
          {activeTab === 'login' ? (
            // LOGIN GUIDE
            <div>
              <div style={styles.guideHeader}>
                <LogIn size={48} style={styles.guideIcon} />
                <h2 style={styles.guideTitle}>How to Login to Bizzap</h2>
                <p style={styles.guideSubtitle}>
                  Bizzap uses a secure OTP-based login system. Follow these simple steps to access your account.
                </p>
              </div>

              {/* Step 1 */}
              <div style={styles.step}>
                <div style={styles.stepNumber}>1</div>
                <div style={styles.stepContent}>
                  <div style={styles.stepHeader}>
                    <Phone size={24} style={styles.stepIcon} />
                    <h3 style={styles.stepTitle}>Enter Your Phone Number</h3>
                  </div>
                  <p style={styles.stepDescription}>
                    Open the Bizzap app and you'll see the login screen. Enter your registered phone number with the correct country code.
                  </p>
                  <div style={styles.exampleBox}>
                    <p style={styles.exampleLabel}>Example:</p>
                    <p style={styles.exampleText}>Country Code: <strong>+91</strong></p>
                    <p style={styles.exampleText}>Phone Number: <strong>9876543210</strong></p>
                  </div>
                  <ul style={styles.bulletList}>
                    <li>Make sure to include your country code (+91 for India, +1 for USA, etc.)</li>
                    <li>Enter only digits without spaces or special characters</li>
                    <li>Use the phone number you registered with</li>
                  </ul>
                </div>
              </div>

              {/* Step 2 */}
              <div style={styles.step}>
                <div style={styles.stepNumber}>2</div>
                <div style={styles.stepContent}>
                  <div style={styles.stepHeader}>
                    <ArrowRight size={24} style={styles.stepIcon} />
                    <h3 style={styles.stepTitle}>Request OTP</h3>
                  </div>
                  <p style={styles.stepDescription}>
                    After entering your phone number, tap on the <strong>"Send OTP"</strong> button. Within seconds, you'll receive a 6-digit verification code via SMS.
                  </p>
                  <div style={styles.infoBox}>
                    <AlertCircle size={20} />
                    <p style={styles.infoText}>
                      <strong>Note:</strong> The OTP is valid for 10 minutes. Make sure to enter it before it expires.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div style={styles.step}>
                <div style={styles.stepNumber}>3</div>
                <div style={styles.stepContent}>
                  <div style={styles.stepHeader}>
                    <Lock size={24} style={styles.stepIcon} />
                    <h3 style={styles.stepTitle}>Enter the OTP</h3>
                  </div>
                  <p style={styles.stepDescription}>
                    Check your SMS messages for the 6-digit OTP code sent from Bizzap. Enter this code in the OTP input field on the app.
                  </p>
                  <div style={styles.exampleBox}>
                    <p style={styles.exampleLabel}>Example OTP:</p>
                    <p style={styles.otpExample}>1 2 3 4 5 6</p>
                  </div>
                  <ul style={styles.bulletList}>
                    <li>Enter all 6 digits carefully</li>
                    <li>Don't share your OTP with anyone</li>
                    <li>If you don't receive the OTP, you can request a new one</li>
                  </ul>
                </div>
              </div>

              {/* Step 4 */}
              <div style={styles.step}>
                <div style={styles.stepNumber}>4</div>
                <div style={styles.stepContent}>
                  <div style={styles.stepHeader}>
                    <CheckCircle size={24} style={styles.stepIcon} />
                    <h3 style={styles.stepTitle}>Login Successful</h3>
                  </div>
                  <p style={styles.stepDescription}>
                    Once you enter the correct OTP, you'll be automatically logged into your Bizzap account. You can now access all features including posting requirements, browsing products, and connecting with businesses.
                  </p>
                  <div style={styles.successBox}>
                    <CheckCircle size={20} />
                    <p style={styles.successText}>
                      You're all set! Welcome to Bizzap.
                    </p>
                  </div>
                </div>
              </div>

              {/* Troubleshooting */}
              <div style={styles.troubleshootSection}>
                <h3 style={styles.troubleshootTitle}>Troubleshooting</h3>
                <div style={styles.troubleshootBox}>
                  <p style={styles.troubleshootQuestion}><strong>Didn't receive OTP?</strong></p>
                  <p style={styles.troubleshootAnswer}>
                    • Check your phone's signal strength<br />
                    • Wait 2-3 minutes, sometimes SMS can be delayed<br />
                    • Request a new OTP using the "Resend OTP" option<br />
                    • Ensure your phone number is correct
                  </p>
                </div>
                <div style={styles.troubleshootBox}>
                  <p style={styles.troubleshootQuestion}><strong>OTP not working?</strong></p>
                  <p style={styles.troubleshootAnswer}>
                    • Make sure you entered all 6 digits correctly<br />
                    • Check if the OTP has expired (valid for 10 minutes)<br />
                    • Request a fresh OTP and try again
                  </p>
                </div>
              </div>
            </div>
          ) : (
            // DELETE ACCOUNT GUIDE
            <div>
              <div style={styles.guideHeader}>
                <AlertCircle size={48} style={{...styles.guideIcon, color: '#d32f2f'}} />
                <h2 style={styles.guideTitle}>How to Delete Your Bizzap Account</h2>
                <p style={styles.guideSubtitle}>
                  You can permanently delete your account and all associated data at any time. This action is irreversible.
                </p>
              </div>

              {/* Warning Box */}
              <div style={styles.dangerBox}>
                <AlertCircle size={24} />
                <div>
                  <h3 style={styles.dangerBoxTitle}>⚠️ Important Warning</h3>
                  <p style={styles.dangerBoxText}>
                    Deleting your account is <strong>permanent and cannot be undone</strong>. All your data will be immediately and permanently removed from our servers.
                  </p>
                </div>
              </div>

              {/* What Gets Deleted */}
              <div style={styles.deletionInfoBox}>
                <h3 style={styles.deletionInfoTitle}>What will be deleted:</h3>
                <ul style={styles.deletionList}>
                  <li>✗ Your profile and business information</li>
                  <li>✗ All posted requirements and listings</li>
                  <li>✗ Product catalogue and inventory</li>
                  <li>✗ Premium subscription benefits</li>
                  <li>✗ All chat history and connections</li>
                  <li>✗ Saved preferences and settings</li>
                  <li>✗ Transaction history and analytics</li>
                  <li>✗ Company verified badge status</li>
                </ul>
              </div>

              {/* Step 1 */}
              <div style={styles.step}>
                <div style={styles.stepNumber}>1</div>
                <div style={styles.stepContent}>
                  <div style={styles.stepHeader}>
                    <UserX size={24} style={styles.stepIcon} />
                    <h3 style={styles.stepTitle}>Navigate to Account Settings</h3>
                  </div>
                  <p style={styles.stepDescription}>
                    Open the Bizzap app and go to your <strong>Profile</strong> → <strong>Settings</strong> → <strong>Account Management</strong> → Select <strong>"Delete Account"</strong> option.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div style={styles.step}>
                <div style={styles.stepNumber}>2</div>
                <div style={styles.stepContent}>
                  <div style={styles.stepHeader}>
                    <Phone size={24} style={styles.stepIcon} />
                    <h3 style={styles.stepTitle}>Verify Your Phone Number</h3>
                  </div>
                  <p style={styles.stepDescription}>
                    For security purposes, you'll need to verify your identity. Enter your registered phone number to receive an OTP verification code.
                  </p>
                  <div style={styles.exampleBox}>
                    <p style={styles.exampleLabel}>Example:</p>
                    <p style={styles.exampleText}>Country Code: <strong>+91</strong></p>
                    <p style={styles.exampleText}>Phone Number: <strong>9876543210</strong></p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div style={styles.step}>
                <div style={styles.stepNumber}>3</div>
                <div style={styles.stepContent}>
                  <div style={styles.stepHeader}>
                    <Lock size={24} style={styles.stepIcon} />
                    <h3 style={styles.stepTitle}>Enter Verification OTP</h3>
                  </div>
                  <p style={styles.stepDescription}>
                    You'll receive a 6-digit OTP code via SMS. Enter this code to verify that you are the account owner and authorize the deletion.
                  </p>
                  <div style={styles.infoBox}>
                    <AlertCircle size={20} />
                    <p style={styles.infoText}>
                      <strong>Security Check:</strong> This OTP ensures only you can delete your account. Never share this code with anyone.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div style={styles.step}>
                <div style={styles.stepNumber}>4</div>
                <div style={styles.stepContent}>
                  <div style={styles.stepHeader}>
                    <AlertCircle size={24} style={styles.stepIcon} />
                    <h3 style={styles.stepTitle}>Final Confirmation</h3>
                  </div>
                  <p style={styles.stepDescription}>
                    After OTP verification, you'll see a final confirmation screen showing everything that will be deleted. Review this carefully before proceeding.
                  </p>
                  <p style={styles.stepDescription}>
                    Tap <strong>"Yes, Delete My Account"</strong> to proceed with permanent deletion.
                  </p>
                </div>
              </div>

              {/* Step 5 */}
              <div style={styles.step}>
                <div style={styles.stepNumber}>5</div>
                <div style={styles.stepContent}>
                  <div style={styles.stepHeader}>
                    <Trash2 size={24} style={styles.stepIcon} />
                    <h3 style={styles.stepTitle}>Account Deleted Instantly</h3>
                  </div>
                  <p style={styles.stepDescription}>
                    Your account and all associated data will be <strong>immediately and permanently deleted</strong> from our servers. You'll be logged out automatically and can no longer access Bizzap with this phone number.
                  </p>
                  <div style={styles.finalBox}>
                    <p style={styles.finalText}>
                      If you wish to use Bizzap again in the future, you'll need to create a new account from scratch.
                    </p>
                  </div>
                </div>
              </div>

              {/* Alternative */}
              <div style={styles.alternativeSection}>
                <h3 style={styles.alternativeTitle}>🤔 Not sure about deleting?</h3>
                <p style={styles.alternativeText}>
                  Instead of deleting your account, you can:
                </p>
                <ul style={styles.bulletList}>
                  <li><strong>Temporarily deactivate</strong> your account (coming soon)</li>
                  <li><strong>Clear your data</strong> without deleting the account</li>
                  <li><strong>Contact support</strong> at support@bizzap.com for assistance</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <p style={styles.footerText}>
            For more help, contact us at <strong>support@bizzap.com</strong>
          </p>
          <p style={styles.copyright}>© 2025 Bizzap. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  card: {
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    border: '2px solid #000000',
    borderRadius: '12px',
    boxShadow: '8px 8px 0px #000000',
    overflow: 'hidden',
  },
  header: {
    backgroundColor: '#000000',
    color: '#ffffff',
    padding: '32px 24px',
    textAlign: 'center',
  },
  logoText: {
    fontSize: '36px',
    fontWeight: 'bold',
    margin: 0,
    marginBottom: '4px',
  },
  logoTagline: {
    fontSize: '16px',
    margin: 0,
    opacity: 0.8,
    marginBottom: '12px',
  },
  headerDescription: {
    fontSize: '14px',
    margin: 0,
    opacity: 0.7,
  },
  tabContainer: {
    display: 'flex',
    borderBottom: '2px solid #000000',
  },
  tab: {
    flex: 1,
    padding: '16px',
    backgroundColor: '#ffffff',
    border: 'none',
    borderRight: '1px solid #000000',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'all 0.2s',
  },
  tabActive: {
    backgroundColor: '#000000',
    color: '#ffffff',
  },
  content: {
    padding: '40px 32px',
  },
  guideHeader: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  guideIcon: {
    marginBottom: '16px',
  },
  guideTitle: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: '12px',
    margin: 0,
    marginBottom: '12px',
  },
  guideSubtitle: {
    fontSize: '16px',
    color: '#666666',
    lineHeight: '1.6',
    margin: 0,
  },
  step: {
    display: 'flex',
    gap: '20px',
    marginBottom: '32px',
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: '40px',
    height: '40px',
    backgroundColor: '#000000',
    color: '#ffffff',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    fontWeight: 'bold',
    flexShrink: 0,
  },
  stepContent: {
    flex: 1,
  },
  stepHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '12px',
  },
  stepIcon: {
    flexShrink: 0,
  },
  stepTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#000000',
    margin: 0,
  },
  stepDescription: {
    fontSize: '15px',
    color: '#333333',
    lineHeight: '1.7',
    marginBottom: '16px',
  },
  exampleBox: {
    backgroundColor: '#f5f5f5',
    border: '2px solid #000000',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px',
  },
  exampleLabel: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#666666',
    margin: 0,
    marginBottom: '8px',
  },
  exampleText: {
    fontSize: '14px',
    color: '#000000',
    margin: 0,
    marginBottom: '4px',
  },
  otpExample: {
    fontSize: '24px',
    fontWeight: 'bold',
    letterSpacing: '12px',
    color: '#000000',
    margin: 0,
    textAlign: 'center',
  },
  bulletList: {
    fontSize: '14px',
    color: '#333333',
    lineHeight: '1.8',
    paddingLeft: '20px',
    margin: 0,
  },
  infoBox: {
    backgroundColor: '#e3f2fd',
    border: '2px solid #000000',
    borderRadius: '8px',
    padding: '12px 16px',
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-start',
    marginTop: '16px',
  },
  infoText: {
    fontSize: '14px',
    color: '#000000',
    margin: 0,
    lineHeight: '1.6',
  },
  successBox: {
    backgroundColor: '#e8f5e9',
    border: '2px solid #000000',
    borderRadius: '8px',
    padding: '12px 16px',
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    marginTop: '16px',
  },
  successText: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#000000',
    margin: 0,
  },
  troubleshootSection: {
    marginTop: '40px',
    padding: '24px',
    backgroundColor: '#f9f9f9',
    border: '2px solid #000000',
    borderRadius: '8px',
  },
  troubleshootTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#000000',
    marginBottom: '16px',
    margin: 0,
    marginBottom: '16px',
  },
  troubleshootBox: {
    marginBottom: '16px',
  },
  troubleshootQuestion: {
    fontSize: '15px',
    color: '#000000',
    marginBottom: '8px',
  },
  troubleshootAnswer: {
    fontSize: '14px',
    color: '#666666',
    lineHeight: '1.8',
    margin: 0,
  },
  dangerBox: {
    backgroundColor: '#ffebee',
    border: '2px solid #d32f2f',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '32px',
    display: 'flex',
    gap: '16px',
    alignItems: 'flex-start',
  },
  dangerBoxTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#d32f2f',
    margin: 0,
    marginBottom: '8px',
  },
  dangerBoxText: {
    fontSize: '14px',
    color: '#000000',
    lineHeight: '1.6',
    margin: 0,
  },
  deletionInfoBox: {
    backgroundColor: '#fff3e0',
    border: '2px solid #000000',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '32px',
  },
  deletionInfoTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#000000',
    margin: 0,
    marginBottom: '12px',
  },
  deletionList: {
    fontSize: '15px',
    color: '#000000',
    lineHeight: '2',
    paddingLeft: '20px',
    margin: 0,
  },
  finalBox: {
    backgroundColor: '#f5f5f5',
    border: '2px solid #000000',
    borderRadius: '8px',
    padding: '16px',
    marginTop: '16px',
  },
  finalText: {
    fontSize: '14px',
    color: '#000000',
    fontWeight: '500',
    margin: 0,
    textAlign: 'center',
  },
  alternativeSection: {
    marginTop: '40px',
    padding: '24px',
    backgroundColor: '#e8f5e9',
    border: '2px solid #000000',
    borderRadius: '8px',
  },
  alternativeTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#000000',
    margin: 0,
    marginBottom: '12px',
  },
  alternativeText: {
    fontSize: '15px',
    color: '#333333',
    marginBottom: '12px',
  },
  footer: {
    padding: '24px',
    borderTop: '2px solid #000000',
    textAlign: 'center',
    backgroundColor: '#f5f5f5',
  },
  footerText: {
    fontSize: '14px',
    color: '#333333',
    margin: 0,
    marginBottom: '8px',
  },
  copyright: {
    fontSize: '12px',
    color: '#666666',
    margin: 0,
  },
};

export default App;