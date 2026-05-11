import React, { useState, useEffect, useCallback } from 'react';
import AnnouncementPanel from '../../components/hod/AnnouncementPanel';
import { getAnnouncements, createAnnouncement } from '../../services/hodService';
import toast from 'react-hot-toast';

const HodAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    targetAudience: 'All Department',
    sendEmail: false
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
      return toast.error('Please fill in subject and message');
    }
    setSubmitting(true);
    try {
      await createAnnouncement({
        title: formData.title,
        content: formData.content,
        targetAudience: formData.targetAudience
      });
      toast.success('Announcement published successfully');
      setFormData({ title: '', content: '', targetAudience: 'All Department', sendEmail: false });
      fetchAnnouncements();
    } catch (error) {
      toast.error('Failed to publish announcement');
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="max-w-7xl mx-auto space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Department Announcements</h1>
        <p className="text-slate-500 mt-1">Broadcast official information to faculty and students.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        <div className="lg:col-span-2 h-full overflow-hidden">
          <AnnouncementPanel announcements={announcements} loading={loading} onRefresh={fetchAnnouncements} />
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Create Official Notice</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
                <input required type="text" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Notice subject..." value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Target Group</label>
                <select className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none bg-white" value={formData.targetAudience} onChange={e => setFormData({...formData, targetAudience: e.target.value})}>
                  <option value="All Department">All Department</option>
                  <option value="All Faculty">All Faculty</option>
                  <option value="All Students">All Students</option>
                  <option value="Year 1 Only">Year 1 Only</option>
                  <option value="Year 4 Only">Year 4 Only</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                <textarea required className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none h-32 resize-none" placeholder="Write your official message..." value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})}></textarea>
              </div>
              
              <div className="flex items-center gap-2">
                <input type="checkbox" id="email" checked={formData.sendEmail} onChange={e => setFormData({...formData, sendEmail: e.target.checked})} className="rounded text-emerald-600 focus:ring-emerald-500" />
                <label htmlFor="email" className="text-sm text-slate-600 cursor-pointer">Also send via Email</label>
              </div>
              
              <button type="submit" disabled={submitting} className="w-full bg-emerald-600 text-white rounded-lg py-2.5 font-medium hover:bg-emerald-700 transition-colors mt-2 disabled:opacity-50">
                {submitting ? 'Publishing...' : 'Publish Notice'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HodAnnouncements;
