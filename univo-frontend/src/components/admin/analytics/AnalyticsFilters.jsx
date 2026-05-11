import React from 'react';

const AnalyticsFilters = ({
    timeFilter,
    setTimeFilter,
}) => {

    return (

        <div className="
      flex
      items-center
      justify-end
      gap-3
    ">

            <select

                value={
                    timeFilter
                }

                onChange={(e) =>
                    setTimeFilter(
                        e.target.value
                    )
                }

                className="
          px-4
          py-2.5
          rounded-xl
          border
          border-slate-200
          bg-white
          text-slate-700
          outline-none
        "
            >

                <option value="7days">
                    Last 7 Days
                </option>

                <option value="30days">
                    Last 30 Days
                </option>

                <option value="3months">
                    Last 3 Months
                </option>

                <option value="1year">
                    Last Year
                </option>

            </select>

        </div>
    );
};

export default AnalyticsFilters;