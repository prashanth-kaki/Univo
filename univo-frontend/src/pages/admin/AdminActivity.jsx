import React from 'react';
import { Search, Filter, Download } from 'lucide-react';
import ActivityFeed from '../../components/admin/ActivityFeed';

const AdminActivity = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">System Activity Logs</h1>
          <p className="text-slate-500 mt-1">Audit trail of all administrative and user actions across the platform.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg font-medium hover:bg-slate-50 transition-colors shadow-sm w-full sm:w-auto justify-center">
            <Download size={18} />
            Export Logs (CSV)
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
        {/* Filters Bar */}
        <div className="p-4 md:p-5 border-b border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-50/50">
          <div className="relative w-full sm:max-w-md">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by user, action, or keyword..." 
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
            />
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <select className="bg-white border border-slate-200 text-slate-700 text-sm rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500 min-w-[140px]">
              <option value="">All Event Types</option>
              <option value="auth">Authentication</option>
              <option value="user_management">User Management</option>
              <option value="content_moderation">Content Moderation</option>
              <option value="system_settings">System Settings</option>
            </select>
            
            <input type="date" className="bg-white border border-slate-200 text-slate-700 text-sm rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500 min-w-[140px]" />
            
            <button className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-600 p-2.5 rounded-lg hover:bg-slate-50 transition-colors shrink-0" title="More Filters">
              <Filter size={18} />
            </button>
          </div>
        </div>

        {/* Activity Feed Area */}
        <div className="p-6 md:p-8">
          <ActivityFeed />
          
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <button className="px-6 py-2.5 bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors font-medium rounded-lg text-sm">
              Load More History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminActivity;
