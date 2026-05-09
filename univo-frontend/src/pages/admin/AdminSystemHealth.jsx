import React from 'react';
import { Database, Server, Cpu, HardDrive, Wifi, Activity, AlertCircle, RefreshCw } from 'lucide-react';
import SystemHealth from '../../components/admin/SystemHealth';

const MetricCard = ({ title, value, icon: Icon, colorClass, statusText }) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
    <div className="flex items-center gap-3 mb-3">
      <div className={`p-2 rounded-lg ${colorClass}`}><Icon size={20} /></div>
      <h3 className="font-semibold text-slate-700">{title}</h3>
    </div>
    <div className="flex items-end justify-between mt-2">
      <p className="text-3xl font-bold text-slate-800">{value}</p>
      <p className="text-sm font-medium text-slate-500 mb-1">{statusText}</p>
    </div>
  </div>
);

const AdminSystemHealth = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">System Health Monitoring</h1>
          <p className="text-slate-500 mt-1">Real-time status of APIs, Database, Servers, and application performance.</p>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-sm text-slate-500 mr-2">Last updated: Just now</p>
          <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg font-medium hover:bg-slate-50 transition-colors shadow-sm">
            <RefreshCw size={18} />
            Refresh
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="API Uptime" 
          value="99.99%" 
          icon={Server} 
          colorClass="bg-emerald-100 text-emerald-600"
          statusText="All operational"
        />
        <MetricCard 
          title="Avg Latency" 
          value="124ms" 
          icon={Activity} 
          colorClass="bg-blue-100 text-blue-600"
          statusText="Normal"
        />
        <MetricCard 
          title="Memory Usage" 
          value="78%" 
          icon={HardDrive} 
          colorClass="bg-amber-100 text-amber-600"
          statusText="Elevated"
        />
        <MetricCard 
          title="Database Load" 
          value="34%" 
          icon={Database} 
          colorClass="bg-indigo-100 text-indigo-600"
          statusText="Healthy"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Main Charts */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col min-h-[300px]">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Server Resources Timeline</h2>
            <div className="flex-1 border-2 border-dashed border-slate-100 rounded-xl flex items-center justify-center bg-slate-50">
              <p className="text-slate-400 font-medium">Line Chart: CPU & RAM over past 24h</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col min-h-[300px]">
            <h2 className="text-lg font-bold text-slate-800 mb-4">API Response Times</h2>
            <div className="flex-1 border-2 border-dashed border-slate-100 rounded-xl flex items-center justify-center bg-slate-50">
              <p className="text-slate-400 font-medium">Bar Chart: Latency by Endpoint</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {/* Sidebar */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <AlertCircle size={20} className="text-amber-500" />
              Active Alerts
            </h2>
            <div className="flex flex-col gap-3">
              <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg flex items-start gap-3">
                <div className="mt-0.5"><AlertCircle size={16} className="text-amber-600" /></div>
                <div>
                  <p className="text-sm font-semibold text-amber-800">High memory usage detected</p>
                  <p className="text-xs text-amber-600 mt-1">Worker Node-3 is at 85% capacity for the last 10 minutes.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Quick Overview</h2>
            <SystemHealth />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSystemHealth;
