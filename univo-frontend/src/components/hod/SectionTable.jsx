import React from 'react';
import { Users, MoreVertical, Settings } from 'lucide-react';

const SectionTable = () => {
  const sections = [
    { id: 1, name: 'CS-A', year: '3rd Year', students: 60, coordinator: 'Dr. John Smith' },
    { id: 2, name: 'CS-B', year: '3rd Year', students: 58, coordinator: 'Dr. Sarah Connor' },
    { id: 3, name: 'CS-A', year: '2nd Year', students: 62, coordinator: 'Dr. Grace Hopper' },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
        <h3 className="text-lg font-bold text-slate-800">Class Sections</h3>
        <button className="flex items-center gap-1.5 text-sm bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-lg font-semibold hover:bg-emerald-200 transition-colors">
          <Settings className="w-4 h-4" /> Manage
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-white text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200">
            <tr>
              <th className="p-4 font-semibold">Section</th>
              <th className="p-4 font-semibold text-center">Students</th>
              <th className="p-4 font-semibold">Coordinator</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {sections.map((sec) => (
              <tr key={sec.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4">
                  <span className="font-bold text-slate-800">{sec.name}</span>
                  <span className="text-xs text-slate-500 ml-2 block sm:inline">{sec.year}</span>
                </td>
                <td className="p-4 text-center">
                  <span className="inline-flex items-center gap-1.5 font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                    <Users className="w-3.5 h-3.5 text-slate-400" /> {sec.students}
                  </span>
                </td>
                <td className="p-4 font-medium text-slate-700">{sec.coordinator}</td>
                <td className="p-4 text-right">
                  <button className="text-slate-400 hover:text-emerald-600 p-1">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SectionTable;
