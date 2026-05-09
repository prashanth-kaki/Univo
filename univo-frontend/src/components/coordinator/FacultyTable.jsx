import React from 'react';
import { UserCheck, Clock, CheckCircle2 } from 'lucide-react';

const FacultyTable = ({ faculty, loading }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <UserCheck className="w-5 h-5 text-blue-600" /> Faculty Coordination
        </h3>
      </div>
      
      <div className="flex-1 overflow-auto p-4 space-y-3">
        {loading ? (
          [1,2,3].map(i => <div key={i} className="h-20 bg-slate-50 rounded-lg border border-slate-100 animate-pulse"></div>)
        ) : (
          faculty.map(fac => (
            <div key={fac.id} className="p-4 border border-slate-200 rounded-lg hover:border-blue-300 transition-colors flex flex-col sm:flex-row justify-between gap-4">
              <div>
                <h4 className="font-bold text-slate-800 text-sm">{fac.name}</h4>
                <p className="text-xs text-slate-500 font-medium mb-2">{fac.subject} • {fac.section}</p>
                <div className="flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 rounded w-fit border border-emerald-200 bg-emerald-50 text-emerald-700">
                  <CheckCircle2 className="w-3 h-3" /> {fac.scheduleStatus}
                </div>
              </div>
              <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
                 <div className="text-xs font-semibold text-slate-600">Leaves Pending: <span className={fac.pendingLeaves > 0 ? "text-amber-600 font-bold" : "text-emerald-600 font-bold"}>{fac.pendingLeaves}</span></div>
                 <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded border border-blue-100">Contact</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FacultyTable;
