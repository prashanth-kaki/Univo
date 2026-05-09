import React from 'react';
import { MoreVertical, Edit2, Ban, Trash2, Shield } from 'lucide-react';
import RoleBadge from '../RoleBadge';
import StatusBadge from '../StatusBadge';

const dummyUsers = [
  { id: '1', name: 'John Doe', email: 'john@univo.edu', role: 'STUDENT', department: 'Computer Science', status: 'active', joinDate: '2023-08-15' },
  { id: '2', name: 'Dr. Sarah Smith', email: 'sarah@univo.edu', role: 'HOD', department: 'Computer Science', status: 'active', joinDate: '2020-01-10' },
  { id: '3', name: 'Mike Johnson', email: 'mike@univo.edu', role: 'FACULTY', department: 'Information Technology', status: 'inactive', joinDate: '2021-05-22' },
  { id: '4', name: 'Emily Davis', email: 'emily@univo.edu', role: 'COORDINATOR', department: 'Mechanical', status: 'active', joinDate: '2022-11-05' },
  { id: '5', name: 'Alex Wilson', email: 'alex@univo.edu', role: 'STUDENT', department: 'Civil Engineering', status: 'banned', joinDate: '2023-09-01' },
];

const UserTable = () => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-y border-slate-200">
            <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">User</th>
            <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Role</th>
            <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Department</th>
            <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
            <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Joined</th>
            <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {dummyUsers.map((user) => (
            <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
              <td className="py-3 px-6">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-slate-800 text-sm">{user.name}</span>
                    <span className="text-xs text-slate-500">{user.email}</span>
                  </div>
                </div>
              </td>
              <td className="py-3 px-6">
                <RoleBadge role={user.role} />
              </td>
              <td className="py-3 px-6 text-sm text-slate-600">
                {user.department}
              </td>
              <td className="py-3 px-6">
                <StatusBadge status={user.status} />
              </td>
              <td className="py-3 px-6 text-sm text-slate-600">
                {new Date(user.joinDate).toLocaleDateString()}
              </td>
              <td className="py-3 px-6 text-right">
                <div className="flex items-center justify-end gap-2">
                  <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Edit Role">
                    <Shield size={16} />
                  </button>
                  <button className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Ban User">
                    <Ban size={16} />
                  </button>
                  <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete User">
                    <Trash2 size={16} />
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

export default UserTable;
