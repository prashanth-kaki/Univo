import React from 'react';
import { Calendar, CheckCircle, Clock, MoreVertical, Plus } from 'lucide-react';

const AssignmentTable = ({ assignments, loading, onCreateNew, selectedId, onSelect, onDelete, onEdit }) => {
  if (loading) {
    return <div className="animate-pulse bg-white p-6 rounded-xl border border-slate-200 h-64"></div>;
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-full flex flex-col">
      <div className="p-5 border-b border-slate-200 flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-800">Recent Assignments</h3>
        <button onClick={onCreateNew} className="flex items-center gap-1.5 text-sm bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg font-medium hover:bg-indigo-100 transition-colors">
          <Plus className="w-4 h-4" />
          Create New
        </button>
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="divide-y divide-slate-100 p-2">
          {assignments?.map((assignment) => {
             const isActive = assignment.isActive;
             const isSelected = selectedId === assignment._id;
             const submissionsCount = assignment.submissions?.length || 0;
             const targetText = assignment.targetType === 'section' ? `Year ${assignment.targetYear} ${assignment.targetSection}` : 
                                assignment.targetType === 'year' ? `Year ${assignment.targetYear}` : 
                                assignment.targetType === 'rollNumbers' ? 'Specific Students' : 'All Students';

             return (
              <div 
                key={assignment._id} 
                onClick={() => onSelect(assignment)}
                className={`p-3 rounded-lg transition-colors flex items-center justify-between gap-4 group cursor-pointer ${isSelected ? 'bg-indigo-50 border border-indigo-100' : 'hover:bg-slate-50 border border-transparent'}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg mt-0.5 ${isActive ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'}`}>
                    {isActive ? <Clock className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 line-clamp-1" title={assignment.title}>{assignment.title}</h4>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                      <span className="font-medium text-slate-700">{targetText}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Due {new Date(assignment.deadline).toLocaleDateString()}</span>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-right">
                  <div className="hidden sm:block">
                    <p className="text-xs text-slate-500 mb-1">Submissions</p>
                    <p className="text-sm font-bold text-slate-700">
                      {submissionsCount}
                    </p>
                  </div>
                  
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        if(window.confirm('Are you sure you want to delete this assignment?')) {
                          onDelete(assignment._id);
                        }
                      }}
                      className="text-slate-400 hover:text-rose-600 p-1 rounded hover:bg-rose-50"
                      title="Delete"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(assignment);
                      }}
                      className="text-slate-400 hover:text-indigo-600 p-1 rounded hover:bg-indigo-50"
                      title="Edit"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
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
