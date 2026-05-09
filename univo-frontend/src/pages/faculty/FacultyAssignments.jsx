import React, { useEffect, useState } from 'react';
import AssignmentTable from '../../components/faculty/AssignmentTable';
import SubmissionTable from '../../components/faculty/SubmissionTable';
import { getAssignments } from '../../services/facultyService';

const FacultyAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const data = await getAssignments();
        setAssignments(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAssignments();
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Assignments Management</h1>
        <p className="text-slate-500 mt-1">Create assignments and review student submissions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        <div className="lg:col-span-1 h-full">
          <AssignmentTable assignments={assignments} loading={loading} />
        </div>
        <div className="lg:col-span-2 h-full overflow-y-auto">
          <SubmissionTable />
        </div>
      </div>
    </div>
  );
};

export default FacultyAssignments;
