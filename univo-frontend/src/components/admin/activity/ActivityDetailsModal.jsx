import React from 'react';

import {
    X,
} from 'lucide-react';

const ActivityDetailsModal = ({
    open,
    onClose,
    activity,
}) => {

    if (
        !open ||
        !activity
    ) return null;

    return (

        <div className="
      fixed
      inset-0
      bg-black/40
      backdrop-blur-sm
      z-50
      flex
      items-center
      justify-center
      p-4
    ">

            <div className="
        bg-white
        rounded-2xl
        shadow-xl
        w-full
        max-w-2xl
      ">

                <div className="
          flex
          items-center
          justify-between
          p-6
          border-b
        ">

                    <h2 className="
            text-2xl
            font-bold
            text-slate-800
          ">
                        Activity Details
                    </h2>

                    <button
                        onClick={onClose}
                    >

                        <X size={22} />

                    </button>

                </div>

                <div className="
          p-6
          space-y-4
        ">

                    <div>

                        <p className="
              text-sm
              text-slate-500
            ">
                            Event Type
                        </p>

                        <p className="
              font-medium
              text-slate-800
            ">
                            {activity.type}
                        </p>

                    </div>

                    <div>

                        <p className="
              text-sm
              text-slate-500
            ">
                            Message
                        </p>

                        <p className="
              font-medium
              text-slate-800
            ">
                            {activity.message}
                        </p>

                    </div>

                    <div>

                        <p className="
              text-sm
              text-slate-500
            ">
                            Timestamp
                        </p>

                        <p className="
              font-medium
              text-slate-800
            ">
                            {activity.time}
                        </p>

                    </div>

                    <div>

                        <p className="
              text-sm
              text-slate-500
            ">
                            Performed By
                        </p>

                        <p className="
              font-medium
              text-slate-800
            ">
                            {activity.user || 'Admin'}
                        </p>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default ActivityDetailsModal;