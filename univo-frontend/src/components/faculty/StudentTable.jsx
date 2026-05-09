import React, { useState } from 'react';
import { Search, Filter, Download, MoreVertical } from 'lucide-react';

const StudentTable = ({ students, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students?.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.rollNo.includes(searchTerm)
  );

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 animate-pulse h-16"></div>
        <div className="p-4 space-y-4">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-12 bg-slate-100 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
      {/* Table Header */}
      <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h3 className="text-lg font-bold text-slate-800">Enrolled Students</h3>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name or roll no..."
              className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 w-full sm:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4" />
          </button>
          <button className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200">
              <th className="p-4 font-semibold">Roll No</th>
              <th className="p-4 font-semibold">Student Name</th>
              <th className="p-4 font-semibold">Section</th>
              <th className="p-4 font-semibold">Attendance</th>
              <th className="p-4 font-semibold">Performance</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {filteredStudents?.map((student) => (
              <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-medium text-slate-700">{student.rollNo}</td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                      {student?.name?.charAt(0) || 'S'}
                    </div>
                    <span className="font-medium text-slate-800">{student.name}</span>
                  </div>
                </td>
                <td className="p-4 text-slate-600">{student.section}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${student.attendance >= 75 ? 'bg-emerald-500' : 'bg-red-500'}`}
                        style={{ width: `${student.attendance}%` }}
                      ></div>
                    </div>
                    <span className={`font-medium ${student.attendance >= 75 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {student.attendance}%
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Grade {student.performance}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="text-slate-400 hover:text-indigo-600 p-1">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
            {filteredStudents?.length === 0 && (
              <tr>
                <td colSpan="6" className="p-8 text-center text-slate-500">
                  No students found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination (Static for now) */}
      <div className="p-4 border-t border-slate-200 flex items-center justify-between text-sm text-slate-500">
        <span>Showing 1 to {filteredStudents?.length} of {students?.length} entries</span>
        <div className="flex gap-1">
          <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50" disabled>Previous</button>
          <button className="px-3 py-1 bg-indigo-600 text-white rounded">1</button>
          <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50">Next</button>
        </div>
      </div>
    </div>
  );
};

export default StudentTable;
