import {
  LayoutDashboard,
  BookOpen,
  Users,
  FileText,
  UploadCloud,
  Megaphone,
  CheckSquare,
  MessageSquare,
  UserCheck,
  BarChart2,
  UserCircle,
  LogOut
} from 'lucide-react';

export const facultySidebarData = [
  {
    title: 'Dashboard',
    path: '/faculty/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Resources',
    path: '/faculty/resources',
    icon: UploadCloud,
  },
  {
    title: 'Assignments',
    path: '/faculty/assignments',
    icon: FileText,
  },
  {
    title: 'Subjects',
    path: '/faculty/subjects',
    icon: BookOpen,
  },
  {
    title: 'Announcements',
    path: '/faculty/announcements',
    icon: Megaphone,
  },
  {
    title: 'Students',
    path: '/faculty/students',
    icon: Users,
  },
  {
    title: 'Messages',
    path: '/faculty/messages',
    icon: MessageSquare,
  },
  {
    title: 'Profile',
    path: '/faculty/profile',
    icon: UserCircle,
  }
];
