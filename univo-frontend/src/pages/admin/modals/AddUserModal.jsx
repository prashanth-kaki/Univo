import React, {
    useState,
} from 'react';

import {
    X,
    Loader2,
} from 'lucide-react';

import toast from 'react-hot-toast';

import {
    createUser,
} from '../../../services/adminService';

const AddUserModal = ({
    isOpen,
    onClose,
    onUserCreated,
}) => {

    const [loading, setLoading] =
        useState(false);

    const [formData, setFormData] =
        useState({
            name: '',
            email: '',
            password: '',
            role: 'student',
            branch: 'CSE',
            year: 1,
            semester: 1,
            section: 'A',
            rollNumber: '',
            phoneNumber: '',
        });

    // ======================================
    // HANDLE INPUT
    // ======================================

    const handleChange = (e) => {

        setFormData({
            ...formData,

            [e.target.name]:
                e.target.value,
        });
    };

    // ======================================
    // CREATE USER
    // ======================================

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            try {

                setLoading(true);

                const response =
                    await createUser(
                        formData
                    );

                if (
                    response.success
                ) {

                    toast.success(
                        'User created successfully. Email sent.'
                    );

                    if (
                        onUserCreated
                    ) {

                        onUserCreated(
                            response.data
                        );
                    }

                    // RESET FORM

                    setFormData({
                        name: '',
                        email: '',
                        password: '',
                        role: 'student',
                        branch: 'CSE',
                        year: 1,
                        semester: 1,
                        section: 'A',
                        rollNumber: '',
                        phoneNumber: '',
                    });

                    onClose();
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
    // CLOSE MODAL
    // ======================================

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">

            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">

                {/* HEADER */}

                <div className="flex items-center justify-between p-5 border-b border-slate-100">

                    <div>

                        <h2 className="text-xl font-bold text-slate-800">
                            Create New User
                        </h2>

                        <p className="text-sm text-slate-500 mt-1">
                            Add faculty, HOD,
                            coordinator, admin,
                            or student accounts.
                        </p>

                    </div>

                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                        <X size={20} />
                    </button>

                </div>

                {/* FORM */}

                <form
                    onSubmit={handleSubmit}
                    className="p-5 flex flex-col gap-4"
                >

                    {/* NAME */}

                    <div>

                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Full Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={
                                formData.name
                            }
                            onChange={
                                handleChange
                            }
                            placeholder="John Doe"
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />

                    </div>

                    {/* EMAIL */}

                    <div>

                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Email Address
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={
                                formData.email
                            }
                            onChange={
                                handleChange
                            }
                            placeholder="john@univo.com"
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />

                    </div>

                    {/* PASSWORD */}

                    <div>

                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Temporary Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            value={
                                formData.password
                            }
                            onChange={
                                handleChange
                            }
                            placeholder="••••••••"
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />

                    </div>

                    {/* ROLE + BRANCH */}

                    <div className="grid grid-cols-2 gap-4">

                        <div>

                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Role
                            </label>

                            <select
                                name="role"
                                value={
                                    formData.role
                                }
                                onChange={
                                    handleChange
                                }
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-white outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="admin">
                                    Admin
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

                        </div>

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
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-white outline-none focus:ring-2 focus:ring-indigo-500"
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

                                <option value="AIML">
                                    AIML
                                </option>

                                <option value="DS">
                                    DS
                                </option>

                            </select>

                        </div>

                    </div>

                    {/* STUDENT FIELDS */}

                    {formData.role ===
                        'student' && (

                            <>

                                <div className="grid grid-cols-2 gap-4">

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
                                            className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-white outline-none focus:ring-2 focus:ring-indigo-500"
                                        >
                                            <option value={1}>
                                                1st Year
                                            </option>

                                            <option value={2}>
                                                2nd Year
                                            </option>

                                            <option value={3}>
                                                3rd Year
                                            </option>

                                            <option value={4}>
                                                4th Year
                                            </option>

                                        </select>

                                    </div>

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
                                            className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-white outline-none focus:ring-2 focus:ring-indigo-500"
                                        >
                                            {[...Array(8)].map(
                                                (
                                                    _,
                                                    index
                                                ) => (

                                                    <option
                                                        key={
                                                            index
                                                        }
                                                        value={
                                                            index +
                                                            1
                                                        }
                                                    >
                                                        Semester{' '}
                                                        {index +
                                                            1}
                                                    </option>
                                                )
                                            )}

                                        </select>

                                    </div>

                                </div>

                                <div className="grid grid-cols-2 gap-4">

                                    <div>

                                        <label className="block text-sm font-medium text-slate-700 mb-1">
                                            Section
                                        </label>

                                        <input
                                            type="text"
                                            name="section"
                                            value={
                                                formData.section
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder="A"
                                            className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                                        />

                                    </div>

                                    <div>

                                        <label className="block text-sm font-medium text-slate-700 mb-1">
                                            Roll Number
                                        </label>

                                        <input
                                            type="text"
                                            name="rollNumber"
                                            value={
                                                formData.rollNumber
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder="23MH1A05H5"
                                            className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                                        />

                                    </div>

                                </div>
                            </>
                        )}

                    {/* PHONE */}

                    <div>

                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Phone Number
                        </label>

                        <input
                            type="text"
                            name="phoneNumber"
                            value={
                                formData.phoneNumber
                            }
                            onChange={
                                handleChange
                            }
                            placeholder="9876543210"
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                        />

                    </div>

                    {/* FOOTER */}

                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-2">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                        >
                            {loading && (
                                <Loader2
                                    size={16}
                                    className="animate-spin"
                                />
                            )}

                            {loading
                                ? 'Creating...'
                                : 'Create User'}

                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
};

export default AddUserModal;