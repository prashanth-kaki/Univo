import React, { useEffect, useState, useCallback } from 'react';
import SubjectManagement from '../../components/hod/SubjectManagement';
import SubjectModal from '../../components/hod/SubjectModal';
import { getSubjectAllocations, getFacultyList, updateSubject } from '../../services/hodService';
import { Plus, BookOpen } from 'lucide-react';
import toast from 'react-hot-toast';

const HodSubjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quickAssignData, setQuickAssignData] = useState({ subjectId: '', facultyId: '', sections: '' });

  const fetchData = useCallback(async () => {
    try {
      const [subjectsData, facultyData] = await Promise.all([
        getSubjectAllocations(),
        getFacultyList()
      ]);
      setSubjects(subjectsData);
      setFaculty(facultyData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleQuickAssign = async (e) => {
    e.preventDefault();
    if (!quickAssignData.subjectId || !quickAssignData.facultyId) {
      toast.error('Please select both subject and faculty');
      return;
    }
    try {
      await updateSubject(quickAssignData.subjectId, { 
        facultyId: quickAssignData.facultyId, 
        sections: quickAssignData.sections.split(',').map(s => s.trim()) 
      });
      toast.success('Subject assigned successfully');
      setQuickAssignData({ subjectId: '', facultyId: '', sections: '' });
      fetchData();
    } catch (error) {
      toast.error('Failed to assign subject');
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Subject Allocations</h1>
          <p className="text-slate-500 mt-1">Assign subjects to faculty and configure sections.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-emerald-700 transition-colors w-full sm:w-auto"
        >
          <Plus className="w-5 h-5" /> Add Subject
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SubjectManagement subjects={subjects} loading={loading} onRefresh={fetchData} facultyList={faculty} />
        </div>
        
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-emerald-500" />
              Quick Assign
            </h3>
            <form onSubmit={handleQuickAssign} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Select Subject</label>
                <select 
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 bg-white"
                  value={quickAssignData.subjectId}
                  onChange={(e) => setQuickAssignData({...quickAssignData, subjectId: e.target.value})}
                >
                  <option value="">-- Select Subject --</option>
                  {subjects.map(sub => (
                    <option key={sub._id || sub.id} value={sub._id || sub.id}>{sub.name} ({sub.code})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Assign Faculty</label>
                <select 
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 bg-white"
                  value={quickAssignData.facultyId}
                  onChange={(e) => setQuickAssignData({...quickAssignData, facultyId: e.target.value})}
                >
                  <option value="">-- Select Faculty --</option>
                  {faculty.map(fac => (
                    <option key={fac.id} value={fac.id}>{fac.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Sections</label>
                <input 
                  type="text" 
                  placeholder="e.g. CS-A, CS-B" 
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500" 
                  value={quickAssignData.sections}
                  onChange={(e) => setQuickAssignData({...quickAssignData, sections: e.target.value})}
                />
              </div>
              <button type="submit" className="w-full bg-slate-800 text-white rounded-lg py-2 font-medium hover:bg-slate-900 transition-colors mt-2">
                Save Allocation
              </button>
            </form>
          </div>
        </div>
      </div>
      
      <SubjectModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchData}
        facultyList={faculty}
      />
    </div>
  );
};

export default HodSubjects;
