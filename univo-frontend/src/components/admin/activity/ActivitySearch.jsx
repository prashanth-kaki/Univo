import React from 'react';

import {
    Search,
} from 'lucide-react';

const ActivitySearch = ({
    searchTerm,
    setSearchTerm,
}) => {

    return (

        <div className="
      relative
      w-full
    ">

            <Search className="
        absolute
        left-4
        top-1/2
        -translate-y-1/2
        text-slate-400
      " />

            <input

                type="text"

                placeholder="
          Search by user,
          action,
          keyword...
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
          pl-12
          pr-4
          py-3
          border
          border-slate-200
          rounded-xl
          outline-none
          focus:ring-2
          focus:ring-indigo-500
        "
            />

        </div>
    );
};

export default ActivitySearch;