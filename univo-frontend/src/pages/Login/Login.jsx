import { useState } from "react";

import {
  FaEnvelope,
  FaLock,
  FaUser,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

const Login = () => {

  const navigate = useNavigate();

  const {
    login,
    register,
  } = useAuth();

  const [isLogin, setIsLogin] =
    useState(true);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",

      // STUDENT ONLY
      role: "student",

      rollNumber: "",
      year: "1",
      semester: "1",
      branch: "CSE",
      section: "A",
      department: "",
    });

  // ======================================
  // HANDLE CHANGE
  // ======================================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  // ======================================
  // SUBMIT
  // ======================================

  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();

    setLoading(true);

    setError("");

    try {

      let response;

      if (isLogin) {

        response =
          await login({
            email:
              formData.email,
            password:
              formData.password,
          });

      } else {

        response =
          await register(
            formData
          );
      }

      if (
        response.success
      ) {

        const role =
          response.user.role;

        // ==================================
        // ROLE BASED REDIRECT
        // ==================================

        if (role === "admin") {
          navigate("/admin/dashboard");
        } else if (role === "faculty") {
          navigate("/faculty/dashboard");
        } else if (role === "hod") {
          navigate("/hod/dashboard");
        } else if (role === "coordinator") {
          navigate("/coordinator/dashboard");
        } else {
          navigate("/student/dashboard");
        }

      } else {

        setError(
          response.message
        );
      }

    } catch (err) {

      console.error(err);

      setError(
        "Something went wrong"
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-purple-100 p-4">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

        {/* HEADER */}

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-slate-900 mb-2">

            Welcome to Univo

          </h1>

          <p className="text-slate-600">

            Centralized Academic Communication Platform

          </p>

        </div>

        {/* TOGGLE */}

        <div className="flex bg-slate-100 rounded-2xl p-1 mb-8">

          <button
            onClick={() =>
              setIsLogin(true)
            }

            className={`flex-1 py-3 rounded-xl font-semibold transition-all ${isLogin
              ? "bg-white shadow text-indigo-600"
              : "text-slate-500"
              }`}
          >

            Sign In

          </button>

          <button
            onClick={() =>
              setIsLogin(false)
            }

            className={`flex-1 py-3 rounded-xl font-semibold transition-all ${!isLogin
              ? "bg-white shadow text-indigo-600"
              : "text-slate-500"
              }`}
          >

            Register

          </button>

        </div>

        {/* ERROR */}

        {error && (

          <div className="mb-4 p-3 rounded-xl bg-red-100 text-red-600 text-sm">

            {error}

          </div>
        )}

        {/* FORM */}

        <form
          onSubmit={
            handleSubmit
          }

          className="space-y-5"
        >

          {/* REGISTER ONLY */}

          {!isLogin && (
            <>

              {/* FULL NAME */}

              <div>

                <label className="block text-sm font-medium text-slate-700 mb-1">

                  Full Name

                </label>

                <div className="relative">

                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">

                    <FaUser className="text-slate-400" />

                  </div>

                  <input
                    type="text"
                    name="name"
                    required

                    placeholder="Enter your Full Name"

                    value={
                      formData.name
                    }

                    onChange={
                      handleChange
                    }

                    className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl bg-slate-50"
                  />

                </div>

              </div>

              {/* ROLL NUMBER */}

              <div>

                <label className="block text-sm font-medium text-slate-700 mb-1">

                  Roll Number

                </label>

                <div className="relative">

                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">

                    <FaUser className="text-slate-400" />

                  </div>

                  <input
                    type="text"
                    name="rollNumber"
                    required

                    placeholder="Enter your Roll number"

                    value={
                      formData.rollNumber
                    }

                    onChange={
                      handleChange
                    }

                    className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl bg-slate-50"
                  />

                </div>

              </div>

              {/* BRANCH */}

              <div>

                <label className="block text-sm font-medium text-slate-700 mb-1">

                  Branch

                </label>

                <select
                  name="branch"

                  value={
                    formData.branch
                  }

                  onChange={
                    handleChange
                  }

                  className="block w-full px-3 py-2.5 border border-slate-200 rounded-xl bg-slate-50"
                >

                  <option value="CSE">
                    CSE
                  </option>

                  <option value="ECE">
                    ECE
                  </option>

                  <option value="EEE">
                    EEE
                  </option>

                  <option value="MECH">
                    MECH
                  </option>

                  <option value="CIVIL">
                    CIVIL
                  </option>

                  <option value="IT">
                    IT
                  </option>

                </select>

              </div>

              {/* YEAR */}

              <div>

                <label className="block text-sm font-medium text-slate-700 mb-1">

                  Year

                </label>

                <select
                  name="year"

                  value={
                    formData.year
                  }

                  onChange={
                    handleChange
                  }

                  className="block w-full px-3 py-2.5 border border-slate-200 rounded-xl bg-slate-50"
                >

                  <option value="1">
                    1st Year
                  </option>

                  <option value="2">
                    2nd Year
                  </option>

                  <option value="3">
                    3rd Year
                  </option>

                  <option value="4">
                    4th Year
                  </option>

                </select>

              </div>

              {/* SEMESTER */}

              <div>

                <label className="block text-sm font-medium text-slate-700 mb-1">

                  Semester

                </label>

                <select
                  name="semester"

                  value={
                    formData.semester
                  }

                  onChange={
                    handleChange
                  }

                  className="block w-full px-3 py-2.5 border border-slate-200 rounded-xl bg-slate-50"
                >

                  <option value="1">
                    Semester 1
                  </option>

                  <option value="2">
                    Semester 2
                  </option>

                </select>

              </div>

              {/* SECTION */}

              <div>

                <label className="block text-sm font-medium text-slate-700 mb-1">

                  Section

                </label>

                <select
                  name="section"

                  value={
                    formData.section
                  }

                  onChange={
                    handleChange
                  }

                  className="block w-full px-3 py-2.5 border border-slate-200 rounded-xl bg-slate-50"
                >

                  <option value="A">
                    A
                  </option>

                  <option value="B">
                    B
                  </option>

                  <option value="C">
                    C
                  </option>

                  <option value="D">
                    D
                  </option>

                </select>

              </div>

            </>
          )}

          {/* EMAIL */}

          <div>

            <label className="block text-sm font-medium text-slate-700 mb-1">

              Email Address

            </label>

            <div className="relative">

              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">

                <FaEnvelope className="text-slate-400" />

              </div>

              <input
                type="email"
                name="email"
                required

                placeholder="you@example.com"

                value={
                  formData.email
                }

                onChange={
                  handleChange
                }

                className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl bg-slate-50"
              />

            </div>

          </div>

          {/* PASSWORD */}

          <div>

            <label className="block text-sm font-medium text-slate-700 mb-1">

              Password

            </label>

            <div className="relative">

              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">

                <FaLock className="text-slate-400" />

              </div>

              <input
                type="password"
                name="password"
                required

                placeholder="••••••••"

                value={
                  formData.password
                }

                onChange={
                  handleChange
                }

                className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl bg-slate-50"
              />

            </div>

          </div>

          {/* BUTTON */}

          <button
            type="submit"

            disabled={loading}

            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-all disabled:opacity-50"
          >

            {loading
              ? "Please wait..."
              : isLogin
                ? "Sign In"
                : "Create Account"}

          </button>

        </form>

      </div>

    </div>
  );
};

export default Login;