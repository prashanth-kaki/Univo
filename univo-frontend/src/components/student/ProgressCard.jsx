import React from 'react';
import { TrendingUp, Award } from 'lucide-react';

const ProgressCard = () => {
  return (
    <div className="bg-gradient-to-br from-violet-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-xl -ml-10 -mb-10"></div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="font-bold text-violet-100 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" /> Semester Progress
            </h3>
            <p className="text-3xl font-black mt-2">Week 12 <span className="text-lg font-medium text-violet-200">/ 16</span></p>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <Award className="w-6 h-6 text-yellow-300" />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm font-medium">
            <span className="text-violet-100">Overall Completion</span>
            <span>75%</span>
          </div>
          <div className="h-2.5 w-full bg-black/20 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-400 rounded-full" style={{ width: '75%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;
