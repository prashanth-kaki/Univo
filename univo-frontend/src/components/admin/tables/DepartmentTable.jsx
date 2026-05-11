import React from 'react';
import { MoreVertical, Edit2, Users, Building2, TrendingUp } from 'lucide-react';
import { cn } from '../../../utils/cn';

const dummyDepartments = [
  { id: '1', name: 'Computer Science', code: 'CSE', hod: 'Dr. Sarah Smith', coordinators: 4, students: 3450, faculty: 120, status: 'active' },
  { id: '2', name: 'Information Technology', code: 'IT', hod: 'Dr. Robert Chen', coordinators: 3, students: 2800, faculty: 95, status: 'active' },
  { id: '3', name: 'Electronics', code: 'ECE', hod: 'Dr. Michael Kumar', coordinators: 4, students: 2100, faculty: 85, status: 'active' },
  { id: '4', name: 'Mechanical', code: 'MECH', hod: 'Dr. James Wilson', coordinators: 2, students: 1800, faculty: 70, status: 'active' },
  { id: '5', name: 'Civil Engineering', code: 'CIVIL', hod: 'Dr. Emily Davis', coordinators: 2, students: 1200, faculty: 55, status: 'active' },
];

const DepartmentTable = () => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-y border-slate-200">
            <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Department</th>
            <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Head of Dept</th>
            <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Staff & Students</th>
            <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Analytics</th>
            <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {dummyDepartments.map((dept) => (
            <tr key={dept.id} className="hover:bg-slate-50/50 transition-colors">
              <td className="py-4 px-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                    {dept.code}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-slate-800">{dept.name}</span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <span className={cn("w-1.5 h-1.5 rounded-full bg-emerald-500")} />
                      Active
                    </span>
                  </div>
                </div>
              </td>
              <td className="py-4 px-6">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 text-xs font-bold">
                    {dept?.hod?.charAt(4) || ''}
                  </div>
                  <span className="text-sm font-medium text-slate-700">{dept.hod}</span>
                </div>
              </td>
              <td className="py-4 px-6">
                <div className="flex gap-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-800">{dept.students}</span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider">Students</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-800">{dept.faculty}</span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider">Faculty</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-800">{dept.coordinators}</span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider">Coords</span>
                  </div>
                </div>
              </td>
              <td className="py-4 px-6">
                <div className="flex items-center gap-1 text-emerald-600 font-medium text-sm">
                  <TrendingUp size={16} />
                  <span>+4.2%</span>
                </div>
                <span className="text-xs text-slate-500">vs last month</span>
              </td>
              <td className="py-4 px-6 text-right">
                <div className="flex items-center justify-end gap-2">
                  <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Edit Department">
                    <Edit2 size={16} />
                  </button>
                  <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Manage Sections">
                    <Building2 size={16} />
                  </button>
                  <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentTable;
