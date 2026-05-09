import { ROLES } from './roles';

const studentPermissions = [
  'view_notes',
  'view_announcements',
  'view_curriculum',
  'manage_bookmarks',
  'manage_tasks',
  'view_dashboard_student',
  'edit_profile',
  'receive_notifications',
  'access_chat',
  'access_forum',
  'access_buzz',
  'view_circulars'
];

const coordinatorPermissions = [
  ...studentPermissions,
  'view_dashboard_coordinator',
  'manage_events',
  'manage_students',
  'coordinator_tools',
  'upload_notes' // Depending on requirements, coordinator might manage some content
];

const facultyPermissions = [
  'upload_notes',
  'view_notes',
  'create_announcements',
  'view_announcements',
  'manage_subjects',
  'view_dashboard_faculty',
  'view_assigned_students',
  'edit_curriculum',
  'view_curriculum',
  'edit_profile',
  'receive_notifications',
  'access_chat',
  'access_forum',
  'access_buzz',
  'view_circulars'
];

const hodPermissions = [
  ...facultyPermissions,
  'view_dashboard_hod',
  'manage_faculty',
  'manage_coordinator',
  'view_department_analytics',
  'view_reports',
  'approve_curriculum',
  'department_workflows'
];

const adminPermissions = [
  '*' // Wildcard for all access
];

export const ROLE_PERMISSIONS = {
  [ROLES.STUDENT]: studentPermissions,
  [ROLES.COORDINATOR]: coordinatorPermissions,
  [ROLES.FACULTY]: facultyPermissions,
  [ROLES.HOD]: hodPermissions,
  [ROLES.ADMIN]: adminPermissions
};
