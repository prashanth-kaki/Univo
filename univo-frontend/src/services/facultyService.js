
import axios from "axios";

// ======================================
// BASE API CONFIG
// ======================================

const API_URL =
  "http://localhost:5000/api";

const apiClient =
  axios.create({

    baseURL: API_URL,

    headers: {

      "Content-Type":
        "application/json",
    },
  });

// ======================================
// AUTH TOKEN INTERCEPTOR
// ======================================

apiClient.interceptors.request.use(
  (config) => {

    const token =
      localStorage.getItem(
        "token"
      );

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  }
);

// ======================================
// MOCK DELAY
// ======================================

const delay = (ms) =>

  new Promise(resolve =>
    setTimeout(resolve, ms)
  );

// ======================================
// DASHBOARD STATS
// ======================================

export const getDashboardStats = async () => {
  try {
    const response = await apiClient.get('/faculty/dashboard-stats');
    return response.data?.data || null;
  } catch (error) {
    console.error('Failed to fetch dashboard stats', error);
    return null;
  }
};

// ======================================
// UPCOMING CLASSES
// ======================================

export const getUpcomingClasses = async () => {
  try {
    const response = await apiClient.get('/faculty/upcoming-classes');
    return response.data?.data || [];
  } catch (error) {
    console.error('Failed to fetch upcoming classes', error);
    return [];
  }
};

// ======================================
// SUBJECTS
// ======================================

export const getSubjects = async () => {
  try {
    const response = await apiClient.get('/faculty/subjects');
    return response.data?.data || [];
  } catch (error) {
    console.error('Failed to fetch subjects', error);
    return [];
  }
};

// ======================================
// STUDENTS
// ======================================

export const getStudents = async () => {
  try {
    const response = await apiClient.get('/faculty/students');
    return response.data?.data || [];
  } catch (error) {
    console.error('Failed to fetch students', error);
    return [];
  }
};

// ======================================
// ASSIGNMENTS
// ======================================

export const getAssignments = async () => {
  try {
    const response = await apiClient.get("/tasks");
    return response.data?.data || response.data || [];
  } catch (error) {
    console.error("Failed to fetch assignments", error);
    return [];
  }
};

export const createAssignment = async (formData) => {
  // Use multipart/form-data for file upload
  const response = await apiClient.post("/tasks", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const reviewSubmission = async (taskId, studentId, status, reviewNote) => {
  const response = await apiClient.post(`/tasks/${taskId}/review`, {
    studentId,
    status,
    reviewNote
  });
  return response.data;
};

// ======================================
// ATTENDANCE ANALYTICS
// ======================================

export const
  getAttendanceAnalytics =
    async () => {

      await delay(500);

      return [

        {
          name: "Week 1",

          "CS-A": 95,

          "CS-B": 92,
        },

        {
          name: "Week 2",

          "CS-A": 92,

          "CS-B": 88,
        },

        {
          name: "Week 3",

          "CS-A": 88,

          "CS-B": 85,
        },
      ];
    };

// ======================================
// GET FACULTY RESOURCES
// ======================================

export const
  getFacultyResources =
    async () => {

      const response =
        await apiClient.get(

          "/resources/faculty/my-uploads"
        );

      return response.data;
    };

// ======================================
// GET ALL RESOURCES
// ======================================

export const
  getAllResources =
    async () => {

      const response =
        await apiClient.get(
          "/resources"
        );

      return response.data;
    };

// ======================================
// DELETE RESOURCE
// ======================================

export const
  deleteResource =
    async (id) => {

      const response =
        await apiClient.delete(

          `/resources/${id}`
        );

      return response.data;
    };

export const updateAssignment = async (taskId, formData) => {
  const response = await apiClient.put(`/tasks/${taskId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteAssignment = async (taskId) => {
  const response = await apiClient.delete(`/tasks/${taskId}`);
  return response.data;
};

export const createAnnouncement =
  async (formData) => {

    const response =
      await apiClient.post(

        "/announcements",

        formData,

        {
          headers: {

            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data;
  };

export const getAnnouncements =
  async () => {

    const response =
      await apiClient.get(
        "/announcements"
      );

    return response.data.data;
  };

export const updateAnnouncement =
  async (id, formData) => {

    const response =
      await apiClient.put(

        `/announcements/${id}`,

        formData,

        {
          headers: {

            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data;
  };

export const getDiscussions = async (subjectId) => {
  const response = await apiClient.get(`/discussions?subjectId=${subjectId}`);
  return response.data;
};

export const createDiscussion = async (data) => {
  const response = await apiClient.post('/discussions', data);
  return response.data;
};

export const deleteAnnouncement = async (id) => {
  const response = await apiClient.delete(`/announcements/${id}`);
  return response.data;
};
