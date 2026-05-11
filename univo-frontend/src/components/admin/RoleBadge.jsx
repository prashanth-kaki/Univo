import React from 'react';
import { cn } from '../../utils/cn';

const roleStyles = {
  admin: 'bg-slate-900 text-white',
  hod: 'bg-purple-100 text-purple-700 border-purple-200',
  faculty: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  coordinator: 'bg-pink-100 text-pink-700 border-pink-200',
  student: 'bg-blue-100 text-blue-700 border-blue-200',
};

const RoleBadge = ({ role }) => {
  const normalizedRole = role?.toLowerCase() || 'student';
  const style = roleStyles[normalizedRole] || roleStyles.student;
  
  return (
    <span className={cn("px-2.5 py-1 rounded-full text-xs font-semibold border", style)}>
      {role?.toUpperCase() || 'STUDENT'}
    </span>
  );
};

export default RoleBadge;
