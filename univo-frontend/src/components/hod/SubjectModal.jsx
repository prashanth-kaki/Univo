import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';
import { createSubject, updateSubject } from '../../services/hodService';

const SubjectModal = ({ isOpen, onClose, onSuccess, initialData, facultyList }) => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    credits: 3,
    year: 1,
    semester: 1,
    facultyId: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        code: initialData.code || '',
        credits: initialData.credits || 3,
        year: initialData.year || 1,
        semester: initialData.semester || 1,
        facultyId: initialData.faculty?._id || initialData.faculty || ''
      });
    } else {
      setFormData({
        name: '',
        code: '',
        credits: 3,
        year: 1,
        semester: 1,
        facultyId: ''
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (initialData) {
        await updateSubject(initialData._id, formData);
        toast.success('Subject updated successfully');
      } else {
        await createSubject(formData);
        toast.success('Subject added successfully');
      }
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800">{initialData ? 'Edit Subject' : 'Add New Subject'}</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Subject Name</label>
            <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Subject Code</label>
            <input required type="text" name="code" value={formData.code} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Year</label>
              <input required type="number" name="year" value={formData.year} onChange={handleChange} min="1" max="4" className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Semester</label>
              <input required type="number" name="semester" value={formData.semester} onChange={handleChange} min="1" max="8" className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Credits</label>
            <input required type="number" name="credits" value={formData.credits} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Assign Faculty (Optional)</label>
            <select name="facultyId" value={formData.facultyId} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none bg-white">
              <option value="">-- Select Faculty --</option>
              {facultyList?.map(fac => (
                <option key={fac.id} value={fac.id}>{fac.name} ({fac.role})</option>
              ))}
            </select>
          </div>
          
          <div className="pt-4 flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50">Cancel</button>
            <button type="submit" disabled={loading} className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 disabled:opacity-50">
              {loading ? 'Saving...' : 'Save Subject'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubjectModal;
