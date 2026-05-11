import React from 'react';

import {
    Shield,
    BrainCircuit,
    ShieldAlert,
} from 'lucide-react';

import { cn } from '../../../utils/cn';

const ModerationStats = ({
    aiModerationEnabled,
    pendingCount,
    autoResolvedCount,
    onToggleAI
}) => {

    return (

        <div className="
      grid
      grid-cols-1
      md:grid-cols-3
      gap-4
    ">

            {/* AI */}

            <div
                onClick={
                    onToggleAI
                }
                className="
          bg-white
          rounded-xl
          shadow-sm
          border
          border-slate-200
          p-5
          flex
          items-center
          gap-4
          cursor-pointer
          hover:border-indigo-300
          transition-all
        "
            >

                <div className="
          p-3
          bg-indigo-100
          text-indigo-600
          rounded-lg
        ">

                    <BrainCircuit size={24} />

                </div>

                <div>

                    <p className="
            text-sm
            font-medium
            text-slate-500
          ">
                        AI Auto-Moderation
                    </p>

                    <p className="
            text-lg
            font-bold
            text-slate-800
            flex
            items-center
            gap-2
          ">

                        <span
                            className={cn(
                                "w-2 h-2 rounded-full",

                                aiModerationEnabled
                                    ? "bg-emerald-500"
                                    : "bg-red-500"
                            )}
                        />

                        {aiModerationEnabled
                            ? 'Active'
                            : 'Disabled'}

                    </p>
                </div>
            </div>

            {/* PENDING */}

            <div className="
        bg-white
        rounded-xl
        shadow-sm
        border
        border-slate-200
        p-5
        flex
        items-center
        gap-4
      ">

                <div className="
          p-3
          bg-amber-100
          text-amber-600
          rounded-lg
        ">

                    <ShieldAlert size={24} />

                </div>

                <div>

                    <p className="
            text-sm
            font-medium
            text-slate-500
          ">
                        Pending Review
                    </p>

                    <p className="
            text-2xl
            font-bold
            text-slate-800
          ">
                        {pendingCount}
                    </p>

                </div>
            </div>

            {/* RESOLVED */}

            <div className="
        bg-white
        rounded-xl
        shadow-sm
        border
        border-slate-200
        p-5
        flex
        items-center
        gap-4
      ">

                <div className="
          p-3
          bg-emerald-100
          text-emerald-600
          rounded-lg
        ">

                    <Shield size={24} />

                </div>

                <div>

                    <p className="
            text-sm
            font-medium
            text-slate-500
          ">
                        Auto-Resolved
                    </p>

                    <p className="
            text-2xl
            font-bold
            text-slate-800
          ">
                        {autoResolvedCount}
                    </p>

                </div>
            </div>
        </div>
    );
};

export default ModerationStats;