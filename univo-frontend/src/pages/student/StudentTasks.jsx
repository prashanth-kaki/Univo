import React, { useEffect, useState } from 'react';
import UpcomingTasks from '../../components/student/UpcomingTasks';
import { Plus } from 'lucide-react';
import { getStudentAssignments } from '../../services/studentService';

const StudentTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getStudentAssignments();
        setTasks(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);
  return (
    <div className="max-w-7xl mx-auto space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">My Tasks & Deadlines</h1>
          <p className="text-slate-500 mt-1">Keep track of your assignments, reminders, and study goals.</p>
        </div>
        <button className="bg-violet-600 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-violet-700 transition-colors w-full sm:w-auto shadow-sm">
          <Plus className="w-5 h-5" /> New Task
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        <div className="lg:col-span-2 h-full overflow-hidden">
          <UpcomingTasks tasks={tasks} />
        </div>
        
        <div className="lg:col-span-1 h-full flex flex-col gap-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-bold text-slate-800 mb-4">Task Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium text-slate-500">Total Pending</span>
                <span className="font-bold text-slate-800">{tasks.filter(t => t.status === 'Pending').length || 0}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium text-slate-500">Total Completed</span>
                <span className="font-bold text-emerald-600">{tasks.filter(t => t.status !== 'Pending').length || 0}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium text-slate-500">All Tasks</span>
                <span className="font-bold text-violet-600">{tasks.length}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-violet-50 to-indigo-50 rounded-xl border border-violet-100 shadow-sm p-6 flex-1">
             <h3 className="font-bold text-violet-900 mb-2">Productivity Tip</h3>
             <p className="text-sm text-violet-800/80 leading-relaxed">
               Break down large assignments into smaller, manageable sub-tasks. Focus on completing one sub-task at a time using the Pomodoro technique (25 mins work, 5 mins rest).
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentTasks;
