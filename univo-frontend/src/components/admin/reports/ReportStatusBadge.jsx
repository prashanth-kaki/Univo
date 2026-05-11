import React from 'react';

const ReportStatusBadge = ({
    status
}) => {

    return (

        <span className={`
      px-3
      py-1
      rounded-full
      text-xs
      font-semibold
      border

      ${status === 'pending'
                ? 'bg-amber-100 text-amber-700 border-amber-200'
                : status === 'resolved'
                    ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                    : status === 'dismissed'
                        ? 'bg-slate-100 text-slate-700 border-slate-200'
                        : 'bg-red-100 text-red-700 border-red-200'}
    `}>

            {status}

        </span>
    );
};

export default ReportStatusBadge;