import React from 'react';

import {
    X,
} from 'lucide-react';

const ReportDetailsModal = ({
    report,
    onClose,
}) => {

    if (!report)
        return null;

    return (

        <div className="
      fixed
      inset-0
      bg-black/50
      z-50
      flex
      items-center
      justify-center
      p-4
    ">

            <div className="
        bg-white
        rounded-2xl
        w-full
        max-w-2xl
        p-6
        relative
      ">

                {/* CLOSE */}

                <button

                    onClick={onClose}

                    className="
            absolute
            top-4
            right-4
            text-slate-400
          "
                >

                    <X size={20} />

                </button>

                <h2 className="
          text-2xl
          font-bold
          text-slate-800
          mb-6
        ">
                    Report Details
                </h2>

                <div className="
          flex
          flex-col
          gap-5
        ">

                    <div>

                        <p className="
              text-sm
              text-slate-500
            ">
                            Report Type
                        </p>

                        <p className="
              font-semibold
              text-slate-800
            ">
                            {report.type}
                        </p>

                    </div>

                    <div>

                        <p className="
              text-sm
              text-slate-500
            ">
                            Description
                        </p>

                        <div className="
              mt-1
              bg-slate-50
              border
              border-slate-200
              rounded-xl
              p-4
            ">

                            {report.description}

                        </div>

                    </div>

                    <div className="
            grid
            grid-cols-2
            gap-4
          ">

                        <div>

                            <p className="
                text-sm
                text-slate-500
              ">
                                Reporter
                            </p>

                            <p className="
                font-medium
              ">
                                {report.reporter}
                            </p>

                        </div>

                        <div>

                            <p className="
                text-sm
                text-slate-500
              ">
                                Target User
                            </p>

                            <p className="
                font-medium
              ">
                                {report.targetUser}
                            </p>

                        </div>

                    </div>

                    <div>

                        <p className="
              text-sm
              text-slate-500
            ">
                            Status
                        </p>

                        <p className="
              font-medium
            ">
                            {report.status}
                        </p>

                    </div>

                    <div>

                        <p className="
              text-sm
              text-slate-500
            ">
                            Created At
                        </p>

                        <p className="
              font-medium
            ">
                            {new Date(
                                report.createdAt
                            ).toLocaleString()}
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportDetailsModal;