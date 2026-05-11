import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HodLayout from '../layouts/HodLayout';

// Import Pages
import HodDashboard from '../pages/hod/HodDashboard';
import HodFaculty from '../pages/hod/HodFaculty';
import HodStudents from '../pages/hod/HodStudents';
import HodSubjects from '../pages/hod/HodSubjects';
import HodResources from '../pages/hod/HodResources';
import HodAnnouncements from '../pages/hod/HodAnnouncements';
import HodAnalytics from '../pages/hod/HodAnalytics';
import HodSettings from '../pages/hod/HodSettings';

const HodRoutes = () => {
  return (
    <Routes>
      <Route element={<HodLayout />}>
        <Route path="/" element={<Navigate to="dashboard" replace />} />
        
        <Route path="dashboard" element={<HodDashboard />} />
        <Route path="faculty" element={<HodFaculty />} />
        <Route path="students" element={<HodStudents />} />
        <Route path="subjects" element={<HodSubjects />} />
        <Route path="resources" element={<HodResources />} />
        <Route path="announcements" element={<HodAnnouncements />} />
        
        {/* Reuse analytics for reports/activity temporarily or if user clicks it */}
        <Route path="moderation" element={<Navigate to="/hod/resources" replace />} />
        <Route path="reports" element={<Navigate to="/hod/analytics" replace />} />
        <Route path="analytics" element={<HodAnalytics />} />
        <Route path="activity" element={<Navigate to="/hod/dashboard" replace />} />
        
        <Route path="settings" element={<HodSettings />} />
        
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Route>
    </Routes>
  );
};

export default HodRoutes;
