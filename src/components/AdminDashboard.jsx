// import React, { useState, useEffect } from 'react';
// import { 
//   Users, TrendingUp, Activity, Search, Eye, 
//   BarChart3, PieChart, Clock, Zap, Target, Smartphone,
//   MapPin, Calendar, ArrowUpRight, CheckCircle2, AlertCircle, ChevronDown, ChevronUp,
//   UserPlus, BadgeCheck, Phone, RefreshCw
// } from 'lucide-react';
// import { 
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
//   LineChart, Line, AreaChart, Area
// } from 'recharts';

// // --- API CONFIGURATION ---
// const API_BASE = 'https://api.bizzap.app';

// // 🔑 STATIC AUTH TOKEN
// const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55SWQiOiI2OTA0NzAxZS05NDQ3LTQ2ZjktYWU4ZC1kZmE0YzUzMWFjNjAiLCJwaG9uZU51bWJlciI6Iis5MTkzNjE4MDI1NDciLCJpYXQiOjE3Njk0MTk5MDAsImV4cCI6MTc3MjAxMTkwMH0.lfsNHzO3QFwzLmb_8G9Ur9larFjz-xP3jgrc_XEExV8";

// const ENDPOINTS = {
//   // 1. BUSINESS ANALYTICS
//   COMPANIES: `${API_BASE}/admin/companies`,
//   SIGNUPS_DAILY: `${API_BASE}/admin/companies/analytics/signups/daily`,
//   SIGNUPS_SUMMARY: `${API_BASE}/admin/companies/analytics/signups/summary`,
//   METRICS_ACTIVE: `${API_BASE}/admin/companies/metrics/active-users`,
//   PROFILE_COMPLETION: (id) => `${API_BASE}/admin/companies/${id}/profile-completion`,

//   // 2. APP USAGE ANALYTICS
//   SCREENS: `${API_BASE}/analytics/dashboard/screens`,
//   LIVE_USERS: `${API_BASE}/analytics/dashboard/active-users`,
//   ENGAGEMENT: `${API_BASE}/analytics/dashboard/user-engagement`,
//   LIVE_DISTRIBUTION: `${API_BASE}/analytics/dashboard/live-distribution`,
// };

// // --- HELPER: Authenticated Fetch ---
// const authenticatedFetch = async (url) => {
//   const response = await fetch(url, {
//     method: 'GET',
//     headers: {
//       'Accept': '*/*',
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${AUTH_TOKEN}`
//     }
//   });
//   return response;
// };

// // Helper to make "APP_OPEN" look nice in the UI
// const formatScreenName = (name) => {
//   if (name === 'APP_OPEN') return '🟢 Online (Home)';
//   if (name === 'APP_CLOSE') return '🔴 Offline';
//   return name;
// };

// export default function AdminDashboard() {
//   const [activeTab, setActiveTab] = useState('growth'); // growth | signups | usage | companies
//   const [loading, setLoading] = useState(true);
//   const [isRefreshing, setIsRefreshing] = useState(false); // For background refresh
  
//   // --- STATE: Business Data ---
//   const [companies, setCompanies] = useState([]);
//   const [signupStats, setSignupStats] = useState({ breakdown: [], total: 0 });
//   const [signupSummary, setSignupSummary] = useState(null);
//   const [userMetrics, setUserMetrics] = useState(null);

//   // --- STATE: App Usage Data ---
//   const [screenStats, setScreenStats] = useState([]);
//   const [liveUsers, setLiveUsers] = useState([]);
//   const [liveDistribution, setLiveDistribution] = useState([]);
//   const [engagement, setEngagement] = useState([]);

//   // --- STATE: Filters ---
//   const [dateRange, setDateRange] = useState({
//     start: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().split('T')[0], // Last 7 days
//     end: new Date().toISOString().split('T')[0]
//   });

//   useEffect(() => {
//     fetchInitialData();

//     // 🕒 1-MINUTE POLLING FOR LIVE DATA
//     const intervalId = setInterval(() => {
//       refreshAnalytics(true); // silent refresh
//     }, 60000); // 60 seconds

//     return () => clearInterval(intervalId);
//   }, []);

//   useEffect(() => {
//     fetchDateDependentData();
//   }, [dateRange]);

//   // 1. Initial Load (Full Page Loader)
//   const fetchInitialData = async () => {
//     setLoading(true);
//     try {
//       await Promise.all([
//         fetchStaticData(),
//         fetchAnalyticsData()
//       ]);
//       await fetchDateDependentData();
//     } catch (error) {
//       console.error("Init failed", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 2. Fetch Business/Company Data (Static-ish)
//   const fetchStaticData = async () => {
//     const [compRes, sumRes, metRes] = await Promise.all([
//       authenticatedFetch(ENDPOINTS.COMPANIES),
//       authenticatedFetch(ENDPOINTS.SIGNUPS_SUMMARY),
//       authenticatedFetch(ENDPOINTS.METRICS_ACTIVE),
//     ]);

//     const [comps, summary, metrics] = await Promise.all([
//       compRes.json(), sumRes.json(), metRes.json()
//     ]);

//     const extractData = (response) => (Array.isArray(response) ? response : response?.data || []);
//     setCompanies(extractData(comps));
//     setSignupSummary(summary.data || summary || {});
//     setUserMetrics(metrics.data || metrics || {});
//   };

//   // 3. Fetch Live Analytics (Called periodically)
//   const fetchAnalyticsData = async () => {
//     const [screenRes, liveRes, distRes, engRes] = await Promise.all([
//       authenticatedFetch(ENDPOINTS.SCREENS),
//       authenticatedFetch(ENDPOINTS.LIVE_USERS),
//       authenticatedFetch(ENDPOINTS.LIVE_DISTRIBUTION),
//       authenticatedFetch(`${ENDPOINTS.ENGAGEMENT}?period=week`)
//     ]);

//     const [screens, live, dist, eng] = await Promise.all([
//       screenRes.json(), liveRes.json(), distRes.json(), engRes.json()
//     ]);

//     const extractData = (response) => (Array.isArray(response) ? response : response?.data || []);
    
//     setScreenStats(extractData(screens));
//     setLiveUsers(extractData(live));
//     setLiveDistribution(extractData(dist));
//     setEngagement(extractData(eng));
//   };

//   // Wrapper for manual/interval refresh
//   const refreshAnalytics = async (silent = false) => {
//     if (!silent) setIsRefreshing(true);
//     try {
//       await fetchAnalyticsData();
//     } catch (err) {
//       console.error("Refresh failed", err);
//     } finally {
//       if (!silent) setIsRefreshing(false);
//     }
//   };

//   const fetchDateDependentData = async () => {
//     try {
//       const url = `${ENDPOINTS.SIGNUPS_DAILY}?startDate=${dateRange.start}&endDate=${dateRange.end}`;
//       const res = await authenticatedFetch(url);
//       const data = await res.json();
//       const responseData = data.data || data;
//       setSignupStats({
//         breakdown: responseData.dailyBreakdown || [],
//         total: responseData.totalSignups || 0
//       });
//     } catch (error) {
//       console.error("Date fetch failed", error);
//     }
//   };

//   if (loading) return <LoadingScreen />;

//   return (
//     <div className="min-h-screen bg-[#020618] text-slate-300 font-sans">
//       <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
//       <main className="max-w-7xl mx-auto px-6 py-8">
//         {activeTab !== 'usage' && (
//           <DateFilterBar dateRange={dateRange} setDateRange={setDateRange} />
//         )}

//         {activeTab === 'growth' && (
//           <GrowthTab 
//             signupStats={signupStats} 
//             summary={signupSummary} 
//             metrics={userMetrics} 
//             screenStats={screenStats}
//           />
//         )}

//         {activeTab === 'signups' && (
//           <SignupsTab 
//             signupStats={signupStats} 
//             dateRange={dateRange} 
//           />
//         )}

//         {activeTab === 'usage' && (
//           <UsageTab 
//             liveUsers={liveUsers}
//             engagement={engagement}
//             onRefresh={() => refreshAnalytics(false)} // Pass manual refresh
//             isRefreshing={isRefreshing}
//           />
//         )}

//         {activeTab === 'companies' && (
//           <CompaniesTab companies={companies} />
//         )}
//       </main>
//     </div>
//   );
// }

// // ============================================================================
// // 📱 TAB 3: APP USAGE (Updated with Refresh)
// // ============================================================================
// function UsageTab({ liveUsers, engagement, onRefresh, isRefreshing }) {
//   const safeLiveUsers = Array.isArray(liveUsers) ? liveUsers : [];
//   const safeEngagement = Array.isArray(engagement) ? engagement : [];

//   return (
//     <div className="space-y-6 animate-fade-in">
//       {/* Live Active Users Banner */}
//       <div className="bg-gradient-to-r from-blue-900/40 to-slate-900/40 border border-blue-500/30 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between relative overflow-hidden group">
        
//         {/* Refresh Button Overlay */}
//         <div className="absolute top-4 right-4">
//           <button 
//             onClick={onRefresh}
//             disabled={isRefreshing}
//             className={`p-2 rounded-full bg-slate-800/50 hover:bg-slate-700 border border-slate-700 transition-all ${isRefreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
//             title="Refresh Live Data"
//           >
//             <RefreshCw size={16} className={`text-blue-400 ${isRefreshing ? 'animate-spin' : ''}`} />
//           </button>
//         </div>

//         <div>
//            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
//              <Activity className="text-blue-400 animate-pulse" /> Live Now
//            </h3>
//            <p className="text-slate-400 mt-1">Real-time active sessions (Auto-updates every 1m)</p>
//         </div>
//         <div className="mt-4 md:mt-0 text-6xl font-black text-white tracking-tighter">
//            {safeLiveUsers.length}
//         </div>
//       </div>

//       <div className="grid grid-cols-1 gap-6">
//         {/* Live User List */}
//         {safeLiveUsers.length > 0 ? (
//           <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
//             <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex justify-between items-center">
//               <span>Active Sessions</span>
//               {isRefreshing && <span className="text-xs text-blue-500 animate-pulse">Updating...</span>}
//             </h4>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {safeLiveUsers.map((u, i) => (
//                 <div key={i} className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-blue-500/30 transition-colors">
//                    {/* Status Indicator */}
//                    <div className={`w-2 h-2 rounded-full animate-pulse ${u.screenName === 'APP_OPEN' ? 'bg-emerald-500' : 'bg-blue-500'}`} />
                   
//                    <div className="overflow-hidden">
//                      <div className="text-sm font-bold text-white truncate" title={u.companyName}>{u.companyName}</div>
//                      {/* Formatted Screen Name */}
//                      <div className="text-xs text-blue-400 font-mono">
//                        {formatScreenName(u.screenName)}
//                      </div>
//                    </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ) : (
//           <div className="bg-slate-900/30 border border-slate-800 border-dashed rounded-2xl p-8 text-center">
//             <div className="text-slate-500 font-medium">No active users right now.</div>
//             <p className="text-slate-600 text-sm mt-1">Data refreshes automatically.</p>
//           </div>
//         )}

//         {/* Power Users Table */}
//         <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
//           <div className="p-4 border-b border-slate-800 flex justify-between items-center">
//              <h3 className="font-bold text-white">Top Power Users (Weekly)</h3>
//              <span className="text-xs text-slate-500">Based on usage time</span>
//           </div>
//           <table className="w-full text-left text-sm">
//             <thead className="bg-slate-950 text-slate-500 uppercase text-xs">
//               <tr>
//                 <th className="p-4">User / Company</th>
//                 <th className="p-4">Total Time</th>
//                 <th className="p-4">Peak Hour</th>
//                 <th className="p-4">Top Screen</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-800">
//               {safeEngagement.map((user, i) => {
//                  const topScreenEntry = user.screenVisits 
//                     ? Object.entries(user.screenVisits).sort((a,b) => b[1] - a[1])[0]
//                     : null;
                 
//                  const topScreenName = topScreenEntry ? topScreenEntry[0] : '-';

//                  return (
//                   <tr key={i} className="hover:bg-slate-800/30">
//                     <td className="p-4 font-medium text-white">
//                       {user.companyName}
//                       <div className="text-[10px] text-slate-500 font-mono">{user.companyId.slice(0,8)}...</div>
//                     </td>
//                     <td className="p-4 text-emerald-400 font-bold">{user.totalMinutes}m</td>
//                     <td className="p-4 text-slate-400">{user.peakTimeRange}</td>
//                     <td className="p-4 text-slate-400">{formatScreenName(topScreenName)}</td>
//                   </tr>
//                  );
//               })}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ... (Rest of components: GrowthTab, SignupsTab, CompaniesTab, Header, DateFilterBar, KpiCard, LoadingScreen remain exactly as they were in previous version) ...

// // For completeness, re-pasting the unchanged components below so the file is complete if copied:

// // ============================================================================
// // 📈 TAB 1: BUSINESS GROWTH
// // ============================================================================
// function GrowthTab({ signupStats, summary, metrics, screenStats }) {
//   return (
//     <div className="space-y-6 animate-fade-in">
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <KpiCard label="Daily Active Users" value={metrics?.dailyActiveUsers || 0} icon={<Users size={20} />} trend="Live" color="blue" />
//         <KpiCard label="Weekly Active Users" value={metrics?.weeklyActiveUsers || 0} icon={<Activity size={20} />} color="purple" />
//         <KpiCard label="Signups (Period)" value={signupStats.total} icon={<Target size={20} />} color="emerald" />
//         <KpiCard label="Total Companies" value={summary?.allTime?.count || 0} icon={<Target size={20} />} color="amber" sub={`+${summary?.today?.count || 0} today`} />
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
//           <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><TrendingUp size={20} className="text-emerald-500" /> User Acquisition Trend</h3>
//           <div className="h-[300px]">
//             <ResponsiveContainer width="100%" height="100%">
//               <AreaChart data={signupStats.breakdown}>
//                 <defs>
//                   <linearGradient id="colorSignups" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
//                     <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
//                   </linearGradient>
//                 </defs>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
//                 <XAxis dataKey="date" stroke="#64748b" tick={{fontSize: 12}} />
//                 <YAxis stroke="#64748b" tick={{fontSize: 12}} />
//                 <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }} labelStyle={{ color: '#fff' }} />
//                 <Area type="monotone" dataKey="count" stroke="#10b981" fillOpacity={1} fill="url(#colorSignups)" />
//               </AreaChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//         <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
//           <h3 className="text-lg font-bold text-white mb-4">Growth Rate</h3>
//           <div className="space-y-4">
//             <GrowthRow label="Today" data={summary?.today} />
//             <GrowthRow label="This Week" data={summary?.thisWeek} />
//             <GrowthRow label="This Month" data={summary?.thisMonth} />
//             <GrowthRow label="This Year" data={summary?.thisYear} />
//           </div>
//         </div>
//       </div>

//       <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
//         <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><Smartphone size={20} className="text-blue-500" /> Most Popular Screens</h3>
//         <div className="h-[300px]">
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart data={screenStats} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
//               <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
//               <XAxis dataKey="screenName" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
//               <YAxis yAxisId="left" stroke="#3b82f6" fontSize={12} tickLine={false} axisLine={false} />
//               <YAxis yAxisId="right" orientation="right" stroke="#10b981" fontSize={12} tickLine={false} axisLine={false} />
//               <Tooltip cursor={{fill: '#1e293b'}} contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#fff' }} />
//               <Bar yAxisId="left" dataKey="visitCount" name="Visits" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={30} />
//               <Bar yAxisId="right" dataKey="avgTimeSeconds" name="Avg Time (s)" fill="#10b981" radius={[4, 4, 0, 0]} barSize={30} />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// }

// function GrowthRow({ label, data }) {
//   return (
//     <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
//       <span className="text-sm font-medium text-slate-400">{label}</span>
//       <div className="text-right">
//         <div className="text-xl font-bold text-white">{data?.count || 0}</div>
//         <div className={`text-xs font-bold ${data?.growthPercent >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
//           {data?.growthPercent > 0 ? '+' : ''}{data?.growthPercent}%
//         </div>
//       </div>
//     </div>
//   );
// }

// // ============================================================================
// // 📋 TAB 2: SIGNUPS 
// // ============================================================================
// function SignupsTab({ signupStats, dateRange }) {
//   const hasData = signupStats.breakdown && signupStats.breakdown.length > 0;
//   return (
//     <div className="space-y-6 animate-fade-in">
//       <div className="bg-gradient-to-r from-emerald-900/40 to-slate-900/40 border border-emerald-500/30 rounded-2xl p-6 flex items-center justify-between">
//         <div>
//           <h3 className="text-2xl font-bold text-white flex items-center gap-3"><UserPlus className="text-emerald-400" /> New Registrations</h3>
//           <p className="text-slate-400 mt-1 text-sm">Showing signups from <span className="text-emerald-400 font-medium">{dateRange.start}</span> to <span className="text-emerald-400 font-medium">{dateRange.end}</span></p>
//         </div>
//         <div className="text-right">
//           <div className="text-4xl font-black text-white">{signupStats.total}</div>
//           <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Signups</div>
//         </div>
//       </div>
//       <div className="space-y-8">
//         {hasData ? (
//           signupStats.breakdown.map((dayData, index) => (
//             <div key={index} className="bg-slate-900/30 border border-slate-800 rounded-2xl overflow-hidden">
//               <div className="bg-slate-950/50 p-4 border-b border-slate-800 flex justify-between items-center">
//                 <div className="flex items-center gap-3"><Calendar size={18} className="text-blue-500" /><h4 className="font-bold text-white text-lg">{new Date(dayData.date).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</h4></div>
//                 <span className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full text-xs font-bold">{dayData.count} Signups</span>
//               </div>
//               <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {dayData.companies.map((company) => (
//                   <div key={company.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-slate-700 transition-colors">
//                     <div className="flex justify-between items-start mb-3">
//                       <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 font-bold text-lg border border-emerald-500/20">{company.companyName.charAt(0)}</div>
//                       <div className="text-[10px] text-slate-500 font-mono bg-slate-950 px-2 py-1 rounded border border-slate-800">{new Date(company.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
//                     </div>
//                     <div className="mb-3">
//                       <h5 className="font-bold text-white text-base truncate" title={company.companyName}>{company.companyName}</h5>
//                       <div className="text-xs text-blue-400 font-medium mt-1">{company.category || 'Uncategorized'}</div>
//                     </div>
//                     <div className="space-y-2 pt-3 border-t border-slate-800/50">
//                       <div className="flex items-center gap-2 text-xs text-slate-400"><Phone size={12} /><span>{company.phoneNumber}</span></div>
//                       <div className="flex items-center gap-2 text-xs text-slate-400"><BadgeCheck size={12} className="text-amber-500" /><span className="font-mono">{company.gstNumber}</span></div>
//                       <div className="flex items-center gap-2 text-xs text-slate-500"><Target size={12} /><span>Ref: <span className="text-slate-300">{company.referralCode}</span></span></div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="text-center py-20 bg-slate-900/30 rounded-2xl border border-slate-800 border-dashed">
//             <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4"><UserPlus className="text-slate-600" size={32} /></div>
//             <h3 className="text-lg font-bold text-slate-400">No Signups Found</h3>
//             <p className="text-slate-500 text-sm mt-1">Try adjusting the date range above.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // ============================================================================
// // 🏢 TAB 4: COMPANIES MANAGEMENT
// // ============================================================================
// function CompaniesTab({ companies }) {
//   const [expandedId, setExpandedId] = useState(null);
//   const [completionData, setCompletionData] = useState({});
//   const [userUsageData, setUserUsageData] = useState({});
//   const [searchTerm, setSearchTerm] = useState('');

//   const filteredCompanies = companies.filter(c => {
//     const term = searchTerm.toLowerCase();
//     return (
//       (c.companyName && c.companyName.toLowerCase().includes(term)) ||
//       (c.phoneNumber && c.phoneNumber.includes(term))
//     );
//   });

//   const toggleExpand = async (id) => {
//     if (expandedId === id) {
//       setExpandedId(null);
//       return;
//     }
//     setExpandedId(id);

//     if (!completionData[id]) {
//       try {
//         const res = await authenticatedFetch(ENDPOINTS.PROFILE_COMPLETION(id));
//         const data = await res.json();
//         const percentage = data.data ? data.data.completionPercentage : data.completionPercentage;
//         setCompletionData(prev => ({ ...prev, [id]: percentage }));
//       } catch (err) { console.error(err); }
//     }

//     if (!userUsageData[id]) {
//       try {
//         const res = await authenticatedFetch(`${ENDPOINTS.ENGAGEMENT}?period=day&userId=${id}`);
//         const data = await res.json();
//         const userData = Array.isArray(data) ? data[0] : data.data?.[0];
//         setUserUsageData(prev => ({ ...prev, [id]: userData || { totalMinutes: 0, screenVisits: {} } }));
//       } catch (err) { console.error(err); }
//     }
//   };

//   return (
//     <div className="space-y-6 animate-fade-in">
//       <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex items-center gap-3">
//         <Search className="text-slate-500" size={20} />
//         <input type="text" placeholder="Search by Company Name or Phone..." className="bg-transparent flex-1 text-white outline-none placeholder:text-slate-600" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
//         {searchTerm.length > 0 && <div className="text-xs text-slate-500 font-bold uppercase">{filteredCompanies.length} Found</div>}
//       </div>

//       <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse">
//             <thead className="bg-slate-950 text-xs uppercase tracking-wider text-slate-500">
//               <tr>
//                 <th className="p-4">Company</th>
//                 <th className="p-4">Contact</th>
//                 <th className="p-4">Quota (Used/Total)</th>
//                 <th className="p-4">Joined</th>
//                 <th className="p-4"></th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-800">
//               {filteredCompanies.map((comp) => (
//                 <React.Fragment key={comp.id}>
//                   <tr className={`hover:bg-slate-800/30 transition-colors ${expandedId === comp.id ? 'bg-slate-800/30' : ''}`}>
//                     <td className="p-4">
//                       <div className="flex items-center gap-3">
//                         <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-xs font-bold text-blue-500 uppercase">{comp.companyName ? comp.companyName.charAt(0) : '?'}</div>
//                         <div><div className="font-bold text-white text-sm">{comp.companyName}</div><div className="text-[10px] text-slate-500">{comp.category || 'Uncategorized'}</div></div>
//                       </div>
//                     </td>
//                     <td className="p-4"><div className="text-sm text-slate-300">{comp.phoneNumber}</div><div className="text-[10px] text-slate-500 font-mono">{comp.gstNumber}</div></td>
//                     <td className="p-4"><div className="flex items-center gap-2"><div className="w-16 h-2 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-emerald-500" style={{ width: `${(comp.consumedLeads / comp.leadQuota) * 100}%` }} /></div><span className="text-xs font-mono text-slate-400">{comp.consumedLeads}/{comp.leadQuota}</span></div></td>
//                     <td className="p-4 text-sm text-slate-400">{new Date(comp.createdAt).toLocaleDateString()}</td>
//                     <td className="p-4 text-right">
//                       <button onClick={() => toggleExpand(comp.id)} className="p-1 hover:bg-slate-700 rounded text-slate-400">{expandedId === comp.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</button>
//                     </td>
//                   </tr>
//                   {expandedId === comp.id && (
//                     <tr className="bg-slate-900/80 animate-in fade-in slide-in-from-top-2 duration-200">
//                       <td colSpan={5} className="p-4 border-b border-slate-800">
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                           <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
//                             <h4 className="text-xs font-bold text-slate-500 uppercase mb-4">Profile Health</h4>
//                             <div className="flex items-center gap-4">
//                               <div className="relative w-12 h-12 flex items-center justify-center">
//                                 <svg className="w-full h-full transform -rotate-90">
//                                   <circle cx="24" cy="24" r="20" stroke="#1e293b" strokeWidth="4" fill="transparent" />
//                                   <circle cx="24" cy="24" r="20" stroke="#3b82f6" strokeWidth="4" fill="transparent" strokeDasharray={125.6} strokeDashoffset={125.6 - (125.6 * (completionData[comp.id] || 0)) / 100} />
//                                 </svg>
//                                 <span className="absolute text-[10px] font-bold text-white">{Math.round(completionData[comp.id] || 0)}%</span>
//                               </div>
//                               <div className="text-xs text-slate-400"><div>Referral: <span className="text-emerald-400 font-mono">{comp.referralCode}</span></div><div>Leads Posted: <span className="text-white">{comp.postedLeads}</span></div></div>
//                             </div>
//                           </div>
//                           <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
//                             <h4 className="text-xs font-bold text-slate-500 uppercase mb-4 flex justify-between"><span>Today's Activity</span><span className="text-emerald-400">{userUsageData[comp.id]?.totalMinutes || 0}m Total</span></h4>
//                             {userUsageData[comp.id]?.screenVisits ? (
//                               <div className="space-y-2 max-h-[100px] overflow-y-auto pr-2 custom-scrollbar">
//                                 {Object.entries(userUsageData[comp.id].screenVisits).map(([screen, count], idx) => (
//                                   <div key={idx} className="flex justify-between items-center text-xs"><span className="text-slate-400">{screen}</span><div className="flex items-center gap-2"><div className="w-16 h-1 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-blue-500" style={{ width: `${Math.min(count * 5, 100)}%` }} /></div><span className="text-white font-mono">{count}</span></div></div>
//                                 ))}
//                                 {Object.keys(userUsageData[comp.id].screenVisits).length === 0 && <div className="text-xs text-slate-600 italic">No activity recorded today</div>}
//                               </div>
//                             ) : <div className="text-xs text-slate-500">Loading usage...</div>}
//                           </div>
//                           <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
//                             <h4 className="text-xs font-bold text-slate-500 uppercase mb-4">Recent Leads</h4>
//                             {comp.leads && comp.leads.length > 0 ? (
//                               <div className="space-y-2">{comp.leads.slice(0, 2).map(lead => (
//                                   <div key={lead.id} className="flex justify-between items-center text-xs bg-slate-900 p-2 rounded border border-slate-800"><span className="text-white font-medium truncate max-w-[100px]">{lead.title}</span><span className="text-slate-500">{lead.quantity} • {lead.location}</span></div>
//                                 ))}</div>
//                             ) : <div className="text-xs text-slate-600 italic">No requirements posted yet.</div>}
//                           </div>
//                         </div>
//                       </td>
//                     </tr>
//                   )}
//                 </React.Fragment>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ... Shared components (Header, DateFilterBar, KpiCard, LoadingScreen) unchanged ...
// function Header({ activeTab, setActiveTab }) {
//   const tabs = [
//     { id: 'growth', label: 'Business Growth', icon: TrendingUp },
//     { id: 'signups', label: 'Signups', icon: UserPlus }, // New Tab
//     { id: 'usage', label: 'App Usage', icon: Smartphone },
//     { id: 'companies', label: 'Companies', icon: CheckCircle2 }, 
//   ];

//   return (
//     <div className="sticky top-0 z-50 bg-[#020618]/90 backdrop-blur border-b border-slate-800">
//       <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
//         <div className="flex items-center gap-2">
//           <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
//             <Zap className="text-white w-5 h-5" fill="currentColor" />
//           </div>
//           <span className="font-bold text-lg text-white tracking-tight">Bizzap<span className="text-blue-500">Admin</span></span>
//         </div>
        
//         <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800 overflow-x-auto">
//           {tabs.map(t => (
//             <button
//               key={t.id}
//               onClick={() => setActiveTab(t.id)}
//               className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap ${
//                 activeTab === t.id ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'
//               }`}
//             >
//               <t.icon size={16} />
//               {t.label}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// function DateFilterBar({ dateRange, setDateRange }) {
//   const setPreset = (days) => {
//     const end = new Date();
//     const start = new Date();
//     start.setDate(end.getDate() - days);
//     setDateRange({
//       start: start.toISOString().split('T')[0],
//       end: end.toISOString().split('T')[0]
//     });
//   };

//   return (
//     <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-slate-900/30 p-4 rounded-xl border border-slate-800/50">
//       <div className="flex items-center gap-2 text-sm text-slate-400">
//         <Calendar size={16} />
//         <span className="font-semibold text-slate-300">Analytics Period</span>
//       </div>
      
//       <div className="flex items-center gap-4">
//         <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-lg border border-slate-800">
//           <input 
//             type="date" 
//             value={dateRange.start}
//             onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
//             className="bg-transparent text-white text-xs px-2 py-1 outline-none"
//           />
//           <span className="text-slate-600">-</span>
//           <input 
//             type="date" 
//             value={dateRange.end}
//             onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
//             className="bg-transparent text-white text-xs px-2 py-1 outline-none"
//           />
//         </div>
        
//         <div className="flex gap-1">
//           <button onClick={() => setPreset(0)} className="px-3 py-1.5 text-xs font-medium bg-slate-800 text-slate-300 rounded hover:bg-slate-700">Today</button>
//           <button onClick={() => setPreset(7)} className="px-3 py-1.5 text-xs font-medium bg-slate-800 text-slate-300 rounded hover:bg-slate-700">Week</button>
//           <button onClick={() => setPreset(30)} className="px-3 py-1.5 text-xs font-medium bg-slate-800 text-slate-300 rounded hover:bg-slate-700">Month</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function KpiCard({ label, value, icon, color, sub, trend }) {
//   const colors = {
//     blue: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
//     purple: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
//     emerald: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
//     amber: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
//   };

//   return (
//     <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-2xl hover:border-slate-700 transition-colors">
//       <div className="flex justify-between items-start mb-4">
//         <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${colors[color]}`}>
//           {icon}
//         </div>
//         {trend && <span className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-bold uppercase animate-pulse">{trend}</span>}
//       </div>
//       <div className="text-2xl font-bold text-white mb-1">{value}</div>
//       <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</div>
//       {sub && <div className="text-[10px] text-emerald-400 mt-2 font-medium">{sub}</div>}
//     </div>
//   );
// }

// function LoadingScreen() {
//   return (
//     <div className="min-h-screen bg-[#020618] flex items-center justify-center">
//       <div className="flex flex-col items-center gap-4">
//         <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
//         <div className="text-slate-500 font-mono text-sm animate-pulse">Initializing Dashboard...</div>
//       </div>
//     </div>
//   );
// }



import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Users, TrendingUp, Activity, Search, Eye, 
  BarChart3, PieChart, Clock, Zap, Target, Smartphone,
  MapPin, Calendar, ArrowUpRight, CheckCircle2, AlertCircle, ChevronDown, ChevronUp,
  UserPlus, BadgeCheck, Phone, RefreshCw, GitBranch, X, Building2,
  Package, ShoppingCart, TrendingDown, AlertTriangle, CheckCircle
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area
} from 'recharts';

// --- API CONFIGURATION ---
const API_BASE = 'https://api.bizzap.app';

// 🔑 STATIC AUTH TOKEN
const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55SWQiOiI2OTA0NzAxZS05NDQ3LTQ2ZjktYWU4ZC1kZmE0YzUzMWFjNjAiLCJwaG9uZU51bWJlciI6Iis5MTkzNjE4MDI1NDciLCJpYXQiOjE3Njk0MTk5MDAsImV4cCI6MTc3MjAxMTkwMH0.lfsNHzO3QFwzLmb_8G9Ur9larFjz-xP3jgrc_XEExV8";

const ENDPOINTS = {
  COMPANIES: `${API_BASE}/admin/companies`,
  SIGNUPS_DAILY: `${API_BASE}/admin/companies/analytics/signups/daily`,
  SIGNUPS_SUMMARY: `${API_BASE}/admin/companies/analytics/signups/summary`,
  METRICS_ACTIVE: `${API_BASE}/admin/companies/metrics/active-users`,
  PROFILE_COMPLETION: (id) => `${API_BASE}/admin/companies/${id}/profile-completion`,
  SCREENS: `${API_BASE}/analytics/dashboard/screens`,
  LIVE_USERS: `${API_BASE}/analytics/dashboard/active-users`,
  ENGAGEMENT: `${API_BASE}/analytics/dashboard/user-engagement`,
  LIVE_DISTRIBUTION: `${API_BASE}/analytics/dashboard/live-distribution`,
  FLOW_OVERVIEW: `${API_BASE}/admin/leads/flow/overview`,
};

const authenticatedFetch = async (url) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${AUTH_TOKEN}`
    }
  });
  return response;
};

const formatScreenName = (name) => {
  if (name === 'APP_OPEN') return '🟢 Online (Home)';
  if (name === 'APP_CLOSE') return '🔴 Offline';
  return name;
};

// Deal status color map
const DEAL_STATUS_CONFIG = {
  COMPLETED: { color: '#10b981', glow: 'rgba(16,185,129,0.6)', label: 'Completed', icon: '✓' },
  PENDING:   { color: '#f59e0b', glow: 'rgba(245,158,11,0.6)',  label: 'Pending',   icon: '⏳' },
  FAILED:    { color: '#ef4444', glow: 'rgba(239,68,68,0.6)',   label: 'Failed',    icon: '✗' },
  NO_RESPONSE: { color: '#6366f1', glow: 'rgba(99,102,241,0.6)', label: 'No Response', icon: '?' },
};

// ============================================================================
// 🌐 LEAD FLOW MAP — Canvas-based visual workflow
// ============================================================================

function LeadFlowTab() {
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const [flowData, setFlowData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Interaction state
  const [selectedEdge, setSelectedEdge] = useState(null);   // clicked consumption line
  const [selectedNode, setSelectedNode] = useState(null);   // clicked company node
  const [hoveredEdge, setHoveredEdge] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [tooltip, setTooltip] = useState(null);             // {x, y, content}

  // Camera / pan state
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const panRef = useRef({ x: 0, y: 0 });
  const scaleRef = useRef(1);
  const isDragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });

  // Graph nodes & edges (computed once from API data)
  const nodesRef = useRef([]);
  const edgesRef = useRef([]);
  const tickRef = useRef(0);

  // ── Fetch ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchFlow = async () => {
      try {
        setLoading(true);
        const res = await authenticatedFetch(ENDPOINTS.FLOW_OVERVIEW);
        const json = await res.json();
        const data = json.data || [];
        setFlowData(data);
        buildGraph(data);
      } catch (e) {
        setError('Failed to load flow data. Check network or API.');
      } finally {
        setLoading(false);
      }
    };
    fetchFlow();
  }, []);

  // ── Build graph nodes & edges from API payload ─────────────────────────────
  const buildGraph = (data) => {
    const W = 900, H = 640;
    const count = data.length;
    const NODE_R = 44;
    const MIN_DIST = NODE_R * 2 + 80; // guaranteed gap between any two nodes

    // ── 1. Initial grid placement ─────────────────────────────────────────
    const cols = Math.ceil(Math.sqrt(count));
    const rows = Math.ceil(count / cols);
    const padX = 130, padY = 120;
    const cellW = Math.max(MIN_DIST + 20, (W - padX * 2) / Math.max(cols - 1, 1));
    const cellH = Math.max(MIN_DIST + 20, (H - padY * 2) / Math.max(rows - 1, 1));

    const nodes = data.map((item, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const rowCount = row === rows - 1 ? count - row * cols : cols;
      const rowOffset = ((cols - rowCount) / 2) * cellW;
      const hue = (i * 67) % 360;
      return {
        id: item.company.id,
        label: item.company.companyName,
        category: item.company.category,
        x: padX + col * cellW + rowOffset,
        y: padY + row * cellH,
        vx: 0, vy: 0,
        radius: NODE_R,
        postedLeads: item.postedLeads,
        consumedLeads: item.consumedLeads,
        stats: item.stats,
        company: item.company,
        hue,
        color: `hsl(${hue}, 65%, 55%)`,
        colorA: (a) => `hsla(${hue}, 65%, 55%, ${a})`,
      };
    });

    // ── 2. Force-directed relaxation — push overlapping nodes apart ───────
    for (let iter = 0; iter < 300; iter++) {
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          let dx = b.x - a.x, dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 0.01;
          if (dist < MIN_DIST) {
            const push = (MIN_DIST - dist) / 2 + 1;
            const ux = dx / dist, uy = dy / dist;
            a.x -= ux * push; a.y -= uy * push;
            b.x += ux * push; b.y += uy * push;
          }
        }
      }
      // Keep nodes inside canvas bounds
      nodes.forEach(n => {
        n.x = Math.max(n.radius + 10, Math.min(W - n.radius - 10, n.x));
        n.y = Math.max(n.radius + 10, Math.min(H - n.radius - 30, n.y));
      });
    }

    // ── 3. Build leadId → ownerNodeId map ────────────────────────────────
    const leadOwner = {};
    data.forEach(item => {
      item.postedLeads.forEach(lead => { leadOwner[lead.id] = item.company.id; });
    });

    // ── 4. Build edges ────────────────────────────────────────────────────
    const edges = [];
    data.forEach(item => {
      item.consumedLeads.forEach(cl => {
        const fromId = item.company.id;
        const toId = leadOwner[cl.leadId];
        if (!toId || toId === fromId) return;
        edges.push({
          id: cl.consumedLeadRecordId,
          fromId,
          toId,
          dealStatus: cl.dealStatus || 'PENDING',
          leadTitle: cl.leadTitle,
          leadId: cl.leadId,
          dealValue: cl.dealValue,
          dealNotes: cl.dealNotes,
          consumedAt: cl.consumedAt,
          statusUpdatedAt: cl.statusUpdatedAt,
          consumerName: item.company.companyName,
        });
      });
    });

    // ── 5. Pre-compute bezier control points that arc AROUND other nodes ──
    edges.forEach((edge, edgeIdx) => {
      const from = nodes.find(n => n.id === edge.fromId);
      const to   = nodes.find(n => n.id === edge.toId);
      if (!from || !to) return;

      // Count sibling edges between same pair (for fanning)
      const siblings = edges.filter(e =>
        (e.fromId === edge.fromId && e.toId === edge.toId) ||
        (e.fromId === edge.toId   && e.toId === edge.fromId)
      );
      const sibIdx  = siblings.findIndex(e => e.id === edge.id);
      const fanSign = sibIdx % 2 === 0 ? 1 : -1;
      const fanMag  = Math.ceil((sibIdx + 1) / 2) * 55;

      // Mid-point
      const mx = (from.x + to.x) / 2;
      const my = (from.y + to.y) / 2;

      // Perpendicular unit vector
      const dx = to.x - from.x, dy = to.y - from.y;
      const len = Math.sqrt(dx * dx + dy * dy) || 1;
      const px = -dy / len, py = dx / len;

      // Base control point: perp offset to fan siblings apart
      let cpx = mx + px * fanMag * fanSign;
      let cpy = my + py * fanMag * fanSign;

      // Push control point further away from every OTHER node it would pass through
      const others = nodes.filter(n => n.id !== edge.fromId && n.id !== edge.toId);
      for (let attempt = 0; attempt < 8; attempt++) {
        let blocked = false;
        for (const obs of others) {
          // Does the quadratic curve come close to obs?
          // Sample 12 points along it and check proximity
          for (let t = 0.1; t < 1; t += 0.08) {
            const bt = 1 - t;
            const qx = bt * bt * from.x + 2 * bt * t * cpx + t * t * to.x;
            const qy = bt * bt * from.y + 2 * bt * t * cpy + t * t * to.y;
            const dd = Math.sqrt((qx - obs.x) ** 2 + (qy - obs.y) ** 2);
            if (dd < obs.radius + 18) {
              // Push control point away from the blocker
              const bx = cpx - obs.x, by = cpy - obs.y;
              const bl = Math.sqrt(bx * bx + by * by) || 1;
              const push = (obs.radius + 18 - dd) + 30;
              cpx += (bx / bl) * push;
              cpy += (by / bl) * push;
              blocked = true;
              break;
            }
          }
          if (blocked) break;
        }
        if (!blocked) break;
      }

      edge.cpx = cpx;
      edge.cpy = cpy;
    });

    nodesRef.current = nodes;
    edgesRef.current = edges;
  };

  // ── Canvas render loop ─────────────────────────────────────────────────────
  useEffect(() => {
    if (!flowData || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      tickRef.current++;
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);

      ctx.save();
      ctx.translate(panRef.current.x, panRef.current.y);
      ctx.scale(scaleRef.current, scaleRef.current);

      const nodes = nodesRef.current;
      const edges = edgesRef.current;

      // ── Draw edges (quadratic bezier, obstacle-aware) ──
      edges.forEach((edge) => {
        const from = nodes.find(n => n.id === edge.fromId);
        const to   = nodes.find(n => n.id === edge.toId);
        if (!from || !to || edge.cpx === undefined) return;

        const cfg        = DEAL_STATUS_CONFIG[edge.dealStatus] || DEAL_STATUS_CONFIG.PENDING;
        const isHovered  = hoveredEdge?.id === edge.id;
        const isSelected = selectedEdge?.id === edge.id;
        const isCompleted = edge.dealStatus === 'COMPLETED';
        const dashOffset  = -(tickRef.current * 0.6) % 24;

        const cpx = edge.cpx, cpy = edge.cpy;

        // ── Find the point on the bezier where it exits the FROM circle ──
        // and enters the TO circle — we sample to find t values
        const sampleBez = (t) => {
          const bt = 1 - t;
          return {
            x: bt * bt * from.x + 2 * bt * t * cpx + t * t * to.x,
            y: bt * bt * from.y + 2 * bt * t * cpy + t * t * to.y,
          };
        };

        let tStart = 0, tEnd = 1;
        for (let t = 0; t <= 1; t += 0.01) {
          const p = sampleBez(t);
          const dFrom = Math.hypot(p.x - from.x, p.y - from.y);
          if (dFrom >= from.radius) { tStart = t; break; }
        }
        for (let t = 1; t >= 0; t -= 0.01) {
          const p = sampleBez(t);
          const dTo = Math.hypot(p.x - to.x, p.y - to.y);
          if (dTo >= to.radius) { tEnd = t; break; }
        }

        const startPt = sampleBez(tStart);
        const endPt   = sampleBez(tEnd);

        // Tangent at tEnd for arrowhead direction
        const tA = Math.max(tEnd - 0.04, 0);
        const pA = sampleBez(tA);
        const arrowAngle = Math.atan2(endPt.y - pA.y, endPt.x - pA.x);
        const arrowSize  = isSelected ? 13 : isCompleted ? 12 : 9;

        // Midpoint for badge
        const midPt = sampleBez(0.5);

        // ── Draw curve ──
        ctx.shadowColor = cfg.glow;
        ctx.shadowBlur  = isCompleted
          ? (14 + 6 * Math.sin(tickRef.current * 0.05))
          : (isHovered || isSelected) ? 18 : 4;

        ctx.beginPath();
        ctx.moveTo(startPt.x, startPt.y);
        ctx.quadraticCurveTo(cpx, cpy, endPt.x, endPt.y);
        ctx.strokeStyle = cfg.color;
        ctx.lineWidth   = isSelected ? 4 : isCompleted ? 3 : isHovered ? 2.5 : 1.5;
        if (isCompleted) {
          ctx.setLineDash([]);
        } else {
          ctx.setLineDash([9, 7]);
          ctx.lineDashOffset = dashOffset;
        }
        ctx.globalAlpha = isCompleted ? 1 : isSelected ? 1 : isHovered ? 0.95 : 0.5;
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.shadowBlur  = 0;
        ctx.globalAlpha = 1;

        // ── Arrowhead at curve end ──
        ctx.beginPath();
        ctx.moveTo(endPt.x, endPt.y);
        ctx.lineTo(
          endPt.x - arrowSize * Math.cos(arrowAngle - 0.42),
          endPt.y - arrowSize * Math.sin(arrowAngle - 0.42)
        );
        ctx.lineTo(
          endPt.x - arrowSize * Math.cos(arrowAngle + 0.42),
          endPt.y - arrowSize * Math.sin(arrowAngle + 0.42)
        );
        ctx.closePath();
        ctx.fillStyle  = cfg.color;
        ctx.shadowColor = cfg.glow;
        ctx.shadowBlur  = isHovered ? 16 : isCompleted ? 12 : 4;
        ctx.fill();
        ctx.shadowBlur = 0;

        // ── Mid-badge (always for COMPLETED, hover/select for others) ──
        if (isHovered || isSelected || isCompleted) {
          ctx.beginPath();
          ctx.arc(midPt.x, midPt.y, 10, 0, Math.PI * 2);
          ctx.fillStyle = '#0f172a';
          ctx.shadowColor = cfg.glow;
          ctx.shadowBlur  = isCompleted ? 8 : 0;
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.strokeStyle = cfg.color;
          ctx.lineWidth   = 1.5;
          ctx.stroke();
          ctx.fillStyle = cfg.color;
          ctx.font = 'bold 9px monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(cfg.icon, midPt.x, midPt.y);
        }
      });

      // ── Draw nodes ──
      nodes.forEach(node => {
        const isHov = hoveredNode?.id === node.id;
        const isSel = selectedNode?.id === node.id;
        const r = node.radius;

        // Outer glow ring
        ctx.beginPath();
        ctx.arc(node.x, node.y, r + (isHov ? 8 : 4), 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(node.x, node.y, r - 2, node.x, node.y, r + 12);
        grad.addColorStop(0, node.colorA(0.33));
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fill();

        // Node circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        const bgGrad = ctx.createRadialGradient(node.x - r * 0.3, node.y - r * 0.3, 0, node.x, node.y, r);
        bgGrad.addColorStop(0, '#1e293b');
        bgGrad.addColorStop(1, '#0f172a');
        ctx.fillStyle = bgGrad;
        ctx.shadowColor = node.colorA(0.53);
        ctx.shadowBlur = isSel ? 28 : isHov ? 20 : 10;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Border
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.strokeStyle = isSel ? node.color : isHov ? node.colorA(0.8) : node.colorA(0.47);
        ctx.lineWidth = isSel ? 3 : 2;
        ctx.stroke();

        // Company initial letter
        ctx.fillStyle = node.color;
        ctx.font = `bold 18px 'Courier New', monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.label.charAt(0).toUpperCase(), node.x, node.y - 6);

        // Stats badge below initial
        ctx.fillStyle = '#94a3b8';
        ctx.font = '9px monospace';
        ctx.fillText(`${node.stats.totalPostedLeads}P · ${node.stats.totalConsumedLeads}C`, node.x, node.y + 8);

        // Name label below node
        ctx.fillStyle = isHov || isSel ? '#ffffff' : '#cbd5e1';
        ctx.font = `${isSel || isHov ? 'bold' : ''} 11px monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        const maxLabelLen = 18;
        const displayLabel = node.label.length > maxLabelLen
          ? node.label.slice(0, maxLabelLen) + '…'
          : node.label;
        ctx.fillText(displayLabel, node.x, node.y + r + 8);
      });

      ctx.restore();
      animFrameRef.current = requestAnimationFrame(draw);
    };

    animFrameRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [flowData, hoveredEdge, selectedEdge, hoveredNode, selectedNode]);

  // ── Mouse helpers ──────────────────────────────────────────────────────────
  const toWorld = useCallback((cx, cy) => {
    return {
      x: (cx - panRef.current.x) / scaleRef.current,
      y: (cy - panRef.current.y) / scaleRef.current,
    };
  }, []);

  const hitTestNode = useCallback((wx, wy) => {
    return nodesRef.current.find(n => {
      const dx = wx - n.x, dy = wy - n.y;
      return Math.sqrt(dx * dx + dy * dy) <= n.radius + 6;
    }) || null;
  }, []);

  const hitTestEdge = useCallback((wx, wy) => {
    const THRESH = 14;
    for (const edge of edgesRef.current) {
      const from = nodesRef.current.find(n => n.id === edge.fromId);
      const to   = nodesRef.current.find(n => n.id === edge.toId);
      if (!from || !to || edge.cpx === undefined) continue;
      const cpx = edge.cpx, cpy = edge.cpy;
      // Sample 20 points along the quadratic bezier
      for (let t = 0; t <= 1; t += 0.05) {
        const bt = 1 - t;
        const qx = bt * bt * from.x + 2 * bt * t * cpx + t * t * to.x;
        const qy = bt * bt * from.y + 2 * bt * t * cpy + t * t * to.y;
        if (Math.hypot(qx - wx, qy - wy) < THRESH) return edge;
      }
    }
    return null;
  }, []);

  const handleMouseMove = useCallback((e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;

    if (isDragging.current) {
      const dx = e.clientX - lastMouse.current.x;
      const dy = e.clientY - lastMouse.current.y;
      panRef.current = { x: panRef.current.x + dx, y: panRef.current.y + dy };
      setPan({ ...panRef.current });
      lastMouse.current = { x: e.clientX, y: e.clientY };
      return;
    }

    const { x: wx, y: wy } = toWorld(cx, cy);
    const node = hitTestNode(wx, wy);
    setHoveredNode(node);
    if (node) {
      setHoveredEdge(null);
      canvasRef.current.style.cursor = 'pointer';
      setTooltip({ x: cx, y: cy, type: 'node', data: node });
      return;
    }
    const edge = hitTestEdge(wx, wy);
    setHoveredEdge(edge);
    if (edge) {
      canvasRef.current.style.cursor = 'pointer';
      setTooltip({ x: cx, y: cy, type: 'edge', data: edge });
    } else {
      canvasRef.current.style.cursor = isDragging.current ? 'grabbing' : 'grab';
      setTooltip(null);
    }
  }, [toWorld, hitTestNode, hitTestEdge]);

  const handleMouseDown = useCallback((e) => {
    isDragging.current = true;
    lastMouse.current = { x: e.clientX, y: e.clientY };
    canvasRef.current.style.cursor = 'grabbing';
  }, []);

  const handleMouseUp = useCallback((e) => {
    const wasDragging = isDragging.current;
    isDragging.current = false;
    canvasRef.current.style.cursor = 'grab';

    const rect = canvasRef.current.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    const { x: wx, y: wy } = toWorld(cx, cy);
    const distMoved = Math.hypot(
      e.clientX - lastMouse.current.x,
      e.clientY - lastMouse.current.y
    );
    if (distMoved > 4) return; // was a drag, not a click

    const node = hitTestNode(wx, wy);
    if (node) { setSelectedNode(node); setSelectedEdge(null); return; }
    const edge = hitTestEdge(wx, wy);
    if (edge) { setSelectedEdge(edge); setSelectedNode(null); return; }
    setSelectedEdge(null);
    setSelectedNode(null);
  }, [toWorld, hitTestNode, hitTestEdge]);

  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.04 : 0.96;
    scaleRef.current = Math.min(3, Math.max(0.2, scaleRef.current * factor));
    setScale(scaleRef.current);
  }, []);

  const resetCamera = () => {
    panRef.current = { x: 0, y: 0 };
    scaleRef.current = 1;
    setPan({ x: 0, y: 0 });
    setScale(1);
  };

  // ── Legend data ────────────────────────────────────────────────────────────
  const legend = Object.entries(DEAL_STATUS_CONFIG);

  // ── Edge count by status ───────────────────────────────────────────────────
  const statusCounts = edgesRef.current.reduce((acc, e) => {
    acc[e.dealStatus] = (acc[e.dealStatus] || 0) + 1;
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[600px] bg-slate-900/30 rounded-2xl border border-slate-800">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-400 font-mono text-sm animate-pulse">Loading Flow Map…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[600px] bg-slate-900/30 rounded-2xl border border-red-900/40">
        <div className="text-center">
          <AlertTriangle className="text-red-500 mx-auto mb-3" size={40} />
          <p className="text-red-400 font-mono">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gradient-to-r from-violet-900/30 to-slate-900/40 border border-violet-500/20 rounded-2xl p-5">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-3">
            <GitBranch className="text-violet-400" size={22} />
            Lead Flow Map
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Visual representation of companies, their posted leads, and consumption connections.
            <span className="text-violet-300 ml-1">Click any node or line for details.</span>
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {legend.map(([status, cfg]) => (
            <div key={status} className="flex items-center gap-2 text-xs font-mono">
              <span className="w-6 h-1.5 rounded-full inline-block" style={{ background: cfg.color, boxShadow: `0 0 6px ${cfg.glow}` }} />
              <span className="text-slate-400">{cfg.label}</span>
              <span className="text-slate-600">({statusCounts[status] || 0})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Canvas + Side panel */}
      <div className="flex gap-4" style={{ height: 640 }}>
        {/* Canvas */}
        <div className="relative flex-1 bg-[#050d1a] rounded-2xl border border-slate-800 overflow-hidden">
          {/* Grid background pattern */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage: 'linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ cursor: 'grab' }}
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => { setHoveredEdge(null); setHoveredNode(null); setTooltip(null); }}
            onWheel={handleWheel}
          />

          {/* Controls */}
          <div className="absolute bottom-4 left-4 flex gap-2">
            <button onClick={resetCamera} className="px-3 py-1.5 bg-slate-800/90 text-xs text-slate-300 border border-slate-700 rounded-lg hover:bg-slate-700 font-mono transition">
              Reset View
            </button>
            <div className="px-3 py-1.5 bg-slate-800/70 text-xs text-slate-500 border border-slate-800 rounded-lg font-mono">
              Scroll to zoom · Drag to pan
            </div>
          </div>

          {/* Scale indicator */}
          <div className="absolute top-4 left-4 px-2 py-1 bg-slate-900/80 text-xs text-slate-500 rounded border border-slate-800 font-mono">
            {Math.round(scale * 100)}%
          </div>

          {/* Hover tooltip */}
          {tooltip && !selectedEdge && !selectedNode && (
            <div
              className="absolute pointer-events-none bg-slate-900/95 border border-slate-700 rounded-xl p-3 text-xs font-mono shadow-2xl z-10 max-w-[220px]"
              style={{ left: tooltip.x + 14, top: tooltip.y - 10 }}
            >
              {tooltip.type === 'node' && (
                <>
                  <div className="text-white font-bold mb-1">{tooltip.data.label}</div>
                  <div className="text-slate-400">{tooltip.data.category || 'Uncategorized'}</div>
                  <div className="flex gap-3 mt-2 pt-2 border-t border-slate-800">
                    <span className="text-blue-400">📤 {tooltip.data.stats.totalPostedLeads} Posted</span>
                    <span className="text-violet-400">📥 {tooltip.data.stats.totalConsumedLeads} Consumed</span>
                  </div>
                </>
              )}
              {tooltip.type === 'edge' && (
                <>
                  <div className="text-slate-300 mb-1 truncate">{tooltip.data.leadTitle}</div>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="w-2 h-2 rounded-full inline-block" style={{ background: DEAL_STATUS_CONFIG[tooltip.data.dealStatus]?.color }} />
                    <span style={{ color: DEAL_STATUS_CONFIG[tooltip.data.dealStatus]?.color }}>
                      {DEAL_STATUS_CONFIG[tooltip.data.dealStatus]?.label}
                    </span>
                  </div>
                  <div className="text-slate-500 mt-1">{tooltip.data.consumerName}</div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Detail panel — appears on click */}
        {(selectedNode || selectedEdge) && (
          <div className="w-80 bg-slate-900/95 border border-slate-700 rounded-2xl flex flex-col overflow-hidden animate-fade-in shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-slate-800">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400 font-mono">
                {selectedNode ? 'Company Details' : 'Consumption Details'}
              </span>
              <button onClick={() => { setSelectedNode(null); setSelectedEdge(null); }}
                className="p-1 hover:bg-slate-800 rounded-lg text-slate-500 hover:text-white transition">
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {selectedNode && <NodeDetailPanel node={selectedNode} edges={edgesRef.current} nodes={nodesRef.current} />}
              {selectedEdge && <EdgeDetailPanel edge={selectedEdge} nodes={nodesRef.current} />}
            </div>
          </div>
        )}
      </div>

      {/* Bottom: Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Companies', value: nodesRef.current.length, color: 'blue', icon: <Building2 size={16} /> },
          { label: 'Total Connections', value: edgesRef.current.length, color: 'violet', icon: <GitBranch size={16} /> },
          { label: 'Completed Deals', value: statusCounts.COMPLETED || 0, color: 'emerald', icon: <CheckCircle size={16} /> },
          { label: 'Pending Deals', value: statusCounts.PENDING || 0, color: 'amber', icon: <Clock size={16} /> },
        ].map(s => (
          <div key={s.label} className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 flex items-center gap-3">
            <div className={`text-${s.color}-400`}>{s.icon}</div>
            <div>
              <div className="text-xl font-bold text-white font-mono">{s.value}</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider">{s.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Node detail panel ─────────────────────────────────────────────────────────
function NodeDetailPanel({ node, edges, nodes }) {
  const outgoing = edges.filter(e => e.fromId === node.id); // this company consumed
  const incoming = edges.filter(e => e.toId === node.id);   // others consumed from this company

  return (
    <div className="space-y-4">
      {/* Company header */}
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold border-2 font-mono flex-shrink-0"
          style={{ borderColor: node.color, color: node.color, background: node.colorA(0.08) }}>
          {node.label.charAt(0)}
        </div>
        <div>
          <h3 className="font-bold text-white text-sm leading-tight">{node.label}</h3>
          <p className="text-xs text-slate-400 mt-0.5">{node.category || 'Uncategorized'}</p>
          <p className="text-xs text-slate-500 font-mono mt-0.5">{node.company.phoneNumber}</p>
        </div>
      </div>

      {/* Quota */}
      <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 space-y-2">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Quota Status</p>
        <div className="flex justify-between text-xs">
          <span className="text-slate-400">Lead Quota</span>
          <span className="text-white font-mono">{node.company.consumedLeadsCount} / {node.company.leadQuota}</span>
        </div>
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${Math.min(100, (node.company.consumedLeadsCount / node.company.leadQuota) * 100)}%` }} />
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-slate-400">Post Quota</span>
          <span className="text-white font-mono">{node.company.postedLeadsCount} / {node.company.postingQuota}</span>
        </div>
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.min(100, (node.company.postedLeadsCount / node.company.postingQuota) * 100)}%` }} />
        </div>
      </div>

      {/* Posted leads */}
      <div>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
          📤 Posted Leads ({node.postedLeads.length})
        </p>
        <div className="space-y-2 max-h-36 overflow-y-auto pr-1 custom-scrollbar">
          {node.postedLeads.length === 0 && <p className="text-xs text-slate-600 italic">No leads posted</p>}
          {node.postedLeads.map(lead => (
            <div key={lead.id} className="bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs">
              <div className="flex items-start justify-between gap-2">
                <span className="text-white font-medium leading-tight">{lead.title}</span>
                <span className={`flex-shrink-0 px-1.5 py-0.5 rounded text-[10px] font-bold ${lead.isActive ? 'bg-emerald-900/50 text-emerald-400' : 'bg-red-900/30 text-red-400'}`}>
                  {lead.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="text-slate-500 mt-1 flex gap-3">
                <span>👁 {lead.viewCount}</span>
                <span>📥 {lead.consumedCount}x</span>
                {lead.location && <span>📍 {lead.location}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Consumed from others */}
      <div>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
          📥 Consumed from Others ({outgoing.length})
        </p>
        <div className="space-y-2 max-h-36 overflow-y-auto pr-1 custom-scrollbar">
          {outgoing.length === 0 && <p className="text-xs text-slate-600 italic">No leads consumed yet</p>}
          {outgoing.map(edge => {
            const cfg = DEAL_STATUS_CONFIG[edge.dealStatus] || DEAL_STATUS_CONFIG.PENDING;
            const ownerNode = nodes.find(n => n.id === edge.toId);
            return (
              <div key={edge.id} className="bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs">
                <div className="text-white font-medium leading-tight">{edge.leadTitle}</div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-slate-500">from: {ownerNode?.label?.slice(0, 20) || '—'}</span>
                  <span className="font-bold text-[10px]" style={{ color: cfg.color }}>{cfg.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Deal breakdown */}
      <div className="bg-slate-950 rounded-xl p-3 border border-slate-800">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Deal Breakdown</p>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(node.stats.consumedDealBreakdown).map(([status, count]) => {
            const cfg = DEAL_STATUS_CONFIG[status];
            return (
              <div key={status} className="flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: cfg?.color }} />
                <span className="text-slate-400">{cfg?.label}</span>
                <span className="text-white font-bold ml-auto font-mono">{count}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Edge detail panel ─────────────────────────────────────────────────────────
function EdgeDetailPanel({ edge, nodes }) {
  const from = nodes.find(n => n.id === edge.fromId);
  const to = nodes.find(n => n.id === edge.toId);
  const cfg = DEAL_STATUS_CONFIG[edge.dealStatus] || DEAL_STATUS_CONFIG.PENDING;

  return (
    <div className="space-y-4">
      {/* Status badge */}
      <div className="rounded-xl p-4 border flex items-center gap-3"
        style={{ borderColor: cfg.color, background: 'rgba(0,0,0,0.3)' }}>
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold border-2"
          style={{ borderColor: cfg.color, color: cfg.color }}>
          {cfg.icon}
        </div>
        <div>
          <div className="text-white font-bold text-sm">{cfg.label}</div>
          <div className="text-xs" style={{ color: cfg.color }}>Deal Status</div>
        </div>
      </div>

      {/* Lead info */}
      <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 space-y-2">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Lead</p>
        <p className="text-white text-sm font-medium">{edge.leadTitle || 'Untitled Lead'}</p>
        <p className="text-xs text-slate-500 font-mono">{edge.leadId}</p>
      </div>

      {/* Flow: consumer → owner */}
      <div className="bg-slate-950 rounded-xl p-3 border border-slate-800">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Connection</p>
        <div className="flex items-center gap-2 text-xs">
          <div className="flex-1 bg-slate-800 rounded-lg p-2 text-center">
            <div className="text-slate-400 mb-0.5">Consumer</div>
            <div className="text-white font-bold truncate">{from?.label || '—'}</div>
          </div>
          <div className="flex flex-col items-center gap-0.5 text-[10px] font-mono" style={{ color: cfg.color }}>
            <span>consumed</span>
            <span>→</span>
          </div>
          <div className="flex-1 bg-slate-800 rounded-lg p-2 text-center">
            <div className="text-slate-400 mb-0.5">Lead Owner</div>
            <div className="text-white font-bold truncate">{to?.label || '—'}</div>
          </div>
        </div>
      </div>

      {/* Deal value */}
      {edge.dealValue && (
        <div className="bg-emerald-900/20 rounded-xl p-3 border border-emerald-800/40">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Deal Value</p>
          <p className="text-emerald-400 text-lg font-bold font-mono">
            ₹{Number(edge.dealValue).toLocaleString('en-IN')}
          </p>
        </div>
      )}

      {/* Notes */}
      {edge.dealNotes && (
        <div className="bg-slate-950 rounded-xl p-3 border border-slate-800">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Notes</p>
          <p className="text-slate-300 text-xs leading-relaxed">{edge.dealNotes}</p>
        </div>
      )}

      {/* Timestamps */}
      <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 space-y-1.5">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Timeline</p>
        {edge.consumedAt && (
          <div className="flex justify-between text-xs">
            <span className="text-slate-500">Consumed At</span>
            <span className="text-slate-300 font-mono">{new Date(edge.consumedAt).toLocaleDateString()}</span>
          </div>
        )}
        {edge.statusUpdatedAt && (
          <div className="flex justify-between text-xs">
            <span className="text-slate-500">Status Updated</span>
            <span className="text-slate-300 font-mono">{new Date(edge.statusUpdatedAt).toLocaleDateString()}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// MAIN DASHBOARD
// ============================================================================
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('growth');
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const [companies, setCompanies] = useState([]);
  const [signupStats, setSignupStats] = useState({ breakdown: [], total: 0 });
  const [signupSummary, setSignupSummary] = useState(null);
  const [userMetrics, setUserMetrics] = useState(null);
  const [screenStats, setScreenStats] = useState([]);
  const [liveUsers, setLiveUsers] = useState([]);
  const [liveDistribution, setLiveDistribution] = useState([]);
  const [engagement, setEngagement] = useState([]);

  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchInitialData();
    const intervalId = setInterval(() => { refreshAnalytics(true); }, 60000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => { fetchDateDependentData(); }, [dateRange]);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      await Promise.all([fetchStaticData(), fetchAnalyticsData()]);
      await fetchDateDependentData();
    } catch (error) { console.error("Init failed", error); }
    finally { setLoading(false); }
  };

  const fetchStaticData = async () => {
    const [compRes, sumRes, metRes] = await Promise.all([
      authenticatedFetch(ENDPOINTS.COMPANIES),
      authenticatedFetch(ENDPOINTS.SIGNUPS_SUMMARY),
      authenticatedFetch(ENDPOINTS.METRICS_ACTIVE),
    ]);
    const [comps, summary, metrics] = await Promise.all([compRes.json(), sumRes.json(), metRes.json()]);
    const extractData = (response) => (Array.isArray(response) ? response : response?.data || []);
    setCompanies(extractData(comps));
    setSignupSummary(summary.data || summary || {});
    setUserMetrics(metrics.data || metrics || {});
  };

  const fetchAnalyticsData = async () => {
    const [screenRes, liveRes, distRes, engRes] = await Promise.all([
      authenticatedFetch(ENDPOINTS.SCREENS),
      authenticatedFetch(ENDPOINTS.LIVE_USERS),
      authenticatedFetch(ENDPOINTS.LIVE_DISTRIBUTION),
      authenticatedFetch(`${ENDPOINTS.ENGAGEMENT}?period=week`)
    ]);
    const [screens, live, dist, eng] = await Promise.all([screenRes.json(), liveRes.json(), distRes.json(), engRes.json()]);
    const extractData = (response) => (Array.isArray(response) ? response : response?.data || []);
    setScreenStats(extractData(screens));
    setLiveUsers(extractData(live));
    setLiveDistribution(extractData(dist));
    setEngagement(extractData(eng));
  };

  const refreshAnalytics = async (silent = false) => {
    if (!silent) setIsRefreshing(true);
    try { await fetchAnalyticsData(); }
    catch (err) { console.error("Refresh failed", err); }
    finally { if (!silent) setIsRefreshing(false); }
  };

  const fetchDateDependentData = async () => {
    try {
      const url = `${ENDPOINTS.SIGNUPS_DAILY}?startDate=${dateRange.start}&endDate=${dateRange.end}`;
      const res = await authenticatedFetch(url);
      const data = await res.json();
      const responseData = data.data || data;
      setSignupStats({ breakdown: responseData.dailyBreakdown || [], total: responseData.totalSignups || 0 });
    } catch (error) { console.error("Date fetch failed", error); }
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-[#020618] text-slate-300 font-sans">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab !== 'usage' && activeTab !== 'flowmap' && (
          <DateFilterBar dateRange={dateRange} setDateRange={setDateRange} />
        )}

        {activeTab === 'growth' && (
          <GrowthTab signupStats={signupStats} summary={signupSummary} metrics={userMetrics} screenStats={screenStats} />
        )}
        {activeTab === 'signups' && (
          <SignupsTab signupStats={signupStats} dateRange={dateRange} />
        )}
        {activeTab === 'usage' && (
          <UsageTab liveUsers={liveUsers} engagement={engagement} onRefresh={() => refreshAnalytics(false)} isRefreshing={isRefreshing} />
        )}
        {activeTab === 'companies' && (
          <CompaniesTab companies={companies} />
        )}
        {activeTab === 'flowmap' && (
          <LeadFlowTab />
        )}
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 2px; }
        @keyframes fade-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
      `}</style>
    </div>
  );
}

// ============================================================================
// SHARED COMPONENTS (unchanged from original)
// ============================================================================
function Header({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'growth',    label: 'Business Growth', icon: TrendingUp },
    { id: 'signups',   label: 'Signups',          icon: UserPlus },
    { id: 'usage',     label: 'App Usage',        icon: Smartphone },
    { id: 'companies', label: 'Companies',         icon: CheckCircle2 },
    { id: 'flowmap',   label: 'Lead Flow Map',     icon: GitBranch },
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
        <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800 overflow-x-auto">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === t.id
                  ? t.id === 'flowmap'
                    ? 'bg-violet-900/50 text-violet-300 shadow-sm border border-violet-800/50'
                    : 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <t.icon size={16} />
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
    setDateRange({ start: start.toISOString().split('T')[0], end: end.toISOString().split('T')[0] });
  };
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-slate-900/30 p-4 rounded-xl border border-slate-800/50">
      <div className="flex items-center gap-2 text-sm text-slate-400"><Calendar size={16} /><span className="font-semibold text-slate-300">Analytics Period</span></div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-lg border border-slate-800">
          <input type="date" value={dateRange.start} onChange={(e) => setDateRange({...dateRange, start: e.target.value})} className="bg-transparent text-white text-xs px-2 py-1 outline-none" />
          <span className="text-slate-600">-</span>
          <input type="date" value={dateRange.end} onChange={(e) => setDateRange({...dateRange, end: e.target.value})} className="bg-transparent text-white text-xs px-2 py-1 outline-none" />
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
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${colors[color]}`}>{icon}</div>
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

// ── TAB: App Usage ────────────────────────────────────────────────────────────
function UsageTab({ liveUsers, engagement, onRefresh, isRefreshing }) {
  const safeLiveUsers = Array.isArray(liveUsers) ? liveUsers : [];
  const safeEngagement = Array.isArray(engagement) ? engagement : [];
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-gradient-to-r from-blue-900/40 to-slate-900/40 border border-blue-500/30 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between relative overflow-hidden group">
        <div className="absolute top-4 right-4">
          <button onClick={onRefresh} disabled={isRefreshing} className={`p-2 rounded-full bg-slate-800/50 hover:bg-slate-700 border border-slate-700 transition-all ${isRefreshing ? 'opacity-50 cursor-not-allowed' : ''}`}>
            <RefreshCw size={16} className={`text-blue-400 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white flex items-center gap-3"><Activity className="text-blue-400 animate-pulse" /> Live Now</h3>
          <p className="text-slate-400 mt-1">Real-time active sessions (Auto-updates every 1m)</p>
        </div>
        <div className="mt-4 md:mt-0 text-6xl font-black text-white tracking-tighter">{safeLiveUsers.length}</div>
      </div>
      <div className="grid grid-cols-1 gap-6">
        {safeLiveUsers.length > 0 ? (
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex justify-between items-center">
              <span>Active Sessions</span>
              {isRefreshing && <span className="text-xs text-blue-500 animate-pulse">Updating...</span>}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {safeLiveUsers.map((u, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-blue-500/30 transition-colors">
                  <div className={`w-2 h-2 rounded-full animate-pulse ${u.screenName === 'APP_OPEN' ? 'bg-emerald-500' : 'bg-blue-500'}`} />
                  <div className="overflow-hidden">
                    <div className="text-sm font-bold text-white truncate" title={u.companyName}>{u.companyName}</div>
                    <div className="text-xs text-blue-400 font-mono">{formatScreenName(u.screenName)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-slate-900/30 border border-slate-800 border-dashed rounded-2xl p-8 text-center">
            <div className="text-slate-500 font-medium">No active users right now.</div>
            <p className="text-slate-600 text-sm mt-1">Data refreshes automatically.</p>
          </div>
        )}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-slate-800 flex justify-between items-center">
            <h3 className="font-bold text-white">Top Power Users (Weekly)</h3>
            <span className="text-xs text-slate-500">Based on usage time</span>
          </div>
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-950 text-slate-500 uppercase text-xs">
              <tr><th className="p-4">User / Company</th><th className="p-4">Total Time</th><th className="p-4">Peak Hour</th><th className="p-4">Top Screen</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {safeEngagement.map((user, i) => {
                const topScreenEntry = user.screenVisits ? Object.entries(user.screenVisits).sort((a,b) => b[1] - a[1])[0] : null;
                return (
                  <tr key={i} className="hover:bg-slate-800/30">
                    <td className="p-4 font-medium text-white">{user.companyName}<div className="text-[10px] text-slate-500 font-mono">{user.companyId?.slice(0,8)}...</div></td>
                    <td className="p-4 text-emerald-400 font-bold">{user.totalMinutes}m</td>
                    <td className="p-4 text-slate-400">{user.peakTimeRange}</td>
                    <td className="p-4 text-slate-400">{formatScreenName(topScreenEntry?.[0] || '-')}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── TAB: Business Growth ──────────────────────────────────────────────────────
function GrowthTab({ signupStats, summary, metrics, screenStats }) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KpiCard label="Daily Active Users" value={metrics?.dailyActiveUsers || 0} icon={<Users size={20} />} trend="Live" color="blue" />
        <KpiCard label="Weekly Active Users" value={metrics?.weeklyActiveUsers || 0} icon={<Activity size={20} />} color="purple" />
        <KpiCard label="Signups (Period)" value={signupStats.total} icon={<Target size={20} />} color="emerald" />
        <KpiCard label="Total Companies" value={summary?.allTime?.count || 0} icon={<Target size={20} />} color="amber" sub={`+${summary?.today?.count || 0} today`} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><TrendingUp size={20} className="text-emerald-500" /> User Acquisition Trend</h3>
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
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }} labelStyle={{ color: '#fff' }} />
                <Area type="monotone" dataKey="count" stroke="#10b981" fillOpacity={1} fill="url(#colorSignups)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
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
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><Smartphone size={20} className="text-blue-500" /> Most Popular Screens</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={screenStats} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="screenName" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis yAxisId="left" stroke="#3b82f6" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis yAxisId="right" orientation="right" stroke="#10b981" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip cursor={{fill: '#1e293b'}} contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#fff' }} />
              <Bar yAxisId="left" dataKey="visitCount" name="Visits" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={30} />
              <Bar yAxisId="right" dataKey="avgTimeSeconds" name="Avg Time (s)" fill="#10b981" radius={[4, 4, 0, 0]} barSize={30} />
            </BarChart>
          </ResponsiveContainer>
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

// ── TAB: Signups ──────────────────────────────────────────────────────────────
function SignupsTab({ signupStats, dateRange }) {
  const hasData = signupStats.breakdown && signupStats.breakdown.length > 0;
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-gradient-to-r from-emerald-900/40 to-slate-900/40 border border-emerald-500/30 rounded-2xl p-6 flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-white flex items-center gap-3"><UserPlus className="text-emerald-400" /> New Registrations</h3>
          <p className="text-slate-400 mt-1 text-sm">Showing signups from <span className="text-emerald-400 font-medium">{dateRange.start}</span> to <span className="text-emerald-400 font-medium">{dateRange.end}</span></p>
        </div>
        <div className="text-right">
          <div className="text-4xl font-black text-white">{signupStats.total}</div>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Signups</div>
        </div>
      </div>
      <div className="space-y-8">
        {hasData ? signupStats.breakdown.map((dayData, index) => (
          <div key={index} className="bg-slate-900/30 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="bg-slate-950/50 p-4 border-b border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-3"><Calendar size={18} className="text-blue-500" /><h4 className="font-bold text-white text-lg">{new Date(dayData.date).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</h4></div>
              <span className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full text-xs font-bold">{dayData.count} Signups</span>
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dayData.companies.map((company) => (
                <div key={company.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-slate-700 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 font-bold text-lg border border-emerald-500/20">{company.companyName.charAt(0)}</div>
                    <div className="text-[10px] text-slate-500 font-mono bg-slate-950 px-2 py-1 rounded border border-slate-800">{new Date(company.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                  </div>
                  <div className="mb-3">
                    <h5 className="font-bold text-white text-base truncate" title={company.companyName}>{company.companyName}</h5>
                    <div className="text-xs text-blue-400 font-medium mt-1">{company.category || 'Uncategorized'}</div>
                  </div>
                  <div className="space-y-2 pt-3 border-t border-slate-800/50">
                    <div className="flex items-center gap-2 text-xs text-slate-400"><Phone size={12} /><span>{company.phoneNumber}</span></div>
                    <div className="flex items-center gap-2 text-xs text-slate-400"><BadgeCheck size={12} className="text-amber-500" /><span className="font-mono">{company.gstNumber}</span></div>
                    <div className="flex items-center gap-2 text-xs text-slate-500"><Target size={12} /><span>Ref: <span className="text-slate-300">{company.referralCode}</span></span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )) : (
          <div className="text-center py-20 bg-slate-900/30 rounded-2xl border border-slate-800 border-dashed">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4"><UserPlus className="text-slate-600" size={32} /></div>
            <h3 className="text-lg font-bold text-slate-400">No Signups Found</h3>
            <p className="text-slate-500 text-sm mt-1">Try adjusting the date range above.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── TAB: Companies ────────────────────────────────────────────────────────────
function CompaniesTab({ companies }) {
  const [expandedId, setExpandedId] = useState(null);
  const [completionData, setCompletionData] = useState({});
  const [userUsageData, setUserUsageData] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCompanies = companies.filter(c => {
    const term = searchTerm.toLowerCase();
    return (
      (c.companyName && c.companyName.toLowerCase().includes(term)) ||
      (c.phoneNumber && c.phoneNumber.includes(term))
    );
  });

  const toggleExpand = async (id) => {
    if (expandedId === id) { setExpandedId(null); return; }
    setExpandedId(id);
    if (!completionData[id]) {
      try {
        const res = await authenticatedFetch(ENDPOINTS.PROFILE_COMPLETION(id));
        const data = await res.json();
        const percentage = data.data ? data.data.completionPercentage : data.completionPercentage;
        setCompletionData(prev => ({ ...prev, [id]: percentage }));
      } catch (err) { console.error(err); }
    }
    if (!userUsageData[id]) {
      try {
        const res = await authenticatedFetch(`${ENDPOINTS.ENGAGEMENT}?period=day&userId=${id}`);
        const data = await res.json();
        const userData = Array.isArray(data) ? data[0] : data.data?.[0];
        setUserUsageData(prev => ({ ...prev, [id]: userData || { totalMinutes: 0, screenVisits: {} } }));
      } catch (err) { console.error(err); }
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex items-center gap-3">
        <Search className="text-slate-500" size={20} />
        <input type="text" placeholder="Search by Company Name or Phone..." className="bg-transparent flex-1 text-white outline-none placeholder:text-slate-600" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        {searchTerm.length > 0 && <div className="text-xs text-slate-500 font-bold uppercase">{filteredCompanies.length} Found</div>}
      </div>
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
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
              {filteredCompanies.map((comp) => (
                <React.Fragment key={comp.id}>
                  <tr className={`hover:bg-slate-800/30 transition-colors ${expandedId === comp.id ? 'bg-slate-800/30' : ''}`}>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-xs font-bold text-blue-500 uppercase">{comp.companyName ? comp.companyName.charAt(0) : '?'}</div>
                        <div><div className="font-bold text-white text-sm">{comp.companyName}</div><div className="text-[10px] text-slate-500">{comp.category || 'Uncategorized'}</div></div>
                      </div>
                    </td>
                    <td className="p-4"><div className="text-sm text-slate-300">{comp.phoneNumber}</div><div className="text-[10px] text-slate-500 font-mono">{comp.gstNumber}</div></td>
                    <td className="p-4"><div className="flex items-center gap-2"><div className="w-16 h-2 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-emerald-500" style={{ width: `${(comp.consumedLeads / comp.leadQuota) * 100}%` }} /></div><span className="text-xs font-mono text-slate-400">{comp.consumedLeads}/{comp.leadQuota}</span></div></td>
                    <td className="p-4 text-sm text-slate-400">{new Date(comp.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 text-right">
                      <button onClick={() => toggleExpand(comp.id)} className="p-1 hover:bg-slate-700 rounded text-slate-400">{expandedId === comp.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</button>
                    </td>
                  </tr>
                  {expandedId === comp.id && (
                    <tr className="bg-slate-900/80">
                      <td colSpan={5} className="p-4 border-b border-slate-800">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                            <h4 className="text-xs font-bold text-slate-500 uppercase mb-4">Profile Health</h4>
                            <div className="flex items-center gap-4">
                              <div className="relative w-12 h-12 flex items-center justify-center">
                                <svg className="w-full h-full transform -rotate-90">
                                  <circle cx="24" cy="24" r="20" stroke="#1e293b" strokeWidth="4" fill="transparent" />
                                  <circle cx="24" cy="24" r="20" stroke="#3b82f6" strokeWidth="4" fill="transparent" strokeDasharray={125.6} strokeDashoffset={125.6 - (125.6 * (completionData[comp.id] || 0)) / 100} />
                                </svg>
                                <span className="absolute text-[10px] font-bold text-white">{Math.round(completionData[comp.id] || 0)}%</span>
                              </div>
                              <div className="text-xs text-slate-400"><div>Referral: <span className="text-emerald-400 font-mono">{comp.referralCode}</span></div><div>Leads Posted: <span className="text-white">{comp.postedLeads}</span></div></div>
                            </div>
                          </div>
                          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                            <h4 className="text-xs font-bold text-slate-500 uppercase mb-4 flex justify-between"><span>Today's Activity</span><span className="text-emerald-400">{userUsageData[comp.id]?.totalMinutes || 0}m Total</span></h4>
                            {userUsageData[comp.id]?.screenVisits ? (
                              <div className="space-y-2 max-h-[100px] overflow-y-auto pr-2">
                                {Object.entries(userUsageData[comp.id].screenVisits).map(([screen, count], idx) => (
                                  <div key={idx} className="flex justify-between items-center text-xs"><span className="text-slate-400">{screen}</span><div className="flex items-center gap-2"><div className="w-16 h-1 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-blue-500" style={{ width: `${Math.min(count * 5, 100)}%` }} /></div><span className="text-white font-mono">{count}</span></div></div>
                                ))}
                              </div>
                            ) : <div className="text-xs text-slate-500">Loading usage...</div>}
                          </div>
                          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                            <h4 className="text-xs font-bold text-slate-500 uppercase mb-4">Recent Leads</h4>
                            {comp.leads && comp.leads.length > 0 ? (
                              <div className="space-y-2">{comp.leads.slice(0, 2).map(lead => (
                                <div key={lead.id} className="flex justify-between items-center text-xs bg-slate-900 p-2 rounded border border-slate-800"><span className="text-white font-medium truncate max-w-[100px]">{lead.title}</span><span className="text-slate-500">{lead.quantity} • {lead.location}</span></div>
                              ))}</div>
                            ) : <div className="text-xs text-slate-600 italic">No requirements posted yet.</div>}
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
    </div>
  );
}