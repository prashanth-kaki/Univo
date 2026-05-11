import React from 'react';
import EventCard from './EventCard';

const UpcomingEvents = ({ events, loading }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
         <h3 className="font-bold text-slate-800 text-lg">Upcoming Department Events</h3>
         <button className="text-sm font-semibold text-teal-600 hover:text-teal-700">Manage Events</button>
      </div>
      
      <div className="flex-1 overflow-auto">
        {loading ? (
           <div className="space-y-4">
             {[1,2].map(i => <div key={i} className="h-32 bg-slate-50 rounded-xl border border-slate-100 animate-pulse"></div>)}
           </div>
        ) : (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
             {events.slice(0, 2).map(event => <EventCard key={event.id} event={event} />)}
           </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingEvents;
