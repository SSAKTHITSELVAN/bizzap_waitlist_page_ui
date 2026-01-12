import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Package, DollarSign, X, Download, Building2, User, ExternalLink } from 'lucide-react';

export default function PublicLeadView() {
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [imageZoomed, setImageZoomed] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const leadId = urlParams.get('leadId');
    
    if (leadId) {
      fetchLead(leadId);
    } else {
      setError('No lead ID provided');
      setLoading(false);
    }
  }, []);

  const fetchLead = async (leadId) => {
    try {
      const response = await fetch(`https://api.bizzap.app/leads/public/${leadId}`);
      const data = await response.json();
      
      if (data.status === 'success') {
        setLead(data.data);
      } else {
        setError('Lead not found');
      }
    } catch (err) {
      setError('Failed to load lead');
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffMs = now.getTime() - past.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return past.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const handleDownloadApp = () => {
    window.open('https://play.google.com/apps/internaltest/4701095438570291551', '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-400 border-t-transparent"></div>
      </div>
    );
  }

  if (error || !lead) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-2xl p-8 max-w-md w-full text-center border border-gray-700">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Lead Not Found</h2>
          <p className="text-gray-400 mb-6">{error || 'This lead may have been removed or is no longer available.'}</p>
          <button
            onClick={() => window.location.href = 'https://bizzap.app'}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition"
          >
            Go to Bizzap
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <img 
            src="https://i.ibb.co/kgQPFY8D/Bizzap-8.png" 
            alt="Bizzap" 
            className="h-10 rounded-lg"
          />
          <button
            onClick={() => setShowDownloadModal(true)}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition"
          >
            <Download className="w-4 h-4" />
            Get App
          </button>
        </div>

        {/* Lead Card */}
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-2xl">
          {/* Title Section */}
          <div className="bg-gray-900/50 rounded-xl p-4 mb-6 border border-gray-700">
            <h1 className="text-white text-xl font-bold mb-3 leading-tight">
              {lead.title}
            </h1>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300 text-sm font-semibold">
                  {lead.location || 'Location not specified'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300 text-sm font-semibold">
                  {formatTimeAgo(lead.createdAt)}
                </span>
              </div>
            </div>
          </div>

          {/* Image and Stats */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setImageZoomed(true)}
              className="flex-shrink-0"
            >
              <img
                src={lead.imageUrl || 'https://via.placeholder.com/96'}
                alt={lead.title}
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-600 hover:border-blue-400 transition"
              />
            </button>

            <div className="flex-1 grid grid-cols-2 gap-3">
              <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700 text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Package className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400 text-xs font-semibold">Quantity</span>
                </div>
                <p className="text-white text-sm font-bold">
                  {lead.quantity || 'N/A'}
                </p>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700 text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400 text-xs font-semibold">Budget</span>
                </div>
                <p className="text-white text-sm font-bold">
                  {lead.budget ? `₹${lead.budget}` : 'Negotiable'}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          {lead.description && (
            <div className="bg-gray-900/50 rounded-xl p-4 mb-6 border border-gray-700">
              <h3 className="text-gray-300 text-sm font-semibold mb-2">Description</h3>
              <p className="text-white leading-relaxed">{lead.description}</p>
            </div>
          )}

          {/* Company Info */}
          {lead.company && (
            <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-4 border border-blue-700/50 mb-6">
              <div className="flex items-start gap-3">
                {lead.company.logo ? (
                  <img
                    src={lead.company.logo}
                    alt={lead.company.companyName}
                    className="w-12 h-12 rounded-lg object-cover border border-gray-600"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-white font-bold">{lead.company.companyName}</h3>
                  {lead.company.category && (
                    <p className="text-blue-300 text-sm">{lead.company.category}</p>
                  )}
                  {lead.company.userName && (
                    <div className="flex items-center gap-1 mt-1">
                      <User className="w-3 h-3 text-gray-400" />
                      <span className="text-gray-400 text-xs">{lead.company.userName}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* CTA Button */}
          <button
            onClick={() => setShowDownloadModal(true)}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition shadow-lg"
          >
            <Download className="w-5 h-5" />
            Download App to Connect
          </button>

          <p className="text-center text-gray-400 text-sm mt-4">
            🚀 Join 100+ businesses already using Bizzap
          </p>
        </div>
      </div>

      {/* Download Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-2xl p-6 max-w-md w-full border border-gray-700 relative">
            <button
              onClick={() => setShowDownloadModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-10 h-10 text-white" />
              </div>

              <h2 className="text-2xl font-bold text-white mb-3">
                Get the Bizzap App
              </h2>

              <p className="text-gray-300 mb-6 leading-relaxed">
                Download our app to connect with this buyer, access thousands of leads, 
                and grow your business!
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-left">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className="text-gray-300 text-sm">Connect with verified buyers instantly</span>
                </div>
                <div className="flex items-center gap-3 text-left">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className="text-gray-300 text-sm">Get free leads matching your business</span>
                </div>
                <div className="flex items-center gap-3 text-left">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className="text-gray-300 text-sm">Build your company profile & catalog</span>
                </div>
              </div>

              <button
                onClick={handleDownloadApp}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition shadow-lg mb-3"
              >
                <ExternalLink className="w-5 h-5" />
                Open Play Store
              </button>

              <button
                onClick={() => setShowDownloadModal(false)}
                className="text-gray-400 hover:text-white text-sm transition"
              >
                Maybe later
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Zoom Modal */}
      {imageZoomed && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center p-4 z-50">
          <button
            onClick={() => setImageZoomed(false)}
            className="absolute top-4 right-4 w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <img
            src={lead.imageUrl}
            alt={lead.title}
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
          />
        </div>
      )}
    </div>
  );
}