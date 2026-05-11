import React from 'react';

import {
    Download,
} from 'lucide-react';

import jsPDF
    from 'jspdf';

import autoTable
    from 'jspdf-autotable';

const AnalyticsExportButton = ({
    analytics,
}) => {

    const handleExport =
        () => {

            const doc =
                new jsPDF();

            doc.setFontSize(20);

            doc.text(
                'Univo Analytics Report',
                14,
                20
            );

            autoTable(doc, {

                startY: 35,

                head: [[
                    'Metric',
                    'Value',
                ]],

                body: [

                    [
                        'Total Engagement',
                        analytics.totalEngagement,
                    ],

                    [
                        'Content Created',
                        analytics.contentCreated,
                    ],

                    [
                        'Avg Session Time',
                        analytics.avgSessionTime,
                    ],

                    [
                        'Daily Active Users',
                        analytics.dailyActiveUsers,
                    ],
                ],
            });

            doc.save(
                'univo-analytics-report.pdf'
            );
        };

    return (

        <button

            onClick={
                handleExport
            }

            className="
        flex
        items-center
        gap-2
        px-5
        py-2.5
        bg-indigo-600
        hover:bg-indigo-700
        text-white
        rounded-xl
        transition-colors
      "
        >

            <Download size={18} />

            Export Report

        </button>
    );
};

export default AnalyticsExportButton;