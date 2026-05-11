import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AttendanceOverview = ({ data, loading }) => {
  if (loading) {
    return <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 h-full animate-pulse"></div>;
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col h-full">
      <h3 className="font-bold text-slate-800 mb-6 text-lg">Section-wise Attendance Overview</h3>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
         <div className="bg-rose-50 p-4 rounded-xl border border-rose-100">
           <p className="text-xs font-bold text-rose-600 uppercase mb-1">Critical (&lt; 75%)</p>
           <p className="text-2xl font-black text-rose-700">{data?.criticalCount || 0}</p>
         </div>
         <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
           <p className="text-xs font-bold text-amber-600 uppercase mb-1">Warning (75% - 85%)</p>
           <p className="text-2xl font-black text-amber-700">{data?.warningCount || 0}</p>
         </div>
      </div>
      
      <div className="flex-1 min-h-[200px] w-full">
        <ResponsiveContainer>
          <BarChart data={data?.sectionData || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} domain={[0, 100]} />
            <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
            <Bar dataKey="attendance" fill="#0d9488" radius={[4, 4, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AttendanceOverview;
