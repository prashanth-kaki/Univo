import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, ChevronLeft, ChevronRight, LogOut } from 'lucide-react';
import { coordinatorSidebarData } from '../../data/coordinatorSidebar';
import { cn } from '../../utils/cn';
import { useAuth } from '../../context/AuthContext';

const CoordinatorSidebar = ({ isOpen, setIsOpen }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <motion.div 
      initial={false}
      animate={{ width: isOpen ? 260 : 80 }}
      className="fixed left-0 top-0 h-screen bg-slate-900 text-slate-300 z-50 flex flex-col shadow-2xl overflow-hidden"
    >
      <div className={cn("p-6 flex items-center border-b border-slate-800 h-16 relative", isOpen ? "justify-start" : "justify-center")}>
        <div className="flex items-center gap-3 text-teal-400">
          <Compass className="w-8 h-8 shrink-0" />
          {isOpen && (
            <motion.span 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-xl font-bold tracking-tight text-white whitespace-nowrap"
            >
              Operations
            </motion.span>
          )}
        </div>
        
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white hover:bg-teal-500 transition-colors shadow-md z-50 opacity-0 group-hover:opacity-100 hidden md:flex"
        >
          {isOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </button>
      </div>
      
      <nav className="flex-1 py-6 overflow-y-auto overflow-x-hidden flex flex-col gap-1 px-3 custom-scrollbar">
        {coordinatorSidebarData.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-4 px-3 py-2.5 rounded-lg transition-all duration-200 group relative",
              isActive 
                ? "bg-teal-600/10 text-teal-400 border border-teal-500/20 shadow-sm" 
                : "hover:bg-slate-800 hover:text-slate-100 border border-transparent"
            )}
            title={!isOpen ? item.title : undefined}
          >
            {({ isActive }) => {
              const Icon = item.icon;
              return (
                <>
                  <span className={cn("shrink-0 transition-colors", isActive ? "text-teal-400" : "text-slate-400 group-hover:text-teal-400")}>
                    <Icon className="w-5 h-5" />
                  </span>
                  
                  {isOpen && (
                    <span className="font-medium whitespace-nowrap text-sm">
                      {item.title}
                    </span>
                  )}
                  
                  {!isOpen && isActive && (
                    <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-teal-400" />
                  )}
                </>
              );
            }}
          </NavLink>
        ))}
      </nav>
      
      {/* Bottom section */}
      <div className="p-4 border-t border-slate-800">
        <button 
          onClick={handleLogout}
          className={cn(
            "w-full flex items-center gap-4 px-3 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg transition-colors group",
            isOpen ? "justify-start" : "justify-center"
          )}
          title={!isOpen ? "Logout" : undefined}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {isOpen && <span className="font-medium whitespace-nowrap text-sm">Logout</span>}
        </button>
      </div>
    </motion.div>
  );
};

export default CoordinatorSidebar;
