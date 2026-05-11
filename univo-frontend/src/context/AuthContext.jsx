import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import axios from 'axios';

// ======================================
// AXIOS CONFIG
// ======================================

axios.defaults.baseURL =
  'http://localhost:5000/api';

// ======================================
// CONTEXT
// ======================================

const AuthContext =
  createContext();

// ======================================
// CUSTOM HOOK
// ======================================

export const useAuth = () =>
  useContext(AuthContext);

// ======================================
// PROVIDER
// ======================================

export const AuthProvider = ({
  children,
}) => {

  // ====================================
  // SAFE LOCAL STORAGE PARSE
  // ====================================

  const getStoredUser = () => {

    try {

      const storedUser =
        localStorage.getItem(
          'user'
        );

      if (
        !storedUser ||
        storedUser ===
        'undefined'
      ) {

        return null;
      }

      return JSON.parse(
        storedUser
      );

    } catch (error) {

      console.error(
        'Invalid user in localStorage'
      );

      localStorage.removeItem(
        'user'
      );

      return null;
    }
  };

  // ====================================
  // STATES
  // ====================================

  const [user, setUser] =
    useState(
      getStoredUser()
    );

  const [token, setToken] =
    useState(
      localStorage.getItem(
        'token'
      ) || null
    );

  const [loading, setLoading] =
    useState(true);

  // ====================================
  // INITIAL AUTH CHECK
  // ====================================

  useEffect(() => {

    const initializeAuth =
      async () => {

        try {

          const storedToken =
            localStorage.getItem(
              'token'
            );

          const storedUser =
            getStoredUser();

          if (
            storedToken &&
            storedUser
          ) {

            setToken(
              storedToken
            );

            setUser(
              storedUser
            );

            // SET AXIOS HEADER

            axios.defaults.headers.common[
              'Authorization'
            ] =
              `Bearer ${storedToken}`;

          } else {

            // CLEAN INVALID STORAGE

            localStorage.removeItem(
              'token'
            );

            localStorage.removeItem(
              'user'
            );

            setToken(null);

            setUser(null);
          }

        } catch (error) {

          console.error(
            'AUTH INIT ERROR:',
            error
          );

          localStorage.clear();

          setToken(null);

          setUser(null);

        } finally {

          setLoading(false);
        }
      };

    initializeAuth();

  }, []);

  // ====================================
  // AUTO UPDATE AXIOS TOKEN
  // ====================================

  useEffect(() => {

    if (token) {

      axios.defaults.headers.common[
        'Authorization'
      ] =
        `Bearer ${token}`;

    } else {

      delete axios.defaults
        .headers.common[
        'Authorization'
      ];
    }

  }, [token]);

  // ====================================
  // REGISTER
  // ====================================

  const register =
    async (formData) => {

      try {

        setLoading(true);

        const response =
          await axios.post(
            '/auth/register',
            formData
          );

        return {
          success: true,
          data:
            response.data,
        };

      } catch (error) {

        console.error(
          'REGISTER ERROR:',
          error
        );

        return {
          success: false,

          message:
            error.response?.data
              ?.message ||
            'Registration failed',
        };

      } finally {

        setLoading(false);
      }
    };

  // ====================================
  // LOGIN
  // ====================================

  const login =
    async (formData) => {

      try {

        setLoading(true);

        const response =
          await axios.post(
            '/auth/login',
            formData
          );

        const data =
          response.data;

        // CLEAR OLD SESSION FIRST

        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // SAVE NEW SESSION

        localStorage.setItem(
          'token',
          data.token
        );

        localStorage.setItem(
          'user',
          JSON.stringify(data.user)
        );

        // UPDATE STATE

        setToken(data.token);

        setUser(data.user);

        // UPDATE AXIOS HEADER

        axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${data.token}`;

        // UPDATE STATES

        setToken(
          data.token
        );

        setUser(
          data.user
        );

        // SET AXIOS TOKEN

        axios.defaults.headers.common[
          'Authorization'
        ] =
          `Bearer ${data.token}`;

        return {
          success: true,
          user:
            data.user,
        };

      } catch (error) {

        console.error(
          'LOGIN ERROR:',
          error
        );

        return {
          success: false,

          message:
            error.response?.data
              ?.message ||
            'Login failed',
        };

      } finally {

        setLoading(false);
      }
    };

  // ====================================
  // LOGOUT
  // ====================================

  const logout = () => {

    // REMOVE STORAGE

    localStorage.removeItem(
      'token'
    );

    localStorage.removeItem(
      'user'
    );

    // REMOVE AXIOS HEADER

    delete axios.defaults
      .headers.common[
      'Authorization'
    ];

    // RESET STATE

    setUser(null);

    setToken(null);
  };

  // ====================================
  // ROLE HELPERS
  // ====================================

  const isStudent =
    user?.role ===
    'student';

  const isFaculty =
    user?.role ===
    'faculty';

  const isHOD =
    user?.role ===
    'hod';

  const isCoordinator =
    user?.role ===
    'coordinator';

  const isAdmin =
    user?.role ===
    'admin';

  // ====================================
  // CONTEXT VALUE
  // ====================================

  const value = {

    // STATE

    user,
    token,
    loading,

    // AUTH

    register,
    login,
    logout,

    // HELPERS

    isAuthenticated:
      !!token,

    isStudent,
    isFaculty,
    isHOD,
    isCoordinator,
    isAdmin,
  };

  // ====================================
  // LOADING SCREEN
  // ====================================

  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">

        <div className="flex flex-col items-center gap-4">

          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />

          <h1 className="text-xl font-semibold text-slate-700">
            Loading Univo...
          </h1>

        </div>
      </div>
    );
  }

  // ====================================
  // RETURN
  // ====================================

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;