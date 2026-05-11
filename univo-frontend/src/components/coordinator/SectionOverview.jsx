import React from 'react';
import { Users, AlertCircle } from 'lucide-react';

const SectionOverview = () => {
  const sections = [
    { name: 'CS-A', students: 62, attendance: 86, alerts: 0, status: 'Healthy' },
    { name: 'CS-B', students: 60, attendance: 78, alerts: 5, status: 'Warning' },
    { name: 'CS-C', students: 63, attendance: 92, alerts: 0, status: 'Excellent' },
    { name: 'CS-D', students: 60, attendance: 71, alerts: 12, status: 'Critical' },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
      <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
        <Users className="w-5 h-5 text-indigo-500" /> Section Health Overview
      </h3>
      
      <div className="space-y-4">
        {sections.map(section => (
          <div key={section.name} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm ${
                section.status === 'Healthy' || section.status === 'Excellent' ? 'bg-emerald-100 text-emerald-700' :
                section.status === 'Warning' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
              }`}>
                {section.name}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-700">{section.attendance}% Avg. Att</p>
                <p className="text-xs text-slate-500 font-medium">{section.students} Students</p>
              </div>
            </div>
            
            {section.alerts > 0 ? (
              <div className="flex items-center gap-1.5 text-xs font-bold bg-rose-50 text-rose-600 px-2.5 py-1 rounded-full border border-rose-100">
                <AlertCircle className="w-3.5 h-3.5" /> {section.alerts} Alerts
              </div>
            ) : (
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                On Track
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionOverview;
