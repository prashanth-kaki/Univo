import React from 'react';
import { MessageCircle, ArrowBigUp, ArrowBigDown, CheckCircle } from 'lucide-react';

const DiscussionCard = ({ discussion }) => {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 hover:shadow-md transition-shadow flex gap-4">
      <div className="flex flex-col items-center gap-1 bg-slate-50 p-2 rounded-lg border border-slate-100 shrink-0 h-fit">
        <button className="text-slate-400 hover:text-violet-600 transition-colors">
          <ArrowBigUp className="w-6 h-6" />
        </button>
        <span className="font-bold text-slate-700">{discussion.upvotes}</span>
        <button className="text-slate-400 hover:text-rose-600 transition-colors">
          <ArrowBigDown className="w-6 h-6" />
        </button>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4 mb-1">
          <h4 className="font-bold text-slate-800 text-lg hover:text-violet-700 cursor-pointer transition-colors truncate">
            {discussion.title}
          </h4>
          {discussion.resolved && (
            <span className="shrink-0 flex items-center gap-1 text-xs font-bold bg-emerald-100 text-emerald-700 px-2 py-1 rounded">
              <CheckCircle className="w-3.5 h-3.5" /> Solved
            </span>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="text-[10px] uppercase font-bold text-violet-700 bg-violet-100 px-2 py-0.5 rounded border border-violet-200">
            {discussion.subject}
          </span>
          {discussion.tags.map(tag => (
            <span key={tag} className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
          <span className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded border border-slate-100">
            <MessageCircle className="w-3.5 h-3.5" /> {discussion.replies} Replies
          </span>
          <span>Asked by <span className={discussion.author === 'You' ? 'text-violet-600 font-bold' : 'text-slate-700 font-semibold'}>{discussion.author}</span></span>
          <span>{discussion.time}</span>
        </div>
      </div>
    </div>
  );
};

export default DiscussionCard;
