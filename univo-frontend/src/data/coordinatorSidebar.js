import {
  LayoutDashboard,
  Users,
  Megaphone,
  CheckSquare,
  FileBox,
  Ticket,
  UserCircle
} from 'lucide-react';

export const coordinatorSidebarData = [
  {
    title: 'Dashboard',
    path: '/coordinator/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Events',
    path: '/coordinator/events',
    icon: Ticket,
  },
  {
    title: 'Tasks',
    path: '/coordinator/tasks',
    icon: CheckSquare,
  },
  {
    title: 'Announcements',
    path: '/coordinator/announcements',
    icon: Megaphone,
  },
  {
    title: 'Resources',
    path: '/coordinator/resources',
    icon: FileBox,
  },
  {
    title: 'Students',
    path: '/coordinator/students',
    icon: Users,
  },
  {
    title: 'Profile',
    path: '/coordinator/profile',
    icon: UserCircle,
  }
];
