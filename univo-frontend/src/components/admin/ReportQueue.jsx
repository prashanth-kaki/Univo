import React from 'react';
import { MoreVertical, CheckCircle, XCircle, AlertTriangle, Eye, ShieldBan } from 'lucide-react';
import { cn } from '../../utils/cn';

const dummyReports = [
  { id: '1', type: 'Post', content: 'Inappropriate language in forum...', reportedBy: 'Student A', reportedUser: 'Student B', status: 'pending', date: '2023-10-24' },
  { id: '2', type: 'Comment', content: 'Spam links posted in discussion.', reportedBy: 'Faculty X', reportedUser: 'Student C', status: 'pending', date: '2023-10-24' },
  { id: '3', type: 'User Profile', content: 'Fake identity.', reportedBy: 'Admin', reportedUser: 'Unknown', status: 'resolved', date: '2023-10-23' },
  { id: '4', type: 'Resource', content: 'Copyright infringement material.', reportedBy: 'HOD CSE', reportedUser: 'Faculty Y', status: 'rejected', date: '2023-10-22' },
];

const ReportQueue = () => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-y border-slate-200">
            <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Report Details</th>
            <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Target</th>
            <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Reporter</th>
            <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
            <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {dummyReports.map((report) => (
            <tr key={report.id} className="hover:bg-slate-50/50 transition-colors">
              <td className="py-4 px-6">
                <div className="flex flex-col max-w-[250px]">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                      {report.type}
                    </span>
                    <span className="text-xs text-slate-400">{report.date}</span>
                  </div>
                  <span className="text-sm text-slate-800 font-medium truncate" title={report.content}>
                    {report.content}
                  </span>
                </div>
              </td>
              <td className="py-4 px-6">
                <span className="text-sm font-medium text-slate-700">{report.reportedUser}</span>
              </td>
              <td className="py-4 px-6">
                <span className="text-sm text-slate-600">{report.reportedBy}</span>
              </td>
              <td className="py-4 px-6">
                <span className={cn(
                  "px-2.5 py-1 rounded-full text-xs font-semibold border flex items-center gap-1.5 w-fit",
                  report.status === 'pending' ? "bg-amber-100 text-amber-700 border-amber-200" :
                  report.status === 'resolved' ? "bg-emerald-100 text-emerald-700 border-emerald-200" :
                  "bg-slate-100 text-slate-700 border-slate-200"
                )}>
                  {report?.status ? report.status.charAt(0).toUpperCase() + report.status.slice(1) : ''}
                </span>
              </td>
              <td className="py-4 px-6 text-right">
                {report.status === 'pending' ? (
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Resolve/Approve">
                      <CheckCircle size={18} />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Reject/Dismiss">
                      <XCircle size={18} />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="View Details">
                      <Eye size={18} />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Ban User">
                      <ShieldBan size={18} />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-end gap-2">
                     <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="View Details">
                      <Eye size={18} />
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportQueue;
