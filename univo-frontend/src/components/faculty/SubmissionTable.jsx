import React from 'react';
import { Download, Search, ExternalLink } from 'lucide-react';

const SubmissionTable = ({ submissions }) => {
  // Mock data for demo purposes if not provided
  const data = submissions || [
    { id: 1, name: 'Alice Smith', rollNo: '101', submittedAt: 'Oct 24, 09:30 AM', status: 'Graded', score: '18/20', file: 'alice_assignment1.pdf' },
    { id: 2, name: 'Bob Johnson', rollNo: '102', submittedAt: 'Oct 24, 11:45 AM', status: 'Needs Grading', score: '-', file: 'bob_b_tree.zip' },
    { id: 3, name: 'Charlie Brown', rollNo: '103', submittedAt: 'Oct 25, 08:15 AM', status: 'Late', score: '-', file: 'charlie_code.js' },
    { id: 4, name: 'Diana Prince', rollNo: '104', submittedAt: 'Not Submitted', status: 'Missing', score: '-', file: null },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50">
        <h3 className="text-lg font-bold text-slate-800">Student Submissions</h3>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search students..." 
            className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm w-full sm:w-64 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-600 text-sm border-b border-slate-200">
            <tr>
              <th className="p-4 font-semibold">Student</th>
              <th className="p-4 font-semibold">Submitted On</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold">Score</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {data.map((sub) => (
              <tr key={sub.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4">
                  <div className="font-medium text-slate-800">{sub.name}</div>
                  <div className="text-xs text-slate-500">{sub.rollNo}</div>
                </td>
                <td className="p-4 text-slate-600">{sub.submittedAt}</td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold ${
                    sub.status === 'Graded' ? 'bg-emerald-100 text-emerald-700' :
                    sub.status === 'Needs Grading' ? 'bg-amber-100 text-amber-700' :
                    sub.status === 'Late' ? 'bg-orange-100 text-orange-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {sub.status}
                  </span>
                </td>
                <td className="p-4 font-semibold text-slate-800">{sub.score}</td>
                <td className="p-4 text-right">
                  {sub.file ? (
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors" title="View Submission">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded transition-colors" title="Download">
                        <Download className="w-4 h-4" />
                      </button>
                      {sub.status !== 'Graded' && (
                        <button className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded text-xs font-semibold hover:bg-indigo-100 transition-colors">
                          Grade
                        </button>
                      )}
                    </div>
                  ) : (
                    <span className="text-slate-400 text-xs italic">No attachment</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubmissionTable;
