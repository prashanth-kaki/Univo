import React from 'react';
import { Calendar, Search, Save, CheckCircle2, XCircle } from 'lucide-react';

const AttendanceTable = ({ students, loading }) => {
  if (loading) {
    return <div className="h-64 bg-slate-100 rounded-xl animate-pulse"></div>;
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Mark Attendance</h3>
          <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
            <Calendar className="w-4 h-4" /> Today, 24 Oct 2026 • Data Structures (CS-A)
          </p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search student..." 
              className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm w-full"
            />
          </div>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-indigo-700 transition-colors">
            <Save className="w-4 h-4" /> Save
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-600 text-sm border-b border-slate-200">
            <tr>
              <th className="p-4 font-semibold w-16 text-center">#</th>
              <th className="p-4 font-semibold">Roll No</th>
              <th className="p-4 font-semibold">Student Name</th>
              <th className="p-4 font-semibold text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {students?.map((student, index) => (
              <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 text-center text-slate-500 font-medium">{index + 1}</td>
                <td className="p-4 font-medium text-slate-700">{student.rollNo}</td>
                <td className="p-4 font-medium text-slate-800">{student.name}</td>
                <td className="p-4 text-center">
                  <div className="flex items-center justify-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name={`attendance-${student.id}`} className="peer sr-only" defaultChecked />
                      <div className="w-6 h-6 rounded-full border-2 border-slate-300 peer-checked:border-emerald-500 peer-checked:bg-emerald-500 text-transparent peer-checked:text-white flex items-center justify-center transition-all">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span className="font-medium text-slate-600 peer-checked:text-emerald-700">P</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name={`attendance-${student.id}`} className="peer sr-only" />
                      <div className="w-6 h-6 rounded-full border-2 border-slate-300 peer-checked:border-red-500 peer-checked:bg-red-500 text-transparent peer-checked:text-white flex items-center justify-center transition-all">
                        <XCircle className="w-4 h-4" />
                      </div>
                      <span className="font-medium text-slate-600 peer-checked:text-red-700">A</span>
                    </label>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceTable;
