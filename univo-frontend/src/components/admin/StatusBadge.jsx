import React from 'react';
import { cn } from '../../utils/cn';

const statusStyles = {
  active: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  inactive: 'bg-slate-100 text-slate-700 border-slate-200',
  banned: 'bg-red-100 text-red-700 border-red-200',
  pending: 'bg-amber-100 text-amber-700 border-amber-200',
};

const StatusBadge = ({ status }) => {
  const normalizedStatus = status?.toLowerCase() || 'inactive';
  const style = statusStyles[normalizedStatus] || statusStyles.inactive;
  
  return (
    <span className={cn("px-2.5 py-1 rounded-full text-xs font-semibold border flex items-center gap-1.5 w-fit", style)}>
      <span className={cn(
        "w-1.5 h-1.5 rounded-full",
        normalizedStatus === 'active' ? "bg-emerald-500" :
        normalizedStatus === 'banned' ? "bg-red-500" :
        normalizedStatus === 'pending' ? "bg-amber-500" :
        "bg-slate-400"
      )} />
      {status?.charAt(0).toUpperCase() + status?.slice(1) || 'Inactive'}
    </span>
  );
};

export default StatusBadge;
