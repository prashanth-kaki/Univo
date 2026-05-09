import React from 'react';
import { BookOpen, Users, Edit3 } from 'lucide-react';

const SubjectManagement = ({ subjects, loading }) => {
  if (loading) {
    return <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 h-64 animate-pulse"></div>;
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm h-full flex flex-col">
      <div className="p-5 border-b border-slate-200 flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-500" />
          Subject Allocations
        </h3>
        <button className="text-sm text-indigo-600 font-semibold hover:text-indigo-700">Manage All</button>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        {subjects?.map(subject => (
          <div key={subject.id} className="p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all group">
            <div className="flex items-start justify-between mb-2">
              <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-xs font-bold font-mono border border-slate-200">
                {subject.code}
              </span>
              <button className="text-slate-400 hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
            
            <h4 className="font-bold text-slate-800 mb-1">{subject.name}</h4>
            <p className="text-sm text-indigo-600 font-medium mb-3">Assigned to: {subject.faculty}</p>
            
            <div className="flex items-center gap-4 text-xs font-medium text-slate-500 border-t border-slate-100 pt-3">
              <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> {subject.sections.join(', ')}</span>
              <span>{subject.credits} Credits</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectManagement;
