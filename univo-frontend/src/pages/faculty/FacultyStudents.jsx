import React, { useEffect, useState } from 'react';
import StudentTable from '../../components/faculty/StudentTable';
import { getStudents, getSubjects } from '../../services/facultyService';

const FacultyStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsData, subjectsData] = await Promise.all([
          getStudents(),
          getSubjects()
        ]);
        setStudents(studentsData);
        setSubjects(subjectsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredStudents = selectedSubject === 'All' 
    ? students 
    : students.filter(s => s.section === selectedSubject.split(' - ')[1]);

  return (
    <div className="max-w-7xl mx-auto space-y-6 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Student Directory</h1>
          <p className="text-slate-500 mt-1">View and manage enrolled students.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-slate-600">Filter by Class:</label>
          <select 
            className="border border-slate-200 rounded-lg text-sm px-3 py-2 bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="All">All Classes</option>
            {subjects.map(s => (
              <option key={`${s.id}-${s.section}`} value={`${s.name} - ${s.section}`}>
                {s.name} ({s.section})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex-1">
        <StudentTable students={filteredStudents} loading={loading} />
      </div>
    </div>
  );
};

export default FacultyStudents;
