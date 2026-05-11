import React from 'react';
import { Users, AlertCircle } from 'lucide-react';

const AttendanceOverview = ({ sections = [] }) => {
  // If no sections are provided from backend, use a placeholder or empty list
  const displaySections = sections.length > 0 ? sections : [
    { id: 1, name: 'CS-A', year: 'Year 3', attendance: 92, status: 'Good' },
    { id: 2, name: 'CS-B', year: 'Year 3', attendance: 88, status: 'Average' },
    { id: 3, name: 'CS-C', year: 'Year 2', attendance: 71, status: 'Critical' },
    { id: 4, name: 'CS-D', year: 'Year 1', attendance: 95, status: 'Excellent' },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm h-full flex flex-col">
      <div className="p-5 border-b border-slate-200 flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <Users className="w-5 h-5 text-indigo-500" />
          Section Attendance
        </h3>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        {displaySections.map(sec => (
          <div key={sec.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-slate-800">{sec.name}</h4>
              <p className="text-xs text-slate-500">{sec.year}</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className={`text-lg font-bold ${
                  sec.attendance >= 90 ? 'text-emerald-600' :
                  sec.attendance >= 75 ? 'text-amber-600' : 'text-red-600'
                }`}>
                  {sec.attendance}%
                </p>
                <p className="text-[10px] uppercase tracking-wide font-semibold text-slate-400">{sec.status}</p>
              </div>
              
              {sec.attendance < 75 && (
                <button className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors" title="Send Warning Alert">
                  <AlertCircle className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendanceOverview;
