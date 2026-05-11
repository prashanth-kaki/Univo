import React, { useEffect, useState } from 'react';
import ResourceCard from '../../components/student/ResourceCard';
import { getStudentResources } from '../../services/studentService';
import { Search, FolderOpen } from 'lucide-react';

const StudentResources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      const data = await getStudentResources();
      setResources(data);
      setLoading(false);
    };
    fetchResources();
  }, []);

  const categories = ['All Files', 'PDFs', 'Presentations', 'Videos', 'Notes', 'Bookmarked'];

  return (
    <div className="max-w-7xl mx-auto space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Study Library</h1>
          <p className="text-slate-500 mt-1">Access lecture notes, slides, and recorded sessions.</p>
        </div>
        
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search resources..."
            className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 outline-none w-full sm:w-64"
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        <div className="w-full lg:w-64 shrink-0 bg-white rounded-xl border border-slate-200 p-4 h-fit">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <FolderOpen className="w-4 h-4" /> Categories
          </h3>
          <ul className="space-y-1">
            {categories.map((cat, idx) => (
              <li key={cat}>
                <button className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  idx === 0 ? 'bg-violet-50 text-violet-700' : 'text-slate-600 hover:bg-slate-50'
                }`}>
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex-1 overflow-auto">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {[1,2,3,4,5,6].map(i => <div key={i} className="h-40 bg-white border border-slate-200 rounded-xl animate-pulse"></div>)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pb-4">
              {resources.map(res => <ResourceCard key={res.id} resource={res} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentResources;
