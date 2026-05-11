import React, { useEffect, useState } from 'react';
import AttendanceOverview from '../../components/coordinator/AttendanceOverview';
import { getAttendanceOverview } from '../../services/coordinatorService';
import { Download } from 'lucide-react';

const CoordinatorAttendance = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAttendanceOverview();
        setAnalytics(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Attendance Monitoring</h1>
          <p className="text-slate-500 mt-1">Track section-wise attendance metrics and handle shortages.</p>
        </div>
        <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors shadow-sm w-full sm:w-auto">
          <Download className="w-5 h-5" /> Generate Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[450px]">
        <div className="lg:col-span-2 h-full">
          <AttendanceOverview data={analytics} loading={loading} />
        </div>
        
        <div className="lg:col-span-1 h-full flex flex-col gap-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex-1">
             <h3 className="font-bold text-slate-800 mb-4">Quick Actions</h3>
             <div className="space-y-3">
                <button className="w-full text-left px-4 py-3 rounded-lg border border-slate-200 hover:border-teal-300 hover:bg-teal-50 transition-colors group">
                   <h4 className="font-bold text-slate-700 group-hover:text-teal-700">Send Warning Emails</h4>
                   <p className="text-xs text-slate-500 mt-0.5">To students below 75%</p>
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg border border-slate-200 hover:border-teal-300 hover:bg-teal-50 transition-colors group">
                   <h4 className="font-bold text-slate-700 group-hover:text-teal-700">Send Critical Alerts</h4>
                   <p className="text-xs text-slate-500 mt-0.5">To students below 65%</p>
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg border border-slate-200 hover:border-teal-300 hover:bg-teal-50 transition-colors group">
                   <h4 className="font-bold text-slate-700 group-hover:text-teal-700">Review Medical Leaves</h4>
                   <p className="text-xs text-slate-500 mt-0.5">Pending approvals</p>
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoordinatorAttendance;
