import React, { useEffect, useState } from 'react';
import AttendanceTable from '../../components/faculty/AttendanceTable';
import { getStudents, getAttendanceAnalytics } from '../../services/facultyService';
import AnalyticsCard from '../../components/faculty/AnalyticsCard';

const FacultyAttendance = () => {
  const [students, setStudents] = useState([]);
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsData, analyticsData] = await Promise.all([
          getStudents(),
          getAttendanceAnalytics()
        ]);
        setStudents(studentsData);
        setAnalytics(analyticsData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Attendance Management</h1>
        <p className="text-slate-500 mt-1">Mark daily attendance and view trends.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AttendanceTable students={students} loading={loading} />
        </div>
        
        <div className="lg:col-span-1 space-y-6">
          <AnalyticsCard 
            title="CS-A Attendance Trend" 
            data={analytics} 
            dataKey="CS-A" 
            color="#10b981" 
            height={200} 
          />
          <AnalyticsCard 
            title="CS-B Attendance Trend" 
            data={analytics} 
            dataKey="CS-B" 
            color="#f59e0b" 
            height={200} 
          />
        </div>
      </div>
    </div>
  );
};

export default FacultyAttendance;
