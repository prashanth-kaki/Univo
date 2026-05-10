import React from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { Toaster } from 'react-hot-toast';

import {
  AuthProvider,
  useAuth,
} from './context/AuthContext';

import Login from './pages/Login/Login';

import ErrorBoundary from './components/Common/ErrorBoundary';

import { ROLES } from './config/roles';

// ROUTES
import FacultyRoutes from './routes/FacultyRoutes';
import HodRoutes from './routes/HodRoutes';
import StudentRoutes from './routes/StudentRoutes';
import CoordinatorRoutes from './routes/CoordinatorRoutes';
import AdminRoutes from './routes/AdminRoutes';

// ======================================
// SAFE LOADING SCREEN
// ======================================

const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex items-center justify-center text-2xl font-semibold">
      Loading Univo...
    </div>
  );
};

// ======================================
// APP ROUTES
// ======================================

function AppRoutes() {
  const auth = useAuth();

  // SAFETY CHECK

  if (!auth) {
    return <LoadingScreen />;
  }

  const {
    isAuthenticated,
    user,
  } = auth;

  // ======================================
  // NOT LOGGED IN
  // ======================================

  if (!isAuthenticated) {
    return (
      <Routes>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="*"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

      </Routes>
    );
  }

  // ======================================
  // NO USER SAFETY
  // ======================================

  if (!user) {
    return <LoadingScreen />;
  }

  // ======================================
  // ADMIN
  // ======================================

  if (
    user.role ===
    ROLES.ADMIN
  ) {
    return (
      <Routes>

        <Route
          path="/admin/*"
          element={
            <AdminRoutes />
          }
        />

        <Route
          path="*"
          element={
            <Navigate
              to="/admin/dashboard"
              replace
            />
          }
        />

      </Routes>
    );
  }

  // ======================================
  // FACULTY
  // ======================================

  if (
    user.role ===
    ROLES.FACULTY
  ) {
    return (
      <Routes>

        <Route
          path="/faculty/*"
          element={
            <FacultyRoutes />
          }
        />

        <Route
          path="*"
          element={
            <Navigate
              to="/faculty/dashboard"
              replace
            />
          }
        />

      </Routes>
    );
  }

  // ======================================
  // HOD
  // ======================================

  if (
    user.role ===
    ROLES.HOD
  ) {
    return (
      <Routes>

        <Route
          path="/hod/*"
          element={<HodRoutes />}
        />

        <Route
          path="*"
          element={
            <Navigate
              to="/hod/dashboard"
              replace
            />
          }
        />

      </Routes>
    );
  }

  // ======================================
  // STUDENT
  // ======================================

  if (
    user.role ===
    ROLES.STUDENT
  ) {
    return (
      <Routes>

        <Route
          path="/student/*"
          element={
            <StudentRoutes />
          }
        />

        <Route
          path="*"
          element={
            <Navigate
              to="/student/dashboard"
              replace
            />
          }
        />

      </Routes>
    );
  }

  // ======================================
  // COORDINATOR
  // ======================================

  if (
    user.role ===
    ROLES.COORDINATOR
  ) {
    return (
      <Routes>

        <Route
          path="/coordinator/*"
          element={
            <CoordinatorRoutes />
          }
        />

        <Route
          path="*"
          element={
            <Navigate
              to="/coordinator/dashboard"
              replace
            />
          }
        />

      </Routes>
    );
  }

  // ======================================
  // UNKNOWN ROLE
  // ======================================

  return (
    <Routes>
      <Route
        path="*"
        element={
          <Navigate
            to="/login"
            replace
          />
        }
      />
    </Routes>
  );
}

// ======================================
// MAIN APP
// ======================================

function App() {
  return (
    <ErrorBoundary>

      <AuthProvider>

        <Router>

          <AppRoutes />

          <Toaster
            position="top-right"
          />

        </Router>

      </AuthProvider>

    </ErrorBoundary>
  );
}

export default App;