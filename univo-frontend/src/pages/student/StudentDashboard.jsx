import React, { useEffect, useState } from 'react';
import ProgressCard from '../../components/student/ProgressCard';
import UpcomingTasks from '../../components/student/UpcomingTasks';
import AssignmentCard from '../../components/student/AssignmentCard';
import AnnouncementCard from '../../components/student/AnnouncementCard';
import { getStudentDashboardStats, getStudentAssignments, getStudentAnnouncements } from '../../services/studentService';

const StudentDashboard = () => {
  const [stats, setStats] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, assignmentData, annData] = await Promise.all([
          getStudentDashboardStats(),
          getStudentAssignments(),
          getStudentAnnouncements()
        ]);
        setStats(statsData);
        setAssignments(assignmentData.slice(0, 2));
        setAnnouncements(annData.slice(0, 2));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Welcome back, Alex! 👋</h1>
        <p className="text-slate-500 mt-1">Here is what's happening with your courses today.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: "Today's Classes", val: stats?.todaysClasses, color: "text-violet-600", bg: "bg-violet-50" },
          { label: "Pending Work", val: stats?.pendingAssignments, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Attendance", val: `${stats?.attendancePercent}%`, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Unread Notices", val: stats?.unreadAnnouncements, color: "text-rose-600", bg: "bg-rose-50" },
          { label: "Bookmarks", val: stats?.bookmarkedResources, color: "text-indigo-600", bg: "bg-indigo-50" },
          { label: "Deadlines", val: stats?.upcomingDeadlines, color: "text-red-600", bg: "bg-red-50" },
        ].map((item, i) => (
          <div key={i} className={`rounded-xl border border-slate-200 p-4 bg-white hover:shadow-md transition-shadow`}>
            <p className="text-xs font-semibold text-slate-500 mb-1">{item.label}</p>
            <h3 className={`text-2xl font-black ${item.color}`}>{loading ? '-' : item.val}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[350px]">
        <div className="lg:col-span-2 h-full flex flex-col gap-6">
          <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg text-slate-800">Urgent Assignments</h3>
              <button className="text-sm font-semibold text-violet-600">View All</button>
            </div>
            <div className="space-y-3">
              {assignments.map(a => <AssignmentCard key={a.id} assignment={a} />)}
            </div>
          </div>
        </div>
        
        <div className="h-full flex flex-col gap-6">
          <ProgressCard />
          <div className="flex-1">
            <UpcomingTasks tasks={assignments} />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg text-slate-800">Latest Announcements</h3>
          </div>
          <div className="space-y-4">
            {announcements.map(ann => <AnnouncementCard key={ann.id} announcement={ann} />)}
          </div>
        </div>
        
        <div className="bg-slate-800 rounded-xl shadow-sm p-6 text-white flex flex-col justify-center items-center text-center relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-violet-500/20 blur-3xl rounded-full"></div>
          <h3 className="text-xl font-bold mb-2">Join the Campus Hackathon!</h3>
          <p className="text-slate-300 text-sm mb-6 max-w-sm">Build incredible projects, win prizes, and network with top tech companies. Registrations close in 2 days.</p>
          <button className="bg-violet-500 hover:bg-violet-600 text-white px-6 py-2.5 rounded-lg font-bold transition-colors">
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
