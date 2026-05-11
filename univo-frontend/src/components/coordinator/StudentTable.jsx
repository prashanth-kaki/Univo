import React from 'react';
import { AlertTriangle, UserCheck } from 'lucide-react';

const StudentTable = ({ students, loading }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex-1 flex flex-col h-full">
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500 sticky top-0 z-10 border-b border-slate-200">
            <tr>
              <th className="px-4 py-3 sm:px-6 sm:py-4">USN / Name</th>
              <th className="px-4 py-3 sm:px-6 sm:py-4">Section</th>
              <th className="px-4 py-3 sm:px-6 sm:py-4 hidden sm:table-cell">Year</th>
              <th className="px-4 py-3 sm:px-6 sm:py-4">Attendance</th>
              <th className="px-4 py-3 sm:px-6 sm:py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {loading ? (
              [1, 2, 3, 4, 5].map(i => (
                <tr key={i} className="animate-pulse">
                  <td className="px-4 py-3 sm:px-6 sm:py-4"><div className="h-4 bg-slate-200 rounded w-3/4"></div></td>
                  <td className="px-4 py-3 sm:px-6 sm:py-4"><div className="h-4 bg-slate-200 rounded w-1/2"></div></td>
                  <td className="px-4 py-3 sm:px-6 sm:py-4 hidden sm:table-cell"><div className="h-4 bg-slate-200 rounded w-1/2"></div></td>
                  <td className="px-4 py-3 sm:px-6 sm:py-4"><div className="h-4 bg-slate-200 rounded w-2/3"></div></td>
                  <td className="px-4 py-3 sm:px-6 sm:py-4"><div className="h-4 bg-slate-200 rounded w-1/4 ml-auto"></div></td>
                </tr>
              ))
            ) : (
              students.map(student => (
                <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 sm:px-6 sm:py-4">
                    <div className="font-bold text-slate-800">{student.id}</div>
                    <div className="text-slate-500 text-xs">{student.name}</div>
                  </td>
                  <td className="px-4 py-3 sm:px-6 sm:py-4 font-bold text-teal-600">
                    {student.section}
                  </td>
                  <td className="px-4 py-3 sm:px-6 sm:py-4 hidden sm:table-cell">
                    {student.year}
                  </td>
                  <td className="px-4 py-3 sm:px-6 sm:py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden shrink-0 hidden sm:block">
                        <div 
                          className={`h-full rounded-full ${
                            student.attendance >= 85 ? 'bg-emerald-500' : 
                            student.attendance >= 75 ? 'bg-amber-500' : 'bg-rose-500'
                          }`}
                          style={{ width: `${student.attendance}%` }}
                        ></div>
                      </div>
                      <span className={`font-bold ${
                        student.attendance >= 85 ? 'text-emerald-600' : 
                        student.attendance >= 75 ? 'text-amber-600' : 'text-rose-600'
                      }`}>
                        {student.attendance}%
                      </span>
                      {student.status === 'Critical' && <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />}
                    </div>
                  </td>
                  <td className="px-4 py-3 sm:px-6 sm:py-4 text-right">
                    <button className="text-teal-600 hover:bg-teal-50 px-3 py-1.5 rounded text-xs font-semibold border border-teal-200 transition-colors">
                      View Profile
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTable;
