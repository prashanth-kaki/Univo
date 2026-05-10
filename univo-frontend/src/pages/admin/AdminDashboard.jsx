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
import ReportQueue from '../../components/admin/ReportQueue';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';

const data = [
  { name: 'Jan', students: 4000, faculty: 240 },
  { name: 'Feb', students: 5000, faculty: 290 },
  { name: 'Mar', students: 6000, faculty: 350 },
  { name: 'Apr', students: 8500, faculty: 500 },
  { name: 'May', students: 10000, faculty: 650 },
  { name: 'Jun', students: 11000, faculty: 750 },
  { name: 'Jul', students: 12450, faculty: 850 },
];

const AdminDashboard = () => {
  const navigate = useNavigate();

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
          onClick={() => navigate('/admin/users')}
        />
        <StatsCard 
          title="Total Faculty" 
          value="850" 
          icon={<GraduationCap size={24} className="text-indigo-500" />} 
          trend="up" 
          trendValue="+3%" 
          colorClass="bg-indigo-500"
          onClick={() => navigate('/admin/users')}
        />
        <StatsCard 
          title="Total HODs" 
          value="24" 
          icon={<Building2 size={24} className="text-purple-500" />} 
          trend="up" 
          trendValue="0%" 
          colorClass="bg-purple-500"
          onClick={() => navigate('/admin/departments')}
        />
        <StatsCard 
          title="Total Coordinators" 
          value="45" 
          icon={<Briefcase size={24} className="text-pink-500" />} 
          trend="up" 
          trendValue="+2" 
          colorClass="bg-pink-500"
          onClick={() => navigate('/admin/users')}
        />
        <StatsCard 
          title="Active Users (24h)" 
          value="8,234" 
          icon={<UserCheck size={24} className="text-emerald-500" />} 
          trend="up" 
          trendValue="+15%" 
          colorClass="bg-emerald-500"
          onClick={() => navigate('/admin/users')}
        />
        <StatsCard 
          title="Pending Reports" 
          value="12" 
          icon={<ShieldAlert size={24} className="text-amber-500" />} 
          trend="down" 
          trendValue="-5" 
          colorClass="bg-amber-500"
          onClick={() => navigate('/admin/reports')}
        />
        <StatsCard 
          title="Total Announcements" 
          value="1,420" 
          icon={<Megaphone size={24} className="text-orange-500" />} 
          colorClass="bg-orange-500"
          onClick={() => navigate('/admin/announcements')}
        />
        <StatsCard 
          title="Total Resources" 
          value="3,215" 
          icon={<BookOpen size={24} className="text-cyan-500" />} 
          trend="up" 
          trendValue="+142" 
          colorClass="bg-cyan-500"
          onClick={() => navigate('/admin/resources')}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content area */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 min-h-[400px] flex flex-col">
            <h2 className="text-lg font-bold text-slate-800 mb-4">User Growth Analytics</h2>
            <div className="flex-1 min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorFaculty" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="students" stroke="#3b82f6" fillOpacity={1} fill="url(#colorStudents)" />
                  <Area type="monotone" dataKey="faculty" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorFaculty)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Recent Reports & Moderation Queue</h2>
            <div className="flex-1">
              <ReportQueue />
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
