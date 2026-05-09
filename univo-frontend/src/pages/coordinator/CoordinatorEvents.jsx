import React, { useEffect, useState } from 'react';
import EventCard from '../../components/coordinator/EventCard';
import { getUpcomingEvents } from '../../services/coordinatorService';
import { Plus } from 'lucide-react';

const CoordinatorEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getUpcomingEvents();
        setEvents(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Event Coordination</h1>
          <p className="text-slate-500 mt-1">Manage workshops, seminars, and department reviews.</p>
        </div>
        <button className="bg-teal-600 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-teal-700 transition-colors shadow-sm w-full sm:w-auto">
          <Plus className="w-5 h-5" /> Create Event
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1,2,3,4].map(i => <div key={i} className="h-48 bg-white border border-slate-200 rounded-xl animate-pulse"></div>)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {events.map(event => <EventCard key={event.id} event={event} />)}
          
          <div className="h-full min-h-[192px] bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-center p-6 hover:bg-teal-50 hover:border-teal-300 hover:text-teal-700 transition-colors cursor-pointer group">
            <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-3 group-hover:bg-teal-100 transition-colors">
              <Plus className="w-6 h-6 text-slate-400 group-hover:text-teal-600" />
            </div>
            <h4 className="font-bold text-slate-600 group-hover:text-teal-700">Schedule New Event</h4>
            <p className="text-xs text-slate-400 mt-1 font-medium group-hover:text-teal-600/70">Click to start setup wizard</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoordinatorEvents;
