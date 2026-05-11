import React from 'react';
import TaskBoard from '../../components/faculty/TaskBoard';

const FacultyTasks = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">My Tasks</h1>
          <p className="text-slate-500 mt-1">Manage your daily teaching workflow and deadlines.</p>
        </div>
      </div>

      <div className="flex-1 min-h-0 bg-white rounded-xl border border-slate-200 shadow-sm p-4 overflow-hidden">
        <TaskBoard />
      </div>
    </div>
  );
};

export default FacultyTasks;
