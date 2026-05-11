import React from 'react';

import { cn } from '../../../utils/cn';

const ModerationStatusBadge = ({
    status
}) => {

    return (

        <span
            className={cn(

                "px-2.5 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 w-fit",

                status ===
                    'auto-hidden'

                    ? "bg-slate-100 text-slate-700 border-slate-200"

                    : status ===
                        'resolved'

                        ? "bg-emerald-100 text-emerald-700 border-emerald-200"

                        : status ===
                            'rejected'

                            ? "bg-red-100 text-red-700 border-red-200"

                            : "bg-amber-100 text-amber-700 border-amber-200"
            )}
        >

            {status ===
                'auto-hidden'
                ? 'Auto-Hidden'
                : status ===
                    'resolved'
                    ? 'Resolved'
                    : status ===
                        'rejected'
                        ? 'Rejected'
                        : 'Pending Review'}

        </span>
    );
};

export default ModerationStatusBadge;