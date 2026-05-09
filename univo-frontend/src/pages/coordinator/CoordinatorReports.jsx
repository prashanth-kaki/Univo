import React, { useEffect, useState } from 'react';
import ReportsTable from '../../components/coordinator/ReportsTable';
import { getReportsList } from '../../services/coordinatorService';
import { FileText, Plus } from 'lucide-react';

const CoordinatorReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await getReportsList();
        setReports(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Operational Reports</h1>
          <p className="text-slate-500 mt-1">Review and manage generated departmental reports.</p>
        </div>
        <button className="bg-teal-600 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-teal-700 transition-colors shadow-sm w-full sm:w-auto">
          <Plus className="w-5 h-5" /> Request New Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0">
        <div className="lg:col-span-1 h-full flex flex-col gap-4">
           <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 h-fit">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                 <FileText className="w-4 h-4 text-teal-600" /> Report Categories
              </h3>
              <ul className="space-y-1">
                {['All Reports', 'Attendance', 'Academics', 'Infrastructure', 'Disciplinary'].map((cat, idx) => (
                  <li key={cat}>
                    <button className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      idx === 0 ? 'bg-teal-50 text-teal-700' : 'text-slate-600 hover:bg-slate-50'
                    }`}>
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
           </div>
        </div>
        
        <div className="lg:col-span-3 h-full overflow-hidden">
          <ReportsTable reports={reports} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default CoordinatorReports;
