import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import axios from "axios";

// ======================================
// AXIOS BASE URL
// ======================================

axios.defaults.baseURL =
  "http://localhost:5000/api";

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
  // SAFE LOCAL STORAGE
  // ====================================

  const getStoredUser = () => {

    try {

      const storedUser =
        localStorage.getItem(
          "user"
        );

      if (
        !storedUser ||
        storedUser ===
        "undefined"
      ) {

        return null;
      }

      return JSON.parse(
        storedUser
      );

    } catch (error) {

      console.error(
        "Invalid user in localStorage"
      );

      localStorage.removeItem(
        "user"
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
        "token"
      ) || null
    );

  const [loading, setLoading] =
    useState(false);

  // ====================================
  // AXIOS TOKEN
  // ====================================

  useEffect(() => {

    if (token) {

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

    } else {

      delete axios.defaults.headers
        .common[
        "Authorization"
      ];
    }

  }, [token]);

  // ====================================
  // REGISTER
  // ====================================

  const register = async (
    formData
  ) => {

    try {

      setLoading(true);

      // FORCE STUDENT ROLE
      // SECURITY

      const payload = {
        ...formData,
        role: "student",
      };

      const response =
        await axios.post(
          "/auth/register",
          payload
        );

      const data =
        response.data;

      // ================================
      // STORE TOKEN
      // ================================

      localStorage.setItem(
        "token",
        data.token
      );

      // ================================
      // STORE USER
      // ================================

      localStorage.setItem(
        "user",
        JSON.stringify(
          data.data
        )
      );

      // ================================
      // STATE
      // ================================

      setToken(
        data.token
      );

      setUser(
        data.data
      );

      return {
        success: true,
        user:
          data.data,
      };

    } catch (error) {

      console.error(
        "REGISTER ERROR:",
        error
      );

      return {
        success: false,

        message:
          error.response?.data
            ?.message ||
          "Registration failed",
      };

    } finally {

      setLoading(false);
    }
  };

  // ====================================
  // LOGIN
  // ====================================

  const login = async (
    formData
  ) => {

    try {

      setLoading(true);

      const response =
        await axios.post(
          "/auth/login",
          formData
        );

      const data =
        response.data;

      // ================================
      // STORE TOKEN
      // ================================

      localStorage.setItem(
        "token",
        data.token
      );

      // ================================
      // STORE USER
      // ================================

      localStorage.setItem(
        "user",
        JSON.stringify(
          data.data
        )
      );

      // ================================
      // STATE
      // ================================

      setToken(
        data.token
      );

      setUser(
        data.data
      );

      return {
        success: true,
        user:
          data.data,
      };

    } catch (error) {

      console.error(
        "LOGIN ERROR:",
        error
      );

      return {
        success: false,

        message:
          error.response?.data
            ?.message ||
          "Login failed",
      };

    } finally {

      setLoading(false);
    }
  };

  // ====================================
  // LOGOUT
  // ====================================

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    setUser(null);

    setToken(null);
  };

  // ====================================
  // ROLE HELPERS
  // ====================================

  const isStudent =
    user?.role ===
    "student";

  const isFaculty =
    user?.role ===
    "faculty";

  const isHOD =
    user?.role ===
    "hod";

  const isCoordinator =
    user?.role ===
    "coordinator";

  const isAdmin =
    user?.role ===
    "admin";

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