import React, { useEffect, useState, useCallback } from 'react';
import StudentOverview from '../../components/hod/StudentOverview';
import SectionTable from '../../components/hod/SectionTable';
import { getDepartmentAnalytics, getStudentList } from '../../services/hodService';
import { Download } from 'lucide-react';

const HodStudents = () => {
  const [analytics, setAnalytics] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const [analyticsData, studentsData] = await Promise.all([
        getDepartmentAnalytics(),
        getStudentList()
      ]);
      setAnalytics(analyticsData);
      setStudents(studentsData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Student Directory & Overview</h1>
          <p className="text-slate-500 mt-1">Monitor section-wise performance and attendance.</p>
        </div>
        <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors w-full sm:w-auto shadow-sm">
          <Download className="w-5 h-5" /> Export Data
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <StudentOverview data={analytics} loading={loading} />
        </div>
        
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 text-center">
            <h3 className="text-lg font-bold text-slate-800 mb-2">Total Enrolled</h3>
            <p className="text-5xl font-black text-emerald-600">{students?.length || 0}</p>
            <p className="text-sm text-slate-500 mt-2 font-medium">Across all 4 years</p>
          </div>
          
          <div className="bg-rose-50 rounded-xl border border-rose-100 shadow-sm p-6 text-center">
            <h3 className="text-lg font-bold text-rose-800 mb-2">Critical Attendance</h3>
            <p className="text-4xl font-black text-rose-600">42</p>
            <p className="text-sm text-rose-600/80 mt-2 font-medium">Students below 75%</p>
            <button className="mt-4 w-full bg-rose-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-rose-700">View List</button>
          </div>
        </div>
      </div>
      
      <div>
        <SectionTable students={students} />
      </div>
    </div>
  );
};

export default HodStudents;
