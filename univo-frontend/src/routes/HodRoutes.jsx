import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HodLayout from '../layouts/HodLayout';

// Import Pages
import HodDashboard from '../pages/hod/HodDashboard';
import HodFaculty from '../pages/hod/HodFaculty';
import HodAnalytics from '../pages/hod/HodAnalytics';
import HodAnnouncements from '../pages/hod/HodAnnouncements';
import HodResources from '../pages/hod/HodResources';
import HodDepartments from '../pages/hod/HodDashboard'; // Placeholder alias
import HodCoordinators from '../pages/hod/HodFaculty'; // Placeholder alias
import HodProfile from '../pages/hod/HodDashboard'; // Placeholder alias

const HodRoutes = () => {
  return (
    <Routes>
      <Route element={<HodLayout />}>
        <Route path="/" element={<Navigate to="dashboard" replace />} />
        
        <Route path="dashboard" element={<HodDashboard />} />
        <Route path="faculty" element={<HodFaculty />} />
        <Route path="departments" element={<HodDepartments />} />
        <Route path="analytics" element={<HodAnalytics />} />
        <Route path="announcements" element={<HodAnnouncements />} />
        <Route path="resources" element={<HodResources />} />
        <Route path="coordinators" element={<HodCoordinators />} />
        <Route path="profile" element={<HodProfile />} />
        
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Route>
    </Routes>
  );
};

export default HodRoutes;
