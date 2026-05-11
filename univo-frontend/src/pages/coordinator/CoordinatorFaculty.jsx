import React, { useEffect, useState } from 'react';
import FacultyTable from '../../components/coordinator/FacultyTable';
import { getFacultyCoordination } from '../../services/coordinatorService';

const CoordinatorFaculty = () => {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const data = await getFacultyCoordination();
        setFaculty(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchFaculty();
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Faculty Coordination</h1>
        <p className="text-slate-500 mt-1">Manage teaching assignments, monitor syllabus progress, and handle leaves.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        <div className="lg:col-span-2 h-full overflow-hidden">
          <FacultyTable faculty={faculty} loading={loading} />
        </div>
        
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-bold text-slate-800 mb-4">Quick Substitution</h3>
            <form className="space-y-4 text-sm">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Absent Faculty</label>
                <select className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-teal-500">
                  <option>Dr. John Smith</option>
                  <option>Prof. Alan Turing</option>
                </select>
              </div>
              <div>
                <label className="block font-medium text-slate-700 mb-1">Target Class</label>
                <select className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-teal-500">
                  <option>CS-A (DBMS) - 10:00 AM</option>
                  <option>CS-B (DBMS) - 11:00 AM</option>
                </select>
              </div>
              <div>
                <label className="block font-medium text-slate-700 mb-1">Substitute Faculty</label>
                <select className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-teal-500">
                  <option>Dr. Sarah Connor</option>
                  <option>Dr. Grace Hopper</option>
                </select>
              </div>
              <button type="button" className="w-full bg-teal-600 text-white rounded-lg py-2.5 font-bold hover:bg-teal-700 transition-colors mt-2 shadow-sm">
                Assign Substitute
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoordinatorFaculty;
