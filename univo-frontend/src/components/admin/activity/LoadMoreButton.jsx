import React from 'react';

const LoadMoreButton = ({
    onClick,
    loading,
}) => {

    return (

        <div className="
      flex
      justify-center
      mt-6
    ">

            <button

                onClick={onClick}

                disabled={loading}

                className="
          px-6
          py-3
          bg-slate-100
          hover:bg-slate-200
          rounded-xl
          transition-colors
          font-medium
          text-slate-700
        "
            >

                {loading
                    ? 'Loading...'
                    : 'Load More History'}

            </button>

        </div>
    );
};

export default LoadMoreButton;