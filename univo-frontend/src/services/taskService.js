import api from './api';

export const getTasks = async (params = {}) => {
  const response = await api.get('/tasks', { params });
  return response.data;
};

export const getTaskDetails = async (id) => {
  const response = await api.get(`/tasks/${id}`);
  return response.data;
};

export const assignTask = async (taskData) => {
  const response = await api.post('/tasks', taskData);
  return response.data;
};

export const submitTaskProof = async (id, formData, onUploadProgress) => {
  const response = await api.post(`/tasks/${id}/submit`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress,
  });
  return response.data;
};

export const verifyTaskSubmission = async (taskId, studentId) => {
  const response = await api.put(`/tasks/${taskId}/verify/${studentId}`);
  return response.data;
};

export const getTaskSubmissions = async (id) => {
  const response = await api.get(`/tasks/${id}/submissions`);
  return response.data;
};
