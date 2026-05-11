import React from 'react';

import ActivityIcon
    from './ActivityIcon';

const ActivityCard = ({
    activity,
    onView,
}) => {

    return (

        <div className="
      flex
      gap-4
      py-5
      border-b
      border-slate-100
    ">

            <ActivityIcon
                type={activity.type}
            />

            <div className="flex-1">

                <p className="
          text-slate-800
          text-lg
          font-medium
        ">
                    {activity.message}
                </p>

                <p className="
          text-sm
          text-slate-500
          mt-1
        ">
                    {activity.time}
                </p>

                <button

                    onClick={() =>
                        onView(activity)
                    }

                    className="
            mt-3
            text-indigo-600
            hover:text-indigo-700
            text-sm
            font-medium
          "
                >
                    View Details
                </button>

            </div>
        </div>
    );
};

export default ActivityCard;