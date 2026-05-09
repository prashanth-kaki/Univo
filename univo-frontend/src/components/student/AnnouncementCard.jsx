import React from 'react';
import { Megaphone, Pin, Clock } from 'lucide-react';

const AnnouncementCard = ({ announcement }) => {
  if (!announcement) return null;

  const authorName = announcement?.author?.name || announcement?.author || 'Admin';
  const title = announcement?.title || 'Announcement';
  const content = announcement?.content || announcement?.message || '';

  return (
    <div className={`p-4 rounded-xl border transition-all ${
      announcement?.isNew ? 'bg-violet-50/50 border-violet-200' : 'bg-white border-slate-200 hover:shadow-sm'
    }`}>
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          {announcement?.pinned && <Pin className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />}
          <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
            announcement?.type === 'Department' ? 'bg-indigo-100 text-indigo-700' :
            announcement?.type === 'Faculty' ? 'bg-emerald-100 text-emerald-700' :
            'bg-slate-200 text-slate-700'
          }`}>
            {announcement?.type || 'General'}
          </span>
          {announcement?.isNew && (
            <span className="w-2 h-2 rounded-full bg-violet-500"></span>
          )}
        </div>
        <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" /> {announcement?.date || new Date(announcement?.createdAt || Date.now()).toLocaleDateString()}
        </span>
      </div>
      
      <h4 className={`text-base mb-1 ${announcement?.isNew ? 'font-bold text-violet-900' : 'font-semibold text-slate-800'}`}>
        {title}
      </h4>
      <p className="text-sm text-slate-600 line-clamp-2 mb-3">
        {content}
      </p>
      
      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center">
          {authorName?.charAt(0) || 'A'}
        </div>
        By {authorName}
      </div>
    </div>
  );
};

export default AnnouncementCard;
