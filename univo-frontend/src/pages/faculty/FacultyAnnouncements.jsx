import React, { useState } from "react";

import AnnouncementPanel from "../../components/faculty/AnnouncementPanel";

import { createAnnouncement } from "../../services/facultyService";

import toast from "react-hot-toast";

import {
  Upload,
  FileText,
  Image as ImageIcon,
} from "lucide-react";

const FacultyAnnouncements = () => {
  const [loading, setLoading] =
    useState(false);

  const [refreshTrigger, setRefreshTrigger] =
    useState(0);

  const [selectedFile, setSelectedFile] =
    useState(null);

  const [formData, setFormData] =
    useState({
      title: "",
      message: "",
      branch: "CSE",
      year: 1,
      section: "A",
      visibility: "year",
      isPinned: false,
    });

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.message
    ) {
      toast.error(
        "Title and message are required"
      );
      return;
    }

    try {
      setLoading(true);

      const uploadData =
        new FormData();

      uploadData.append(
        "title",
        formData.title
      );

      uploadData.append(
        "message",
        formData.message
      );

      uploadData.append(
        "branch",
        formData.branch
      );

      uploadData.append(
        "year",
        formData.year
      );

      uploadData.append(
        "section",
        formData.section
      );

      uploadData.append(
        "visibility",
        formData.visibility
      );

      uploadData.append(
        "isPinned",
        formData.isPinned
      );

      if (selectedFile) {
        uploadData.append(
          "attachment",
          selectedFile
        );
      }

      await createAnnouncement(
        uploadData
      );

      toast.success(
        "Announcement posted successfully"
      );

      setFormData({
        title: "",
        message: "",
        branch: "CSE",
        year: 1,
        section: "A",
        visibility: "year",
        isPinned: false,
      });

      setSelectedFile(null);

      setRefreshTrigger(
        (prev) => prev + 1
      );
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data
          ?.message ||
        "Failed to post announcement"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Announcements
        </h1>

        <p className="text-slate-500 mt-1">
          Broadcast important
          information to your
          students.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        {/* LEFT PANEL */}

        <div className="lg:col-span-2 h-full overflow-hidden">
          <AnnouncementPanel
            refreshTrigger={
              refreshTrigger
            }
          />
        </div>

        {/* RIGHT PANEL */}

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              Create
              Announcement
            </h3>

            <form
              onSubmit={
                handleSubmit
              }
              className="space-y-4"
            >
              {/* TITLE */}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={
                    formData.title
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="Announcement title..."
                />
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
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
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
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
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
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
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
                </select>
              </div>

              {/* MESSAGE */}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Message
                </label>

                <textarea
                  name="message"
                  value={
                    formData.message
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm h-32 resize-none"
                  placeholder="Write your announcement..."
                />
              </div>

              {/* FILE */}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Attachment
                </label>

                <label className="flex items-center justify-center gap-2 border-2 border-dashed border-slate-300 rounded-xl p-4 cursor-pointer hover:border-indigo-400 transition">
                  <Upload className="w-5 h-5 text-indigo-600" />

                  <span className="text-sm text-slate-600">
                    Upload PDF /
                    Image
                  </span>

                  <input
                    type="file"
                    className="hidden"
                    onChange={
                      handleFileChange
                    }
                  />
                </label>

                {selectedFile && (
                  <div className="mt-3 flex items-center gap-2 text-sm text-slate-700">
                    {selectedFile.type.includes(
                      "image"
                    ) ? (
                      <ImageIcon className="w-4 h-4 text-indigo-600" />
                    ) : (
                      <FileText className="w-4 h-4 text-red-500" />
                    )}

                    <span>
                      {
                        selectedFile.name
                      }
                    </span>
                  </div>
                )}
              </div>

              {/* PIN */}

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isPinned"
                  checked={
                    formData.isPinned
                  }
                  onChange={
                    handleChange
                  }
                  id="pin"
                />

                <label
                  htmlFor="pin"
                  className="text-sm text-slate-600"
                >
                  Pin to top
                </label>
              </div>

              {/* SUBMIT */}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white rounded-lg py-3 font-medium hover:bg-indigo-700 transition disabled:opacity-50"
              >
                {loading
                  ? "Posting..."
                  : "Post Announcement"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyAnnouncements;