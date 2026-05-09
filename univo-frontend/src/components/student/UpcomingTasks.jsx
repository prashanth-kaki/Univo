import React from 'react';
import { Calendar, Circle, CheckCircle2 } from 'lucide-react';

const UpcomingTasks = ({ tasks = [] }) => {

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-violet-500" />
          My Tasks
        </h3>
        <button className="text-sm text-violet-600 font-semibold hover:text-violet-700">View All</button>
      </div>

      <div className="flex-1 overflow-auto space-y-3">
        {tasks.map(task => (
          <div key={task.id} className="flex items-start gap-3 p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer group">
            <button className="mt-0.5 shrink-0">
              {task.completed ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              ) : (
                <Circle className="w-5 h-5 text-slate-300 group-hover:text-violet-400 transition-colors" />
              )}
            </button>
            <div>
              <p className={`font-semibold text-sm ${task.completed ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                {task.title}
              </p>
              <p className="text-xs text-slate-500 font-medium">{task.time}</p>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 py-2 border-2 border-dashed border-slate-200 rounded-lg text-slate-500 text-sm font-semibold hover:border-violet-300 hover:text-violet-600 transition-colors">
        + Add Personal Task
      </button>
    </div>
  );
};

export default UpcomingTasks;
