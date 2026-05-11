import React from 'react';

const AttendanceCard = ({ attendance, subjectName, subjectCode }) => {
  // Determine color based on attendance %
  const getGradient = (att) => {
    if (att >= 85) return 'from-emerald-400 to-emerald-500';
    if (att >= 75) return 'from-amber-400 to-amber-500';
    return 'from-rose-400 to-rose-500';
  };

  const getTextColor = (att) => {
    if (att >= 85) return 'text-emerald-600';
    if (att >= 75) return 'text-amber-600';
    return 'text-rose-600';
  };

  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (attendance / 100) * circumference;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
      <div>
        <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 mb-2 inline-block">
          {subjectCode}
        </span>
        <h4 className="font-bold text-slate-800 text-sm max-w-[140px] truncate" title={subjectName}>
          {subjectName}
        </h4>
        <p className={`text-xs font-bold mt-1 ${getTextColor(attendance)}`}>
          {attendance >= 75 ? 'Safe Status' : 'Critical Status'}
        </p>
      </div>

      <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="40"
            cy="40"
            r={radius}
            className="stroke-slate-100"
            strokeWidth="6"
            fill="transparent"
          />
          <circle
            cx="40"
            cy="40"
            r={radius}
            className={`stroke-current ${getTextColor(attendance)}`}
            strokeWidth="6"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute font-black text-slate-800 text-sm">
          {attendance}%
        </span>
      </div>
    </div>
  );
};

export default AttendanceCard;
