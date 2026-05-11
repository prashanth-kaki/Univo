import React from 'react';

const ModerationFilters = ({
    selectedReason,
    setSelectedReason
}) => {

    return (

        <div className="
      bg-white
      rounded-xl
      shadow-sm
      border
      border-slate-200
      p-4
      flex
      justify-end
    ">

            <select

                value={
                    selectedReason
                }

                onChange={(e) =>
                    setSelectedReason(
                        e.target.value
                    )
                }

                className="
          bg-white
          border
          border-slate-200
          text-slate-700
          text-sm
          rounded-lg
          px-3
          py-2
          outline-none
          focus:ring-2
          focus:ring-indigo-500
        "
            >

                <option value="all">
                    Filter by Reason
                </option>

                <option value="Spam/Advertising">
                    Spam
                </option>

                <option value="Harassment/Toxicity">
                    Toxicity
                </option>

                <option value="Academic Dishonesty">
                    Academic Dishonesty
                </option>

            </select>
        </div>
    );
};

export default ModerationFilters;