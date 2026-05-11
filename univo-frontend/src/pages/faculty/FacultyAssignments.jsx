import React, { useEffect, useState } from 'react';
import AssignmentTable from '../../components/faculty/AssignmentTable';
import SubmissionTable from '../../components/faculty/SubmissionTable';
import CreateAssignmentModal from '../../components/faculty/CreateAssignmentModal';
import { getAssignments } from '../../services/facultyService';

const FacultyAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [editingAssignment, setEditingAssignment] = useState(null);

  const handleDelete = async (id) => {
    try {
      // Assuming deleteAssignment exists in facultyService
      const { deleteAssignment } = await import('../../services/facultyService');
      await deleteAssignment(id);
      if (selectedAssignment?._id === id) {
        setSelectedAssignment(null);
      }
      fetchAssignments();
    } catch (error) {
      console.error("Failed to delete", error);
    }
  };

  const handleEdit = (assignment) => {
    setEditingAssignment(assignment);
    setIsModalOpen(true);
  };

  const fetchAssignments = async () => {
    setLoading(true);
    try {
      const data = await getAssignments();
      setAssignments(data);
      if (data.length > 0 && !selectedAssignment) {
        setSelectedAssignment(data[0]);
      } else if (selectedAssignment) {
        // Refresh selected assignment data
        const updated = data.find(a => a._id === selectedAssignment._id);
        if (updated) setSelectedAssignment(updated);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-6 h-[calc(100vh-8rem)] flex flex-col relative">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Assignments Management</h1>
        <p className="text-slate-500 mt-1">Create assignments and review student submissions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        <div className="lg:col-span-1 h-full">
          <AssignmentTable 
            assignments={assignments} 
            loading={loading} 
            onCreateNew={() => { setEditingAssignment(null); setIsModalOpen(true); }}
            selectedId={selectedAssignment?._id}
            onSelect={setSelectedAssignment}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </div>
        <div className="lg:col-span-2 h-full overflow-y-auto">
          {selectedAssignment ? (
            <SubmissionTable 
               assignment={selectedAssignment} 
               onReviewSuccess={fetchAssignments}
            />
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 h-full flex items-center justify-center text-slate-500">
              Select an assignment to view submissions
            </div>
          )}
        </div>
      </div>

      <CreateAssignmentModal 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); setEditingAssignment(null); }} 
        onSuccess={fetchAssignments}
        editData={editingAssignment}
      />
    </div>
  );
};

export default FacultyAssignments;
