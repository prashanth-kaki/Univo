import React, {
  useState,
} from "react";

import {
  X,
  Upload,
} from "lucide-react";

import {
  updateAnnouncement,
} from "../../services/facultyService";

const EditAnnouncementModal = ({
  announcement,
  onClose,
  onUpdated,
}) => {

  const [
    title,
    setTitle,
  ] = useState(
    announcement.title
  );

  const [
    message,
    setMessage,
  ] = useState(
    announcement.message
  );

  const [
    selectedFile,
    setSelectedFile,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const formData =
          new FormData();

        formData.append(
          "title",
          title
        );

        formData.append(
          "message",
          message
        );

        if (selectedFile) {

          formData.append(
            "attachment",
            selectedFile
          );
        }

        const response =
          await updateAnnouncement(

            announcement._id,

            formData
          );

        onUpdated(
          response.data
        );

        onClose();

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">

      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden">

        {/* HEADER */}

        <div className="flex items-center justify-between p-5 border-b">

          <h2 className="text-xl font-bold text-slate-800">

            Edit Announcement

          </h2>

          <button
            onClick={onClose}
            className="text-slate-500 hover:text-red-500"
          >

            <X className="w-6 h-6" />

          </button>
        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="p-5 space-y-5"
        >

          {/* TITLE */}

          <div>

            <label className="block text-sm font-medium mb-2">

              Title

            </label>

            <input
              type="text"
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* MESSAGE */}

          <div>

            <label className="block text-sm font-medium mb-2">

              Message

            </label>

            <textarea
              value={message}
              onChange={(e) =>
                setMessage(
                  e.target.value
                )
              }
              rows={6}
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
            />
          </div>

          {/* CURRENT FILE */}

          {announcement.attachments?.[0] && (

            <div>

              <p className="text-sm font-medium mb-2">

                Current Attachment

              </p>

              <a
                href={
                  announcement
                    .attachments[0]
                    .fileUrl
                }
                target="_blank"
                rel="noreferrer"
                className="text-indigo-600 hover:underline text-sm"
              >

                {
                  announcement
                    .attachments[0]
                    .fileName
                }

              </a>
            </div>
          )}

          {/* NEW FILE */}

          <div>

            <label className="block text-sm font-medium mb-2">

              Replace Attachment

            </label>

            <label className="border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 transition-all">

              <Upload className="w-8 h-8 text-indigo-500 mb-2" />

              <p className="text-sm text-slate-600">

                Click to upload new PDF/image

              </p>

              <input
                type="file"
                hidden
                onChange={(e) =>
                  setSelectedFile(
                    e.target.files[0]
                  )
                }
              />
            </label>

            {selectedFile && (

              <p className="text-sm mt-2 text-green-600">

                {
                  selectedFile.name
                }

              </p>
            )}
          </div>

          {/* BUTTONS */}

          <div className="flex justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl border hover:bg-slate-100"
            >

              Cancel

            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
            >

              {
                loading
                  ? "Saving..."
                  : "Save Changes"
              }

            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAnnouncementModal;