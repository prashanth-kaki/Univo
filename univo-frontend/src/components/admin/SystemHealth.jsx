import React from 'react';
import { Database, Server, Cpu, HardDrive, Wifi, Activity } from 'lucide-react';
import { cn } from '../../utils/cn';

const HealthItem = ({ icon: Icon, label, value, status }) => (
  <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50">
    <div className="flex items-center gap-3">
      <div className={cn(
        "p-2 rounded-md",
        status === 'good' ? "bg-emerald-100 text-emerald-600" : 
        status === 'warning' ? "bg-amber-100 text-amber-600" : 
        "bg-red-100 text-red-600"
      )}>
        <Icon size={18} />
      </div>
      <span className="text-sm font-medium text-slate-700">{label}</span>
    </div>
    <span className="text-sm font-semibold text-slate-900">{value}</span>
  </div>
);

const SystemHealth = () => {
  return (
    <div className="flex flex-col gap-3">
      <HealthItem 
        icon={Server} 
        label="API Uptime" 
        value="99.99%" 
        status="good" 
      />
      <HealthItem 
        icon={Database} 
        label="Database Status" 
        value="Connected" 
        status="good" 
      />
      <HealthItem 
        icon={Cpu} 
        label="CPU Usage" 
        value="42%" 
        status="good" 
      />
      <HealthItem 
        icon={HardDrive} 
        label="Memory Usage" 
        value="78%" 
        status="warning" 
      />
      <HealthItem 
        icon={Wifi} 
        label="Active Sessions" 
        value="1,245" 
        status="good" 
      />
      <HealthItem 
        icon={Activity} 
        label="Error Rate (1h)" 
        value="0.12%" 
        status="good" 
      />
      
      <div className="mt-2 pt-3 border-t border-slate-100">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Last updated: Just now</span>
          <button className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors">
            View full report
          </button>
        </div>
      </div>
    </div>
  );
};

export default SystemHealth;
