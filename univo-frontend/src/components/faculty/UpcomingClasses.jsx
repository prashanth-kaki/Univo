import React from 'react';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';

const UpcomingClasses = ({ classes, loading }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6 h-full shadow-sm animate-pulse">
        <div className="h-6 w-1/3 bg-slate-200 rounded mb-6"></div>
        <div className="space-y-4">
          {[1, 2].map(i => (
            <div key={i} className="flex gap-4">
              <div className="w-12 h-12 bg-slate-200 rounded-lg"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                <div className="h-3 bg-slate-200 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 h-full shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-indigo-500" />
          Upcoming Classes
        </h3>
        <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700">View Schedule</button>
      </div>

      {classes?.length > 0 ? (
        <div className="space-y-4">
          {classes.map((cls) => (
            <div key={cls.id} className="flex items-start gap-4 p-4 rounded-lg bg-slate-50 border border-slate-100 hover:border-indigo-100 transition-colors">
              <div className="bg-indigo-100 text-indigo-700 p-3 rounded-lg flex flex-col items-center justify-center min-w-[60px]">
                <span className="text-sm font-bold">{cls.time.split(' ')[0]}</span>
                <span className="text-xs font-medium">{cls.time.split(' ')[1]}</span>
              </div>
              
              <div className="flex-1">
                <h4 className="font-semibold text-slate-800">{cls.subject}</h4>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-slate-500">
                  <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> Section {cls.section}</span>
                  <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {cls.room}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-slate-500">
          <Clock className="w-10 h-10 mx-auto text-slate-300 mb-3" />
          <p>No more classes today!</p>
        </div>
      )}
    </div>
  );
};

export default UpcomingClasses;
