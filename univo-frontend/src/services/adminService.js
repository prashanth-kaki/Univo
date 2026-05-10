import api from './api';

// ======================================
// GET ALL USERS
// ======================================

export const getAllUsers =
  async (params = {}) => {

    const response =
      await api.get(
        '/admin/users',
        {
          params,
        }
      );

    return response.data;
  };

// ======================================
// CREATE USER
// ======================================

export const createUser =
  async (userData) => {

    const response =
      await api.post(
        '/admin/create-user',
        userData
      );

    return response.data;
  };

// ======================================
// TOGGLE USER STATUS
// ======================================

export const toggleUserStatus =
  async (id) => {

    const response =
      await api.put(
        `/admin/users/${id}/toggle`
      );

    return response.data;
  };

// ======================================
// DELETE USER
// ======================================

export const deleteUser =
  async (id) => {

    const response =
      await api.delete(
        `/admin/users/${id}`
      );

    return response.data;
  };

// ======================================
// UPDATE USER ROLE
// ======================================

export const updateUserRole =
  async (
    id,
    role
  ) => {

    const response =
      await api.put(
        `/admin/users/${id}/role`,
        { role }
      );

    return response.data;
  };

// ======================================
// GET USER ANALYTICS
// ======================================

export const getUserAnalytics =
  async () => {

    const response =
      await api.get(
        '/admin/user-analytics'
      );

    return response.data;
  };