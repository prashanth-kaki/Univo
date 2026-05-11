import React from 'react';
import { UploadCloud, FolderOpen, FileText, Search } from 'lucide-react';

const CoordinatorResources = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Resource Repository</h1>
          <p className="text-slate-500 mt-1">Manage shared forms, operational guidelines, and department assets.</p>
        </div>
        <button className="bg-teal-600 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-teal-700 transition-colors shadow-sm w-full sm:w-auto">
          <UploadCloud className="w-5 h-5" /> Upload Asset
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        <div className="w-full lg:w-64 shrink-0 bg-white rounded-xl border border-slate-200 p-4 h-fit">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <FolderOpen className="w-4 h-4" /> Asset Categories
          </h3>
          <ul className="space-y-1">
            {['All Assets', 'Leave Forms', 'Syllabus Copies', 'Timetable Masters', 'Exam Guidelines', 'Archived'].map((cat, idx) => (
              <li key={cat}>
                <button className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  idx === 0 ? 'bg-teal-50 text-teal-700' : 'text-slate-600 hover:bg-slate-50'
                }`}>
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm p-6 overflow-auto">
           <div className="relative w-full max-w-md mb-6">
             <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
             <input 
               type="text" 
               placeholder="Search forms and guidelines..." 
               className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none"
             />
           </div>
           
           <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                 <FileText className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-700 mb-1">No Assets Found</h3>
              <p className="text-sm text-slate-500 max-w-sm">Upload documents or select a different category to view available department resources.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CoordinatorResources;
