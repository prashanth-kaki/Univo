import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import FacultySidebar from '../components/faculty/FacultySidebar';
import FacultyNavbar from '../components/faculty/FacultyNavbar';
import { cn } from '../utils/cn';
import AIAssistant from '../components/Chat/AIAssistant';

const FacultyLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Close sidebar on mobile by default
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      <FacultySidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div 
        className={cn(
          "flex-1 flex flex-col transition-all duration-300 ease-in-out relative",
          sidebarOpen ? "md:ml-[260px] ml-[80px]" : "ml-[80px]"
        )}
      >
        <FacultyNavbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 p-6 md:p-8 overflow-x-hidden overflow-y-auto">
          {/* Outlet renders the matched child route component */}
          <Outlet />
        </main>
      </div>
      
      {/* Global AI Assistant */}
      <AIAssistant />
    </div>
  );
};

export default FacultyLayout;
