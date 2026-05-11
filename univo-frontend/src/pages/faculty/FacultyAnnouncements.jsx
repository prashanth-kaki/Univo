import React, { useEffect, useState, useCallback } from 'react';
import AnnouncementPanel from '../../components/faculty/AnnouncementPanel';
import { getAnnouncements, createAnnouncement } from '../../services/facultyService';
import toast from 'react-hot-toast';

const FacultyAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    targetAudience: 'All My Subjects',
    isPinned: false
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchAnnouncements = useCallback(async () => {
    try {
      const data = await getAnnouncements();
      setAnnouncements(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      return toast.error('Please provide a title and message');
    }
    setSubmitting(true);
    try {
      await createAnnouncement({
        title: formData.title,
        content: formData.content,
        targetAudience: formData.targetAudience,
        isPinned: formData.isPinned
      });
      toast.success('Announcement posted successfully');
      setFormData({ title: '', content: '', targetAudience: 'All My Subjects', isPinned: false });
      fetchAnnouncements();
    } catch (error) {
      toast.error('Failed to post announcement');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Announcements</h1>
        <p className="text-slate-500 mt-1">Broadcast important information to your students.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        <div className="lg:col-span-2 h-full overflow-hidden">
          <AnnouncementPanel announcements={announcements} loading={loading} />
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Create Announcement</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                <input required type="text" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Announcement title..." value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Target Audience</label>
                <select className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" value={formData.targetAudience} onChange={e => setFormData({...formData, targetAudience: e.target.value})}>
                  <option value="All My Subjects">All My Subjects</option>
                  <option value="Data Structures (CS-A)">Data Structures (CS-A)</option>
                  <option value="Algorithms (CS-B)">Algorithms (CS-B)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                <textarea required className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none h-32 resize-none" placeholder="Write your message here..." value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})}></textarea>
              </div>
              
              <div className="flex items-center gap-2">
                <input type="checkbox" id="pin" className="rounded text-indigo-600 focus:ring-indigo-500" checked={formData.isPinned} onChange={e => setFormData({...formData, isPinned: e.target.checked})} />
                <label htmlFor="pin" className="text-sm text-slate-600 cursor-pointer">Pin to top</label>
              </div>
              
              <button type="submit" disabled={submitting} className="w-full bg-indigo-600 text-white rounded-lg py-2.5 font-medium hover:bg-indigo-700 transition-colors mt-2 disabled:opacity-50">
                {submitting ? 'Posting...' : 'Post Announcement'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyAnnouncements;
