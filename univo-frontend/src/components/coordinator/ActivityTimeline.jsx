import React from 'react';
import { Calendar, FileEdit, UserCheck, MessageSquare } from 'lucide-react';

const ActivityTimeline = () => {
  const activities = [
    { id: 1, type: 'schedule', text: 'Updated timetable for CS-B Lab sessions', time: '10 mins ago', icon: Calendar, color: 'text-blue-500', bg: 'bg-blue-100' },
    { id: 2, type: 'faculty', text: 'Approved leave request for Dr. Smith', time: '1 hour ago', icon: UserCheck, color: 'text-emerald-500', bg: 'bg-emerald-100' },
    { id: 3, type: 'notice', text: 'Published Midterm Exam Schedule notice', time: '3 hours ago', icon: MessageSquare, color: 'text-violet-500', bg: 'bg-violet-100' },
    { id: 4, type: 'report', text: 'Generated weekly attendance shortage report', time: 'Yesterday', icon: FileEdit, color: 'text-amber-500', bg: 'bg-amber-100' },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 h-full flex flex-col">
      <h3 className="font-bold text-slate-800 mb-6 text-lg">Recent Coordination Actions</h3>
      
      <div className="flex-1 overflow-auto relative px-2">
        <div className="absolute top-0 bottom-0 left-[21px] w-0.5 bg-slate-100"></div>
        <div className="space-y-6">
          {activities.map(act => {
            const Icon = act.icon;
            return (
              <div key={act.id} className="flex gap-4 relative z-10">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border-2 border-white shadow-sm ${act.bg}`}>
                  <Icon className={`w-3.5 h-3.5 ${act.color}`} />
                </div>
                <div className="flex-1 pb-1">
                  <p className="text-sm font-semibold text-slate-700 leading-snug">{act.text}</p>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">{act.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <button className="w-full mt-4 text-sm font-semibold text-teal-600 hover:text-teal-700 text-center">
        View Full History
      </button>
    </div>
  );
};

export default ActivityTimeline;
