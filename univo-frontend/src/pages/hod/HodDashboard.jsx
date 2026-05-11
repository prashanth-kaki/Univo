import React, { useEffect, useState } from 'react';
import DepartmentStats from '../../components/hod/DepartmentStats';
import DepartmentActivity from '../../components/hod/DepartmentActivity';
import AnnouncementPanel from '../../components/hod/AnnouncementPanel';
import AttendanceOverview from '../../components/hod/AttendanceOverview';
import { getDepartmentStats, getDepartmentActivity } from '../../services/hodService';

const HodDashboard = () => {
  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsData, activityData] = await Promise.all([
          getDepartmentStats(),
          getDepartmentActivity()
        ]);
        setStats(statsData);
        setActivities(activityData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Department Overview</h1>
        <p className="text-slate-500 mt-1">High-level view of Computer Science Department performance.</p>
      </div>

      <DepartmentStats stats={stats} loading={loading} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[400px]">
        <div className="lg:col-span-2 h-full">
          <AttendanceOverview sections={stats?.attendanceSections || []} />
        </div>
        <div className="h-full">
          <DepartmentActivity activities={activities} loading={loading} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[400px]">
        <div className="h-full">
          <AnnouncementPanel announcements={[]} loading={loading} />
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-2xl font-bold mb-4">
            ✓
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">All Systems Operational</h3>
          <p className="text-slate-500 text-sm max-w-sm">
            Department metrics look stable. No critical alerts regarding attendance or faculty assignments currently require your immediate attention.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HodDashboard;
