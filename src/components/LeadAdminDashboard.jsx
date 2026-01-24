import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, MapPin, AlertTriangle, Eye, ShoppingCart, 
  BarChart3, Activity, CheckCircle2, Calendar, DollarSign,
  Users, ArrowUpRight, Filter
} from 'lucide-react';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';

const API_BASE = 'https://api.bizzap.app/admin/leads';
const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function LeadAdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [summary, setSummary] = useState({});
  const [metrics, setMetrics] = useState(null);
  const [locationData, setLocationData] = useState([]);
  const [timeData, setTimeData] = useState([]);
  const [mostViewed, setMostViewed] = useState([]);
  const [deactivated, setDeactivated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [summaryRes, metricsRes, locationRes, timeRes, viewedRes, deactivatedRes] = await Promise.all([
        fetch(`${API_BASE}/analytics/summary`),
        fetch(`${API_BASE}/consumed-leads/metrics`),
        fetch(`${API_BASE}/analytics/by-location`),
        fetch(`${API_BASE}/analytics/count-by-month`),
        fetch(`${API_BASE}/analytics/most-viewed`),
        fetch(`${API_BASE}/analytics/deactivated`)
      ]);

      const [s, m, l, t, v, d] = await Promise.all([
        summaryRes.json(), metricsRes.json(), locationRes.json(), 
        timeRes.json(), viewedRes.json(), deactivatedRes.json()
      ]);

      setSummary(s.data || {});
      setMetrics(m.data || null);
      setLocationData(l.data || []);
      setTimeData(t.data?.reverse() || []); // Latest month last for chart
      setMostViewed(v.data || []);
      setDeactivated(d.data?.inactive || []);
    } catch (error) {
      console.error('Failed to fetch lead data:', error);
    }
    setLoading(false);
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-white">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <Activity className="w-12 h-12 text-blue-500 animate-spin" />
        <p className="text-xl font-medium">Crunching Lead Data...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 p-6">
      {/* Header & Navigation */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Activity className="text-blue-500" /> Lead Command Center
          </h1>
          <p className="text-slate-400">Enterprise-wide lead lifecycle and conversion analytics</p>
        </div>
        
        <div className="flex gap-2 bg-slate-800/50 p-1 rounded-xl border border-slate-700">
          <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} icon={<BarChart3 size={18}/>} label="Overview" />
          <TabButton active={activeTab === 'conversion'} onClick={() => setActiveTab('conversion')} icon={<TrendingUp size={18}/>} label="Conversions" />
          <TabButton active={activeTab === 'issues'} onClick={() => setActiveTab('issues')} icon={<AlertTriangle size={18}/>} label="Health" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-6">
        {/* KPI Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard title="Total Inventory" value={summary.totalLeads} sub="All time posted" icon={<Activity />} color="blue" />
          <KpiCard title="Conversion Rate" value={metrics?.summary?.conversionRate} sub="Leads to Deals" icon={<ArrowUpRight />} color="green" />
          <KpiCard title="Deal Volume" value={`₹${Number(metrics?.summary?.totalDealValue || 0).toLocaleString()}`} sub="Completed value" icon={<DollarSign />} color="purple" />
          <KpiCard title="Avg. Lifespan" value={`${summary.averageLeadLifespan} Days`} sub="Time to deactivation" icon={<Calendar />} color="yellow" />
        </div>

        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Lead Growth Trend */}
            <div className="lg:col-span-2 bg-slate-800/40 backdrop-blur-md rounded-2xl p-6 border border-slate-700">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <TrendingUp className="text-blue-400" /> Lead Posting Growth
              </h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={timeData}>
                    <defs>
                      <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
                    <Tooltip contentStyle={{backgroundColor: '#1e293b', border: 'none', borderRadius: '8px'}} />
                    <Area type="monotone" dataKey="count" stroke="#3b82f6" fillOpacity={1} fill="url(#colorCount)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Status Breakdown */}
            <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl p-6 border border-slate-700">
              <h3 className="text-lg font-bold mb-6">Deal Status Distribution</h3>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Completed', value: metrics?.summary?.completedDeals },
                        { name: 'Pending', value: metrics?.summary?.pendingDeals },
                        { name: 'Failed', value: metrics?.summary?.failedDeals },
                        { name: 'No Response', value: metrics?.summary?.noResponseDeals }
                      ]}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {COLORS.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36}/>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'conversion' && (
          <div className="grid md:grid-cols-2 gap-6">
             {/* Top Performing Companies */}
             <div className="bg-slate-800/40 rounded-2xl p-6 border border-slate-700">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Users className="text-green-400" /> Top Converting Companies
                </h3>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={metrics?.topPerformingCompanies} layout="vertical">
                      <XAxis type="number" hide />
                      <YAxis dataKey="companyName" type="category" stroke="#94a3b8" width={100} fontSize={12} />
                      <Tooltip cursor={{fill: '#334155'}} contentStyle={{backgroundColor: '#1e293b', border: 'none'}} />
                      <Bar dataKey="conversionRate" fill="#10b981" radius={[0, 4, 4, 0]} barSize={20} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
             </div>

             {/* Geographic Heatmap List */}
             <div className="bg-slate-800/40 rounded-2xl p-6 border border-slate-700">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <MapPin className="text-purple-400" /> Regional Lead Density
                </h3>
                <div className="space-y-4">
                  {locationData.slice(0, 8).map((loc, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <span className="w-24 text-sm font-medium truncate">{loc.location}</span>
                      <div className="flex-1 bg-slate-700 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-purple-500 h-full transition-all duration-1000" 
                          style={{ width: `${(loc.count / summary.totalLeads) * 100}%` }} 
                        />
                      </div>
                      <span className="text-xs text-slate-400 w-8">{loc.count}</span>
                    </div>
                  ))}
                </div>
             </div>
          </div>
        )}

        {activeTab === 'issues' && (
           <div className="bg-slate-800/40 rounded-2xl border border-slate-700 overflow-hidden">
             <div className="p-6 border-b border-slate-700 bg-slate-800/20">
               <h3 className="text-lg font-bold">Leads Requiring Attention</h3>
             </div>
             <div className="overflow-x-auto">
               <table className="w-full text-left">
                 <thead className="text-xs uppercase text-slate-500 bg-slate-900/50">
                   <tr>
                     <th className="px-6 py-4">Lead Information</th>
                     <th className="px-6 py-4">Consumption</th>
                     <th className="px-6 py-4">Status Reason</th>
                     <th className="px-6 py-4">Action</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-700/50">
                   {deactivated.map(lead => (
                     <tr key={lead.id} className="hover:bg-white/5 transition">
                       <td className="px-6 py-4">
                         <div className="font-medium text-white">{lead.title}</div>
                         <div className="text-xs text-slate-500">{lead.company?.companyName}</div>
                       </td>
                       <td className="px-6 py-4">
                         <div className="flex items-center gap-2">
                           <Eye size={14} className="text-slate-500" /> {lead.viewCount}
                           <ShoppingCart size={14} className="text-slate-500 ml-2" /> {lead.consumedCount}
                         </div>
                       </td>
                       <td className="px-6 py-4">
                         <span className="text-xs bg-red-500/10 text-red-400 px-2 py-1 rounded border border-red-500/20">
                           {lead.reasonForDeactivation || 'Manual Deactivation'}
                         </span>
                       </td>
                       <td className="px-6 py-4">
                         <button className="text-xs text-blue-400 hover:underline">View Details</button>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
           </div>
        )}
      </div>
    </div>
  );
}

// Sub-components for cleaner code
function TabButton({ active, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
        active ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-700'
      }`}
    >
      {icon} {label}
    </button>
  );
}

function KpiCard({ title, value, sub, icon, color }) {
  const colorMap = {
    blue: 'text-blue-500 bg-blue-500/10',
    green: 'text-green-500 bg-green-500/10',
    purple: 'text-purple-500 bg-purple-500/10',
    yellow: 'text-yellow-500 bg-yellow-500/10'
  };
  return (
    <div className="bg-slate-800/40 p-5 rounded-2xl border border-slate-700">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded-lg ${colorMap[color]}`}>{icon}</div>
      </div>
      <div className="text-2xl font-bold text-white mb-1">{value || '0'}</div>
      <div className="text-xs font-medium text-slate-300 uppercase tracking-wider">{title}</div>
      <div className="text-[10px] text-slate-500 mt-1">{sub}</div>
    </div>
  );
}