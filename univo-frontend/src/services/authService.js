import api from './api';

// =========================
// LOGIN
// =========================
export const loginUser = async (credentials) => {

  const response = await api.post(
    '/auth/login',
    credentials
  );

  const data = response.data;

  if (data.token) {
    localStorage.setItem(
      'token',
      data.token
    );

    localStorage.setItem(
      'user',
      JSON.stringify(data.user)
    );
  }

  return data;
};

// =========================
// REGISTER
// =========================
export const registerUser = async (userData) => {

  const response = await api.post(
    '/auth/register',
    userData
  );

  const data = response.data;

  if (data.token) {
    localStorage.setItem(
      'token',
      data.token
    );

    localStorage.setItem(
      'user',
      JSON.stringify(data.user)
    );
  }

  return data;
};

// =========================
// GET CURRENT USER
// =========================
export const getMe = async () => {

  const response = await api.get(
    '/auth/me'
  );

  return response.data;
};

// =========================
// LOGOUT
// =========================
export const logoutUser = () => {

  localStorage.removeItem('token');

  localStorage.removeItem('user');

  window.location.href = '/login';
};

// =========================
// TOKEN HELPERS
// =========================
export const getToken = () => {
  return localStorage.getItem('token');
};

export const getStoredUser = () => {

  const user =
    localStorage.getItem('user');

  return user
    ? JSON.parse(user)
    : null;
};

// =========================
// AUTH CHECK
// =========================
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};