import React, { useState, useEffect } from 'react';
import { 
  Users, TrendingUp, Building2, Activity, Search, Trash2, Eye, 
  BarChart3, PieChart, Calendar, ChevronDown, ChevronUp, 
  AlertCircle, CheckCircle2, Clock, Zap, Target, ArrowRight
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart as RePieChart, Pie, Cell, Legend 
} from 'recharts';

const API_COMPANIES = 'https://api.bizzap.app/admin/companies';
const API_LEADS = 'https://api.bizzap.app/admin/leads';
const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [companies, setCompanies] = useState([]);
  const [compAnalytics, setCompAnalytics] = useState(null);
  const [leadSummary, setLeadSummary] = useState(null);
  const [companyMetrics, setCompanyMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCompany, setExpandedCompany] = useState(null);
  const [selectedCompanyData, setSelectedCompanyData] = useState(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [companiesRes, compAnalyticsRes, leadSummaryRes, companyMetricsRes] = await Promise.all([
        fetch(`${API_COMPANIES}`),
        fetch(`${API_COMPANIES}/analytics/comprehensive`),
        fetch(`${API_LEADS}/analytics/summary`),
        fetch(`${API_COMPANIES}/metrics/company-breakdown`)
      ]);

      const companiesData = await companiesRes.json();
      const compAnalyticsData = await compAnalyticsRes.json();
      const leadSummaryData = await leadSummaryRes.json();
      const companyMetricsData = await companyMetricsRes.json();

      setCompanies(companiesData.data || []);
      setCompAnalytics(compAnalyticsData.data || null);
      setLeadSummary(leadSummaryData.data || null);
      setCompanyMetrics(companyMetricsData.data || null);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
    setLoading(false);
  };

  const fetchCompanyDetails = async (companyId) => {
    try {
      const response = await fetch(`${API_COMPANIES}/${companyId}`);
      const data = await response.json();
      setSelectedCompanyData(data.data);
    } catch (error) {
      console.error('Failed to fetch company details:', error);
    }
  };

  const deleteCompany = async (companyId) => {
    if (!window.confirm('Are you sure you want to delete this company?')) return;
    try {
      await fetch(`${API_COMPANIES}/${companyId}`, { method: 'DELETE' });
      fetchAllData();
    } catch (error) {
      console.error('Failed to delete company:', error);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Activity className="w-12 h-12 text-blue-500 animate-spin" />
        <p className="text-white text-xl animate-pulse">Initializing Dashboard...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200">
      {/* Header */}
      <div className="bg-slate-900/50 backdrop-blur-xl border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="https://i.ibb.co/kgQPFY8D/Bizzap-8.png" alt="Bizzap" className="h-10 w-auto rounded-lg shadow-lg shadow-blue-500/20" />
            <div>
              <h1 className="text-xl font-bold text-white">Bizzap Admin</h1>
              <p className="text-xs text-blue-400 font-medium tracking-wider uppercase">Lead Ecosystem Control</p>
            </div>
          </div>
          <div className="flex gap-6 items-center">
            <div className="text-right">
              <div className="text-xs text-slate-400">Online Users</div>
              <div className="text-lg font-bold text-green-400 flex items-center justify-end gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                {compAnalytics?.activity?.currentOnlineUsers || 0}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex gap-2 bg-slate-900/50 p-1.5 rounded-2xl border border-slate-800">
          <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} icon={<BarChart3 size={18}/>} label="Market Overview" />
          <TabButton active={activeTab === 'companies'} onClick={() => setActiveTab('companies')} icon={<Building2 size={18}/>} label="Company Directory" />
          <TabButton active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} icon={<TrendingUp size={18}/>} label="Conversion Funnel" />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        {activeTab === 'overview' && (
          <OverviewTab analytics={compAnalytics} leads={leadSummary} metrics={companyMetrics} companies={companies} />
        )}
        {activeTab === 'companies' && (
          <CompaniesTab 
            companies={companies.filter(c => c.companyName?.toLowerCase().includes(searchTerm.toLowerCase()))}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            expandedCompany={expandedCompany}
            setExpandedCompany={setExpandedCompany}
            selectedCompany={selectedCompanyData}
            fetchDetails={fetchCompanyDetails}
            deleteCompany={deleteCompany}
          />
        )}
        {activeTab === 'analytics' && (
          <AnalyticsTab analytics={compAnalytics} metrics={companyMetrics} />
        )}
      </div>
    </div>
  );
}

function OverviewTab({ analytics, leads, metrics, companies }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard icon={<Building2 />} label="Total Companies" value={analytics?.activity?.totalRegisteredUsers} color="blue" sub="Active on platform" />
        <KpiCard icon={<Zap />} label="Market Conversion" value={leads?.conversionRate?.conversionRate} color="green" sub="Leads to consumption" />
        <KpiCard icon={<Activity />} label="Total Inventory" value={leads?.totalLeads} color="purple" sub="Posts available" />
        <KpiCard icon={<Clock />} label="Avg Session" value={analytics?.engagement?.averageSessionDuration} color="yellow" sub="Time in-app" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900/40 rounded-3xl border border-slate-800 p-6">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="text-blue-500" /> Signup Momentum
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics?.signups?.monthlyBreakdown?.reverse()}>
                <defs>
                  <linearGradient id="colorSignups" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="month" stroke="#475569" fontSize={12} />
                <YAxis stroke="#475569" fontSize={12} />
                <Tooltip contentStyle={{backgroundColor: '#0f172a', border: '1px solid #1e293b'}} />
                <Area type="monotone" dataKey="count" stroke="#3b82f6" fillOpacity={1} fill="url(#colorSignups)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900/40 rounded-3xl border border-slate-800 p-6">
          <h3 className="text-lg font-bold mb-4">Category Distribution</h3>
          <div className="space-y-4">
            {metrics?.categoryBreakdown?.slice(0, 6).map((cat, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs font-medium text-slate-400">
                  <span>{cat.category}</span>
                  <span>{cat.count}</span>
                </div>
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: `${(cat.count / companies.length) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AnalyticsTab({ analytics, metrics }) {
  const funnelData = [
    { name: 'OTP Requested', value: analytics?.conversion?.otpRequested, fill: '#3b82f6' },
    { name: 'OTP Verified', value: analytics?.conversion?.otpVerified, fill: '#8b5cf6' },
    { name: 'Registered', value: analytics?.conversion?.registered, fill: '#10b981' }
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="bg-slate-900/40 rounded-3xl border border-slate-800 p-6">
        <h3 className="text-lg font-bold mb-8 flex items-center gap-2"><Target className="text-green-500" /> Registration Funnel</h3>
        <div className="space-y-8">
          {funnelData.map((step, i) => (
            <div key={i} className="relative">
              <div className="flex justify-between items-end mb-2">
                <div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">{step.name}</div>
                  <div className="text-2xl font-bold">{step.value?.toLocaleString()}</div>
                </div>
                {i > 0 && (
                  <div className="text-green-400 text-sm font-bold bg-green-500/10 px-2 py-1 rounded">
                    {((step.value / funnelData[i-1].value) * 100).toFixed(1)}% Conversion
                  </div>
                )}
              </div>
              <div className="h-4 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${(step.value / funnelData[0].value) * 100}%`, backgroundColor: step.fill }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-900/40 rounded-3xl border border-slate-800 p-6">
        <h3 className="text-lg font-bold mb-6">User Engagement (Top 10)</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analytics?.engagement?.topActiveUsers?.slice(0, 10)} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
              <XAxis type="number" hide />
              <YAxis dataKey="companyName" type="category" stroke="#475569" fontSize={10} width={100} />
              <Tooltip contentStyle={{backgroundColor: '#0f172a', border: '1px solid #1e293b'}} />
              <Bar dataKey="sessionCount" fill="#f59e0b" radius={[0, 4, 4, 0]} label={{ position: 'right', fill: '#94a3b8', fontSize: 10 }} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function CompaniesTab({ companies, searchTerm, setSearchTerm, expandedCompany, setExpandedCompany, selectedCompany, fetchDetails, deleteCompany }) {
  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
        <input 
          type="text" placeholder="Search by name, phone or GST..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-4 pl-12 pr-6 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-white"
        />
      </div>

      <div className="grid gap-4">
        {companies.map(company => (
          <div key={company.id} className="bg-slate-900/40 rounded-2xl border border-slate-800 overflow-hidden hover:border-blue-500/30 transition-all">
            <div className="p-5 flex items-center gap-6">
              <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center font-bold text-2xl text-blue-400 border border-slate-700">
                {company.companyName?.[0]}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold truncate text-white">{company.companyName}</h3>
                <div className="flex gap-4 text-sm text-slate-400 mt-1">
                  <span>{company.phoneNumber}</span>
                  <span className="text-slate-700">•</span>
                  <span>{company.category || 'Industry Unknown'}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => { fetchDetails(company.id); setExpandedCompany(expandedCompany === company.id ? null : company.id); }}
                  className="p-2.5 bg-blue-500/10 text-blue-400 rounded-xl hover:bg-blue-500 hover:text-white transition-all"
                >
                  {expandedCompany === company.id ? <ChevronUp size={20}/> : <Eye size={20}/>}
                </button>
                <button onClick={() => deleteCompany(company.id)} className="p-2.5 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                  <Trash2 size={20}/>
                </button>
              </div>
            </div>

            {expandedCompany === company.id && selectedCompany && (
              <div className="px-5 pb-6 pt-2 grid md:grid-cols-3 gap-6 animate-in slide-in-from-top-4 duration-300">
                <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                  <p className="text-xs text-slate-500 uppercase font-bold mb-2">Internal Metrics</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span>Posts</span> <span className="text-white font-medium">{selectedCompany.postedLeads}/{selectedCompany.postingQuota}</span></div>
                    <div className="flex justify-between"><span>Lead Usage</span> <span className="text-white font-medium">{selectedCompany.consumedLeads}/{selectedCompany.leadQuota}</span></div>
                    <div className="flex justify-between"><span>Followers</span> <span className="text-white font-medium">{selectedCompany.followersCount}</span></div>
                  </div>
                </div>
                <div className="md:col-span-2 bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                  <p className="text-xs text-slate-500 uppercase font-bold mb-2">Company Information</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><span className="text-slate-500 block">GST</span><span className="text-white">{selectedCompany.gstNumber}</span></div>
                    <div><span className="text-slate-500 block">Referral Code</span><span className="text-white font-mono">{selectedCompany.referralCode}</span></div>
                    <div className="col-span-2"><span className="text-slate-500 block">Registered Address</span><span className="text-white line-clamp-1">{selectedCompany.address}</span></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function KpiCard({ icon, label, value, color, sub }) {
  const styles = {
    blue: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    green: 'bg-green-500/10 text-green-500 border-green-500/20',
    purple: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    yellow: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
  };
  return (
    <div className="bg-slate-900/40 border border-slate-800 p-5 rounded-3xl">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 border ${styles[color]}`}>{icon}</div>
      <div className="text-2xl font-bold text-white mb-1">{value || '0'}</div>
      <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</div>
      <div className="text-[10px] text-slate-600 mt-1">{sub}</div>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }) {
  return (
    <button onClick={onClick} className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${active ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
      {icon} {label}
    </button>
  );
}