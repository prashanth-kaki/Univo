import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import StudentLayout from '../layouts/StudentLayout';

// Import Pages
import StudentDashboard from '../pages/student/StudentDashboard';
import StudentSubjects from '../pages/student/StudentSubjects';
import StudentAssignments from '../pages/student/StudentAssignments';
import StudentResources from '../pages/student/StudentResources';
import StudentAnnouncements from '../pages/student/StudentAnnouncements';
import StudentAttendance from '../pages/student/StudentAttendance';
import StudentDiscussions from '../pages/student/StudentDiscussions';
import StudentForum from '../pages/student/StudentForum';
import StudentBookmarks from '../pages/student/StudentBookmarks';
import StudentTasks from '../pages/student/StudentTasks';
import StudentProfile from '../pages/student/StudentProfile';
import StudentAiAssistant from '../pages/student/StudentDashboard'; // Alias for now

const StudentRoutes = () => {
  return (
    <Routes>
      <Route element={<StudentLayout />}>
        <Route path="/" element={<Navigate to="dashboard" replace />} />

        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="subjects" element={<StudentSubjects />} />
        <Route path="assignments" element={<StudentAssignments />} />
        <Route path="resources" element={<StudentResources />} />
        <Route path="announcements" element={<StudentAnnouncements />} />
        <Route path="attendance" element={<StudentAttendance />} />
        <Route path="discussions" element={<StudentDiscussions />} />
        <Route path="forum" element={<StudentForum />} />
        <Route path="bookmarks" element={<StudentBookmarks />} />
        <Route path="tasks" element={<StudentTasks />} />
        <Route path="profile" element={<StudentProfile />} />
        <Route path="ai-assistant" element={<StudentAiAssistant />} />

        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Route>
    </Routes>
  );
};

export default StudentRoutes;
