import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../components/admin/layout/AdminLayout';

// Import Pages (assuming we create them soon)
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminUsers from '../pages/admin/AdminUsers';
import AdminAnnouncements from '../pages/admin/AdminAnnouncements';
import AdminDepartments from '../pages/admin/AdminDepartments';
import AdminResources from '../pages/admin/AdminResources';
import AdminModeration from '../pages/admin/AdminModeration';
import AdminReports from '../pages/admin/AdminReports';
import AdminAnalytics from '../pages/admin/AdminAnalytics';
import AdminActivity from '../pages/admin/AdminActivity';
import AdminSettings from '../pages/admin/AdminSettings';
import AdminSystemHealth from '../pages/admin/AdminSystemHealth';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        {/* Redirect /admin to /admin/dashboard */}
        <Route path="/" element={<Navigate to="dashboard" replace />} />
        
        {/* Admin specific routes */}
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="announcements" element={<AdminAnnouncements />} />
        <Route path="departments" element={<AdminDepartments />} />
        <Route path="resources" element={<AdminResources />} />
        <Route path="moderation" element={<AdminModeration />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="activity" element={<AdminActivity />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="system-health" element={<AdminSystemHealth />} />
        
        {/* Fallback for unknown admin routes */}
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
