import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Shield } from 'lucide-react';

const FacultyTable = ({ faculty, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFaculty = faculty?.filter(f => 
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    f.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-96 animate-pulse"></div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h3 className="text-lg font-bold text-slate-800">Faculty Management</h3>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search faculty..."
              className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 w-full sm:w-64 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200">
              <th className="p-4 font-semibold">Faculty Name & Role</th>
              <th className="p-4 font-semibold text-center">Assigned Subjects</th>
              <th className="p-4 font-semibold text-center">Resources Uploaded</th>
              <th className="p-4 font-semibold text-center">Status</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {filteredFaculty?.map((member) => (
              <tr key={member.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
                      {member?.name?.split(' ')[1]?.charAt(0) || member?.name?.charAt(0) || 'F'}
                    </div>
                    <div>
                      <span className="font-bold text-slate-800 flex items-center gap-1.5">
                        {member.name} {member.role.includes('Professor') && <Shield className="w-3.5 h-3.5 text-indigo-500" />}
                      </span>
                      <p className="text-xs text-slate-500">{member.role}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <span className="font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">{member.subjects}</span>
                </td>
                <td className="p-4 text-center font-medium text-slate-600">{member.uploads} files</td>
                <td className="p-4 text-center">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    member.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                  }`}>
                    {member.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="text-slate-400 hover:text-emerald-600 p-1 transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
            {filteredFaculty?.length === 0 && (
              <tr>
                <td colSpan="5" className="p-8 text-center text-slate-500">
                  No faculty members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FacultyTable;
