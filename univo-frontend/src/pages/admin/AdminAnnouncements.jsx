import React from 'react';
import { Search, Plus, Filter, Megaphone, Trash2, Edit2, Eye } from 'lucide-react';

const dummyAnnouncements = [
  { id: '1', title: 'Mid-Term Examination Schedule', author: 'Dr. Sarah Smith (HOD CSE)', audience: 'CSE Students', date: '2023-10-24', status: 'published' },
  { id: '2', title: 'Campus Placement Drive 2024', author: 'Placement Cell', audience: 'All Final Year Students', date: '2023-10-23', status: 'published' },
  { id: '3', title: 'System Maintenance Downtime', author: 'Super Admin', audience: 'All Users', date: '2023-10-25', status: 'scheduled' },
];

const AdminAnnouncements = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Global Announcements</h1>
          <p className="text-slate-500 mt-1">Manage platform-wide broadcasts and department notices.</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-600/20 w-full sm:w-auto justify-center">
          <Plus size={18} />
          Create Announcement
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
        {/* Filters Bar */}
        <div className="p-4 md:p-5 border-b border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-50/50">
          <div className="relative w-full sm:max-w-md">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search announcements..." 
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
            />
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <select className="bg-white border border-slate-200 text-slate-700 text-sm rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500 min-w-[140px] w-full sm:w-auto">
              <option value="">All Audiences</option>
              <option value="all">All Users</option>
              <option value="students">Students Only</option>
              <option value="faculty">Faculty Only</option>
            </select>
          </div>
        </div>

        {/* Table Area */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-y border-slate-200">
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Title</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Author</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Audience</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {dummyAnnouncements.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-orange-50 border border-orange-100 text-orange-600 flex items-center justify-center">
                        <Megaphone size={18} />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-800 text-sm">{item.title}</span>
                        <span className="text-xs text-slate-500">{item.date}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-700 font-medium">
                    {item.author}
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-600">
                    {item.audience}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
                      item.status === 'published' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-amber-100 text-amber-700 border-amber-200'
                    }`}>
                      {item?.status ? item.status.charAt(0).toUpperCase() + item.status.slice(1) : ''}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="View">
                        <Eye size={16} />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Edit">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAnnouncements;
