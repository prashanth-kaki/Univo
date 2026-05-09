import React from 'react';
import { Users, FileText, Settings, BookOpen } from 'lucide-react';

const SubjectCard = ({ subject, onClick }) => {
  return (
    <div 
      onClick={() => onClick(subject)}
      className="bg-white border border-slate-200 rounded-xl p-6 cursor-pointer hover:border-indigo-300 hover:shadow-lg transition-all group relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-bl-full -z-0 opacity-50 group-hover:scale-110 transition-transform"></div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
          <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md text-xs font-semibold border border-slate-200">
            {subject.code}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-slate-800 mb-1 line-clamp-1">{subject.name}</h3>
        <p className="text-sm text-slate-500 mb-6 font-medium">Semester {subject.semester} • Section {subject.section}</p>
        
        <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Students</p>
              <p className="text-sm font-bold text-slate-700">{subject.totalStudents}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Resources</p>
              <p className="text-sm font-bold text-slate-700">12</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectCard;
