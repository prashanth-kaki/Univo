import React from 'react';

import {
    Users,
    FileText,
    Clock3,
    Activity,
} from 'lucide-react';

import AnalyticsCard
    from './AnalyticsCard';

const AnalyticsStats = ({
    analytics,
}) => {

    return (

        <div className="
      grid
      grid-cols-1
      md:grid-cols-2
      xl:grid-cols-4
      gap-5
    ">

            <AnalyticsCard
                title="Total Engagement"
                value={
                    analytics.totalEngagement
                }
                change="+12.5% this month"
                icon={
                    <Users size={24} />
                }
                iconBg="bg-blue-100"
                iconColor="text-blue-600"
            />

            <AnalyticsCard
                title="Content Created"
                value={
                    analytics.contentCreated
                }
                change="+8.2% this month"
                icon={
                    <FileText size={24} />
                }
                iconBg="bg-indigo-100"
                iconColor="text-indigo-600"
            />

            <AnalyticsCard
                title="Avg. Session Time"
                value={
                    analytics.avgSessionTime
                }
                change="Stable vs last month"
                icon={
                    <Clock3 size={24} />
                }
                iconBg="bg-purple-100"
                iconColor="text-purple-600"
            />

            <AnalyticsCard
                title="Daily Active Users"
                value={
                    analytics.dailyActiveUsers
                }
                change="+4.1% this week"
                icon={
                    <Activity size={24} />
                }
                iconBg="bg-emerald-100"
                iconColor="text-emerald-600"
            />
        </div>
    );
};

export default AnalyticsStats;