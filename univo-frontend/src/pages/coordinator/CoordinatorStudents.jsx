import React, { useEffect, useState } from 'react';
import StudentTable from '../../components/coordinator/StudentTable';
import { getStudentsList } from '../../services/coordinatorService';
import { Search, Filter, Download } from 'lucide-react';

const CoordinatorStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStudentsList();
        setStudents(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Student Monitoring</h1>
          <p className="text-slate-500 mt-1">Track attendance, academic performance, and section status.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors shadow-sm">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by USN or Name..." 
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none"
          />
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none bg-white">
            <option>All Sections</option>
            <option>CS-A</option>
            <option>CS-B</option>
            <option>CS-C</option>
          </select>
          <select className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none bg-white">
            <option>All Status</option>
            <option>Regular</option>
            <option>Warning</option>
            <option>Critical</option>
          </select>
          <button className="p-2 border border-slate-200 text-slate-500 rounded-lg hover:bg-slate-50 transition-colors">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0">
        <StudentTable students={students} loading={loading} />
      </div>
    </div>
  );
};

export default CoordinatorStudents;
