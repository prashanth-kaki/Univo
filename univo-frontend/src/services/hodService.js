import axios from 'axios';

const API_URL =
  'http://localhost:5000/api/hod';

const apiClient =
  axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type':
        'application/json',
    },
  });

// =====================================
// ATTACH TOKEN
// =====================================

apiClient.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem(
        'token'
      );

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  }
);

// =====================================
// DASHBOARD STATS
// =====================================

export const getDepartmentStats =
  async () => {
    try {
      const response =
        await apiClient.get(
          '/stats'
        );

      return response.data.data;
    } catch (
      error
    ) {
      console.error(
        'Stats Error:',
        error
      );

      return null;
    }
  };

// =====================================
// FACULTY LIST
// =====================================

export const getFacultyList =
  async () => {
    try {
      const response =
        await apiClient.get(
          '/faculty'
        );

      return response.data.data;
    } catch (
      error
    ) {
      console.error(
        'Faculty Error:',
        error
      );

      return [];
    }
  };

// =====================================
// CREATE FACULTY
// =====================================

export const createFaculty =
  async (
    facultyData
  ) => {
    try {
      const response =
        await apiClient.post(
          '/faculty',
          facultyData
        );

      return response.data;
    } catch (
      error
    ) {
      console.error(
        'Create Faculty Error:',
        error
      );

      throw error;
    }
  };

// =====================================
// ACTIVITY
// =====================================

export const getDepartmentActivity =
  async () => {
    try {
      const response =
        await apiClient.get(
          '/activity'
        );

      return response.data.data;
    } catch (
      error
    ) {
      console.error(
        'Activity Error:',
        error
      );

      return [];
    }
  };

// =====================================
// ANALYTICS
// =====================================

export const getDepartmentAnalytics =
  async () => {
    try {
      const response =
        await apiClient.get(
          '/analytics'
        );

      return response.data.data;
    } catch (
      error
    ) {
      console.error(
        'Analytics Error:',
        error
      );

      return null;
    }
  };

// =====================================
// ANNOUNCEMENTS
// =====================================

export const getAnnouncements =
  async () => {
    try {
      const response =
        await apiClient.get(
          '/announcements'
        );

      return response.data.data;
    } catch (
      error
    ) {
      console.error(
        'Announcement Error:',
        error
      );

      return [];
    }
  };

export const createAnnouncement =
  async (
    announcementData
  ) => {
    try {
      const response =
        await apiClient.post(
          '/announcements',
          announcementData
        );

      return response.data;
    } catch (
      error
    ) {
      console.error(
        'Create Announcement Error:',
        error
      );

      throw error;
    }
  };

// =====================================
// SUBJECTS
// =====================================

export const getSubjectAllocations =
  async () => {
    try {
      const response =
        await axios.get(
          'http://localhost:5000/api/subjects',
          {
            headers: {
              Authorization:
                `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

      return response.data.data;
    } catch (
      error
    ) {
      console.error(
        'Subject Error:',
        error
      );

      return [];
    }
  };

export const createSubject =
  async (
    subjectData
  ) => {
    try {
      const response =
        await axios.post(
          'http://localhost:5000/api/subjects',
          subjectData,
          {
            headers: {
              Authorization:
                `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

      return response.data;
    } catch (
      error
    ) {
      console.error(
        'Create Subject Error:',
        error
      );

      throw error;
    }
  };

export const getFacultyOptions =
  async () => {
    try {
      const response =
        await apiClient.get(
          '/faculty'
        );

      return response.data.data;
    } catch (
      error
    ) {
      console.error(
        'Faculty Options Error:',
        error
      );

      return [];
    }
  };

// =====================================
// TEMP MODERATION
// =====================================

export const getModerationQueue =
  async () => {
    return [
      {
        id: 1,
        author:
          'Alice Smith',
        content:
          'Can someone share exam questions?',
        type:
          'Forum Post',
        flaggedBy:
          'Automated System',
        reason:
          'Academic Integrity',
        time:
          '2 hours ago',
      },
      {
        id: 2,
        author:
          'Bob Johnson',
        content:
          'Spam content detected',
        type:
          'Comment',
        flaggedBy:
          'Faculty',
        reason:
          'Spam',
        time:
          '5 hours ago',
      },
    ];
  };