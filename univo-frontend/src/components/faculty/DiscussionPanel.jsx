import React from 'react';
import { MessageSquare, ThumbsUp, Reply } from 'lucide-react';

const DiscussionPanel = () => {
  const discussions = [
    {
      id: 1,
      student: 'Alice Smith',
      avatar: 'A',
      question: 'How does a Red-Black tree differ from an AVL tree in terms of balancing?',
      subject: 'Data Structures',
      time: '2 hours ago',
      replies: 3,
      likes: 12,
      hasFacultyReply: false
    },
    {
      id: 2,
      student: 'Bob Johnson',
      avatar: 'B',
      question: 'Can someone explain the time complexity of QuickSort in the worst-case scenario?',
      subject: 'Algorithms',
      time: '5 hours ago',
      replies: 5,
      likes: 8,
      hasFacultyReply: true
    }
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="p-5 border-b border-slate-200 flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-indigo-500" />
          Recent Student Doubts
        </h3>
        <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700">View All</button>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        {discussions.map(d => (
          <div key={d.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-indigo-100 hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs">
                {d.avatar}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">{d.student}</p>
                <p className="text-xs text-slate-500">{d.subject} • {d.time}</p>
              </div>
            </div>
            
            <p className="text-sm text-slate-700 font-medium mb-4">{d.question}</p>
            
            <div className="flex items-center justify-between border-t border-slate-200 pt-3 mt-3">
              <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1.5"><ThumbsUp className="w-3.5 h-3.5" /> {d.likes}</span>
                <span className="flex items-center gap-1.5"><MessageSquare className="w-3.5 h-3.5" /> {d.replies} Replies</span>
              </div>
              
              {d.hasFacultyReply ? (
                <span className="bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded text-xs font-semibold">Answered</span>
              ) : (
                <button className="flex items-center gap-1.5 text-xs bg-indigo-600 text-white px-3 py-1.5 rounded font-medium hover:bg-indigo-700 transition-colors">
                  <Reply className="w-3.5 h-3.5" /> Reply
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscussionPanel;
