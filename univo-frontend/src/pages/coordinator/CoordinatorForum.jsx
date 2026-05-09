import React from 'react';
import { ShieldAlert, Trash2, EyeOff } from 'lucide-react';

const CoordinatorForum = () => {
  const flaggedPosts = [
    { id: 1, author: 'Student A', content: 'Can anyone share the exact exam questions from last year? I need them ASAP.', reason: 'Academic Integrity', time: '1 hour ago' },
    { id: 2, author: 'Student B', content: 'This assignment is completely pointless. Waste of time.', reason: 'Inappropriate Language / Unprofessional', time: '3 hours ago' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Forum Moderation</h1>
        <p className="text-slate-500 mt-1">Review flagged discussions and maintain community guidelines.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col flex-1">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between shrink-0">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-500" /> Flagged Content Queue
          </h3>
          <span className="text-xs font-bold bg-rose-100 text-rose-700 px-2.5 py-1 rounded-full">
            {flaggedPosts.length} Pending
          </span>
        </div>
        
        <div className="flex-1 overflow-auto p-6 space-y-4">
          {flaggedPosts.map(post => (
            <div key={post.id} className="bg-white border border-rose-200 rounded-xl p-5 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-800">{post.author}</span>
                  <span className="text-xs text-slate-400 font-medium">{post.time}</span>
                </div>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-700 border border-amber-200">
                  {post.reason}
                </span>
              </div>
              
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-sm text-slate-700 mb-4 font-medium italic">
                "{post.content}"
              </div>
              
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-colors">
                  <EyeOff className="w-4 h-4" /> Ignore
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 transition-colors shadow-sm">
                  <Trash2 className="w-4 h-4" /> Remove Post
                </button>
              </div>
            </div>
          ))}
          
          {flaggedPosts.length === 0 && (
            <div className="text-center py-20 text-slate-500 font-medium">
              Queue is empty. Community looks healthy!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoordinatorForum;
