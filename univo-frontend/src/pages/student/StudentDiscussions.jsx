import React, { useEffect, useState } from 'react';
import DiscussionCard from '../../components/student/DiscussionCard';
import { getDiscussions } from '../../services/studentService';
import { Plus, Search } from 'lucide-react';

const StudentDiscussions = () => {
  const [discussions, setDiscussions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDiscussions();
      setDiscussions(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Q&A Discussions</h1>
          <p className="text-slate-500 mt-1">Ask doubts and help your peers.</p>
        </div>
        
        <button className="bg-violet-600 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-violet-700 transition-colors w-full sm:w-auto shadow-sm">
          <Plus className="w-5 h-5" /> Ask Question
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-4">
          <div className="relative mb-6">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search for questions, tags, or subjects..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-violet-500 outline-none shadow-sm"
            />
          </div>
          
          {loading ? (
            [1,2].map(i => <div key={i} className="h-32 bg-white border border-slate-200 rounded-xl animate-pulse"></div>)
          ) : (
            discussions.map(disc => (
              <DiscussionCard key={disc.id} discussion={disc} />
            ))
          )}
        </div>
        
        <div className="w-full lg:w-72 shrink-0 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <h3 className="font-bold text-slate-800 mb-4">Popular Tags</h3>
            <div className="flex flex-wrap gap-2">
              {['DBMS', 'Operating Systems', 'Midterm', 'Assignment Help', 'CPU Scheduling', 'SQL'].map(tag => (
                <span key={tag} className="text-xs font-semibold text-violet-600 bg-violet-50 px-2 py-1 rounded-md border border-violet-100 hover:bg-violet-100 cursor-pointer transition-colors">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDiscussions;
