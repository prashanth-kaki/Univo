import React from 'react';

import {
    X
} from 'lucide-react';

const ModerationReviewModal = ({
    selectedFlag,
    onClose
}) => {

    if (!selectedFlag)
        return null;

    return (

        <div className="
      fixed
      inset-0
      bg-black/50
      z-50
      flex
      items-center
      justify-center
      p-4
    ">

            <div className="
        bg-white
        rounded-2xl
        w-full
        max-w-2xl
        p-6
        relative
      ">

                <button

                    onClick={onClose}

                    className="
            absolute
            top-4
            right-4
            text-slate-400
          "
                >

                    <X size={20} />

                </button>

                <h2 className="
          text-xl
          font-bold
          mb-4
        ">
                    Moderation Details
                </h2>

                <div className="
          flex
          flex-col
          gap-4
        ">

                    <div>
                        <p className="
              text-sm
              text-slate-500
            ">
                            Content Type
                        </p>

                        <p className="
              font-medium
            ">
                            {selectedFlag.type}
                        </p>
                    </div>

                    <div>
                        <p className="
              text-sm
              text-slate-500
            ">
                            Author
                        </p>

                        <p className="
              font-medium
            ">
                            {selectedFlag.author}
                        </p>
                    </div>

                    <div>
                        <p className="
              text-sm
              text-slate-500
            ">
                            Flagged Content
                        </p>

                        <div className="
              bg-slate-50
              border
              rounded-xl
              p-4
              mt-1
            ">
                            {selectedFlag.content}
                        </div>
                    </div>

                    <div>
                        <p className="
              text-sm
              text-slate-500
            ">
                            AI Analysis
                        </p>

                        <p className="
              font-medium
              text-red-600
            ">
                            {selectedFlag.reason}
                        </p>
                    </div>

                    <div>
                        <p className="
              text-sm
              text-slate-500
            ">
                            Confidence
                        </p>

                        <p className="
              font-medium
            ">
                            {selectedFlag.confidence}%
                        </p>
                    </div>

                    <div>
                        <p className="
              text-sm
              text-slate-500
            ">
                            Created At
                        </p>

                        <p className="
              font-medium
            ">
                            {selectedFlag.createdAt}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModerationReviewModal;