import axios from 'axios';

const API_URL = '/api/hod';

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

export const getDepartmentStats = async () => {
  await delay(500);
  return {
    totalStudents: 1250,
    totalFaculty: 42,
    totalSubjects: 28,
    resourcesUploaded: 345,
    pendingTasks: 8,
    activeAnnouncements: 3,
    attendancePercent: 92,
    flaggedPosts: 5
  };
};

export const getFacultyList = async () => {
  await delay(600);
  return [
    { id: 'F001', name: 'Dr. John Smith', role: 'Associate Professor', subjects: 3, uploads: 45, status: 'Active' },
    { id: 'F002', name: 'Dr. Sarah Connor', role: 'Assistant Professor', subjects: 2, uploads: 12, status: 'Active' },
    { id: 'F003', name: 'Prof. Alan Turing', role: 'Professor', subjects: 1, uploads: 80, status: 'On Leave' },
    { id: 'F004', name: 'Dr. Grace Hopper', role: 'Assistant Professor', subjects: 4, uploads: 23, status: 'Active' },
  ];
};

export const getDepartmentActivity = async () => {
  await delay(400);
  return [
    { id: 1, user: 'Dr. John Smith', action: 'uploaded a new resource for Data Structures', time: '10 mins ago', type: 'resource' },
    { id: 2, user: 'Prof. Alan Turing', action: 'marked attendance for CS-A', time: '1 hour ago', type: 'attendance' },
    { id: 3, user: 'System', action: 'Flagged 2 forum posts for review', time: '3 hours ago', type: 'alert' },
    { id: 4, user: 'Dr. Sarah Connor', action: 'created an assignment: Midterm Prep', time: 'Yesterday', type: 'assignment' },
  ];
};

export const getSubjectAllocations = async () => {
  await delay(500);
  return [
    { id: 1, code: 'CS301', name: 'Data Structures', faculty: 'Dr. John Smith', sections: ['CS-A', 'CS-B'], credits: 4 },
    { id: 2, code: 'CS302', name: 'Algorithms', faculty: 'Dr. Sarah Connor', sections: ['CS-A', 'CS-B'], credits: 4 },
    { id: 3, code: 'CS401', name: 'Database Systems', faculty: 'Dr. Grace Hopper', sections: ['CS-A'], credits: 3 },
  ];
};

export const getModerationQueue = async () => {
  await delay(500);
  return [
    { id: 1, author: 'Alice Smith', content: 'Can someone share the exact exam questions?', type: 'Forum Post', flaggedBy: 'Automated System', reason: 'Academic Integrity', time: '2 hours ago' },
    { id: 2, author: 'Bob Johnson', content: 'Buy cheap assignments here: link', type: 'Comment', flaggedBy: 'Dr. John Smith', reason: 'Spam', time: '5 hours ago' },
  ];
};

export const getDepartmentAnalytics = async () => {
  await delay(600);
  return {
    attendanceTrends: [
      { name: 'Week 1', 'Year 1': 95, 'Year 2': 92, 'Year 3': 88, 'Year 4': 85 },
      { name: 'Week 2', 'Year 1': 93, 'Year 2': 90, 'Year 3': 85, 'Year 4': 82 },
      { name: 'Week 3', 'Year 1': 94, 'Year 2': 91, 'Year 3': 87, 'Year 4': 86 },
      { name: 'Week 4', 'Year 1': 96, 'Year 2': 93, 'Year 3': 89, 'Year 4': 88 },
    ],
    facultyUploads: [
      { name: 'Dr. Smith', uploads: 45 },
      { name: 'Dr. Connor', uploads: 12 },
      { name: 'Prof. Turing', uploads: 80 },
      { name: 'Dr. Hopper', uploads: 23 },
    ]
  };
};
