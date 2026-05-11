import React, {
  useState,
  useEffect,
} from "react";
import EditAnnouncementModal
from "./EditAnnouncementModal";

import {
  Megaphone,
  Pin,
  MoreHorizontal,
  FileText,
  Download,
  Eye,
} from "lucide-react";

import {
  getAnnouncements,
  deleteAnnouncement,
  updateAnnouncement,
} from "../../services/facultyService";

const AnnouncementPanel = ({
  refreshTrigger,
}) => {

  const [
    announcements,
    setAnnouncements,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);
  const [
  editingAnnouncement,
  setEditingAnnouncement,
] = useState(null);
  const currentUser =
  JSON.parse(
    localStorage.getItem("user")
  );

  const handleDelete =
  async (id) => {

    try {

      await deleteAnnouncement(
        id
      );

      setAnnouncements(
        prev =>
          prev.filter(
            ann =>
              ann._id !== id
          )
      );

    } catch (error) {

      console.log(error);
    }
  };
  const handleEdit =
  (announcement) => {

    setEditingAnnouncement(
      announcement
    );
  };
  useEffect(() => {

    const fetchAnnouncements =
      async () => {

        try {

          setLoading(true);

          const data =
            await getAnnouncements();

          setAnnouncements(
            data || []
          );

        } catch (error) {

          console.error(
            "Failed to fetch announcements",
            error
          );

        } finally {

          setLoading(false);
        }
      };

    fetchAnnouncements();

  }, [refreshTrigger]);

  if (loading) {

    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm h-full flex flex-col p-5">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-slate-200 rounded w-1/4"></div>

          <div className="h-24 bg-slate-100 rounded"></div>

          <div className="h-24 bg-slate-100 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm h-full flex flex-col">

      {/* HEADER */}

      <div className="p-5 border-b border-slate-200 flex items-center justify-between">

        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">

          <Megaphone className="w-5 h-5 text-indigo-500" />

          Announcements
        </h3>
      </div>

      {/* BODY */}

      <div className="flex-1 overflow-auto p-4 space-y-4">

        {announcements.length ===
          0 && (

            <div className="text-center py-10 text-slate-500">
              No announcements found.
            </div>
          )}

        {announcements.map(
          (ann) => {
            const isOwner =
              currentUser?._id ===
              ann.sender?._id;
            const attachment =
              ann.attachments?.[0];

            const isImage =
              attachment?.fileType?.includes(
                "image"
              );

            return (

              <div
                key={ann._id}
                className="relative p-5 rounded-xl border border-slate-200 bg-white hover:shadow-md transition-all"
              >

                {/* PIN */}

                {ann.isPinned && (

                  <div className="absolute top-0 right-4 -translate-y-1/2 bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-xs font-bold flex items-center gap-1 border border-amber-200">

                    <Pin className="w-3 h-3 fill-current" />

                    Pinned
                  </div>
                )}

                {/* TOP */}

                <div className="flex justify-between items-start mb-3">

                  <div>

                    <h4 className="font-bold text-slate-800 text-lg">
                      {ann.title}
                    </h4>

                    <p className="text-xs text-slate-500 mt-1">

                      {ann.branch}
                      {" • "}
                      Year {ann.year}
                      {" • "}
                      Section {ann.section}

                    </p>
                  </div>

                  {isOwner && (

  <div className="flex items-center gap-2">

    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">

      Posted by me

    </span>

    <button
      onClick={() =>
        handleEdit(ann)
      }
      className="text-sm px-3 py-1 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200"
    >
      Edit
    </button>

    <button
      onClick={() =>
        handleDelete(
          ann._id
        )
      }
      className="text-sm px-3 py-1 rounded-lg bg-red-100 text-red-700 hover:bg-red-200"
    >
      Delete
    </button>
  </div>
)}
                </div>

                {/* MESSAGE */}

                <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed mb-4">

                  {ann.message}

                </p>

                {/* IMAGE PREVIEW */}

                {isImage && (

                  <img
                    src={
                      attachment.fileUrl
                    }
                    alt=""
                    className="w-full max-h-72 object-cover rounded-xl border mb-4"
                  />
                )}

                {/* PDF / FILE */}

                {attachment &&
                  !isImage && (

                    <div className="flex items-center justify-between bg-slate-50 border rounded-xl p-3 mb-4">

                      <div className="flex items-center gap-3">

                        <FileText className="w-8 h-8 text-red-500" />

                        <div>

                          <p className="text-sm font-medium text-slate-700">
                            {
                              attachment.fileName
                            }
                          </p>

                          <p className="text-xs text-slate-500">

                            {(
                              attachment.fileSize /
                              (1024 *
                                1024)
                            ).toFixed(2)}
                            {" MB"}

                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">

                        <a
                          href={
                            attachment.fileUrl
                          }
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-indigo-700"
                        >

                          <Eye className="w-4 h-4" />

                          View
                        </a>

                        <a
                          href={
                            attachment.fileUrl
                          }
                          download
                          className="flex items-center gap-1 border border-slate-300 px-3 py-1.5 rounded-lg text-sm hover:bg-slate-100"
                        >

                          <Download className="w-4 h-4" />

                          Download
                        </a>
                      </div>
                    </div>
                  )}

                {/* IMAGE ACTIONS */}

                {attachment &&
                  isImage && (

                    <div className="flex items-center gap-2 mb-4">

                      <a
                        href={
                          attachment.fileUrl
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-indigo-700"
                      >

                        <Eye className="w-4 h-4" />

                        View
                      </a>

                      <a
                        href={
                          attachment.fileUrl
                        }
                        download
                        className="flex items-center gap-1 border border-slate-300 px-3 py-1.5 rounded-lg text-sm hover:bg-slate-100"
                      >

                        <Download className="w-4 h-4" />

                        Download
                      </a>
                    </div>
                  )}

                {/* FOOTER */}

                <div className="flex items-center justify-between pt-3 border-t border-slate-100">

                  <div className="flex items-center gap-2">

                    <img
                      src={
                        ann.sender
                          ?.profileImage
                      }
                      alt=""
                      className="w-8 h-8 rounded-full"
                    />

                    <div>

                      <p className="text-sm font-semibold text-slate-700">

  {
    ann.sender
      ?.name
  }

</p>

<p className="text-xs text-slate-500 capitalize">

  {
    ann.sender
      ?.role
  }

</p>
                    </div>
                  </div>

                  <span className="text-xs text-slate-500">

                    {new Date(
                      ann.createdAt
                    ).toLocaleString()}

                  </span>
                </div>
              </div>
            );
          }
        )}
      </div>
      {
  editingAnnouncement && (

    <EditAnnouncementModal

      announcement={
        editingAnnouncement
      }

      onClose={() =>
        setEditingAnnouncement(
          null
        )
      }

      onUpdated={(
        updatedAnnouncement
      ) => {

        setAnnouncements(
          prev =>

            prev.map(item =>

              item._id ===
              updatedAnnouncement._id

                ? updatedAnnouncement

                : item
            )
        );
      }}
    />
  )
}
    </div>
  );
};

export default AnnouncementPanel;