import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, MapPin, AlertTriangle, Eye, ShoppingCart, 
  BarChart3, Calendar, Activity, CheckCircle2, XCircle, Filter
} from 'lucide-react';

const API_BASE = 'https://api.bizzap.app/admin/leads';

export default function LeadAdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [summary, setSummary] = useState(null);
  const [locationData, setLocationData] = useState([]);
  const [mostViewed, setMostViewed] = useState([]);
  const [deactivated, setDeactivated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      // Fetch data from the endpoints identified in README copy.md
      const [summaryRes, locationRes, viewedRes, deactivatedRes] = await Promise.all([
        fetch(`${API_BASE}/analytics/summary`),
        fetch(`${API_BASE}/analytics/by-location`),
        fetch(`${API_BASE}/analytics/most-viewed`),
        fetch(`${API_BASE}/analytics/deactivated`)
      ]);

      const summaryData = await summaryRes.json();
      const locationData = await locationRes.json();
      const viewedData = await viewedRes.json();
      const deactivatedData = await deactivatedRes.json();

      setSummary(summaryData.data || {});
      setLocationData(locationData.data || []);
      setMostViewed(viewedData.data || []);
      setDeactivated(deactivatedData.data || []);
    } catch (error) {
      console.error('Failed to fetch lead data:', error);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading Lead Analytics...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Header */}
      <div className="bg-white/5 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Activity className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Lead Management</h1>
              <p className="text-sm text-blue-200">Analytics & Monitoring</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex gap-2 bg-white/5 backdrop-blur-lg rounded-lg p-1 w-full md:w-auto inline-flex">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
              activeTab === 'overview' ? 'bg-blue-500 text-white' : 'text-blue-200 hover:bg-white/10'
            }`}
          >
            <BarChart3 className="w-4 h-4" /> Overview
          </button>
          <button
            onClick={() => setActiveTab('issues')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
              activeTab === 'issues' ? 'bg-blue-500 text-white' : 'text-blue-200 hover:bg-white/10'
            }`}
          >
            <AlertTriangle className="w-4 h-4" /> Deactivated Leads
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 pb-12 space-y-6">
        
        {/* Summary Metrics (Always Visible or part of Overview) */}
        {activeTab === 'overview' && (
          <>
            <div className="grid md:grid-cols-4 gap-6">
              <MetricCard 
                icon={<Activity className="w-6 h-6" />}
                label="Total Leads"
                value={summary.totalLeads || 0}
                color="blue"
              />
              <MetricCard 
                icon={<CheckCircle2 className="w-6 h-6" />}
                label="Active Leads"
                value={summary.activeLeads || 0}
                color="green"
              />
              <MetricCard 
                icon={<ShoppingCart className="w-6 h-6" />}
                label="Consumed Leads"
                value={summary.consumedLeads || 0}
                color="purple"
              />
              <MetricCard 
                icon={<TrendingUp className="w-6 h-6" />}
                label="Conversion Rate"
                value={`${summary.conversionRate || 0}%`}
                color="yellow"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Geographic Breakdown */}
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  Leads by Location
                </h3>
                <div className="space-y-4">
                  {locationData.slice(0, 6).map((loc, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="font-medium">{loc._id || 'Unknown'}</div>
                      <div className="flex items-center gap-3">
                        <div className="w-32 bg-white/10 h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-blue-500 h-full rounded-full"
                            style={{ width: `${(loc.count / summary.totalLeads) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-blue-200 w-12 text-right">{loc.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Viewed Leads */}
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-purple-400" />
                  Most Viewed Leads
                </h3>
                <div className="space-y-3">
                  {mostViewed.slice(0, 5).map((lead) => (
                    <div key={lead.id} className="bg-white/5 p-3 rounded-lg flex gap-3">
                       <div className="h-10 w-10 bg-purple-500/20 rounded-lg flex items-center justify-center text-purple-300 font-bold">
                         {lead.viewCount}
                       </div>
                       <div className="flex-1 min-w-0">
                         <div className="font-medium truncate">{lead.title}</div>
                         <div className="text-xs text-blue-200">{lead.companyName} • {lead.location}</div>
                       </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Deactivated Leads Tab */}
        {activeTab === 'issues' && (
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden">
             <div className="p-6 border-b border-white/10">
               <h3 className="text-xl font-bold">Deactivated Leads Report</h3>
             </div>
             <div className="overflow-x-auto">
               <table className="w-full text-left text-sm">
                 <thead className="bg-white/5 text-blue-200">
                   <tr>
                     <th className="p-4">Lead Title</th>
                     <th className="p-4">Company</th>
                     <th className="p-4">Reason</th>
                     <th className="p-4">Date Deactivated</th>
                     <th className="p-4">Status</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-white/10">
                   {deactivated.map((lead) => (
                     <tr key={lead.id} className="hover:bg-white/5">
                       <td className="p-4 font-medium">{lead.title}</td>
                       <td className="p-4 text-blue-200">{lead.companyName}</td>
                       <td className="p-4 text-red-300">{lead.deactivationReason || 'N/A'}</td>
                       <td className="p-4">{new Date(lead.updatedAt).toLocaleDateString()}</td>
                       <td className="p-4">
                         <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded-full text-xs">
                           Deactivated
                         </span>
                       </td>
                     </tr>
                   ))}
                   {deactivated.length === 0 && (
                     <tr>
                       <td colSpan="5" className="p-8 text-center text-blue-300">
                         No deactivated leads found.
                       </td>
                     </tr>
                   )}
                 </tbody>
               </table>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Reusing your existing MetricCard design for consistency
function MetricCard({ icon, label, value, color }) {
  const colors = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    yellow: 'from-yellow-500 to-yellow-600'
  };

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
      <div className={`w-12 h-12 bg-gradient-to-br ${colors[color] || colors.blue} rounded-lg flex items-center justify-center mb-4 text-white`}>
        {icon}
      </div>
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-blue-200">{label}</div>
    </div>
  );
}