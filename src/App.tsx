import React from 'react';
import { 
  Search, 
  Menu, 
  Bell, 
  HelpCircle, 
  MoreVertical, 
  Play, 
  ChevronRight, 
  ChevronDown, 
  LayoutDashboard, 
  Activity, 
  Database, 
  Wrench, 
  Lightbulb, 
  Info,
  AlertTriangle,
  AlertCircle,
  ExternalLink,
  Filter
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
  AreaChart,
  Area
} from 'recharts';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Mock Data ---

const trendData = [
  { name: 'Mon', activation: 90, availability: 98, scheduling: 88, utilization: 78 },
  { name: 'Tue', activation: 88, availability: 98, scheduling: 85, utilization: 80 },
  { name: 'Wed', activation: 92, availability: 95, scheduling: 88, utilization: 85 },
  { name: 'Thu', activation: 94, availability: 98, scheduling: 90, utilization: 82 },
  { name: 'Fri', activation: 95, availability: 98, scheduling: 92, utilization: 88 },
  { name: 'Sat', activation: 85, availability: 98, scheduling: 78, utilization: 72 },
  { name: 'Sun', activation: 88, availability: 98, scheduling: 80, utilization: 75 },
];

const funnelData = [
  { name: 'Committed', value: 100, fill: '#64748b' },
  { name: 'Available', value: 80, fill: '#475569' },
  { name: 'Allocated', value: 60, fill: '#4f46e5' },
  { name: 'Utilized', value: 40, fill: '#10b981' },
];

const badNodeEvents = [
  { id: 'node-gke-4', event: 'Hardware failure', severity: 'High', recovery: '2.5h', action: 'Inspect' },
  { id: 'node-gke-12', event: 'Network timeout', severity: 'Medium', recovery: '15m', action: 'Restart' },
  { id: 'node-gke-7', event: 'Memory leak', severity: 'Low', recovery: '45m', action: 'Analyze' },
];

const domainMonitoringData = [
  { name: 'domain-alpha', gpus: 18, hasSlo: true },
  { name: 'domain-beta', gpus: 15, hasSlo: true },
  { name: 'domain-gamma', gpus: 18, hasSlo: false },
  { name: 'domain-delta', gpus: 17, hasSlo: true },
  { name: 'domain-epsilon', gpus: 12, hasSlo: true },
  { name: 'domain-zeta', gpus: 18, hasSlo: false },
];

// --- Components ---

const SidebarItem = ({ icon: Icon, label, active = false, badge = false, subItems = [] }: any) => (
  <div className="mb-1">
    <button className={cn(
      "w-full flex items-center gap-3 px-4 py-2 text-sm font-medium transition-colors",
      active ? "bg-blue-50 text-blue-700 border-r-4 border-blue-700" : "text-gray-600 hover:bg-gray-100"
    )}>
      <Icon size={18} />
      <span className="flex-1 text-left">{label}</span>
      {badge && <span className="bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">NEW</span>}
      {subItems.length > 0 && <ChevronDown size={14} className={active ? "rotate-0" : "-rotate-90"} />}
    </button>
    {active && subItems.length > 0 && (
      <div className="ml-4 border-l border-gray-200">
        {subItems.map((item: string, i: number) => (
          <button key={i} className={cn(
            "w-full text-left px-8 py-2 text-sm transition-colors",
            item === "Fleet reliability" ? "bg-blue-50 text-blue-700 font-semibold" : "text-gray-500 hover:text-gray-800"
          )}>
            {item}
          </button>
        ))}
      </div>
    )}
  </div>
);

const StatCard = ({ title, value, subValue, trend, color, info = false }: any) => (
  <div className={cn(
    "bg-white p-4 rounded-lg border border-gray-200 shadow-sm relative overflow-hidden",
    color === 'green' && "border-t-4 border-t-emerald-500",
    color === 'orange' && "border-t-4 border-t-orange-500",
    color === 'red' && "border-t-4 border-t-red-500",
    !color && "border-t-4 border-t-transparent"
  )}>
    <div className="flex justify-between items-start mb-2">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      {info && <Info size={14} className="text-gray-400 cursor-help" />}
    </div>
    <div className="flex flex-col">
      <span className="text-2xl font-bold text-gray-900">{value}</span>
      <div className="flex items-center gap-2 mt-1">
        <span className={cn(
          "text-xs font-semibold",
          trend?.startsWith('+') || trend?.includes('Healthy') || trend?.includes('Within') ? "text-emerald-600" : "text-red-500"
        )}>
          {trend}
        </span>
        <span className="text-xs text-gray-400">{subValue}</span>
      </div>
    </div>
  </div>
);

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      {/* Header */}
      <header className="h-12 bg-white border-b border-gray-200 flex items-center px-4 justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Menu size={20} className="text-gray-500 cursor-pointer" />
          <div className="flex items-center gap-2">
            <span className="font-semibold text-lg text-gray-700">Google Cloud</span>
            <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-sm text-gray-600 cursor-pointer hover:bg-gray-200">
              <Database size={14} />
              <span>chimera</span>
              <ChevronDown size={14} />
            </div>
          </div>
        </div>

        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search for resources, docs, products and more" 
              className="w-full bg-gray-100 border-none rounded-md py-1.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 bg-white px-1 border border-gray-200 rounded">/</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Play size={18} className="text-gray-500 cursor-pointer" />
          <MoreVertical size={18} className="text-gray-500 cursor-pointer" />
          <Bell size={18} className="text-gray-500 cursor-pointer" />
          <HelpCircle size={18} className="text-gray-500 cursor-pointer" />
          <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs font-bold cursor-pointer">
            SW
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 overflow-y-auto hidden md:block">
          <div className="p-4">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center justify-between">
              AI/ML Infrastructure
              <span className="bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded">NEW</span>
            </h2>
            <SidebarItem icon={LayoutDashboard} label="Overview" />
            <SidebarItem 
              icon={Activity} 
              label="Monitor and optimize" 
              active 
              subItems={["Fleet reliability", "Jobs", "Cost and capacity"]} 
            />
            <SidebarItem icon={Wrench} label="Tools" subItems={["Diagnostics", "Bill of health"]} />
            <SidebarItem icon={Lightbulb} label="Solutions" subItems={["Cluster director", "Google Kubernetes Engine", "Batch"]} />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
            <span>Google Cloud</span>
            <ChevronRight size={12} />
            <span>chimera</span>
            <ChevronRight size={12} />
            <span>Monitor and optimize</span>
            <ChevronRight size={12} />
            <span className="text-gray-900 font-medium">Fleet reliability</span>
          </nav>

          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Fleet reliability</h1>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-8">
            {[
              { label: 'Accelerator', value: 'Select All' },
              { label: 'Job type', value: 'Select All' },
              { label: 'Orchestrator', value: 'Select All' },
              { label: 'Time range', value: 'Last 24 hours', icon: Activity },
              { label: 'Reservation', value: 'Select All' },
            ].map((filter, i) => (
              <div key={i} className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-500">{filter.label}</label>
                <div className="flex items-center justify-between gap-8 px-3 py-2 bg-white border border-gray-300 rounded text-sm text-gray-700 cursor-pointer hover:border-gray-400 min-w-[160px]">
                  <div className="flex items-center gap-2">
                    {filter.icon && <filter.icon size={14} className="text-gray-400" />}
                    <span>{filter.value}</span>
                  </div>
                  <ChevronDown size={14} className="text-gray-400" />
                </div>
              </div>
            ))}
          </div>

          {/* KPI Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <StatCard title="Healthy chips" value="4,850" trend="97%" subValue="vs last 24h" color="green" />
            <StatCard title="Degraded chips" value="125" trend="2.5%" subValue="vs last 24h" color="orange" />
            <StatCard title="Unhealthy chips" value="25" trend="0.5%" subValue="vs last 24h" color="red" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <StatCard title="Fleet utilization" value="63%" trend="+1.2%" subValue="vs last 24h" info />
            <StatCard title="Available capacity" value="1,240" trend="Chips" subValue="vs last 24h" info />
            <StatCard title="Stranded capacity" value="4.2%" trend="-0.5%" subValue="vs last 24h" info />
            <StatCard title="Total cost / hr" value="$14.2k" trend="Within budget" subValue="vs last 24h" info />
          </div>

          {/* Disruption Insights */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">Disruption insights</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-gray-500">30d VM disruption</span>
                    <Info size={12} className="text-gray-300" />
                  </div>
                  <div className="text-xl font-bold text-gray-900">12</div>
                </div>
                <div className="text-[10px] text-emerald-600 font-semibold mt-2 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  -14% vs last period
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-gray-500">Upcoming disruptions</span>
                    <Info size={12} className="text-gray-300" />
                  </div>
                  <div className="text-xl font-bold text-gray-900">3</div>
                </div>
                <div className="text-[10px] text-orange-600 font-semibold mt-2 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                  Next scheduled in 2h
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-6">Domain monitoring</h3>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Filter domains..." 
                  className="w-full bg-gray-50 border border-gray-300 rounded-md py-1.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-500 uppercase border-b border-gray-100">
                    <tr>
                      <th className="px-4 py-3 font-medium">Domain</th>
                      <th className="px-4 py-3 font-medium text-center">GPUs</th>
                      <th className="px-4 py-3 font-medium text-right">SLO Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {domainMonitoringData.map((domain, i) => {
                      const isOutOfSlo = domain.hasSlo && domain.gpus < 16;
                      return (
                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 font-medium text-gray-700">{domain.name}</td>
                          <td className="px-4 py-3 text-center text-gray-600 font-mono">{domain.gpus}</td>
                          <td className="px-4 py-3 text-right">
                            {!domain.hasSlo ? (
                              <span className="text-gray-400 text-xs italic">No SLO</span>
                            ) : isOutOfSlo ? (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-red-100 text-red-700">
                                Out of SLO
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-100 text-emerald-700">
                                In SLO
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-6">Bad Node Events</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-500 uppercase border-b border-gray-100">
                    <tr>
                      <th className="px-4 py-3 font-medium">Node ID <ChevronDown size={12} className="inline ml-1" /></th>
                      <th className="px-4 py-3 font-medium">Event <ChevronDown size={12} className="inline ml-1" /></th>
                      <th className="px-4 py-3 font-medium">Severity <ChevronDown size={12} className="inline ml-1" /></th>
                      <th className="px-4 py-3 font-medium">Recovery Time <ChevronDown size={12} className="inline ml-1" /></th>
                      <th className="px-4 py-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {badNodeEvents.map((node, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-medium text-blue-600 cursor-pointer hover:underline">{node.id}</td>
                        <td className="px-4 py-3 text-gray-600">{node.event}</td>
                        <td className="px-4 py-3">
                          <span className={cn(
                            "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase",
                            node.severity === 'High' ? "bg-red-100 text-red-700" :
                            node.severity === 'Medium' ? "bg-orange-100 text-orange-700" :
                            "bg-blue-100 text-blue-700"
                          )}>
                            {node.severity}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-500">{node.recovery}</td>
                        <td className="px-4 py-3">
                          <button className="text-blue-600 hover:text-blue-800 font-medium">{node.action}</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 gap-6">
            {/* Line Chart */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Fleet-wide reliability trends & recommendations</h3>
                <Info size={14} className="text-gray-400" />
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 12, fill: '#94a3b8' }} 
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 12, fill: '#94a3b8' }}
                      domain={[60, 100]}
                    />
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend 
                      verticalAlign="bottom" 
                      height={36} 
                      iconType="circle"
                      wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }}
                    />
                    <Line type="monotone" dataKey="activation" name="Activation rate" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="availability" name="Availability rate" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="scheduling" name="Scheduling rate" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="utilization" name="Utilization rate" stroke="#ec4899" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Insights */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-blue-700 mb-2">
                  <Activity size={16} />
                  Reliability insights & recommendations
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-orange-50 border border-orange-100 p-4 rounded-lg flex gap-3">
                    <AlertTriangle className="text-orange-500 shrink-0" size={20} />
                    <div>
                      <h4 className="text-sm font-bold text-orange-900">Underutilized reservation</h4>
                      <p className="text-xs text-orange-800 mt-1">Res-A100-EU is at 45% utilization. Consider moving Spot workloads here to optimize cost.</p>
                      <button className="text-xs font-bold text-orange-700 mt-3 flex items-center gap-1 hover:underline">
                        View reservation <ChevronRight size={12} />
                      </button>
                    </div>
                  </div>
                  <div className="bg-red-50 border border-red-100 p-4 rounded-lg flex gap-3">
                    <AlertCircle className="text-red-500 shrink-0" size={20} />
                    <div>
                      <h4 className="text-sm font-bold text-red-900">Straggler node detected</h4>
                      <p className="text-xs text-red-800 mt-1">Node-gke-4 causing 15% slowdown in Job-beta-991. Hardware replacement recommended.</p>
                      <button className="text-xs font-bold text-red-700 mt-3 flex items-center gap-1 hover:underline">
                        Inspect job <ChevronRight size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
