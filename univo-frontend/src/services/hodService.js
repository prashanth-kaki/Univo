import axios from 'axios';

const API_URL = 'http://localhost:5000/api/hod';

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

export const getDepartmentStats = async () => {
  const response = await apiClient.get('/dashboard-stats');
  return response.data.data;
};

export const getDepartmentActivity = async () => {
  const response = await apiClient.get('/dashboard-activity');
  return response.data.data;
};

// FACULTY
export const getFacultyList = async () => {
  const response = await apiClient.get('/faculty');
  return response.data.data;
};

export const createFaculty = async (facultyData) => {
  const response = await apiClient.post('/faculty', facultyData);
  return response.data.data;
};

export const updateFaculty = async (id, facultyData) => {
  const response = await apiClient.put(`/faculty/${id}`, facultyData);
  return response.data.data;
};

export const deleteFaculty = async (id) => {
  const response = await apiClient.delete(`/faculty/${id}`);
  return response.data;
};

export const updateFacultyStatus = async (id, isActive) => {
  const response = await apiClient.patch(`/faculty/${id}`, { isActive });
  return response.data.data;
};

// STUDENTS
export const getStudentList = async (params) => {
  const response = await apiClient.get('/students', { params });
  return response.data.data;
};

// SUBJECTS
export const getSubjectAllocations = async () => {
  const response = await apiClient.get('/subjects');
  return response.data.data;
};

export const createSubject = async (subjectData) => {
  const response = await apiClient.post('/subjects', subjectData);
  return response.data.data;
};

export const updateSubject = async (id, subjectData) => {
  const response = await apiClient.put(`/subjects/${id}`, subjectData);
  return response.data.data;
};

export const deleteSubject = async (id) => {
  const response = await apiClient.delete(`/subjects/${id}`);
  return response.data;
};

// RESOURCES
export const getResources = async () => {
  const response = await apiClient.get('/resources');
  return response.data.data;
};

export const updateResourceStatus = async (id, status) => {
  const response = await apiClient.patch(`/resources/${id}/status`, { status });
  return response.data.data;
};

export const deleteResource = async (id) => {
  const response = await apiClient.delete(`/resources/${id}`);
  return response.data;
};

// ANNOUNCEMENTS
export const getAnnouncements = async () => {
  const response = await apiClient.get('/announcements');
  return response.data.data;
};

export const createAnnouncement = async (announcementData) => {
  const response = await apiClient.post('/announcements', announcementData);
  return response.data.data;
};

export const deleteAnnouncement = async (id) => {
  const response = await apiClient.delete(`/announcements/${id}`);
  return response.data;
};

// MODERATION
export const getModerationQueue = async () => {
  const response = await apiClient.get('/moderation');
  return response.data.data;
};

export const resolveReport = async (id) => {
  const response = await apiClient.patch(`/moderation/${id}`);
  return response.data;
};

// ANALYTICS & LOGS
export const getDepartmentAnalytics = async () => {
  const response = await apiClient.get('/analytics');
  return response.data.data;
};

export const getActivityLogs = async () => {
  const response = await apiClient.get('/activity');
  return response.data.data;
};

// SETTINGS
export const getSettings = async () => {
  const response = await apiClient.get('/settings');
  return response.data.data;
};

export const updateSettings = async (settingsData) => {
  const response = await apiClient.put('/settings', settingsData);
  return response.data.data;
};
