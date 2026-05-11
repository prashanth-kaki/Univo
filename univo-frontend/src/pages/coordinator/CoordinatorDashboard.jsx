import React, { useEffect, useState } from 'react';
import CoordinationStats from '../../components/coordinator/CoordinationStats';
import ScheduleTable from '../../components/coordinator/ScheduleTable';
import UpcomingEvents from '../../components/coordinator/UpcomingEvents';
import SectionOverview from '../../components/coordinator/SectionOverview';
import ActivityTimeline from '../../components/coordinator/ActivityTimeline';
import { getDashboardStats, getSchedules, getUpcomingEvents } from '../../services/coordinatorService';

const CoordinatorDashboard = () => {
  const [stats, setStats] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, schedData, eventsData] = await Promise.all([
          getDashboardStats(),
          getSchedules(),
          getUpcomingEvents()
        ]);
        setStats(statsData);
        setSchedules(schedData);
        setEvents(eventsData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Operational Dashboard</h1>
        <p className="text-slate-500 mt-1">Overview of section assignments, schedules, and alerts.</p>
      </div>

      <CoordinationStats stats={stats} loading={loading} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:h-[400px]">
        <div className="lg:col-span-2 h-full">
          <ScheduleTable schedules={schedules} loading={loading} />
        </div>
        <div className="h-full">
          <UpcomingEvents events={events} loading={loading} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:h-[400px]">
        <div className="lg:col-span-2 h-full">
          <div className="h-full bg-white rounded-xl border border-slate-200 shadow-sm p-6 overflow-hidden flex flex-col">
            <SectionOverview />
          </div>
        </div>
        <div className="h-full">
          <ActivityTimeline />
        </div>
      </div>
    </div>
  );
};

export default CoordinatorDashboard;
