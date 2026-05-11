import React from 'react';

import {
    CheckCircle,
    XCircle,
    Eye,
    Shield,
} from 'lucide-react';

const ReportActions = ({
    report,
    onResolve,
    onDismiss,
    onBan,
    onView,
}) => {

    return (

        <div className="
      flex
      items-center
      justify-end
      gap-2
    ">

            {/* RESOLVE */}

            <button

                onClick={() =>
                    onResolve(
                        report
                    )
                }

                className="
          p-1.5
          rounded-lg
          text-slate-400
          hover:text-emerald-600
          hover:bg-emerald-50
          transition-colors
        "

                title="Resolve Report"
            >

                <CheckCircle size={18} />

            </button>

            {/* DISMISS */}

            <button

                onClick={() =>
                    onDismiss(
                        report
                    )
                }

                className="
          p-1.5
          rounded-lg
          text-slate-400
          hover:text-slate-700
          hover:bg-slate-100
          transition-colors
        "

                title="Dismiss Report"
            >

                <XCircle size={18} />

            </button>

            {/* VIEW */}

            <button

                onClick={() =>
                    onView(
                        report
                    )
                }

                className="
          p-1.5
          rounded-lg
          text-slate-400
          hover:text-indigo-600
          hover:bg-indigo-50
          transition-colors
        "

                title="View Details"
            >

                <Eye size={18} />

            </button>

            {/* BAN */}

            <button

                onClick={() =>
                    onBan(
                        report
                    )
                }

                className="
          p-1.5
          rounded-lg
          text-slate-400
          hover:text-red-600
          hover:bg-red-50
          transition-colors
        "

                title="Ban User"
            >

                <Shield size={18} />

            </button>

        </div>
    );
};

export default ReportActions;