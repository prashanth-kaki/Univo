import React, { useEffect, useState } from 'react';
import SubjectCard from '../../components/faculty/SubjectCard';
import { getSubjects } from '../../services/facultyService';
import { Plus } from 'lucide-react';

const FacultySubjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const data = await getSubjects();
        setSubjects(data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSubjects();
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">My Subjects</h1>
          <p className="text-slate-500 mt-1">Manage your assigned subjects and sections.</p>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors w-full sm:w-auto">
          <Plus className="w-5 h-5" /> Request Subject
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white border border-slate-200 rounded-xl p-6 h-48 animate-pulse">
              <div className="flex justify-between mb-4">
                <div className="w-12 h-12 bg-slate-200 rounded-lg"></div>
                <div className="w-16 h-6 bg-slate-200 rounded-md"></div>
              </div>
              <div className="w-3/4 h-6 bg-slate-200 rounded mb-2"></div>
              <div className="w-1/2 h-4 bg-slate-200 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {subjects.map(subject => (
            <SubjectCard 
              key={`${subject.id}-${subject.section}`} 
              subject={subject} 
              onClick={(subj) => console.log('View subject:', subj)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FacultySubjects;
