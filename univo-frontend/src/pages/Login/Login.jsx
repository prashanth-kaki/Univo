import { useState } from 'react';

import {
  useNavigate,
} from 'react-router-dom';

import axios from 'axios';

import toast from 'react-hot-toast';

import { useAuth } from '../../context/AuthContext';

const API =
  'http://localhost:5000/api/auth';

const Login = () => {
  const navigate =
    useNavigate();

  const { login } =
    useAuth();

  const [isLogin, setIsLogin] =
    useState(true);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState('');

  // =====================================
  // FORGOT PASSWORD
  // =====================================

  const [
    isForgotPassword,
    setIsForgotPassword,
  ] = useState(false);

  const [otpSent, setOtpSent] =
    useState(false);

  const [otp, setOtp] =
    useState('');

  const [
    otpVerified,
    setOtpVerified,
  ] = useState(false);

  const [
    newPassword,
    setNewPassword,
  ] = useState('');

  const [
    confirmNewPassword,
    setConfirmNewPassword,
  ] = useState('');

  // =====================================
  // REGISTER OTP
  // =====================================

  const [
    registerOtpSent,
    setRegisterOtpSent,
  ] = useState(false);

  const [
    registerOtp,
    setRegisterOtp,
  ] = useState('');

  // =====================================
  // FORM DATA
  // =====================================

  const [formData, setFormData] =
    useState({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'student',
      rollNumber: '',
      year: '1',
      semester: '1',
      branch: 'CSE',
      section: 'A',
      department: '',
    });

  // =====================================
  // HANDLE INPUT
  // =====================================

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  // =====================================
  // EMAIL VALIDATION
  // =====================================

  const validateEmail = (
    email
  ) => {
    const regex =
      /^[a-zA-Z0-9._%+-]+@(gmail\.com|acoe\.edu\.in|acet\.edu\.in|aec\.edu\.in|univo\.com)$/;

    return regex.test(email);
  };

  // =====================================
  // FORGOT PASSWORD
  // =====================================

  const handleForgotPassword =
    async (e) => {

      e.preventDefault();

      setError('');

      try {

        setLoading(true);

        // =====================================
        // SEND OTP
        // =====================================

        if (!otpSent) {

          const response =
            await axios.post(
              `${API}/forgot-password-otp`,
              {
                email:
                  formData.email,
              }
            );

          if (
            response.data.success
          ) {

            setOtpSent(true);

            toast.success(
              'OTP sent successfully'
            );
          }

          return;
        }

        // =====================================
        // RESET PASSWORD
        // =====================================

        if (otpVerified) {

          if (
            newPassword !==
            confirmNewPassword
          ) {

            toast.error(
              'Passwords do not match'
            );

            return;
          }

          const response =
            await axios.post(
              `${API}/reset-password`,
              {
                email:
                  formData.email,

                otp,

                password:
                  newPassword,
              }
            );

          if (
            response.data.success
          ) {

            toast.success(
              'Password reset successful'
            );

            // RESET STATES

            setOtp('');

            setOtpSent(false);

            setOtpVerified(false);

            setNewPassword('');

            setConfirmNewPassword('');

            setIsForgotPassword(
              false
            );

            setIsLogin(true);
          }

          return;
        }

        // =====================================
        // VERIFY OTP
        // =====================================

        const verifyResponse =
          await axios.post(
            `${API}/verify-otp`,
            {
              email:
                formData.email,

              otp,
            }
          );

        if (
          verifyResponse.data
            .success
        ) {

          setOtpVerified(true);

          toast.success(
            'OTP verified successfully'
          );
        }

      } catch (error) {

        console.error(error);

        toast.error(
          error?.response?.data
            ?.message ||
          'Something went wrong'
        );

      } finally {

        setLoading(false);
      }
    };

  // =====================================
  // SUBMIT
  // =====================================

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      setError('');

      if (
        !validateEmail(
          formData.email
        )
      ) {

        toast.error(
          'Please enter valid email'
        );

        return;
      }

      try {

        setLoading(true);

        // =====================================
        // REGISTER FLOW
        // =====================================

        if (!isLogin) {

          // PASSWORD CHECK

          if (
            formData.password !==
            formData.confirmPassword
          ) {

            toast.error(
              'Passwords do not match'
            );

            return;
          }

          // SEND OTP

          if (
            !registerOtpSent
          ) {

            const otpResponse =
              await axios.post(
                `${API}/send-register-otp`,
                {
                  email:
                    formData.email,
                }
              );

            if (
              otpResponse.data
                .success
            ) {

              setRegisterOtpSent(
                true
              );

              toast.success(
                'OTP sent successfully'
              );
            }

            return;
          }

          // VERIFY OTP

          const verifyResponse =
            await axios.post(
              `${API}/verify-otp`,
              {
                email:
                  formData.email,

                otp: registerOtp,
              }
            );

          if (
            !verifyResponse.data
              .success
          ) {

            toast.error(
              'Invalid OTP'
            );

            return;
          }

          // REGISTER USER

          const response =
            await axios.post(
              `${API}/register`,
              {
                name:
                  formData.name,

                email:
                  formData.email,

                password:
                  formData.password,

                role:
                  formData.role,

                rollNumber:
                  formData.rollNumber,

                year:
                  formData.year,

                semester:
                  formData.semester,

                branch:
                  formData.branch,

                section:
                  formData.section,

                department:
                  formData.department,
              }
            );

          if (
            response.data.success
          ) {

            toast.success(
              'Registration successful. Please login.'
            );

            // RESET FORM

            setFormData({
              name: '',
              email: '',
              password: '',
              confirmPassword:
                '',
              role: 'student',
              rollNumber: '',
              year: '1',
              semester: '1',
              branch: 'CSE',
              section: 'A',
              department: '',
            });

            setRegisterOtp(
              ''
            );

            setRegisterOtpSent(
              false
            );

            // SWITCH TO LOGIN

            setIsLogin(true);
          }

          return;
        }

        // =====================================
        // LOGIN FLOW
        // =====================================

        const response =
          await login({
            email:
              formData.email,

            password:
              formData.password,
          });

        if (
          response.success
        ) {

          toast.success(
            'Login successful'
          );

          const role =
            response.user
              ?.role ||
            'student';

          // ROLE ROUTING

          if (
            role ===
            'admin'
          ) {

            navigate(
              '/admin/dashboard'
            );

          } else if (
            role ===
            'faculty'
          ) {

            navigate(
              '/faculty/dashboard'
            );

          } else if (
            role ===
            'hod'
          ) {

            navigate(
              '/hod/dashboard'
            );

          } else if (
            role ===
            'coordinator'
          ) {

            navigate(
              '/coordinator/dashboard'
            );

          } else {

            navigate(
              '/student/dashboard'
            );
          }
        }

      } catch (error) {

        console.error(error);

        toast.error(
          error?.response?.data
            ?.message ||
          'Something went wrong'
        );

      } finally {

        setLoading(false);
      }
    };

  // =====================================
  // FORGOT PASSWORD SCREEN
  // =====================================

  if (isForgotPassword) {

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-purple-100 p-4">

        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

          <h1 className="text-3xl font-bold text-center mb-6">
            Reset Password
          </h1>

          <form
            onSubmit={
              handleForgotPassword
            }
            className="space-y-5"
          >

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={
                formData.email
              }
              onChange={
                handleChange
              }
              className="w-full px-4 py-3 rounded-xl border"
            />

            {/* OTP */}

            {otpSent && (
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) =>
                  setOtp(
                    e.target.value
                  )
                }
                className="w-full px-4 py-3 rounded-xl border"
              />
            )}

            {/* NEW PASSWORD */}

            {otpVerified && (
              <>
                <input
                  type="password"
                  placeholder="New Password"
                  value={
                    newPassword
                  }
                  onChange={(e) =>
                    setNewPassword(
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-3 rounded-xl border"
                />

                <input
                  type="password"
                  placeholder="Confirm New Password"
                  value={
                    confirmNewPassword
                  }
                  onChange={(e) =>
                    setConfirmNewPassword(
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-3 rounded-xl border"
                />
              </>
            )}

            {/* BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl"
            >
              {loading
                ? 'Please wait...'
                : otpVerified
                  ? 'Reset Password'
                  : otpSent
                    ? 'Verify OTP'
                    : 'Send OTP'}
            </button>

            {/* BACK */}

            <button
              type="button"
              onClick={() => {

                setIsForgotPassword(
                  false
                );

                setOtp('');

                setOtpSent(false);

                setOtpVerified(
                  false
                );

                setNewPassword(
                  ''
                );

                setConfirmNewPassword(
                  ''
                );
              }}
              className="w-full text-indigo-600"
            >
              Back to Login
            </button>

          </form>
        </div>
      </div>
    );
  }

  // =====================================
  // MAIN AUTH SCREEN
  // =====================================

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-purple-100 p-4">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold">
            Welcome to Univo
          </h1>

          <p className="text-slate-600 mt-2">
            Academic Platform
          </p>

        </div>

        {/* TOGGLE */}

        <div className="flex bg-slate-100 rounded-2xl p-1 mb-8">

          <button
            type="button"
            onClick={() => {

              setIsLogin(true);

              setRegisterOtpSent(
                false
              );
            }}
            className={`flex-1 py-3 rounded-xl font-semibold ${isLogin
              ? 'bg-white shadow text-indigo-600'
              : 'text-slate-500'
              }`}
          >
            Sign In
          </button>

          <button
            type="button"
            onClick={() => {

              setIsLogin(false);

              setRegisterOtpSent(
                false
              );
            }}
            className={`flex-1 py-3 rounded-xl font-semibold ${!isLogin
              ? 'bg-white shadow text-indigo-600'
              : 'text-slate-500'
              }`}
          >
            Register
          </button>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* REGISTER */}

          {!isLogin && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={
                  formData.name
                }
                onChange={
                  handleChange
                }
                disabled={
                  registerOtpSent
                }
                className="w-full px-4 py-3 rounded-xl border"
              />

              <input
                type="text"
                name="rollNumber"
                placeholder="Roll Number"
                value={
                  formData.rollNumber
                }
                onChange={
                  handleChange
                }
                disabled={
                  registerOtpSent
                }
                className="w-full px-4 py-3 rounded-xl border"
              />
            </>
          )}

          {/* EMAIL */}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            disabled={
              registerOtpSent
            }
            className="w-full px-4 py-3 rounded-xl border"
          />

          {/* PASSWORD */}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={
              formData.password
            }
            onChange={
              handleChange
            }
            disabled={
              registerOtpSent
            }
            className="w-full px-4 py-3 rounded-xl border"
          />

          {/* CONFIRM PASSWORD */}

          {!isLogin && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={
                formData.confirmPassword
              }
              onChange={
                handleChange
              }
              disabled={
                registerOtpSent
              }
              className="w-full px-4 py-3 rounded-xl border"
            />
          )}

          {/* OTP */}

          {!isLogin &&
            registerOtpSent && (
              <input
                type="text"
                placeholder="Enter OTP"
                value={
                  registerOtp
                }
                onChange={(e) =>
                  setRegisterOtp(
                    e.target.value
                  )
                }
                maxLength={6}
                className="w-full px-4 py-3 rounded-xl border text-center tracking-widest"
              />
            )}

          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl"
          >
            {loading
              ? 'Please wait...'
              : isLogin
                ? 'Sign In'
                : registerOtpSent
                  ? 'Verify OTP & Register'
                  : 'Send Registration OTP'}
          </button>

          {/* FORGOT PASSWORD */}

          {isLogin && (
            <div className="text-center">

              <button
                type="button"
                onClick={() =>
                  setIsForgotPassword(
                    true
                  )
                }
                className="text-indigo-600 text-sm"
              >
                Forgot Password?
              </button>

            </div>
          )}

        </form>

      </div>
    </div>
  );
};

export default Login;