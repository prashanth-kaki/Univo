import React from 'react';

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts';

const COLORS = [
    '#6366f1',
    '#8b5cf6',
    '#14b8a6',
    '#f59e0b',
];

const ContentDistributionChart = ({
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
                Content Distribution
            </h2>

            <div className="
        h-[320px]
      ">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <PieChart>

                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={120}
                            label
                        >

                            {data.map(
                                (
                                    entry,
                                    index
                                ) => (

                                    <Cell
                                        key={index}
                                        fill={
                                            COLORS[
                                            index %
                                            COLORS.length
                                            ]
                                        }
                                    />
                                )
                            )}

                        </Pie>

                        <Tooltip />

                        <Legend />

                    </PieChart>

                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ContentDistributionChart;