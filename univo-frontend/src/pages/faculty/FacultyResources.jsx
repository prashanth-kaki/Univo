import React, { useEffect, useState } from 'react';
import ResourceUpload from '../../components/faculty/ResourceUpload';
import { getResources } from '../../services/facultyService';
import { File, Download, MoreVertical, Search, Filter } from 'lucide-react';

const FacultyResources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const data = await getResources();
        setResources(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Study Materials</h1>
        <p className="text-slate-500 mt-1">Upload and manage resources for your subjects.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ResourceUpload />
        </div>
        
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm h-full flex flex-col">
            <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h3 className="text-lg font-bold text-slate-800">Uploaded Resources</h3>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="text" placeholder="Search..." className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm w-full sm:w-48" />
                </div>
                <button className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">
                  <Filter className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-auto p-4">
              {loading ? (
                <div className="space-y-3">
                  {[1,2,3].map(i => <div key={i} className="h-16 bg-slate-100 rounded-lg animate-pulse"></div>)}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {resources.map(res => (
                    <div key={res.id} className="p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all group">
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                          <File className="w-5 h-5" />
                        </div>
                        <button className="text-slate-400 hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                      <h4 className="font-semibold text-slate-800 line-clamp-1" title={res.title}>{res.title}</h4>
                      <p className="text-xs text-slate-500 mb-4">{res.subject}</p>
                      
                      <div className="flex items-center justify-between border-t border-slate-100 pt-3 mt-auto">
                        <span className="text-xs font-medium text-slate-400">{res.uploadDate} • {res.size}</span>
                        <button className="text-indigo-600 hover:text-indigo-700 bg-indigo-50 p-1.5 rounded-md transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyResources;
