import React from 'react';
import { Bookmark, ExternalLink } from 'lucide-react';

const BookmarkCard = ({ item }) => {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 hover:shadow-md transition-shadow group flex items-start justify-between">
      <div>
        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-700 mb-2 inline-block">
          {item.type}
        </span>
        <h4 className="font-bold text-slate-800 text-base mb-1">{item.title}</h4>
        <p className="text-sm text-slate-500 line-clamp-1">{item.subject}</p>
      </div>
      <div className="flex flex-col items-end gap-2">
        <button className="text-amber-500 hover:text-amber-600 transition-colors">
          <Bookmark className="w-5 h-5 fill-amber-500" />
        </button>
        <button className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-violet-100 group-hover:text-violet-600 transition-colors opacity-0 group-hover:opacity-100">
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default BookmarkCard;
