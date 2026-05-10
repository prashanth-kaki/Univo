import React from 'react';
import { cn } from '../../../utils/cn';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const StatsCard = ({ title, value, icon, trend, trendValue, colorClass, onClick }) => {
  const isPositive = trend === 'up';
  
  return (
    <div 
      onClick={onClick}
      className={cn(
        "bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col hover:shadow-md transition-shadow",
        onClick && "cursor-pointer active:scale-[0.98]"
      )}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 rounded-lg bg-slate-50 text-slate-600">
          {icon}
        </div>
        {trend && (
          <div className={cn(
            "flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full",
            isPositive ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
          )}>
            {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {trendValue}
          </div>
        )}
      </div>
      <div>
        <h3 className="text-slate-500 text-sm font-medium mb-1">{title}</h3>
        <p className="text-2xl font-bold text-slate-800">{value}</p>
      </div>
      {/* Subtle bottom border highlight */}
      <div className={cn("h-1 w-full mt-4 rounded-full opacity-50", colorClass || "bg-indigo-500")} />
    </div>
  );
};

export default StatsCard;
