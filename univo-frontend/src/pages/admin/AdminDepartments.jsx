import React from 'react';
import DepartmentTable from '../../components/admin/tables/DepartmentTable';
import { Search, Plus, Download, Building2 } from 'lucide-react';

const AdminDepartments = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Department Management</h1>
          <p className="text-slate-500 mt-1">Manage academic departments, assign HODs, and oversee sections.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg font-medium hover:bg-slate-50 transition-colors shadow-sm w-full sm:w-auto justify-center">
            <Download size={18} />
            Export
          </button>
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-600/20 w-full sm:w-auto justify-center">
            <Plus size={18} />
            Add Department
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex items-center gap-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
            <Building2 size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Departments</p>
            <p className="text-2xl font-bold text-slate-800">12</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex items-center gap-4">
          <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
            <Building2 size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Active Sections</p>
            <p className="text-2xl font-bold text-slate-800">48</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex items-center gap-4">
          <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg">
            <Building2 size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Average Capacity</p>
            <p className="text-2xl font-bold text-slate-800">92%</p>
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
              placeholder="Search departments..." 
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
            />
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <select className="bg-white border border-slate-200 text-slate-700 text-sm rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500 min-w-[140px] w-full sm:w-auto">
              <option value="">Sort by: Name (A-Z)</option>
              <option value="students">Most Students</option>
              <option value="faculty">Most Faculty</option>
            </select>
          </div>
        </div>

        {/* Table Area */}
        <DepartmentTable />
      </div>
    </div>
  );
};

export default AdminDepartments;
