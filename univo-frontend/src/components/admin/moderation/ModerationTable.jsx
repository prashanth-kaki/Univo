import React from 'react';

import {
    ShieldAlert,
    CheckCircle,
    Ban,
    Eye,
} from 'lucide-react';

import ConfidenceBar
    from './ConfidenceBar';

import ModerationStatusBadge
    from './ModerationStatusBadge';

const ModerationTable = ({
    flags,
    onApprove,
    onReject,
    onViewDetails
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
                                Content Segment
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
                                AI Analysis
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
                                Confidence
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

                    <tbody className="
            divide-y
            divide-slate-100
          ">

                        {flags.map(
                            (flag) => (

                                <tr
                                    key={flag.id}
                                    className="
                    hover:bg-slate-50/50
                    transition-colors
                  "
                                >

                                    {/* CONTENT */}

                                    <td className="
                    py-4
                    px-6
                  ">

                                        <div className="
                      flex
                      flex-col
                      max-w-sm
                    ">

                                            <span className="
                        text-xs
                        font-semibold
                        text-slate-500
                        mb-1
                      ">
                                                {flag.type}
                                            </span>

                                            <span className="
                        text-sm
                        text-slate-800
                        italic
                        border-l-2
                        border-slate-300
                        pl-3
                        py-1
                      ">
                                                "{flag.content}"
                                            </span>

                                        </div>
                                    </td>

                                    {/* ANALYSIS */}

                                    <td className="
                    py-4
                    px-6
                    text-sm
                  ">

                                        <span className="
                      inline-flex
                      items-center
                      gap-1.5
                      px-2.5
                      py-1
                      rounded-md
                      bg-red-50
                      text-red-700
                      font-medium
                      border
                      border-red-100
                    ">

                                            <ShieldAlert size={14} />

                                            {flag.reason}

                                        </span>
                                    </td>

                                    {/* CONFIDENCE */}

                                    <td className="
                    py-4
                    px-6
                  ">

                                        <ConfidenceBar
                                            confidence={
                                                flag.confidence
                                            }
                                        />

                                    </td>

                                    {/* STATUS */}

                                    <td className="
                    py-4
                    px-6
                  ">

                                        <ModerationStatusBadge
                                            status={
                                                flag.status
                                            }
                                        />

                                    </td>

                                    {/* ACTIONS */}

                                    <td className="
                    py-4
                    px-6
                    text-right
                  ">

                                        <div className="
                      flex
                      items-center
                      justify-end
                      gap-2
                    ">

                                            <button

                                                onClick={() =>
                                                    onViewDetails(
                                                        flag
                                                    )
                                                }

                                                className="
                          p-1.5
                          text-slate-400
                          hover:text-indigo-600
                          hover:bg-indigo-50
                          rounded-lg
                          transition-colors
                        "
                                            >

                                                <Eye size={18} />

                                            </button>

                                            <button

                                                onClick={() =>
                                                    onReject(
                                                        flag.id
                                                    )
                                                }

                                                className="
                          p-1.5
                          text-slate-400
                          hover:text-red-600
                          hover:bg-red-50
                          rounded-lg
                          transition-colors
                        "
                                            >

                                                <Ban size={18} />

                                            </button>

                                            <button

                                                onClick={() =>
                                                    onApprove(
                                                        flag.id
                                                    )
                                                }

                                                className="
                          p-1.5
                          text-slate-400
                          hover:text-emerald-600
                          hover:bg-emerald-50
                          rounded-lg
                          transition-colors
                        "
                                            >

                                                <CheckCircle size={18} />

                                            </button>

                                        </div>
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ModerationTable;