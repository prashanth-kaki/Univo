import React, { useState } from 'react';
import { Plus, MoreHorizontal, CheckCircle2, Clock } from 'lucide-react';

const TaskBoard = () => {
  const [columns] = useState([
    { id: 'todo', title: 'To Do', color: 'border-slate-200 bg-slate-50' },
    { id: 'in_progress', title: 'In Progress', color: 'border-blue-200 bg-blue-50' },
    { id: 'done', title: 'Completed', color: 'border-emerald-200 bg-emerald-50' }
  ]);

  const [tasks] = useState([
    { id: 1, title: 'Finalize CS-A Timetable', status: 'in_progress', priority: 'High', date: 'Oct 20' },
    { id: 2, title: 'Review Attendance Shortage List', status: 'todo', priority: 'Medium', date: 'Oct 22' },
    { id: 3, title: 'Coordinate Lab Equipment Audit', status: 'todo', priority: 'Low', date: 'Oct 25' },
    { id: 4, title: 'Approve Faculty Leaves', status: 'done', priority: 'High', date: 'Oct 15' },
  ]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-800 text-lg">Operational Workflow</h3>
        <button className="bg-slate-800 text-white p-1.5 rounded hover:bg-slate-700 transition-colors">
          <Plus className="w-5 h-5" />
        </button>
      </div>
      
      <div className="flex-1 overflow-x-auto">
        <div className="flex gap-4 h-full min-w-[700px] pb-2">
          {columns.map(col => (
            <div key={col.id} className={`flex-1 flex flex-col rounded-xl border ${col.color} p-3 max-w-[350px]`}>
              <div className="flex items-center justify-between mb-3 px-1">
                <h4 className="font-bold text-slate-700 text-sm">{col.title}</h4>
                <span className="text-xs font-bold text-slate-500 bg-white/60 px-2 py-0.5 rounded-full">
                  {tasks.filter(t => t.status === col.id).length}
                </span>
              </div>
              
              <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
                {tasks.filter(t => t.status === col.id).map(task => (
                  <div key={task.id} className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm cursor-grab hover:border-teal-300 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        task.priority === 'High' ? 'bg-rose-100 text-rose-700' :
                        task.priority === 'Medium' ? 'bg-amber-100 text-amber-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {task.priority}
                      </span>
                      <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal className="w-4 h-4" /></button>
                    </div>
                    <p className="text-sm font-semibold text-slate-800 mb-3">{task.title}</p>
                    <div className="flex items-center justify-between text-xs font-medium text-slate-500 border-t border-slate-50 pt-2">
                      <span className="flex items-center gap-1">
                        {col.id === 'done' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> : <Clock className="w-3.5 h-3.5" />}
                        {task.date}
                      </span>
                      <div className="w-5 h-5 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-[10px]">
                        C
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskBoard;
