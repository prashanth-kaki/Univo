import React, {
  useState,
  useMemo,
  useEffect,
} from 'react';

import UserTable from '../../components/admin/tables/UserTable';

import {
  Search,
  Filter,
  Plus,
  Download,
  X,
} from 'lucide-react';

import toast from 'react-hot-toast';

import axios from 'axios';

const API =
  'http://localhost:5000/api/admin';

const AdminUsers = () => {

  // ======================================
  // STATES
  // ======================================

  const [users, setUsers] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [searchTerm, setSearchTerm] =
    useState('');

  const [roleFilter, setRoleFilter] =
    useState('');

  const [
    statusFilter,
    setStatusFilter,
  ] = useState('');

  const [deptFilter, setDeptFilter] =
    useState('');

  const [
    currentPage,
    setCurrentPage,
  ] = useState(1);

  const usersPerPage = 5;

  const [
    showAddModal,
    setShowAddModal,
  ] = useState(false);

  const [newUser, setNewUser] =
    useState({
      name: '',
      email: '',
      password: '',
      role: 'student',
      branch: 'CSE',
      year: 1,
      section: 'A',
      semester: 1,
      rollNumber: '',
    });

  // ======================================
  // FETCH USERS
  // ======================================

  const fetchUsers =
    async () => {

      try {

        setLoading(true);

        const token =
          localStorage.getItem(
            'token'
          );

        const response =
          await axios.get(
            `${API}/users`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        setUsers(
          response.data.data || []
        );

      } catch (error) {

        console.error(error);

        toast.error(
          'Failed to fetch users'
        );

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {

    fetchUsers();

  }, []);

  // ======================================
  // EXPORT USERS
  // ======================================

  const handleExport = () => {

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'ID,Name,Email,Role,Branch,Status\n' +
      filteredUsers
        .map(
          (u) =>
            `${u._id},${u.name},${u.email},${u.role},${u.branch},${u.isActive}`
        )
        .join('\n');

    const encodedUri =
      encodeURI(csvContent);

    const link =
      document.createElement(
        'a'
      );

    link.setAttribute(
      'href',
      encodedUri
    );

    link.setAttribute(
      'download',
      'univo_users.csv'
    );

    document.body.appendChild(
      link
    );

    link.click();

    document.body.removeChild(
      link
    );

    toast.success(
      'Users exported successfully'
    );
  };

  // ======================================
  // CREATE USER
  // ======================================

  const handleAddUserSubmit =
    async (e) => {

      e.preventDefault();

      console.log(
        'FORM SUBMITTED'
      );

      console.log(newUser);

      try {

        if (
          !newUser.name ||
          !newUser.email ||
          !newUser.password
        ) {

          toast.error(
            'Please fill all required fields'
          );

          return;
        }

        setLoading(true);

        const token =
          localStorage.getItem(
            'token'
          );

        const response =
          await axios.post(
            `${API}/create-user`,
            newUser,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        console.log(
          response.data
        );

        if (
          response.data.success
        ) {

          toast.success(
            'User created successfully'
          );

          setShowAddModal(
            false
          );

          setNewUser({
            name: '',
            email: '',
            password: '',
            role: 'student',
            branch: 'CSE',
            year: 1,
            section: 'A',
            semester: 1,
            rollNumber: '',
          });

          fetchUsers();
        }

      } catch (error) {

        console.error(error);

        toast.error(
          error?.response?.data
            ?.message ||
          'Failed to create user'
        );

      } finally {

        setLoading(false);
      }
    };

  // ======================================
  // EDIT ROLE
  // ======================================

  const handleEditRole =
    async (user) => {

      const newRole = prompt(
        'Enter new role:',
        user.role
      );

      if (!newRole) return;

      try {

        const token =
          localStorage.getItem(
            'token'
          );

        await axios.patch(
          `${API}/users/${user._id}/role`,
          {
            role: newRole,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success(
          'Role updated successfully'
        );

        fetchUsers();

      } catch (error) {

        console.error(error);

        toast.error(
          error?.response?.data
            ?.message ||
          'Failed to update role'
        );
      }
    };

  // ======================================
  // BAN USER
  // ======================================

  const handleBanUser =
    async (user) => {

      const confirmBan =
        window.confirm(
          `${user.isActive
            ? 'Ban'
            : 'Unban'} ${user.name}?`
        );

      if (!confirmBan) return;

      try {

        const token =
          localStorage.getItem(
            'token'
          );

        await axios.patch(
          `${API}/users/${user._id}/ban`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success(
          `${user.name} updated successfully`
        );

        fetchUsers();

      } catch (error) {

        console.error(error);

        toast.error(
          error?.response?.data
            ?.message ||
          'Failed to update user'
        );
      }
    };

  // ======================================
  // DELETE USER
  // ======================================

  const handleDeleteUser =
    async (user) => {

      const confirmDelete =
        window.confirm(
          `Delete ${user.name}?`
        );

      if (!confirmDelete) return;

      try {

        const token =
          localStorage.getItem(
            'token'
          );

        await axios.delete(
          `${API}/users/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success(
          'User deleted successfully'
        );

        fetchUsers();

      } catch (error) {

        console.error(error);

        toast.error(
          error?.response?.data
            ?.message ||
          'Failed to delete user'
        );
      }
    };

  // ======================================
  // FILTER USERS
  // ======================================

  const filteredUsers =
    useMemo(() => {

      return users.filter(
        (user) => {

          const matchesSearch =
            user.name
              ?.toLowerCase()
              .includes(
                searchTerm.toLowerCase()
              ) ||

            user.email
              ?.toLowerCase()
              .includes(
                searchTerm.toLowerCase()
              );

          const matchesRole =
            roleFilter
              ? user.role ===
              roleFilter
              : true;

          const matchesStatus =
            statusFilter
              ? String(
                user.isActive
              ) ===
              statusFilter
              : true;

          const matchesDept =
            deptFilter
              ? user.branch ===
              deptFilter
              : true;

          return (
            matchesSearch &&
            matchesRole &&
            matchesStatus &&
            matchesDept
          );
        }
      );

    }, [
      users,
      searchTerm,
      roleFilter,
      statusFilter,
      deptFilter,
    ]);

  // ======================================
  // PAGINATION
  // ======================================

  const indexOfLastUser =
    currentPage *
    usersPerPage;

  const indexOfFirstUser =
    indexOfLastUser -
    usersPerPage;

  const currentUsers =
    filteredUsers.slice(
      indexOfFirstUser,
      indexOfLastUser
    );

  return (
    <div className="flex flex-col gap-6 relative">

      {/* HEADER */}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

        <div>

          <h1 className="text-2xl font-bold text-slate-800">
            User Management
          </h1>

          <p className="text-slate-500 mt-1">
            Manage accounts,
            roles, and permissions
            across the platform.
          </p>

        </div>

        <div className="flex items-center gap-3">

          <button
            onClick={
              handleExport
            }
            className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg"
          >
            <Download size={18} />
            Export
          </button>

          <button
            onClick={() =>
              setShowAddModal(
                true
              )
            }
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg"
          >
            <Plus size={18} />
            Add User
          </button>

        </div>
      </div>

      {/* TABLE */}

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">

        {/* FILTERS */}

        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between">

          <div className="relative w-full sm:max-w-md">

            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              placeholder="Search users..."
              value={
                searchTerm
              }
              onChange={(e) =>
                setSearchTerm(
                  e.target.value
                )
              }
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg"
            />

          </div>

          <div className="flex items-center gap-3">

            <select
              value={
                roleFilter
              }
              onChange={(e) =>
                setRoleFilter(
                  e.target.value
                )
              }
              className="border border-slate-200 rounded-lg px-3 py-2"
            >
              <option value="">
                All Roles
              </option>

              <option value="hod">
                HOD
              </option>

              <option value="faculty">
                Faculty
              </option>

              <option value="coordinator">
                Coordinator
              </option>

              <option value="student">
                Student
              </option>

            </select>

            <button className="p-2 border border-slate-200 rounded-lg">
              <Filter size={18} />
            </button>

          </div>
        </div>

        {/* USER TABLE */}

        <UserTable
          users={currentUsers}
          onEditRole={handleEditRole}
          onBanUser={handleBanUser}
          onDeleteUser={handleDeleteUser}
        />

      </div>

      {/* ADD USER MODAL */}

      {showAddModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">

          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">

            <div className="flex items-center justify-between p-5 border-b border-slate-100">

              <h2 className="text-lg font-bold">
                Add New User
              </h2>

              <button
                onClick={() =>
                  setShowAddModal(
                    false
                  )
                }
              >
                <X size={20} />
              </button>

            </div>

            <form
              onSubmit={
                handleAddUserSubmit
              }
              className="p-5 flex flex-col gap-4"
            >

              <input
                type="text"
                placeholder="Full Name"
                value={
                  newUser.name
                }
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    name:
                      e.target.value,
                  })
                }
                className="w-full px-3 py-2 border rounded-lg"
                required
              />

              <input
                type="email"
                placeholder="Email"
                value={
                  newUser.email
                }
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    email:
                      e.target.value,
                  })
                }
                className="w-full px-3 py-2 border rounded-lg"
                required
              />

              <input
                type="password"
                placeholder="Temporary Password"
                value={
                  newUser.password
                }
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    password:
                      e.target.value,
                  })
                }
                className="w-full px-3 py-2 border rounded-lg"
                required
              />

              <select
                value={
                  newUser.role
                }
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    role:
                      e.target.value,
                  })
                }
                className="w-full px-3 py-2 border rounded-lg"
              >


                <option value="hod">
                  HOD
                </option>

                <option value="faculty">
                  Faculty
                </option>

                <option value="coordinator">
                  Coordinator
                </option>

                <option value="student">
                  Student
                </option>

              </select>

              <select
                value={
                  newUser.branch
                }
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    branch:
                      e.target.value,
                  })
                }
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="CSE">
                  CSE
                </option>

                <option value="IT">
                  IT
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

              </select>

              <div className="flex justify-end gap-3 mt-4">

                <button
                  type="button"
                  onClick={() =>
                    setShowAddModal(
                      false
                    )
                  }
                  className="px-4 py-2 bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  onClick={
                    handleAddUserSubmit
                  }
                  disabled={
                    loading
                  }
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
                >
                  {loading
                    ? 'Creating...'
                    : 'Create User'}
                </button>

              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;