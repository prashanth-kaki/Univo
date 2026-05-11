import React from 'react';

import {
    AlertTriangle,
    CheckCircle,
    XCircle,
    Shield,
} from 'lucide-react';

const ReportsStats = ({
    pending,
    resolved,
    dismissed,
    bansIssued,
    setStatusFilter,
}) => {

    const cards = [

        {
            title: 'Pending',
            value: pending,
            icon: AlertTriangle,
            color:
                'amber',
            filter:
                'pending',
        },

        {
            title: 'Resolved',
            value: resolved,
            icon: CheckCircle,
            color:
                'emerald',
            filter:
                'resolved',
        },

        {
            title: 'Dismissed',
            value: dismissed,
            icon: XCircle,
            color:
                'slate',
            filter:
                'dismissed',
        },

        {
            title: 'Bans Issued',
            value: bansIssued,
            icon: Shield,
            color:
                'red',
            filter:
                'banned',
        },
    ];

    return (

        <div className="
      grid
      grid-cols-1
      md:grid-cols-2
      xl:grid-cols-4
      gap-4
    ">

            {cards.map(
                (card) => {

                    const Icon =
                        card.icon;

                    return (

                        <button

                            key={
                                card.title
                            }

                            onClick={() =>
                                setStatusFilter(
                                    card.filter
                                )
                            }

                            className="
                bg-white
                rounded-xl
                border
                border-slate-200
                shadow-sm
                p-5
                flex
                items-center
                gap-4
                hover:shadow-md
                transition-all
                text-left
              "
                        >

                            <div className={`
                p-3
                rounded-xl

                ${card.color === 'amber'
                                    ? 'bg-amber-100 text-amber-600'
                                    : card.color === 'emerald'
                                        ? 'bg-emerald-100 text-emerald-600'
                                        : card.color === 'red'
                                            ? 'bg-red-100 text-red-600'
                                            : 'bg-slate-100 text-slate-600'}
              `}>

                                <Icon size={24} />

                            </div>

                            <div>

                                <p className="
                  text-sm
                  text-slate-500
                ">
                                    {card.title}
                                </p>

                                <p className="
                  text-3xl
                  font-bold
                  text-slate-800
                ">
                                    {card.value}
                                </p>

                            </div>
                        </button>
                    );
                }
            )}
        </div>
    );
};

export default ReportsStats;