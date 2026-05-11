import React from 'react';
import { Calendar, Clock, MapPin, User, MoreVertical } from 'lucide-react';

const ScheduleTable = ({ schedules, loading }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-full flex flex-col">
      <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between shrink-0">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-teal-600" /> Today's Schedule Overview
        </h3>
        <button className="text-xs font-semibold text-teal-600 hover:text-teal-700 bg-teal-50 px-2 py-1 rounded border border-teal-100">
          Manage Timetable
        </button>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        {loading ? (
          [1,2,3].map(i => <div key={i} className="h-24 bg-slate-50 rounded-lg border border-slate-100 animate-pulse"></div>)
        ) : (
          schedules.map(schedule => (
            <div key={schedule.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:border-teal-300 hover:shadow-sm transition-all gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-teal-50 rounded-lg flex flex-col items-center justify-center border border-teal-100 shrink-0">
                  <Clock className="w-4 h-4 text-teal-600 mb-0.5" />
                  <span className="text-[10px] font-bold text-teal-800">{schedule.time.split(' - ')[0]}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200 uppercase">
                      {schedule.section}
                    </span>
                    <h4 className="font-bold text-slate-800 text-sm sm:text-base">{schedule.subject}</h4>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-medium text-slate-500">
                    <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {schedule.faculty}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {schedule.room}</span>
                  </div>
                </div>
              </div>
              <button className="text-slate-400 hover:text-slate-600 self-end sm:self-auto p-1">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          ))
        )}
        {!loading && schedules.length === 0 && (
          <div className="text-center py-8 text-slate-500 font-medium">No schedules found for today.</div>
        )}
      </div>
    </div>
  );
};

export default ScheduleTable;
