import {
  LayoutDashboard,
  Users,
  Megaphone,
  FileText,
  BarChart3,
  Building2,
  UserCircle
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
    title: 'Departments',
    path: '/hod/departments',
    icon: Building2,
  },
  {
    title: 'Analytics',
    path: '/hod/analytics',
    icon: BarChart3,
  },
  {
    title: 'Announcements',
    path: '/hod/announcements',
    icon: Megaphone,
  },
  {
    title: 'Resources',
    path: '/hod/resources',
    icon: FileText,
  },
  // {
  //   title: 'Coordinators',
  //   path: '/hod/coordinators',
  //   icon: Users,
  // },
  {
    title: 'Profile',
    path: '/hod/profile',
    icon: UserCircle,
  }
];
