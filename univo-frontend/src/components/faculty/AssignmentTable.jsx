import React from 'react';
import { Calendar, CheckCircle, Clock, MoreVertical, Plus } from 'lucide-react';

const AssignmentTable = ({ assignments, loading }) => {
  if (loading) {
    return <div className="animate-pulse bg-white p-6 rounded-xl border border-slate-200 h-64"></div>;
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-full flex flex-col">
      <div className="p-5 border-b border-slate-200 flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-800">Recent Assignments</h3>
        <button className="flex items-center gap-1.5 text-sm bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg font-medium hover:bg-indigo-100 transition-colors">
          <Plus className="w-4 h-4" />
          Create New
        </button>
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="divide-y divide-slate-100 p-2">
          {assignments?.map((assignment) => (
            <div key={assignment.id} className="p-3 hover:bg-slate-50 rounded-lg transition-colors flex items-center justify-between gap-4 group">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg mt-0.5 ${assignment.status === 'Active' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'}`}>
                  {assignment.status === 'Active' ? <Clock className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 line-clamp-1">{assignment.title}</h4>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                    <span className="font-medium text-slate-700">{assignment.subject}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Due {assignment.dueDate}</span>
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-right">
                <div className="hidden sm:block">
                  <p className="text-xs text-slate-500 mb-1">Submissions</p>
                  <p className="text-sm font-bold text-slate-700">
                    {assignment.submissions} <span className="text-slate-400 font-normal">/ {assignment.total}</span>
                  </p>
                </div>
                
                <button className="text-slate-400 hover:text-indigo-600 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
          {(!assignments || assignments.length === 0) && (
            <div className="p-8 text-center text-slate-500">
              No recent assignments found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignmentTable;
