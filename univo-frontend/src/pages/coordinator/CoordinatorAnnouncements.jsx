import React from 'react';
import AnnouncementPanel from '../../components/coordinator/AnnouncementPanel';

const CoordinatorAnnouncements = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Announcements</h1>
        <p className="text-slate-500 mt-1">Broadcast operational notices and schedule changes.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        <div className="lg:col-span-2 h-full overflow-hidden">
          <AnnouncementPanel />
        </div>
        
        <div className="lg:col-span-1 h-full flex flex-col gap-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Create Notice</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
                <input type="text" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none" placeholder="Notice subject..." />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Target Group</label>
                <select className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none bg-white">
                  <option>All Sections</option>
                  <option>CS-A Only</option>
                  <option>CS-B Only</option>
                  <option>All Faculty</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                <textarea className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none h-32 resize-none" placeholder="Write your operational message..."></textarea>
              </div>
              
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-2">
                   <input type="checkbox" id="urgent" className="rounded text-rose-600 focus:ring-rose-500" />
                   <label htmlFor="urgent" className="text-sm font-bold text-rose-600 cursor-pointer">Mark as Urgent</label>
                 </div>
              </div>
              
              <button type="button" className="w-full bg-teal-600 text-white rounded-lg py-2.5 font-bold hover:bg-teal-700 transition-colors mt-2 shadow-sm">
                Publish Notice
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoordinatorAnnouncements;
