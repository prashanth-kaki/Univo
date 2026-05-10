import React, { useState, useRef, useEffect } from 'react';
import { Bell, Search, Menu } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminHeader = ({ toggleSidebar }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  
  const notifRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 md:px-6 sticky top-0 z-20 shadow-sm">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors md:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search users, departments..." 
            className="pl-9 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 w-64 md:w-80 transition-all outline-none"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden z-50">
              <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-semibold text-slate-800">Notifications</h3>
                <button className="text-xs text-indigo-600 hover:underline">Mark all as read</button>
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                <div className="p-4 border-b border-slate-50 hover:bg-slate-50 cursor-pointer">
                  <p className="text-sm text-slate-800 font-medium">New User Registration</p>
                  <p className="text-xs text-slate-500 mt-1">Alex Wilson joined as Student</p>
                  <p className="text-xs text-slate-400 mt-2">2 minutes ago</p>
                </div>
                <div className="p-4 border-b border-slate-50 hover:bg-slate-50 cursor-pointer">
                  <p className="text-sm text-slate-800 font-medium">System Alert</p>
                  <p className="text-xs text-slate-500 mt-1">High CPU usage detected on server node 2</p>
                  <p className="text-xs text-slate-400 mt-2">1 hour ago</p>
                </div>
                <div className="p-4 hover:bg-slate-50 cursor-pointer">
                  <p className="text-sm text-slate-800 font-medium">Report Filed</p>
                  <p className="text-xs text-slate-500 mt-1">New content report needs review</p>
                  <p className="text-xs text-slate-400 mt-2">3 hours ago</p>
                </div>
              </div>
              <div className="p-3 border-t border-slate-100 text-center">
                <button className="text-sm text-indigo-600 font-medium hover:underline">View all notifications</button>
              </div>
            </div>
          )}
        </div>
        
        <div className="h-8 w-px bg-slate-200 mx-1 md:mx-2"></div>
        
        <div 
          onClick={() => navigate('/admin/settings')}
          className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-1.5 rounded-lg transition-colors"
        >
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-700">{user?.name || 'Super Admin'}</p>
            <p className="text-xs text-slate-500">System Administrator</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold border border-slate-700 shadow-sm">
            {user?.name?.charAt(0)?.toUpperCase() || 'A'}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
