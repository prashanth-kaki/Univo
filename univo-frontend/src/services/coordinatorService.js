import axios from 'axios';

const API_URL = '/api/coordinator';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getDashboardStats = async () => {
  await delay(500);
  return {
    assignedSections: 4,
    totalStudents: 245,
    pendingTasks: 8,
    upcomingEvents: 2,
    activeAnnouncements: 5,
    attendanceAlerts: 12
  };
};

export const getStudentsList = async () => {
  await delay(600);
  return [
    { id: '1UN23CS001', name: 'Alex Johnson', section: 'CS-A', year: '3rd Year', attendance: 88, status: 'Regular' },
    { id: '1UN23CS002', name: 'Sarah Smith', section: 'CS-A', year: '3rd Year', attendance: 72, status: 'Warning' },
    { id: '1UN23CS045', name: 'Michael Brown', section: 'CS-B', year: '3rd Year', attendance: 65, status: 'Critical' },
    { id: '1UN23CS089', name: 'Emily Davis', section: 'CS-C', year: '3rd Year', attendance: 95, status: 'Regular' },
    { id: '1UN23CS112', name: 'David Wilson', section: 'CS-B', year: '3rd Year', attendance: 82, status: 'Regular' },
  ];
};

export const getFacultyCoordination = async () => {
  await delay(500);
  return [
    { id: 1, name: 'Dr. John Smith', subject: 'DBMS', section: 'CS-A, CS-B', scheduleStatus: 'On Track', pendingLeaves: 0 },
    { id: 2, name: 'Prof. Alan Turing', subject: 'Computer Networks', section: 'CS-C', scheduleStatus: 'Slight Delay', pendingLeaves: 1 },
    { id: 3, name: 'Dr. Grace Hopper', subject: 'Software Engineering', section: 'CS-A', scheduleStatus: 'On Track', pendingLeaves: 0 },
  ];
};

export const getSchedules = async () => {
  await delay(700);
  return [
    { id: 1, day: 'Monday', time: '09:00 AM - 10:00 AM', subject: 'DBMS', faculty: 'Dr. John Smith', room: 'Room 301', section: 'CS-A' },
    { id: 2, day: 'Monday', time: '10:00 AM - 11:00 AM', subject: 'Operating Systems', faculty: 'Dr. Sarah Connor', room: 'Room 302', section: 'CS-A' },
    { id: 3, day: 'Tuesday', time: '11:00 AM - 01:00 PM', subject: 'Computer Networks Lab', faculty: 'Prof. Alan Turing', room: 'Lab 4', section: 'CS-B' },
  ];
};

export const getUpcomingEvents = async () => {
  await delay(400);
  return [
    { id: 1, title: 'Annual Tech Symposium', date: 'Oct 25, 2026', time: '10:00 AM', venue: 'Main Auditorium', type: 'Department', status: 'Upcoming' },
    { id: 2, title: 'React Workshop', date: 'Oct 28, 2026', time: '02:00 PM', venue: 'Lab 1', type: 'Workshop', status: 'Registration Open' },
    { id: 3, title: 'Mid Semester Review', date: 'Nov 05, 2026', time: '09:00 AM', venue: 'Conference Room', type: 'Review', status: 'Scheduled' },
  ];
};

export const getAttendanceOverview = async () => {
  await delay(600);
  return {
    sectionData: [
      { name: 'CS-A', attendance: 86 },
      { name: 'CS-B', attendance: 78 },
      { name: 'CS-C', attendance: 92 },
      { name: 'CS-D', attendance: 81 },
    ],
    criticalCount: 12,
    warningCount: 28
  };
};

export const getReportsList = async () => {
  await delay(500);
  return [
    { id: 'REP-001', type: 'Attendance Shortage', date: '2026-10-15', generatedBy: 'System', status: 'Action Required' },
    { id: 'REP-002', type: 'Syllabus Completion', date: '2026-10-14', generatedBy: 'Dr. Smith', status: 'Reviewed' },
    { id: 'REP-003', type: 'Lab Infrastructure', date: '2026-10-10', generatedBy: 'Lab Assistant', status: 'Pending Approval' },
  ];
};
