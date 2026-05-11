import React, { useState, useEffect } from 'react';
import { FaBell } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';
import api from '../../services/api';

const NotificationBell = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchNotifications();
    import('../../services/socketService').then(({ default: socketService }) => {
      socketService.on('newNotification', (notif) => {
        setNotifications(prev => [{ ...notif, isRead: false }, ...prev]);
        setUnreadCount(prev => prev + 1);
        if (Notification.permission === "granted") {
          new Notification(notif.title, { body: notif.body });
        } else if (Notification.permission !== "denied") {
          Notification.requestPermission().then(permission => {
            if (permission === "granted") {
              new Notification(notif.title, { body: notif.body });
            }
          });
        }
      });
      return () => {
        socketService.off('newNotification');
      };
    });
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await api.get('/notifications');
      if (res.data) {
        setNotifications(res.data.notifications || []);
        setUnreadCount(res.data.unreadCount || 0);
      }
    } catch(err) {}
  };

  const markAllAsRead = async () => {
    try {
      await api.put('/notifications/read-all/mark');
      setNotifications(notifications.map(n => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch(err) {}
  };

  return (
    <div className="relative">
      <button 
        className="p-2.5 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors relative"
        onClick={() => setShowNotifications(!showNotifications)}
      >
        <FaBell className="text-xl" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
            {unreadCount}
          </span>
        )}
      </button>
      
      <AnimatePresence>
        {showNotifications && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden origin-top-right z-50"
          >
            <div className="px-4 py-3 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-bold text-slate-800">Notifications</h3>
              <button onClick={markAllAsRead} className="text-xs text-indigo-600 font-medium hover:underline">Mark all as read</button>
            </div>
            <div className="max-h-[360px] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-sm text-slate-500">No notifications</div>
              ) : (
                notifications.map(notif => (
                  <div 
                    key={notif._id} 
                    className={cn(
                      "px-4 py-3 border-b border-slate-50 cursor-pointer transition-colors hover:bg-slate-50 flex gap-3",
                      !notif.isRead ? "bg-indigo-50/30" : ""
                    )}
                  >
                    <div className={cn("w-2 h-2 rounded-full mt-1.5 shrink-0", !notif.isRead ? "bg-indigo-500" : "bg-transparent")} />
                    <div>
                      <div className={cn("text-sm mb-0.5", !notif.isRead ? "font-bold text-slate-800" : "font-medium text-slate-700")}>
                        {notif.title}
                      </div>
                      <div className="text-xs text-slate-500 mb-1 leading-snug">
                        {notif.body}
                      </div>
                      <div className="text-[10px] text-slate-400 font-medium">{new Date(notif.createdAt).toLocaleString()}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationBell;
