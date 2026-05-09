import React from 'react';
import StatsCard from '../../components/admin/cards/StatsCard';
import { 
  Users, 
  GraduationCap, 
  Building2, 
  Briefcase, 
  UserCheck, 
  ShieldAlert, 
  Megaphone, 
  BookOpen 
} from 'lucide-react';
import SystemHealth from '../../components/admin/SystemHealth';
import ActivityFeed from '../../components/admin/ActivityFeed';

const AdminDashboard = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Super Admin Dashboard</h1>
        <p className="text-slate-500 mt-1">University control center overview and system metrics.</p>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          title="Total Students" 
          value="12,450" 
          icon={<Users size={24} className="text-blue-500" />} 
          trend="up" 
          trendValue="+12%" 
          colorClass="bg-blue-500"
        />
        <StatsCard 
          title="Total Faculty" 
          value="850" 
          icon={<GraduationCap size={24} className="text-indigo-500" />} 
          trend="up" 
          trendValue="+3%" 
          colorClass="bg-indigo-500"
        />
        <StatsCard 
          title="Total HODs" 
          value="24" 
          icon={<Building2 size={24} className="text-purple-500" />} 
          trend="up" 
          trendValue="0%" 
          colorClass="bg-purple-500"
        />
        <StatsCard 
          title="Total Coordinators" 
          value="45" 
          icon={<Briefcase size={24} className="text-pink-500" />} 
          trend="up" 
          trendValue="+2" 
          colorClass="bg-pink-500"
        />
        <StatsCard 
          title="Active Users (24h)" 
          value="8,234" 
          icon={<UserCheck size={24} className="text-emerald-500" />} 
          trend="up" 
          trendValue="+15%" 
          colorClass="bg-emerald-500"
        />
        <StatsCard 
          title="Pending Reports" 
          value="12" 
          icon={<ShieldAlert size={24} className="text-amber-500" />} 
          trend="down" 
          trendValue="-5" 
          colorClass="bg-amber-500"
        />
        <StatsCard 
          title="Total Announcements" 
          value="1,420" 
          icon={<Megaphone size={24} className="text-orange-500" />} 
          colorClass="bg-orange-500"
        />
        <StatsCard 
          title="Total Resources" 
          value="3,215" 
          icon={<BookOpen size={24} className="text-cyan-500" />} 
          trend="up" 
          trendValue="+142" 
          colorClass="bg-cyan-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content area */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 min-h-[400px] flex flex-col">
            <h2 className="text-lg font-bold text-slate-800 mb-4">User Growth Analytics</h2>
            <div className="flex-1 flex items-center justify-center border-2 border-dashed border-slate-100 rounded-lg">
              <p className="text-slate-400">Chart Component (Recharts/Chart.js) Placeholder</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 min-h-[400px] flex flex-col">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Recent Reports & Moderation Queue</h2>
            <div className="flex-1 flex items-center justify-center border-2 border-dashed border-slate-100 rounded-lg">
              <p className="text-slate-400">Moderation Table Placeholder</p>
            </div>
          </div>
        </div>

        {/* Sidebar content area */}
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col">
            <h2 className="text-lg font-bold text-slate-800 mb-4">System Health</h2>
            <div className="flex-1">
              <SystemHealth />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Recent Activity</h2>
            <div className="flex-1">
              <ActivityFeed />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
