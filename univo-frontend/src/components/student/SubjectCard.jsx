import React from 'react';
import { BookOpen, User, Clock, ChevronRight } from 'lucide-react';

const SubjectCard = ({ subject }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-violet-300 transition-all group overflow-hidden flex flex-col h-full cursor-pointer">
      <div className="h-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 w-full"></div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded text-xs font-bold font-mono border border-slate-200">
            {subject.code}
          </span>
          <span className={`text-xs font-bold px-2 py-1 rounded-full ${
            subject.attendance >= 85 ? 'bg-emerald-100 text-emerald-700' : 
            subject.attendance >= 75 ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
          }`}>
            {subject.attendance}% Att.
          </span>
        </div>
        
        <h3 className="font-bold text-lg text-slate-800 mb-1 group-hover:text-violet-700 transition-colors line-clamp-2">
          {subject.name}
        </h3>
        
        <div className="flex items-center gap-1.5 text-sm text-slate-500 mb-4 mt-auto pt-4">
          <User className="w-4 h-4 text-violet-500" />
          <span className="font-medium text-slate-700">{subject.faculty}</span>
        </div>
        
        <div className="flex items-center justify-between border-t border-slate-100 pt-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            {subject.nextClass}
          </div>
          <button className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-violet-100 group-hover:text-violet-600 transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubjectCard;
