import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from './context/AuthContext'
import Login from './pages/Login/Login'
import ErrorBoundary from './components/Common/ErrorBoundary'
import { ROLES } from './config/roles'
import FacultyRoutes from './routes/FacultyRoutes'
import HodRoutes from './routes/HodRoutes'
import StudentRoutes from './routes/StudentRoutes'
import CoordinatorRoutes from './routes/CoordinatorRoutes'
import AdminRoutes from './routes/AdminRoutes'

// Placeholder components for new role-specific pages
const UserManagement = () => <div className="p-6"><h2>User Management</h2><p>Admin feature coming soon.</p></div>
const FacultyManagement = () => <div className="p-6"><h2>Faculty Management</h2><p>HOD feature coming soon.</p></div>
const EventManagement = () => <div className="p-6"><h2>Event Management</h2><p>Coordinator feature coming soon.</p></div>

function AppRoutes() {
  const { isAuthenticated, user } = useAuth()

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    )
  }

  // Completely isolate Admin Role
  if (user?.role === ROLES.ADMIN) {
    return (
      <Routes>
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    )
  }

  // Completely isolate Faculty Role
  if (user?.role === ROLES.FACULTY) {
    return (
      <Routes>
        <Route path="/faculty/*" element={<FacultyRoutes />} />
        <Route path="*" element={<Navigate to="/faculty/dashboard" replace />} />
      </Routes>
    )
  }

  // Completely isolate HOD Role
  if (user?.role === ROLES.HOD) {
    return (
      <Routes>
        <Route path="/hod/*" element={<HodRoutes />} />
        <Route path="*" element={<Navigate to="/hod/dashboard" replace />} />
      </Routes>
    )
  }

  // Completely isolate Student Role
  if (user?.role === ROLES.STUDENT) {
    return (
      <Routes>
        <Route path="/student/*" element={<StudentRoutes />} />
        <Route path="*" element={<Navigate to="/student/dashboard" replace />} />
      </Routes>
    )
  }

  // Completely isolate Coordinator Role
  if (user?.role === ROLES.COORDINATOR) {
    return (
      <Routes>
        <Route path="/coordinator/*" element={<CoordinatorRoutes />} />
        <Route path="*" element={<Navigate to="/coordinator/dashboard" replace />} />
      </Routes>
    )
  }

  // Fallback for unknown role
  return <Navigate to="/login" replace />
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <AppRoutes />
          <Toaster position="top-right" />
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App