import api from './api';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getStudentDashboardStats = async () => {
  await delay(500);
  return {
    todaysClasses: 3,
    pendingAssignments: 2,
    attendancePercent: 88,
    unreadAnnouncements: 4,
    bookmarkedResources: 12,
    upcomingDeadlines: 3
  };
};

export const getEnrolledSubjects = async () => {
  try {
    const res = await api.get('/subjects');
    return res.data?.data || res.data || [];
  } catch (error) {
    console.error('Failed to fetch subjects', error);
    return [];
  }
};

export const getStudentAssignments = async () => {
  try {
    const res = await api.get('/tasks');
    return res.data?.data || res.data || [];
  } catch (error) {
    console.error('Failed to fetch assignments', error);
    return [];
  }
};

export const getStudentResources = async () => {
  try {
    const res = await api.get('/resources');
    return res.data?.data || res.data || [];
  } catch (error) {
    console.error('Failed to fetch resources', error);
    return [];
  }
};

export const getStudentAnnouncements = async () => {
  try {
    const res = await api.get('/announcements');
    return res.data?.data || res.data || [];
  } catch (error) {
    console.error('Failed to fetch announcements', error);
    return [];
  }
};

export const getAttendanceAnalytics = async () => {
  await delay(500);
  return {
    trends: [
      { month: 'Jan', 'DBMS': 95, 'OS': 90, 'CN': 80 },
      { month: 'Feb', 'DBMS': 92, 'OS': 85, 'CN': 78 },
      { month: 'Mar', 'DBMS': 94, 'OS': 88, 'CN': 75 },
      { month: 'Apr', 'DBMS': 91, 'OS': 84, 'CN': 76 },
    ],
    overall: 88
  };
};

export const getDiscussions = async () => {
  try {
    const res = await api.get('/discussions');
    return res.data?.data || res.data || [];
  } catch (error) {
    console.error('Failed to fetch discussions', error);
    return [];
  }
};

export const getForumTopics = async () => {
  try {
    const res = await api.get('/forum');
    return res.data?.data || res.data || [];
  } catch (error) {
    console.error('Failed to fetch forum topics', error);
    return [];
  }
};

export const getBookmarks = async () => {
  try {
    const res = await api.get('/bookmarks');
    return res.data?.data || res.data || [];
  } catch (error) {
    console.error('Failed to fetch bookmarks', error);
    return [];
  }
};

// Mutations
export const submitAssignment = async (taskId, formData) => {
  try {
    const res = await api.put(`/tasks/${taskId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return { success: true, data: res.data };
  } catch (error) {
    console.error('Failed to submit assignment', error);
    return { success: false, message: error.response?.data?.message || 'Failed to submit' };
  }
};

export const toggleBookmark = async (resourceId, type) => {
  try {
    const res = await api.post('/bookmarks', { resourceId, type });
    return { success: true, data: res.data };
  } catch (error) {
    console.error('Failed to toggle bookmark', error);
    return { success: false, message: error.message };
  }
};

export const createTask = async (taskData) => {
  try {
    const res = await api.post('/tasks', taskData);
    return { success: true, data: res.data };
  } catch (error) {
    console.error('Failed to create task', error);
    return { success: false, message: error.message };
  }
};

export const createDiscussion = async (discussionData) => {
  try {
    const res = await api.post('/discussions', discussionData);
    return { success: true, data: res.data };
  } catch (error) {
    console.error('Failed to create discussion', error);
    return { success: false, message: error.message };
  }
};

export const createForumPost = async (postData) => {
  try {
    const res = await api.post('/forum', postData);
    return { success: true, data: res.data };
  } catch (error) {
    console.error('Failed to create forum post', error);
    return { success: false, message: error.message };
  }
};

export const updateStudentProfile = async (profileData) => {
  try {
    const res = await api.put('/auth/profile', profileData);
    return { success: true, data: res.data };
  } catch (error) {
    console.error('Failed to update profile', error);
    return { success: false, message: error.message };
  }
};
