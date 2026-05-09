import React, { useEffect, useState } from 'react';
import AnnouncementCard from '../../components/student/AnnouncementCard';
import { getStudentAnnouncements } from '../../services/studentService';
import { Filter } from 'lucide-react';

const StudentAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      const data = await getStudentAnnouncements();
      setAnnouncements(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const filteredAnnouncements = filter === 'All' 
    ? announcements 
    : filter === 'Unread' 
      ? announcements.filter(a => a.isNew)
      : announcements.filter(a => a.type === filter);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Announcements</h1>
          <p className="text-slate-500 mt-1">Stay updated with official notices and messages.</p>
        </div>
        
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
          {['All', 'Unread', 'Department', 'Faculty', 'Global'].map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${
                filter === f 
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-500/20' 
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-6 min-h-[500px]">
        {loading ? (
          <div className="space-y-4">
            {[1,2,3].map(i => <div key={i} className="h-32 bg-slate-50 border border-slate-100 rounded-xl animate-pulse"></div>)}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAnnouncements.map(ann => (
              <AnnouncementCard key={ann.id} announcement={ann} />
            ))}
            {filteredAnnouncements.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-500 font-medium">No announcements found for this filter.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentAnnouncements;
