import React, { useEffect, useState } from 'react';
import AssignmentCard from '../../components/student/AssignmentCard';
import { getStudentAssignments } from '../../services/studentService';
import { Filter } from 'lucide-react';

const StudentAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStudentAssignments();
        setAssignments(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredAssignments = filter === 'All' 
    ? assignments 
    : assignments.filter(a => a.status === filter);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Assignments & Homework</h1>
          <p className="text-slate-500 mt-1">Track deadlines and submit your coursework.</p>
        </div>
        
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
          {['All', 'Pending', 'Submitted', 'Reviewed', 'Late'].map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${
                filter === f 
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-500/20' 
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="font-bold text-slate-700">{filteredAssignments.length} Assignments found</span>
          <button className="text-slate-500 hover:text-violet-600">
            <Filter className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 p-5 overflow-auto space-y-4">
          {loading ? (
            [1,2,3].map(i => <div key={i} className="h-24 bg-slate-100 rounded-xl animate-pulse"></div>)
          ) : (
            filteredAssignments.length > 0 ? (
              filteredAssignments.map(a => <AssignmentCard key={a.id} assignment={a} />)
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 py-12">
                <p className="text-lg font-medium">No assignments found for this filter.</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentAssignments;
