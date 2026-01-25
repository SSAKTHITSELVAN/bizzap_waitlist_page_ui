import React, { useState, useEffect } from 'react';
import { 
  Users, TrendingUp, Activity, Search, Eye, 
  BarChart3, PieChart, Clock, Zap, Target, Smartphone,
  MapPin, Calendar, ArrowUpRight, CheckCircle2, AlertCircle, ChevronDown, ChevronUp
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area
} from 'recharts';

// --- API CONFIGURATION ---
const API_BASE = 'https://api.bizzap.app';
const ENDPOINTS = {
  // 1. BUSINESS ANALYTICS
  COMPANIES: `${API_BASE}/admin/companies`,
  SIGNUPS_DAILY: `${API_BASE}/admin/companies/analytics/signups/daily`,
  SIGNUPS_SUMMARY: `${API_BASE}/admin/companies/analytics/signups/summary`,
  METRICS_ACTIVE: `${API_BASE}/admin/companies/metrics/active-users`,
  PROFILE_COMPLETION: (id) => `${API_BASE}/admin/companies/${id}/profile-completion`,

  // 2. APP USAGE ANALYTICS (Previous Turn)
  SCREENS: `${API_BASE}/analytics/dashboard/screens`,
  LIVE_USERS: `${API_BASE}/analytics/dashboard/active-users`,
  ENGAGEMENT: `${API_BASE}/analytics/dashboard/user-engagement`,
  LIVE_DISTRIBUTION: `${API_BASE}/analytics/dashboard/live-distribution`,
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('growth'); // growth | usage | companies
  const [loading, setLoading] = useState(true);
  
  // --- STATE: Business Data ---
  const [companies, setCompanies] = useState([]);
  const [signupStats, setSignupStats] = useState({ breakdown: [], total: 0 });
  const [signupSummary, setSignupSummary] = useState(null);
  const [userMetrics, setUserMetrics] = useState(null);

  // --- STATE: App Usage Data ---
  const [screenStats, setScreenStats] = useState([]);
  const [liveUsers, setLiveUsers] = useState([]);
  const [liveDistribution, setLiveDistribution] = useState([]);
  const [engagement, setEngagement] = useState([]);

  // --- STATE: Filters ---
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().split('T')[0], // Last 7 days
    end: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchInitialData();
  }, []);

  // Re-fetch date dependent data when range changes
  useEffect(() => {
    fetchDateDependentData();
  }, [dateRange]);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Static/Live Data
      const [compRes, sumRes, metRes, screenRes, liveRes, distRes, engRes] = await Promise.all([
        fetch(ENDPOINTS.COMPANIES),
        fetch(ENDPOINTS.SIGNUPS_SUMMARY),
        fetch(ENDPOINTS.METRICS_ACTIVE),
        fetch(ENDPOINTS.SCREENS),
        fetch(ENDPOINTS.LIVE_USERS),
        fetch(ENDPOINTS.LIVE_DISTRIBUTION),
        fetch(`${ENDPOINTS.ENGAGEMENT}?period=week`)
      ]);

      const [comps, summary, metrics, screens, live, dist, eng] = await Promise.all([
        compRes.json(), sumRes.json(), metRes.json(), screenRes.json(), liveRes.json(), distRes.json(), engRes.json()
      ]);

      setCompanies(comps.data || []);
      setSignupSummary(summary.data);
      setUserMetrics(metrics.data);
      setScreenStats(screens);
      setLiveUsers(live);
      setLiveDistribution(dist);
      setEngagement(eng);

      await fetchDateDependentData();
    } catch (error) {
      console.error("Init failed", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDateDependentData = async () => {
    try {
      const url = `${ENDPOINTS.SIGNUPS_DAILY}?startDate=${dateRange.start}&endDate=${dateRange.end}`;
      const res = await fetch(url);
      const data = await res.json();
      setSignupStats({
        breakdown: data.data.dailyBreakdown || [],
        total: data.data.totalSignups
      });
    } catch (error) {
      console.error("Date fetch failed", error);
    }
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-[#020618] text-slate-300 font-sans">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Global Date Picker (Visible on Growth & Companies tabs) */}
        {activeTab !== 'usage' && (
          <DateFilterBar dateRange={dateRange} setDateRange={setDateRange} />
        )}

        {activeTab === 'growth' && (
          <GrowthTab 
            signupStats={signupStats} 
            summary={signupSummary} 
            metrics={userMetrics} 
          />
        )}

        {activeTab === 'usage' && (
          <UsageTab 
            screenStats={screenStats}
            liveUsers={liveUsers}
            liveDistribution={liveDistribution}
            engagement={engagement}
          />
        )}

        {activeTab === 'companies' && (
          <CompaniesTab companies={companies} />
        )}
      </main>
    </div>
  );
}

// ============================================================================
// 📈 TAB 1: BUSINESS GROWTH (Signups & Active Users)
// ============================================================================
function GrowthTab({ signupStats, summary, metrics }) {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KpiCard 
          label="Daily Active Users" 
          value={metrics?.dailyActiveUsers || 0} 
          icon={<Users size={20} />} 
          trend="Live" 
          color="blue" 
        />
        <KpiCard 
          label="Weekly Active Users" 
          value={metrics?.weeklyActiveUsers || 0} 
          icon={<Activity size={20} />} 
          color="purple" 
        />
        <KpiCard 
          label="Signups (Period)" 
          value={signupStats.total} 
          icon={<Target size={20} />} 
          color="emerald" 
        />
        <KpiCard 
          label="Total Companies" 
          value={summary?.allTime?.count || 0} 
          icon={<Target size={20} />} 
          color="amber" 
          sub={`+${summary?.today?.count || 0} today`}
        />
      </div>

      {/* Main Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <TrendingUp size={20} className="text-emerald-500" /> User Acquisition
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={signupStats.breakdown}>
                <defs>
                  <linearGradient id="colorSignups" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="date" stroke="#64748b" tick={{fontSize: 12}} />
                <YAxis stroke="#64748b" tick={{fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="count" stroke="#10b981" fillOpacity={1} fill="url(#colorSignups)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Growth Summary Box */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Growth Rate</h3>
          <div className="space-y-4">
            <GrowthRow label="Today" data={summary?.today} />
            <GrowthRow label="This Week" data={summary?.thisWeek} />
            <GrowthRow label="This Month" data={summary?.thisMonth} />
            <GrowthRow label="This Year" data={summary?.thisYear} />
          </div>
        </div>
      </div>
    </div>
  );
}

function GrowthRow({ label, data }) {
  return (
    <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
      <span className="text-sm font-medium text-slate-400">{label}</span>
      <div className="text-right">
        <div className="text-xl font-bold text-white">{data?.count || 0}</div>
        <div className={`text-xs font-bold ${data?.growthPercent >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
          {data?.growthPercent > 0 ? '+' : ''}{data?.growthPercent}%
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 📱 TAB 2: APP USAGE (Screens & Heatmaps)
// ============================================================================
function UsageTab({ screenStats, liveUsers, liveDistribution, engagement }) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Active Users */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <Activity className="text-blue-500 animate-pulse" /> Live Now
          </h3>
          <div className="text-5xl font-bold text-white mb-6">{liveUsers.length}</div>
          <div className="space-y-2">
            {liveUsers.slice(0, 5).map((u, i) => (
              <div key={i} className="flex justify-between items-center text-sm p-2 bg-slate-800/50 rounded">
                <span className="text-slate-300 truncate max-w-[150px]">{u.companyName}</span>
                <span className="text-blue-400 text-xs">{u.screenName}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Screen Heatmap */}
        <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-6">Screen Popularity</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={screenStats} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis type="number" stroke="#64748b" />
                <YAxis dataKey="screenName" type="category" width={100} stroke="#cbd5e1" tick={{fontSize: 11}} />
                <Tooltip cursor={{fill: '#1e293b'}} contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                <Bar dataKey="visitCount" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Power Users Table */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-slate-800">
           <h3 className="font-bold text-white">Top Power Users (Weekly)</h3>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-950 text-slate-500 uppercase text-xs">
            <tr>
              <th className="p-4">User / Company</th>
              <th className="p-4">Total Time</th>
              <th className="p-4">Peak Hour</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {engagement.map((user, i) => (
              <tr key={i} className="hover:bg-slate-800/30">
                <td className="p-4 font-medium text-white">{user.companyName}</td>
                <td className="p-4 text-emerald-400 font-bold">{user.totalMinutes}m</td>
                <td className="p-4 text-slate-400">{user.peakTimeRange}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============================================================================
// 🏢 TAB 3: COMPANIES MANAGEMENT
// ============================================================================
function CompaniesTab({ companies }) {
  const [expandedId, setExpandedId] = useState(null);
  const [completionData, setCompletionData] = useState({});

  const toggleExpand = async (id) => {
    if (expandedId === id) {
      setExpandedId(null);
      return;
    }
    setExpandedId(id);
    // Fetch profile completion only if not already fetched
    if (!completionData[id]) {
      try {
        const res = await fetch(ENDPOINTS.PROFILE_COMPLETION(id));
        const data = await res.json();
        setCompletionData(prev => ({ ...prev, [id]: data.data.completionPercentage }));
      } catch (err) {
        console.error("Failed to fetch completion", err);
      }
    }
  };

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden animate-fade-in">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-950 text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="p-4">Company</th>
              <th className="p-4">Contact</th>
              <th className="p-4">Quota (Used/Total)</th>
              <th className="p-4">Joined</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {companies.map((comp) => (
              <React.Fragment key={comp.id}>
                <tr className={`hover:bg-slate-800/30 transition-colors ${expandedId === comp.id ? 'bg-slate-800/30' : ''}`}>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-xs font-bold text-blue-500 uppercase">
                        {comp.companyName.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm">{comp.companyName}</div>
                        <div className="text-[10px] text-slate-500">{comp.category || 'Uncategorized'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-slate-300">{comp.phoneNumber}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{comp.gstNumber}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-500" 
                          style={{ width: `${(comp.consumedLeads / comp.leadQuota) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs font-mono text-slate-400">{comp.consumedLeads}/{comp.leadQuota}</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-slate-400">
                    {new Date(comp.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => toggleExpand(comp.id)}
                      className="p-1 hover:bg-slate-700 rounded text-slate-400"
                    >
                      {expandedId === comp.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                  </td>
                </tr>
                {/* EXPANDED ROW DETAILS */}
                {expandedId === comp.id && (
                  <tr className="bg-slate-900/80">
                    <td colSpan={5} className="p-4 border-b border-slate-800">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* 1. Profile Completion */}
                        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                          <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Profile Health</h4>
                          <div className="flex items-center gap-4">
                            <div className="relative w-12 h-12 flex items-center justify-center">
                              <svg className="w-full h-full transform -rotate-90">
                                <circle cx="24" cy="24" r="20" stroke="#1e293b" strokeWidth="4" fill="transparent" />
                                <circle cx="24" cy="24" r="20" stroke="#3b82f6" strokeWidth="4" fill="transparent" 
                                  strokeDasharray={125.6} 
                                  strokeDashoffset={125.6 - (125.6 * (completionData[comp.id] || 0)) / 100} 
                                />
                              </svg>
                              <span className="absolute text-[10px] font-bold text-white">{Math.round(completionData[comp.id] || 0)}%</span>
                            </div>
                            <div className="text-xs text-slate-400">
                              <div>Referral Code: <span className="text-emerald-400 font-mono">{comp.referralCode}</span></div>
                              <div>Leads Posted: <span className="text-white">{comp.postedLeads}</span></div>
                            </div>
                          </div>
                        </div>

                        {/* 2. Recent Activity (Leads) */}
                        <div className="md:col-span-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
                          <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Recent Requirements</h4>
                          {comp.leads && comp.leads.length > 0 ? (
                            <div className="space-y-2">
                              {comp.leads.slice(0, 2).map(lead => (
                                <div key={lead.id} className="flex justify-between items-center text-xs bg-slate-900 p-2 rounded border border-slate-800">
                                  <span className="text-white font-medium">{lead.title}</span>
                                  <span className="text-slate-500">{lead.quantity} • {lead.location}</span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-xs text-slate-600 italic">No requirements posted yet.</div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============================================================================
// 🧩 SHARED COMPONENTS
// ============================================================================

function Header({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'growth', label: 'Business Growth', icon: TrendingUp },
    { id: 'usage', label: 'App Usage', icon: Smartphone },
    { id: 'companies', label: 'Companies', icon: checkTab => <CheckCircle2 size={16} /> }, 
  ];

  return (
    <div className="sticky top-0 z-50 bg-[#020618]/90 backdrop-blur border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Zap className="text-white w-5 h-5" fill="currentColor" />
          </div>
          <span className="font-bold text-lg text-white tracking-tight">Bizzap<span className="text-blue-500">Admin</span></span>
        </div>
        
        <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === t.id ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function DateFilterBar({ dateRange, setDateRange }) {
  const setPreset = (days) => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - days);
    setDateRange({
      start: start.toISOString().split('T')[0],
      end: end.toISOString().split('T')[0]
    });
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-slate-900/30 p-4 rounded-xl border border-slate-800/50">
      <div className="flex items-center gap-2 text-sm text-slate-400">
        <Calendar size={16} />
        <span className="font-semibold text-slate-300">Analytics Period</span>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-lg border border-slate-800">
          <input 
            type="date" 
            value={dateRange.start}
            onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
            className="bg-transparent text-white text-xs px-2 py-1 outline-none"
          />
          <span className="text-slate-600">-</span>
          <input 
            type="date" 
            value={dateRange.end}
            onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
            className="bg-transparent text-white text-xs px-2 py-1 outline-none"
          />
        </div>
        
        <div className="flex gap-1">
          <button onClick={() => setPreset(0)} className="px-3 py-1.5 text-xs font-medium bg-slate-800 text-slate-300 rounded hover:bg-slate-700">Today</button>
          <button onClick={() => setPreset(7)} className="px-3 py-1.5 text-xs font-medium bg-slate-800 text-slate-300 rounded hover:bg-slate-700">Week</button>
          <button onClick={() => setPreset(30)} className="px-3 py-1.5 text-xs font-medium bg-slate-800 text-slate-300 rounded hover:bg-slate-700">Month</button>
        </div>
      </div>
    </div>
  );
}

function KpiCard({ label, value, icon, color, sub, trend }) {
  const colors = {
    blue: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    purple: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
    emerald: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    amber: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
  };

  return (
    <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-2xl hover:border-slate-700 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${colors[color]}`}>
          {icon}
        </div>
        {trend && <span className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-bold uppercase animate-pulse">{trend}</span>}
      </div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</div>
      {sub && <div className="text-[10px] text-emerald-400 mt-2 font-medium">{sub}</div>}
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-[#020618] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <div className="text-slate-500 font-mono text-sm animate-pulse">Initializing Dashboard...</div>
      </div>
    </div>
  );
}