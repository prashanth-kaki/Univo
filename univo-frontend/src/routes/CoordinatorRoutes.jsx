import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CoordinatorLayout from '../layouts/CoordinatorLayout';

// Import Pages
import CoordinatorDashboard from '../pages/coordinator/CoordinatorDashboard';
import CoordinatorStudents from '../pages/coordinator/CoordinatorStudents';
// Unused pages: CoordinatorFaculty, CoordinatorSchedules, CoordinatorAttendance, CoordinatorReports, CoordinatorForum
import CoordinatorAnnouncements from '../pages/coordinator/CoordinatorAnnouncements';
import CoordinatorTasks from '../pages/coordinator/CoordinatorTasks';
import CoordinatorResources from '../pages/coordinator/CoordinatorResources';
import CoordinatorEvents from '../pages/coordinator/CoordinatorEvents';
import CoordinatorProfile from '../pages/coordinator/CoordinatorProfile';

const CoordinatorRoutes = () => {
  return (
    <Routes>
      <Route element={<CoordinatorLayout />}>
        <Route path="/" element={<Navigate to="dashboard" replace />} />
        
        <Route path="dashboard" element={<CoordinatorDashboard />} />
        <Route path="students" element={<CoordinatorStudents />} />
        <Route path="announcements" element={<CoordinatorAnnouncements />} />
        <Route path="tasks" element={<CoordinatorTasks />} />
        <Route path="resources" element={<CoordinatorResources />} />
        <Route path="events" element={<CoordinatorEvents />} />
        <Route path="profile" element={<CoordinatorProfile />} />
        
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Route>
    </Routes>
  );
};

export default CoordinatorRoutes;
