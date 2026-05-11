import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import FacultyLayout from '../layouts/FacultyLayout';

// Import Pages
import FacultyDashboard from '../pages/faculty/FacultyDashboard';
import FacultySubjects from '../pages/faculty/FacultySubjects';
import FacultyStudents from '../pages/faculty/FacultyStudents';
import FacultyAssignments from '../pages/faculty/FacultyAssignments';
import FacultyResources from '../pages/faculty/FacultyResources';
import FacultyAnnouncements from '../pages/faculty/FacultyAnnouncements';
// Faculty specific unused pages can be removed later, for now we just remove from routes.
// We will reuse the generic Chat component or create FacultyMessages if needed.
import FacultyMessages from '../pages/faculty/FacultyDiscussions'; // Alias for now
import FacultyProfile from '../pages/faculty/FacultyProfile';

const FacultyRoutes = () => {
  return (
    <Routes>
      <Route element={<FacultyLayout />}>
        {/* Redirect /faculty to /faculty/dashboard */}
        <Route path="/" element={<Navigate to="dashboard" replace />} />
        
        {/* Faculty specific routes */}
        <Route path="dashboard" element={<FacultyDashboard />} />
        <Route path="subjects" element={<FacultySubjects />} />
        <Route path="students" element={<FacultyStudents />} />
        <Route path="assignments" element={<FacultyAssignments />} />
        <Route path="resources" element={<FacultyResources />} />
        <Route path="announcements" element={<FacultyAnnouncements />} />
        <Route path="messages" element={<FacultyMessages />} />
        <Route path="profile" element={<FacultyProfile />} />
        
        {/* Fallback for unknown faculty routes */}
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Route>
    </Routes>
  );
};

export default FacultyRoutes;
