import React from 'react';

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from 'recharts';

const UserGrowthChart = ({
    data,
}) => {

    return (

        <div className="
      bg-white
      rounded-2xl
      border
      border-slate-200
      shadow-sm
      p-6
    ">

            <h2 className="
        text-2xl
        font-bold
        text-slate-800
        mb-6
      ">
                User Growth Trend
            </h2>

            <div className="
        h-[320px]
      ">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <AreaChart data={data}>

                        <CartesianGrid
                            strokeDasharray="3 3"
                        />

                        <XAxis dataKey="month" />

                        <YAxis />

                        <Tooltip />

                        <Area
                            type="monotone"
                            dataKey="users"
                            stroke="#6366f1"
                            fill="#c7d2fe"
                        />

                    </AreaChart>

                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default UserGrowthChart;