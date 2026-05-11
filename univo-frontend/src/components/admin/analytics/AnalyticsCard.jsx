import React from 'react';

const AnalyticsCard = ({
    title,
    value,
    change,
    icon,
    iconBg,
    iconColor,
}) => {

    return (

        <div className="
      bg-white
      rounded-2xl
      border
      border-slate-200
      shadow-sm
      p-6
      flex
      flex-col
      gap-4
    ">

            <div className="
        flex
        items-center
        justify-between
      ">

                <div className={`
          p-3
          rounded-xl
          ${iconBg}
          ${iconColor}
        `}>

                    {icon}

                </div>

            </div>

            <div>

                <p className="
          text-sm
          text-slate-500
          mb-2
        ">
                    {title}
                </p>

                <h2 className="
          text-4xl
          font-bold
          text-slate-800
        ">
                    {value}
                </h2>

                <p className="
          text-sm
          text-emerald-600
          mt-2
          font-medium
        ">
                    {change}
                </p>

            </div>
        </div>
    );
};

export default AnalyticsCard;