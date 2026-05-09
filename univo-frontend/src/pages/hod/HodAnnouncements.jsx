import React from 'react';
import AnnouncementPanel from '../../components/hod/AnnouncementPanel';

const HodAnnouncements = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Department Announcements</h1>
        <p className="text-slate-500 mt-1">Broadcast official information to faculty and students.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        <div className="lg:col-span-2 h-full overflow-hidden">
          <AnnouncementPanel />
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Create Official Notice</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
                <input type="text" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Notice subject..." />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Target Group</label>
                <select className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none bg-white">
                  <option>All Department</option>
                  <option>All Faculty</option>
                  <option>All Students</option>
                  <option>Year 1 Only</option>
                  <option>Year 4 Only</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                <textarea className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none h-32 resize-none" placeholder="Write your official message..."></textarea>
              </div>
              
              <div className="flex items-center gap-2">
                <input type="checkbox" id="email" className="rounded text-emerald-600 focus:ring-emerald-500" />
                <label htmlFor="email" className="text-sm text-slate-600 cursor-pointer">Also send via Email</label>
              </div>
              
              <button type="button" className="w-full bg-emerald-600 text-white rounded-lg py-2.5 font-medium hover:bg-emerald-700 transition-colors mt-2">
                Publish Notice
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HodAnnouncements;
