import React, { useState } from 'react';
import { X, Upload, Calendar, Users, Target } from 'lucide-react';
import { createAssignment, updateAssignment } from '../../services/facultyService';
import toast from 'react-hot-toast';

const CreateAssignmentModal = ({ isOpen, onClose, onSuccess, editData }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    requiresProof: false,
    targetType: 'year',
    targetYear: '1',
    targetSection: '',
    targetRollNumbers: '',
  });
  const [file, setFile] = useState(null);

  React.useEffect(() => {
    if (isOpen && editData) {
      setFormData({
        title: editData.title || '',
        description: editData.description || '',
        dueDate: editData.deadline ? new Date(editData.deadline).toISOString().slice(0, 16) : '',
        requiresProof: editData.requiresProof || false,
        targetType: editData.targetType || 'year',
        targetYear: editData.targetYear || '1',
        targetSection: editData.targetSection || '',
        targetRollNumbers: editData.targetRollNumbers?.join(', ') || '',
      });
    } else if (isOpen && !editData) {
      setFormData({
        title: '',
        description: '',
        dueDate: '',
        requiresProof: false,
        targetType: 'year',
        targetYear: '1',
        targetSection: '',
        targetRollNumbers: '',
      });
      setFile(null);
    }
  }, [isOpen, editData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.dueDate) {
      toast.error('Title and Due Date are required');
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('deadline', formData.dueDate);
      data.append('requiresProof', formData.requiresProof);
      data.append('targetType', formData.targetType);
      
      if (formData.targetType === 'year' || formData.targetType === 'section') {
        data.append('targetYear', formData.targetYear);
      }
      if (formData.targetType === 'section') {
        data.append('targetSection', formData.targetSection);
      }
      if (formData.targetType === 'rollNumbers') {
        data.append('targetRollNumbers', formData.targetRollNumbers);
      }

      if (file) {
        data.append('file', file);
      }

      if (editData) {
        await updateAssignment(editData._id, data);
        toast.success('Assignment updated successfully');
      } else {
        await createAssignment(data);
        toast.success('Assignment created successfully');
      }
      
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create assignment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50 sticky top-0 z-10">
          <h2 className="text-xl font-bold text-slate-800">{editData ? 'Edit Assignment' : 'Create New Assignment'}</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          <form id="create-assignment-form" onSubmit={handleSubmit} className="space-y-6">
            
            {/* Title & Description */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Assignment Title <span className="text-rose-500">*</span></label>
                <input 
                  type="text" name="title" value={formData.title} onChange={handleChange} required
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="e.g., Data Structures Mid-Term Assignment"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Description</label>
                <textarea 
                  name="description" value={formData.description} onChange={handleChange} rows="3"
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
                  placeholder="Provide any additional instructions..."
                ></textarea>
              </div>
            </div>

            {/* Config: Due Date & Proof */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1 flex items-center gap-2"><Calendar className="w-4 h-4 text-slate-400"/> Due Date <span className="text-rose-500">*</span></label>
                <input 
                  type="datetime-local" name="dueDate" value={formData.dueDate} onChange={handleChange} required
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                />
              </div>
              
              <div className="flex flex-col justify-center pt-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="relative">
                    <input type="checkbox" name="requiresProof" checked={formData.requiresProof} onChange={handleChange} className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-700">Require Proof Upload</span>
                    <p className="text-xs text-slate-500">Students must upload a file to complete</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Target Audience */}
            <div className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-100 space-y-4">
              <label className="block text-sm font-semibold text-slate-700 flex items-center gap-2"><Target className="w-4 h-4 text-indigo-500"/> Target Audience</label>
              
              <div className="flex flex-wrap gap-4">
                {['year', 'section', 'rollNumbers', 'all'].map((type) => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="targetType" value={type} checked={formData.targetType === type} onChange={handleChange} className="text-indigo-600 focus:ring-indigo-500" />
                    <span className="text-sm font-medium text-slate-700 capitalize">{type.replace(/([A-Z])/g, ' $1').trim()}</span>
                  </label>
                ))}
              </div>

              {formData.targetType === 'year' && (
                <select name="targetYear" value={formData.targetYear} onChange={handleChange} className="w-full md:w-1/2 px-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
                  {[1, 2, 3, 4].map(y => <option key={y} value={y}>Year {y}</option>)}
                </select>
              )}

              {formData.targetType === 'section' && (
                <div className="grid grid-cols-2 gap-4">
                  <select name="targetYear" value={formData.targetYear} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
                    {[1, 2, 3, 4].map(y => <option key={y} value={y}>Year {y}</option>)}
                  </select>
                  <input type="text" name="targetSection" value={formData.targetSection} onChange={handleChange} placeholder="Section (e.g. CS-A)" className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required />
                </div>
              )}

              {formData.targetType === 'rollNumbers' && (
                <textarea name="targetRollNumbers" value={formData.targetRollNumbers} onChange={handleChange} rows="2" placeholder="Comma-separated roll numbers (e.g. 101, 102, 103)" className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none" required></textarea>
              )}
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Attachment (Optional)</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-lg hover:bg-slate-50 transition-colors">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-10 w-10 text-slate-400" />
                  <div className="flex text-sm text-slate-600 justify-center">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={(e) => setFile(e.target.files[0])} />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-slate-500">PDF, PPT, DOC, Image up to 10MB</p>
                  {file && <p className="text-sm font-semibold text-emerald-600 mt-2">Selected: {file.name}</p>}
                </div>
              </div>
            </div>

          </form>
        </div>

        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-3 sticky bottom-0">
          <button type="button" onClick={onClose} className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-200 rounded-lg transition-colors">
            Cancel
          </button>
          <button type="submit" form="create-assignment-form" disabled={loading} className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2">
            {loading ? (editData ? 'Updating...' : 'Creating...') : (editData ? 'Update Assignment' : 'Create Assignment')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAssignmentModal;
