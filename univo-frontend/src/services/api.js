import axios from 'axios';

const API_BASE_URL =
  'http://localhost:5000/api';

// ======================================
// AXIOS INSTANCE
// ======================================

const api = axios.create({
  baseURL:
    API_BASE_URL,

  headers: {
    'Content-Type':
      'application/json',
  },

  withCredentials:
    true,
});

// ======================================
// REQUEST INTERCEPTOR
// ======================================

api.interceptors.request.use(

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
  },

  (error) => {

    return Promise.reject(
      error
    );
  }
);

// ======================================
// RESPONSE INTERCEPTOR
// ======================================

api.interceptors.response.use(

  (response) =>
    response,

  (error) => {

    // TOKEN EXPIRED

    if (
      error.response
        ?.status ===
      401
    ) {

      localStorage.removeItem(
        'token'
      );

      localStorage.removeItem(
        'user'
      );

      // REDIRECT TO LOGIN

      if (
        window.location.pathname !==
        '/login'
      ) {

        window.location.href =
          '/login';
      }
    }

    return Promise.reject(
      error
    );
  }
);

// ======================================
// AUTH APIS
// ======================================

export const authAPI = {

  login: (data) =>
    api.post(
      '/auth/login',
      data
    ),

  register: (data) =>
    api.post(
      '/auth/register',
      data
    ),

  sendRegisterOTP: (
    data
  ) =>
    api.post(
      '/auth/send-register-otp',
      data
    ),

  verifyOTP: (data) =>
    api.post(
      '/auth/verify-otp',
      data
    ),

  forgotPasswordOTP: (
    data
  ) =>
    api.post(
      '/auth/forgot-password-otp',
      data
    ),

  resetPassword: (
    data
  ) =>
    api.post(
      '/auth/reset-password',
      data
    ),

  getCurrentUser: () =>
    api.get('/auth/me'),

  logout: () =>
    api.post(
      '/auth/logout'
    ),
};

// ======================================
// ADMIN APIS
// ======================================

export const adminAPI = {

  getUsers: (
    params = {}
  ) =>
    api.get(
      '/admin/users',
      { params }
    ),

  createUser: (
    data
  ) =>
    api.post(
      '/admin/create-user',
      data
    ),

  updateUserRole: (
    id,
    role
  ) =>
    api.put(
      `/admin/users/${id}/role`,
      { role }
    ),

  toggleUserStatus: (
    id
  ) =>
    api.put(
      `/admin/users/${id}/toggle`
    ),

  deleteUser: (
    id
  ) =>
    api.delete(
      `/admin/users/${id}`
    ),

  getAnalytics: () =>
    api.get(
      '/admin/user-analytics'
    ),
};

// ======================================
// USER APIS
// ======================================

export const userAPI = {

  updateProfile: (
    data
  ) =>
    api.put(
      '/auth/profile',
      data
    ),

  changePassword: (
    data
  ) =>
    api.put(
      '/auth/change-password',
      data
    ),
};

// ======================================
// EXPORT DEFAULT
// ======================================

export default api;