import React from 'react';
import { Plus, MoreHorizontal, Calendar } from 'lucide-react';

const TaskBoard = () => {
  const columns = [
    {
      id: 'todo',
      title: 'To Do',
      color: 'bg-slate-100',
      headerColor: 'text-slate-700',
      tasks: [
        { id: 1, title: 'Grade Midterm Papers', tag: 'High Priority', tagColor: 'bg-red-100 text-red-700', date: 'Oct 25' },
        { id: 2, title: 'Upload Week 5 Notes', tag: 'Content', tagColor: 'bg-blue-100 text-blue-700', date: 'Oct 26' },
      ]
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      color: 'bg-indigo-50',
      headerColor: 'text-indigo-700',
      tasks: [
        { id: 3, title: 'Review Final Project Proposals', tag: 'Review', tagColor: 'bg-amber-100 text-amber-700', date: 'Oct 28' },
      ]
    },
    {
      id: 'done',
      title: 'Done',
      color: 'bg-emerald-50',
      headerColor: 'text-emerald-700',
      tasks: [
        { id: 4, title: 'Set up Google Classroom', tag: 'Admin', tagColor: 'bg-slate-200 text-slate-700', date: 'Oct 20' },
        { id: 5, title: 'Create Syllabus PDF', tag: 'Content', tagColor: 'bg-blue-100 text-blue-700', date: 'Oct 21' },
      ]
    }
  ];

  return (
    <div className="flex gap-6 overflow-x-auto pb-4 custom-scrollbar h-full min-h-[500px]">
      {columns.map(col => (
        <div key={col.id} className={`w-80 shrink-0 rounded-xl p-4 flex flex-col ${col.color}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`font-bold ${col.headerColor} flex items-center gap-2`}>
              {col.title}
              <span className="bg-white/60 text-xs py-0.5 px-2 rounded-full font-medium text-slate-600">
                {col.tasks.length}
              </span>
            </h3>
            <div className="flex items-center gap-1">
              <button className="p-1 hover:bg-black/5 rounded text-slate-500 transition-colors">
                <Plus className="w-4 h-4" />
              </button>
              <button className="p-1 hover:bg-black/5 rounded text-slate-500 transition-colors">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 flex-1 overflow-y-auto pr-1 custom-scrollbar">
            {col.tasks.map(task => (
              <div key={task.id} className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 hover:shadow-md hover:border-indigo-200 transition-all cursor-grab active:cursor-grabbing">
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md ${task.tagColor}`}>
                    {task.tag}
                  </span>
                  <button className="text-slate-400 hover:text-slate-600">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
                <h4 className="font-semibold text-slate-800 text-sm mb-3 leading-snug">{task.title}</h4>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-indigo-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-indigo-700">ME</div>
                  </div>
                  <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {task.date}
                  </span>
                </div>
              </div>
            ))}
            
            <button className="w-full py-3 flex items-center justify-center gap-2 text-sm font-medium text-slate-500 border-2 border-dashed border-slate-300 rounded-lg hover:border-slate-400 hover:text-slate-600 transition-colors mt-2 bg-white/50">
              <Plus className="w-4 h-4" /> Add Task
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskBoard;
