import React from 'react';

import {
    Filter,
} from 'lucide-react';

const ActivityFilters = ({

    eventType,
    setEventType,

    selectedDate,
    setSelectedDate,

}) => {

    return (

        <div className="
      flex
      items-center
      gap-3
      flex-wrap
    ">

            <select

                value={
                    eventType
                }

                onChange={(e) =>
                    setEventType(
                        e.target.value
                    )
                }

                className="
          px-4
          py-3
          rounded-xl
          border
          border-slate-200
          bg-white
        "
            >

                <option value="">
                    All Event Types
                </option>

                <option value="moderation">
                    Moderation
                </option>

                <option value="role">
                    Role Changes
                </option>

                <option value="report">
                    Reports
                </option>

                <option value="announcement">
                    Announcements
                </option>

                <option value="delete">
                    Deleted Actions
                </option>

            </select>

            <input

                type="date"

                value={
                    selectedDate
                }

                onChange={(e) =>
                    setSelectedDate(
                        e.target.value
                    )
                }

                className="
          px-4
          py-3
          rounded-xl
          border
          border-slate-200
        "
            />

            <button className="
        p-3
        rounded-xl
        border
        border-slate-200
        hover:bg-slate-50
      ">

                <Filter size={18} />

            </button>

        </div>
    );
};

export default ActivityFilters;