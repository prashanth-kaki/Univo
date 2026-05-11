import React, { useState } from 'react';
import { Megaphone, MoreHorizontal, Users, Calendar, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { deleteAnnouncement } from '../../services/hodService';

const AnnouncementPanel = ({ announcements, loading, onRefresh }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      try {
        await deleteAnnouncement(id);
        toast.success('Announcement deleted');
        onRefresh();
      } catch (error) {
        toast.error('Failed to delete announcement');
      }
    }
  };

  if (loading) {
    return <div className="bg-white rounded-xl border border-slate-200 shadow-sm h-full flex flex-col p-6 animate-pulse" />;
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm h-full flex flex-col">
      <div className="p-5 border-b border-slate-200 flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <Megaphone className="w-5 h-5 text-emerald-500" />
          Department Announcements
        </h3>
        <button className="text-sm bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg font-semibold hover:bg-emerald-100 transition-colors">
          View All
        </button>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        {announcements?.map(ann => (
          <div key={ann._id || ann.id} className="p-5 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-3 relative">
              <h4 className="font-bold text-slate-800 text-base">{ann.title}</h4>
              <button 
                onClick={() => setActiveDropdown(activeDropdown === (ann._id || ann.id) ? null : (ann._id || ann.id))}
                className="text-slate-400 hover:text-emerald-600 transition-colors"
              >
                <MoreHorizontal className="w-5 h-5" />
              </button>
              
              {activeDropdown === (ann._id || ann.id) && (
                <div className="absolute right-0 top-6 w-40 bg-white border border-slate-200 shadow-xl rounded-xl py-2 z-10 text-left">
                  <button 
                    onClick={() => { handleDelete(ann._id || ann.id); setActiveDropdown(null); }}
                    className="w-full px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" /> Delete Notice
                  </button>
                </div>
              )}
            </div>
            
            <p className="text-sm text-slate-600 mb-5 leading-relaxed">{ann.content}</p>
            
            <div className="flex items-center justify-between pt-3 border-t border-slate-200/60">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 bg-white px-2 py-1 rounded border border-slate-200 shadow-sm">
                <Users className="w-3.5 h-3.5 text-indigo-500" /> {ann.targetAudience || ann.target || 'All Department'}
              </span>
              <span className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                <Calendar className="w-3.5 h-3.5" /> {new Date(ann.createdAt || ann.date || Date.now()).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
        {announcements?.length === 0 && (
          <div className="text-center p-8 text-slate-500">
            No announcements found. Create one to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export default AnnouncementPanel;
