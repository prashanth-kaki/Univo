import React, { useEffect, useState } from 'react';
import AnalyticsChart from '../../components/hod/AnalyticsChart';
import { getDepartmentAnalytics } from '../../services/hodService';

const HodAnalytics = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getDepartmentAnalytics();
      setData(result);
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Department Analytics</h1>
        <p className="text-slate-500 mt-1">Comprehensive data covering faculty engagement and student trends.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsChart 
          title="Faculty Resource Uploads" 
          data={data?.facultyUploads || []} 
          dataKey="uploads" 
          color="#3b82f6" 
          height={350} 
        />
        
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col justify-center items-center text-center">
          <h3 className="text-lg font-bold text-slate-800 mb-6 w-full text-left">Engagement Highlights</h3>
          <div className="space-y-6 w-full">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <span className="text-slate-600 font-medium">Average Student Attendance</span>
              <span className="text-xl font-bold text-emerald-600">92%</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <span className="text-slate-600 font-medium">Syllabus Completion (Avg)</span>
              <span className="text-xl font-bold text-indigo-600">68%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600 font-medium">Faculty Active Daily</span>
              <span className="text-xl font-bold text-blue-600">38/42</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HodAnalytics;
