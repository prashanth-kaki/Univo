import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  Library,
  Megaphone,
  CalendarCheck,
  MessageCircleQuestion,
  Users,
  Bookmark,
  CheckSquare,
  UserCircle
} from 'lucide-react';

export const studentSidebarData = [
  {
    title: 'Dashboard',
    path: '/student/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Subjects',
    path: '/student/subjects',
    icon: BookOpen,
  },
  {
    title: 'Assignments',
    path: '/student/assignments',
    icon: ClipboardList,
  },
  {
    title: 'Attendance',
    path: '/student/attendance',
    icon: CalendarCheck,
  },
  {
    title: 'Announcements',
    path: '/student/announcements',
    icon: Megaphone,
  },
  {
    title: 'Resources',
    path: '/student/resources',
    icon: Library,
  },
  {
    title: 'Discussions',
    path: '/student/discussions',
    icon: MessageCircleQuestion,
  },
  {
    title: 'Bookmarks',
    path: '/student/bookmarks',
    icon: Bookmark,
  },
  {
    title: 'Tasks',
    path: '/student/tasks',
    icon: CheckSquare,
  },
  {
    title: 'Forum',
    path: '/student/forum',
    icon: Users,
  },
  {
    title: 'Profile',
    path: '/student/profile',
    icon: UserCircle,
  }
];
