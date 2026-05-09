import React from 'react';
import { Save, Building, Bell, CalendarClock } from 'lucide-react';

const HodSettings = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Department Settings</h1>
        <p className="text-slate-500 mt-1">Configure department details and semester preferences.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center gap-2">
          <Building className="w-5 h-5 text-slate-500" />
          <h3 className="text-lg font-bold text-slate-800">General Information</h3>
        </div>
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Department Name</label>
              <input type="text" defaultValue="Computer Science & Engineering" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none bg-slate-50" readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Department Code</label>
              <input type="text" defaultValue="CSE" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none bg-slate-50" readOnly />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center gap-2">
          <CalendarClock className="w-5 h-5 text-slate-500" />
          <h3 className="text-lg font-bold text-slate-800">Semester Configuration</h3>
        </div>
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Current Academic Year</label>
              <select className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none">
                <option>2026-2027</option>
                <option>2025-2026</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Active Semester</label>
              <select className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none">
                <option>Fall Semester (Odd)</option>
                <option>Spring Semester (Even)</option>
              </select>
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
              <p className="font-medium text-slate-800">Low Attendance Alerts</p>
              <p className="text-xs text-slate-500">Get notified when a section drops below 75% average</p>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500" />
          </div>
          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <div>
              <p className="font-medium text-slate-800">Forum Moderation Reports</p>
              <p className="text-xs text-slate-500">Email summary of flagged discussions daily</p>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500" />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button className="bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-semibold flex items-center gap-2 hover:bg-emerald-700 transition-colors shadow-sm">
          <Save className="w-4 h-4" /> Save Configuration
        </button>
      </div>
    </div>
  );
};

export default HodSettings;
