import React from 'react';
import { Megaphone, MoreHorizontal, Users, Calendar } from 'lucide-react';

const AnnouncementPanel = () => {
  const announcements = [
    {
      id: 1,
      title: 'Department Meeting Tomorrow',
      content: 'Mandatory meeting for all faculty members at 10 AM in Conference Room B regarding the upcoming accreditation process.',
      target: 'All Faculty',
      date: 'Today, 09:00 AM'
    },
    {
      id: 2,
      title: 'Guest Lecture Series',
      content: 'Dr. Emily Chen will be visiting the department next week to deliver a series of talks on Quantum Computing. Please encourage your senior students to attend.',
      target: '3rd & 4th Year',
      date: 'Yesterday, 02:30 PM'
    }
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm h-full flex flex-col">
      <div className="p-5 border-b border-slate-200 flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <Megaphone className="w-5 h-5 text-emerald-500" />
          Department Announcements
        </h3>
        <button className="text-sm bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg font-semibold hover:bg-emerald-100 transition-colors">
          View All
        </button>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        {announcements.map(ann => (
          <div key={ann.id} className="p-5 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-bold text-slate-800 text-base">{ann.title}</h4>
              <button className="text-slate-400 hover:text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-sm text-slate-600 mb-5 leading-relaxed">{ann.content}</p>
            
            <div className="flex items-center justify-between pt-3 border-t border-slate-200/60">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 bg-white px-2 py-1 rounded border border-slate-200 shadow-sm">
                <Users className="w-3.5 h-3.5 text-indigo-500" /> {ann.target}
              </span>
              <span className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                <Calendar className="w-3.5 h-3.5" /> {ann.date}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementPanel;
