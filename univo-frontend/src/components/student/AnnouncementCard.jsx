import React from 'react';

import {
  Pin,
  Clock,
  Eye,
  Download,
  Bookmark,
} from 'lucide-react';

const AnnouncementCard = ({
  announcement,
}) => {

  if (!announcement)
    return null;

  const authorName =
    announcement?.sender?.name ||
    announcement?.author?.name ||
    "Admin";

  const title =
    announcement?.title ||
    "Announcement";

  const content =
    announcement?.message ||
    announcement?.content ||
    "";

  const attachment =
    announcement?.attachments?.[0];

  return (

    <div
      className={`p-5 rounded-2xl border transition-all ${
        announcement?.isNew
          ? "bg-violet-50 border-violet-200"
          : "bg-white border-slate-200 hover:shadow-md"
      }`}
    >

      {/* TOP */}

      <div className="flex justify-between items-start mb-3">

        <div className="flex items-center gap-2 flex-wrap">

          {
            announcement?.isPinned && (

              <div className="flex items-center gap-1 text-rose-500">

                <Pin className="w-4 h-4 fill-current" />

                <span className="text-xs font-bold">

                  Pinned

                </span>
              </div>
            )
          }

          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded bg-slate-200 text-slate-700">

            {
              announcement?.visibility ||
              "General"
            }

          </span>
        </div>

        <span className="text-xs text-slate-400 font-medium flex items-center gap-1">

          <Clock className="w-3.5 h-3.5" />

          {
            new Date(
              announcement?.createdAt
            ).toLocaleDateString()
          }

        </span>
      </div>

      {/* TITLE */}

      <h4 className="text-lg font-bold text-slate-800 mb-2">

        {title}

      </h4>

      {/* MESSAGE */}

      <p className="text-sm text-slate-600 whitespace-pre-wrap leading-relaxed mb-4">

        {content}

      </p>

      {/* ATTACHMENT */}

      {
        attachment && (

          <div className="flex items-center gap-3 mb-4">

            {/* VIEW */}

            <a
              href={attachment.fileUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 text-white text-sm hover:bg-violet-700 transition-all"
            >

              <Eye className="w-4 h-4" />

              View

            </a>

            {/* DOWNLOAD */}

            <a
              href={attachment.fileUrl}
              download
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 text-sm hover:bg-slate-100 transition-all"
            >

              <Download className="w-4 h-4" />

              Download

            </a>

            {/* BOOKMARK */}

            <button
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-yellow-300 text-sm hover:bg-yellow-50 transition-all"
            >

              <Bookmark className="w-4 h-4" />

              Save

            </button>
          </div>
        )
      }

      {/* FOOTER */}

      <div className="flex items-center gap-2 text-sm text-slate-500 pt-3 border-t border-slate-100">

        <div className="w-7 h-7 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center font-bold">

          {
            authorName?.charAt(0)
          }

        </div>

        <div>

          <p className="font-medium text-slate-700">

            {authorName}

          </p>

          <p className="text-xs text-slate-400">

            {
              announcement?.senderRole ||
              "Faculty"
            }

          </p>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCard;