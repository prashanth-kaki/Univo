import React from 'react';
import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import HodLayout
  from '../layouts/HodLayout';

// Pages
import HodDashboard
  from '../pages/hod/HodDashboard';

import HodFaculty
  from '../pages/hod/HodFaculty';

import HodSubjects
  from '../pages/hod/HodSubjects';

import HodAnalytics
  from '../pages/hod/HodAnalytics';

import HodAnnouncements
  from '../pages/hod/HodAnnouncements';

import HodResources
  from '../pages/hod/HodResources';

import HodForum
  from '../pages/hod/HodForum';

import HodStudents
  from '../pages/hod/HodStudents';

import HodTasks
  from '../pages/hod/HodTasks';

import HodSettings
  from '../pages/hod/HodSettings';

const HodRoutes =
  () => {
    return (
      <Routes>
        <Route
          element={
            <HodLayout />
          }
        >
          <Route
            path="/"
            element={
              <Navigate
                to="dashboard"
                replace
              />
            }
          />

          <Route
            path="dashboard"
            element={
              <HodDashboard />
            }
          />

          <Route
            path="faculty"
            element={
              <HodFaculty />
            }
          />

          <Route
            path="departments"
            element={
              <HodSubjects />
            }
          />

          <Route
            path="analytics"
            element={
              <HodAnalytics />
            }
          />

          <Route
            path="announcements"
            element={
              <HodAnnouncements />
            }
          />

          <Route
            path="resources"
            element={
              <HodResources />
            }
          />

          <Route
            path="coordinators"
            element={
              <HodStudents />
            }
          />

          <Route
            path="profile"
            element={
              <HodSettings />
            }
          />

          <Route
            path="forum"
            element={
              <HodForum />
            }
          />

          <Route
            path="tasks"
            element={
              <HodTasks />
            }
          />

          <Route
            path="*"
            element={
              <Navigate
                to="dashboard"
                replace
              />
            }
          />
        </Route>
      </Routes>
    );
  };

export default
  HodRoutes;