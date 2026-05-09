import React, { useEffect, useState } from 'react';
import ScheduleTable from '../../components/coordinator/ScheduleTable';
import { getSchedules } from '../../services/coordinatorService';
import { Calendar as CalendarIcon, Plus, Filter } from 'lucide-react';

const CoordinatorSchedules = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const data = await getSchedules();
        setSchedules(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSchedules();
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Master Timetable & Schedules</h1>
          <p className="text-slate-500 mt-1">Manage class assignments, lab bookings, and faculty timetables.</p>
        </div>
        <button className="bg-teal-600 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-teal-700 transition-colors shadow-sm w-full sm:w-auto">
          <Plus className="w-5 h-5" /> Add Schedule Block
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar w-full sm:w-auto">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => (
            <button 
              key={day}
              className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${
                idx === 0 
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-500/20' 
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select className="w-full sm:w-auto border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none bg-white">
            <option>All Sections</option>
            <option>CS-A</option>
            <option>CS-B</option>
          </select>
          <button className="p-2 border border-slate-200 text-slate-500 rounded-lg hover:bg-slate-50 transition-colors">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0 bg-white rounded-xl border border-slate-200 shadow-sm p-2">
        <ScheduleTable schedules={schedules} loading={loading} />
      </div>
    </div>
  );
};

export default CoordinatorSchedules;
