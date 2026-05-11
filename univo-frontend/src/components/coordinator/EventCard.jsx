import React from 'react';
import { Calendar, Clock, MapPin, MoreHorizontal } from 'lucide-react';

const EventCard = ({ event }) => {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 hover:shadow-md transition-shadow group flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded border ${
          event.type === 'Workshop' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' :
          event.type === 'Review' ? 'bg-rose-50 text-rose-700 border-rose-200' :
          'bg-teal-50 text-teal-700 border-teal-200'
        }`}>
          {event.type}
        </span>
        <button className="text-slate-400 hover:text-slate-600 transition-colors opacity-0 group-hover:opacity-100 p-1">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>
      
      <h4 className="font-bold text-lg text-slate-800 mb-2 line-clamp-2">{event.title}</h4>
      
      <div className="space-y-2 mt-auto pt-4">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
          <Calendar className="w-4 h-4 text-slate-400" /> {event.date}
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
          <Clock className="w-4 h-4 text-slate-400" /> {event.time}
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
          <MapPin className="w-4 h-4 text-slate-400" /> {event.venue}
        </div>
      </div>
      
      <div className="mt-5 pt-4 border-t border-slate-100 flex justify-between items-center">
        <span className="text-xs font-bold text-slate-500">{event.status}</span>
        <button className="text-sm font-bold text-teal-600 hover:text-teal-700 bg-teal-50 px-3 py-1.5 rounded transition-colors border border-teal-100 hover:bg-teal-100">
          Manage
        </button>
      </div>
    </div>
  );
};

export default EventCard;
