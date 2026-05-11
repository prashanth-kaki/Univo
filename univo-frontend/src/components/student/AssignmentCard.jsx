import React, { useState } from 'react';
import { CalendarClock, FileText, CheckCircle, AlertTriangle, Upload, Download, RefreshCw, XCircle } from 'lucide-react';
import { submitAssignment } from '../../services/studentService';
import toast from 'react-hot-toast';

const AssignmentCard = ({ assignment, onUpdate }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const sub = assignment.mySubmission || {};
  let status = sub.status || 'not_submitted';

  const getStatusConfig = (status) => {
    switch(status) {
      case 'not_submitted': return { label: 'Pending', color: 'text-amber-600', bg: 'bg-amber-100', border: 'border-amber-200', icon: CalendarClock };
      case 'pending': return { label: 'Submitted', color: 'text-blue-600', bg: 'bg-blue-100', border: 'border-blue-200', icon: FileText };
      case 'accepted': return { label: 'Accepted', color: 'text-emerald-600', bg: 'bg-emerald-100', border: 'border-emerald-200', icon: CheckCircle };
      case 'resubmit': return { label: 'Resubmit', color: 'text-orange-600', bg: 'bg-orange-100', border: 'border-orange-200', icon: RefreshCw };
      case 'rejected': return { label: 'Rejected', color: 'text-rose-600', bg: 'bg-rose-100', border: 'border-rose-200', icon: XCircle };
      default: return { label: 'Unknown', color: 'text-slate-600', bg: 'bg-slate-100', border: 'border-slate-200', icon: FileText };
    }
  };

  const config = getStatusConfig(status);
  const StatusIcon = config.icon;
  const canSubmit = status === 'not_submitted' || status === 'resubmit';

  const handleUpload = async () => {
    if (assignment.requiresProof && !file) {
      toast.error('Please select a file to submit');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      if (file) formData.append('proof', file);
      
      const res = await submitAssignment(assignment._id, formData);
      if (res.success) {
        toast.success('Assignment submitted!');
        onUpdate && onUpdate(); // Refresh assignments
        setFile(null);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error('Failed to submit');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition-shadow flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row gap-4 sm:items-start justify-between">
        <div className="flex gap-4 items-start flex-1">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${config.bg} ${config.color} border ${config.border}`}>
            <StatusIcon className="w-6 h-6" />
          </div>
          
          <div className="flex-1">
            <h4 className="font-bold text-slate-800 text-base">{assignment.title}</h4>
            <div className="text-sm font-medium text-slate-500 mb-2 whitespace-pre-wrap">{assignment.description}</div>
            
            <div className="flex flex-wrap gap-3 mt-2">
               {assignment.attachment && (
                 <a href={assignment.attachment.url} download target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-md text-xs font-semibold transition-colors">
                   <Download className="w-3.5 h-3.5" /> Download Attachment
                 </a>
               )}
               {assignment.requiresProof && (
                 <span className="inline-flex items-center px-3 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-semibold">
                   Proof Required
                 </span>
               )}
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-start sm:items-end gap-1 sm:w-1/4 shrink-0">
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">Status</p>
          <p className={`text-sm font-bold ${config.color} flex items-center gap-1`}>
            {config.label}
          </p>
          <p className="text-xs text-slate-500 mt-2">Due: {new Date(assignment.deadline).toLocaleString()}</p>
        </div>
      </div>

      {/* Review Note */}
      {sub.reviewNote && (
        <div className={`p-3 rounded-lg text-sm font-medium ${status === 'rejected' ? 'bg-rose-50 text-rose-800 border border-rose-100' : 'bg-orange-50 text-orange-800 border border-orange-100'}`}>
          <span className="font-bold">Faculty Note:</span> {sub.reviewNote}
        </div>
      )}

      {/* Submission Box */}
      {canSubmit && assignment.requiresProof && (
        <div className="pt-4 mt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
           <input 
             type="file" 
             onChange={(e) => setFile(e.target.files[0])}
             className="text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 w-full sm:w-auto"
           />
           <button 
             onClick={handleUpload}
             disabled={loading || !file}
             className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
           >
             {loading ? 'Submitting...' : <><Upload className="w-4 h-4"/> Submit</>}
           </button>
        </div>
      )}

      {canSubmit && !assignment.requiresProof && (
         <div className="pt-4 mt-2 border-t border-slate-100 flex justify-end">
           <button 
             onClick={handleUpload}
             disabled={loading}
             className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
           >
             {loading ? 'Submitting...' : 'Mark as Done'}
           </button>
         </div>
      )}
    </div>
  );
};

export default AssignmentCard;
