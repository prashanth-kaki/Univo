import React, {
  useEffect,
  useState,
} from 'react';

import SubjectManagement
  from '../../components/hod/SubjectManagement';

import {
  getSubjectAllocations,
  createSubject,
  getFacultyOptions,
} from '../../services/hodService';

import {
  BookOpen,
} from 'lucide-react';

const HodSubjects = () => {
  const [
    subjects,
    setSubjects,
  ] = useState([]);

  const [
    faculty,
    setFaculty,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    formData,
    setFormData,
  ] = useState({
    name: '',
    code: '',
    faculty: '',
    year: 1,
    semester: 1,
    section: 'A',
    credits: 3,
  });

  const fetchData =
    async () => {
      try {
        const [
          subjectsData,
          facultyData,
        ] = await Promise.all([
          getSubjectAllocations(),
          getFacultyOptions(),
        ]);

        setSubjects(
          subjectsData || []
        );

        setFaculty(
          facultyData || []
        );

      } catch (error) {
        console.error(
          'Fetch Error:',
          error
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange =
    (e) => {

      console.log(
        e.target.name,
        e.target.value
      );

      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value,
      });
    };

  const handleSave =
    async () => {

      console.log(
        'Save button clicked'
      );

      console.log(
        formData
      );

      try {

        await createSubject(
          formData
        );

        alert(
          'Subject allocated successfully'
        );

        setFormData({
          name: '',
          code: '',
          faculty: '',
          year: 1,
          semester: 1,
          section: 'A',
          credits: 3,
        });

        fetchData();

      } catch (error) {

        console.error(
          'Create Subject Error:',
          error
        );

        alert(
          error.response
            ?.data
            ?.message ||
          'Failed to create subject'
        );
      }
    };

  return (
    <div className="max-w-7xl mx-auto space-y-6">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Subject Allocations
          </h1>

          <p className="text-slate-500 mt-1">
            Assign subjects to faculty
            and configure sections.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2">
          <SubjectManagement
            subjects={subjects}
            loading={loading}
          />
        </div>

        <div className="lg:col-span-1">

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">

            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-emerald-500" />
              Quick Assign
            </h3>

            <div className="space-y-4">

              <div>
                <label className="block text-sm font-medium mb-1">
                  Subject Name
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
                  placeholder="Enter subject name"
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Subject Code
                </label>

                <input
                  type="text"
                  name="code"
                  value={
                    formData.code
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="CS301"
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Faculty
                </label>

                <select
                  name="faculty"
                  value={
                    formData.faculty
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full border rounded-lg px-3 py-2"
                >
                  <option value="">
                    Select Faculty
                  </option>

                  {faculty?.map(
                    (teacher, index) => (
                      <option
                        key={
                          teacher?._id ||
                          index
                        }
                        value={
                          teacher?._id
                        }
                      >
                        {teacher?.name}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Year
                </label>

                <input
                  type="number"
                  name="year"
                  value={
                    formData.year
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Semester
                </label>

                <input
                  type="number"
                  name="semester"
                  value={
                    formData.semester
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
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
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Credits
                </label>

                <input
                  type="number"
                  name="credits"
                  value={
                    formData.credits
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>

              <button
                onClick={
                  handleSave
                }
                className="w-full bg-emerald-600 text-white rounded-lg py-2 font-medium hover:bg-emerald-700"
              >
                Save Allocation
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HodSubjects;