import React from 'react';
import { ShieldAlert, UserPlus, FileText, Trash2, ShieldCheck } from 'lucide-react';
import { cn } from '../../utils/cn';

const activities = [
  {
    id: 1,
    type: 'ban',
    message: 'User @john_doe was banned for policy violation.',
    time: '10 mins ago',
    icon: ShieldAlert,
    colorClass: 'bg-red-100 text-red-600',
  },
  {
    id: 2,
    type: 'role',
    message: 'Dr. Smith was assigned as HOD of Computer Science.',
    time: '1 hour ago',
    icon: UserPlus,
    colorClass: 'bg-indigo-100 text-indigo-600',
  },
  {
    id: 3,
    type: 'report',
    message: 'Report #421 was resolved successfully.',
    time: '2 hours ago',
    icon: ShieldCheck,
    colorClass: 'bg-emerald-100 text-emerald-600',
  },
  {
    id: 4,
    type: 'content',
    message: 'New university-wide circular was published.',
    time: '5 hours ago',
    icon: FileText,
    colorClass: 'bg-blue-100 text-blue-600',
  },
  {
    id: 5,
    type: 'delete',
    message: 'Deleted 15 inactive user accounts.',
    time: '1 day ago',
    icon: Trash2,
    colorClass: 'bg-slate-100 text-slate-600',
  },
];

const ActivityFeed = () => {
  return (
    <div className="flex flex-col relative">
      {/* Vertical line connecting timeline items */}
      <div className="absolute left-[19px] top-4 bottom-4 w-px bg-slate-200 z-0"></div>
      
      <div className="flex flex-col gap-6 z-10">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="flex gap-4 group">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-[3px] border-white shadow-sm transition-transform group-hover:scale-110",
                activity.colorClass
              )}>
                <Icon size={18} />
              </div>
              <div className="flex flex-col pt-2">
                <p className="text-sm font-medium text-slate-800 leading-snug">{activity.message}</p>
                <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 pt-4 border-t border-slate-100">
        <button className="w-full text-center text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
          View All Activity Logs
        </button>
      </div>
    </div>
  );
};

export default ActivityFeed;
