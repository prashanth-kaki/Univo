import React from 'react';

import ReportStatusBadge
    from './ReportStatusBadge';

import ReportActions
    from './ReportActions';

const ReportsTable = ({
    reports,
    onResolve,
    onDismiss,
    onBan,
    onView,
}) => {

    return (

        <div className="
      bg-white
      rounded-xl
      shadow-sm
      border
      border-slate-200
      overflow-hidden
    ">

            <div className="
        w-full
        overflow-x-auto
      ">

                <table className="
          w-full
          text-left
          border-collapse
        ">

                    {/* TABLE HEAD */}

                    <thead>

                        <tr className="
              bg-slate-50
              border-y
              border-slate-200
            ">

                            <th className="
                py-4
                px-6
                text-xs
                font-semibold
                text-slate-500
                uppercase
                tracking-wider
              ">
                                Report Details
                            </th>

                            <th className="
                py-4
                px-6
                text-xs
                font-semibold
                text-slate-500
                uppercase
                tracking-wider
              ">
                                Target
                            </th>

                            <th className="
                py-4
                px-6
                text-xs
                font-semibold
                text-slate-500
                uppercase
                tracking-wider
              ">
                                Reporter
                            </th>

                            <th className="
                py-4
                px-6
                text-xs
                font-semibold
                text-slate-500
                uppercase
                tracking-wider
              ">
                                Status
                            </th>

                            <th className="
                py-4
                px-6
                text-xs
                font-semibold
                text-slate-500
                uppercase
                tracking-wider
                text-right
              ">
                                Actions
                            </th>

                        </tr>
                    </thead>

                    {/* TABLE BODY */}

                    <tbody className="
            divide-y
            divide-slate-100
          ">

                        {reports.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="5"
                                    className="
                    py-10
                    text-center
                    text-slate-500
                  "
                                >
                                    No reports found.
                                </td>

                            </tr>

                        ) : (

                            reports.map(
                                (report) => (

                                    <tr
                                        key={report._id || report.id}
                                        className="
                      hover:bg-slate-50/50
                      transition-colors
                    "
                                    >

                                        {/* REPORT DETAILS */}

                                        <td className="
                      py-4
                      px-6
                    ">

                                            <div className="
                        flex
                        flex-col
                        gap-1
                        max-w-md
                      ">

                                                <div className="
                          flex
                          items-center
                          gap-2
                        ">

                                                    <span className="
                            px-2
                            py-0.5
                            rounded-md
                            bg-slate-100
                            text-slate-700
                            text-xs
                            font-semibold
                          ">
                                                        {report.type}
                                                    </span>

                                                    <span className="
                            text-xs
                            text-slate-400
                          ">
                                                        {new Date(
                                                            report.createdAt
                                                        ).toLocaleDateString()}
                                                    </span>

                                                </div>

                                                <p className="
                          text-sm
                          text-slate-800
                          line-clamp-2
                        ">
                                                    {report.description}
                                                </p>

                                            </div>
                                        </td>

                                        {/* TARGET */}

                                        <td className="
                      py-4
                      px-6
                      text-sm
                      text-slate-700
                    ">

                                            {report.targetUser}

                                        </td>

                                        {/* REPORTER */}

                                        <td className="
                      py-4
                      px-6
                      text-sm
                      text-slate-700
                    ">

                                            {report.reporter}

                                        </td>

                                        {/* STATUS */}

                                        <td className="
                      py-4
                      px-6
                    ">

                                            <ReportStatusBadge
                                                status={
                                                    report.status
                                                }
                                            />

                                        </td>

                                        {/* ACTIONS */}

                                        <td className="
                      py-4
                      px-6
                      text-right
                    ">

                                            <ReportActions

                                                report={
                                                    report
                                                }

                                                onResolve={
                                                    onResolve
                                                }

                                                onDismiss={
                                                    onDismiss
                                                }

                                                onBan={
                                                    onBan
                                                }

                                                onView={
                                                    onView
                                                }
                                            />

                                        </td>
                                    </tr>
                                )
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReportsTable;