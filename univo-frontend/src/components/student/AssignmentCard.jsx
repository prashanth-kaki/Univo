import React from 'react';
import { CalendarClock, FileText, CheckCircle, AlertTriangle } from 'lucide-react';

const AssignmentCard = ({ assignment }) => {
  const getStatusConfig = (status) => {
    switch(status) {
      case 'Pending': return { color: 'text-amber-600', bg: 'bg-amber-100', border: 'border-amber-200', icon: CalendarClock };
      case 'Submitted': return { color: 'text-blue-600', bg: 'bg-blue-100', border: 'border-blue-200', icon: FileText };
      case 'Reviewed': return { color: 'text-emerald-600', bg: 'bg-emerald-100', border: 'border-emerald-200', icon: CheckCircle };
      case 'Late': return { color: 'text-rose-600', bg: 'bg-rose-100', border: 'border-rose-200', icon: AlertTriangle };
      default: return { color: 'text-slate-600', bg: 'bg-slate-100', border: 'border-slate-200', icon: FileText };
    }
  };

  const config = getStatusConfig(assignment.status);
  const StatusIcon = config.icon;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
      <div className="flex gap-4 items-start sm:items-center">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${config.bg} ${config.color} border ${config.border}`}>
          <StatusIcon className="w-6 h-6" />
        </div>
        
        <div>
          <h4 className="font-bold text-slate-800 text-base">{assignment.title}</h4>
          <p className="text-sm font-medium text-slate-500">{assignment.subject}</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between sm:justify-end gap-6 sm:w-1/3">
        <div className="text-left sm:text-right">
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">Due / Status</p>
          <p className={`text-sm font-bold ${config.color}`}>{assignment.dueDate}</p>
        </div>
        
        {assignment.status === 'Reviewed' ? (
          <div className="text-center px-4 py-1.5 bg-slate-50 rounded-lg border border-slate-200">
            <span className="block text-[10px] text-slate-400 font-bold uppercase">Score</span>
            <span className="font-bold text-slate-800">{assignment.score}/{assignment.points}</span>
          </div>
        ) : (
          <button className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap">
            {assignment.status === 'Pending' || assignment.status === 'Late' ? 'Submit Work' : 'View Details'}
          </button>
        )}
      </div>
    </div>
  );
};

export default AssignmentCard;
