import React from 'react';

import ActivityCard
    from './ActivityCard';

const ActivityTimeline = ({
    activities,
    onView,
}) => {

    return (

        <div className="
      bg-white
      rounded-2xl
      border
      border-slate-200
      shadow-sm
      p-6
    ">

            {activities.length === 0 ? (

                <div className="
          text-center
          py-16
          text-slate-500
        ">
                    No activity logs found.
                </div>

            ) : (

                activities.map(
                    (activity) => (

                        <ActivityCard
                            key={activity._id}
                            activity={activity}
                            onView={onView}
                        />
                    )
                )
            )}
        </div>
    );
};

export default ActivityTimeline;