import React from 'react';

const DepartmentStats = ({ stats, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 p-4 animate-pulse h-24"></div>
        ))}
      </div>
    );
  }

  const statItems = [
    { label: 'Total Students', value: stats?.totalStudents || 0, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Total Faculty', value: stats?.totalFaculty || 0, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Subjects', value: stats?.totalSubjects || 0, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Resources', value: stats?.resourcesUploaded || 0, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Pending Tasks', value: stats?.pendingTasks || 0, color: 'text-rose-600', bg: 'bg-rose-50' },
    { label: 'Announcements', value: stats?.activeAnnouncements || 0, color: 'text-teal-600', bg: 'bg-teal-50' },
    { label: 'Attendance Average', value: `${stats?.attendancePercent || 0}%`, color: 'text-cyan-600', bg: 'bg-cyan-50' },
    { label: 'Flagged Posts', value: stats?.flaggedPosts || 0, color: 'text-red-600', bg: 'bg-red-50' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
      {statItems.map((item, index) => (
        <div key={index} className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-shadow">
          <p className="text-xs font-semibold text-slate-500 mb-1 leading-tight">{item.label}</p>
          <div className="flex items-end justify-between mt-2">
            <h3 className={`text-2xl font-black ${item.color}`}>{item.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DepartmentStats;
