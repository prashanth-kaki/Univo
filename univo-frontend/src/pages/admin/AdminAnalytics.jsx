import React from 'react';
import { BarChart3, TrendingUp, Users, FileText, Download } from 'lucide-react';

const AdminAnalytics = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Platform Analytics</h1>
          <p className="text-slate-500 mt-1">Deep insights into user engagement, content creation, and platform growth.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select className="bg-white border border-slate-200 text-slate-700 text-sm rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 min-w-[120px]">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>This Semester</option>
            <option>This Year</option>
          </select>
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-600/20 w-full sm:w-auto justify-center">
            <Download size={18} />
            Export Report
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Users size={20} /></div>
            <h3 className="font-semibold text-slate-700">Total Engagement</h3>
          </div>
          <p className="text-3xl font-bold text-slate-800">84.2K</p>
          <p className="text-sm text-emerald-600 mt-1 flex items-center gap-1">
            <TrendingUp size={14} /> +12.5% this month
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg"><FileText size={20} /></div>
            <h3 className="font-semibold text-slate-700">Content Created</h3>
          </div>
          <p className="text-3xl font-bold text-slate-800">1,245</p>
          <p className="text-sm text-emerald-600 mt-1 flex items-center gap-1">
            <TrendingUp size={14} /> +8.2% this month
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-purple-100 text-purple-600 rounded-lg"><BarChart3 size={20} /></div>
            <h3 className="font-semibold text-slate-700">Avg. Session Time</h3>
          </div>
          <p className="text-3xl font-bold text-slate-800">14m 20s</p>
          <p className="text-sm text-slate-500 mt-1 flex items-center gap-1">
            Stable vs last month
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg"><Users size={20} /></div>
            <h3 className="font-semibold text-slate-700">Daily Active Users</h3>
          </div>
          <p className="text-3xl font-bold text-slate-800">4,120</p>
          <p className="text-sm text-emerald-600 mt-1 flex items-center gap-1">
            <TrendingUp size={14} /> +4.1% this week
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main Charts */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col min-h-[350px]">
          <h2 className="text-lg font-bold text-slate-800 mb-4">User Growth Trend</h2>
          <div className="flex-1 border-2 border-dashed border-slate-100 rounded-xl flex items-center justify-center bg-slate-50">
            <p className="text-slate-400 font-medium">Area Chart: Monthly Active Users vs New Registrations</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col min-h-[350px]">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Engagement by Department</h2>
          <div className="flex-1 border-2 border-dashed border-slate-100 rounded-xl flex items-center justify-center bg-slate-50">
            <p className="text-slate-400 font-medium">Bar Chart: Activity by Department (CSE vs ECE vs IT)</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col min-h-[350px]">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Content Distribution</h2>
          <div className="flex-1 border-2 border-dashed border-slate-100 rounded-xl flex items-center justify-center bg-slate-50">
            <p className="text-slate-400 font-medium">Pie Chart: Resources vs Announcements vs Forum Posts</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col min-h-[350px]">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Peak Activity Hours</h2>
          <div className="flex-1 border-2 border-dashed border-slate-100 rounded-xl flex items-center justify-center bg-slate-50">
            <p className="text-slate-400 font-medium">Heatmap/Line Chart: Login Activity over 24h</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
