import React, { useState } from 'react';
import UserTable from '../../components/admin/tables/UserTable';
import { Search, Filter, Plus, Download } from 'lucide-react';

const AdminUsers = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">User Management</h1>
          <p className="text-slate-500 mt-1">Manage accounts, roles, and permissions across the platform.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg font-medium hover:bg-slate-50 transition-colors shadow-sm w-full sm:w-auto justify-center">
            <Download size={18} />
            Export
          </button>
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-600/20 w-full sm:w-auto justify-center">
            <Plus size={18} />
            Add User
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
              placeholder="Search by name, email, or ID..." 
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
            />
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <select className="bg-white border border-slate-200 text-slate-700 text-sm rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500 min-w-[120px]">
              <option value="">All Roles</option>
              <option value="admin">Admin</option>
              <option value="hod">HOD</option>
              <option value="faculty">Faculty</option>
              <option value="coordinator">Coordinator</option>
              <option value="student">Student</option>
            </select>
            
            <select className="bg-white border border-slate-200 text-slate-700 text-sm rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500 min-w-[120px]">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="banned">Banned</option>
            </select>
            
            <select className="bg-white border border-slate-200 text-slate-700 text-sm rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500 min-w-[140px]">
              <option value="">All Departments</option>
              <option value="cse">Computer Science</option>
              <option value="ece">Electronics</option>
              <option value="mech">Mechanical</option>
            </select>
            
            <button className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-600 p-2.5 rounded-lg hover:bg-slate-50 transition-colors shrink-0" title="More Filters">
              <Filter size={18} />
            </button>
          </div>
        </div>

        {/* Table Area */}
        <UserTable />
        
        {/* Pagination */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
          <span className="text-sm text-slate-500">Showing 1 to 5 of 12,450 users</span>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1 border border-slate-200 bg-white text-slate-600 rounded-md text-sm disabled:opacity-50 hover:bg-slate-50 transition-colors">Prev</button>
            <button className="px-3 py-1 bg-indigo-600 text-white rounded-md text-sm font-medium">1</button>
            <button className="px-3 py-1 border border-slate-200 bg-white text-slate-600 rounded-md text-sm hover:bg-slate-50 transition-colors">2</button>
            <button className="px-3 py-1 border border-slate-200 bg-white text-slate-600 rounded-md text-sm hover:bg-slate-50 transition-colors">3</button>
            <span className="px-2 text-slate-400">...</span>
            <button className="px-3 py-1 border border-slate-200 bg-white text-slate-600 rounded-md text-sm hover:bg-slate-50 transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
