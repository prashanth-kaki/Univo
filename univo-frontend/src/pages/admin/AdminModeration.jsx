import React from 'react';
import { Shield, BrainCircuit, ShieldAlert, CheckCircle, Search, Filter, Ban } from 'lucide-react';
import { cn } from '../../utils/cn';

const aiFlags = [
  { id: '1', content: 'Buy cheap assignment solutions here! Link in bio.', type: 'Comment', reason: 'Spam/Advertising', confidence: '98%', status: 'auto-hidden' },
  { id: '2', content: 'You guys are completely stupid if you think this works.', type: 'Forum Post', reason: 'Harassment/Toxicity', confidence: '85%', status: 'pending-review' },
  { id: '3', content: 'Uploaded file: final_exam_answers.pdf', type: 'Resource', reason: 'Academic Dishonesty', confidence: '92%', status: 'pending-review' },
];

const AdminModeration = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Content Moderation & AI</h1>
          <p className="text-slate-500 mt-1">Review AI-flagged content and manage automated moderation rules.</p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex items-center gap-4">
          <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg">
            <BrainCircuit size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">AI Auto-Moderation</p>
            <p className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Active
            </p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex items-center gap-4">
          <div className="p-3 bg-amber-100 text-amber-600 rounded-lg">
            <ShieldAlert size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Pending Review</p>
            <p className="text-2xl font-bold text-slate-800">24</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex items-center gap-4">
          <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg">
            <Shield size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Auto-Resolved (24h)</p>
            <p className="text-2xl font-bold text-slate-800">142</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
        {/* Filters Bar */}
        <div className="p-4 md:p-5 border-b border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-50/50">
          <h2 className="font-semibold text-slate-800 flex items-center gap-2">
            <BrainCircuit size={18} className="text-indigo-600" />
            AI Moderation Queue
          </h2>
          
          <div className="flex items-center gap-3">
            <select className="bg-white border border-slate-200 text-slate-700 text-sm rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Filter by Reason</option>
              <option>Spam</option>
              <option>Toxicity</option>
              <option>Academic Dishonesty</option>
            </select>
          </div>
        </div>

        {/* Table Area */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-y border-slate-200">
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Content Segment</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">AI Analysis</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Confidence</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {aiFlags.map((flag) => (
                <tr key={flag.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex flex-col max-w-sm">
                      <span className="text-xs font-semibold text-slate-500 mb-1">{flag.type}</span>
                      <span className="text-sm text-slate-800 italic border-l-2 border-slate-300 pl-3 py-1">"{flag.content}"</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-red-50 text-red-700 font-medium border border-red-100">
                      <ShieldAlert size={14} />
                      {flag.reason}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500" style={{ width: flag.confidence }}></div>
                      </div>
                      <span className="text-xs font-semibold text-slate-600">{flag.confidence}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={cn(
                      "px-2.5 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 w-fit",
                      flag.status === 'auto-hidden' ? "bg-slate-100 text-slate-700 border-slate-200" : "bg-amber-100 text-amber-700 border-amber-200"
                    )}>
                      {flag.status === 'auto-hidden' ? 'Auto-Hidden' : 'Pending Review'}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Confirm Delete">
                        <Ban size={18} />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="False Positive - Restore">
                        <CheckCircle size={18} />
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

export default AdminModeration;
