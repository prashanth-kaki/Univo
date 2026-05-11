import React,
{
  useEffect,
  useState,
} from 'react';

import FacultyTable
  from '../../components/hod/FacultyTable';

import {
  getFacultyList,
  createFaculty,
} from '../../services/hodService';

import {
  UserPlus,
  X,
} from 'lucide-react';

const HodFaculty =
  () => {

    const [
      faculty,
      setFaculty,
    ] =
      useState([]);

    const [
      loading,
      setLoading,
    ] =
      useState(true);

    const [
      openModal,
      setOpenModal,
    ] =
      useState(false);

    const [
      formData,
      setFormData,
    ] =
      useState({
        name: '',
        email: '',
        password: '',
        designation:
          '',
      });

    const fetchFaculty =
      async () => {
        try {
          const data =
            await getFacultyList();

          setFaculty(
            data
          );
        } catch (
          error
        ) {
          console.error(
            error
          );
        } finally {
          setLoading(
            false
          );
        }
      };

    useEffect(() => {
      fetchFaculty();
    }, []);

    const handleChange =
      (e) => {
        setFormData({
          ...formData,
          [
          e.target
            .name
          ]:
            e.target
              .value,
        });
      };

    const handleCreate =
      async () => {
        try {
          await createFaculty(
            formData
          );

          alert(
            'Faculty created successfully'
          );

          setOpenModal(
            false
          );

          setFormData(
            {
              name:
                '',
              email:
                '',
              password:
                '',
              designation:
                '',
            }
          );

          fetchFaculty();

        } catch (
          error
        ) {
          alert(
            error.response
              ?.data
              ?.message ||
            'Failed to create faculty'
          );
        }
      };

    return (
      <div className="max-w-7xl mx-auto space-y-6 h-[calc(100vh-8rem)] flex flex-col">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Faculty Management
            </h1>

            <p className="text-slate-500 mt-1">
              Oversee department professors and teaching assistants.
            </p>
          </div>

          <button
            onClick={() =>
              setOpenModal(
                true
              )
            }
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-emerald-700"
          >
            <UserPlus className="w-5 h-5" />
            Add Faculty
          </button>
        </div>

        <div className="flex-1 min-h-0">
          <FacultyTable
            faculty={
              faculty
            }
            loading={
              loading
            }
          />
        </div>

        {openModal && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white rounded-xl p-6 w-[450px] shadow-xl">

              <div className="flex justify-between items-center mb-5">

                <h2 className="text-xl font-bold">
                  Add Faculty
                </h2>

                <button
                  onClick={() =>
                    setOpenModal(
                      false
                    )
                  }
                >
                  <X />
                </button>
              </div>

              <div className="space-y-4">

                <input
                  type="text"
                  name="name"
                  placeholder="Faculty Name"
                  value={
                    formData.name
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full border rounded-lg px-3 py-2"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Faculty Email"
                  value={
                    formData.email
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full border rounded-lg px-3 py-2"
                />

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
                  className="w-full border rounded-lg px-3 py-2"
                />

                <input
                  type="text"
                  name="designation"
                  placeholder="Designation"
                  value={
                    formData.designation
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full border rounded-lg px-3 py-2"
                />

                <button
                  onClick={
                    handleCreate
                  }
                  className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700"
                >
                  Create Faculty
                </button>

              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

export default
  HodFaculty;