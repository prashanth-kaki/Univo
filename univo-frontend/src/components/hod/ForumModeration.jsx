import React from 'react';
import { MessageSquareWarning, Search, Filter, ShieldAlert, Trash2, CheckCircle } from 'lucide-react';

const ForumModeration = ({ queue, loading }) => {
  if (loading) {
    return <div className="bg-white rounded-xl border border-slate-200 shadow-sm h-96 animate-pulse"></div>;
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <MessageSquareWarning className="w-5 h-5 text-rose-500" />
          Flagged Discussions
        </h3>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search author..."
              className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm w-full outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>
          <button className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto flex-1 p-4 space-y-4">
        {queue?.map((item) => (
          <div key={item.id} className="border border-slate-200 rounded-xl p-4 bg-slate-50 hover:bg-white hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
                  {item?.author?.charAt(0) || 'U'}
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-sm">{item.author}</p>
                  <p className="text-xs text-slate-500">{item.time} • {item.type}</p>
                </div>
              </div>
              <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 border border-rose-200">
                <ShieldAlert className="w-3.5 h-3.5" /> {item.reason}
              </span>
            </div>
            
            <div className="bg-white border border-slate-200 p-4 rounded-lg mb-4 text-slate-700 text-sm italic">
              "{item.content}"
            </div>
            
            <div className="flex items-center justify-between border-t border-slate-200 pt-3">
              <p className="text-xs font-medium text-slate-500">Flagged by: {item.flaggedBy}</p>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors">
                  <CheckCircle className="w-4 h-4" /> Ignore
                </button>
                <button className="flex items-center gap-1.5 bg-rose-600 text-white hover:bg-rose-700 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors">
                  <Trash2 className="w-4 h-4" /> Delete Post
                </button>
              </div>
            </div>
          </div>
        ))}
        {(!queue || queue.length === 0) && (
          <div className="text-center py-12 text-slate-500">
            <ShieldAlert className="w-12 h-12 mx-auto text-slate-300 mb-3" />
            <p>No flagged discussions to moderate.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForumModeration;
