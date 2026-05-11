import React from 'react';

const ConfidenceBar = ({
    confidence
}) => {

    return (

        <div className="
      flex
      items-center
      gap-2
    ">

            <div className="
        w-16
        h-2
        bg-slate-200
        rounded-full
        overflow-hidden
      ">

                <div
                    className="
            h-full
            bg-indigo-500
          "
                    style={{
                        width:
                            `${confidence}%`
                    }}
                />
            </div>

            <span className="
        text-xs
        font-semibold
        text-slate-600
      ">
                {confidence}%
            </span>

        </div>
    );
};

export default ConfidenceBar;