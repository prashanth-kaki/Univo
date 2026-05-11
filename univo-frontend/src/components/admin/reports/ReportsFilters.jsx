import React from 'react';

import {
    Search,
    Filter,
} from 'lucide-react';

const ReportsFilters = ({
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
}) => {

    return (

        <div className="
      bg-white
      rounded-xl
      border
      border-slate-200
      shadow-sm
      p-4
      flex
      flex-col
      lg:flex-row
      gap-4
      items-center
      justify-between
    ">

            {/* SEARCH */}

            <div className="
        relative
        w-full
        lg:max-w-lg
      ">

                <Search className="
          w-5
          h-5
          absolute
          left-3
          top-1/2
          -translate-y-1/2
          text-slate-400
        " />

                <input

                    type="text"

                    placeholder="
            Search reports by keyword,
            user, or ID...
          "

                    value={
                        searchTerm
                    }

                    onChange={(e) =>
                        setSearchTerm(
                            e.target.value
                        )
                    }

                    className="
            w-full
            pl-10
            pr-4
            py-2.5
            border
            border-slate-200
            rounded-lg
            outline-none
            focus:ring-2
            focus:ring-indigo-500
          "
                />

            </div>

            {/* FILTER */}

            <div className="
        flex
        items-center
        gap-3
        w-full
        lg:w-auto
      ">

                <select

                    value={
                        statusFilter
                    }

                    onChange={(e) =>
                        setStatusFilter(
                            e.target.value
                        )
                    }

                    className="
            border
            border-slate-200
            rounded-lg
            px-3
            py-2.5
            text-sm
            outline-none
          "
                >

                    <option value="all">
                        All Status
                    </option>

                    <option value="pending">
                        Pending
                    </option>

                    <option value="resolved">
                        Resolved
                    </option>

                    <option value="dismissed">
                        Dismissed
                    </option>

                    <option value="banned">
                        Bans Issued
                    </option>

                </select>

                <button className="
          p-2.5
          border
          border-slate-200
          rounded-lg
          hover:bg-slate-50
        ">

                    <Filter size={18} />

                </button>

            </div>
        </div>
    );
};

export default ReportsFilters;