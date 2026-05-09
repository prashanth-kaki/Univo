import React from 'react';
import { Plus, MoreHorizontal, Clock } from 'lucide-react';

const TaskBoard = () => {
  const columns = [
    {
      id: 'pending',
      title: 'Pending Review',
      color: 'bg-slate-50',
      headerColor: 'text-slate-700',
      tasks: [
        { id: 1, title: 'Approve new syllabus for CS401', assignees: ['Dr. Hopper'], date: 'Today' },
        { id: 2, title: 'Review faculty leave requests', assignees: ['Admin'], date: 'Tomorrow' },
      ]
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      color: 'bg-emerald-50/50',
      headerColor: 'text-emerald-700',
      tasks: [
        { id: 3, title: 'Department Budget Allocation 2026', assignees: ['HOD'], date: 'Next Week' },
      ]
    },
    {
      id: 'completed',
      title: 'Completed',
      color: 'bg-indigo-50/50',
      headerColor: 'text-indigo-700',
      tasks: [
        { id: 4, title: 'Finalize Midterm Timetable', assignees: ['Prof. Turing'], date: 'Done' },
      ]
    }
  ];

  return (
    <div className="flex gap-6 overflow-x-auto pb-4 custom-scrollbar h-full min-h-[500px]">
      {columns.map(col => (
        <div key={col.id} className={`w-80 shrink-0 rounded-xl p-4 flex flex-col border border-slate-100 ${col.color}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`font-bold ${col.headerColor} flex items-center gap-2`}>
              {col.title}
              <span className="bg-white/60 text-xs py-0.5 px-2 rounded-full font-bold text-slate-600 shadow-sm">
                {col.tasks.length}
              </span>
            </h3>
            <button className="p-1 hover:bg-black/5 rounded text-slate-400 transition-colors">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex flex-col gap-3 flex-1 overflow-y-auto pr-1 custom-scrollbar">
            {col.tasks.map(task => (
              <div key={task.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-emerald-200 transition-all cursor-grab">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-slate-800 text-sm leading-snug pr-4">{task.title}</h4>
                  <button className="text-slate-400 hover:text-slate-600 shrink-0">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="flex -space-x-2">
                    {task.assignees.map((a, i) => (
                      <div key={i} className="w-7 h-7 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-600" title={a}>
                        {a?.charAt(0) || ''}
                      </div>
                    ))}
                  </div>
                  <span className={`text-xs font-semibold flex items-center gap-1 ${task.date === 'Done' ? 'text-emerald-500' : task.date === 'Today' ? 'text-rose-500' : 'text-slate-400'}`}>
                    <Clock className="w-3 h-3" /> {task.date}
                  </span>
                </div>
              </div>
            ))}
            
            <button className="w-full py-3 flex items-center justify-center gap-2 text-sm font-semibold text-slate-400 border-2 border-dashed border-slate-300 rounded-xl hover:border-slate-400 hover:text-slate-600 transition-colors mt-2 bg-white/50">
              <Plus className="w-4 h-4" /> Add Task
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskBoard;
