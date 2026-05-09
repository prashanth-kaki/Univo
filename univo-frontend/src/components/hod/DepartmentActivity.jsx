import React from 'react';
import { Activity, FileText, CheckCircle, AlertTriangle, FileCheck } from 'lucide-react';

const DepartmentActivity = ({ activities, loading }) => {
  if (loading) {
    return <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 h-full animate-pulse"></div>;
  }

  const getIcon = (type) => {
    switch(type) {
      case 'resource': return <FileText className="w-4 h-4 text-blue-500" />;
      case 'attendance': return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case 'alert': return <AlertTriangle className="w-4 h-4 text-rose-500" />;
      case 'assignment': return <FileCheck className="w-4 h-4 text-indigo-500" />;
      default: return <Activity className="w-4 h-4 text-slate-500" />;
    }
  };

  const getBg = (type) => {
    switch(type) {
      case 'resource': return 'bg-blue-100 border-blue-200';
      case 'attendance': return 'bg-emerald-100 border-emerald-200';
      case 'alert': return 'bg-rose-100 border-rose-200';
      case 'assignment': return 'bg-indigo-100 border-indigo-200';
      default: return 'bg-slate-100 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm h-full flex flex-col">
      <div className="p-5 border-b border-slate-200 flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <Activity className="w-5 h-5 text-emerald-500" />
          Recent Activity
        </h3>
        <button className="text-sm text-emerald-600 font-semibold hover:text-emerald-700">View Log</button>
      </div>

      <div className="flex-1 overflow-auto p-5">
        <div className="relative border-l-2 border-slate-100 ml-4 space-y-8 py-2">
          {activities?.map((activity) => (
            <div key={activity.id} className="relative pl-6">
              <div className={`absolute -left-[13px] top-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${getBg(activity.type)}`}>
                {getIcon(activity.type)}
              </div>
              
              <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 hover:shadow-sm transition-shadow">
                <p className="text-sm text-slate-700">
                  <span className="font-bold text-slate-900">{activity.user}</span> {activity.action}
                </p>
                <span className="text-xs font-medium text-slate-400 mt-1 block">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DepartmentActivity;
