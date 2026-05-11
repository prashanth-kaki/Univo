import React, { useState, useEffect } from 'react';
import { Save, Building, Bell, CalendarClock, Loader } from 'lucide-react';
import { getSettings, updateSettings } from '../../services/hodService';
import toast from 'react-hot-toast';

const HodSettings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const branch = localStorage.getItem('branch') || 'Department';

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getSettings();
        setSettings(data || {});
      } catch (error) {
        toast.error('Failed to load settings');
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleToggle = (category, field) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: !prev[category]?.[field]
      }
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateSettings(settings);
      toast.success('Settings updated successfully');
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64"><Loader className="animate-spin w-8 h-8 text-emerald-600" /></div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Department Settings</h1>
        <p className="text-slate-500 mt-1">Configure department details and preferences.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center gap-2">
          <Building className="w-5 h-5 text-slate-500" />
          <h3 className="text-lg font-bold text-slate-800">General Information</h3>
        </div>
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Department Code</label>
              <input type="text" value={branch} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none bg-slate-50" readOnly />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center gap-2">
          <Bell className="w-5 h-5 text-slate-500" />
          <h3 className="text-lg font-bold text-slate-800">Alert Preferences</h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <div>
              <p className="font-medium text-slate-800">Email Alerts</p>
              <p className="text-xs text-slate-500">Get notified via email for department activity</p>
            </div>
            <input 
              type="checkbox" 
              checked={settings?.notificationPreferences?.emailAlerts ?? true} 
              onChange={() => handleToggle('notificationPreferences', 'emailAlerts')}
              className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 cursor-pointer" 
            />
          </div>
          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <div>
              <p className="font-medium text-slate-800">Forum Moderation Reports</p>
              <p className="text-xs text-slate-500">Get notified about flagged discussions</p>
            </div>
            <input 
              type="checkbox" 
              checked={settings?.notificationPreferences?.reportAlerts ?? true} 
              onChange={() => handleToggle('notificationPreferences', 'reportAlerts')}
              className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 cursor-pointer" 
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center gap-2">
          <CalendarClock className="w-5 h-5 text-slate-500" />
          <h3 className="text-lg font-bold text-slate-800">Announcement & Moderation</h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <div>
              <p className="font-medium text-slate-800">Allow Faculty Announcements</p>
              <p className="text-xs text-slate-500">Allow faculty to post department-wide announcements</p>
            </div>
            <input 
              type="checkbox" 
              checked={settings?.announcementSettings?.allowFacultyAnnouncements ?? true} 
              onChange={() => handleToggle('announcementSettings', 'allowFacultyAnnouncements')}
              className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 cursor-pointer" 
            />
          </div>
          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <div>
              <p className="font-medium text-slate-800">Strict Moderation Mode</p>
              <p className="text-xs text-slate-500">Automatically hide content with high severity flags</p>
            </div>
            <input 
              type="checkbox" 
              checked={settings?.moderationSettings?.strictMode ?? false} 
              onChange={() => handleToggle('moderationSettings', 'strictMode')}
              className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 cursor-pointer" 
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button 
          onClick={handleSave} 
          disabled={saving}
          className="bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-semibold flex items-center gap-2 hover:bg-emerald-700 transition-colors shadow-sm disabled:bg-emerald-400">
          <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Configuration'}
        </button>
      </div>
    </div>
  );
};

export default HodSettings;
