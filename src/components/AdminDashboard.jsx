import React, { useState, useEffect } from 'react';
import { Users, TrendingUp, Building2, Activity, Search, Trash2, Eye, BarChart3, PieChart, Calendar, ChevronDown, ChevronUp, AlertCircle, CheckCircle2 } from 'lucide-react';

const API_BASE = 'https://api.bizzap.app/admin';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [companies, setCompanies] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [activeUsers, setActiveUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [expandedCompany, setExpandedCompany] = useState(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [companiesRes, metricsRes, activeUsersRes] = await Promise.all([
        fetch(`${API_BASE}/companies`),
        fetch(`${API_BASE}/companies/metrics/company-breakdown`),
        fetch(`${API_BASE}/companies/metrics/active-users`)
      ]);

      const companiesData = await companiesRes.json();
      const metricsData = await metricsRes.json();
      const activeUsersData = await activeUsersRes.json();

      setCompanies(companiesData.data || []);
      setMetrics(metricsData.data);
      setActiveUsers(activeUsersData.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
    setLoading(false);
  };

  const fetchCompanyDetails = async (companyId) => {
    try {
      const response = await fetch(`${API_BASE}/companies/${companyId}`);
      const data = await response.json();
      setSelectedCompany(data.data);
    } catch (error) {
      console.error('Failed to fetch company details:', error);
    }
  };

  const deleteCompany = async (companyId) => {
    if (!confirm('Are you sure you want to delete this company?')) return;
    
    try {
      await fetch(`${API_BASE}/companies/${companyId}`, {
        method: 'DELETE'
      });
      fetchAllData();
      setSelectedCompany(null);
    } catch (error) {
      console.error('Failed to delete company:', error);
    }
  };

  const filteredCompanies = companies.filter(company =>
    company.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.phoneNumber?.includes(searchTerm) ||
    company.gstNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Header */}
      <div className="bg-white/5 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="https://i.ibb.co/kgQPFY8D/Bizzap-8.png" 
                alt="Bizzap" 
                className="h-10 w-auto rounded-lg"
              />
              <div>
                <h1 className="text-xl font-bold">Admin Dashboard</h1>
                <p className="text-sm text-blue-200">Manage your B2B platform</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-blue-200">Total Companies</div>
                <div className="text-2xl font-bold">{companies.length}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex gap-2 bg-white/5 backdrop-blur-lg rounded-lg p-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition ${
              activeTab === 'overview'
                ? 'bg-blue-500 text-white'
                : 'text-blue-200 hover:bg-white/10'
            }`}
          >
            <BarChart3 className="w-4 h-4 inline mr-2" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('companies')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition ${
              activeTab === 'companies'
                ? 'bg-blue-500 text-white'
                : 'text-blue-200 hover:bg-white/10'
            }`}
          >
            <Building2 className="w-4 h-4 inline mr-2" />
            Companies
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition ${
              activeTab === 'analytics'
                ? 'bg-blue-500 text-white'
                : 'text-blue-200 hover:bg-white/10'
            }`}
          >
            <TrendingUp className="w-4 h-4 inline mr-2" />
            Analytics
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        {activeTab === 'overview' && (
          <OverviewTab 
            companies={companies}
            metrics={metrics}
            activeUsers={activeUsers}
          />
        )}

        {activeTab === 'companies' && (
          <CompaniesTab
            companies={filteredCompanies}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCompany={selectedCompany}
            setSelectedCompany={setSelectedCompany}
            fetchCompanyDetails={fetchCompanyDetails}
            deleteCompany={deleteCompany}
            expandedCompany={expandedCompany}
            setExpandedCompany={setExpandedCompany}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsTab 
            companies={companies}
            metrics={metrics}
          />
        )}
      </div>
    </div>
  );
}

function OverviewTab({ companies, metrics, activeUsers }) {
  const totalLeads = companies.reduce((sum, c) => sum + (c.leads?.length || 0), 0);
  const activeLeads = companies.reduce((sum, c) => 
    sum + (c.leads?.filter(l => l.isActive).length || 0), 0
  );

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-6">
        <MetricCard
          icon={<Building2 className="w-6 h-6" />}
          label="Total Companies"
          value={metrics?.totalRegisteredCompanies || 0}
          color="blue"
        />
        <MetricCard
          icon={<Users className="w-6 h-6" />}
          label="Monthly Active Users"
          value={activeUsers?.monthlyActiveUsers || 0}
          color="green"
        />
        <MetricCard
          icon={<Activity className="w-6 h-6" />}
          label="Total Leads"
          value={totalLeads}
          color="purple"
        />
        <MetricCard
          icon={<CheckCircle2 className="w-6 h-6" />}
          label="Active Leads"
          value={activeLeads}
          color="yellow"
        />
      </div>

      {/* Profile Completion */}
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
        <h3 className="text-xl font-bold mb-4">Profile Completion Rate</h3>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="bg-white/10 rounded-full h-4 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all"
                style={{ width: `${metrics?.profileCompletionPercentage || 0}%` }}
              />
            </div>
          </div>
          <div className="text-2xl font-bold">
            {(metrics?.profileCompletionPercentage || 0).toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Recent Signups */}
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
        <h3 className="text-xl font-bold mb-4">Recent Company Signups</h3>
        <div className="space-y-3">
          {companies.slice(0, 5).map(company => (
            <div key={company.id} className="flex items-center gap-4 p-3 bg-white/5 rounded-lg">
              {company.logo ? (
                <img 
                  src={`https://bizzap-chat-files-2024.s3.ap-south-1.amazonaws.com/${company.logo}`}
                  alt={company.companyName}
                  className="w-12 h-12 rounded-lg object-cover"
                />
              ) : (
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-xl font-bold">
                  {company.companyName?.[0] || '?'}
                </div>
              )}
              <div className="flex-1">
                <div className="font-bold">{company.companyName}</div>
                <div className="text-sm text-blue-200">{company.category || 'Uncategorized'}</div>
              </div>
              <div className="text-sm text-blue-300">
                {new Date(company.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CompaniesTab({ 
  companies, 
  searchTerm, 
  setSearchTerm, 
  selectedCompany,
  setSelectedCompany,
  fetchCompanyDetails,
  deleteCompany,
  expandedCompany,
  setExpandedCompany
}) {
  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="bg-white/5 backdrop-blur-lg rounded-lg p-4 border border-white/10">
        <div className="flex items-center gap-3">
          <Search className="w-5 h-5 text-blue-300" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by company name, phone, or GST..."
            className="flex-1 bg-transparent border-none outline-none text-white placeholder-blue-300"
          />
        </div>
      </div>

      {/* Companies List */}
      <div className="space-y-4">
        {companies.map(company => (
          <div key={company.id} className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden">
            <div className="p-6">
              <div className="flex items-start gap-4">
                {company.logo ? (
                  <img 
                    src={`https://bizzap-chat-files-2024.s3.ap-south-1.amazonaws.com/${company.logo}`}
                    alt={company.companyName}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-2xl font-bold">
                    {company.companyName?.[0] || '?'}
                  </div>
                )}
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-bold">{company.companyName}</h3>
                      <p className="text-blue-200">{company.category || 'Uncategorized'}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          fetchCompanyDetails(company.id);
                          setExpandedCompany(expandedCompany === company.id ? null : company.id);
                        }}
                        className="p-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition"
                      >
                        {expandedCompany === company.id ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </button>
                      <button
                        onClick={() => deleteCompany(company.id)}
                        className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-blue-300">Phone</div>
                      <div className="font-medium">{company.phoneNumber}</div>
                    </div>
                    <div>
                      <div className="text-blue-300">GST</div>
                      <div className="font-medium">{company.gstNumber}</div>
                    </div>
                    <div>
                      <div className="text-blue-300">Leads Posted</div>
                      <div className="font-medium">{company.postedLeads} / {company.postingQuota}</div>
                    </div>
                    <div>
                      <div className="text-blue-300">Leads Consumed</div>
                      <div className="font-medium">{company.consumedLeads} / {company.leadQuota}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedCompany === company.id && selectedCompany && (
                <div className="mt-6 pt-6 border-t border-white/10">
                  <h4 className="font-bold mb-4">Company Details</h4>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <div className="text-sm text-blue-300 mb-1">User Name</div>
                      <div>{selectedCompany.userName}</div>
                    </div>
                    <div>
                      <div className="text-sm text-blue-300 mb-1">Address</div>
                      <div className="text-sm">{selectedCompany.address}</div>
                    </div>
                    <div>
                      <div className="text-sm text-blue-300 mb-1">Referral Code</div>
                      <div className="font-mono">{selectedCompany.referralCode}</div>
                    </div>
                    <div>
                      <div className="text-sm text-blue-300 mb-1">Followers</div>
                      <div>{selectedCompany.followersCount}</div>
                    </div>
                  </div>

                  {/* Leads */}
                  {selectedCompany.leads && selectedCompany.leads.length > 0 && (
                    <div>
                      <h5 className="font-bold mb-3">Posted Leads ({selectedCompany.leads.length})</h5>
                      <div className="space-y-3">
                        {selectedCompany.leads.map(lead => (
                          <div key={lead.id} className="bg-white/5 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                              {lead.imageUrl && (
                                <img 
                                  src={lead.imageUrl}
                                  alt={lead.title}
                                  className="w-20 h-20 rounded-lg object-cover"
                                />
                              )}
                              <div className="flex-1">
                                <div className="flex items-start justify-between mb-2">
                                  <div>
                                    <div className="font-bold">{lead.title}</div>
                                    <div className="text-sm text-blue-200">{lead.description}</div>
                                  </div>
                                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    lead.isActive 
                                      ? 'bg-green-500/20 text-green-400'
                                      : 'bg-red-500/20 text-red-400'
                                  }`}>
                                    {lead.isActive ? 'Active' : 'Inactive'}
                                  </div>
                                </div>
                                <div className="grid grid-cols-4 gap-3 text-sm">
                                  <div>
                                    <div className="text-blue-300">Quantity</div>
                                    <div>{lead.quantity}</div>
                                  </div>
                                  <div>
                                    <div className="text-blue-300">Budget</div>
                                    <div>{lead.budget || 'N/A'}</div>
                                  </div>
                                  <div>
                                    <div className="text-blue-300">Views</div>
                                    <div>{lead.viewCount}</div>
                                  </div>
                                  <div>
                                    <div className="text-blue-300">Consumed</div>
                                    <div>{lead.consumedCount}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalyticsTab({ companies, metrics }) {
  const categoryData = metrics?.categoryBreakdown || [];
  const monthlySignups = metrics?.newSignupsPerMonth || [];

  return (
    <div className="space-y-6">
      {/* Category Breakdown */}
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
        <h3 className="text-xl font-bold mb-6">Category Breakdown</h3>
        <div className="space-y-4">
          {categoryData.map((cat, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium">{cat.category || 'Uncategorized'}</div>
                <div className="text-blue-300">{cat.count} companies</div>
              </div>
              <div className="bg-white/10 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full"
                  style={{ 
                    width: `${(parseInt(cat.count) / companies.length) * 100}%` 
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Signups */}
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
        <h3 className="text-xl font-bold mb-6">Monthly Signups</h3>
        <div className="space-y-3">
          {monthlySignups.map((month, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-blue-400" />
                <span>{month.month}</span>
              </div>
              <span className="font-bold">{month.count} signups</span>
            </div>
          ))}
        </div>
      </div>

      {/* Lead Statistics */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-bold mb-4">Top Lead Posters</h3>
          <div className="space-y-3">
            {companies
              .sort((a, b) => b.postedLeads - a.postedLeads)
              .slice(0, 5)
              .map((company, idx) => (
                <div key={company.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center text-sm font-bold">
                      #{idx + 1}
                    </div>
                    <span className="font-medium">{company.companyName}</span>
                  </div>
                  <span className="text-blue-300">{company.postedLeads} leads</span>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-bold mb-4">Top Lead Consumers</h3>
          <div className="space-y-3">
            {companies
              .sort((a, b) => b.consumedLeads - a.consumedLeads)
              .slice(0, 5)
              .map((company, idx) => (
                <div key={company.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-sm font-bold">
                      #{idx + 1}
                    </div>
                    <span className="font-medium">{company.companyName}</span>
                  </div>
                  <span className="text-purple-300">{company.consumedLeads} consumed</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon, label, value, color }) {
  const colors = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    yellow: 'from-yellow-500 to-yellow-600'
  };

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
      <div className={`w-12 h-12 bg-gradient-to-br ${colors[color]} rounded-lg flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-blue-200">{label}</div>
    </div>
  );
}