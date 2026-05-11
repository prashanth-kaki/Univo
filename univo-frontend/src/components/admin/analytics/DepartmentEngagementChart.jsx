import React from 'react';

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from 'recharts';

const DepartmentEngagementChart = ({
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
                Engagement by Department
            </h2>

            <div className="
        h-[320px]
      ">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <BarChart data={data}>

                        <CartesianGrid
                            strokeDasharray="3 3"
                        />

                        <XAxis dataKey="department" />

                        <YAxis />

                        <Tooltip />

                        <Bar
                            dataKey="engagement"
                            fill="#8b5cf6"
                            radius={[8, 8, 0, 0]}
                        />

                    </BarChart>

                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default DepartmentEngagementChart;