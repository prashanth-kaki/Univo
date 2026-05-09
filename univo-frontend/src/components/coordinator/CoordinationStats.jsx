import React from 'react';
import { Users, AlertTriangle, CalendarDays, ClipboardCheck, Megaphone, BellRing } from 'lucide-react';

const CoordinationStats = ({ stats, loading }) => {
  const statCards = [
    { label: "Assigned Sections", val: stats?.assignedSections, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Total Students", val: stats?.totalStudents, icon: Users, color: "text-teal-600", bg: "bg-teal-50" },
    { label: "Pending Tasks", val: stats?.pendingTasks, icon: ClipboardCheck, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Upcoming Events", val: stats?.upcomingEvents, icon: CalendarDays, color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "Announcements", val: stats?.activeAnnouncements, icon: Megaphone, color: "text-violet-600", bg: "bg-violet-50" },
    { label: "Attendance Alerts", val: stats?.attendanceAlerts, icon: AlertTriangle, color: "text-rose-600", bg: "bg-rose-50" },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[1,2,3,4,5,6].map(i => <div key={i} className="h-24 bg-white border border-slate-200 rounded-xl animate-pulse"></div>)}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {statCards.map((item, i) => {
        const Icon = item.icon;
        return (
          <div key={i} className="rounded-xl border border-slate-200 p-4 bg-white hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className={`absolute -right-4 -top-4 w-16 h-16 ${item.bg} rounded-full group-hover:scale-150 transition-transform duration-500`}></div>
            <div className="relative z-10 flex justify-between items-start mb-2">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{item.label}</p>
              <Icon className={`w-4 h-4 ${item.color}`} />
            </div>
            <h3 className={`text-2xl font-black ${item.color} relative z-10`}>{item.val}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default CoordinationStats;
