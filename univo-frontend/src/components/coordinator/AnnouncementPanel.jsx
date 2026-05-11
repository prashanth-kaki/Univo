import React from 'react';
import { Megaphone, Pin, Trash2, Edit2 } from 'lucide-react';

const AnnouncementPanel = () => {
  const notices = [
    { id: 1, title: 'Exam Registration Deadline', audience: 'All Students', time: '2 hours ago', pinned: true },
    { id: 2, title: 'Lab Equipment Audit', audience: 'CS-A, CS-B', time: 'Yesterday', pinned: false },
    { id: 3, title: 'Faculty Meeting @ 4PM', audience: 'All Faculty', time: '2 days ago', pinned: false },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <Megaphone className="w-5 h-5 text-violet-600" />
          Recent Notices
        </h3>
        <button className="text-sm font-semibold text-violet-600 hover:text-violet-700">View All</button>
      </div>

      <div className="flex-1 overflow-auto space-y-3 pr-1">
        {notices.map(notice => (
          <div key={notice.id} className="p-3 border border-slate-100 rounded-lg hover:border-violet-200 hover:shadow-sm transition-all group bg-slate-50 hover:bg-white relative">
            <div className="flex items-start justify-between mb-1">
              <h4 className="font-semibold text-slate-800 text-sm flex items-center gap-1.5">
                {notice.pinned && <Pin className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />}
                {notice.title}
              </h4>
              <span className="text-[10px] font-medium text-slate-400">{notice.time}</span>
            </div>
            <p className="text-xs font-semibold text-violet-600">{notice.audience}</p>
            
            {/* Hover Actions */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 p-1 rounded-md shadow-sm">
              <button className="p-1.5 text-slate-400 hover:text-blue-600 rounded transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
              <button className="p-1.5 text-slate-400 hover:text-rose-600 rounded transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 bg-violet-50 text-violet-700 border border-violet-100 py-2 rounded-lg text-sm font-semibold hover:bg-violet-100 transition-colors">
        + Create Notice
      </button>
    </div>
  );
};

export default AnnouncementPanel;
