import React from 'react';

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from 'recharts';

const PeakActivityChart = ({
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
                Peak Activity Hours
            </h2>

            <div className="
        h-[320px]
      ">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <LineChart data={data}>

                        <CartesianGrid
                            strokeDasharray="3 3"
                        />

                        <XAxis dataKey="hour" />

                        <YAxis />

                        <Tooltip />

                        <Line
                            type="monotone"
                            dataKey="activity"
                            stroke="#14b8a6"
                            strokeWidth={3}
                        />

                    </LineChart>

                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default PeakActivityChart;