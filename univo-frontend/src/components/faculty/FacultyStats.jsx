import React from 'react';

const FacultyStats = ({ stats, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 p-4 animate-pulse h-24">
            <div className="h-4 bg-slate-200 rounded w-1/2 mb-2"></div>
            <div className="h-8 bg-slate-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  const statItems = [
    { label: 'Assigned Subjects', value: stats?.assignedSubjects || 0, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Total Students', value: stats?.totalStudents || 0, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Pending Assignments', value: stats?.pendingAssignments || 0, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Resources Uploaded', value: stats?.resourcesUploaded || 0, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Attendance Average', value: `${stats?.attendancePercent || 0}%`, color: 'text-teal-600', bg: 'bg-teal-50' },
    { label: 'Unread Discussions', value: stats?.unreadDiscussions || 0, color: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
      {statItems.map((item, index) => (
        <div key={index} className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-shadow">
          <p className="text-sm font-medium text-slate-500 mb-1">{item.label}</p>
          <div className="flex items-end justify-between">
            <h3 className={`text-2xl font-bold ${item.color}`}>{item.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FacultyStats;
