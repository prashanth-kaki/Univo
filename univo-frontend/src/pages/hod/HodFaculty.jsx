import React, { useEffect, useState, useCallback } from 'react';
import FacultyTable from '../../components/hod/FacultyTable';
import FacultyModal from '../../components/hod/FacultyModal';
import { getFacultyList } from '../../services/hodService';
import { UserPlus } from 'lucide-react';

const HodFaculty = () => {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const data = await getFacultyList();
      setFaculty(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Faculty Management</h1>
          <p className="text-slate-500 mt-1">Oversee department professors and teaching assistants.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-emerald-700 transition-colors w-full sm:w-auto"
        >
          <UserPlus className="w-5 h-5" /> Add Faculty
        </button>
      </div>

      <div className="flex-1 min-h-0">
        <FacultyTable faculty={faculty} loading={loading} onRefresh={fetchData} />
      </div>

      <FacultyModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchData} 
      />
    </div>
  );
};

export default HodFaculty;
