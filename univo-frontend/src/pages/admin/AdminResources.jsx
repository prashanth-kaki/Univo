import React from 'react';
import { Search, Filter, BookOpen, Trash2, Eye, Download, ShieldAlert } from 'lucide-react';

const dummyResources = [
  { id: '1', title: 'Data Structures Notes', uploader: 'John Doe', department: 'CSE', type: 'PDF', size: '2.4 MB', date: '2023-10-24', status: 'approved' },
  { id: '2', title: 'Calculus Assignment Answers', uploader: 'Alex Wilson', department: 'Math', type: 'DOCX', size: '1.1 MB', date: '2023-10-23', status: 'flagged' },
  { id: '3', title: 'Physics Lab Manual', uploader: 'Dr. Sarah', department: 'Physics', type: 'PDF', size: '5.6 MB', date: '2023-10-22', status: 'approved' },
];

const AdminResources = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Resource Moderation</h1>
          <p className="text-slate-500 mt-1">Manage and moderate all study materials uploaded to the platform.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
        {/* Filters Bar */}
        <div className="p-4 md:p-5 border-b border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-50/50">
          <div className="relative w-full sm:max-w-md">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search resources by title or uploader..." 
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
            />
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <select className="bg-white border border-slate-200 text-slate-700 text-sm rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500 min-w-[140px] w-full sm:w-auto">
              <option value="">All Statuses</option>
              <option value="approved">Approved</option>
              <option value="flagged">Flagged / Reported</option>
            </select>
          </div>
        </div>

        {/* Table Area */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-y border-slate-200">
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Resource</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Uploader</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Dept</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {dummyResources.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-cyan-50 border border-cyan-100 text-cyan-600 flex items-center justify-center">
                        <BookOpen size={18} />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-800 text-sm">{item.title}</span>
                        <span className="text-xs text-slate-500">{item.type} • {item.size} • {item.date}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-700 font-medium">
                    {item.uploader}
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-600">
                    {item.department}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 w-fit ${
                      item.status === 'approved' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-red-100 text-red-700 border-red-200'
                    }`}>
                      {item.status === 'flagged' && <ShieldAlert size={12} />}
                      {item?.status ? item.status.charAt(0).toUpperCase() + item.status.slice(1) : ''}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="View">
                        <Eye size={16} />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Download">
                        <Download size={16} />
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

export default AdminResources;
