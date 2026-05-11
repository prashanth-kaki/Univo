import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  FolderOpen,
  Megaphone,
  ShieldAlert,
  FileBarChart,
  BarChart3,
  Activity,
  Settings
} from 'lucide-react';

export const hodSidebarData = [
  {
    title: 'Dashboard',
    path: '/hod/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Faculty',
    path: '/hod/faculty',
    icon: Users,
  },
  {
    title: 'Students',
    path: '/hod/students',
    icon: GraduationCap,
  },
  {
    title: 'Subjects',
    path: '/hod/subjects',
    icon: BookOpen,
  },
  {
    title: 'Resources',
    path: '/hod/resources',
    icon: FolderOpen,
  },
  {
    title: 'Announcements',
    path: '/hod/announcements',
    icon: Megaphone,
  },
  {
    title: 'Moderation',
    path: '/hod/moderation',
    icon: ShieldAlert,
  },
  {
    title: 'Reports',
    path: '/hod/reports',
    icon: FileBarChart,
  },
  {
    title: 'Analytics',
    path: '/hod/analytics',
    icon: BarChart3,
  },
  {
    title: 'Activity Logs',
    path: '/hod/activity',
    icon: Activity,
  },
  {
    title: 'Settings',
    path: '/hod/settings',
    icon: Settings,
  }
];
