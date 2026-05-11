import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import StudentSidebar from '../components/student/StudentSidebar';
import StudentNavbar from '../components/student/StudentNavbar';
import { cn } from '../utils/cn';
import AIAssistant from '../components/Chat/AIAssistant';

const StudentLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      <StudentSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div 
        className={cn(
          "flex-1 flex flex-col transition-all duration-300 ease-in-out relative",
          sidebarOpen ? "md:ml-[260px] ml-[80px]" : "ml-[80px]"
        )}
      >
        <StudentNavbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 p-6 md:p-8 overflow-x-hidden overflow-y-auto">
          <Outlet />
        </main>
      </div>
      
      <AIAssistant />
    </div>
  );
};

export default StudentLayout;
