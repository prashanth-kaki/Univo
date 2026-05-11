import React from 'react';
import { AlertTriangle, Check, X, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import { resolveReport } from '../../services/hodService';

const ResourceModeration = ({ queue, loading, onRefresh }) => {
  const handleResolve = async (id, action) => {
    try {
      await resolveReport(id);
      toast.success(`Content ${action === 'approve' ? 'approved' : 'removed'}`);
      if (onRefresh) onRefresh();
    } catch (error) {
      toast.error('Failed to moderate content');
    }
  };

  if (loading) {
    return <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 h-64 animate-pulse"></div>;
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm h-full flex flex-col">
      <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-rose-50/30">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-rose-500" />
          Moderation Queue
        </h3>
        <span className="bg-rose-100 text-rose-700 px-2.5 py-0.5 rounded-full text-xs font-bold">
          {queue?.length || 0} Pending
        </span>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        {queue?.map(item => (
          <div key={item.id} className="p-4 rounded-xl border border-rose-100 bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  {item.type}
                </span>
                <span className="text-[10px] text-slate-400 ml-2">{item.time}</span>
              </div>
              <button className="text-indigo-600 hover:text-indigo-800 text-xs font-medium flex items-center gap-1">
                View Context <ExternalLink className="w-3 h-3" />
              </button>
            </div>
            
            <p className="text-sm font-medium text-slate-800 my-3 bg-slate-50 p-3 rounded-lg border border-slate-100 italic">
              "{item.content}"
            </p>
            
            <div className="text-xs text-slate-600 mb-4 flex items-center gap-2">
              <span className="font-semibold">Author:</span> {item.author}
              <span className="text-slate-300">|</span>
              <span className="font-semibold text-rose-600 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> Flagged: {item.reason}
              </span>
            </div>
            
            <div className="flex items-center gap-2 border-t border-slate-100 pt-3">
              <button 
                onClick={() => handleResolve(item.id || item._id, 'approve')}
                className="flex-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 py-1.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Check className="w-4 h-4" /> Approve
              </button>
              <button 
                onClick={() => handleResolve(item.id || item._id, 'remove')}
                className="flex-1 bg-rose-50 text-rose-700 hover:bg-rose-100 py-1.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <X className="w-4 h-4" /> Remove
              </button>
            </div>
          </div>
        ))}
        {(!queue || queue.length === 0) && (
          <div className="text-center py-8 text-slate-500">
            <Check className="w-10 h-10 mx-auto text-emerald-400 mb-2 opacity-50" />
            <p>Queue is empty. Great job!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceModeration;
