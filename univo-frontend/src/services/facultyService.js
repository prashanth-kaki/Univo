import axios from 'axios';

// Base API configuration (can be updated to use env vars)
const API_URL = '/api/faculty';

// Create an axios instance with default config
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor to include auth token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Mock delay to simulate network requests
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Dashboard Stats
export const getDashboardStats = async () => {
  await delay(500);
  // Return mock data for now
  return {
    assignedSubjects: 4,
    totalStudents: 156,
    pendingAssignments: 12,
    resourcesUploaded: 45,
    attendancePercent: 88,
    unreadDiscussions: 8
  };
};

export const getUpcomingClasses = async () => {
  await delay(500);
  return [
    { id: 1, subject: 'Data Structures', time: '10:00 AM', room: 'Lab 1', section: 'CS-A' },
    { id: 2, subject: 'Algorithms', time: '11:30 AM', room: 'Room 302', section: 'CS-B' },
  ];
};

export const getSubjects = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get('/api/subjects', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data.data;
};

export const getStudents = async (subjectId = null) => {
  await delay(600);
  const allStudents = [
    { id: 'STU001', name: 'Alice Smith', rollNo: '101', section: 'CS-A', attendance: 92, performance: 'A' },
    { id: 'STU002', name: 'Bob Johnson', rollNo: '102', section: 'CS-A', attendance: 85, performance: 'B+' },
    { id: 'STU003', name: 'Charlie Brown', rollNo: '103', section: 'CS-B', attendance: 78, performance: 'B' },
    { id: 'STU004', name: 'Diana Prince', rollNo: '104', section: 'CS-B', attendance: 95, performance: 'A+' },
    { id: 'STU005', name: 'Eve Adams', rollNo: '105', section: 'CS-A', attendance: 60, performance: 'C' },
  ];
  return allStudents;
};

export const getAssignments = async () => {
  await delay(500);
  return [
    { id: 1, title: 'Binary Trees Implementation', subject: 'Data Structures', dueDate: '2023-11-15', submissions: 45, total: 60, status: 'Active' },
    { id: 2, title: 'Graph Traversal', subject: 'Algorithms', dueDate: '2023-11-20', submissions: 10, total: 55, status: 'Active' },
    { id: 3, title: 'SQL Joins', subject: 'Database Systems', dueDate: '2023-10-30', submissions: 62, total: 62, status: 'Closed' },
  ];
};

export const getResources = async () => {
  await delay(400);
  return [
    { id: 1, title: 'Week 1 Notes', type: 'PDF', subject: 'Data Structures', uploadDate: '2023-09-01', size: '2.4 MB' },
    { id: 2, title: 'Sorting Algorithms Presentation', type: 'PPT', subject: 'Algorithms', uploadDate: '2023-09-10', size: '5.1 MB' },
    { id: 3, title: 'Normalization Guide', type: 'PDF', subject: 'Database Systems', uploadDate: '2023-09-15', size: '1.8 MB' },
  ];
};

export const getAttendanceAnalytics = async () => {
  await delay(500);
  return [
    { name: 'Week 1', 'CS-A': 95, 'CS-B': 92 },
    { name: 'Week 2', 'CS-A': 92, 'CS-B': 88 },
    { name: 'Week 3', 'CS-A': 88, 'CS-B': 85 },
    { name: 'Week 5', 'CS-A': 85, 'CS-B': 82 },
  ];
};

export const getAnnouncements = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get('/api/announcements', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data.data;
};

export const createAnnouncement = async (data) => {
  const token = localStorage.getItem('token');
  const response = await axios.post('/api/announcements', data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

