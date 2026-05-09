import React from 'react';
import ReportQueue from '../../components/admin/ReportQueue';
import { Search, Filter, ShieldAlert, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

const AdminReports = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Reports & Moderation</h1>
          <p className="text-slate-500 mt-1">Review flagged content, resolve disputes, and maintain community guidelines.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-2">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex items-center gap-4">
          <div className="p-3 bg-amber-100 text-amber-600 rounded-lg">
            <AlertTriangle size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Pending</p>
            <p className="text-2xl font-bold text-slate-800">12</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex items-center gap-4">
          <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg">
            <CheckCircle size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Resolved</p>
            <p className="text-2xl font-bold text-slate-800">145</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex items-center gap-4">
          <div className="p-3 bg-slate-100 text-slate-600 rounded-lg">
            <XCircle size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Dismissed</p>
            <p className="text-2xl font-bold text-slate-800">34</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex items-center gap-4">
          <div className="p-3 bg-red-100 text-red-600 rounded-lg">
            <ShieldAlert size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Bans Issued</p>
            <p className="text-2xl font-bold text-slate-800">8</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
        {/* Filters Bar */}
        <div className="p-4 md:p-5 border-b border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-50/50">
          <div className="relative w-full sm:max-w-md">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search reports by keyword, user, or ID..." 
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
            />
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <select className="bg-white border border-slate-200 text-slate-700 text-sm rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500 min-w-[140px] w-full sm:w-auto">
              <option value="pending">Status: Pending</option>
              <option value="resolved">Status: Resolved</option>
              <option value="rejected">Status: Dismissed</option>
              <option value="">All Statuses</option>
            </select>
            
            <button className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-600 p-2.5 rounded-lg hover:bg-slate-50 transition-colors shrink-0" title="More Filters">
              <Filter size={18} />
            </button>
          </div>
        </div>

        {/* Table Area */}
        <ReportQueue />
      </div>
    </div>
  );
};

export default AdminReports;
