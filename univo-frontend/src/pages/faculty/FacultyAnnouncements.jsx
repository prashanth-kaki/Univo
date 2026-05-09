import React from 'react';
import AnnouncementPanel from '../../components/faculty/AnnouncementPanel';

const FacultyAnnouncements = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Announcements</h1>
        <p className="text-slate-500 mt-1">Broadcast important information to your students.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        <div className="lg:col-span-2 h-full overflow-hidden">
          <AnnouncementPanel />
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Create Announcement</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                <input type="text" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Announcement title..." />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Target Audience</label>
                <select className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
                  <option>All My Subjects</option>
                  <option>Data Structures (CS-A)</option>
                  <option>Algorithms (CS-B)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                <textarea className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none h-32 resize-none" placeholder="Write your message here..."></textarea>
              </div>
              
              <div className="flex items-center gap-2">
                <input type="checkbox" id="pin" className="rounded text-indigo-600 focus:ring-indigo-500" />
                <label htmlFor="pin" className="text-sm text-slate-600 cursor-pointer">Pin to top</label>
              </div>
              
              <button type="button" className="w-full bg-indigo-600 text-white rounded-lg py-2.5 font-medium hover:bg-indigo-700 transition-colors mt-2">
                Post Announcement
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyAnnouncements;
