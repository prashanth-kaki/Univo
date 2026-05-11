import React, { useState } from 'react';
import { Download, Search, ExternalLink, Check, X, RefreshCw } from 'lucide-react';
import { reviewSubmission } from '../../services/facultyService';
import toast from 'react-hot-toast';

const SubmissionTable = ({ assignment, onReviewSuccess }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [gradingStudent, setGradingStudent] = useState(null);
  const [reviewNote, setReviewNote] = useState('');
  const [loading, setLoading] = useState(false);

  if (!assignment) return null;

  const submissions = assignment.submissions || [];
  
  const filteredSubmissions = submissions.filter(sub => {
    const term = searchTerm.toLowerCase();
    return sub.student?.name?.toLowerCase().includes(term) || sub.student?.rollNumber?.toLowerCase().includes(term);
  });

  const handleReview = async (studentId, status) => {
    if ((status === 'rejected' || status === 'resubmit') && !reviewNote) {
      toast.error('Please provide a reason for rejection or resubmission');
      return;
    }

    setLoading(true);
    try {
      await reviewSubmission(assignment._id, studentId, status, reviewNote);
      toast.success(`Submission marked as ${status}`);
      setGradingStudent(null);
      setReviewNote('');
      onReviewSuccess();
    } catch (error) {
      toast.error('Failed to review submission');
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = () => {
    // Export submissions that are either accepted or pending (meaning they submitted something)
    const completed = submissions.filter(s => s.status === 'accepted' || s.status === 'pending');
    
    if (completed.length === 0) {
      toast.error('No completed submissions to export');
      return;
    }

    const headers = ['Name', 'Roll Number', 'Status', 'Submitted At'];
    const rows = completed.map(sub => [
      sub.student?.name || 'Unknown',
      sub.student?.rollNumber || 'N/A',
      sub.status,
      new Date(sub.submittedAt).toLocaleString()
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `${assignment.title.replace(/\s+/g, '_')}_submissions.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 sticky top-0 z-10">
        <div>
           <h3 className="text-lg font-bold text-slate-800">{assignment.title}</h3>
           <p className="text-xs text-slate-500">Submissions: {submissions.length}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search students..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm w-full sm:w-64 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          <button 
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap"
            title="Download CSV"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>
      
      <div className="overflow-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 text-slate-600 text-sm border-b border-slate-200 sticky top-0">
            <tr>
              <th className="p-4 font-semibold">Student</th>
              <th className="p-4 font-semibold">Submitted On</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {filteredSubmissions.map((sub) => {
              const student = sub.student || {};
              const isGrading = gradingStudent === student._id;

              return (
              <tr key={student._id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4">
                  <div className="font-medium text-slate-800">{student.name}</div>
                  <div className="text-xs text-slate-500">{student.rollNumber || 'No Roll No'}</div>
                </td>
                <td className="p-4 text-slate-600">{new Date(sub.submittedAt).toLocaleString()}</td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold capitalize ${
                    sub.status === 'accepted' ? 'bg-emerald-100 text-emerald-700' :
                    sub.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                    sub.status === 'resubmit' ? 'bg-orange-100 text-orange-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {sub.status}
                  </span>
                  {sub.reviewNote && <p className="text-xs text-slate-500 mt-1 max-w-[150px] truncate" title={sub.reviewNote}>Note: {sub.reviewNote}</p>}
                </td>
                <td className="p-4 text-right">
                  {sub.proof ? (
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-2">
                        <a href={sub.proof.url} target="_blank" rel="noreferrer" className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors" title="View Submission">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        <a href={sub.proof.url} download className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded transition-colors" title="Download">
                          <Download className="w-4 h-4" />
                        </a>
                        {sub.status !== 'accepted' && sub.status !== 'rejected' && (
                          <button onClick={() => setGradingStudent(isGrading ? null : student._id)} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded text-xs font-semibold hover:bg-indigo-100 transition-colors">
                            {isGrading ? 'Cancel' : 'Grade'}
                          </button>
                        )}
                      </div>
                      
                      {isGrading && (
                        <div className="mt-2 p-3 bg-slate-50 rounded-lg border border-slate-200 text-left w-64 absolute right-8 shadow-lg z-20">
                           <textarea 
                             placeholder="Feedback note (required for Reject/Resubmit)..."
                             value={reviewNote}
                             onChange={(e) => setReviewNote(e.target.value)}
                             className="w-full text-xs p-2 border border-slate-200 rounded mb-2 resize-none"
                             rows="2"
                           />
                           <div className="flex justify-end gap-2">
                             <button disabled={loading} onClick={() => handleReview(student._id, 'accepted')} className="p-1 text-emerald-600 hover:bg-emerald-100 rounded" title="Accept"><Check className="w-4 h-4"/></button>
                             <button disabled={loading} onClick={() => handleReview(student._id, 'resubmit')} className="p-1 text-amber-600 hover:bg-amber-100 rounded" title="Ask to Resubmit"><RefreshCw className="w-4 h-4"/></button>
                             <button disabled={loading} onClick={() => handleReview(student._id, 'rejected')} className="p-1 text-rose-600 hover:bg-rose-100 rounded" title="Reject"><X className="w-4 h-4"/></button>
                           </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <span className="text-slate-400 text-xs italic">No attachment</span>
                  )}
                </td>
              </tr>
            )})}
            {filteredSubmissions.length === 0 && (
              <tr>
                <td colSpan="4" className="p-8 text-center text-slate-500">
                  No submissions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubmissionTable;
