import api from './api';

export const getAllUsers = async (params = {}) => {
  const response = await api.get('/admin/users', { params });
  return response.data;
};

export const toggleUserStatus = async (id) => {
  const response = await api.put(`/users/${id}/toggle`);
  return response.data;
};
