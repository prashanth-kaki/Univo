import React from 'react';

import {
    Shield,
    UserCog,
    CheckCircle,
    FileText,
    Trash2,
    AlertTriangle,
} from 'lucide-react';

const ActivityIcon = ({
    type,
}) => {

    const config = {

        moderation: {
            icon:
                <Shield size={18} />,
            bg:
                'bg-red-100',
            color:
                'text-red-600',
        },

        role: {
            icon:
                <UserCog size={18} />,
            bg:
                'bg-indigo-100',
            color:
                'text-indigo-600',
        },

        report: {
            icon:
                <CheckCircle size={18} />,
            bg:
                'bg-emerald-100',
            color:
                'text-emerald-600',
        },

        announcement: {
            icon:
                <FileText size={18} />,
            bg:
                'bg-blue-100',
            color:
                'text-blue-600',
        },

        delete: {
            icon:
                <Trash2 size={18} />,
            bg:
                'bg-slate-100',
            color:
                'text-slate-600',
        },

        warning: {
            icon:
                <AlertTriangle size={18} />,
            bg:
                'bg-amber-100',
            color:
                'text-amber-600',
        },
    };

    const item =
        config[type] ||
        config.warning;

    return (

        <div className={`
      w-11
      h-11
      rounded-full
      flex
      items-center
      justify-center
      ${item.bg}
      ${item.color}
    `}>

            {item.icon}

        </div>
    );
};

export default ActivityIcon;