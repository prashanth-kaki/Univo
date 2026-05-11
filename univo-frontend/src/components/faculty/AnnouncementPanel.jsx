import React from 'react';
import { Megaphone, Pin, MoreHorizontal } from 'lucide-react';

const AnnouncementPanel = ({ announcements = [], loading = false }) => {
  if (loading) {
    return <div className="bg-white rounded-xl border border-slate-200 shadow-sm h-full p-6 animate-pulse" />;
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm h-full flex flex-col">
      <div className="p-5 border-b border-slate-200 flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <Megaphone className="w-5 h-5 text-indigo-500" />
          My Announcements
        </h3>
        <button className="text-sm bg-indigo-600 text-white px-3 py-1.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
          New
        </button>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        {announcements.map(ann => (
          <div key={ann._id || ann.id} className="relative p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-indigo-100 hover:shadow-md transition-all group">
            {ann.isPinned && (
              <div className="absolute top-0 right-4 -translate-y-1/2 bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-xs font-bold flex items-center gap-1 border border-amber-200">
                <Pin className="w-3 h-3 fill-current" /> Pinned
              </div>
            )}
            
            <div className="flex justify-between items-start mb-2 mt-1">
              <h4 className="font-bold text-slate-800">{ann.title}</h4>
              <button className="text-slate-400 hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-sm text-slate-600 mb-4 leading-relaxed">{ann.message || ann.content}</p>
            
            <div className="flex items-center justify-between mt-auto">
              <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs font-semibold">
                Target: {ann.targetAudience || ann.target || 'All Sections'}
              </span>
              <span className="text-xs font-medium text-slate-500">{new Date(ann.createdAt || ann.date || Date.now()).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
        {announcements.length === 0 && (
          <div className="text-center p-8 text-slate-500">
            No announcements found.
          </div>
        )}
      </div>
    </div>
  );
};

export default AnnouncementPanel;
