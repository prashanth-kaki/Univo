import React, { useEffect, useState } from 'react';
import AnalyticsCard from '../../components/faculty/AnalyticsCard';
import { getAttendanceAnalytics } from '../../services/facultyService';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';

const FacultyAnalytics = () => {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const data = await getAttendanceAnalytics();
      setAttendanceData(data);
    };
    fetchAnalytics();
  }, []);

  const gradeDistribution = [
    { name: 'Grade A', value: 35 },
    { name: 'Grade B', value: 45 },
    { name: 'Grade C', value: 15 },
    { name: 'Fail', value: 5 },
  ];
  
  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Class Performance Analytics</h1>
        <p className="text-slate-500 mt-1">Insights into student engagement and outcomes.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsCard 
          title="Overall Attendance Trend (CS-A)" 
          data={attendanceData} 
          dataKey="CS-A" 
          color="#6366f1" 
          height={300} 
        />
        
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Grade Distribution</h3>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={gradeDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {gradeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Engagement Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100 text-center">
            <p className="text-sm font-semibold text-indigo-800 mb-1">Average Assignment Score</p>
            <p className="text-3xl font-bold text-indigo-600">84%</p>
          </div>
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 text-center">
            <p className="text-sm font-semibold text-emerald-800 mb-1">Resource Download Rate</p>
            <p className="text-3xl font-bold text-emerald-600">92%</p>
          </div>
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 text-center">
            <p className="text-sm font-semibold text-amber-800 mb-1">Forum Participation</p>
            <p className="text-3xl font-bold text-amber-600">65%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyAnalytics;
