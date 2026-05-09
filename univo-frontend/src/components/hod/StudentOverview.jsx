import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const StudentOverview = ({ data, loading }) => {
  if (loading) {
    return <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 h-72 animate-pulse"></div>;
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 h-full flex flex-col">
      <h3 className="text-lg font-bold text-slate-800 mb-1">Student Attendance Trends</h3>
      <p className="text-xs text-slate-500 mb-6">Year-wise attendance tracking over the last 4 weeks</p>
      
      <div className="flex-1 min-h-[250px] w-full">
        <ResponsiveContainer>
          <AreaChart data={data?.attendanceTrends || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorY1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorY2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
            <Area type="monotone" dataKey="Year 1" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorY1)" />
            <Area type="monotone" dataKey="Year 2" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorY2)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StudentOverview;
