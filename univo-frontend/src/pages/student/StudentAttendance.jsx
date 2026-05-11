import React, { useEffect, useState } from 'react';
import AttendanceCard from '../../components/student/AttendanceCard';
import { getEnrolledSubjects, getAttendanceAnalytics } from '../../services/studentService';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const StudentAttendance = () => {
  const [subjects, setSubjects] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subData, analyticsData] = await Promise.all([
          getEnrolledSubjects(),
          getAttendanceAnalytics()
        ]);
        setSubjects(subData);
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
        <h1 className="text-2xl font-bold text-slate-800">My Attendance</h1>
        <p className="text-slate-500 mt-1">Track your presence across all subjects to avoid penalties.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          [1,2,3,4].map(i => <div key={i} className="bg-white h-24 rounded-xl border border-slate-200 animate-pulse"></div>)
        ) : (
          subjects.map(sub => (
            <AttendanceCard key={sub.id} attendance={sub.attendance} subjectName={sub.name} subjectCode={sub.code} />
          ))
        )}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 h-[400px] flex flex-col">
        <h3 className="text-lg font-bold text-slate-800 mb-6">Attendance Trends (Last 4 Months)</h3>
        
        {loading ? (
          <div className="flex-1 bg-slate-50 rounded-lg animate-pulse"></div>
        ) : (
          <div className="flex-1 min-h-0 w-full">
            <ResponsiveContainer>
              <AreaChart data={analytics?.trends || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorDBMS" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorOS" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} domain={[0, 100]} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="DBMS" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorDBMS)" />
                <Area type="monotone" dataKey="OS" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorOS)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentAttendance;
