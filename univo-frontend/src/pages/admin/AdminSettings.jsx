import React, { useState } from 'react';
import { Save, Shield, Settings as SettingsIcon, Mail, Database, Bell } from 'lucide-react';
import { cn } from '../../utils/cn';

const SettingsSection = ({ title, icon: Icon, description, children }) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-6">
    <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-start gap-4">
      <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg shrink-0">
        <Icon size={20} />
      </div>
      <div>
        <h2 className="text-lg font-bold text-slate-800">{title}</h2>
        <p className="text-sm text-slate-500 mt-1">{description}</p>
      </div>
    </div>
    <div className="p-6 flex flex-col gap-6">
      {children}
    </div>
  </div>
);

const Toggle = ({ label, description, enabled, onToggle }) => (
  <div className="flex items-center justify-between">
    <div>
      <h3 className="text-sm font-semibold text-slate-800">{label}</h3>
      {description && <p className="text-xs text-slate-500 mt-1">{description}</p>}
    </div>
    <button 
      onClick={onToggle}
      className={cn(
        "w-11 h-6 rounded-full transition-colors relative flex items-center px-1",
        enabled ? "bg-indigo-600" : "bg-slate-300"
      )}
    >
      <span className={cn(
        "w-4 h-4 rounded-full bg-white shadow-sm transition-transform",
        enabled ? "translate-x-5" : "translate-x-0"
      )} />
    </button>
  </div>
);

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    registration: true,
    maintenance: false,
    aiModeration: true,
    emailNotifications: true,
    strictPasswords: true
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">System Settings</h1>
          <p className="text-slate-500 mt-1">Configure platform behavior, security, and global preferences.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-600/20 w-full sm:w-auto justify-center">
            <Save size={18} />
            Save Changes
          </button>
        </div>
      </div>

      <SettingsSection 
        title="General Preferences" 
        icon={SettingsIcon} 
        description="Core platform settings including registration and maintenance."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-800">Current Semester</label>
            <select className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Fall 2023</option>
              <option>Spring 2024</option>
              <option>Summer 2024</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-800">Academic Year</label>
            <select className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500">
              <option>2023-2024</option>
              <option>2024-2025</option>
            </select>
          </div>
        </div>
        <div className="border-t border-slate-100 pt-6 flex flex-col gap-6">
          <Toggle 
            label="Open User Registration" 
            description="Allow new users to create accounts without manual approval."
            enabled={settings.registration}
            onToggle={() => toggleSetting('registration')}
          />
          <Toggle 
            label="Maintenance Mode" 
            description="Temporarily disable access to the platform for all non-admin users."
            enabled={settings.maintenance}
            onToggle={() => toggleSetting('maintenance')}
          />
        </div>
      </SettingsSection>

      <SettingsSection 
        title="Security & Moderation" 
        icon={Shield} 
        description="Manage automated moderation, AI systems, and password policies."
      >
        <div className="flex flex-col gap-6">
          <Toggle 
            label="AI Auto-Moderation" 
            description="Use AI to automatically flag inappropriate content and toxic messages."
            enabled={settings.aiModeration}
            onToggle={() => toggleSetting('aiModeration')}
          />
          <Toggle 
            label="Strict Password Policy" 
            description="Require uppercase, numbers, and symbols for all new user passwords."
            enabled={settings.strictPasswords}
            onToggle={() => toggleSetting('strictPasswords')}
          />
          <div className="flex flex-col gap-2 pt-2">
            <label className="text-sm font-semibold text-slate-800">Session Timeout (Minutes)</label>
            <input 
              type="number" 
              defaultValue={60}
              className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500 max-w-[200px]"
            />
          </div>
        </div>
      </SettingsSection>

      <SettingsSection 
        title="Email & Notifications" 
        icon={Mail} 
        description="Configure SMTP settings and global notification rules."
      >
        <div className="flex flex-col gap-6">
          <Toggle 
            label="Enable System Emails" 
            description="Allow the system to send automated emails (password reset, announcements)."
            enabled={settings.emailNotifications}
            onToggle={() => toggleSetting('emailNotifications')}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 pt-2">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-800">SMTP Host</label>
              <input type="text" defaultValue="smtp.sendgrid.net" className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-800">SMTP Port</label>
              <input type="text" defaultValue="587" className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-800">Sender Email</label>
              <input type="email" defaultValue="noreply@univo.edu" className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
          </div>
        </div>
      </SettingsSection>
      
      {/* Extra space at bottom */}
      <div className="h-8"></div>
    </div>
  );
};

export default AdminSettings;
